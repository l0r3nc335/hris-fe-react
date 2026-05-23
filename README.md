# HRIS Enterprise Frontend

React + TypeScript + Tailwind CSS + Redux Toolkit + Radix UI HRIS frontend aligned to `/api/v1` backend contract.

This is a **standalone Git repository**. The NestJS API lives in a separate repo (typically cloned as a sibling `BE/` folder in your local workspace).

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

Demo login with MSW mocks (`VITE_USE_MOCKS=true`): `admin@hris.com` / `password`

### Using the real API

1. Clone and run the [backend repo](../BE/) (or your `hris-api` remote) on `http://localhost:3000`
2. In this repo's `.env`:

```
VITE_API_BASE_URL=http://localhost:3000
VITE_USE_MOCKS=false
```

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
- `src/slices/*` — Redux Toolkit slices + thunks
- `src/services/api/*` — typed HTTP API layer
- `src/ui/*` — design system (Radix + Tailwind)
- `src/services/mocks/*` — MSW handlers when `VITE_USE_MOCKS=true`

## Environment

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Backend origin (default `http://localhost:3000`) |
| `VITE_USE_MOCKS` | Enable MSW mock API (`true` for local dev without BE) |
| `VITE_SENTRY_DSN` | Optional Sentry DSN |
