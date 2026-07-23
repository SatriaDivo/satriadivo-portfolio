---
title: "Dari CCNA ke AWS Cloud Architect — Transisi Mental Model Jaringan ke Cloud"
date: 2026-07-23
summary: Bagaimana sertifikasi Cisco CCNA (Routing & Switching) mempermudah pembelajaran arsitektur AWS. VPC, Subnet, Route Table, NAT Gateway, dan Security Group.
---

# Mindset Shift: Kabel vs API

Memiliki sertifikasi **Cisco CCNA (Enterprise Networking, Security, and Automation)** sebelum belajar **AWS Cloud Architecting** adalah *cheat code* yang masif.

Di dunia on-premise (CCNA):
- Lo megang kabel UTP/Fiber.
- Lo colok ke port FastEthernet0/1 di switch Catalyst.
- Lo ketik `interface vlan 10`, `ip address 192.168.10.1 255.255.255.0`.
- Kalau salah kabel, ping gagal.

Di AWS:
- Semuanya adalah API call.
- Switch fisik diganti virtual router tersembunyi.
- Lo tidak narik kabel, lo definisikan JSON/YAML (CloudFormation/Terraform).

Meski begitu, **konsep fundamentalnya 100% sama**.

---

# Rosetta Stone: CCNA ↔ AWS

Bagi engineer jaringan yang baru masuk ke AWS, ini pemetaan konsepnya:

| Konsep CCNA (On-Prem) | Konsep AWS (Cloud) | Penjelasan |
|-----------------------|---------------------|------------|
| **Data Center / Site** | **VPC (Virtual Private Cloud)** | Batas logis jaringan lo. Di AWS, 1 VPC = 1 Data Center virtual. |
| **VLAN / Broadcast Domain** | **Subnet** | Pecahan dari VPC. Di AWS, 1 Subnet = 1 Availability Zone (AZ). |
| **Router / Layer 3 Switch** | **Implied Router + Route Table** | AWS VPC punya router bawaan yang invisible. Kita cuma atur Route Table-nya. |
| **Default Route (`ip route 0.0.0.0 0.0.0.0`)** | **Internet Gateway (IGW)** | Pintu keluar menuju internet publik. |
| **NAT Router (Overload/PAT)** | **NAT Gateway** | Agar private subnet (tanpa IP publik) bisa akses internet (update OS) tanpa bisa diakses dari luar. |
| **Access Control List (ACL) di Router** | **Network ACL (NACL)** | Filter traffic di level Subnet (stateless). |
| **Host Firewall (iptables / UFW)** | **Security Group (SG)** | Filter traffic di level Instance/EC2 (stateful). |
| **BGP / OSPF / Static VPN** | **Direct Connect / Site-to-Site VPN** | Hubungan VPC ke Data Center fisik perusahaan. |

---

# Desain Arsitektur Dasar: 3-Tier Web App

Di CCNA, kita mendesain jaringan dengan Core, Distribution, dan Access layer.
Di AWS, kita mendesain dengan Public, Private, dan Database subnet.

## Konfigurasi Subnetting

Misal CIDR VPC: `10.0.0.0/16` (65,536 IP).

- **Public Subnet 1 (AZ-a)**: `10.0.1.0/24` — untuk Load Balancer / NAT Gateway.
- **Public Subnet 2 (AZ-b)**: `10.0.2.0/24` — untuk redundansi Load Balancer.
- **Private Subnet 1 (AZ-a)**: `10.0.10.0/24` — untuk Web/App Server (EC2).
- **Private Subnet 2 (AZ-b)**: `10.0.11.0/24` — redundansi Web/App.
- **Database Subnet 1 (AZ-a)**: `10.0.20.0/24` — untuk RDS (PostgreSQL).
- **Database Subnet 2 (AZ-b)**: `10.0.21.0/24` — RDS Standby (Multi-AZ).

## Route Table Mapping

Ini bagian di mana pemahaman _routing_ dari CCNA bersinar. AWS GUI gampang di-klik, tapi kalau _route table_ salah, trafik nyangkut.

### Route Table: Public (RT-Public)
- `10.0.0.0/16` → `local` (Komunikasi antar subnet dalam VPC)
- `0.0.0.0/0` → `igw-12345` (Semua trafik keluar dilempar ke Internet Gateway)
*Diasosiasikan ke: Public Subnet 1 & 2.*

### Route Table: Private Web (RT-Private-Web)
- `10.0.0.0/16` → `local`
- `0.0.0.0/0` → `nat-67890` (Server butuh update via `apt-get`, lempar ke NAT Gateway di Public Subnet)
*Diasosiasikan ke: Private Subnet 1 & 2.*

### Route Table: Database (RT-Private-DB)
- `10.0.0.0/16` → `local`
*Tidak ada rute 0.0.0.0/0.* Database **sama sekali tidak boleh** bisa mencapai internet, bahkan via NAT. Ultra-secure.
*Diasosiasikan ke: Database Subnet 1 & 2.*

---

# Security: SG vs NACL (Stateful vs Stateless)

Di pelajaran CCNA Security, kita belajar Standard dan Extended ACL. AWS punya dua lapis pengamanan.

## 1. Security Group (Stateful)
Berlaku di level EC2 (instance). Mirip firewall OS.
- **Stateful**: Kalau lo buka port 80 (HTTP) untuk Inbound, AWS otomatis buka jalur Outbound untuk _response_ (return traffic). Lo gak perlu atur Outbound rule untuk HTTP.
- **Gunakan untuk**: Membatasi siapa yang boleh ngobrol dengan server. Misal, Web SG cuma boleh port 80/443 dari IP Load Balancer. DB SG cuma boleh port 5432 dari IP Web SG (bukan subnet, tapi me-refer ID Security Group!).

## 2. Network ACL (Stateless)
Berlaku di level Subnet. Mirip ACL di router Cisco.
- **Stateless**: Kalau lo buka port 80 Inbound, respon baliknya (misal port _ephemeral_ 1024-65535) **harus di-allow secara eksplisit** di Outbound rule. Kalau lupa, koneksi TCP _handshake_ (SYN-ACK) gagal.
- **Gunakan untuk**: _Deny-list_ eksplisit. Misal, blokir rentang IP attacker (`198.51.100.0/24`) agar tidak bisa masuk ke subnet manapun, tanpa mengotori rule SG.

---

# Pelajaran

1. **Jaringan cloud tidak "magic".** Di balik Console AWS, hukum fisika IP _routing_, TCP _three-way handshake_, dan subnetting (CIDR math) tetap berlaku mutlak.
2. **Troubleshooting AWS itu troubleshooting CCNA.** Server private lo gabisa nge-ping `8.8.8.8`?
   - _Cek kabel?_ (Di AWS: cek ENI/Elastic Network Interface nempel atau nggak).
   - _Cek Route Table?_ (Adakah rute 0.0.0.0/0 ke NAT Gateway?).
   - _Cek ACL/Firewall?_ (Apakah NACL blokir return traffic? Apakah SG allow ICMP?).
3. **Punya CCNA bikin lo baca dokumentasi AWS 5x lebih cepat.** Lo gak bingung apa bedanya _Public IP_ vs _Elastic IP_, atau kenapa /16 adalah subnet mask yang pas buat VPC. Lo udah paham fundamentalnya dari Cisco Packet Tracer.