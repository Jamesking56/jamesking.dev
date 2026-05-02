# Domain Docs

## Layout

Single-context: one `CONTEXT.md` and `docs/adr/` at the repo root.

## Consumer rules

Skills that read domain docs (`improve-codebase-architecture`, `diagnose`, `tdd`):

1. Read `CONTEXT.md` first to learn domain language and key concepts
2. Read `docs/adr/` to understand past architectural decisions
3. If `CONTEXT.md` does not exist, proceed without it (don't block)
