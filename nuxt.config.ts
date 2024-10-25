import markdown from '@vavt/vite-plugin-import-markdown';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-10-23',
  modules: ['@pinia/nuxt'],
  vite: {
    plugins: [markdown()],
  },
  nitro: {
    prerender: {
      // 禁止抓取页面中的链接
      crawlLinks: false,
      routes: [
        '/',
        '/zh-CN',
        '/zh-CN/api',
        '/zh-CN/docs',
        '/zh-CN/demo',
        '/zh-CN/syntax',
        '/zh-CN/grammar',
        '/zh-CN/contrast',
        '/zh-CN/about',
        '/en-US',
        '/en-US/api',
        '/en-US/docs',
        '/en-US/demo',
        '/en-US/syntax',
        '/en-US/grammar',
        '/en-US/contrast',
        '/en-US/about',
      ],
    },
  },

  app: {
    baseURL: '/', // process.env.NODE_ENV === 'production' ? '/md-editor-v3' : '/',
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
