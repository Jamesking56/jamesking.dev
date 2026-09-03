# jamesking.dev

Personal website for James King, Technical Lead and AI Code Governance specialist.

## Overview

Astro static site featuring:
- Tokyo Night design theme (inspired by Omarchy Linux)
- Flexible blog with multiple content types
- Projects showcase
- Full SEO/AEO optimization
- Netlify deployment

## Tech Stack

- **Framework**: Astro 7.x
- **Styling**: TailwindCSS v4 via Vite with Tokyo Night color palette
- **Deployment**: Netlify
- **Analytics**: Counter.dev (cookieless, privacy-first)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Build and run the Node test suite
npm test
```

`npm run build` also generates Markdown page exports and submits URLs to IndexNow.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── content/        # Content collections and source files
│   ├── blog/       # Blog posts (.md files)
│   ├── projects/   # Project entries (.md files)
│   └── config.ts   # Content collection schemas
├── layouts/       # Page layouts
├── pages/         # Route pages
│   ├── blog/       # Blog routes
│   └── projects/   # Project routes
├── styles/        # Global styles (Tailwind)
└── ...
public/
├── cv.pdf          # Downloadable CV
├── favicon.svg     # Site favicon
└── og-image.png    # Default Open Graph image

# Config files
astro.config.mjs    # Astro config
netlify.toml        # Netlify build and header configuration
```

## Routes

- `/` - Homepage
- `/about`, `/services`, `/uses`, `/now`, `/contact`, `/faq`
- `/blog`, `/blog/[type]`, `/blog/[slug]`
- `/projects`, `/projects/[slug]`
- `/rss.xml`, `/humans.txt`, `/llms.txt`

## Adding Content

### Blog Posts

Create a new `.md` file in `src/content/blog/`:

```markdown
---
title: "My Post Title"
type: article  # article, note, links, video, question
date: 2026-04-06
description: "Short description for SEO"
quote: "Optional quote"
ogImage: "/og-image-my-post.png"
---

Your content here...
```

Create a 1200x630 PNG at `public/og-image-my-post.png` for each blog post.

### Projects

Create a new `.md` file in `src/content/projects/`:

```markdown
---
title: "Project Name"
description: "What it does"
tech: ["Laravel", "PHP", "Kubernetes"]
website: "https://..."
github: "https://..."
featured: true
year: "2026"
---

Project details...
```

## Content Types

| Type | Description | Frontmatter |
|------|-------------|-------------|
| `article` | Long-form posts | title, date, description, quote, ogImage |
| `note` | Short updates | title, date |
| `links` | Link roundups | title, date, links[] |
| `video` | Video shares | title, date, video URL |
| `question` | Coding questions | title, date, description |

## Design System

- **Colors**: Tokyo Night palette (#1a1b26, #7aa2f7, etc.)
- **Font**: JetBrains Mono (monospace)
- **Components**: Terminal-style cards with borders

## SEO/AEO

- JSON-LD Person schema on all pages
- FAQ schema on /faq
- BlogPosting schema on blog posts
- SoftwareApplication schema on projects
- Open Graph and Twitter cards

## Deployment

Connected to Netlify. Push to main branch triggers deployment.

## License

MIT
