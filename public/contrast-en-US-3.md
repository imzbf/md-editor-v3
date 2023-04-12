## Upgrade from 1.x to 2.x

This is the content that 3.x is incompatible with version 2.x only.

## Props

| name            | description             |
| --------------- | ----------------------- |
| markedHeadingId | rename to `mdHeadingId` |
| historyLength   | deleted                 |

## Config

```diff
MdEditor.config({
-  markedRenderer: (renderer) => renderer,
-  markedExtensions: [],
-  markedOptions,
+  codeMirrorExtensions: (theme, extensions) => extensions,
+  markdownItConfig: (mdit) { }
})
```

## Shortcut Key

| key      | function | description |
| -------- | -------- | ----------- |
| CTRL + Q | quote    | deleted     |

## Component

### MdCatalog

- **props**

  - `markedHeadingId`: deleted, use `mdHeadingId` instead of it
