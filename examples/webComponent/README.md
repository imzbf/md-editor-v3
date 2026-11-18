# Vue Web Component integration

A browser-native `<md-editor-element>` hosts `MdEditor` in an open shadow root using Vue's `defineCustomElement`. All optional editor dependencies, including ECharts, use locally imported instances.

From the repository root, with Node.js 22.12 or later:

```sh
cd examples/webComponent
npm install
npm run dev
```

To check types and preview a production build:

```sh
npm run build
npm run preview
```

[`src/MdEditorElement/MdEditorElement.ce.vue`](src/MdEditorElement/MdEditorElement.ce.vue) uses Vite's `.ce.vue` handling to embed editor and dependency styles in the shadow root. KaTeX font faces are also registered at document level. The sample's text is maintained with `v-model` inside the custom element.

[`src/config.ts`](src/config.ts) configures shared dependency instances before mounting, rather than configuring the global editor singleton from every component's setup. `register()` checks for an existing custom-element definition before registering it.

Copy the element module and its dependencies into the host application and call `register()` from a browser entry point. Vue manages the component's mount and unmount lifecycle. If adding a catalog whose scrolling container is inside the shadow root, use `isScrollElementInShadow`.
