# MONGKOL LANNA — Implementation Plan

**Date:** 2026-08-29  
**Rule:** Complete and verify each milestone before starting the next. Keep `REAL_GENERATION=false`; do not configure paid image or payment credentials.

## Milestone 0 — Greenfield foundation

### Deliverables

- Scaffold Next.js App Router with TypeScript strict mode, Tailwind, ESLint and pnpm.
- Establish import aliases and server-only boundaries.
- Add `src/config/env.server.ts` and `src/config/env.public.ts` with Zod validation.
- Add `.env.example` containing safe placeholders and `REAL_GENERATION=false`.
- Configure Vitest, Testing Library and Playwright.
- Add CI-equivalent scripts: `lint`, `typecheck`, `test`, `test:e2e`, `build`, `verify`.
- Add Thai/English locale dictionaries and locale resolution.
- Add the base design tokens and font setup.

### Acceptance

- Default startup and tests work without provider/payment credentials.
- A test proves real generation cannot be enabled accidentally.
- Thai and English sample routes render correct `lang` metadata.
- Lint, typecheck, unit test and production build pass.

## Milestone 1 — Domain schemas and curated seed framework

### Files/modules

- `src/domains/catalog/schemas.ts`
- `src/domains/catalog/types.ts`
- `src/domains/catalog/repository.ts`
- `src/domains/culture/policy.ts`
- `src/domains/culture/guards.ts`
- `src/domains/culture/confidence.ts`
- `src/domains/catalog/seeds/*.ts`

### Deliverables

- Enums and schemas for intentions, moods, worlds, archetypes, symbols, palettes, compositions, metaphors, detail/tradition/spiritual levels and review status.
- Curated non-commercial starter data for the eight requested worlds, ten archetype records, seven palettes and eight compositions.
- Records that lack human evidence are `DRAFT`/`REVIEW_REQUIRED`, not `VERIFIED`.
- Eight-to-twelve low-risk registry candidates, explicitly unpublished until reviewed.
- Compatibility/conflict rules and immutable catalog-version snapshots.

### Acceptance

- Schema tests reject unknown confidence, vague regional labels, fake text/script requests and sacred escalation.
- Inactive/review-required records cannot enter automatic selection.
- Seed IDs are unique; compatibility references resolve; no permanent package price appears in UI code.

## Milestone 2 — Story Interpreter

### Files/modules

- `src/domains/story/schema.ts`
- `src/domains/story/interpreter.ts`
- `src/domains/story/rules.ts`
- `src/domains/story/fixtures.ts`

### Deliverables

- Validate one-to-five sentence stories with strict length and content limits.
- Deterministically extract life theme, emotional tone, intention, journey state and allowlisted visual metaphor IDs.
- Never pass raw story to prompt composition.
- Handle Thai and English fixtures and an explicit “needs confirmation” fallback.

### Acceptance

- Same input/version gives identical interpretation.
- Sensitive inference, astrology and religious/supernatural claims are absent.
- At least twenty representative/adversarial fixtures pass.

## Milestone 3 — ART_BRAIN and Artwork Blueprint

### Files/modules

- `src/domains/art-brain/scoring.ts`
- `src/domains/art-brain/symbol-budget.ts`
- `src/domains/art-brain/hierarchy.ts`
- `src/domains/art-brain/engine.ts`
- `src/domains/artwork/blueprint.ts`
- `src/domains/artwork/title-engine.ts`
- `src/domains/artwork/safe-zones.ts`

### Deliverables

- Score archetype, metaphor, palette and composition against validated input.
- Select one hero and bounded support/environment elements.
- Produce explicit hero/secondary/background/decoration hierarchy and negative-space zone.
- Apply lock/home safe-zone rules.
- Create a poetic title through curated templates and banned-term checks.
- Persist immutable Blueprint revisions with decision trace and catalog versions.

### Acceptance

- Same input/versions yields same Blueprint.
- Every Blueprint satisfies invariants and symbol budget.
- Changing an upstream choice invalidates only dependent outputs.
- No sacred/review-required asset or fake historical meaning passes.

## Milestone 4 — Thai/Lanna Master DNA and Prompt Composer

### Files/modules

- `src/domains/prompt/master-dna.ts`
- `src/domains/prompt/compiler.ts`
- `src/domains/prompt/guards.ts`
- `src/domains/prompt/hash.ts`
- `src/domains/prompt/versions.ts`

### Deliverables

- Version the Thai/Lanna Master DNA, quality rules and negative constraints.
- Compile only from immutable Blueprint and approved catalog fragments.
- Persist positive/negative prompts, versions and compilation hash.
- Ban text, pseudo-script, vague Asian styling, reference copying, watermarks and unrelated architecture.

### Acceptance

- Raw story/name/birth values never occur in compiled prompt snapshots.
- Hostile text is escaped/rejected.
- Prompt snapshot tests are deterministic and version-aware.

## Milestone 5 — Generation, mock provider and Art Critic

### Files/modules

- `src/domains/generation/provider.ts`
- `src/providers/image/mock-provider.ts`
- `src/providers/image/provider-factory.server.ts`
- `src/domains/generation/jobs.ts`
- `src/domains/generation/idempotency.ts`
- `src/domains/generation/cost.ts`
- `src/domains/qa/art-critic.ts`

### Deliverables

- Implement provider interface and deterministic mock assets.
- Add request hashing, unique active request, statuses, timeout, one-retry ceiling, error classification and event audit.
- Add estimated/actual cost fields even when mock cost is zero.
- Implement Art Critic dimensions, hard failures, `/100` score and review routing.

### Acceptance

- Double submission produces one active generation job.
- `REAL_GENERATION=false` makes real adapter resolution impossible.
- Retry count cannot exceed one.
- Low score produces review status, not automatic generation.

## Milestone 6 — Database and application services

### Deliverables

- Add Drizzle schemas for users/roles, requests, interpretations, Blueprints, artworks/assets, catalog/versioning, prompts, jobs/attempts/events, QA, packages/orders/payment attempts, favorites, settings and analytics events.
- Implement repositories behind module interfaces.
- Add PostgreSQL migration and test-database lifecycle.
- Add Auth.js boundary, ownership policies and admin role enforcement.
- Add server-action result convention, rate limiter port and audit logger.

### Acceptance

- Integration tests prove object ownership and admin authorization.
- Catalog edits cannot mutate past Blueprint snapshots.
- Transactions enforce idempotency and exactly-once mock entitlement.
- Migrations apply and rollback in an isolated test database.

## Milestone 7 — Admin Art Lab P0

### Deliverables

- Build protected `/admin/art-lab` workspace.
- Choose input, catalog/version and provider/model fixture.
- Display Story Interpretation, Blueprint, compiled prompt, mock result, cost and QA.
- Record human rating/failure tags.
- Compare prompt versions without mutating customer work.
- Add catalog CRUD with draft/review/published/archive transitions and audit.

### Acceptance

- Admin authorization is checked on every read/mutation.
- Internal notes cannot become customer copy.
- Retry cannot overwrite last successful asset.
- Art Lab uses production domain services, not duplicated demo logic.

## Milestone 8 — Mobile customer MVP

### Deliverables

- Build artwork-led homepage and localized navigation.
- Build one-decision-per-view wizard with semantic progress, 44px+ controls, autosave and dependency notices.
- Build Blueprint review/edit/confirm.
- Build safe-zone mock preview and explicit “no real generation/charge” development state.
- Build mock checkout, premium reveal, account library, artwork/order detail and mock downloads.

### Acceptance

- Full journey works at 320, 375 and 430px and desktop.
- Back/refresh/resume preserves valid state without duplicate drafts/jobs/orders.
- Reveal supports reduced motion and does not replay unexpectedly.
- Customer-facing routes never expose prompts, model names or technical AI language.

## Milestone 9 — Platform readiness

### Deliverables

- Curated public gallery/collection/SEO routes with human-authored copy only.
- Metadata, canonical/hreflang, Open Graph, structured data, sitemap and robots.
- Typed analytics events with no raw personal story/prompt data.
- Secure headers, redacted logs, deletion/retention rules and private asset delivery.
- Performance and accessibility budgets.

### Acceptance

- Public sitemap contains only active meaningful pages.
- Account/admin/API paths are excluded from indexing.
- WCAG 2.2 AA automated checks and manual keyboard flow pass.
- No secrets or server provider code appear in client bundles.

## Milestone 10 — Final QA and readiness packet

- Run `pnpm verify` and Playwright mobile/desktop suites.
- Exercise provider timeout, duplicate, rate limit, checkout duplicate and authorization failures.
- Run independent architecture, cultural-safety, code and UX reviews.
- Produce deployment/env/migration/backup/rollback runbook.
- Produce a founder approval packet listing exact commit, checks and remaining gates.

No deployment, real Kie call, real payment or public publishing occurs in this milestone without separate explicit founder approval.
