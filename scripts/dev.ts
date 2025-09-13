import path from 'path';
import { fileURLToPath } from 'url';
import markdown from '@vavt/vite-plugin-import-markdown';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createServer } from 'vite';

import nodeService from './plugins/nodeService';

const __dirname = fileURLToPath(new URL('..', import.meta.url));
const resolvePath = (p: string) => path.resolve(__dirname, p);

void (async () => {
  const server = await createServer({
    base: '/',
    publicDir: resolvePath('dev/public'),
    server: {
      port: 6100,
      host: '0.0.0.0'
    },
    resolve: {
      alias: {
        '@': resolvePath('dev'),
        '~~': resolvePath('packages'),
        '~': resolvePath('packages/MdEditor')
      }
    },
    plugins: [vue(), vueJsx(), nodeService(), markdown()],
    css: {
      modules: {
        localsConvention: 'camelCase' // 默认只支持驼峰，修改为同事支持横线和驼峰
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    }
  });

  await server.listen();

  server.printUrls();
})();
