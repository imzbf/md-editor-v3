/// <reference types="vite/client" />

// Expose Vue SFC imports to TypeScript tools outside vue-tsc.
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent;
  export default component;
}
