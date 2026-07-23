// Mengambil semua file markdown di folder blog
const markdownFiles = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true });

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const path in markdownFiles) {
    // path format: '../content/blog/nama-file.md'
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    const rawContent = markdownFiles[path] as string;

    // Parser Frontmatter sederhana (--- ... ---)
    let title = 'Untitled';
    let date = '';
    let summary = '';
    let content = rawContent;

    if (rawContent.startsWith('---')) {
      const parts = rawContent.split('---');
      if (parts.length >= 3) {
        const frontmatter = parts[1];
        content = parts.slice(2).join('---').trim();

        // Extract metadata dari frontmatter
        const titleMatch = frontmatter.match(/title:\s*(.+)/);
        const dateMatch = frontmatter.match(/date:\s*(.+)/);
        const summaryMatch = frontmatter.match(/summary:\s*(.+)/);

        if (titleMatch) title = titleMatch[1].trim();
        if (dateMatch) date = dateMatch[1].trim();
        if (summaryMatch) summary = summaryMatch[1].trim();
      }
    }

    posts.push({ slug, title, date, summary, content });
  }

  // Sort by date (descending)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}