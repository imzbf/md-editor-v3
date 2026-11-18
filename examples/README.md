# md-editor-v3 integration examples

Standalone applications that consume the published `md-editor-v3` 7.x package with Vue 3.5.3 or later. Install dependencies in each example separately.

| Example | Demonstrates | Node.js for tooling |
| --- | --- | --- |
| [Nuxt](nuxt/README.md) | Server rendering, editing, preview and an external catalog | 22.22.3+ on 22.x, 24.15+ on 24.x, or 26+ |
| [Web Component](webComponent/README.md) | Vue custom elements, Shadow DOM styles and local dependencies | 22.12+ |
| [Electron](electron/README.md) | Offline editing in an isolated renderer | 22.12+ |

The examples use `^7.1.0`, not an unbounded `latest` dependency. They do not automatically consume uncommitted library changes; check the installed package version when verifying a fix that has not yet been released.

The [downstream skill](../skills/md-editor-v3/SKILL.md) provides focused API and integration patterns. Image uploads and article persistence require application endpoints and are not implemented by these standalone examples.
