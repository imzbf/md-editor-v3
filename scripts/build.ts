import path from 'path';
import { fileURLToPath } from 'url';
import { build, LibraryFormats } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';
import { removeDir } from './u';

const __dirname = fileURLToPath(new URL('..', import.meta.url));
const resolvePath = (p: string) => path.resolve(__dirname, p);

// vue3.3.x兼容
const __defProp = Object.defineProperty;
const __name = (target, value) =>
  __defProp(target, 'name', { value, configurable: true });
globalThis.__name = __name;

!(async () => {
  const moduleEntry = {
    index: resolvePath('packages'),
    MdEditor: resolvePath('packages/MdEditor'),
    MdPreview: resolvePath('packages/MdPreview'),
    NormalToolbar: resolvePath('packages/NormalToolbar'),
    DropdownToolbar: resolvePath('packages/DropdownToolbar'),
    ModalToolbar: resolvePath('packages/ModalToolbar'),
    MdCatalog: resolvePath('packages/MdCatalog'),
    MdModal: resolvePath('packages/MdEditor/components/Modal'),
    config: resolvePath('packages/config')
  };
  const formats: LibraryFormats[] = ['es', 'cjs', 'umd'];

  const entries = {
    es: {
      ...moduleEntry,
      // 这里只有利用vite构建的assetFileNames为文件名的特性构建样式文件
      preview: resolvePath('packages/MdEditor/styles/preview.less'),
      style: resolvePath('packages/MdEditor/styles/style.less')
    },
    cjs: moduleEntry,
    umd: resolvePath('packages')
  };

  const extnames = {
    es: 'mjs',
    cjs: 'cjs'
  };

  removeDir(resolvePath('lib'));

  await Promise.all(
    formats.map((t) => {
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
          t === 'es' &&
            dts({
              outDir: resolvePath('lib/types'),
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
          emptyOutDir: false,
          cssCodeSplit: true,
          outDir: resolvePath('lib'),
          // nuxt识别出，压缩后的h与vue导出的冲突了
          minify: t === 'umd',
          lib: {
            entry: entries[t],
            name: 'MdEditorV3',
            formats: [t],
            fileName(format) {
              switch (format) {
                case 'es': {
                  return `es/[name].mjs`;
                }
                case 'cjs': {
                  return `cjs/[name].cjs`;
                }
                default: {
                  return `umd/index.js`;
                }
              }
            }
          },
          rollupOptions: {
            external:
              t === 'umd'
                ? ['vue']
                : [
                    'vue',
                    'medium-zoom',
                    'lru-cache',
                    'copy-to-clipboard',
                    'codemirror',
                    '@vavt/util',
                    /@codemirror\/.*/,
                    /@lezer\/.*/,
                    /markdown-it.*/
                  ],
            output: {
              chunkFileNames: `${t}/chunks/[name].${extnames[t]}`,
              assetFileNames: '[name][extname]',
              globals:
                t === 'umd'
                  ? {
                      vue: 'Vue'
                    }
                  : {}
            }
          }
        }
      });
    })
  );
})();
