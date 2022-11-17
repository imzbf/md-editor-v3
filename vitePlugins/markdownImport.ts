import { Plugin } from 'vite';

export default (): Plugin => {
  return {
    name: 'vite-plugin-markdownImport',
    enforce: 'pre',
    transform(code, id) {
      if (/\.md$/.test(id)) {
        return {
          code: `export default ${JSON.stringify(code)}`
        };
      } else {
        return null;
      }
    }
  };
};
