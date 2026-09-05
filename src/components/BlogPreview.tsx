import { motion } from 'motion/react';
import { getAllPosts } from '../lib/blog';

export function BlogPreview() {
  const posts = getAllPosts().slice(0, 3); // Get latest 3 posts

  if (posts.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post, idx) => (
        <motion.a
          key={post.slug}
          href={`/blog/${post.slug}`}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: idx * 0.1 }}
          className="group flex flex-col md:flex-row gap-4 md:gap-12 py-6 border-b border-border-subtle last:border-0 hover:pl-4 transition-all"
        >
          <div className="md:w-1/4 shrink-0">
            <span className="font-mono text-xs text-ink-muted uppercase tracking-widest">
              {post.date}
            </span>
          </div>

          <div className="md:w-3/4 flex flex-col">
            <h3 className="font-display font-bold text-lg sm:text-xl text-ink-primary group-hover:text-accent transition-colors tracking-tight mb-2">
              {post.title}
            </h3>
            
            <p className="text-sm sm:text-base text-ink-secondary leading-relaxed font-body mb-4 line-clamp-2">
              {post.summary}
            </p>

            <span className="font-mono text-xs text-ink-primary font-medium flex items-center gap-2 mt-auto group-hover:text-accent transition-colors">
              READ POST <span className="text-ink-muted group-hover:text-accent">→</span>
            </span>
          </div>
        </motion.a>
      ))}

      <motion.a
        href="/blog"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="inline-flex items-center gap-2 text-xs font-mono font-bold text-ink-primary hover:text-accent transition-colors w-fit mt-4"
      >
        VIEW ALL TECHNICAL WRITINGS ↗
      </motion.a>
    </div>
  );
}
