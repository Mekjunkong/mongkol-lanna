# MONGKOL LANNA V4 P0 Gap Analysis

**Audit date:** 2026-08-29  
**Scope:** Existing Next.js repository compared with the approved V4 P0 brief.  
**Method:** `KEEP` retains working infrastructure, `IMPROVE` revises an existing capability, `REMOVE` removes a conflicting surface, and `MISSING` requires a new P0 capability.

## Foundation and safety

| Requirement | Status | Current evidence and P0 action |
| --- | --- | --- |
| Continue the existing Next.js App Router, TypeScript, Tailwind, Vitest, Drizzle structure | KEEP | The modular monolith and route structure already exist. Reuse them without a scaffold or infrastructure rewrite. |
| Keep UI, domains, persistence, providers, payments, and analytics separated | KEEP | `src/app`, `src/components`, `src/domains`, `src/db`, and `src/providers` are separated. New package/future-category configuration stays in typed domain/config modules. |
| Keep `REAL_GENERATION=false`, mock generation, and mock checkout | IMPROVE | Mock provider factories exist and no real adapter is implemented. Environment parsing currently accepts `REAL_GENERATION=true` when a key is present; P0 must fail closed and tests must prove the flag cannot be enabled. |
| Raw story, name, date, and birth data never enter compiled prompts | IMPROVE | Story Interpreter emits structured values only and tests exclude raw prose, but a P0 prompt composer is missing. Add a typed compiler boundary that accepts structured art direction only and prove personal fields cannot be supplied. |
| Maximum one automatic retry | KEEP | Domain logic and database checks already enforce one typed transient retry. |
| Cultural review and sacred-content fail-closed rules | KEEP | Catalog schemas, cultural guards, and inactive review-required records already enforce this. Preserve and expose the required customer labels. |

## Customer experience

| Requirement | Status | Current evidence and P0 action |
| --- | --- | --- |
| Homepage positioned as Personal Lanna Story Art, artwork first, understandable in ten seconds | IMPROVE | Homepage is artwork-led but copy still frames a generic commission and omits the concrete deliverable, starting test range, packages, and delivery workflow. Rewrite the hero and editorial sequence around story-first personal art. |
| Primary CTA exactly “Create My Art Direction” | IMPROVE | Existing CTA says “เริ่มการว่าจ้าง”. Replace customer-facing primary CTA copy with the approved label. |
| Visible editable starting price/test range, workflow, examples | MISSING | Workflow and examples exist, but no package/test-range architecture or visible range exists. Add config-backed packages and a clear test-range disclosure. |
| Exactly four create steps | REMOVE | Current wizard has six visible steps, including hero and format controls. Remove visible hero, format, and technical choices. |
| Step 1: five approved life chapters plus optional 1–5 sentence story | IMPROVE | Life intention and optional story exist as separate steps with different options. Merge them and use the five approved chapters. |
| Step 2: four approved worlds/collections | IMPROVE | Existing world step has three differently named worlds. Replace with Mountain & Mist, Sacred River, Golden Lanna, and Northern Garden. “Sacred River” is treated as a collection name only, with no religious claim. |
| Step 3: Quiet, Warm, Majestic | IMPROVE | Existing mood step has four Thai labels. Replace with the exact three approved choices. |
| Step 4: optional name, special date, birthday | MISSING | Add separate optional fields for presentation metadata only. They must not feed Story Interpreter or Prompt Composer. |
| Create CTA produces Art Direction only | IMPROVE | Current CTA routes to a Blueprint but says “ดูพิมพ์เขียว”. Make the endpoint and copy explicitly Art Direction only. |
| Deterministic Story Interpreter with required output fields | IMPROVE | Deterministic rules and focused fixtures exist, but the schema uses legacy field names. Add chapter, emotional tone, central intention, visual metaphor, narrative movement, suggested hero, support, collection, palette, and composition. |
| Free Art Direction Blueprint with all specified sections and large study | IMPROVE | Blueprint has narrative, hierarchy, palette, composition, and a study, but is missing explicit chapter, collection, mood, Lanna direction, required labels, and free/mock artwork CTA state. |
| “Create My Artwork” stays mock and cannot trigger payment or paid generation | IMPROVE | Preview route is mock-only, but CTA language and guard are implicit. Add explicit disabled/mock state and no provider/payment action. |
| Essential, Signature, Collector with deliverables and editable test ranges | MISSING | Database package table exists, but no typed P0 package config or customer/admin representation exists. Add immutable validated config. |
| Signature and Collector include exactly one Art Direction Adjustment | MISSING | Add one-adjustment entitlement to config and tests; no unlimited retries. |
| Story Gallery filters and story-led cards/details | IMPROVE | A six-item artwork grid exists, but there are no approved filters, short stories, demonstration labels, or detail structure. Add filters and make existing artwork routes data-driven details. |
| Realistic lock screen and home screen preview with toggle and safe focal area | MISSING | Current preview only overlays a generic safe zone. Add artwork/lock/home modes, clock/date, Dynamic Island area, icon grid/dock, and focal-area guidance. |
| Reveal artwork full screen first, then Explore the Story museum experience | IMPROVE | Reveal has an opening cover and split layout, but artwork is not the first full-screen state and there is no museum-style exploration. Rework the sequence and use factual visual observations. |
| Art Passport with all required commission fields, demo state, print styles | MISSING | No Art Passport exists. Add it to artwork detail/reveal with a print-friendly section. |
| Exact cultural labels: Cultural Reference, Artistic Interpretation, Personal Symbolism | IMPROVE | Concepts exist, but labels and capitalization vary and Blueprint schema uses `DECORATIVE`. Use the exact customer-facing labels while retaining safe internal confidence types. |
| My Collection, not Dashboard, with title/date/collection/passport/downloads | IMPROVE | “ห้องสะสม” exists but lacks the required metadata, passport, and downloads. Update language and collection rows. |

## Admin, data, and discoverability

| Requirement | Status | Current evidence and P0 action |
| --- | --- | --- |
| Admin Art Lab represents all required controls and outputs | IMPROVE | Art Lab exposes a small subset. Extend the mock lab with Life Chapter, Narrative, Collection, Archetype, Visual Metaphor, Hero, Support, Palette, Composition, Density, Tradition Level, Prompt Version, Provider, Model, plus Blueprint, Compiled Prompt, Result, QA, Cost, Admin Rating, and Failure Tags. |
| Package config visible to admin | MISSING | Add a package configuration section to Art Lab using the same typed config used on the homepage. |
| Minimal future gift-category architecture | MISSING | Add typed inactive category records for the nine approved future categories only. Do not add user-facing behavior. |
| Minimal rights-safe future Artist Collections architecture | MISSING | Add typed review/rights fields and inactive seed shape only. No marketplace or public artist feature. |
| One-adjustment entitlement architecture | MISSING | Add explicit integer entitlement to package config and schema validation. |
| Quality dataset fields | IMPROVE | QA database tables already hold dimensions, tags, rating, and reviewer. Add a minimal typed dataset record for prompt/provider/model/version and human review fields used by Art Lab. |
| SEO supports the eight approved search intents without stuffing | IMPROVE | Root metadata is narrow and there is no structural keyword coverage. Expand natural title/description/keywords and page headings, without generating thin SEO routes. |
| Warm ivory, aged paper, jade, charcoal, muted vermillion, restrained gold; no banned visual tropes | IMPROVE | The palette and most visual rules are present. Remove remaining gradient swatches and large dark customer reveal surfaces; keep dark operational admin chrome only where functional. |
| Mobile-first 375px, quiet ornament, subtle/reduced motion | KEEP | Existing responsive rules, touch sizes, and reduced-motion override provide a good base. Recheck every modified customer route at the 375px layout. |

## P1/P2 exclusions confirmed

- No real image generation, live payments, quote sending, deployment, or credential changes.
- No artist marketplace, separate gifting app, print fulfillment, astrology, sacred automation, social features, subscriptions, NFT/blockchain, or unlimited regeneration.
- No invented Thai/Lanna/Pali writing, yantras, signatures, logos, watermarks, religious meanings, or historical claims.
