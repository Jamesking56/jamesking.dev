---
title: "What I Stopped Doing When I Started Using AI"
type: article
date: 2026-04-16
description: "I stopped writing boilerplate, tests, and docs when I started using AI. But I ramped up code review, debugging, and prompt engineering. Here's what actually changed."
ogImage: "/og-image-ai-workflow.png"
---

The conversation around AI in software development usually goes one of two ways: AI is going to replace developers, or AI is useless and you're doing it wrong. After a few months of genuinely integrating AI into my daily workflow, I've found neither framing is useful.

Here's my honest answer.

<figure>
  <img src="/screenshots/ai-developer-workflow.jpg" alt="Developer working with AI tools showing code on a screen" />
  <figcaption>Photo by Luca Bravo on Unsplash</figcaption>
</figure>

## The Honest Split

When I started using AI coding tools properly, my role didn't disappear. It shifted. Some things I stopped doing entirely. Some things I do more of now. And the changes aren't what the productivity boosters promised or the skeptics warned about.

### What I Stopped Doing

**Writing boilerplate code.** This one happened first and felt obvious. CRUD endpoints, data models, form validation, API clients, configuration files. If I've seen the pattern before and I know what I need, AI generates it faster and with fewer typos than I would. I review it. I don't write it.

**Writing tests.** This one's more controversial. I used to write tests before implementation (TDD, all that). Now AI generates the test suite alongside the code. I review the tests, I write edge cases, I catch anything that looks wrong. But the mechanical work of translating code into test coverage? AI handles that now.

**Writing documentation.** Internal docs, README files, API documentation, inline comments for standard patterns. AI generates a reasonable first pass. I edit it, I add context AI wouldn't know, I catch the places where it confidently explains things that are wrong.

### What I Do More Of

**Code review.** This surprised me. You'd think if AI writes the code, you need less review. But the opposite is true. AI generates quickly, which means more iterations, more possibilities, more surface area to cover. I've become more rigorous about review because the stakes are higher when code arrives fast and confident.

**Manual QA testing.** AI is good at generating tests. It's less good at knowing if the thing it's testing is actually what users need. I test more manually now, not less, because AI accelerates the wrong thing if you're not careful.

**The blind spots.** This is where AI consistently surprises me with what it misses. A concrete example: AI will happily generate a button component that looks correct to a developer but is subtly broken for users. The button exists, it has the right colors, the right text. But it never occurred to the AI to set `cursor: pointer`. So to the user, the button doesn't look clickable. No error, no warning, the code is syntactically correct. But the experience is wrong. These are the gaps that only manual testing catches.

**Debugging.** The irony is not lost on me. AI helps me write code faster, but I debug more. The debugging work hasn't gone away; it's just become more concentrated. When something breaks in production, I need to understand it well enough to diagnose and fix. AI helps me explore the problem space faster, but I still need to reason through the solution.

**Prompt engineering and AI skills writing.** This is the new work. Writing effective prompts, creating reusable AI skills for common tasks, designing the instructions that guide how AI operates in my projects. It's a design discipline, not a typing discipline. And it takes real thought.

**AI governance.** Who reviews AI-generated code? What standards does it need to meet? How do you maintain consistency across a codebase when multiple people are using AI differently? These questions don't have obvious answers. I've been thinking about them more.

## The Uncomfortable Part

The thing nobody talks about honestly is that using AI well requires you to be better at the things AI can't do. If you write mediocre code and hand it off to AI, you get mediocre code faster. The quality of your architecture decisions, your understanding of requirements, your judgment about what's right for users, your ability to spot when something is subtly wrong. Those things matter more now, not less.

Using AI effectively is a force multiplier for expertise. If you don't have the expertise, the multiplication doesn't help much.

## The Workflow Itself

For the curious, my actual setup is OpenCode for agentic tasks, GitHub Copilot for inline suggestions, and a collection of custom skills and MCPs (Model Context Protocol) for tasks specific to my work. I'm also working on writing MCPs for AI integration into internal systems, which has been an interesting challenge in designing interfaces that AI can work with effectively.

The key insight is that the AI doesn't change the fundamentals. Good requirements still matter. Architecture still matters. Understanding the problem still matters. The AI just changes where you spend your time.

## The Question Worth Asking

If AI handles your implementation, what do you actually want to be good at?

That's a better question than "should I use AI" or "is AI replacing developers." The answer shapes how you spend your time, what you invest in learning, and what kind of developer you become.

I've made my choice. I stopped writing boilerplate. I ramped up code review. I invested in prompt engineering. And I think about AI governance more than I expected to.

The code still needs to work. That's still on me.
