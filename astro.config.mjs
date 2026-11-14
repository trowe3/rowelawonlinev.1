// @ts-check
import process from 'node:process';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Canonical/OpenGraph origin. PUBLIC_SITE_URL can override it (e.g. for a staging origin).
const site = process.env.PUBLIC_SITE_URL || 'https://rowelawonline.com';
export default defineConfig({
  site,
  output: 'static',
  build: { format: 'file' },
  trailingSlash: 'never',
  vite: { plugins: [tailwindcss()] },
});
