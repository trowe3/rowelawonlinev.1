// @ts-check
import process from 'node:process';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Set PUBLIC_SITE_URL to the final HTTPS domain before production deployment.
const site = process.env.PUBLIC_SITE_URL || process.env.CF_PAGES_URL;
export default defineConfig({
  ...(site ? { site } : {}),
  output: 'static',
  build: { format: 'file' },
  trailingSlash: 'never',
  vite: { plugins: [tailwindcss()] },
});
