---
title: "We're in Software's Golden Era. Laracon US 2026 Made It Obvious."
type: article
date: 2026-08-03
description: "Between AI doing the typing and last week's Laracon US 2026 announcements, this feels like the best time ever to build software. Here's what stood out and why it matters."
ogImage: "/og-image-software-golden-era.png"
---

We talk about golden ages like they're all in the past. The golden age of cinema. The golden age of radio. The golden age of the arcade. It's easier to romanticise something that's finished than something you're living through.

I've been building web software for over a decade, and I'm fairly sure the golden age of software development is happening right now, while we're all too busy shipping to notice. Last week I watched Laracon US from my desk, and the more I think about that keynote, the more convinced I am.

Taylor Otwell stood on stage in Boston and announced more stuff in a single keynote than most frameworks ship in a year. Image manipulation built into the framework. An editor-independent language server. A package runner for PHP that we've been begging for for years. Managed queues that scale to zero. A database that sleeps and wakes in under half a second.

But the thing that stuck with me wasn't any single announcement. It was the pattern behind all of them. Almost everything announced last week was designed for a world where AI agents write a lot of the code. And that, more than any one feature, is why I think this is the golden era.

## The Framework Stuff

Let me run through the highlights, because there were a lot.

**Laravel LSP.** The VS Code extension has quietly been doing the heavy lifting in my editor for ages: autocomplete for routes, views, config keys, translations, middleware. Now it's a <a href="https://github.com/laravel/lsp?utm_source=jamesking.dev&utm_medium=referral" target="_blank" rel="noopener external" class="text-tokyo-accent underline hover:text-tokyo-accent-hover" aria-label="Laravel LSP on GitHub (opens in new tab)">language server</a><span class="text-xs text-tokyo-muted">↗</span>, so NeoVim, Zed, and Sublime Text users get the same intelligence. Beyond making the editor crowd happy, an editor-agnostic server is exactly the kind of thing AI coding tools can plug into. One server, every tool benefits.

**Image manipulation.** A fluent API for resizing, converting formats, and setting device pixel ratio, all from PHP, no separate library. This is one of those "why didn't this exist before" additions. I have a side project that's been sat in a repo for a year, partly because I couldn't be bothered to wire up image handling for the hundredth time. That excuse is gone now.

**CPX.** PHP finally gets its `npx`. Run `cpx laravel/pint` without polluting your `composer.json`. Honestly, it's absurd it took this long. Node devs have had this for years and we've been watching them enjoy it.

**Package skeleton.** I remember hand-assembling package skeletons: config, migrations, routes, tests, CI, all wired up by hand. Now it's a GitHub template with an interactive setup script that deletes the stuff you don't need and even creates the repo for you.

There's more. `artisan dev` so local processes live in PHP instead of a fiddly `composer.json` script. A head tag API so your meta tags, OG images, and canonical links sit in one place instead of being scattered across your Blade views. Blade formatting in Pint. `artisan doctor` that runs health checks against your app and tells you exactly what's wrong when it can't fix it itself.

## The AI-Specific Stuff

Then came the AI SDK announcements, which were honestly the most telling part of the keynote.

**Human-in-the-loop tool approval.** Agents built with the <a href="https://laravel.com/docs/ai-sdk?utm_source=jamesking.dev&utm_medium=referral" target="_blank" rel="noopener external" class="text-tokyo-accent underline hover:text-tokyo-accent-hover" aria-label="Laravel AI SDK docs (opens in new tab)">Laravel AI SDK</a><span class="text-xs text-tokyo-muted">↗</span> now stop and ask before performing certain tool calls. Approve, deny, or modify before it acts. That's the safety rail that makes letting an agent near production actually palatable. I wrote recently about AI code governance, and this is exactly the kind of guardrail I was rambling about.

**Boost inferring conventions.** Laravel Boost now figures out your project's actual coding conventions and journals its decisions as it goes. So when an agent works in your codebase, it follows the patterns your team actually uses, not the patterns of some average Laravel app. That's the difference between AI code that looks alien and AI code that looks like it belongs.

**`Str::summarize()`.** Built-in, no config, uses the cheapest model on your provider. Pair it with an Eloquent observer and a summary field updates itself whenever the content changes. It's a small thing, but it's the kind of small thing that adds up.

**Pest 5 and the Tia engine.** This might be my favourite thing from the whole conference. <a href="https://pestphp.com?utm_source=jamesking.dev&utm_medium=referral" target="_blank" rel="noopener external" class="text-tokyo-accent underline hover:text-tokyo-accent-hover" aria-label="Pest (opens in new tab)">Pest 5</a><span class="text-xs text-tokyo-muted">↗</span>'s Test Impact Analysis records which tests touch which files, then only re-runs what a change actually affected. Nuno said his own suite was taking about three minutes. Laravel Cloud's 19,000 tests went from three minutes to five seconds. That's the kind of number that makes you sit up. And the reason it matters is AI: once agents run your test suite in a loop while you work, three minute suites become a wall. Five second suites become a habit.

## The Cloud Stuff

Then Laravel Cloud came out and had the "okay, they're not messing around" moment.

**Scale-to-zero Flex compute.** This one got the biggest reaction in the room. Your whole stack, MySQL included, sleeps and wakes in under 500 milliseconds. The old implementation took about ten seconds. Ten seconds is a coffee break. Half a second is a blink. Side projects, staging environments, internal tools, client demos, they all just became a lot cheaper to run, because you stop paying for compute nobody's using.

**Managed queues.** Workers on their own compute, scaling on queue depth, back to zero when the queue empties. Idle workers now wake in under a second, down from about thirty. FIFO queues for the payment and ledger people. One-click retry on failed jobs, with the reason right there in the dashboard.

**Next.js and Nuxt on Cloud.** Same repo, same bill, same team permissions. Your frontend no longer needs its own hosting platform, its own deployment pipeline, and its own monthly invoice.

## Why This Points to a Golden Era

Here's what I keep coming back to. A bunch of those announcements are aimed squarely at AI agents, and I don't think that's an accident.

`artisan doctor` is explicitly described as a natural final step for an AI coding agent. A sanity check before the agent calls the task done. Boost inferring conventions is so the AI writes code the way your team writes code. Human-in-the-loop approval is so you can trust an agent with real infrastructure. Tia exists because an agent runs your test suite a hundred times a day, which no human would ever do. Even scale-to-zero has an AI angle: when the cost of running an idle app approaches zero, you can deploy more things, more often, and let agents build more of them.

Every tool on that stage was designed for the workflow we actually have now, humans and agents working side by side. That's new. Frameworks used to be designed for a person typing in an editor, and everything else was an afterthought. Now the tooling assumes the thing doing the typing might be an agent, and it builds guardrails around that reality.

That's the golden era. Not because AI is magic, but because the boring friction is being removed at the same time AI removes the typing. The result is that a single developer with a decent idea can now do what used to take a small team. I can scaffold a package in minutes, generate the boring parts, deploy it somewhere that costs nothing when idle, and iterate on real feedback. That used to be days of setup before a single line of actual work happened.

## The Honest Counterpoint

I'd be lying if I said this doesn't come with a catch.

I've written before about reviewing AI-generated code and about what I stopped doing when I started using AI. The theme there was that AI is a force multiplier, and it multiplies what you already are. The golden era works the same way. The barrier to making something has never been lower, but the bar for making something good hasn't moved at all.

Human-in-the-loop approval is only useful if the human in the loop understands the tools. Boost infers your conventions, but you need conventions worth inferring. Tia makes a three minute suite fast, but you still need the tests. None of this removes judgment. It removes typing.

The flip side is that the same ease of use is now available to people who've never written a line of code in their life. That part genuinely worries me. When the cost of building a thing drops far enough, you start getting software created by people who have no idea what a database index is, or why you don't put a secret in the frontend bundle, or that a form needs validation on the server, not just in the browser. They'll ship it, get customers, and only find out it's on fire when it's on fire. I'm not scared of the tools. I'm scared of the gap between "I made a thing" and "I understand what this thing does" and AI is making that gap easier to fall into, not harder. The barrier to entry dropping is wonderful, and it's also how we end up with a whole lot of dangerous software.

The other thing that genuinely saddens me about this era, and this might be a UK thing, is that applications for computer science and software engineering degrees are going the other way. School leavers look at an industry where every tool promises to write your code for you and figure they don't need three years and a lifetime of debt to learn the fundamentals. So in a few years there genuinely won't be many graduate software engineers coming through. Which is a shame, because they're exactly the people we're going to need, the ones who understand why a thing works, not just how to prompt it into existence. Nobody's prompting their way into maintaining a fifteen year old legacy codebase. Somebody has to actually understand that, and if the only people left who do are the ones who haven't retired yet, the whole industry is going to feel that gap.

## Enjoy It

I spend a lot of time around developers who are gloomy about the industry. Every new AI announcement brings a fresh wave of "this is the end." I don't buy it. I watched a framework announce, in one keynote, a language server, a package runner, a database that sleeps, queues that scale to nothing, and an ecosystem of tooling built for the way I actually work. If that's not a golden era, I don't know what is.

The <a href="https://laravel.com/blog/everything-we-announced-at-laracon-us-2026?utm_source=jamesking.dev&utm_medium=referral" target="_blank" rel="noopener external" class="text-tokyo-accent underline hover:text-tokyo-accent-hover" aria-label="Official Laracon US 2026 recap (opens in new tab)">official recap</a><span class="text-xs text-tokyo-muted">↗</span> has the full list if you want to dig into any of it. I'd recommend it.

It's a good week to be a PHP developer. And honestly, a good decade to be building software.
