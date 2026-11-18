# Electron integration

An offline `md-editor-v3` 7.x editor in Electron 45. The renderer uses browser APIs only, with Node integration disabled, context isolation enabled and sandboxing enabled. No preload bridge is needed for this example.

From the repository root, with Node.js 22.12 or later:

```sh
cd examples/electron
npm install
npm run dev
```

To type-check and build the renderer and main process:

```sh
npm run build
```

To additionally produce an installer for the current platform:

```sh
npm run pack
```

[`src/config.ts`](src/config.ts) provides local highlighter, formatter, cropper, fullscreen, Mermaid, KaTeX and ECharts instances. The app does not depend on CDN scripts or remote fonts. Example Markdown also avoids remote image requests.

The main process opens document HTTP(S) links in the system browser. Application-specific uploads or disk persistence should be added through a narrowly scoped application API; the example does not expose Node APIs to Markdown content.

Production assets use relative URLs for Electron's `file:` loading. Build output goes to `dist` and `dist-electron`; installers go to `release`.
