/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_DEFAULT_OPENAI_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}