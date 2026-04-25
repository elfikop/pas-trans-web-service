import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [sitemap()],
  site: 'https://autokarypastrans.pl',
  base: '/',
  image: {
    // To wyłączy silnik, który powoduje błąd ENOENT
    service: { entrypoint: 'astro/assets/services/noop' }
  }
});