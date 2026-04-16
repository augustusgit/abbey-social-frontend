/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL for the Express API (no trailing slash). Leave empty in dev to use the Vite `/api` proxy. */
  readonly VITE_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
