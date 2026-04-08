<!-- next-release -->

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
