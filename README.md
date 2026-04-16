# Abbey Social — Frontend

Production-oriented **React + TypeScript** SPA for the Abbey Social backend.

## Features

- **Auth**: register, login, refresh (cookie + access token), logout, logout-all
- **Accounts**: full profile (`GET/PUT /api/accounts/me`), public profile (`GET /api/accounts/:userId`)
- **Relationships**: follow/unfollow, followers/following lists, your stats
- **Health**: `GET /api/health` (shown on dashboard)

## Scripts

| Command              | Description           |
| -------------------- | --------------------- |
| `npm install`        | Install dependencies  |
| `npm run dev`        | Vite dev server       |
| `npm run build`      | Typecheck + bundle    |
| `npm run preview`    | Preview production build |
| `npm run lint`       | ESLint                |
| `npm run format`     | Prettier              |

## Environment

Copy `.env.example` to `.env`.

- **`VITE_API_URL`** — API origin (no trailing slash). For local dev with the Vite proxy, leave **empty** so requests use `/api` on the same origin.
- **`VITE_DEV_PROXY_TARGET`** — Where Vite proxies `/api` (default `http://127.0.0.1:3000`). Match your backend `PORT`.

**Backend**: set `CORS_ORIGIN` to your frontend origin (e.g. `http://localhost:5173`) so cookies and credentialed requests work when not using the proxy.

**Production (Ubuntu)**: inject `VITE_API_URL` at build time (e.g. `https://api.example.com`).


## Path alias

`@/` → `src/`.
