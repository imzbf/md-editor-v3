import fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import * as sass from 'sass';
import { build } from 'vite';
import type { LibraryFormats } from 'vite';
import { buildType } from './build.type.ts';

const __dirname = fileURLToPath(new URL('..', import.meta.url));
const resolvePath = (p: string) => path.resolve(__dirname, p);

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

const buildStyle = (inputFile: string, outputFile: string) => {
  const result = sass.compile(inputFile, {
    loadPaths: [resolvePath('node_modules')],
    style: 'expanded'
  });

  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, result.css);
};

(async () => {
  await build({
    base: '/',
    publicDir: false,
    resolve: {
      alias: {
        '~~': resolvePath('packages'),
        '~': resolvePath('packages/MdEditor')
      }
    },
    plugins: [vue(), vueJsx()],
    css: {
      modules: {
        localsConvention: 'camelCase' // 默认只支持驼峰，修改为同事支持横线和驼峰
      }
    },
    build: {
      emptyOutDir: false,
      cssCodeSplit: true,
      outDir: resolvePath('lib'),
      lib: {
        entry: moduleEntry,
        name: 'MdEditorV3',
        fileName(format) {
          switch (format) {
            case 'es': {
              return `es/[name].mjs`;
            }
            case 'cjs': {
              return `cjs/[name].cjs`;
            }
            default: {
              return 'umd/[name].js';
            }
          }
        }
      },
      rollupOptions: {
        external: [
          'vue',
          'medium-zoom',
          'codemirror',
          '@lucide/vue',
          /@vavt\/.*/,
          /@codemirror\/.*/,
          /@lezer\/.*/,
          /markdown-it.*/
        ],
        output: ['es', 'cjs'].map((format: LibraryFormats) => ({
          format,
          chunkFileNames: `${format}/chunks/[name].${format === 'es' ? 'mjs' : 'cjs'}`,
          assetFileNames: '[name][extname]'
        }))
      }
    }
  });
  await buildType();
  buildStyle(
    resolvePath('packages/MdEditor/styles/style.scss'),
    resolvePath('lib/style.css')
  );
  buildStyle(
    resolvePath('packages/MdEditor/styles/preview.scss'),
    resolvePath('lib/preview.css')
  );
})().catch((error) => {
  console.error('Error during build:', error);
});
