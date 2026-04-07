---
title: "Hello World - Welcome to My New Website"
type: article
date: 2026-04-06
description: "Introducing my new personal website built with Astro, featuring a Tokyo Night design and flexible blog content types."
quote: "The beginning is the word and the end is silence. And in between are all the stories."
---

I've been working on this site for a while now, and I'm excited to finally launch it. Here's what I've built:

## Why Astro?

<a href="https://astro.build?utm_source=jamesking.dev&utm_medium=referral" rel="noopener noreferrer external" target="_blank" class="text-tokyo-accent underline hover:text-tokyo-accent-hover" aria-label="Astro (opens in new tab)">Astro</a><span class="text-xs text-tokyo-muted">↗</span> is an incredible framework for static sites. It's fast, flexible, and has excellent developer experience. Perfect for a personal site that needs to be performant and easy to maintain.

## The Design

Inspired by my Omarchy Linux setup, I've used the Tokyo Night color scheme throughout:

- <span style="display:inline-block;width:1rem;height:1rem;background-color:#1a1b26;border:1px solid #565f89;border-radius:2px;vertical-align:middle;margin-right:0.5rem"></span>Background: #1a1b26
- <span style="display:inline-block;width:1rem;height:1rem;background-color:#7aa2f7;border-radius:2px;vertical-align:middle;margin-right:0.5rem"></span>Accent: #7aa2f7
- <span style="display:inline-block;width:1rem;height:1rem;background-color:#a9b1d6;border-radius:2px;vertical-align:middle;margin-right:0.5rem"></span>Foreground: #a9b1d6

The font is JetBrains Mono for that terminal aesthetic.

## Flexible Content

One of my goals was to have a flexible blog system. I've built support for:

- **Articles** - Long-form posts for tutorials and deep dives
- **Notes** - Short-form updates and quick thoughts
- **Links** - Link roundups (inspired by cassidoo's newsletter)
- **Videos** - Share interesting videos I find
- **Questions** - Coding interview questions

This makes daily blogging achievable while maintaining variety.

## A Trip Down Memory Lane

I've been building websites for a long time. Here's the evolution of my personal site:

### Version 1 (2010)

![Version 1 (2010](/screenshots/v1-2010.png)

<a href="https://wordpress.org?utm_source=jamesking.dev&utm_medium=referral" rel="noopener noreferrer external" target="_blank" class="text-tokyo-accent underline hover:text-tokyo-accent-hover" aria-label="WordPress (opens in new tab)">WordPress</a><span class="text-xs text-tokyo-muted">↗</span> with an off-the-shelf theme called OverEasy by <a href="https://woocommerce.com?utm_source=jamesking.dev&utm_medium=referral" rel="noopener noreferrer external" target="_blank" class="text-tokyo-accent underline hover:text-tokyo-accent-hover" aria-label="WooThemes (opens in new tab)">WooThemes</a><span class="text-xs text-tokyo-muted">↗</span>. Each page was separate and had full pages for each project I had worked on. It also included a "Work Status" indicator I could update with my freelance availability.

### Version 2 (2012)

![Version 2 (2012](/screenshots/v2-2012.jpg)

A static website I hand-wrote using procedural PHP scripts. Each page had its own script file and was built to be very centred on screen in a very minimalistic styling. I didn't use anything off-the-shelf for this one.

### Version 3 (2013)

![Version 3 (2013](/screenshots/v3-2013.png)

A static website using an off-the-shelf theme called CVilized which was inspired to look like a single-page CV / resume with extra details added on (about me and projects). The site was only a single webpage and also included a "Work Status" check for freelance availability.

### Version 4 (2015)

![Version 4 (2015](/screenshots/v4-2015.png)

A static website using an off-the-shelf <a href="https://getbootstrap.com/docs/3.4/?utm_source=jamesking.dev&utm_medium=referral" rel="noopener noreferrer external" target="_blank" class="text-tokyo-accent underline hover:text-tokyo-accent-hover" aria-label="Bootstrap 3 (opens in new tab)">Bootstrap 3</a><span class="text-xs text-tokyo-muted">↗</span> theme called MeFlat. This site has stood the longest and I learned a lot about CI/CD workflows with <a href="https://github.com?utm_source=jamesking.dev&utm_medium=referral" rel="noopener noreferrer external" target="_blank" class="text-tokyo-accent underline hover:text-tokyo-accent-hover" aria-label="GitHub (opens in new tab)">GitHub</a><span class="text-xs text-tokyo-muted">↗</span>. The site used <a href="https://percy.io?utm_source=jamesking.dev&utm_medium=referral" rel="noopener noreferrer external" target="_blank" class="text-tokyo-accent underline hover:text-tokyo-accent-hover" aria-label="Percy (opens in new tab)">Percy</a><span class="text-xs text-tokyo-muted">↗</span> to check for visual regressions when changes were made and used <a href="https://github.com/renovatebot/renovate?utm_source=jamesking.dev&utm_medium=referral" rel="noopener noreferrer external" target="_blank" class="text-tokyo-accent underline hover:text-tokyo-accent-hover" aria-label="Renovate (opens in new tab)">Renovate</a><span class="text-xs text-tokyo-muted">↗</span> to keep dependencies updated. Again a single page website acting like a CV / advertisement of freelance services.

### Version 5 (2025) - Current

This new version is built with <a href="https://astro.build?utm_source=jamesking.dev&utm_medium=referral" rel="noopener noreferrer external" target="_blank" class="text-tokyo-accent underline hover:text-tokyo-accent-hover" aria-label="Astro (opens in new tab)">Astro</a><span class="text-xs text-tokyo-muted">↗</span> and styled with <a href="https://tailwindcss.com?utm_source=jamesking.dev&utm_medium=referral" rel="noopener noreferrer external" target="_blank" class="text-tokyo-accent underline hover:text-tokyo-accent-hover" aria-label="TailwindCSS (opens in new tab)">TailwindCSS</a><span class="text-xs text-tokyo-muted">↗</span>. The site is hosted on <a href="https://netlify.com?utm_source=jamesking.dev&utm_medium=referral" rel="noopener noreferrer external" target="_blank" class="text-tokyo-accent underline hover:text-tokyo-accent-hover" aria-label="Netlify (opens in new tab)">Netlify</a><span class="text-xs text-tokyo-muted">↗</span> with CDN caching configured for optimal performance. Following the tradition of Version 4, visual regression testing is handled by <a href="https://percy.io?utm_source=jamesking.dev&utm_medium=referral" rel="noopener noreferrer external" target="_blank" class="text-tokyo-accent underline hover:text-tokyo-accent-hover" aria-label="Percy (opens in new tab)">Percy</a><span class="text-xs text-tokyo-muted">↗</span>, and dependencies are kept up to date with <a href="https://github.com/renovatebot/renovate?utm_source=jamesking.dev&utm_medium=referral" rel="noopener noreferrer external" target="_blank" class="text-tokyo-accent underline hover:text-tokyo-accent-hover" aria-label="Renovate (opens in new tab)">Renovate</a><span class="text-xs text-tokyo-muted">↗</span>. All source code is available on <a href="https://github.com/Jamesking56/jamesking.dev?utm_source=jamesking.dev&utm_medium=referral" rel="noopener noreferrer external" target="_blank" class="text-tokyo-accent underline hover:text-tokyo-accent-hover" aria-label="GitHub (opens in new tab)">GitHub</a><span class="text-xs text-tokyo-muted">↗</span>.

The design is inspired by my <a href="https://omarchy.org?utm_source=jamesking.dev&utm_medium=referral" rel="noopener noreferrer external" target="_blank" class="text-tokyo-accent underline hover:text-tokyo-accent-hover" aria-label="Omarchy Linux (opens in new tab)">Omarchy Linux</a><span class="text-xs text-tokyo-muted">↗</span> desktop setup, featuring the Tokyo Night color scheme and JetBrains Mono font for a terminal-inspired aesthetic.

## What's Next

I'll be posting regularly on:

- Development with Laravel, PHP, Symfony
- AI-augmented development workflows
- Kubernetes and DevOps
- Tech tips and tricks

Stay tuned!
