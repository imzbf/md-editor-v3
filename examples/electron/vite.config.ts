import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron';

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    electron({
      async onstart({ startup }) {
        // Keep the renderer sandbox enabled during development as well.
        await startup(['.']);
      },
      vite: {
        build: {
          outDir: 'dist-electron',
          emptyOutDir: true,
          rolldownOptions: {
            input: 'electron/main.ts',
            output: {
              format: 'cjs',
              entryFileNames: 'index.cjs'
            }
          }
        }
      }
    })
  ]
});
