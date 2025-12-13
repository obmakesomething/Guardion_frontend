# lock-platform-frontend

Monorepo for consumer, callcenter, and tech web apps. The frozen product and UX requirements live in `docs/FRONTEND_SPEC.md`.

## Quick preview
- Static wireframes: open `apps/web-consumer/index.html`, `apps/web-callcenter/index.html`, `apps/web-tech/index.html` in a browser to see the UX skeleton, compliance notices, and fee consent requirements.

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
