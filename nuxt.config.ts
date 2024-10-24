import markdown from '@vavt/vite-plugin-import-markdown';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-10-23',
  modules: ['@pinia/nuxt'],
  vite: {
    plugins: [markdown()],
  },
  generate: {
    routes: [
      '/',
      '/zh-CN',
      '/zh-CN/5',
      '/zh-CN/5/docs',
      '/zh-CN/5/demo',
      '/zh-CN/5/grammar',
      '/zh-CN/5/contrast',
      '/zh-CN/5/about',
      '/en-US',
      '/en-US/5',
      '/en-US/5/docs',
      '/en-US/5/demo',
      '/en-US/5/grammar',
      '/en-US/5/contrast',
      '/en-US/5/about',
    ],
  },
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/md-editor-v3' : '/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Varela+Round&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC&display=swap',
        },
      ],
      script: [
        { src: '//at.alicdn.com/t/c/font_2818624_m70tdoc8ws8.js', defer: true },
      ],
    },
  },
});
