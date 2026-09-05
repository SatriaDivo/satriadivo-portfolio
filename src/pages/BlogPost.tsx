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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-mono text-ink-primary font-bold">404_POST_NOT_FOUND</h1>
        <Link to="/" className="text-sm font-mono underline mt-4 inline-block text-ink-secondary hover:text-ink-primary">Return to System</Link>
      </div>
    );
  }

  return (
    <motion.article 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto px-6 sm:px-12 md:px-20 py-16 sm:py-24 w-full"
    >
      <div className="mb-16 border-b border-border-subtle pb-12">
        <a 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (window.history.length > 1 && document.referrer.includes(window.location.host)) {
              navigate(-1);
            } else {
              navigate('/blog');
            }
          }}
          className="text-xs font-mono font-bold text-ink-muted hover:text-ink-primary transition-colors mb-10 inline-block tracking-widest"
        >
          ← GO_BACK
        </a>
        <h1 className="text-3xl md:text-5xl font-display font-bold text-ink-primary leading-tight tracking-tight mb-6">
          {post.title}
        </h1>
        <div className="flex gap-4 font-mono text-xs text-ink-secondary">
          <span>{post.date}</span>
          <span className="text-border-subtle">|</span>
          <span>Satria Divo Praditya</span>
        </div>
      </div>

      <div className="prose prose-sm sm:prose-base prose-p:font-body prose-headings:font-display prose-headings:font-bold prose-headings:text-ink-primary prose-a:text-accent prose-code:font-mono prose-code:text-ink-primary prose-pre:bg-tech-node prose-pre:text-ink-primary text-ink-secondary max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </motion.article>
  );
}
