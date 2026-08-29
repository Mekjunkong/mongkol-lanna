# MONGKOL LANNA — Approved Design Contract

**Date:** 2026-08-29  
**Status:** Founder direction captured; bot-team reviewed; implementation approval pending written-spec review.

## Product

MONGKOL LANNA is a mobile-first personal Thai–Lanna art atelier. The customer commissions an original contemporary artwork through a guided, culturally careful experience. The product sells art direction, storytelling, composition and personal meaning—not “an AI wallpaper.”

## Experience direction

Use **The Quiet Commission**: contemporary Thai art gallery × Lanna atelier × quiet luxury. Warm ivory is the dominant field; jade is functional; antique gold is decoration only; vermillion is rare. Large artwork, continuous editorial sheets, restrained texture and generous space replace SaaS cards, ecommerce pressure and mystical ritual framing.

The customer path is:

`Home → Intention → Optional story → Art world → Mood → Hero → Details → Blueprint → Mock preview → Mock checkout → Reveal → Library`

The wizard contains no AI vocabulary and no inscription/text-generation step. Future verified typography is a separate post-art layer.

## System direction

Build a Next.js App Router + strict TypeScript modular monolith backed by PostgreSQL/Drizzle. Domain modules expose application services and ports; UI does not import provider SDKs or repositories directly. Binary assets use an `AssetStore` abstraction.

The immutable Artwork Blueprint is the creative system’s center. Story interpretation, archetype selection, symbol budget, palette, composition, hierarchy, safe zones and prompt compilation are deterministic and versioned in P0.

## Cultural contract

- Thai + Lanna only.
- Cultural facts require human-reviewed evidence.
- `VERIFIED`, `INSPIRED` and `DECORATIVE` are distinct and cannot be silently promoted.
- Sacred content is fail-closed.
- Mythological and sacred-adjacent catalog records remain draft/review-required until Thai/Lanna human approval.
- No generated text, Thai/Lanna/Pali pseudo-script, yantras, signs, logos, numbers, signatures or watermarks.
- Reference images are principle-only. No tracing, artist imitation or recognizable composition transfer.
- Unknown or ambiguous elements are removed or routed to review, never invented.

## Cost and provider contract

`REAL_GENERATION=false` is the default and must fail closed. P0 uses deterministic mock assets. Every generation action is hashed, idempotent, rate-limited, status-tracked and cost-logged. Maximum automatic retry is one and only for typed transient failures. Subjective imperfection never triggers an automatic regeneration loop.

## Admin contract

Art Lab uses the same domain services as the customer flow and exposes Blueprint, compiled prompt, versions, mock result, cost estimate, Art Critic score, human rating and failure tags. Catalog changes create revisions; historical commissions retain immutable snapshots.

## Quality contract

P0 is accepted only after strict typecheck, lint, unit/integration tests, production build, Playwright mobile/desktop flows, WCAG 2.2 AA checks, duplicate/concurrency tests, fail-closed provider tests and independent review. No deployment, paid generation or live payment occurs without explicit founder approval.

Full architecture: [`PRODUCT_ARCHITECTURE.md`](../../../PRODUCT_ARCHITECTURE.md)  
Baseline gaps: [`GAP_ANALYSIS.md`](../../../GAP_ANALYSIS.md)  
Execution plan: [`IMPLEMENTATION_PLAN.md`](../../../IMPLEMENTATION_PLAN.md)
