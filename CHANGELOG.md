<!-- next-release -->

## 6.5.6 (2026-08-05)

### Fixed Bugs

- preserve structured tokens for rich content ([commit 60db605](https://github.com/imzbf/md-editor-v3/commit/60db60561f8667fccd8ac6235c00ba476ec27031))

### Others

- ci(release): use changelog entry as release notes ([commit 91410e9](https://github.com/imzbf/md-editor-v3/commit/91410e9da45f913212221f768eac6325f3f5056a))

**Full Changelog**: [v6.5.5...v6.5.6](https://github.com/imzbf/md-editor-v3/compare/v6.5.5...v6.5.6)

---

## 6.5.5 (2026-07-30)

### Fixed Bugs

- clean up temporary render container ([commit 7fcff92](https://github.com/imzbf/md-editor-v3/commit/7fcff923c5cb42d1fc5195aa93d0b90d94caa687))
  - Always remove the off-screen container after rendering, including unclosed and failed render paths.

- preserve selection and copy in read-only mode ([commit 7b6b93d](https://github.com/imzbf/md-editor-v3/commit/7b6b93d00132f6a194b98f08b998242ada6d9450)) [#1032](https://github.com/imzbf/md-editor-v3/issues/1032)
  - Separate read-only behavior from disabled state and block user-triggered mutations while keeping programmatic updates available.

- guard DOM work after unmount ([commit f3dc7eb](https://github.com/imzbf/md-editor-v3/commit/f3dc7eb329d0cc09315f4ce34faf41dbb19b2ca5))

**Full Changelog**: [v6.5.4...v6.5.5](https://github.com/imzbf/md-editor-v3/compare/v6.5.4...v6.5.5)

---

## 6.5.4 (2026-07-17)

### Fixed Bugs

- escape code fence metadata in preview output ([commit 2c07360](https://github.com/imzbf/md-editor-v3/commit/2c07360420e74087f5bc63032ab155d93e0a0b10))

- fix misalignment when syncing editor to preview at the top ([commit bea48ec](https://github.com/imzbf/md-editor-v3/commit/bea48ec0ba51c19deda9486eb06050b5b8f50b51))
  - ### 描述
  - - 修复 `pEleHandler` 中 `startTop === 0` 且无显式初始块时的隐式高度计算，避免开头留白时映射错误。
  - - 修改 `getLineNumber` 倒序遍历逻辑
  - - 移除冗余的越界条件判断
  - ### 问题
  - 编辑区开头有空白时滑动，预览区会直接跳到文档中段
  - ### 解决
  - - 如果“文档中只存在一个模块”，实际应该被触底逻辑覆盖
  - - `startEle === endEle`条件在`buildMap`隐式填充0、且无多余DOM才会进入，对应预览区域无实际dom，直接置零
  - (cherry picked from commit 389f926b18030ef1c80c900472d44ed6957dbcb7)

- fix misalignment when syncing preview to editor at the top ([commit ea6f13b](https://github.com/imzbf/md-editor-v3/commit/ea6f13b98e8248eaa3166cec4fe900f32a5d34e1))
  - ### Description
  - Fixed a bug where the editor and preview areas failed to align at the top when scrolling the preview area.
  - ### Cause
  - In `cEleHandler` (preview-to-editor), when `realEleStart` matches the first child, `scale` is calculated from absolute `0`, but `firstLineScrollTop` was not reset to `0`. This caused the old/cached `firstLineScrollTop` value to be added, preventing the editor from scrolling back to the absolute top.
  - ### Solution
  - Explicitly set `firstLineScrollTop = 0` inside the `else if` branch for the top element area to ensure a proper 0-based scale mapping.
  - (cherry picked from commit d3ebcfe19dbbd7e9dd385ac143a331879f321fce)

**Full Changelog**: [v6.5.3...v6.5.4](https://github.com/imzbf/md-editor-v3/compare/v6.5.3...v6.5.4)

---

## 6.5.3 (2026-06-23)

### Fixed Bugs

- include markdown theme as runtime dependency ([commit b2b3250](https://github.com/imzbf/md-editor-v3/commit/b2b3250e9115d887547b3d31dac9008035d9dcdc))
  - Move @vavt/markdown-theme into production dependencies and align preview style imports with the generated CSS output.
  - Also update related logical style properties for search and clip controls.

**Full Changelog**: [v6.5.2...v6.5.3](https://github.com/imzbf/md-editor-v3/compare/v6.5.2...v6.5.3)

---

## 6.5.2 (2026-06-22)

### Refactors

- replace Less with Sass and optimize project build scripts ([commit cb7410d](https://github.com/imzbf/md-editor-v3/commit/cb7410de93dd2fa64b7dabfadae4a9e35d041cce))

### Fixed Bugs

- handle content before first preview anchor ([commit 5bf5a2a](https://github.com/imzbf/md-editor-v3/commit/5bf5a2af38e00655a77820988a47d66c44bfa6c4)) [#1028](https://github.com/imzbf/md-editor-v3/issues/1028)

**Full Changelog**: [v6.5.1...v6.5.2](https://github.com/imzbf/md-editor-v3/compare/v6.5.1...v6.5.2)

---

## 6.5.1 (2026-05-22)

### Refactors

- replace lucide-vue-next with @lucide/vue ([commit f04c440](https://github.com/imzbf/md-editor-v3/commit/f04c44071337314a4a13fa763643de11931174f4)) [#1023](https://github.com/imzbf/md-editor-v3/issues/1023)
  - Migrate to the new official @lucide/vue package as lucide-vue-next
  - is deprecated, updating imports and build externals accordingly.

- replace axios with native fetch for image upload ([commit 63e9a53](https://github.com/imzbf/md-editor-v3/commit/63e9a5311ae560a4035e16bb59d86b70d165f948))
  - Extract a shared `uploadImage` helper that uses the Fetch API with
  - proper HTTP status and response-code validation, and remove the
  - `axios` dev dependency.

### Others

- build(scripts): replace tsx with native Node TypeScript support ([commit a81b874](https://github.com/imzbf/md-editor-v3/commit/a81b874e753fe9b5388b5a6d623ba08a48bcb6f9))
  - Remove the `tsx` dev dependency and switch npm scripts to use
  - `node` directly, leveraging Node's built-in TypeScript stripping.
  - Update imports to use `.ts` extensions and type-only imports where
  - appropriate, and add the required tsconfig flags
  - (`allowImportingTsExtensions`, `emitDeclarationOnly`).

- docs(skill): update echarts parser guidance ([commit bdd9d83](https://github.com/imzbf/md-editor-v3/commit/bdd9d830b70a867d714a6f5cc7d85519e7f47a92))

**Full Changelog**: [v6.5.0...v6.5.1](https://github.com/imzbf/md-editor-v3/compare/v6.5.0...v6.5.1)

---

## 6.5.0 (2026-04-28)

### Features

- allow custom option parser ([commit 9236506](https://github.com/imzbf/md-editor-v3/commit/923650670e14feca7a8986bfb623cea85975852c))

### Others

- docs(skill): add downstream usage skill and align id guidance ([commit ed09046](https://github.com/imzbf/md-editor-v3/commit/ed0904660163faa10bd0ca5fb85288172443db0e))

**Full Changelog**: [v6.4.2...v6.5.0](https://github.com/imzbf/md-editor-v3/compare/v6.4.2...v6.5.0)

---

## 6.4.2 (2026-04-06)

### Fixed Bugs

- remove lru-cache runtime dependency ([commit c07d75b](https://github.com/imzbf/md-editor-v3/commit/c07d75b3ff5ed44e20b55944f5b659855bcfce4e)) [#1018](https://github.com/imzbf/md-editor-v3/issues/1018)
  - Replace the mermaid cache implementation with an internal TTL/LRU cache and stop externalizing lru-cache in library builds.

**Full Changelog**: [v6.4.1...v6.4.2](https://github.com/imzbf/md-editor-v3/compare/v6.4.1...v6.4.2)

---

## 6.4.1 (2026-03-21)

### Fixed Bugs

- bump @vavt/util to address config prototype pollution ([commit 718faa0](https://github.com/imzbf/md-editor-v3/commit/718faa0548145e4bfe653c335f276c712ee733be)) [#1016](https://github.com/imzbf/md-editor-v3/issues/1016)

**Full Changelog**: [v6.4.0...v6.4.1](https://github.com/imzbf/md-editor-v3/compare/v6.4.0...v6.4.1)

---

## 6.4.0 (2026-03-05)

### Features

- use white mermaid theme in light mode ([commit 4efc5bb](https://github.com/imzbf/md-editor-v3/commit/4efc5bb0cd0dceb682a72f18dda63201fdb62d17))

### Fixed Bugs

- bump @vavt/markdown-theme to fix mermaid overflow #1010 ([commit b8f9049](https://github.com/imzbf/md-editor-v3/commit/b8f90497bf936a4adf1f65b7f0ba98930c2549c4)) [#1010](https://github.com/imzbf/md-editor-v3/issues/1010)
  - Fixes preview clipping where mermaid blocks with many lines overflow on the last line due to p line-height behavior.

### Others

- docs(readme): clarify commit message should include solved problem ([commit 8933da4](https://github.com/imzbf/md-editor-v3/commit/8933da4394db5840461cea81f0e6bdfaeadea6da))

**Full Changelog**: [v6.3.2...v6.4.0](https://github.com/imzbf/md-editor-v3/compare/v6.3.2...v6.4.0)

---

## 6.3.2 (2026-03-04)

### Refactors

- replace dts pipeline with rollup-plugin-dts #1008 ([commit fdec53d](https://github.com/imzbf/md-editor-v3/commit/fdec53d2c5c16ce03baf60eec84b5af77732b974)) [#1008](https://github.com/imzbf/md-editor-v3/issues/1008)

### Others

- chore(deps): upgrade highlightjs/prettier/mermaid/katex and refresh sri ([commit 7b068d3](https://github.com/imzbf/md-editor-v3/commit/7b068d3dfce707cb09e1e5373a978d1d11f254d4))

- docs(readme): add release-aligned commit convention ([commit 3bef6e3](https://github.com/imzbf/md-editor-v3/commit/3bef6e37be399e6dc0b3c1f1f33684bf3b17be46))

- chore(deps): migrate package management from yarn to npm ([commit 4f8b5c6](https://github.com/imzbf/md-editor-v3/commit/4f8b5c679ed43fcccfc008f2be846a554295931b))

- ci(github): automate issue triage and release workflows ([commit e425ca1](https://github.com/imzbf/md-editor-v3/commit/e425ca10735b3f377760bc1fb74d9b69ba6054ae))

**Full Changelog**: [v6.3.1...v6.3.2](https://github.com/imzbf/md-editor-v3/compare/v6.3.1...v6.3.2)

---
