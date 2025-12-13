# lock-platform-frontend

Monorepo for consumer, callcenter, and tech web apps. The frozen product and UX requirements live in `docs/FRONTEND_SPEC.md`.

## Quick preview
- Next.js apps (App Router)
  - Consumer: `pnpm dev:consumer` → http://localhost:3000
  - Callcenter: `pnpm dev:callcenter` → http://localhost:3000 (per app)
  - Tech: `pnpm dev:tech` → http://localhost:3000
  - All pages use the shared `@repo/ui` components and include policy/compliance notices.

## Workspace scripts
- `pnpm fetch:openapi` — download OpenAPI spec to `openapi/openapi.yaml`
- `pnpm gen:api` — generate `packages/api-client/src/generated/schema.d.ts`
- `pnpm prepare:api` — fetch and generate in one step

## Structure (stubbed)
- `apps/` — `web-consumer`, `web-callcenter`, `web-tech`
- `packages/` — `ui`, `domain`, `api-client`, `auth`, `config`
- `openapi/` — fetched spec copy
- `scripts/` — helper scripts (OpenAPI fetch)
- `docs/` — spec and sync docs
