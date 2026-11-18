# Nuxt integration

This example uses Nuxt 4 with `md-editor-v3` 7.x. The entry point is [`app/app.vue`](app/app.vue). It server-renders the initial Markdown, binds editing with `v-model`, and updates a separate preview and catalog.

Use Node.js 22.22.3+ on the 22.x line, 24.15+ on the 24.x line, or 26+. From the repository root:

```sh
cd examples/nuxt
npm install
npm run dev
```

To check types and build the application:

```sh
npm run typecheck
npm run build
npm run preview
```

- [`nuxt.config.ts`](nuxt.config.ts) registers the global editor stylesheet, which also covers this page's preview.
- The editor and preview have different ids. `MdCatalog.editorId` matches the preview, and `scroll-element="html"` is safe on the server.
- Standalone instances can use the library's generated id. An explicit id is useful here for catalog linkage, not a blanket SSR requirement.
- This example keeps the editor's default CDN loading. When providing browser-only local dependencies, initialize them in a Nuxt client plugin before editor instances mount.
