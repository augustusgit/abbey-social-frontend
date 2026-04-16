# Abbey Social — Frontend

Production-oriented **React + TypeScript** SPA built with **Vite**, aligned with a separate **Express + Prisma** API.

## Stack

- **React 19** + **TypeScript**
- **Vite** — dev server and production build
- **TanStack Query** — server/cache state
- **React Router** — routing (`src/routes/`)
- **Axios** — HTTP (`src/api/client.ts`)
- **React Hook Form** + **Zod** — forms and validation
- **Tailwind CSS v4** — styling (`@import "tailwindcss"` in `src/index.css`)
- **ESLint** + **Prettier**

## Scripts (Windows & Linux)

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `npm install`      | Install dependencies                 |
| `npm run dev`      | Dev server (HMR)                   |
| `npm run build`    | Typecheck + production bundle        |
| `npm run preview`  | Serve `dist` locally                 |
| `npm run lint`     | ESLint                               |
| `npm run format`   | Prettier write                       |
| `npm run format:check` | Prettier check (CI)            |

## Environment

Copy `.env.example` to `.env` and adjust.

- **`VITE_API_URL`** — Base URL for the API (no trailing slash).  
  - **Local dev:** leave **empty** so the app calls `/api/...` on the Vite origin; Vite proxies `/api` to Express (see `vite.config.ts`).  
  - **Production:** set to your public API origin, e.g. `https://api.example.com` (set at **build time**; Vite inlines `import.meta.env`).

- **`VITE_DEV_PROXY_TARGET`** — Where `/api` is proxied during `npm run dev` (default `http://127.0.0.1:3000`). Not shipped to the browser.

Ensure your Express app enables **CORS** for the SPA origin when `VITE_API_URL` points across origins, and use **`withCredentials`** only if you rely on cookies.

## Folder layout

```
src/
├── api/           # Axios client + endpoint paths
├── app/           # Providers, env helpers
├── assets/
├── components/
│   ├── common/
│   └── layout/
├── features/      # Domain modules (e.g. users)
├── hooks/
├── pages/         # Route-level lazy-loaded pages
├── routes/
├── store/         # Optional global client state
├── types/
├── utils/
├── main.tsx
```

## Express + Prisma (separate repo)

- Serve this app as static files from `dist/` (e.g. Nginx on Ubuntu) or behind a reverse proxy.
- Run the API on another host/port; set `VITE_API_URL` in CI before `npm run build` so the bundle talks to the correct API.
- Example sample route used on the home page: `GET /api/users` returning a JSON array matching `src/features/users/types.ts`.

## Path alias

Imports use `@/` → `src/` (see `tsconfig.app.json` and `vite.config.ts`).
