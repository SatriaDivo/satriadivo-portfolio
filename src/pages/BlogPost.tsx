import { motion } from 'motion/react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug } from '../lib/blog';
import { useEffect } from 'react';

export function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug || '');
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    // Wait for React to render, then scroll to #blog section
    setTimeout(() => {
      const el = document.getElementById('blog');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-mono text-solder-copper">404_POST_NOT_FOUND</h1>
        <Link to="/" className="text-xs font-mono underline mt-4 inline-block">Return to Home</Link>
      </div>
    );
  }

  return (
    <motion.article 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto px-4 sm:px-8 py-16 w-full"
    >
      <div className="mb-12 border-b border-mist pb-8">
        <a 
          href="/#blog"
          onClick={handleBack}
          className="text-[10px] font-mono font-bold text-trace-green hover:text-solder-copper mb-8 inline-block"
        >
          ← BACK_TO_HOME
        </a>
        <h1 className="text-3xl md:text-5xl font-display font-bold text-ink-circuit leading-tight mb-4">
          {post.title}
        </h1>
        <div className="flex gap-4 font-mono text-xs text-trace-green">
          <span>TIMESTAMP: {post.date}</span>
          <span>AUTHOR: Satria Divo</span>
        </div>
      </div>

      <div className="prose prose-sm sm:prose-base prose-p:font-body prose-headings:font-display prose-headings:font-bold prose-headings:text-ink-circuit prose-a:text-solder-copper prose-a:border-b-solder-copper prose-code:font-mono prose-code:text-solder-copper prose-pre:bg-slate-node prose-pre:text-mist text-ink-circuit/90 max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </motion.article>
  );
}