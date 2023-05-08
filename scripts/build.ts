import path from 'path';
import { fileURLToPath } from 'url';
import { build } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

const __dirname = fileURLToPath(new URL('..', import.meta.url));
const resolvePath = (p: string) => path.resolve(__dirname, p);

const fileConfig = {
  es: {
    format: 'es',
    extname: 'mjs'
  },
  cjs: {
    format: 'cjs',
    extname: 'cjs'
  },
  umd: {
    format: 'umd',
    extname: 'js'
  }
};

let targetArr = process.argv.slice(2).filter((i) => Object.keys(fileConfig).includes(i));

// 没有指定就打包全部
targetArr = targetArr.length === 0 ? Object.keys(fileConfig) : targetArr;

!(async () => {
  await Promise.all(
    targetArr.map((t) => {
      const { format, extname } = fileConfig[t];

      return build({
        base: '/',
        publicDir: false,
        resolve: {
          alias: {
            '~~': resolvePath('packages'),
            '~': resolvePath('packages/MdEditor')
          }
        },
        plugins: [
          vue(),
          vueJsx(),
          libInjectCss(),
          ['es', 'cjs'].includes(format) &&
            dts({
              outputDir: resolvePath(format),
              include: [resolvePath('packages')]
            })
        ],
        css: {
          modules: {
            localsConvention: 'camelCase' // 默认只支持驼峰，修改为同事支持横线和驼峰
          },
          preprocessorOptions: {
            less: {
              javascriptEnabled: true
            }
          }
        },
        build: {
          outDir: resolvePath(format),
          lib: {
            entry:
              format === 'umd'
                ? resolvePath('packages')
                : {
                    index: resolvePath('packages'),
                    MdEditor: resolvePath('packages/MdEditor'),
                    MdPreview: resolvePath('packages/MdPreview'),
                    NormalToolbar: resolvePath('packages/NormalToolbar'),
                    DropdownToolbar: resolvePath('packages/DropdownToolbar'),
                    ModalToolbar: resolvePath('packages/ModalToolbar'),
                    MdCatalog: resolvePath('packages/MdCatalog'),
                    config: resolvePath('packages/config')
                  },
            name: 'MdEditorV3',
            formats: [format]
          },
          rollupOptions: {
            external:
              format === 'umd'
                ? ['vue']
                : [
                    'vue',
                    'medium-zoom',
                    'lru-cache',
                    'copy-to-clipboard',
                    '@vavt/markdown-theme',
                    'codemirror',
                    /@codemirror\/.*/,
                    /@lezer\/.*/,
                    /markdown-it.*/
                  ],
            output: {
              dir: resolvePath(format),
              entryFileNames: (info) => {
                switch (info.name) {
                  case 'index': {
                    return `index.${extname}`;
                  }
                  default: {
                    return `${info.name}.${extname}`;
                  }
                }
              },
              chunkFileNames: (info) => {
                return 'chunks/' + info.name.replace(/([\w]+)\.?.*/, `$1.${extname}`);
              },
              assetFileNames: 'assets/[name][extname]',
              globals: {
                vue: 'Vue'
              }
            }
          }
        }
      });
    })
  );
})();
