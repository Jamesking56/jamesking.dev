# jamesking.dev

Personal website for James King - AI-Augmented Software Engineer

## Overview

Astro-based static website featuring:
- Tokyo Night design theme (inspired by Omarchy Linux)
- Flexible blog with multiple content types
- Projects showcase
- Full SEO/AEO optimization
- Netlify deployment
- Percy visual regression testing

## Tech Stack

- **Framework**: Astro 6.x
- **Styling**: TailwindCSS via Vite with Tokyo Night color palette
- **Deployment**: Netlify
- **Visual Testing**: Percy
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
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── content/        # Content (blog posts, projects)
│   ├── blog/      # Blog posts (.md files)
│   └── projects/  # Project entries (.md files)
├── content.config.ts # Astro v6 content collections config
├── layouts/       # Page layouts
├── pages/         # Route pages
│   ├── blog/      # Blog routes
│   └── projects/  # Project routes
├── styles/        # Global styles (Tailwind)
└── ...
public/
├── cv.pdf         # Downloadable CV
├── favicon.svg    # Site favicon
└── og-image.svg   # Open Graph image

# Config files
astro.config.mjs    # Astro config
tailwind.config.mjs  # Tailwind config
postcss.config.cjs   # PostCSS config (Tailwind)
```

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
---

Your content here...
```

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
| `article` | Long-form posts | title, date, description, quote |
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

## Visual Regression Testing

Percy is configured for visual testing. Screenshots are captured and compared on each build.

## License

MIT
