import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../lib/blog';

export function BlogList() {
  const posts = getAllPosts();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-16 w-full">
      <div className="mb-12">
        <Link to="/" className="text-[10px] font-mono font-bold text-trace-green hover:text-solder-copper mb-8 inline-block">
          ← BACK_TO_SYSTEM
        </Link>
        <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter text-ink-circuit">
          Blog
        </h1>
        <p className="font-mono text-xs text-ink-circuit/60 mt-2">
          Technical writings & notes — {posts.length} entries found
        </p>
      </div>

      <div className="space-y-6">
        {posts.map((post, idx) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group"
          >
            <Link to={`/blog/${post.slug}`} className="block bg-mist/30 border border-mist hover:border-solder-copper p-5 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 mb-2">
                <time className="font-mono text-[10px] text-trace-green shrink-0">
                  {post.date}
                </time>
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
      </div>
    </div>
  );
}