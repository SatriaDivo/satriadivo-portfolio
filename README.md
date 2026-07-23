# Satria Divo Praditya — Portfolio

Personal portfolio website. Single-page scroll with blog system. Built with Vite, React 19, Tailwind CSS 4, and Motion (Framer Motion).

## Tech Stack

| Layer | Technology |
|-------|------------|
| Bundler | Vite 6 |
| UI | React 19 + Tailwind CSS 4 |
| Animation | Motion (react) |
| Routing | React Router 7 |
| Blog | Markdown (MDX-style) — local `.md` files, auto-parsed via Vite glob |
| Markdown Render | react-markdown + remark-gfm |
| Typography | @tailwindcss/typography |
| Fonts | Space Grotesk, Source Serif 4, JetBrains Mono (Google Fonts) |

## Project Structure

```
src/
├── components/       # UI components (NavBar, Hero, Projects, FocusAreas, Certifications, BlogPreview, Contact, Section)
├── pages/            # Route pages (BlogList, BlogPost)
├── data/             # portfolio.ts — all personal data, projects, certs, links
├── lib/              # blog.ts — Markdown glob loader + frontmatter parser
├── content/blog/     # *.md blog posts — drop files here, auto-published
├── App.tsx           # Main portfolio page
├── main.tsx          # Entry point + BrowserRouter
└── index.css         # Tailwind + typography plugin + base styles
```

## Getting Started

```bash
npm install
npm run dev        # → http://localhost:3000
npm run build      # production build
npm run preview    # preview production build
```

## Adding Blog Posts

1. Create a `.md` file in `src/content/blog/` with frontmatter:

```markdown
---
title: Your Post Title
date: 2026-07-25
summary: Short summary shown in preview cards
---

Content here. Full Markdown + GFM supported.
```

2. That's it. Vite auto-detects the file on next dev restart or build. No code changes needed.

Post categories are auto-detected from keywords in title + summary (Embedded, AI/ML, Cloud, Networking, Research).

## Design System

- **Background**: `#F7F5F0` (Paper)
- **Text**: `#1B2A22` (Ink Circuit)
- **Accent**: `#2F6F4E` (Trace Green), `#C97D3B` (Solder Copper)
- **Slate**: `#3A4A63` (Node)
- **Mist**: `#E8E4DB` (Card backgrounds)
- **Fonts**: Display (Space Grotesk), Body (Source Serif 4), Mono (JetBrains Mono)

## Sections

| # | Section | Content |
|---|---------|---------|
| 1 | SYS_INIT | Hero — name, role, thesis, social links |
| 2 | MODULES | Production Projects — HERA, AgriSense, E-Logbook, CocoaSense |
| 3 | CORE_AREAS | Technical Focus — 5 skill areas |
| 4 | CERTIFICATIONS | Verified Badges — 9 Credly certs + link to all 13 |
| 5 | TECHNICAL_WRITINGS | Recent Blog Posts — 6 preview cards + view all |
| 6 | END_PROCESS | Contact — email, GitHub, LinkedIn, Instagram, YouTube |

## Author

Satria Divo Praditya — Data Scientist Intern at PT Makerindo Prima Solusi.

- GitHub: [github.com/satriadivoo](https://github.com/satriadivoo)
- LinkedIn: [linkedin.com/in/satria-divo-praditya](https://linkedin.com/in/satria-divo-praditya)
- Instagram: [instagram.com/satriadivoo](https://instagram.com/satriadivoo)
- YouTube: [youtube.com/@SatriaDivo1](https://www.youtube.com/@SatriaDivo1)
- Credly: [credly.com/users/satria-divo-praditya](https://www.credly.com/users/satria-divo-praditya/badges/credly)