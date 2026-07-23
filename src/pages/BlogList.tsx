import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { getAllPosts } from '../lib/blog';

const CATEGORIES = ['All', 'Embedded', 'AI/ML', 'Cloud', 'Networking', 'Research'];

function detectCategory(post: { title: string; summary: string }): string {
  const text = (post.title + ' ' + post.summary).toLowerCase();
  if (text.includes('esp') || text.includes('iot') || text.includes('firmware') || text.includes('embedded') || text.includes('arduino')) return 'Embedded';
  if (text.includes('ai') || text.includes('ml') || text.includes('model') || text.includes('tensorflow') || text.includes('klasifikasi') || text.includes('data')) return 'AI/ML';
  if (text.includes('cloud') || text.includes('aws') || text.includes('docker') || text.includes('k8s') || text.includes('deploy')) return 'Cloud';
  if (text.includes('network') || text.includes('ccna') || text.includes('firewall') || text.includes('vpn') || text.includes('routing')) return 'Networking';
  if (text.includes('riset') || text.includes('research') || text.includes('analisis') || text.includes('paper')) return 'Research';
  return 'All';
}

export function BlogList() {
  const allPosts = getAllPosts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;

  const filtered = useMemo(() => {
    let result = allPosts;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q));
    }
    if (category !== 'All') {
      result = result.filter(p => detectCategory(p) === category);
    }
    return result;
  }, [allPosts, search, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pagedPosts = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-16 w-full">
      {/* Header */}
      <div className="mb-12">
        <Link to="/" className="text-[10px] font-mono font-bold text-trace-green hover:text-solder-copper mb-8 inline-block">
          ← BACK_TO_SYSTEM
        </Link>
        <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter text-ink-circuit">
          Blog
        </h1>
        <p className="font-mono text-xs text-ink-circuit/60 mt-2">
          Technical writings & notes — {filtered.length} entries found
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        {/* Search */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search posts..."
            className="w-full bg-mist/40 border border-mist px-3 py-1.5 text-xs font-mono text-ink-circuit placeholder:text-ink-circuit/30 focus:outline-none focus:border-trace-green transition-colors"
          />
        </div>
        {/* Category filter */}
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setPage(1); }}
              className={`text-[9px] font-mono font-bold px-2 py-1 border transition-colors ${
                category === cat
                  ? 'bg-solder-copper text-white border-solder-copper'
                  : 'bg-mist/40 text-ink-circuit/70 border-mist hover:border-trace-green'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Post List */}
      <div className="space-y-6">
        {pagedPosts.map((post, idx) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group"
          >
            <Link to={`/blog/${post.slug}`} className="block bg-mist/30 border border-mist hover:border-solder-copper p-5 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 mb-2">
                <div className="flex items-center gap-3">
                  <time className="font-mono text-[10px] text-trace-green shrink-0">
                    {post.date}
                  </time>
                  <span className="text-[8px] font-mono text-slate-node bg-mist px-1.5 py-0.5">
                    {detectCategory(post).toUpperCase()}
                  </span>
                </div>
                <h2 className="font-display font-bold text-xl text-ink-circuit group-hover:text-solder-copper transition-colors">
                  {post.title}
                </h2>
              </div>
              <p className="font-body text-sm text-ink-circuit/80 pl-0 sm:pl-[88px]">
                {post.summary}
              </p>
              <div className="mt-4 pl-0 sm:pl-[88px] font-mono text-[10px] text-solder-copper opacity-0 group-hover:opacity-100 transition-opacity">
                READ_POST ↗
              </div>
            </Link>
          </motion.article>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-sm font-mono text-slate-node py-12">No posts match your filter.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-12 pt-8 border-t border-mist">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="text-[10px] font-mono font-bold text-trace-green disabled:text-ink-circuit/20 hover:text-solder-copper transition-colors"
          >
            ← PREV
          </button>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-7 h-7 text-[10px] font-mono font-bold transition-colors ${
                  page === i + 1
                    ? 'bg-solder-copper text-white'
                    : 'text-ink-circuit/60 hover:text-solder-copper'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="text-[10px] font-mono font-bold text-trace-green disabled:text-ink-circuit/20 hover:text-solder-copper transition-colors"
          >
            NEXT →
          </button>
        </div>
      )}
    </div>
  );
}