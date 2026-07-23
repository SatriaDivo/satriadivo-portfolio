---
title: "Multi-Role RBAC — Desain Sistem Akses Petani, Koperasi, Admin di CocoaSense"
date: 2026-07-23
summary: Arsitektur role-based access control tiga tingkat. Flow pengajuan akses dengan approval chain. Implementasi di backend Node.js/Express + PostgreSQL.
---

# Kenapa Tiga Role?

CocoaSense bukan cuma tools ML — ini sistem operasional dengan stakeholder berbeda:

| Role | Siapa | Yang Bisa Dilakukan |
|------|-------|----------------------|
| **Petani** | Petani kakao individu | Upload foto biji, lihat hasil QC sendiri, ajukan ke koperasi |
| **Koperasi** | Manajer koperasi / QC inspector | Verifikasi hasil petani, aggregate QC data seluruh anggota, export laporan, approve/reject pengajuan |
| **Admin** | Admin pusat / PIC proyek | Manage user (CRUD semua role), konfigurasi model ML, lihat semua data lintas koperasi, system audit log |

Single-role atau hardcoded permission tidak cukup. Butuh **RBAC (Role-Based Access Control)** dengan hierarki.

---

# Arsitektur RBAC

```
[Request] → [Auth Middleware: JWT Verify] → [RBAC Middleware: Check Role + Permission]
                  │                                      │
                  ▼                                      ▼
            user_id + role                        endpoint_permission
            dari token JWT                        required_roles[]
```

Implementasi di Express.js:

## 1. Skema Database

```sql
-- Tabel users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('petani', 'koperasi', 'admin')),
    cooperative_id UUID REFERENCES cooperatives(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel pengajuan akses (petani → koperasi)
CREATE TABLE access_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    target_cooperative_id UUID REFERENCES cooperatives(id),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    reason TEXT,
    reviewed_by UUID REFERENCES users(id), -- koperasi manager yang review
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel permissions (granular jika perlu ekspansi)
CREATE TABLE role_permissions (
    role VARCHAR(20) NOT NULL,
    resource VARCHAR(100) NOT NULL,   -- misal: 'qc_results', 'users', 'model_config'
    action VARCHAR(50) NOT NULL,      -- 'read', 'write', 'delete', 'export', 'approve'
    PRIMARY KEY (role, resource, action)
);
```

Seed default permissions:

```sql
-- Admin: full access
INSERT INTO role_permissions (role, resource, action) VALUES
('admin', '*', '*');

-- Koperasi: QC management + petani oversight
INSERT INTO role_permissions (role, resource, action) VALUES
('koperasi', 'qc_results', 'read'),
('koperasi', 'qc_results', 'export'),
('koperasi', 'qc_results', 'verify'),
('koperasi', 'access_requests', 'approve'),
('koperasi', 'access_requests', 'reject'),
('koperasi', 'members', 'read'),
('koperasi', 'reports', 'generate');

-- Petani: upload + lihat sendiri saja
INSERT INTO role_permissions (role, resource, action) VALUES
('petani', 'qc_results', 'upload'),
('petani', 'qc_results', 'read_own'),
('petani', 'access_requests', 'create'),
('petani', 'profile', 'update_own');
```

## 2. RBAC Middleware Express

```javascript
// middleware/rbac.js
const { query } = require('../db');

// Cek apakah role punya permission untuk resource+action
async function hasPermission(role, resource, action) {
  // Admin bypass — '*' resource = full access
  const adminCheck = await query(
    `SELECT 1 FROM role_permissions WHERE role = 'admin' AND resource = '*'`
  );
  if (adminCheck.rows.length > 0) return true;

  const result = await query(
    `SELECT 1 FROM role_permissions 
     WHERE role = $1 AND resource = $2 AND action = $3`,
    [role, resource, action]
  );
  return result.rows.length > 0;
}

// Middleware factory
function requirePermission(resource, action) {
  return async (req, res, next) => {
    const { role } = req.user;  // dari JWT (auth middleware sebelumnya)
    
    const allowed = await hasPermission(role, resource, action);
    if (!allowed) {
      return res.status(403).json({
        error: 'RBAC_FORBIDDEN',
        message: `Role ${role} tidak memiliki akses ${action} pada ${resource}`,
      });
    }

    // Scope filtering: petani hanya lihat data sendiri
    if (role === 'petani' && action === 'read_own') {
      req.queryScope = { user_id: req.user.id };
    }
    // Koperasi hanya lihat data di cooperative nya
    if (role === 'koperasi') {
      req.queryScope = { cooperative_id: req.user.cooperative_id };
    }
    // Admin lihat semua (no scope filter)

    next();
  };
}

module.exports = { requirePermission };
```

## 3. Penerapan di Routes

```javascript
// routes/qc.js
const { requirePermission } = require('../middleware/rbac');

router.get('/results', requirePermission('qc_results', 'read'), async (req, res) => {
  const results = await query(
    `SELECT * FROM qc_results WHERE ($1::uuid IS NULL OR cooperative_id = $1)`,
    [req.queryScope?.cooperative_id]
  );
  res.json(results);
});

router.post('/upload', requirePermission('qc_results', 'upload'), async (req, res) => {
  // Petani upload foto — auto-assign cooperative_id dari user
  const result = await query(
    `INSERT INTO qc_results (user_id, cooperative_id, image_url, status)
     VALUES ($1, $2, $3, 'pending_verification')
     RETURNING *`,
    [req.user.id, req.user.cooperative_id, req.body.image_url]
  );
  res.status(201).json(result.rows[0]);
});

router.post('/verify/:id', requirePermission('qc_results', 'verify'), async (req, res) => {
  // Koperasi verifikasi hasil QC petani
  const result = await query(
    `UPDATE qc_results 
     SET status = $2, verified_by = $3, verified_at = NOW()
     WHERE id = $1 AND cooperative_id = $4
     RETURNING *`,
    [req.params.id, req.body.status, req.user.id, req.user.cooperative_id]
  );
  res.json(result.rows[0]);
});
```

## 4. Flow Pengajuan Akses (Petani → Koperasi)

```javascript
// Petani mengajukan join ke koperasi
router.post('/access-request', requirePermission('access_requests', 'create'), async (req, res) => {
  const { cooperative_id, reason } = req.body;

  // Cek jangan duplikat
  const existing = await query(
    `SELECT 1 FROM access_requests 
     WHERE user_id = $1 AND target_cooperative_id = $2 AND status = 'pending'`,
    [req.user.id, cooperative_id]
  );
  if (existing.rows.length > 0) {
    return res.status(409).json({ error: 'Pengajuan masih pending untuk koperasi ini' });
  }

  const request = await query(
    `INSERT INTO access_requests (user_id, target_cooperative_id, reason)
     VALUES ($1, $2, $3) RETURNING *`,
    [req.user.id, cooperative_id, reason]
  );

  // Notifikasi ke semua manager koperasi target (via MQTT/WebSocket/FCM)
  notifyCooperativeManagers(cooperative_id, {
    type: 'NEW_ACCESS_REQUEST',
    from: req.user.full_name,
    reason,
  });

  res.status(201).json(request.rows[0]);
});

// Koperasi approve/reject
router.post('/access-request/:id/review', requirePermission('access_requests', 'approve'), async (req, res) => {
  const { status, notes } = req.body;  // 'approved' | 'rejected'

  const result = await query(
    `UPDATE access_requests
     SET status = $2, reviewed_by = $3, reviewed_at = NOW(), review_notes = $4
     WHERE id = $1 AND target_cooperative_id = $5
     RETURNING *`,
    [req.params.id, status, req.user.id, notes, req.user.cooperative_id]
  );

  if (status === 'approved') {
    // Update user: assign cooperative_id
    await query(
      `UPDATE users SET cooperative_id = $2 WHERE id = $1`,
      [result.rows[0].user_id, req.user.cooperative_id]
    );
  }

  // Notifikasi ke petani: pengajuan disetujui/ditolak
  notifyUser(result.rows[0].user_id, {
    type: 'ACCESS_REQUEST_RESULT',
    status,
    notes,
  });

  res.json(result.rows[0]);
});
```

---

# Kenapa Tidak Pakai Library RBAC (casl, accesscontrol)?

Library RBAC umum (Node.js: `casl`, `accesscontrol`) bagus untuk permission kompleks dengan atribut. Tapi di CocoaSense:
- **Hanya 3 role.** Kompleksitas library > kebutuhan.
- **Hierarki sederhana.** Admin > Koperasi > Petani. Tidak perlu role inheritance tree.
- **Koperasi scope by cooperative_id.** Ini bukan cuma permission check — tapi query scoping. Library RBAC umum tidak handle ini.

Implementasi custom: 60 baris middleware + 30 baris SQL seed. Jauh lebih ringan daripada dependensi 8kB + learning curve.

---

# Pelajaran

1. **RBAC sederhana > library kompleks.** 3 role, scope query by cooperative_id — custom middleware lebih bersih daripada framework RBAC.
2. **Query scoping penting.** `WHERE cooperative_id = $1` di middleware mencegah koperasi A melihat data koperasi B — bukan cuma permission check.
3. **Access request flow harus stateful.** `pending → approved/rejected` dengan tracking siapa yang review. Bukan cuma CRUD user.
4. **Notifikasi real-time (via MQTT).** Pengajuan baru → manager koperasi dapat notifikasi instant. Tanpa ini, approval bisa tertunda berhari-hari.