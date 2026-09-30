/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
  readonly PUBLIC_LEGAL_INTAKE_ENDPOINT?: string;
  readonly PUBLIC_MEDIATION_INTAKE_ENDPOINT?: string;
  readonly PUBLIC_LEGAL_CALENDAR_URL?: string;
  readonly PUBLIC_MEDIATION_CALENDAR_URL?: string;
}
interface ImportMeta { readonly env: ImportMetaEnv; }
