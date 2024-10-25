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
        { src: '//at.alicdn.com/t/c/font_2818624_gbt6qvt9lob.js', defer: true },
        process.env.NODE_ENV === 'production'
          ? {
              innerHTML: `
              (function () {
                var redirect = sessionStorage.redirect;
                delete sessionStorage.redirect;
                if (redirect && redirect !== location.href) {
                  history.replaceState(null, null, redirect);
                }
              })();
          `,
              // 需要添加此项，以确保不会被 Nuxt 处理成字符串
              type: 'text/javascript',
            }
          : {},

        process.env.NODE_ENV === 'production'
          ? {
              innerHTML: `
              var _hmt = _hmt || [];
              (function () {
                var hm = document.createElement('script');
                hm.src = 'https://hm.baidu.com/hm.js?1563bc52cb27ffbc7b5b46cdfc327ce0';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(hm, s);
              })();
          `,
              type: 'text/javascript',
            }
          : {},
      ],
    },
  },
});
