# MONGKOL LANNA V4 P0 Implementation Plan

**Plan date:** 2026-08-29  
**Strategy:** Surgical reuse of the current Next.js modular monolith. Keep provider, payment, database, catalog, generation, retry, QA, and artwork-study infrastructure. Replace only conflicting customer flow/content, add small typed config/domain modules, and extend existing routes/components.

## 1. Typed P0 content and safety architecture

### Exact files

- Add `src/config/packages.ts` for validated Essential, Signature, and Collector test-range records, deliverables, and adjustment entitlement.
- Add `src/domains/roadmap/types.ts` for inactive future gift categories and rights-safe Artist Collection shapes.
- Add `src/domains/qa/dataset.ts` for minimal versioned quality-dataset fields.
- Add `src/domains/prompt/compiler.ts` and focused tests for a provider-neutral structured compiler that has no raw-story/name/date/birthday inputs.
- Update `src/config/env.server.ts` and its tests so V4 P0 rejects `REAL_GENERATION=true` unconditionally.
- Update `src/domains/story/schema.ts`, `rules.ts`, `interpreter.ts`, fixtures, and tests for the approved Art Direction output.

### Acceptance

- The same validated customer choices produce the same structured interpretation.
- Interpreter output contains chapter, emotional tone, central intention, visual metaphor, narrative movement, suggested hero/support, collection, palette, and composition.
- No output or prompt bundle contains raw story, name, special date, or birthday.
- Package ranges are editable in one module, labeled as test ranges, and Signature/Collector each expose exactly one adjustment.
- Real generation cannot be enabled in this P0 build and mock checkout remains the only payment adapter path.

## 2. Customer content and navigation

### Exact files

- Update `src/content/mock-data.ts` with approved chapter/world/mood options, package-independent gallery stories/filters, artwork details, and passport data.
- Update `src/content/dictionaries.ts`, `src/components/site-shell.tsx`, and `src/app/layout.tsx` for Personal Lanna Story Art language, “My Collection”, and natural SEO metadata.
- Reuse all six in-house `public/art-studies/*.svg` assets. Do not generate or download culturally ambiguous imagery.

### Acceptance

- Customer-facing copy contains no AI/SaaS language.
- Demonstration artwork is explicitly labeled as demonstration work, never customer work.
- Exact cultural labels are visible: Cultural Reference, Artistic Interpretation, Personal Symbolism.

## 3. Homepage and packages

### Exact files

- Rework `src/app/page.tsx` using existing `PageShell`, `ArtworkComposition`, and gallery components.
- Add package and workflow presentation components to `src/components/editorial.tsx`.
- Extend `src/app/globals.css` rather than replacing the design system.

### Acceptance

- At 375px, the first viewport leads with artwork and quickly states what the service is, what the customer does, what they get, starting test range, workflow, examples, and the primary CTA “Create My Art Direction”.
- Homepage shows Essential, Signature, Collector deliverables and test ranges sourced from config.
- No fixed-price or commercial-quote claim is made.

## 4. Exactly four-step creation flow

### Exact files

- Rewrite `src/components/commission-wizard.tsx` in place.
- Keep `src/app/create/page.tsx` and update metadata only.

### Acceptance

- Exactly four visible steps: Life Chapter + optional 1–5 sentence story; Collection; Mood; optional name/special date/birthday.
- No hero, format, provider, model, prompt, safe-zone, density, or tradition controls are visible.
- Local draft persistence remains versioned and stores choices only. Story and personal values are never passed into a prompt.
- Final CTA says “Create My Art Direction” and routes only to the free Blueprint.

## 5. Blueprint, preview, reveal, passport, collection

### Exact files

- Rewrite `src/app/blueprint/[requestId]/page.tsx` around the full free Art Direction Blueprint.
- Add `src/components/phone-preview.tsx` and update `src/app/preview/[requestId]/page.tsx`.
- Extend `src/components/reveal.tsx` with artwork-first reveal, Explore the Story, factual observation, and Art Passport.
- Add `src/components/art-passport.tsx` for shared print-friendly passport presentation.
- Update `src/app/account/layout.tsx`, `page.tsx`, and `artworks/page.tsx` for My Collection metadata and actions.

### Acceptance

- Blueprint shows all required fields and a large artwork study; “Create My Artwork” is visibly mock-only and cannot trigger a provider or payment.
- Phone preview toggles ARTWORK, LOCK SCREEN, and HOME SCREEN and reserves focal space around clock, island/notch, and icons.
- Reveal begins with full-screen artwork, then exposes a museum-like story exploration with the exact factual gold observation.
- Passport is demonstration-labeled, contains every required field, and prints without navigation/actions.

## 6. Story Gallery and artwork details

### Exact files

- Convert `src/app/gallery/page.tsx` to use a client `src/components/story-gallery.tsx` filter surface.
- Update `src/components/editorial.tsx` to show title, chapter, and a very short story.
- Make `src/app/artwork/[id]/page.tsx` resolve the selected demonstration artwork and reuse reveal/detail structures.

### Acceptance

- Filters are New Beginning, Family, Love, Growth, Inner Strength, and Chiang Mai Memories.
- Cards include artwork, title, life chapter, very short story, and a demonstration label.
- Detail includes artwork, story, Art Direction, and visual elements.

## 7. Admin Art Lab

### Exact files

- Extend `src/app/admin/art-lab/page.tsx` and the existing admin CSS.
- Render typed package config in the Art Lab; no database editing UI or mutation is added in P0.

### Acceptance

- All requested control and result labels are present.
- Provider and model are explicitly mock values; cost is zero; QA is simulated.
- Package ranges and one-adjustment entitlements are inspectable from the same source used by customer pages.

## 8. Verification

### Exact commands

1. `pnpm lint`
2. `pnpm typecheck`
3. `pnpm test`
4. `pnpm build`

If the managed environment prevents pnpm from writing its default cache, run the same commands with a task-local writable pnpm/corepack cache. No network provider or payment call is permitted.

## P1/P2 deferrals

- **P1:** authenticated persistence/resume across devices, admin CRUD for packages/catalog, real entitlement mutation, download asset service, full locale routing, dedicated curated SEO landing pages, consented public commissions, print ordering, and production Art Passport export.
- **P2:** gift-category customer journeys, verified Artist Collections, artist onboarding/royalties, advanced personalization, live fulfillment, and expanded quality-dataset workflows.
- **Explicitly out of scope:** real generation, live checkout, commercial quoting, payment activation, deployment, sacred/mythological automation, astrology, generated writing, unlimited adjustments, separate apps, marketplace/social features, and any public launch.
