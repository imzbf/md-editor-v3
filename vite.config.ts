import path from 'path';
import { UserConfigExport, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import nodeService from './vitePlugins/nodeService';

// https://segmentfault.com/a/1190000040127796
import dts from 'vite-plugin-dts';

import { homepage } from './package.json';

const libBuildOptions = {
  outDir: path.resolve(__dirname, 'lib'),
  lib: {
    entry: path.resolve(__dirname, './MdEditor'),
    name: 'MdEditorV3'
  },
  rollupOptions: {
    external: ['vue'],
    output: {
      globals: {
        vue: 'Vue'
      }
    }
  }
};

export default ({ mode }: ConfigEnv): UserConfigExport => {
  console.log('mode：', mode);

  return {
    base: mode === 'preview' ? homepage : '/',
    publicDir: mode === 'production' ? false : './dev/public',
    server: {
      host: 'localhost',
      open: true,
      port: 3344,
      https: false
    },
    resolve: {
      alias: {
        // 键必须以斜线开始和结束
        '@': path.resolve(__dirname, './dev')
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      nodeService(),
      mode === 'production' &&
        dts({
          include: [
            './MdEditor/type.ts',
            './MdEditor/Editor.tsx',
            './MdEditor/NormalToolbar.tsx',
            './MdEditor/DropdownToolbar.tsx',
            './MdEditor/index.ts'
          ]
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
    build: mode === 'production' ? libBuildOptions : {}
  };
};
