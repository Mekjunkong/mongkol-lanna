# MONGKOL LANNA — Product Architecture

**Version:** 0.1 architecture draft  
**Date:** 2026-08-29  
**Product:** Personal Thai–Lanna Art Atelier  
**Core promise:** “Your Story. Your Intention. Painted as Thai–Lanna Art.”

## 1. Product frame

MONGKOL LANNA is a mobile-first commissioning experience for original, personalized contemporary Thai–Lanna artwork. Customers buy a guided artistic interpretation of their story and intention—not an AI image. Technology is deliberately hidden behind curation, composition, symbolism, cultural care, and a premium reveal.

### MVP outcome

A customer can complete this journey without paid generation:

`Home → Create → Blueprint → Mock Preview → Mock Checkout → Reveal → Library`

An administrator can manage the art system, run mock experiments in Art Lab, inspect compiled prompts and QA, and review generation cost records without editing source code.

### Non-goals for initial MVP

- Real image generation or paid provider calls.
- Live payment capture.
- Astrology calculations.
- Sacred text, scripts, yantras, mantras, generated typography, or decorative Buddha imagery.
- Print fulfillment.
- Automated model training.
- Unbounded free-text prompt input.
- Cultural systems outside Thailand and Lanna.

## 2. Architectural approach

Use a **Next.js TypeScript modular monolith** with explicit domain modules and adapter boundaries. This gives public-page SEO, server-rendered customer routes, protected admin operations, one deployment unit, and transactional persistence without premature microservices.

### Proposed stack

- **Framework:** Next.js App Router + TypeScript strict mode.
- **UI:** React Server Components by default; client components only for interactive wizard/reveal controls.
- **Styling:** Tailwind CSS with CSS custom-property design tokens; no generic component-theme dependency.
- **Validation:** Zod at every server boundary and for shared form schemas.
- **Database:** PostgreSQL + Drizzle ORM and explicit migrations.
- **Authentication:** Auth.js-compatible adapter boundary; development credential/mock session only, never a fake production auth claim.
- **Testing:** Vitest + Testing Library for units/components; Playwright for critical mobile/desktop flows.
- **Storage:** `AssetStore` interface; local deterministic mock assets in development, object storage later.
- **Observability:** structured logs with request/job IDs; no sensitive story or birth-data values in logs.

### Module boundaries

```text
src/
  app/                 routes, layouts, metadata, server entry points
  components/          shared presentation and product UI
  content/             Thai/English dictionaries and editorial copy
  config/              validated public/server configuration
  db/                  schema, migrations, repositories, seeds
  domains/
    art-brain/          deterministic blueprint orchestration
    story/              bounded story interpretation
    culture/            confidence, spiritual and cultural guards
    catalog/            worlds, symbols, archetypes, palettes, compositions
    prompt/             prompt compiler and prompt versions
    generation/         jobs, attempts, hashing, limits and providers
    qa/                 Art Critic and human review
    artwork/            requests, blueprints, assets and reveal
    commerce/           packages, orders and payment ports
    identity/           users, sessions and authorization
    analytics/          event contract and metrics
  providers/
    image/              mock and future Kie adapters
    payment/            mock, future PromptPay/card adapters
    assets/             local and future object-storage adapters
  lib/                  framework-neutral utilities only
```

Domain code must not import UI code or provider SDKs. Provider adapters implement domain ports. Server actions/routes perform authentication, validation, authorization, rate limiting, and domain invocation.

## 3. Customer journey and state

### Routes

#### Public
- `/` — artwork-led homepage.
- `/create` — creation wizard.
- `/blueprint/[requestId]` — editable, confirmable Artwork Blueprint.
- `/preview/[requestId]` — deterministic mock preview and safe-zone view.
- `/artwork/[id]` — premium reveal/detail.
- `/gallery` — curated, consented public examples.
- `/collections/[slug]` — curated collection pages.
- `/about` — art philosophy.
- `/cultural-approach` — confidence model and cultural boundaries.
- `/faq`.
- Curated SEO pages: `/lanna-art`, `/personalized-lanna-art`, `/thai-mural-art`, `/lanna-wallpaper`, `/naga-art`, `/lanna-mountain-art`, `/thai-wallpaper`.

#### Customer
- `/account`.
- `/account/artworks`.
- `/account/orders`.

#### Admin
- `/admin`.
- `/admin/orders`, `/customers`, `/artworks`.
- `/admin/generation/jobs`, `/attempts`, `/costs`.
- `/admin/catalog/worlds`, `/archetypes`, `/symbols`, `/palettes`, `/compositions`.
- `/admin/prompts`, `/qa`, `/packages`, `/settings`.
- `/admin/art-lab`.

### Wizard stages

1. **Intention** — one primary intention from a curated enum.
2. **Personal story** — optional 1–5 sentences with reason/privacy guidance; optional personal data kept separate.
3. **Art world** — visually rich curated choices.
4. **Mood** — bounded emotional vocabulary.
5. **Hero symbol** — compatible symbols filtered by world/spiritual level.
6. **Optional details** — supports, detail/tradition levels, format and safe-zone preference.
7. **Blueprint** — coherent art direction generated before any generation action.

Persist a server-side draft for authenticated users and a versioned, minimal browser draft for guests. Never put compiled prompts or private birth data in client storage. A draft schema version controls migration/reset behavior.

### Refresh and duplicate behavior

- Each step saves only after valid input.
- Refresh restores the last completed step.
- Back navigation preserves selections and revalidates dependent choices.
- Changing world or spiritual level removes incompatible symbols with an explicit notice.
- Blueprint confirmation creates an immutable revision snapshot.
- Preview uses an idempotency key derived from request ID + blueprint revision + format + prompt version.

## 4. Design system

### Creative direction

**Contemporary Thai art gallery × Lanna atelier × quiet luxury.** The memorable device is a large, pale mural field framed by restrained editorial UI and a subtle vertical ornamental guide. Artwork receives visual dominance; gold is an accent, never a background effect.

### Tokens

```text
Color
  ivory-50       #FBF6EA  primary canvas
  parchment-100  #F1E6CF  secondary surface
  jade-700       #244C40  primary action/deep field
  charcoal-900   #211F1B  primary text
  vermillion-600 #9D4638  sparing emphasis/error warmth
  antique-gold   #A98745  rules, selection and ornament only
  mist-blue      #879CA3  atmospheric support

Typography
  Display: editorial Thai/Latin serif with verified Thai coverage
  Body: highly readable Thai/Latin humanist sans or serif companion
  Labels: small caps/letter spacing only for Latin; Thai labels retain natural spacing

Spacing
  4px base; mobile content gutters 20px; section rhythm 64–112px

Shape
  restrained 2–12px radius; artwork frames use fine inner rules, not SaaS pills

Motion
  180–320ms interactions; 700–1200ms reveal sequence; reduced-motion alternative required
```

Font choice must be tested for Thai marks, line height, and mixed Thai/English rendering before lock-in. No display font is accepted solely for Latin appearance.

### Core components

- Museum header and mobile atelier navigation.
- Hero artwork frame with format-safe overlays.
- Editorial CTA, quiet secondary link, icon-only action with labels.
- Intention/world/symbol cards with semantic radio behavior.
- Wizard progress, stage intro, save state and dependency warning.
- Artwork frame, safe-zone overlay, palette strip, hierarchy diagram.
- Blueprint section, cultural-confidence badge, interpretation disclaimer.
- Reveal stage controller and symbol/story cards.
- Admin shell, data table, editor drawer, diff viewer, QA scorecard, cost meter.
- Empty, loading, timeout, duplicate, blocked-cultural-content, and provider-error states.

## 5. ART_BRAIN

`ART_BRAIN` is deterministic application logic, not an unconstrained chat completion. It transforms validated structured input into a versioned Artwork Blueprint using curated catalogs and explicit scoring rules.

### Input

- Primary intention.
- Structured story interpretation or none.
- World.
- Mood.
- Hero symbol.
- Optional support preferences.
- Detail, tradition and spiritual levels.
- Output format and safe-zone type.
- Taste signals as soft weights only.

### Pipeline

1. Validate enum values, active catalog records and compatibility.
2. Apply spiritual and cultural allowlists.
3. Select metaphor candidates from intention + story journey state.
4. Score archetypes by intention, world, hero and requested density.
5. Select one archetype with stable tie-breaking.
6. Enforce symbol budget and conflicts.
7. Select palette from world, mood and archetype tendencies.
8. Select composition grammar compatible with archetype, hero and safe zone.
9. Allocate hero, secondary, background and decorative hierarchy.
10. Reserve required negative space for the output format.
11. Build a narrative sentence from approved concepts.
12. Generate a collectible title from curated patterns and banned-word checks.
13. Run cultural guardrails and blueprint invariants.
14. Persist blueprint version and decision trace.

### Controlled variation

The 70/20/10 rule is represented as:

- 70% fixed rules and customer choices.
- 20% seeded selection among equally compatible catalog options.
- 10% seeded micro-detail choices from an allowlist.

The seed derives from request/revision identity. It may vary small flora, cloud forms, minor animals or ornament. It cannot change culture, hero, intention, core architecture, primary narrative or sacred status.

### Blueprint invariants

- Exactly one hero.
- Hero is compatible with world and spiritual level.
- Support count respects detail level.
- No conflicting symbol pair.
- One composition and one palette.
- Explicit visual hierarchy.
- Explicit negative-space location.
- No text/sacred-writing request.
- All cultural statements include confidence and customer-facing category.

## 6. STORY_INTERPRETER

The story field is optional, length-limited, sanitized and never sent raw to an image provider.

### Output schema

```ts
{
  lifeTheme: ApprovedLifeTheme;
  emotionalTone: ApprovedTone[];      // max 2
  intention: Intention;
  journeyState: ApprovedJourneyState;
  visualMetaphorIds: string[];        // max 2
  safetyFlags: StorySafetyFlag[];
  interpretationVersion: string;
}
```

Initial MVP uses deterministic keyword/pattern classification with an explicit fallback requiring customer confirmation. A future language model adapter may suggest structured output, but only schema-valid allowlisted values survive, and raw prose remains excluded from the final image prompt.

Do not infer sensitive traits, diagnose emotion, calculate astrology, or convert names/dates into mystical claims.

## 7. Catalog and cultural model

### Content entities

- **Art worlds:** visual DNA, environments, palette and composition recommendations, compatible symbols, negative constraints, active state.
- **Archetypes:** intention weights, grammar, hierarchy, hero placement, density, negative-space and environment rules.
- **Symbols:** category, visual description, cultural note, artistic interpretation, prompt fragment, compatibility/conflicts, confidence, spiritual minimum/maximum, source-review status, active state.
- **Palettes:** named color roles, pigment language, mood/world weights, prohibited pairings.
- **Compositions:** zones, flow, hierarchy slots, safe-zone compatibility and prompt grammar.
- **Metaphors:** intention/journey mappings explicitly labeled artistic interpretation.

### Cultural confidence

- `VERIFIED` — supported by a curated, human-reviewed cultural reference.
- `INSPIRED` — an original interpretation based on tradition.
- `DECORATIVE` — supporting visual material with no historical claim.

The UI exposes “Cultural reference,” “Artistic interpretation,” and “Personal symbolism” separately. `VERIFIED` requires a source-review record before publication. Lack of review never defaults to verified.

### Spiritual level

- `CULTURAL` — architecture, landscape, clothing and ornament; no religious figures.
- `SYMBOLIC` — curated Naga, lotus and celestial/natural language; default.
- `SACRED` — disabled for automatic generation in MVP; only approved records and human review can enable later.

For the first operational P0 catalog, automatic use is limited to low-risk `CULTURAL` elements and human-reviewed `SYMBOLIC` elements. Naga, Hongsa, Kinnari, Garuda, Himmapan creatures, celestial attendants, sacred architecture, ceremonial objects and related mythological entries may exist in the schema as `DRAFT` or `REVIEW_REQUIRED`, but cannot enter a customer Blueprint or compiled prompt until a Thai/Lanna human reviewer records evidence, permitted context and terminology. `SACRED` remains fail-closed.

## 8. Prompt Composer

The compiler accepts an immutable blueprint—not raw customer input—and produces a versioned provider-neutral prompt bundle.

```text
Narrative
→ Hero and support placement
→ Environment
→ Composition and hierarchy
→ Safe zones / negative space
→ Palette and atmosphere
→ Detail and tradition levels
→ THAI_LANNA_MASTER_DNA version
→ Cultural allowlist
→ Quality rules
→ Provider-neutral negative constraints
→ Output format
```

### Prompt output

- Positive compiled prompt.
- Negative compiled prompt.
- Prompt master version.
- Catalog/content versions.
- Compiler version.
- Blueprint ID/revision.
- Deterministic compilation hash.
- Cultural-check result and reasons.

Prompt fragments are maintained as approved catalog data. Provider adapters may translate syntax but cannot remove cultural/no-text constraints.

## 9. Generation architecture and cost control

### Provider port

```ts
interface ImageProvider {
  generatePreview(input: ProviderGenerationInput): Promise<ProviderJob>;
  generateHD(input: ProviderGenerationInput): Promise<ProviderJob>;
  getStatus(providerGenerationId: string): Promise<ProviderStatus>;
  estimateCost(input: ProviderGenerationInput): Promise<MoneyEstimate>;
  cancelIfSupported(providerGenerationId: string): Promise<CancelResult>;
}
```

### Default safety

- `REAL_GENERATION=false` is required in validated server configuration.
- The provider factory returns `MockImageProvider` unless the flag is explicitly true.
- Real adapters also require provider-specific enablement and valid server secrets.
- Client code never imports a real provider adapter or sees secrets.
- Tests assert that paid adapter methods cannot be reached under the default configuration.

### Job lifecycle

`DRAFT → BLUEPRINT_CONFIRMED → PROMPT_READY → QUEUED → GENERATING → QA_PENDING → REVIEW_REQUIRED | PREVIEW_READY | FAILED → HD_QUEUED → HD_READY → DELIVERED`

### Controls

- Stable SHA-256 request hash over blueprint revision, prompt version, provider/model, parameters and output format.
- Unique active-attempt constraint for duplicate protection.
- Explicit idempotency key for preview/HD actions.
- Per-user/IP rate limits before job creation.
- Maximum one automatic retry only for typed transient provider failures.
- Timeout transitions to an inspectable state; never silently creates a new job.
- Aesthetic imperfection creates a review flag, not an automatic retry.
- Cost estimate before enqueue; actual cost recorded after provider response.
- Every state transition appends an auditable event.

## 10. Art Critic and human feedback

`ART_CRITIC` accepts an asset plus its blueprint and returns structured evaluation. In mock mode it produces deterministic fixture results clearly marked as simulated.

### Dimensions

- Thai/Lanna consistency.
- Composition.
- Craftsmanship/linework.
- Color harmony.
- Symbol coherence.
- Negative space.
- Hero clarity.
- Architecture.
- Anatomy.
- AI artifacts.
- Fake text.
- Watermark/logo.
- Aspect ratio and safe-zone compliance.

Score is `/100` with per-dimension evidence and failure tags. Low score routes to `REVIEW_REQUIRED`; it does not regenerate.

Human rating: `EXCELLENT`, `GOOD`, `ACCEPTABLE`, `REJECT`, with controlled failure tags. Store feedback as an internal quality dataset; no automatic training.

## 11. Commerce and packages

Packages live in database/config records with localized name, benefits, outputs, active state, currency, amount and display order. UI never owns permanent prices.

`PaymentProvider` exposes create-checkout, status, refund-capability metadata and webhook verification. MVP uses `MockPaymentProvider` and produces a clearly labeled test approval. Future PromptPay-style and card adapters remain isolated.

Order state is separate from generation state. HD generation requires both an approved preview and a payment/approval policy decision.

## 12. Data model

Core tables use UUIDs, `created_at`, `updated_at`, optimistic versioning where edited, and soft deactivation for catalog content.

### Identity and commerce

- `users` — identity and locale.
- `user_roles` — customer/admin authorization.
- `packages` — configurable localized offer and outputs.
- `orders` — user, package snapshot, currency/amount snapshot, payment provider/status.
- `order_events` — auditable transitions.

### Customer art

- `artwork_requests` — customer selections, story-presence flag, draft stage/status, schema version.
- `story_interpretations` — structured fields and interpreter version; raw story stored separately with access controls or omitted by retention policy.
- `artwork_blueprints` — immutable revisions, title, narrative, hierarchy, environment, palette/composition/archetype, levels, safe zones, decision trace.
- `artworks` — accepted blueprint, preview/HD status and ownership.
- `artwork_assets` — format, purpose, storage key, dimensions, checksum, visibility.
- `favorites` — user-to-public-example taste signal.

### Art catalog

- `art_worlds`, `archetypes`, `symbols`, `palettes`, `compositions`, `visual_metaphors`.
- Join tables for compatibility, conflicts and weighted recommendations.
- `cultural_reviews` — confidence, reviewer, source note, review date/status.
- `catalog_versions` — publishable immutable snapshots.

### Prompt/generation/QA

- `prompt_versions` — master DNA, quality/negative fragments, status and version.
- `compiled_prompts` — blueprint revision, versions, positive/negative prompt, hash, guard result.
- `generation_jobs` — kind, state, request hash, idempotency key, retry count, timestamps.
- `generation_attempts` — provider/model/settings, generation ID, error class, duration and cost.
- `qa_reviews` — automated/manual type, score, dimensions, tags, rating and reviewer.
- `generation_events` — append-only transitions.

### Platform

- `analytics_events` — event name, anonymous/user/session IDs, route and bounded properties.
- `settings` — typed namespaced server settings; secrets never stored here.
- `rate_limit_records` only if the deployment lacks an external rate-limit store.

Birth time/location are optional separate fields with explicit purpose/consent and are not included in Art Brain or prompts in MVP.

## 13. Server boundaries

Use server actions for authenticated same-origin mutations and route handlers for provider/payment callbacks and job status APIs.

Every mutation follows:

`authenticate → authorize → rate-limit → validate → idempotency check → domain action → transaction → audit/event → safe response`

Admin actions verify the role server-side. Hidden navigation is not authorization. Customer asset reads verify ownership unless an artwork is explicitly published to the gallery.

## 14. Analytics

Typed event names:

- `landing_view`
- `create_started`
- `story_added`
- `intention_selected`
- `world_selected`
- `hero_selected`
- `blueprint_completed`
- `generation_started`
- `preview_completed`
- `checkout_started`
- `purchase_completed`
- `download_completed`

Properties use IDs/enums, never raw story, name, birth details or compiled prompt. The adapter defaults to a development sink. Admin metrics derive from database truth where possible, not client events alone.

## 15. SEO and i18n

- Thai and English are first-class locales using centralized typed dictionaries.
- Route metadata, Open Graph copy and structured data are localized.
- Public artwork/gallery pages require explicit publication consent.
- Canonical and hreflang rules are deterministic.
- Sitemap includes only active, meaningful public pages.
- `robots.txt` blocks account/admin/API paths.
- Curated SEO pages use unique human-reviewed content; no combinatorial page generation.

## 16. Security and privacy

- Strict server/client environment split and startup validation.
- No provider/payment secrets in `NEXT_PUBLIC_*` values or browser bundles.
- CSRF-safe same-site mutations, secure session cookies and origin checks.
- Zod schemas, bounded strings, enum allowlists and sanitized display text.
- Rate limits for auth, draft creation, blueprint compilation, preview, checkout and Art Lab.
- Ownership checks for requests, blueprints, artworks, orders and assets.
- Admin role checks on layouts and each mutation/read action.
- Content Security Policy and conservative image/connect origins.
- Structured logs redact story, personal details, prompt content and secrets.
- Asset access uses private keys/signed delivery where appropriate.
- No destructive production migration or deployment without founder approval.

## 17. Quality strategy

### Unit

- Story classification and fallback.
- Archetype scoring and stable tie-breaks.
- Symbol compatibility, conflicts and budgets.
- Palette/composition selection.
- Safe-zone rules.
- Blueprint invariants and title bans.
- Cultural/spiritual/no-text guardrails.
- Prompt compilation snapshots and escaping.
- Hashing, idempotency, retry and state transitions.
- Art Critic scoring and review routing.

### Integration

- Draft save/restore and dependency invalidation.
- Blueprint revision and confirmation.
- Duplicate preview submissions create one job.
- `REAL_GENERATION=false` cannot call real adapter.
- Mock checkout and order transitions.
- Customer ownership and admin authorization.
- Catalog edits create new versions without mutating historic blueprints.

### Browser

- 320/375/430px wizard completion.
- Desktop customer flow and admin Art Lab.
- Refresh/back navigation and error recovery.
- Keyboard/focus/screen-reader progress semantics.
- Reduced motion reveal.
- Mock provider timeout/failure/duplicate states.
- Download and library retrieval.

### Build gates

`format/lint → typecheck → unit/integration → production build → Playwright mobile/desktop → accessibility scan → bundle/performance review → independent review`

## 18. Implementation roadmap

### Bot-team reconciliation

Three independent reviews covered technical architecture, cultural/art-direction governance and mobile UX. Their accepted decisions are incorporated below:

- PostgreSQL is the system of record; binary assets are referenced through an `AssetStore` port rather than stored in the database.
- Catalog revisions and immutable Blueprint snapshots prevent future edits from changing historic commissions.
- Real image providers fail closed when `REAL_GENERATION=false`; provider SDKs remain server-only.
- Generation, checkout and entitlement transitions use database-backed idempotency and append-only audit events.
- P0 creative decisions are deterministic; rendering variation cannot alter cultural scope, hero, intention or spiritual level.
- Cultural facts require evidence and human review. Unknown confidence is never promoted to `VERIFIED`.
- Reference artworks are `PRINCIPLE_ONLY`; copying, artist imitation, signature/watermark reuse and recognizable composition transfer are hard failures.
- The customer experience follows **The Quiet Commission**: continuous editorial sheets, artwork-led pacing and restrained atelier language rather than SaaS cards or mystical ritual framing.
- The design system uses Noto Serif Thai for display and Anuphan for interface/body, subject to real Thai mark and mixed-language rendering tests.
- Admin Art Lab is denser and operational; decorative pacing and texture are removed from work surfaces.

Two bot proposals were explicitly rejected or constrained:

- A customer inscription step is excluded from P0. Generated art must contain zero text. A future typography layer may add verified customer-approved copy after artwork generation, separately from the image prompt.
- A broad automatic mythological catalog is excluded until human cultural review. The data model supports it, but culturally specific or sacred-adjacent records remain inactive/review-required rather than being invented during implementation.

No uploaded reference-art files were available in the inspected filesystem or conversation attachment context, so no reference image has been copied, embedded or used as a final asset.

### Phase A — foundation and specification

1. Finalize gap analysis and architecture with bot-team review.
2. Scaffold Next.js strict TypeScript app and quality scripts.
3. Add validated config with `REAL_GENERATION=false`.
4. Add design tokens, i18n and core layouts.
5. Add Drizzle schema, local test database strategy and curated seed structure.

**Exit:** authentication/session boundaries, locale switching, isolated customer drafts, configuration validation and test infrastructure work without real provider/payment access.

### Phase B — P0 domain system

1. Implement curated data schemas/seeds.
2. Implement Story Interpreter.
3. Implement Art Brain, scoring, budgets, hierarchy and safe zones.
4. Implement Blueprint revisions and invariants.
5. Implement Thai/Lanna Master DNA and Prompt Composer.
6. Implement mock provider, jobs, hashing, retry limits and cost logs.
7. Implement deterministic Art Critic fixtures.
8. Build Admin Art Lab around real P0 domain services.

Initial launch registry target: 8–12 human-reviewed, low-risk entries across landscape/botanical, ordinary material/object, secular spatial detail and non-ceremonial visual categories. Culturally specific mythological records remain review-gated.

**Exit:** the same valid input and catalog/prompt versions always produce the same inspectable Blueprint and compiled prompt without external AI.

### Phase C — customer mock MVP

1. Homepage and gallery-quality example placeholders made in-house, not reference art.
2. Mobile wizard with persistence.
3. Blueprint review/edit/confirm.
4. Mock preview and mock checkout.
5. Reveal flow, library and downloads.
6. Account/order basics.

**Exit:** a Thai- or English-language customer can complete the story-to-mock-art journey, refresh/resume it, approve one exact Blueprint revision and retrieve the mock artwork from the library.

### Phase D — operations and platform

1. Admin catalog, prompts, generations, costs and QA.
2. Auth/RBAC hardening.
3. Analytics adapter and admin metrics.
4. SEO pages, sitemap, robots, metadata and social-card templates.
5. Accessibility, responsive and performance QA.

**Exit:** a curator can draft/publish/archive catalog revisions; operators can inspect every generation/order transition; mock checkout grants entitlement exactly once.

### Phase E — production readiness

1. Independent architecture/code/cultural review.
2. Verified migrations and rollback plan.
3. Deployment/environment runbook.
4. Mock end-to-end acceptance evidence.
5. Founder approval gate.

### Deferred activation

Real Kie integration, live payments and production deployment remain disabled until the mock workflow passes and the founder explicitly approves each external action.

## 19. Acceptance criteria

The MVP is accepted only when:

- A mobile customer understands the offer and completes the full mock commissioning flow.
- Art Brain creates a coherent blueprint rather than concatenated tags.
- Raw story never appears in compiled prompts.
- Thai/Lanna-only and no-text guardrails are tested.
- Blueprint survives refresh and is format-independent.
- Duplicate preview submission does not create duplicate jobs.
- Automatic retry cannot exceed one.
- `REAL_GENERATION=false` is proven to block paid providers.
- Reveal and library work with owned mock assets.
- Admin can manage the catalog, prompt versions, costs and QA, and use Art Lab without source edits.
- Pricing comes from config/database.
- Customer/admin authorization and asset ownership are tested.
- Thai and English critical paths work.
- The customer wizard contains no inscription/generation-text step; future typography remains a separate post-art layer.
- Unreviewed culturally specific and sacred-adjacent records cannot enter automatic Blueprint or prompt composition.
- At least 20 representative and adversarial story fixtures prove deterministic cultural routing, including requests for fake script, vague “Asian” styling, reference copying and excessive symbols.
- Tests, typecheck, lint, production build, mobile/desktop browser flow and accessibility checks pass.
- No deployment, paid generation or live payment occurs without explicit founder approval.
