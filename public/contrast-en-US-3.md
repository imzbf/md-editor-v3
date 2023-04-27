# Upgrade from 2.x to 3.x

This is the content that 3.x is incompatible with version 2.x only.

## Grammar

- Strikethrough

  ```diff
  - ~It is a dream deeply rooted in the American dream.~
  + ~~It is a dream deeply rooted in the American dream.~~
  ```

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
