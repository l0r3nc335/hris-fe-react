# HRIS Enterprise Frontend

React + TypeScript + Tailwind CSS + Redux Toolkit + TanStack Query + Axios HRIS frontend aligned to `/api/v1` backend contract.

This is a **standalone Git repository**. The NestJS API lives in a separate repo (typically cloned as a sibling `BE/` folder in your local workspace).

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

### Using the real API

1. Start the backend (see `../BE/README.md`): PostgreSQL, migrate, seed, then `npm run start:dev` on `http://localhost:3000`
2. In this repo's `.env`:

```
VITE_API_BASE_URL=http://localhost:3000
```

3. Login with seeded credentials: `admin@hris.com` / `password`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Typecheck + production build |
| `npm run typecheck` | TypeScript only |
| `npm run lint` | ESLint |
| `npm run test` | Vitest unit/integration tests (Jest-compatible API) |
| `npm run test:watch` | Vitest watch mode |
| `npm run test:coverage` | Vitest with coverage report |
| `npm run cy:open` | Open Cypress interactive runner |
| `npm run cy:run` | Run Cypress headless (dev server must be running) |
| `npm run test:e2e` | Start Vite + run Cypress E2E suite |
| `npm run test:all` | Run Vitest and Cypress |

## Architecture

- `src/modules/*` — feature domains (isolated; no cross-module imports)
- `src/slices/*` — Redux Toolkit auth session
- `src/services/api/*` — typed Axios API layer with `createResourceApi`
- `src/queries/*` — TanStack Query hooks and mutations
- `src/ui/*` — design system (Radix + Tailwind)

- **Build order (greenfield):** [SETUP_GUIDE_BUILD.md](./SETUP_GUIDE_BUILD.md)
- **Extended reference:** [SETUP_GUIDE.md](./SETUP_GUIDE.md)

## Testing

- **Unit / integration:** [Vitest](https://vitest.dev/) + Testing Library + MSW (same `describe` / `it` / `expect` API as Jest)
- **E2E:** [Cypress](https://www.cypress.io/) with mocked `/api/v1` responses (no backend required for the default suite)
- Feature coverage is driven by `src/test/features.ts` (Vitest) and `cypress/e2e/features.cy.ts` (E2E)

```bash
npm run test           # unit/integration
npm run test:e2e       # Cypress (starts dev server automatically)
npm run test:all       # both
```

## Environment

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Backend origin (default `http://localhost:3000`) |
| `VITE_SENTRY_DSN` | Optional Sentry DSN |