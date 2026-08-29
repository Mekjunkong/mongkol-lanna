# MONGKOL LANNA

A mobile-first personal Thai–Lanna art atelier. Customers commission original contemporary artwork through a guided story, intention and visual-direction workflow.

## Safety state

- `REAL_GENERATION=false` is the default and paid image generation is disabled.
- Checkout is mocked until a payment provider is explicitly configured and approved.
- Provider/payment secrets remain server-side.
- Sacred content, generated writing and unreviewed culturally specific elements fail closed.

## Local development

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open `http://localhost:3000`.

## Quality commands

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
pnpm verify
```

## Product documents

- [`GAP_ANALYSIS.md`](./GAP_ANALYSIS.md)
- [`PRODUCT_ARCHITECTURE.md`](./PRODUCT_ARCHITECTURE.md)
- [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md)
- [`docs/superpowers/specs/2026-08-29-mongkol-lanna-design.md`](./docs/superpowers/specs/2026-08-29-mongkol-lanna-design.md)

## External-action gates

Do not enable real generation, add live payment credentials, run destructive production migrations, deploy publicly or publish customer artwork without explicit founder approval.
