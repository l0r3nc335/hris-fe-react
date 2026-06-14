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
| `npm run test` | Vitest unit tests |

## Architecture

- `src/modules/*` — feature domains (isolated; no cross-module imports)
- `src/slices/*` — Redux Toolkit auth session
- `src/services/api/*` — typed Axios API layer with `createResourceApi`
- `src/queries/*` — TanStack Query hooks and mutations
- `src/ui/*` — design system (Radix + Tailwind)

## Environment

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Backend origin (default `http://localhost:3000`) |
| `VITE_SENTRY_DSN` | Optional Sentry DSN |
