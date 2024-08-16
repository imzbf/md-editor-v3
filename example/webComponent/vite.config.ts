import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import markdown from '@vavt/vite-plugin-import-markdown';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    markdown(),
    vue({
      template: {
        compilerOptions: {
          // 将所有带短横线的标签名都视为自定义元素
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    })
  ]
});
