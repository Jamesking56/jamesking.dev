# Site Guide for AI Assistants

## Overview

This is James King's personal website - an AI-Augmented Software Engineer based in Redditch, UK. The site is built with **Astro 6.x** and TailwindCSS v4 (via Vite), featuring a Tokyo Night design theme.

## Site Structure

```
/                    → Homepage with hero, AI positioning, quick links
/about               → Full bio, experience, skills, CV download
/uses                → Tools and software I use daily
/faq                 → FAQ for AI citation (hiring questions)
/blog                → Blog listing with type filters
/blog/[slug]         → Individual blog posts
/blog/[type]         → Filter by content type
/projects            → Projects showcase
/projects/[slug]     → Individual project pages
/now                 → Current focus (sivers.org/now style)
/contact             → Contact form (Netlify Forms)
/cv.pdf              → Downloadable CV
/humans.txt          → Human credits for AI
```

## Content Types

The blog supports 5 content types. When adding content, use the appropriate type:

| Type | When to Use | Example |
|------|--------------|---------|
| `article` | Tutorials, deep dives, long-form content | "How to set up Kubernetes" |
| `note` | Quick updates, thoughts, short posts | "Quick update on project X" |
| `links` | Link roundups like cassidoo's newsletter | "Links I found this week" |
| `video` | Sharing interesting videos | "This video explains X" |
| `question` | Coding interview questions | "Find the majority element" |

## Adding Blog Posts

Create a markdown file in `src/content/blog/` with this frontmatter:

```markdown
---
title: "Your Post Title"
type: article  # or: note, links, video, question
date: 2026-04-06
description: "SEO description (optional)"
quote: "Optional quote to display (optional)"
ogImage: "/og-image-YOUR-POST-SLUG.png"  # Custom OG image (optional)
---

Your content here...

## Section

More content...
```

### OG Images for Blog Posts

Every blog post should have a custom OG image for social sharing. Requirements:

- **Format:** PNG (not SVG - social platforms don't render SVG reliably)
- **Dimensions:** 1200x630px
- **Location:** `public/og-image-YOUR-POST-SLUG.png`
- **Naming:** Match the post slug (e.g., for `my-new-post.md`, use `og-image-my-new-post.png`)

**OG Image Design Template:**
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <!-- Dark background matching site theme -->
  <rect width="1200" height="630" fill="#1a1b26"/>
  <rect x="40" y="40" width="1120" height="550" rx="16" fill="#24283b"/>
  
  <!-- Terminal dots -->
  <circle cx="80" cy="80" r="12" fill="#f7768e"/>
  <circle cx="112" cy="80" r="12" fill="#e0af68"/>
  <circle cx="144" cy="80" r="12" fill="#9ece6a"/>
  
  <!-- Accent bar -->
  <rect x="80" y="170" width="100" height="8" rx="4" fill="#7aa2f7"/>
  
  <!-- Title (split if long) -->
  <text x="80" y="280" font-family="monospace" font-size="48" font-weight="bold" fill="#c0caf5">Your Post Title</text>
  
  <!-- Hook/teaser line -->
  <text x="80" y="420" font-family="monospace" font-size="24" fill="#a9b1d6">Brief teaser that entices people to click</text>
  
  <!-- Branding -->
  <text x="80" y="530" font-family="monospace" font-size="20" fill="#565f89">jamesking.dev</text>
</svg>
```

**To create the PNG:**
```bash
convert -background "#1a1b26" -density 72 -resize 1200x630 input.svg output.png
```

**Include in frontmatter:**
```markdown
ogImage: "/og-image-YOUR-POST-SLUG.png"
```

### Type-Specific Fields

**For `links` type:**
```markdown
---
title: "Links of the Week"
type: links
date: 2026-04-06
links:
  - title: "Article Title"
    url: "https://..."
    description: "Why it's interesting"
  - title: "Another Article"
    url: "https://..."
---
```

**For `video` type:**
```markdown
---
title: "This Video is Amazing"
type: video
date: 2026-04-06
video: "https://youtube.com/watch?v=..."
---
```

**For `question` type:**
```markdown
---
title: "Question: Binary Search"
type: question
date: 2026-04-06
description: "Implement binary search algorithm"
---
```

## Adding Projects

Create a markdown file in `src/content/projects/`:

```markdown
---
title: "Project Name"
description: "What the project does"
tech: ["Laravel", "PHP", "Kubernetes"]
website: "https://project-url.com"
github: "https://github.com/..."
featured: true  # Shows in featured section
year: "2026"
---

## Additional details about the project...
```

## Design System

### Colors (Tokyo Night)

```css
--tokyo-bg: #1a1b26
--tokyo-bg-alt: #24283b
--tokyo-fg: #a9b1d6
--tokyo-fg-bright: #c0caf5
--tokyo-accent: #7aa2f7
--tokyo-border: #414868
--tokyo-success: #9ece6a
--tokyo-warning: #e0af68
--tokyo-error: #f7768e
--tokyo-purple: #bb9af7
--tokyo-cyan: #7dcfff
```

### Typography

- Font: JetBrains Mono (monospace)
- Headings: Bold, brighter foreground color
- Body: Standard foreground color
- Muted: For secondary text

### Components

- **Terminal Card**: Dark bg with colored dots header (like home page hero)
- **Card**: Standard content card with border
- **Tag**: Small colored pills for tech stack, content types
- **Details**: Collapsible FAQ sections

### External Links

All external links must follow this styling format:

```html
<a href="https://example.com?utm_source=jamesking.dev&utm_medium=referral" 
   target="_blank" 
   rel="noopener external" 
   class="text-tokyo-accent underline hover:text-tokyo-accent-hover"
   aria-label="Site Name (opens in new tab)">
   Link Text</a><span class="text-xs text-tokyo-muted">↗</span>
```

Key requirements:
- Always add UTM parameters: `utm_source=jamesking.dev&utm_medium=referral`
- Use `target="_blank"` and `rel="noopener external"` for security (always include `external`)
- Add underline styling with accent color
- Include `aria-label` for accessibility
- Place ↗ arrow immediately after the link text with NO space (e.g., `Link Text</a><span>` not `Link Text </a>`)
- Use `text-tokyo-accent` class for the link color

## SEO/AEO Guidelines

When modifying pages, preserve these:

1. **BaseLayout.astro** - Contains Person schema (update if details change)
2. **faq.astro** - Contains FAQPage schema
3. **projects/[slug].astro** - Contains SoftwareApplication schema
4. **blog/[slug].astro** - Contains BlogPosting schema
5. **Open Graph** - Update og-image.png if design changes

### OG Image Requirements

- **Always use PNG format** (not SVG - social platforms cache poorly with SVG)
- **Always 1200x630px** (use `convert -background "#1a1b26" -density 72 -resize 1200x630 input.svg output.png`)
- **Every blog post needs a custom OG image** in `public/og-image-{slug}.png`
- **Reference in frontmatter:** `ogImage: "/og-image-YOUR-POST-SLUG.png"`
- See "OG Images for Blog Posts" section above for design template

## Updating Information

When James asks to update info (like new job, skills, projects):

1. **Skills/Experience** - Edit `src/pages/about.astro`
2. **Uses** - Edit `src/pages/uses.astro`
3. **Now** - Edit `src/pages/now.astro`
4. **FAQ** - Edit `src/pages/faq.astro`
5. **Contact info** - Edit `src/pages/contact.astro`

### Copyright and Dates

When making significant updates to the site, remember to update:

1. **Copyright year** - Edit `src/components/Footer.astro` to update the year
2. **humans.txt** - Edit `public/humans.txt` to update "Last updated" date

## Building

```bash
npm install
npm run dev     # Development
npm run build   # Production build
npm run preview # Preview build
```

## Netlify

- Build command: `npm run build`
- Publish: `dist/`
- Forms: Enabled via `data-netlify="true"` on contact form
- CDN caching: Configured in netlify.toml

## Troubleshooting

- **Build fails**: Check `astro.config.mjs` and `src/styles/global.css` (Tailwind v4 config is in CSS)
- **Content not showing**: Check frontmatter in content files
- **Styles broken**: Verify TailwindCSS is properly configured
- **Schema errors**: Validate JSON-LD in BaseLayout
- **OG image not showing on social**: Use PNG format at 1200x630px, not SVG. Use debugger tools to clear cache (LinkedIn Post Inspector, Twitter Card Validator)

## Git Workflow

**Never commit and push without user confirmation.** After making changes:

1. Run `git status` to show what was changed
2. Ask the user if they want to commit and push
3. Only proceed after explicit confirmation
