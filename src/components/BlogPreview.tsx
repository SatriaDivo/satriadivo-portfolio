import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../lib/blog';

const CATEGORY_MAP: Record<string, string> = {
  esp: 'Embedded', iot: 'Embedded', firmware: 'Embedded', embedded: 'Embedded', arduino: 'Embedded',
  ai: 'AI/ML', ml: 'AI/ML', model: 'AI/ML', tensorflow: 'AI/ML', klasifikasi: 'AI/ML', data: 'AI/ML',
  cloud: 'Cloud', aws: 'Cloud', docker: 'Cloud', k8s: 'Cloud', deploy: 'Cloud',
  network: 'Networking', ccna: 'Networking', firewall: 'Networking', vpn: 'Networking', routing: 'Networking',
  riset: 'Research', research: 'Research', analisis: 'Research', paper: 'Research',
};

function detectCategory(title: string, summary: string): string {
  const text = (title + ' ' + summary).toLowerCase();
  for (const [key, cat] of Object.entries(CATEGORY_MAP)) {
    if (text.includes(key)) return cat;
  }
  return 'Engineering';
}

export function BlogPreview() {
  const posts = getAllPosts().slice(0, 6);

  if (posts.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {posts.map((post, idx) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ delay: idx * 0.08 }}
          >
            <Link
              to={`/blog/${post.slug}`}
              className="block bg-mist/30 border border-mist hover:border-solder-copper p-3 transition-colors group h-full"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <time className="font-mono text-[9px] text-trace-green">{post.date}</time>
                <span className="text-[7px] font-mono text-slate-node bg-mist px-1 py-0.5">{detectCategory(post.title, post.summary).toUpperCase()}</span>
              </div>
              <h3 className="font-display font-bold text-sm text-ink-circuit group-hover:text-solder-copper transition-colors leading-snug mb-1">
                {post.title}
              </h3>
              <p className="font-body text-xs text-ink-circuit/70 line-clamp-2">{post.summary}</p>
              <span className="font-mono text-[9px] text-solder-copper mt-2 opacity-0 group-hover:opacity-100 transition-opacity inline-block">
                Read ↗
              </span>
            </Link>
          </motion.article>
        ))}
      </div>

      {/* View all link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="pt-2"
      >
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold text-trace-green hover:text-solder-copper transition-colors border-b border-dashed border-trace-green hover:border-solder-copper pb-0.5"
        >
          Lihat semua {getAllPosts().length} log tulisan
          <span className="text-xs">→</span>
        </Link>
      </motion.div>
    </div>
  );
}