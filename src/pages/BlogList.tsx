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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-12 md:px-20 py-20 w-full">
      <div className="mb-16">
        <Link 
          to="/" 
          className="text-xs font-mono font-bold text-ink-muted hover:text-ink-primary transition-colors mb-10 inline-block tracking-widest"
        >
          ← BACK_TO_SYSTEM
        </Link>
        <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-ink-primary mb-4">
          Technical Writings
        </h1>
        <p className="font-mono text-sm text-ink-secondary">
          {filtered.length} entries found
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <div className="flex-1 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search posts..."
            className="w-full bg-surface border border-border-subtle px-4 py-3 text-sm font-mono text-ink-primary placeholder:text-ink-muted focus:outline-none focus:border-ink-primary transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setPage(1); }}
              className={`text-[10px] font-mono font-medium px-4 py-2 transition-colors ${
                category === cat
                  ? 'bg-ink-primary text-white border border-ink-primary'
                  : 'bg-surface text-ink-secondary border border-border-subtle hover:border-ink-primary'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-0 border-t border-border-subtle">
        {pagedPosts.map((post, idx) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link 
              to={`/blog/${post.slug}`} 
              className="group flex flex-col md:flex-row gap-4 md:gap-12 py-8 border-b border-border-subtle hover:pl-4 transition-all"
            >
              <div className="md:w-1/4 shrink-0 flex flex-col gap-2">
                <time className="font-mono text-xs text-ink-muted tracking-widest uppercase">
                  {post.date}
                </time>
                <span className="text-[10px] font-mono text-ink-secondary bg-tech-node border border-border-subtle px-2 py-0.5 w-fit">
                  {detectCategory(post).toUpperCase()}
                </span>
              </div>
              <div className="md:w-3/4 flex flex-col">
                <h2 className="font-display font-bold text-xl sm:text-2xl text-ink-primary group-hover:text-accent transition-colors tracking-tight mb-3">
                  {post.title}
                </h2>
                <p className="font-body text-sm sm:text-base text-ink-secondary leading-relaxed mb-4">
                  {post.summary}
                </p>
                <span className="font-mono text-xs font-medium text-ink-muted group-hover:text-accent transition-colors">
                  READ POST →
                </span>
              </div>
            </Link>
          </motion.article>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-sm font-mono text-ink-muted py-16">No posts match your filter.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-12">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="text-xs font-mono font-bold text-ink-primary disabled:text-ink-muted hover:text-accent transition-colors"
          >
            ← PREV
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-8 h-8 text-[10px] font-mono font-bold transition-colors border ${
                  page === i + 1
                    ? 'bg-ink-primary text-white border-ink-primary'
                    : 'bg-surface text-ink-secondary border-border-subtle hover:border-ink-primary'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="text-xs font-mono font-bold text-ink-primary disabled:text-ink-muted hover:text-accent transition-colors"
          >
            NEXT →
          </button>
        </div>
      )}
    </div>
  );
}
