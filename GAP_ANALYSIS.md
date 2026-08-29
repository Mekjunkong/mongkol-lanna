# MONGKOL LANNA — Gap Analysis

**Date:** 2026-08-29  
**Status legend:** `DONE` · `PARTIAL` · `MISSING` · `CHANGE`

## Inspection evidence

The host was searched under `/root`, `/root/projects`, `/opt`, `/srv`, `/var/www`, and `/home` for repository names and source references matching `MONGKOL LANNA`, `MONGKOL CANVAS`, `ART_BRAIN`, and `THAI_LANNA_MASTER_DNA`. No existing implementation was found. The founder explicitly approved creating a new project at `/root/projects/mongkol-canvas` using a Next.js modular-monolith foundation.

This document therefore treats the supplied master brief as the product source of truth and records the greenfield baseline. No existing customer data, production service, or deployment has been changed.

## Foundation

| Area | Status | Evidence / required change |
|---|---|---|
| Repository | DONE | New isolated Git repository initialized at `/root/projects/mongkol-canvas` on `main`. |
| Existing application | MISSING | No application source existed at inspection time. |
| Architecture document | PARTIAL | Product brief exists in conversation; `PRODUCT_ARCHITECTURE.md` must formalize boundaries and decisions. |
| Runtime stack | MISSING | Approved target: Next.js + TypeScript modular monolith. |
| Database | MISSING | Approved target: PostgreSQL with Drizzle; local/test-safe setup required. |
| Environment contract | MISSING | Must include `REAL_GENERATION=false` by default and server-only secrets. |
| Deployment | MISSING | Must be documented and remain behind founder approval. |
| CI/quality gates | MISSING | Typecheck, lint, unit, integration, browser, accessibility, and build checks required. |

## P0 — Art system

| Capability | Status | Required implementation |
|---|---|---|
| `ART_BRAIN` | MISSING | Deterministic orchestration from validated choices to a coherent blueprint; no naive concatenation. |
| `STORY_INTERPRETER` | MISSING | Convert optional story into bounded structured fields; raw story never enters provider prompts. |
| `THAI_LANNA_MASTER_DNA` | MISSING | Versioned prompt/art-direction data with Thai/Lanna-only visual vocabulary. |
| Visual metaphor library | MISSING | Curated artistic metaphors tagged as interpretation, not religious/historical fact. |
| Art worlds | MISSING | Data-driven worlds with DNA, palettes, symbols, compositions, constraints, and active state. |
| Archetypes | MISSING | Deterministic archetype grammar, hierarchy, placement, density, and negative-space rules. |
| Symbol library | MISSING | Structured symbols with cultural note, artistic interpretation, confidence, compatibility, conflicts, and status. |
| Cultural confidence | MISSING | `VERIFIED`, `INSPIRED`, `DECORATIVE` enforced in data and customer copy. |
| Spiritual level | MISSING | `CULTURAL`, `SYMBOLIC`, `SACRED`; default `SYMBOLIC`; sacred content human-approved only. |
| Symbol budget | MISSING | One hero, two-to-four supports in balanced mode; coherence checks. |
| Palette engine | MISSING | Curated structured palettes only; reject neon/arbitrary provider colors. |
| Composition engine | MISSING | Eight approved composition grammars plus format-safe-zone rules. |
| Detail/tradition controls | MISSING | `SERENE/BALANCED/GRAND` and `HERITAGE/BALANCED/CONTEMPORARY`. |
| Artwork title engine | MISSING | Collectible title patterns with banned low-quality marketing vocabulary. |
| Prompt composer | MISSING | Versioned compiler with validation, guardrails, negative rules, and persisted output. |
| No-generated-text guard | MISSING | Ban text, scripts, mantras, yantras, dates, names, signatures, logos, and watermarks in generated art. |
| Mock image provider | MISSING | Deterministic placeholders; no paid provider calls. |
| Art Critic | MISSING | Structured QA score and failure tags; no regeneration loops. |
| Art Lab | MISSING | Admin testing of data selections, blueprints, prompts, mock results, cost estimates, QA, and comparisons. |

## Customer MVP

| Capability | Status | Required implementation |
|---|---|---|
| Homepage | MISSING | Five-second comprehension, artwork-led quiet-luxury experience, primary/secondary CTA. |
| Mobile creation wizard | MISSING | Intention → story → world → mood → hero → details with progress and validation. |
| Wizard persistence | MISSING | Refresh-safe draft without leaking sensitive data. |
| Artwork Blueprint | MISSING | Narrative, hierarchy, symbols, world, palette, mood, detail, tradition, composition, story, edit/confirm. |
| Mock preview | MISSING | Safe-zone overlays and explicit mock state; duplicate protection. |
| Mock checkout | MISSING | Payment abstraction with no credential dependency. |
| Premium reveal | MISSING | Artwork → story → elements → downloads stages. |
| Library/orders | MISSING | Authenticated artwork and order history. |
| Download formats | MISSING | Lock/home mock assets first; blueprint remains independent of output formats. |
| Gallery/favorites | MISSING | Curated examples and taste signals without copying compositions. |
| Thai/English i18n | MISSING | Central dictionaries; no scattered hard-coded copy. |

## Admin and operations

| Capability | Status | Required implementation |
|---|---|---|
| Secure admin shell | MISSING | Server-authorized admin routes and actions. |
| Orders/customers/artworks | MISSING | Searchable operational tables and detail views. |
| Generation jobs/attempts/costs | MISSING | Status, IDs, hashes, retries, timeouts, provider/model, cost, errors, timestamps. |
| Content management | MISSING | Worlds, symbols, archetypes, palettes, prompt versions, packages, settings. |
| QA review | MISSING | Ratings, failure tags, score components, review queue. |
| Prompt comparison | MISSING | Side-by-side Art Lab output and prompt-version comparison. |
| Configurable packages/pricing | MISSING | Admin/config-driven; no permanent values in UI components. |

## Safety, cost, and cultural integrity

| Control | Status | Required implementation |
|---|---|---|
| Real-generation kill switch | MISSING | `REAL_GENERATION=false` required by default; real adapter refuses calls unless explicitly enabled server-side. |
| Duplicate protection | MISSING | Stable request hash and unique/idempotency boundary. |
| Retry control | MISSING | Maximum one automatic retry; no aesthetic auto-regeneration. |
| Rate limiting | MISSING | Customer and admin limits around expensive/sensitive operations. |
| Cost logging | MISSING | Estimated and actual costs by generation attempt and order. |
| Input validation | MISSING | Typed schemas, length limits, normalized enums, story sanitization. |
| Secrets | MISSING | Server-only environment parsing; never exposed through client bundles. |
| Auth/RBAC | MISSING | Customer ownership checks and admin role authorization. |
| Cultural mixing guard | MISSING | Thai/Lanna-only allowlists plus prohibited-culture/architecture constraints. |
| Sacred content gate | MISSING | No generated sacred writing; sacred imagery requires approved records and human review. |
| Astrology boundary | MISSING | Optional birth data stored only with explanation; no calculation engine in MVP. |
| Reference-art safety | MISSING | References inform principles only; prohibit tracing, signature/watermark reuse, and composition copying. |

## Platform readiness

| Area | Status | Required implementation |
|---|---|---|
| Analytics | MISSING | Event contract and privacy-conscious sink; admin metrics derived from recorded events. |
| SEO | MISSING | Metadata, canonicals, OG, structured data, sitemap, robots, and a small curated landing-page set. |
| Accessibility | MISSING | Keyboard, focus, labels, contrast, reduced motion, semantic progress, responsive touch targets. |
| Performance | MISSING | Mobile image strategy, route budgets, lazy loading, and measured build/browser checks. |
| Error handling | MISSING | Provider/payment/database errors represented honestly with retry-safe UX. |
| Production runbook | MISSING | Environment, migrations, backups, rollback, monitoring, and approval gates. |

## Priority decisions

1. Build P0 art intelligence and deterministic mock workflow before visual polish or paid integrations.
2. Keep customer-facing language free of AI terminology, supernatural promises, fabricated history, astrology, and sacred text.
3. Store blueprint independently from format and generated assets.
4. Treat provider, payment, analytics, and storage as ports with mock adapters.
5. Use database/config-backed packages and art-system content; seed curated defaults but do not hard-code permanent commercial pricing.
6. Require an explicit founder gate before enabling real generation, payment credentials, database migrations against production, deployment, or public publishing.

## Current blocker

No product blocker remains for architecture work. Implementation must wait until the consolidated architecture/design specification is reviewed against the three bot-team reports and approved as the build contract.
