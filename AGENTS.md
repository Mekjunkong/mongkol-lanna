# MONGKOL LANNA agent rules

1. Read `PRODUCT_ARCHITECTURE.md` and `IMPLEMENTATION_PLAN.md` before editing.
2. Keep `REAL_GENERATION=false`; tests and development must use mock providers.
3. Thai + Lanna only. Never invent historical, religious, astrological or sacred claims.
4. Never generate or request Thai/Lanna/Pali pseudo-writing, yantras, signatures, logos or watermarks in art.
5. Raw customer story, name and birth details must never enter compiled image prompts.
6. Unreviewed culturally specific, mythological or sacred-adjacent records remain inactive/review-required.
7. Keep UI, domain logic, persistence, providers, payments and analytics separated.
8. Prefer deterministic rules and immutable versions for Story Interpreter, Art Brain, Blueprint and Prompt Composer.
9. Maximum automatic generation retry is one; subjective dissatisfaction never triggers automatic regeneration.
10. Do not add secrets, deploy, publish, spend credits or activate payments without explicit approval.
11. Make surgical changes and run relevant tests, typecheck, lint and build before claiming completion.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
