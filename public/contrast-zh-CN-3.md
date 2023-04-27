# 从 2.x 升级到 3.x

下面列举的是`3.x`不兼容`2.x`的内容，兼容内容不作展示。

## 语法

- 删除线

  ```diff
  - ~It is a dream deeply rooted in the American dream.~
  + ~~It is a dream deeply rooted in the American dream.~~
  ```

## Props

| 名称            | 说明                |
| --------------- | ------------------- |
| markedHeadingId | 修改为`mdHeadingId` |
| historyLength   | 已移除              |

## 配置项

```diff
MdEditor.config({
-  markedRenderer: (renderer) => renderer,
-  markedExtensions: [],
-  markedOptions,
+  codeMirrorExtensions: (theme, extensions) => extensions,
+  markdownItConfig: (mdit) { }
})
```

## 快捷键

| 键位     | 功能     | 说明   |
| -------- | -------- | ------ |
| CTRL + Q | 添加引用 | 已移除 |

## 内部组件

### 目录导航

- **props**

  - `markedHeadingId`: 已删除，使用`mdHeadingId`代替。
