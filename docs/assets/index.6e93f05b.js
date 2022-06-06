import{g as h,j as u,p as r,m as g,e as b,b as t,h as i,u as e,a as s,o as v}from"./index.63098596.js";var a=`> Use it online: [Go](https://codesandbox.io/s/epic-bird-2znqo).

## \u{1F92F} Props

### \u{1F4C3} modelValue

- **type**: \`string\`
- **default**: \`''\`
- **description**: Markdown content.

  \`\`\`html
  <md-editor-v3 v-model="xxx" />
  \`\`\`

### \u{1F6CD} theme

- **type**: \`'light' | 'dark'\`
- **default**: \`'light'\`
- **description**: Editor's theme.

  \`\`\`html
  <md-editor-v3 theme="dark" />
  \`\`\`

### \u{1F380} class

- **type**: \`string\`
- **default**: \`''\`
- **description**: Editor \`class\`.

### \u{1F90F}\u{1F3FC} historyLength

- **type**: \`number\`
- **default**: \`10\`
- **description**: The max length of history(if it is too big, editor will use more \`RAM\`).

### \u{1F4BB} pageFullScreen

- **type**: \`boolean\`
- **default**: \`false\`
- **description**: Screenfull in web page.

### \u{1F4F1} preview

- **type**: \`boolean\`
- **default**: \`true\`
- **description**: Preview content in editor.

### \u{1F4C0} htmlPreview

- **type**: \`boolean\`
- **default**: \`false\`
- **description**: Preview html in editor.

### \u{1F4FA} previewOnly

- **type**: \`boolean\`
- **default**: \`false\`
- **description**: Only render article content, no toolbar, no edit area.

### \u{1F524} language

- **type**: \`string\`
- **default**: \`'zh-CN'\`
- **description**: Build-in language('zh-CN', 'en-US').

### \u{1F9F1} toolbars

- **type**: \`Array\`
- **default**: \`[all]\`
- **description**: Show contents of toolbar, all keys.

  You can sort the toolbar as you like, split tools by \`'-'\`, the left and right toolbars are divided by \`'='\`\uFF01

  After v1.10.0, you can customize the toolbar. To display them, put index of \`defToolbars\` into \`toolbars\`(this is not standard)

  _[all]_

  \`\`\`js
  [
    'bold',
    'underline',
    'italic',
    '-',
    'strikeThrough',
    'sub',
    'sup',
    'quote',
    'unorderedList',
    'orderedList',
    '-',
    'codeRow',
    'code',
    'link',
    'image',
    'table',
    'mermaid',
    'katex',
    '-',
    'revoke',
    'next',
    'save',
    '=',
    'pageFullscreen',
    'fullscreen',
    'preview',
    'htmlPreview',
    'catalog',
    'github'
  ];
  \`\`\`

### \u{1F9F1} toolbarsExclude

- **type**: \`Array\`
- **default**: \`[]\`
- **description**: Don't show contents of toolbar.

### \u{1FA92} noPrettier

- **type**: \`boolean\`
- **default**: \`false\`
- **description**: Use prettier to beautify content or not.

### \u{1F3B2} editorId

- **type**: \`string\`
- **default**: \`'md-editor-v3'\`
- **description**: Editor id, also the html id, it is used when there are two or more editor and server render.

### \u{1F90F} tabWidth

- **type**: \`number\`
- **default**: \`2\`
- **description**: One tab eq some space.

### \u{1F522} showCodeRowNumber

- **type**: \`boolean\`
- **default**: \`false\`
- **description**: Show row number for code block or not.

### \u{1F526} previewTheme

- **type**: \`'default' | 'github' | 'vuepress' | 'mk-cute' | 'smart-blue' | 'cyanosis'\`
- **default**: \`'default'\`
- **description**: Preview themes.

  Custom:

  1. Write css

  \`\`\`css
  .xxx-theme {
    color: red;
  }
  \`\`\`

  2. Set \`previewTheme\`

  \`\`\`html
  <md-ditor-v3 preview-theme="xxx" />
  \`\`\`

  For more, refer to [markdown-theme](https://github.com/imzbf/markdown-theme).

### \u{1F385}\u{1F3FB} style

- **type**: \`string | CSSProperties\`
- **default**: \`''\`
- **description**: Editor's inline style.

### \u{1F4C5} tableShape

- **type**: \`[number, number]\`
- **default**: \`[6, 4]\`
- **description**: Preset the size of the table, [columns, rows].

  \`\`\`html
  <md-editor-v3 :tableShape="[8, 4]" />
  \`\`\`

  ![Preview](https://imzbf.github.io/md-editor-v3/imgs/20211216165424.png)

### \u261D\uFE0F noMermaid

- **type**: \`boolean\`
- **default**: \`false\`
- **description**: Do not want to use \`mermaid\`, set it to \`true\`.

  \`\`\`html
  <md-ditor-v3 no-mermaid />
  \`\`\`

### \u{1FAA7} placeholder

- **type**: \`string\`
- **default**: \`''\`
- **description**: em-\\_-\uFF01

### \u261D\uFE0F noKatex

- **type**: \`boolean\`
- **default**: \`false\`
- **description**: Do not want to use \`katex\`, set it to \`true\`.

  \`\`\`html
  <md-ditor-v3 no-katex />
  \`\`\`

### \u{1F989} codeTheme

- **type**: \`'atom'|'a11y'|'github'|'gradient'|'kimbie'|'paraiso'|'qtcreator'|'stackoverflow'\`
- **default**: \`'atom'\`
- **description**: Highlight code css name. Get Them from \`highlight.js\`.

  Custom:

  1. Config \`editorExtensions\`

  \`\`\`js
  import MdEditor from 'md-editor-v3';

  MdEditor.config({
    editorExtensions: {
      highlight: {
        css: {
          atom: {
            light:
              'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-light.min.css',
            dark: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-dark.min.css'
          },
          xxx: {
            light:
              'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/xxx-light.css',
            dark: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/xxx-dark.css'
          }
        }
      }
    }
  });
  \`\`\`

  2. Set \`codeTheme\`

  \`\`\`html
  <md-ditor-v3 code-theme="xxx" />
  \`\`\`

### \u{1F3B1} markedHeadingId

- **type**: \`(text: string, level: number, index: number) => string\`
- **default**: \`(text) => text\`
- **description**: Title \`ID\` generator.

  \`\`\`vue
  <template>
    <md-editor :marked-heading-id="generateId" />
  </template>

  <script setup>
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const generateId = (_text, _level, index) => \`heading-\${index}\`;
  <\/script>
  \`\`\`

### \u{1F423} sanitize

- **type**: \`(html: string) => string\`
- **default**: \`(html) => html\`
- **description**: Sanitize the html, prevent XSS. When you can be sure that your content is OK, ignore this.

  \`sanitize-html\` example:

  \`\`\`vue
  <template>
    <md-editor :sanitize="sanitize" />
  </template>

  <script setup>
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';
  import sanitizeHtml from 'sanitize-html';

  const sanitize = (html) => sanitizeHtml(html);
  <\/script>
  \`\`\`

### \u{1F9B6} footers

- **\u7C7B\u578B**\uFF1A\`Array<'markdownTotal' \\| '=' \\| 'scrollSwitch' \\| number>\`
- **\u9ED8\u8BA4\u503C**\uFF1A\`['markdownTotal', '=', 'scrollSwitch']\`
- **\u8BF4\u660E**\uFF1AShow contents of footer, they are divided by \`'='\`. Set it to [] to hidden footer.

### \u{1F468}\u200D\u{1F466} scrollAuto

- **\u7C7B\u578B**\uFF1A\`boolean\`
- **\u9ED8\u8BA4\u503C**\uFF1A\`true\`
- **\u8BF4\u660E**\uFF1AScroll default setting.

## \u{1F38D} slots

### \u{1F4AA} defToolbars

Custom toolbar in \`DropdownToolbar\`, \`NormalToolbar\` or \`ModalToolbar\`.

- Setup Template

  \`\`\`vue
  <template>
    <md-editor :toolbars="toolbars">
      <template #defToolbars>
        <normal-toolbar title="mark" @onClick="handler">
          <template #trigger>
            <svg class="md-icon" aria-hidden="true">
              <use xlink:href="#icon-mark"></use>
            </svg>
          </template>
        </normal-toolbar>
      </template>
    </md-editor>
  </template>

  <script setup>
  import MdEditor from 'md-editor-v3';
  const NormalToolbar = MdEditor.NormalToolbar;

  const toolbars = ['bold', '-', 0, '=', 'github'];

  const handler = () => {
    console.log('NormalToolbar clicked!');
  };
  <\/script>
  \`\`\`

- Jsx Template

  \`\`\`jsx
  import { defineComponent } from 'vue';
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  export default defineComponent({
    setup() {
      return () => (
        <MdEditor
          toolbars={['bold', '-', 0, '=', 'github']}
          defToolbars={
            <>
              <MdEditor.NormalToolbar
                trigger={
                  <svg class={\`md-icon\`} aria-hidden="true">
                    <use xlinkHref="#icon-strike-through" />
                  </svg>
                }
              ></MdEditor.NormalToolbar>
            </>
          }
        />
      );
    }
  });
  \`\`\`

![NormalToolbar](https://imzbf.github.io/md-editor-v3/imgs/normal-toolbar.gif)

![DropdownToolbar](https://imzbf.github.io/md-editor-v3/imgs/dropdown-toolbar.gif)

For more info, Get **Internal Components** heading. Get source code of **mark**, **emoji** and **modal preview** at [docs](https://github.com/imzbf/md-editor-v3/tree/docs/src/components) branch.

### \u{1F9BF} defFooters

- Setup Template

  \`\`\`vue
  <template>
    <md-editor :footers="footers">
      <template #defFooters>
        <span>\uFFE5_\uFFE5</span>
        <span>^_^</span>
      </template>
    </md-editor>
  </template>

  <script setup>
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const footers = ['markdownTotal', 0, '=', 1, 'scrollSwitch'];
  <\/script>
  \`\`\`

- Jsx Template

  \`\`\`jsx
  import { defineComponent } from 'vue';
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  export default defineComponent({
    setup() {
      return () => (
        <MdEditor
          footers={['markdownTotal', 0, '=', 1, 'scrollSwitch']}
          defFooters={
            <>
              <span>\uFFE5_\uFFE5</span>
              <span>^_^</span>
            </>
          }
        />
      );
    }
  });
  \`\`\`

![](https://imzbf.github.io/md-editor-v3/imgs/footer.png)

## \u{1FAA2} Event

### \u{1F4DE} onChange

- **type**: \`(v: string) => void\`
- **description**: Content changed event(bind to \`oninput\` of \`textarea\`).

### \u{1F4BE} onSave

- **type**: \`(v: string) => void\`
- **description**: Save Content event, \`ctrl+s\` and click button will trigger.

### \u{1F4F8} onUploadImg

- **type**: \`(files: Array<File>, callback: (urls: Array<string>) => void) => void\`
- **description**: Upload picture event, when picture is uploading the modal will not close, please provide right urls to the callback function.

  \`\`\`js
  const onUploadImg = async (files, callback) => {
    const res = await Promise.all(
      files.map((file) => {
        return new Promise((rev, rej) => {
          const form = new FormData();
          form.append('file', file);

          axios
            .post('/api/img/upload', form, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then((res) => rev(res))
            .catch((error) => rej(error));
        });
      })
    );

    callback(res.map((item) => item.data.url));
  };
  \`\`\`

  \`\`\`html
  <md-ditor-v3 @onUploadImg="onUploadImg" />
  \`\`\`

### \u260E\uFE0F onHtmlChanged

- **type**: \`(h: string) => void\`
- **description**: Compile markdown successful event, ou can use it to get the html code.

### \u{1F5D2} onGetCatalog

- **type**: \`(list: HeadList[]) => void\`
- **description**: Get catalogue of article.

### \u{1F480} onError

- **type**: \`(err: { name: string; message: string;}) => void\`
- **description**: Run-Time error event, only be called when \`Cropper\`, \`fullScreen\`, \`prettier\` is not loaded.

  \`\`\`js
  const onError = (err) => {
    alert(err.message);
  };
  \`\`\`

  \`\`\`html
  <md-ditor-v3 @onError="onError" />
  \`\`\`

## \u{1F4B4} Config Editor

Custom \`marked renderer\` in \`MdEditor.config(option: ConfigOption)\`.

- markedRenderer: \`(renderer: Renderer) => Renderer\`

  Open target page in a new browser window:

  \`\`\`js
  import MdEditor from 'md-editor-v3';

  MdEditor.config({
    markedRenderer(renderer) {
      renderer.link = (href, title, text) => {
        return \`<a href="\${href}" title="\${title}" target="_blank">\${text}</a>\`;
      };

      return renderer;
    }
  });
  \`\`\`

  > docs: https://marked.js.org/using_pro#renderer

- markedExtensions: \`Array<marked.TokenizerExtension & marked.RendererExtension>\`

  \`\`\`js
  import MdEditor from 'md-editor-v3';

  MdEditor.config({
    markedExtensions: [your extension]
  });
  \`\`\`

  > marked docs: https://marked.js.org/using_pro#extensions

  [Docs page source code](https://github.com/imzbf/md-editor-v3/blob/docs/src/main.ts)

- markedOptions: \`marked.MarkedOptions\`

  Do not render \`<br>\` on a single line break:

  \`\`\`js
  import MdEditor from 'md-editor-v3';

  MdEditor.config({
    markedOptions: { breaks: false }
  });
  \`\`\`

  > marked docs: https://marked.js.org/using_advanced#options

- editorConfig: Add more languages, reset \`mermaid\` template or delay rendering time

  \`\`\`js
  import MdEditor from 'md-editor-v3';

  MdEditor.config({
    editorConfig: {
      languageUserDefined: {
        'en-US': {
          toolbarTips: {
            bold: 'bold',
            underline: 'underline',
            italic: 'italic',
            strikeThrough: 'strikeThrough',
            title: 'title',
            sub: 'subscript',
            sup: 'superscript',
            quote: 'quote',
            unorderedList: 'unordered list',
            orderedList: 'ordered list',
            codeRow: 'inline code',
            code: 'block-level code',
            link: 'link',
            image: 'image',
            table: 'table',
            mermaid: 'mermaid',
            katex: 'formula',
            revoke: 'revoke',
            next: 'undo revoke',
            save: 'save',
            prettier: 'prettier',
            pageFullscreen: 'fullscreen in page',
            fullscreen: 'fullscreen',
            preview: 'preview',
            htmlPreview: 'html preview',
            catalog: 'catalog',
            github: 'source code'
          },
          titleItem: {
            h1: 'Lv1 Heading',
            h2: 'Lv2 Heading',
            h3: 'Lv3 Heading',
            h4: 'Lv4 Heading',
            h5: 'Lv5 Heading',
            h6: 'Lv6 Heading'
          },
          imgTitleItem: {
            link: 'Add Img Link',
            upload: 'Upload Img',
            clip2upload: 'Clip Upload'
          },
          linkModalTips: {
            title: 'Add ',
            descLable: 'Desc:',
            descLablePlaceHolder: 'Enter a description...',
            urlLable: 'Link:',
            UrlLablePlaceHolder: 'Enter a link...',
            buttonOK: 'OK'
          },
          clipModalTips: {
            title: 'Crop Image',
            buttonUpload: 'Upload'
          },
          copyCode: {
            text: 'Copy',
            successTips: 'Copied!',
            failTips: 'Copy failed!'
          },
          mermaid: {
            flow: 'flow',
            sequence: 'sequence',
            gantt: 'gantt',
            class: 'class',
            state: 'state',
            pie: 'pie',
            relationship: 'relationship',
            journey: 'journey'
          },
          katex: {
            inline: 'inline',
            block: 'block'
          },
          footer: {
            markdownTotal: 'Word Count',
            scrollAuto: 'Scroll Auto'
          }
        },
        // mermaid template
        mermaidTemplate: {
          flow: \`flow tempalte\`,
          sequence: \`sequence template\`,
          gantt: \`gantt template\`,
          class: \`class template\`,
          state: \`state template\`,
          pie: \`pie template\`,
          relationship: \`relationship template\`,
          journey: \`journey template\`
        },
        // delay rendering time(ms)
        renderDelay: 0
      }
    }
  });
  \`\`\`

- editorExtensions: Config some dependency libraries, like highlight..

  \`\`\`typescript
  import MdEditor from 'md-editor-v3';

  MdEditor.config({
    editorExtensions: { iconfont: 'https://xxx.cc' }
  });
  \`\`\`

  <details>
    <summary>[EditorExtensions]</summary>

  \`\`\`ts
  import MdEditor from 'md-editor-v3';

  interface EditorExtensions {
    highlight?: {
      instance?: any;
      js?: string;
      css?: {
        [key: string]: {
          light: string;
          dark: string;
        };
      };
    };
    prettier?: {
      standaloneJs?: string;
      parserMarkdownJs?: string;
    };
    cropper?: {
      instance?: any;
      js?: string;
      css?: string;
    };
    iconfont?: string;
    screenfull?: {
      instance?: any;
      js?: string;
    };
    mermaid?: {
      instance?: any;
      js?: string;
    };
    katex?: {
      instance?: any;
      js?: string;
      css?: string;
    };
  }
  \`\`\`

  </details>

## \u{1FAA1} Shortcut key

| key | function | description |
| --- | --- | --- |
| TAB | insert space | Insert space, the length eq \`tabWidth\`, default: 2, support multiline |
| SHIFT + TAB | delete space, setting is the same as Tab |  |
| CTRL + C | copy | When selected, copy the selected content. When not selected, copy the content of the current line |
| CTRL + X | shear | When selected, cut the selected content. When not selected, cut the current line |
| CTRL + D | delete | When selected, delete the selected content. When not selected, delete the current line |
| CTRL + S | save | Trigger \`onSave\` event |
| CTRL + B | bold text | \`**bold**\` |
| CTRL + U | underline | \`<u>underline</u>\` |
| CTRL + I | italic | \`*italic*\` |
| CTRL + 1-6 | h1-h6 | \`# title\` |
| CTRL + \u2191 | superscript | \`<sup>superscript</sup>\` |
| CTRL + \u2193 | subscript | \`<sub>subscript</sub>\` |
| CTRL + Q | quote | \`> quote\` |
| CTRL + O | ordered list | \`1. ordered list\` |
| CTRL + L | link | \`[link](https://github.com/imzbf/md-editor-v3)\` |
| CTRL + Z | withdraw | Withdraw history in editor, not the function of system |
| CTRL + SHIFT + S | line-through | \`~line-through~\` |
| CTRL + SHIFT + U | unordered list | \`- unordered list\` |
| CTRL + SHIFT + C | code block |  |
| CTRL + SHIFT + I | picture | \`![picture](https://imzbf.cc)\` |
| CTRL + SHIFT + Z | forward | Forward history in editor, not the function of system |
| CTRL + SHIFT + F | Beautify |  |
| CTRL + ALT + C | code row |  |
| CTRL + SHIFT + ALT + T | table | \`\\|table\\|\` |

## \u{1FAA4} Internal Components

They are used as attributes of the editor component, eg: \`Editor.DropdownToolbar\`

### \u{1F423} NormalToolbar

\`Editor.NormalToolbar\`

- **props**

  - \`title\`: \`string\`, not necessary, title of toolbar.

- **events**

  - \`onClick\`: \`(e: MouseEvent) => void\`, necessary.

- **slots**

  - \`trigger\`: \`string | JSX.Element\`, necessary, it is usually an icon, which is displayed on the toolbar.

usage:

\`\`\`vue
<template>
  <md-editor-v3 v-model="text">
    <template #defToolbars>
      <normal-toolbar title="mark" @onClick="callback">
        <template #trigger>
          <svg class="md-icon" aria-hidden="true">
            <use xlink:href="#icon-mark"></use>
          </svg>
        </template>
      </normal-toolbar>
    </template>
  </md-editor-v3>
</template>
\`\`\`

[MarkExtension Source Code](https://github.com/imzbf/md-editor-v3/blob/docs/src/components/MarkExtension/index.vue)

### \u{1F43C} DropdownToolbar

\`Editor.DropdownToolbar\`

- **props**

  - \`title\`: \`string\`, not necessary, title of toolbar.
  - \`visible\`: \`boolean\`, necessary.

- **events**

  - \`onChange\`: \`(visible: boolean) => void\`, necessary.

- **slots**

  - \`trigger\`: \`string | JSX.Element\`, necessary, it is usually an icon, which is displayed on the toolbar.
  - \`overlay\`: \`string | JSX.Element\`, necessary, content of dropdown box.

usage:

\`\`\`vue
<template>
  <md-editor-v3 v-model="text">
    <template #defToolbars>
      <dropdown-toolbar
        title="emoji"
        :visible="data.emojiVisible"
        :onChange="emojiVisibleChanged"
      >
        <template #overlay>
          <div class="emoji-container">
            <ol class="emojis">
              <li
                v-for="(emoji, index) of emojis"
                :key="\`emoji-\${index}\`"
                @click="emojiHandler(emoji)"
                v-text="emoji"
              ></li>
            </ol>
          </div>
        </template>
        <template #trigger>
          <svg class="md-icon" aria-hidden="true">
            <use xlink:href="#icon-emoji"></use>
          </svg>
        </template>
      </dropdown-toolbar>
    </template>
  </md-editor-v3>
</template>
\`\`\`

[EmojiExtension Source Code](https://github.com/imzbf/md-editor-v3/blob/docs/src/components/EmojiExtension/index.vue)

### \u{1F989} ModalToolbar

- **props**

  - \`title\`: \`string\`, not necessary, title of toolbar.
  - \`modalTitle\`: \`string\`, not necessary, title of the Modal.
  - \`visible\`: \`boolean\`, necessary, visibility of Modal.
  - \`width\`: \`string\`, not necessary, width of Modal, default \`auto\`.
  - \`height\`: \`string\`, same as \`width\`.
  - \`showAdjust\`: \`boolean\`, not necessary, visibility of fullscreen button.
  - \`isFullscreen\`: \`boolean\`, necessary when \`showAdjust = true\`, status of fullscreen.

- **events**

  - \`onClick\`: \`() => void\`, necessary.
  - \`onClose\`: \`() => void\`, necessary, close event.
  - \`onAdjust\`: \`(val: boolean) => void\`, fullscreen button click event.

- **slots**

  - \`trigger\`: \`string | JSX.Element\`, necessary, it is usually an icon, which is displayed on the toolbar.
  - \`overlay\`: \`string | JSX.Element\`, necessary, content of Modal.

\`\`\`vue
<template>
  <md-editor-v3 v-model="data.text">
    <template #defToolbars>
      <modal-toolbar
        :visible="data.modalVisible"
        :is-fullscreen="data.modalFullscreen"
        show-adjust
        title="Preview"
        modal-title="Page Preview"
        width="870px"
        height="600px"
        @onClick="data.modalVisible = true"
        @onClose="data.modalVisible = false"
        @onAdjust="data.modalFullscreen = !data.modalFullscreen"
      >
        <span>content</span>
        <template #trigger>
          <svg class="md-icon" aria-hidden="true">
            <use xlink:href="#icon-read"></use>
          </svg>
        </template>
      </modal-toolbar>
    </template>
  </md-editor-v3>
</template>

<script setup>
import { reactive } from 'vue';

const data = reactive({
  text: '',
  modalVisible: false,
  modalFullscreen: false
});
<\/script>
\`\`\`

[ReadExtension Source Code](https://github.com/imzbf/md-editor-v3/blob/docs/src/components/ReadExtension/index.vue)

### \u{1F43B} MdCatalog

\`Editor.MdCatalog\`

- **props**

  - \`editorId\`: \`string\`, necessary, editor's \`editorId\`, used to register listening events.
  - \`class\`: \`string\`, not necessary.
  - \`markedHeadingId\`: \`MarkedHeadingId\`, not necessary, same as editor.
  - \`scrollElement\`: \`string | HTMLElement\`, not necessary, it is an element selector when its type is string. When \`previewOnly\` eq \`true\`, it is usually set to \`document.documentElement\`.
  - \`theme\`: 'light' | 'dark', not necessary, provide it when you want to change theme online, it is the same as Editor \`theme\`.

usage:

\`\`\`vue
<template>
  <md-editor-v3
    v-model="state.text"
    :editorId="state.id"
    :theme="state.theme"
    preview-only
  />
  <md-atalog :editorId="state.id" :scrollElement="scrollElement" :theme="state.theme" />
</template>

<script setup>
import { reactive } from 'vue';

const state = reactive({
  theme: 'dark',
  text: 'heading',
  id: 'my-editor'
});

const scrollElement = document.documentElement;
<\/script>
\`\`\`

## \u270D\uFE0F Edit this page

[doc-en-US](https://github.com/imzbf/md-editor-v3/blob/dev-docs/public/doc-en-US.md)
`,l=`> \u5728\u7EBF\u5C1D\u8BD5\u793A\u4F8B\uFF1A[\u4F20\u9001\u95E8](https://codesandbox.io/s/epic-bird-2znqo)

## \u{1F92F} Props \u8BF4\u660E

\u8FD9\u662F\u7EC4\u4EF6\u6700\u91CD\u8981\u7684\u4E00\u90E8\u5206\u5185\u5BB9\uFF0C\`md-editor-v3\`\u7684\u5C5E\u6027\u53C2\u6570\u5982\u4E0B\uFF1A

### \u{1F4C3} modelValue

- **\u7C7B\u578B**\uFF1A\`string\`
- **\u9ED8\u8BA4\u503C**\uFF1A\`''\`
- **\u8BF4\u660E**\uFF1A\u7F16\u8F91\u7684\u5185\u5BB9\u3002

  \`\`\`html
  <md-editor-v3 v-model="xxx" />
  \`\`\`

### \u{1F6CD} theme

- **\u7C7B\u578B**\uFF1A\`'light' | 'dark'\`
- **\u9ED8\u8BA4\u503C**\uFF1A\`'light'\`
- **\u8BF4\u660E**\uFF1A\u7F16\u8F91\u5668\u4E3B\u9898\u3002

  \`\`\`html
  <md-ditor-v3 theme="dark" />
  \`\`\`

### \u{1F380} class

- **\u7C7B\u578B**\uFF1A\`string\`
- **\u9ED8\u8BA4\u503C**\uFF1A\`''\`
- **\u8BF4\u660E**\uFF1A\u7F16\u8F91\u5668\`class\`\u3002

### \u{1F90F}\u{1F3FC} historyLength

- **\u7C7B\u578B**\uFF1A\`number\`
- **\u9ED8\u8BA4\u503C**\uFF1A\`10\`
- **\u8BF4\u660E**\uFF1A\u6700\u5927\u8BB0\u5F55\u64CD\u4F5C\u6570\uFF08\u592A\u5927\u4F1A\u5360\u7528\u5185\u5B58\uFF09\u3002

### \u{1F4BB} pageFullScreen

- **\u7C7B\u578B**\uFF1A\`boolean\`
- **\u9ED8\u8BA4\u503C**\uFF1A\`false\`
- **\u8BF4\u660E**\uFF1A\u9875\u9762\u5185\u5168\u5C4F\u3002

### \u{1F4F1} preview

- **\u7C7B\u578B**\uFF1A\`boolean\`
- **\u9ED8\u8BA4\u503C**\uFF1A\`true\`
- **\u8BF4\u660E**\uFF1A\u662F\u5426\u663E\u793A\u9884\u89C8\u3002

### \u{1F4C0} htmlPreview

- **\u7C7B\u578B**\uFF1A\`boolean\`
- **\u9ED8\u8BA4\u503C**\uFF1A\`false\`
- **\u8BF4\u660E**\uFF1A\u662F\u5426\u663E\u793A html \u9884\u89C8\u3002

### \u{1F4FA} previewOnly

- **\u7C7B\u578B**\uFF1A\`boolean\`
- **\u9ED8\u8BA4\u503C**\uFF1A\`false\`
- **\u8BF4\u660E**\uFF1A\u4EC5\u9884\u89C8\u6A21\u5F0F\uFF0C\u4E0D\u663E\u793A bar \u548C\u7F16\u8F91\u6846\uFF0C\u4E0D\u652F\u6301\u54CD\u5E94\u5F0F\uFF0C\u4EC5\u80FD\u521D\u59CB\u8BBE\u7F6E\u4E00\u6B21\u3002

### \u{1F524} language

- **\u7C7B\u578B**\uFF1A\`string\`
- **\u9ED8\u8BA4\u503C**\uFF1A\`'zh-CN'\`
- **\u8BF4\u660E**\uFF1A\u5185\u7F6E\u4E2D\u82F1\u6587(\`'zh-CN'\`,\`'en-US'\`)\uFF0C\u53EF\u81EA\u884C\u6269\u5C55\u5176\u4ED6\u8BED\u8A00\uFF0C\u540C\u65F6\u53EF\u8986\u76D6\u5185\u7F6E\u7684\u4E2D\u82F1\u6587\u3002

### \u{1F9F1} toolbars

- **\u7C7B\u578B**\uFF1A\`Array\`
- **\u9ED8\u8BA4\u503C**\uFF1A\`[all]\`
- **\u8BF4\u660E**\uFF1A\u9009\u62E9\u6027\u5C55\u793A\u5DE5\u5177\u680F\uFF0C\u53EF\u9009\u5185\u5BB9\u89C1\u4E0B\u65B9\u3002

  \u4F60\u53EF\u4EE5\u968F\u610F\u6392\u5E8F\u5DE5\u5177\u680F\uFF0C\u901A\u8FC7\`'-'\`\u5206\u5272\u4E24\u4E2A\u5DE5\u5177\uFF0C\u901A\u8FC7\`'='\`\u5B9E\u73B0\u5DE6\u53F3\u653E\u7F6E\uFF01

  \u4ECE v1.10.0 \u5F00\u59CB\uFF0C\u4F60\u53EF\u4EE5\u81EA\u5B9A\u4E49\u5DE5\u5177\u680F\uFF0C\u5C06\`defToolbars\`\u4E2D\u81EA\u5B9A\u4E49\u5DE5\u5177\u9879\u7684\u4E0B\u6807\u7A7F\u63D2\u5728\`toolbars\`\u5B9E\u73B0\u5C55\u793A\uFF08\u8FD9\u5E76\u4E0D\u89C4\u8303\uFF09

  _[all]_

  \`\`\`js
  [
    'bold',
    'underline',
    'italic',
    '-',
    'strikeThrough',
    'sub',
    'sup',
    'quote',
    'unorderedList',
    'orderedList',
    '-',
    'codeRow',
    'code',
    'link',
    'image',
    'table',
    'mermaid',
    'katex',
    '-',
    'revoke',
    'next',
    'save',
    '=',
    'pageFullscreen',
    'fullscreen',
    'preview',
    'htmlPreview',
    'catalog',
    'github'
  ];
  \`\`\`

### \u{1F9F1} toolbarsExclude

- **\u7C7B\u578B**\uFF1A\`Array\`
- **\u9ED8\u8BA4\u503C**\uFF1A\`[]\`
- **\u8BF4\u660E**\uFF1A\u9009\u62E9\u6027\u4E0D\u5C55\u793A\u5DE5\u5177\u680F\uFF0C\u5185\u5BB9\u540C\u4E0A\u3002

### \u{1FA92} noPrettier

- **\u7C7B\u578B**\uFF1A\`boolean\`
- **\u9ED8\u8BA4\u503C**\uFF1A\`false\`
- **\u8BF4\u660E**\uFF1A\u662F\u5426\u542F\u7528 prettier \u4F18\u5316 md \u5185\u5BB9\u3002

### \u{1F3B2} editorId

- **\u7C7B\u578B**\uFF1A\`string\`
- **\u9ED8\u8BA4\u503C**\uFF1A\`'md-editor-v3'\`
- **\u8BF4\u660E**\uFF1A\u7F16\u8F91\u5668\u552F\u4E00\u6807\u8BC6\uFF0C\u975E\u5FC5\u987B\u9879\uFF0C\u670D\u52A1\u7AEF\u6E32\u67D3\u65F6\uFF0C\u9632\u6B62\u4EA7\u751F\u670D\u52A1\u7AEF\u4E0E\u5BA2\u6237\u7AEF\u6E32\u67D3\u5185\u5BB9\u4E0D\u4E00\u81F4\u9519\u8BEF\u63D0\u793A\uFF0C\u4EE5\u53CA\u5355\u9875\u9762\u591A\u7F16\u8F91\u5668\u65F6\u505A\u533A\u522B\u3002

### \u{1F90F} tabWidth

- **\u7C7B\u578B**\uFF1A\`number\`
- **\u9ED8\u8BA4\u503C**\uFF1A\`2\`
- **\u8BF4\u660E**\uFF1A\u7F16\u8F91\u5668\u4E00\u4E2A TAB \u952E\u7B49\u4E8E\u7A7A\u683C\u6570\u3002

### \u{1F522} showCodeRowNumber

- **\u7C7B\u578B**\uFF1A\`boolean\`
- **\u9ED8\u8BA4\u503C**\uFF1A\`false\`
- **\u8BF4\u660E**\uFF1A\u4EE3\u7801\u5757\u662F\u5426\u663E\u793A\u884C\u53F7\u3002

### \u{1F526} previewTheme

- **\u7C7B\u578B**\uFF1A\`'default' | 'github' | 'vuepress' | 'mk-cute' | 'smart-blue' | 'cyanosis'\`
- **\u9ED8\u8BA4\u503C**\uFF1A\`'default'\`
- **\u8BF4\u660E**\uFF1A\u9884\u89C8\u5185\u5BB9\u4E3B\u9898\uFF0C\u652F\u6301\u81EA\u5B9A\u4E49\u3002

  \u4E3B\u9898\u81EA\u5B9A\u4E49\u65B9\u5F0F\uFF1A

  1. \u7F16\u8F91 css

  \`\`\`css
  .xxx-theme {
    color: red;
  }
  \`\`\`

  2. \u8BBE\u7F6E\`previewTheme\`

  \`\`\`html
  <md-ditor-v3 preview-theme="xxx" />
  \`\`\`

  \u53C2\u8003[markdown-theme](https://github.com/imzbf/markdown-theme)\u9879\u76EE\u3002

### \u{1F385}\u{1F3FB} style

- **\u7C7B\u578B**\uFF1A\`string | CSSProperties\`
- **\u9ED8\u8BA4\u503C**\uFF1A\`''\`
- **\u8BF4\u660E**\uFF1A\u7F16\u8F91\u5668\u5185\u8054\u6837\u5F0F\u3002

### \u{1F4C5} tableShape

- **\u7C7B\u578B**\uFF1A\`[number, number]\`
- **\u9ED8\u8BA4\u503C**\uFF1A\`[6, 4]\`
- **\u8BF4\u660E**\uFF1A\u6807\u9898\u680F\u6DFB\u52A0\u8868\u683C\u65F6\uFF0C\u9884\u8BBE\u5F85\u9009\u8868\u683C\u5927\u5C0F\uFF0C\u7B2C\u4E00\u4E2A\u4EE3\u8868\u6700\u5927\u5217\u6570\uFF0C\u7B2C\u4E8C\u4E2A\u4EE3\u8868\u6700\u5927\u884C\u6570\u3002

  \`\`\`html
  <md-ditor-v3 :table-shape="[8, 4]" />
  \`\`\`

  ![\u8868\u683C\u9884\u8BBE\u5927\u5C0F\u9884\u89C8](https://imzbf.github.io/md-editor-v3/imgs/20211216165424.png)

### \u261D\uFE0F noMermaid

- **\u7C7B\u578B**\uFF1A\`boolean\`
- **\u9ED8\u8BA4\u503C**\uFF1A\`false\`
- **\u8BF4\u660E**\uFF1A\u5982\u679C\u4F60\u4E0D\u5E0C\u671B\u4F7F\u7528\u56FE\u8868\u5C55\u793A\u5185\u5BB9\uFF0C\u53EF\u4EE5\u8BBE\u7F6E\u5173\u95ED\u3002

  \`\`\`html
  <md-ditor-v3 no-mermaid />
  \`\`\`

### \u{1FAA7} placeholder

- **\u7C7B\u578B**\uFF1A\`string\`
- **\u9ED8\u8BA4\u503C**\uFF1A\`''\`
- **\u8BF4\u660E**\uFF1A\u554A\u8FD9-\\_-\uFF01

### \u261D\uFE0F noKatex

- **\u7C7B\u578B**\uFF1A\`boolean\`
- **\u9ED8\u8BA4\u503C**\uFF1A\`false\`
- **\u8BF4\u660E**\uFF1A\u5982\u679C\u4F60\u4E0D\u5E0C\u671B\u4F7F\u7528\u6570\u5B66\u516C\u5F0F\u5C55\u793A\u5185\u5BB9\uFF0C\u53EF\u4EE5\u8BBE\u7F6E\u5173\u95ED\u3002

  \`\`\`html
  <md-ditor-v3 no-katex />
  \`\`\`

### \u{1F989} codeTheme

- **\u7C7B\u578B**\uFF1A\`'atom'|'a11y'|'github'|'gradient'|'kimbie'|'paraiso'|'qtcreator'|'stackoverflow'\`
- **\u9ED8\u8BA4\u503C**\uFF1A\`'atom'\`
- **\u8BF4\u660E**\uFF1A\u4EE3\u7801\u5757\u9AD8\u4EAE\u6837\u5F0F\u540D\u79F0\u3002

  \u4F60\u53EF\u4EE5\u6DFB\u52A0\u81EA\u5DF1\u7684\u6837\u5F0F\uFF0C\u628A\u8BE5\u5C5E\u6027\u8BBE\u7F6E\u4E3A\u4F60\u60F3\u8981\u7684\u5373\u53EF\uFF0C\u65B9\u5F0F\u5982\u4E0B\uFF1A

  1. \u914D\u7F6E\u6837\u5F0F\u94FE\u63A5

  \`\`\`js
  import MdEditor from 'md-editor-v3';

  MdEditor.config({
    editorExtensions: {
      highlight: {
        css: {
          atom: {
            light:
              'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-light.min.css',
            dark: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-dark.min.css'
          },
          xxx: {
            light:
              'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/xxx-light.css',
            dark: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/xxx-dark.css'
          }
        }
      }
    }
  });
  \`\`\`

  2. \u8BBE\u7F6E\`codeTheme\`

  \`\`\`html
  <md-ditor-v3 code-theme="xxx" />
  \`\`\`

### \u{1F3B1} markedHeadingId

- **\u7C7B\u578B**\uFF1A\`(text: string, level: number, index: number) => string\`
- **\u9ED8\u8BA4\u503C**\uFF1A\`(text) => text\`
- **\u8BF4\u660E**\uFF1A\u6784\u9020\u6807\u9898\`ID\`\u7684\u751F\u6210\u65B9\u5F0F\uFF0C\u5728\u4F7F\u7528\`MdEditor.config\`\u5B9A\u4E49\u4E86\`renderer.heading\`\u540E\uFF0C\u907F\u514D\u76EE\u5F55\u5BFC\u822A\u7B49\u5931\u6548\u3002

  \`\`\`vue
  <template>
    <md-editor :marked-heading-id="generateId" />
  </template>

  <script setup>
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const generateId = (_text, _level, index) => \`heading-\${index}\`;
  <\/script>
  \`\`\`

### \u{1F423} sanitize

- **\u7C7B\u578B**\uFF1A\`(html: string) => string\`
- **\u9ED8\u8BA4\u503C**\uFF1A\`(html) => html\`
- **\u8BF4\u660E**\uFF1A\u5728\u6BCF\u6B21\u751F\u6210 html \u540E\uFF0C\u901A\u8FC7\u8BE5\u65B9\u6CD5\u79FB\u9664\u5371\u9669\u5185\u5BB9\uFF0C\u6BD4\u5982 xss \u76F8\u5173\uFF0C\u5F53\u4F60\u5F88\u786E\u5B9A\u4F60\u7684\u5185\u5BB9\u4E0D\u4F1A\u51FA\u73B0\u7C7B\u4F3C\u60C5\u51B5\u65F6\uFF0C\u4E0D\u5FC5\u8BBE\u7F6E\u5B83\u3002

  \u4F7F\u7528\`sanitize-html\`\u6F14\u793A

  \`\`\`vue
  <template>
    <md-editor :sanitize="sanitize" />
  </template>

  <script setup>
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';
  import sanitizeHtml from 'sanitize-html';

  const sanitize = (html) => sanitizeHtml(html);
  <\/script>
  \`\`\`

  > \u4E3A\u4EC0\u4E48\u4E0D\u5185\u7F6E\u5230\u7F16\u8F91\u5668\uFF1A\u7531\u4E8E\u7C7B\u4F3C\u7F16\u8F91\u5668\u5927\u591A\u5C5E\u4E8E\u81EA\u884C\u5904\u7406\u6587\u672C\uFF0C\u81EA\u8EAB\u5373\u53EF\u786E\u8BA4\u5185\u5BB9\u662F\u5426\u5B89\u5168\uFF0C\u5E76\u4E0D\u9700\u8981\u8BE5\u529F\u80FD\u3002

### \u{1F9B6} footers

- **\u7C7B\u578B**\uFF1A\`Array<'markdownTotal' \\| '=' \\| 'scrollSwitch' \\| number>\`
- **\u9ED8\u8BA4\u503C**\uFF1A\`['markdownTotal', '=', 'scrollSwitch']\`
- **\u8BF4\u660E**\uFF1A\u9875\u811A\u663E\u793A\u5185\u5BB9\uFF0C\`'='\`\u5DE6\u53F3\u5206\u5272\uFF0C\u8BBE\u7F6E\u4E3A\`[]\`\u4E0D\u663E\u793A\u9875\u811A\u3002

### \u{1F468}\u200D\u{1F466} scrollAuto

- **\u7C7B\u578B**\uFF1A\`boolean\`
- **\u9ED8\u8BA4\u503C**\uFF1A\`true\`
- **\u8BF4\u660E**\uFF1A\u9ED8\u8BA4\u5DE6\u53F3\u540C\u6B65\u6EDA\u52A8\u72B6\u6001

## \u{1F38D} \u63D2\u69FD

### \u{1FAB6} defToolbars

\u81EA\u5B9A\u4E49\u5DE5\u5177\u680F\u63D2\u69FD\uFF0C\u901A\u8FC7\u4F7F\u7528\u5185\u7F6E\u7684\`NormalToolbar\`\u666E\u901A\u70B9\u51FB\u89E6\u53D1\u4E8B\u4EF6\u7EC4\u4EF6\uFF0C\`DropdownToolbar\`\u4E0B\u62C9\u70B9\u51FB\u89E6\u53D1\u4E8B\u4EF6\u7EC4\u4EF6\u548C\`ModalToolbar\`\u5F39\u7A97\u89E6\u53D1\u4E8B\u4EF6\u7EC4\u4EF6\u8FDB\u884C\u6269\u5C55\u3002\u5C06\`defToolbars\`\u63D2\u69FD\u4E2D\u7684\u7EC4\u4EF6\u4E0B\u6807\u7A7F\u63D2\u5728\`toolbars\`\u5B9E\u73B0\u5C55\u793A\uFF08\u8FD9\u5E76\u4E0D\u89C4\u8303\uFF09\u3002

- Setup \u6A21\u677F

  \`\`\`vue
  <template>
    <md-editor :toolbars="toolbars">
      <template #defToolbars>
        <normal-toolbar title="mark" @onClick="handler">
          <template #trigger>
            <svg class="md-icon" aria-hidden="true">
              <use xlink:href="#icon-mark"></use>
            </svg>
          </template>
        </normal-toolbar>
      </template>
    </md-editor>
  </template>

  <script setup>
  import MdEditor from 'md-editor-v3';
  const NormalToolbar = MdEditor.NormalToolbar;

  const toolbars = ['bold', '-', 0, '=', 'github'];

  const handler = () => {
    console.log('NormalToolbar clicked!');
  };
  <\/script>
  \`\`\`

- Jsx \u6A21\u677F

  \`\`\`jsx
  import { defineComponent } from 'vue';
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  export default defineComponent({
    setup() {
      return () => (
        <MdEditor
          toolbars={['bold', '-', 0, '=', 'github']}
          defToolbars={
            <>
              <MdEditor.NormalToolbar
                trigger={
                  <svg class={\`md-icon\`} aria-hidden="true">
                    <use xlinkHref="#icon-strike-through" />
                  </svg>
                }
              ></MdEditor.NormalToolbar>
            </>
          }
        />
      );
    }
  });
  \`\`\`

![\u666E\u901A\u6269\u5C55\u5DE5\u5177\u680F](https://imzbf.github.io/md-editor-v3/imgs/normal-toolbar.gif)

![\u4E0B\u62C9\u6269\u5C55\u5DE5\u5177\u680F](https://imzbf.github.io/md-editor-v3/imgs/dropdown-toolbar.gif)

\u6269\u5C55\u7EC4\u4EF6\u5C5E\u6027\u53C2\u8003**\u5185\u7F6E\u7EC4\u4EF6**\uFF0C\u4F7F\u7528\u793A\u4F8B\u53C2\u89C1[\u6587\u6863\u5206\u652F](https://github.com/imzbf/md-editor-v3/tree/docs/src/components)\uFF0C\u63D0\u4F9B**\u6807\u8BB0**\u3001**\u8868\u60C5**\u548C**\u5F39\u7A97\u9884\u89C8**\u6269\u5C55\u7EC4\u4EF6\u3002

### \u{1F9BF} defFooters

\u81EA\u5B9A\u4E49\u6269\u5C55\u9875\u811A

- Setup \u6A21\u677F

  \`\`\`vue
  <template>
    <md-editor :footers="footers">
      <template #defFooters>
        <span>\uFFE5_\uFFE5</span>
        <span>^_^</span>
      </template>
    </md-editor>
  </template>

  <script setup>
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  // \u5C06\u63D2\u69FD\u4E2D\u7684\u7EC4\u4EF6\u4E0B\u6807\u653E\u5230\u5BF9\u5E94\u7684\u4F4D\u7F6E\u5373\u53EF\u663E\u793A
  const footers = ['markdownTotal', 0, '=', 1, 'scrollSwitch'];
  <\/script>
  \`\`\`

- Jsx \u6A21\u677F

  \`\`\`jsx
  import { defineComponent } from 'vue';
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  export default defineComponent({
    setup() {
      return () => (
        <MdEditor
          footers={['markdownTotal', 0, '=', 1, 'scrollSwitch']}
          defFooters={
            <>
              <span>\uFFE5_\uFFE5</span>
              <span>^_^</span>
            </>
          }
        />
      );
    }
  });
  \`\`\`

![](https://imzbf.github.io/md-editor-v3/imgs/footer.png)

## \u{1FAA2} \u7ED1\u5B9A\u4E8B\u4EF6

\u76EE\u524D\u652F\u6301\u7684\u5185\u5BB9\u5982\u4E0B\uFF1A

### \u{1F4DE} onChange

- **\u7C7B\u578B**\uFF1A\`(v: string) => void\`
- **\u8BF4\u660E**\uFF1A\u5185\u5BB9\u53D8\u5316\u4E8B\u4EF6\uFF08\u5F53\u524D\u4E0E\`textarea\`\u7684\`oninput\`\u4E8B\u4EF6\u7ED1\u5B9A\uFF0C\u6BCF\u8F93\u5165\u4E00\u4E2A\u5355\u5B57\u5373\u4F1A\u89E6\u53D1\uFF09\u3002

### \u{1F4BE} onSave

- **\u7C7B\u578B**\uFF1A\`(v: string) => void\`
- **\u8BF4\u660E**\uFF1A\u4FDD\u5B58\u4E8B\u4EF6\uFF0C\u5FEB\u6377\u952E\u4E0E\u4FDD\u5B58\u6309\u94AE\u5747\u4F1A\u89E6\u53D1\u3002

### \u{1F4F8} onUploadImg

- **\u7C7B\u578B**\uFF1A\`(files: Array<File>, callback: (urls: Array<string>) => void) => void\`
- **\u8BF4\u660E**\uFF1A\u4E0A\u4F20\u56FE\u7247\u4E8B\u4EF6\uFF0C\u5F39\u7A97\u4F1A\u7B49\u5F85\u4E0A\u4F20\u7ED3\u679C\uFF0C\u52A1\u5FC5\u5C06\u4E0A\u4F20\u540E\u7684 urls \u4F5C\u4E3A callback \u5165\u53C2\u56DE\u4F20\u3002

  \`\`\`js
  const onUploadImg = async (files, callback) => {
    const res = await Promise.all(
      files.map((file) => {
        return new Promise((rev, rej) => {
          const form = new FormData();
          form.append('file', file);

          axios
            .post('/api/img/upload', form, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then((res) => rev(res))
            .catch((error) => rej(error));
        });
      })
    );

    callback(res.map((item) => item.data.url));
  };
  \`\`\`

  \`\`\`html
  <md-ditor-v3 @onUploadImg="onUploadImg" />
  \`\`\`

### \u{1F4E8} onHtmlChanged

- **\u7C7B\u578B**\uFF1A\`(h: string) => void\`
- **\u8BF4\u660E**\uFF1Ahtml \u53D8\u5316\u56DE\u8C03\u4E8B\u4EF6\uFF0C\u7528\u4E8E\u83B7\u53D6\u9884\u89C8 html \u4EE3\u7801\u3002

### \u{1F5D2} onGetCatalog

- **\u7C7B\u578B**\uFF1A\`(list: HeadList[]) => void\`
- **\u8BF4\u660E**\uFF1A\u52A8\u6001\u83B7\u53D6\`markdown\`\u76EE\u5F55\u3002

### \u{1F480} onError

- **\u7C7B\u578B**\uFF1A\`(err: { name: string; message: string;}) => void\`
- **\u8BF4\u660E**\uFF1A\u6355\u83B7\u6267\u884C\u9519\u8BEF\u4E8B\u4EF6\uFF0C\u76EE\u524D\u652F\u6301\`Cropper\`\u3001\`fullScreen\`\u3001\`prettier\`\u5B9E\u4F8B\u672A\u52A0\u8F7D\u5B8C\u6210\u64CD\u4F5C\u9519\u8BEF\u3002

  \`\`\`js
  const onError = (err) => {
    alert(err.message);
  };
  \`\`\`

  \`\`\`html
  <md-ditor-v3 @onError="onError" />
  \`\`\`

## \u{1F4B4} \u914D\u7F6E\u7F16\u8F91\u5668

\u4F7F\u7528\`MdEditor.config(option: ConfigOption)\`\u65B9\u6CD5\uFF0C\u53EF\u4EE5\u5BF9\u5185\u90E8\u7684\`renderer\`\u5B9A\u5236\u3002

- markedRenderer: \`(renderer: Renderer) => Renderer\`\uFF0C\u8BBE\u7F6E\u94FE\u63A5\u5728\u65B0\u7A97\u53E3\u6253\u5F00 \u{1F330}\uFF1A

  \`\`\`js
  import MdEditor from 'md-editor-v3';

  MdEditor.config({
    markedRenderer(renderer) {
      renderer.link = (href, title, text) => {
        return \`<a href="\${href}" title="\${title}" target="_blank">\${text}</a>\`;
      };

      return renderer;
    }
  });
  \`\`\`

  > \u53C2\u8003\uFF1Ahttps://marked.js.org/using_pro#renderer

- markedExtensions: \`Array<marked.TokenizerExtension & marked.RendererExtension>\`

  \`\`\`js
  import MdEditor from 'md-editor-v3';

  MdEditor.config({
    markedExtensions: [your extension]
  });
  \`\`\`

  > \u53C2\u8003\uFF1Ahttps://marked.js.org/using_pro#extensions

  [\u6587\u6863\u793A\u4F8B\u6E90\u7801](https://github.com/imzbf/md-editor-v3/blob/docs/src/main.ts)

- markedOptions: \`marked.MarkedOptions\`\uFF0C\u8BBE\u7F6E\u8F93\u5165\u7A7A\u767D\u884C\u4E0D\u6E32\u67D3\u51FA\u6765 \u{1F330}\uFF1A

  \`\`\`js
  import MdEditor from 'md-editor-v3';

  MdEditor.config({
    markedOptions: { breaks: false }
  });
  \`\`\`

  > \u53C2\u8003\uFF1Ahttps://marked.js.org/using_advanced#options

- editorConfig: \u7F16\u8F91\u5668\u5E38\u89C4\u914D\u7F6E\uFF0C\u8BED\u8A00\u3001\`mermaid\`\u9ED8\u8BA4\u6A21\u677F\u3001\u6E32\u67D3\u5EF6\u8FDF\uFF1A

  \`\`\`js
  import MdEditor from 'md-editor-v3';

  MdEditor.config({
    editorConfig: {
      // \u8BED\u8A00
      languageUserDefined: {
        'zh-CN': {
          toolbarTips: {
            bold: '\u52A0\u7C97',
            underline: '\u4E0B\u5212\u7EBF',
            italic: '\u659C\u4F53',
            strikeThrough: '\u5220\u9664\u7EBF',
            title: '\u6807\u9898',
            sub: '\u4E0B\u6807',
            sup: '\u4E0A\u6807',
            quote: '\u5F15\u7528',
            unorderedList: '\u65E0\u5E8F\u5217\u8868',
            orderedList: '\u6709\u5E8F\u5217\u8868',
            codeRow: '\u884C\u5185\u4EE3\u7801',
            code: '\u5757\u7EA7\u4EE3\u7801',
            link: '\u94FE\u63A5',
            image: '\u56FE\u7247',
            table: '\u8868\u683C',
            mermaid: 'mermaid\u56FE',
            katex: 'katex\u516C\u5F0F',
            revoke: '\u540E\u9000',
            next: '\u524D\u8FDB',
            save: '\u4FDD\u5B58',
            prettier: '\u7F8E\u5316',
            pageFullscreen: '\u6D4F\u89C8\u5668\u5168\u5C4F',
            fullscreen: '\u5C4F\u5E55\u5168\u5C4F',
            preview: '\u9884\u89C8',
            htmlPreview: 'html\u4EE3\u7801\u9884\u89C8',
            catalog: '\u76EE\u5F55',
            github: '\u6E90\u7801\u5730\u5740'
          },
          titleItem: {
            h1: '\u4E00\u7EA7\u6807\u9898',
            h2: '\u4E8C\u7EA7\u6807\u9898',
            h3: '\u4E09\u7EA7\u6807\u9898',
            h4: '\u56DB\u7EA7\u6807\u9898',
            h5: '\u4E94\u7EA7\u6807\u9898',
            h6: '\u516D\u7EA7\u6807\u9898'
          },
          imgTitleItem: {
            link: '\u6DFB\u52A0\u94FE\u63A5',
            upload: '\u4E0A\u4F20\u56FE\u7247',
            clip2upload: '\u88C1\u526A\u4E0A\u4F20'
          },
          linkModalTips: {
            title: '\u6DFB\u52A0',
            descLable: '\u94FE\u63A5\u63CF\u8FF0\uFF1A',
            descLablePlaceHolder: '\u8BF7\u8F93\u5165\u63CF\u8FF0...',
            urlLable: '\u94FE\u63A5\u5730\u5740\uFF1A',
            UrlLablePlaceHolder: '\u8BF7\u8F93\u5165\u94FE\u63A5...',
            buttonOK: '\u786E\u5B9A'
          },
          clipModalTips: {
            title: '\u88C1\u526A\u56FE\u7247\u4E0A\u4F20',
            buttonUpload: '\u4E0A\u4F20'
          },
          copyCode: {
            text: '\u590D\u5236\u4EE3\u7801',
            successTips: '\u5DF2\u590D\u5236\uFF01',
            failTips: '\u590D\u5236\u5931\u8D25\uFF01'
          },
          mermaid: {
            flow: '\u6D41\u7A0B\u56FE',
            sequence: '\u65F6\u5E8F\u56FE',
            gantt: '\u7518\u7279\u56FE',
            class: '\u7C7B\u56FE',
            state: '\u72B6\u6001\u56FE',
            pie: '\u997C\u56FE',
            relationship: '\u5173\u7CFB\u56FE',
            journey: '\u65C5\u7A0B\u56FE'
          },
          katex: {
            inline: '\u884C\u5185\u516C\u5F0F',
            block: '\u5757\u7EA7\u516C\u5F0F'
          },
          footer: {
            markdownTotal: '\u5B57\u6570',
            scrollAuto: '\u540C\u6B65\u6EDA\u52A8'
          }
        },
        // mermaid\u6A21\u677F
        mermaidTemplate: {
          // \u6D41\u7A0B\u56FE
          flow: \`flow tempalte\`,
          // \u65F6\u5E8F\u56FE
          sequence: \`sequence template\`,
          // \u7518\u7279\u56FE
          gantt: \`gantt template\`,
          // \u7C7B\u56FE
          class: \`class template\`,
          // \u72B6\u6001\u56FE
          state: \`state template\`,
          // \u997C\u56FE
          pie: \`pie template\`,
          // \u5173\u7CFB\u56FE
          relationship: \`relationship template\`,
          // \u65C5\u7A0B\u56FE
          journey: \`journey template\`
        },
        // \u8F93\u5165\u6E32\u67D3\u5EF6\u8FDF\uFF08ms\uFF09
        renderDelay: 0
      }
    }
  });
  \`\`\`

- editorExtensions: \u7C7B\u578B\u5982\u4E0B\uFF0C\u7528\u4E8E\u914D\u7F6E\u7F16\u8F91\u5668\u5185\u90E8\u7684\u6269\u5C55

  \`\`\`typescript
  import MdEditor from 'md-editor-v3';

  MdEditor.config({
    editorExtensions: { iconfont: 'https://xxx.cc' }
  });
  \`\`\`

  <details>
    <summary>[EditorExtensions]</summary>

  \`\`\`ts
  import MdEditor from 'md-editor-v3';

  interface EditorExtensions {
    highlight?: {
      instance?: any;
      js?: string;
      css?: {
        [key: string]: {
          light: string;
          dark: string;
        };
      };
    };
    prettier?: {
      standaloneJs?: string;
      parserMarkdownJs?: string;
    };
    cropper?: {
      instance?: any;
      js?: string;
      css?: string;
    };
    iconfont?: string;
    screenfull?: {
      instance?: any;
      js?: string;
    };
    mermaid?: {
      instance?: any;
      js?: string;
    };
    katex?: {
      instance?: any;
      js?: string;
      css?: string;
    };
  }
  \`\`\`

  </details>

## \u{1FAA1} \u5FEB\u6377\u952E

\u4E3B\u8981\u4EE5\`CTRL\`\u642D\u914D\u5BF9\u5E94\u529F\u80FD\u82F1\u6587\u5355\u8BCD\u9996\u5B57\u6BCD\uFF0C\u51B2\u7A81\u9879\u6DFB\u52A0\`SHIFT\`\uFF0C\u518D\u51B2\u7A81\u66FF\u6362\u4E3A\`ALT\`\u3002

| \u952E\u4F4D | \u529F\u80FD | \u8BF4\u660E |
| --- | --- | --- |
| TAB | \u7A7A\u683C | \u901A\u8FC7\`tabWidth\`\u5C5E\u6027\u9884\u8BBE TAB \u952E\u4F4D\u65B0\u589E\u7A7A\u683C\u957F\u5EA6\uFF0C\u9ED8\u8BA4 2\uFF0C\u652F\u6301\u591A\u884C |
| SHIFT + TAB | \u53D6\u6D88\u7A7A\u683C | \u540C\u4E0A\uFF0C\u4E00\u6B21\u53D6\u6D88\u4E24\u4E2A\u7A7A\u683C\uFF0C\u652F\u6301\u591A\u884C |
| CTRL + C | \u590D\u5236 | \u9009\u4E2D\u65F6\u590D\u5236\u9009\u4E2D\u5185\u5BB9\uFF0C\u672A\u9009\u4E2D\u65F6\u590D\u5236\u5F53\u524D\u884C\u5185\u5BB9 |
| CTRL + X | \u526A\u5207 | \u9009\u4E2D\u65F6\u526A\u5207\u9009\u4E2D\u5185\u5BB9\uFF0C\u672A\u9009\u4E2D\u65F6\u526A\u5207\u5F53\u524D\u884C |
| CTRL + D | \u5220\u9664 | \u9009\u4E2D\u65F6\u5220\u9664\u9009\u4E2D\u5185\u5BB9\uFF0C\u672A\u9009\u4E2D\u65F6\u5220\u9664\u5F53\u524D\u884C |
| CTRL + S | \u4FDD\u5B58 | \u89E6\u53D1\u7F16\u8F91\u5668\u7684\`onSave\`\u56DE\u8C03 |
| CTRL + B | \u52A0\u7C97 | \`**\u52A0\u7C97**\` |
| CTRL + U | \u4E0B\u5212\u7EBF | \`<u>\u4E0B\u5212\u7EBF</u>\` |
| CTRL + I | \u659C\u4F53 | \`*\u659C\u4F53*\` |
| CTRL + 1-6 | 1-6 \u7EA7\u6807\u9898 | \`# \u6807\u9898\` |
| CTRL + \u2191 | \u4E0A\u89D2\u6807 | \`<sup>\u4E0A\u89D2\u6807</sup>\` |
| CTRL + \u2193 | \u4E0B\u89D2\u6807 | \`<sub>\u4E0B\u89D2\u6807</sub>\` |
| CTRL + Q | \u5F15\u7528 | \`> \u5F15\u7528\` |
| CTRL + O | \u6709\u5E8F\u5217\u8868 | \`1. \u6709\u5E8F\u5217\u8868\` |
| CTRL + L | \u94FE\u63A5 | \`[\u94FE\u63A5](https://imzbf.cc)\` |
| CTRL + Z | \u64A4\u56DE | \u89E6\u53D1\u7F16\u8F91\u5668\u5185\u5185\u5BB9\u64A4\u56DE\uFF0C\u4E0E\u7CFB\u7EDF\u65E0\u5173 |
| CTRL + SHIFT + S | \u5220\u9664\u7EBF | \`~\u5220\u9664\u7EBF~\` |
| CTRL + SHIFT + U | \u65E0\u5E8F\u5217\u8868 | \`- \u65E0\u5E8F\u5217\u8868\` |
| CTRL + SHIFT + C | \u5757\u7EA7\u4EE3\u7801 | \u591A\u884C\u4EE3\u7801\u5757 |
| CTRL + SHIFT + I | \u56FE\u7247\u94FE\u63A5 | \`![\u56FE\u7247](https://imzbf.cc)\` |
| CTRL + SHIFT + Z | \u524D\u8FDB\u4E00\u6B65 | \u89E6\u53D1\u7F16\u8F91\u5668\u5185\u5185\u5BB9\u524D\u8FDB\uFF0C\u4E0E\u7CFB\u7EDF\u65E0\u5173 |
| CTRL + SHIFT + F | \u7F8E\u5316\u5185\u5BB9 |  |
| CTRL + ALT + C | \u884C\u5185\u4EE3\u7801 | \u884C\u5185\u4EE3\u7801\u5757 |
| CTRL + SHIFT + ALT + T | \u8868\u683C | \`\\|\u8868\u683C\\|\` |

## \u{1FAA4} \u5185\u7F6E\u7EC4\u4EF6

\u6269\u5C55\u7EC4\u4EF6\u4F5C\u4E3A\u7F16\u8F91\u5668\u7EC4\u4EF6\u7684\u5C5E\u6027\u503C\u6765\u4F7F\u7528\uFF0C\u4F8B\u5982\uFF1A\`MdEditor.DropdownToolbar\`\u3002

### \u{1F423} NormalToolbar

- **props**

  - \`title\`: \`string\`\uFF0C\u975E\u5FC5\u987B\uFF0C\u4F5C\u4E3A\u5DE5\u5177\u680F\u4E0A\u7684 hover \u63D0\u793A\u3002

- **events**

  - \`onClick\`: \`(e: MouseEvent) => void\`\uFF0C\u5FC5\u987B\uFF0C\u70B9\u51FB\u4E8B\u4EF6\u3002

- **slots**

  - \`trigger\`: \`string | JSX.Element\`\uFF0C\u5FC5\u987B\uFF0C\u901A\u5E38\u662F\u4E2A\u56FE\u6807\uFF0C\u7528\u6765\u5C55\u793A\u5728\u5DE5\u5177\u680F\u4E0A\u3002

\`\`\`vue
<template>
  <md-editor-v3 v-model="text">
    <template #defToolbars>
      <normal-toolbar title="mark" @onClick="callback">
        <template #trigger>
          <svg class="md-icon" aria-hidden="true">
            <use xlink:href="#icon-mark"></use>
          </svg>
        </template>
      </normal-toolbar>
    </template>
  </md-editor-v3>
</template>
\`\`\`

[\u83B7\u53D6\u4F7F\u7528\u6E90\u7801](https://github.com/imzbf/md-editor-v3/blob/docs/src/components/MarkExtension/index.vue)

### \u{1F43C} DropdownToolbar

- **props**

  - \`title\`: \`string\`\uFF0C\u975E\u5FC5\u987B\uFF0C\u4F5C\u4E3A\u5DE5\u5177\u680F\u4E0A\u7684 hover \u63D0\u793A\u3002
  - \`visible\`: \`boolean\`\uFF0C\u5FC5\u987B\uFF0C\u4E0B\u62C9\u72B6\u6001\u3002

- **events**

  - \`onChange\`: \`(visible: boolean) => void\`\uFF0C\u5FC5\u987B\uFF0C\u72B6\u6001\u53D8\u5316\u4E8B\u4EF6\u3002

- **slots**

  - \`trigger\`: \`string | JSX.Element\`\uFF0C\u5FC5\u987B\uFF0C\u901A\u5E38\u662F\u4E2A\u56FE\u6807\uFF0C\u7528\u6765\u5C55\u793A\u5728\u5DE5\u5177\u680F\u4E0A\u3002
  - \`overlay\`: \`string | JSX.Element\`\uFF0C\u5FC5\u987B\uFF0C\u4E0B\u62C9\u6846\u4E2D\u7684\u5185\u5BB9\u3002

\`\`\`vue
<template>
  <md-editor-v3 v-model="text">
    <template #defToolbars>
      <dropdown-toolbar
        title="emoji"
        :visible="data.emojiVisible"
        :onChange="emojiVisibleChanged"
      >
        <template #overlay>
          <div class="emoji-container">
            <ol class="emojis">
              <li
                v-for="(emoji, index) of emojis"
                :key="\`emoji-\${index}\`"
                @click="emojiHandler(emoji)"
                v-text="emoji"
              ></li>
            </ol>
          </div>
        </template>
        <template #trigger>
          <svg class="md-icon" aria-hidden="true">
            <use xlink:href="#icon-emoji"></use>
          </svg>
        </template>
      </dropdown-toolbar>
    </template>
  </md-editor-v3>
</template>
\`\`\`

[\u83B7\u53D6\u4F7F\u7528\u6E90\u7801](https://github.com/imzbf/md-editor-v3/blob/docs/src/components/EmojiExtension/index.vue)

### \u{1F989} ModalToolbar

- **props**

  - \`title\`: \`string\`\uFF0C\u975E\u5FC5\u987B\uFF0C\u4F5C\u4E3A\u5DE5\u5177\u680F\u4E0A\u7684 hover \u63D0\u793A\u3002
  - \`modalTitle\`: \`string\`\uFF0C\u975E\u5FC5\u987B\uFF0C\u5F39\u7A97\u7684\u6807\u9898\u3002
  - \`visible\`: \`boolean\`\uFF0C\u5FC5\u987B\uFF0C\u5F39\u7A97\u663E\u793A\u72B6\u6001\u3002
  - \`width\`: \`string\`\uFF0C\u975E\u5FC5\u987B\uFF0C\u5F39\u7A97\u5BBD\u5EA6\uFF0C\u9ED8\u8BA4\`auto\`\u3002
  - \`height\`\uFF1A\`string\`\uFF0C\u540C\`width\`\u3002
  - \`showAdjust\`: \`boolean\`\uFF0C\u975E\u5FC5\u987B\uFF0C\u662F\u5426\u663E\u793A\u5F39\u7A97\u5168\u5C4F\u6309\u94AE\u3002
  - \`isFullscreen\`: \`boolean\`\uFF0C\u663E\u793A\u5168\u5C4F\u6309\u94AE\u65F6\u5FC5\u987B\uFF0C\u5F39\u7A97\u5168\u5C4F\u72B6\u6001\u3002

- **events**

  - \`onClick\`: \`() => void\`\uFF0C\u5FC5\u987B\uFF0C\u5DE5\u5177\u680F\u70B9\u51FB\u4E8B\u4EF6\u3002
  - \`onClose\`\uFF1A\`() => void\`\uFF0C\u5FC5\u987B\uFF0C\u5F39\u7A97\u70B9\u51FB\u5173\u95ED\u4E8B\u4EF6\u3002
  - \`onAdjust\`\uFF1A\`(val: boolean) => void\`\uFF0C\u5F39\u7A97\u5168\u5C4F\u6309\u94AE\u70B9\u51FB\u4E8B\u4EF6\u3002

- **slots**

  - \`trigger\`: \`string | JSX.Element\`\uFF0C\u5FC5\u987B\uFF0C\u901A\u5E38\u662F\u4E2A\u56FE\u6807\uFF0C\u7528\u6765\u5C55\u793A\u5728\u5DE5\u5177\u680F\u4E0A\u3002
  - \`overlay\`: \`string | JSX.Element\`\uFF0C\u5FC5\u987B\uFF0C\u4E0B\u62C9\u6846\u4E2D\u7684\u5185\u5BB9\u3002

\`\`\`vue
<template>
  <md-editor-v3 v-model="data.text">
    <template #defToolbars>
      <modal-toolbar
        :visible="data.modalVisible"
        :is-fullscreen="data.modalFullscreen"
        show-adjust
        title="\u5E2E\u52A9"
        modal-title="\u7F16\u8F91\u9884\u89C8"
        width="870px"
        height="600px"
        @onClick="data.modalVisible = true"
        @onClose="data.modalVisible = false"
        @onAdjust="data.modalFullscreen = !data.modalFullscreen"
      >
        <span>\u5185\u5BB9</span>
        <template #trigger>
          <svg class="md-icon" aria-hidden="true">
            <use xlink:href="#icon-read"></use>
          </svg>
        </template>
      </modal-toolbar>
    </template>
  </md-editor-v3>
</template>

<script setup>
import { reactive } from 'vue';

const data = reactive({
  text: '',
  modalVisible: false,
  modalFullscreen: false
});
<\/script>
\`\`\`

[\u83B7\u53D6\u4F7F\u7528\u6E90\u7801](https://github.com/imzbf/md-editor-v3/blob/docs/src/components/ReadExtension/index.vue)

### \u{1F43B} MdCatalog

\`Editor.MdCatalog\`

- **props**

  - \`editorId\`: \`string\`\uFF0C\u5FC5\u987B\uFF0C\u5BF9\u5E94\u7F16\u8F91\u5668\u7684\`editorId\`\uFF0C\u5728\u5185\u90E8\u6CE8\u518C\u76EE\u5F55\u53D8\u5316\u76D1\u542C\u4E8B\u4EF6\u3002
  - \`class\`: \`string\`\uFF0C\u975E\u5FC5\u987B\uFF0C\u76EE\u5F55\u7EC4\u4EF6\u6700\u5916\u5C42\u7C7B\u540D\u3002
  - \`markedHeadingId\`: \`MarkedHeadingId\`\uFF0C\u975E\u5FC5\u987B\uFF0C\u7279\u6B8A\u5316\u7F16\u8F91\u5668\u6807\u9898\u7684\u7B97\u6CD5\uFF0C\u4E0E\u7F16\u8F91\u5668\u76F8\u540C\u3002
  - \`scrollElement\`: \`string | HTMLElement\`\uFF0C\u975E\u5FC5\u987B\uFF0C\u4E3A\u5B57\u7B26\u65F6\u5E94\u662F\u4E00\u4E2A\u5143\u7D20\u9009\u62E9\u5668\u3002\u4EC5\u9884\u89C8\u6A21\u5F0F\u4E2D\uFF0C\u6574\u9875\u6EDA\u52A8\u65F6\uFF0C\u8BBE\u7F6E\u4E3A\`document.documentElement\`\u3002
  - \`theme\`: \`'light' | 'dark'\`\uFF0C\u975E\u5FC5\u987B\uFF0C\u5F53\u9700\u8981\u5207\u6362\u4E3B\u9898\u65F6\u63D0\u4F9B\uFF0C\u540C\u7F16\u8F91\u5668\u7684\`theme\`\u3002

> \`scrollElement\`\u8BF4\u660E\uFF1A\u4EC5\u9884\u89C8\u4E0B\uFF0C\u8BE5\u5143\u7D20\u5FC5\u987B\u5DF2\u5B9A\u4F4D\u7684\u5E76\u4E14\u652F\u6301\u6EDA\u52A8\u3002

\`\`\`vue
<template>
  <md-editor-v3
    v-model="state.text"
    :editorId="state.id"
    :theme="state.theme"
    preview-only
  />
  <md-atalog :editorId="state.id" :scrollElement="scrollElement" :theme="state.theme" />
</template>

<script setup>
import { reactive } from 'vue';

const state = reactive({
  theme: 'dark',
  text: '\u6807\u9898',
  id: 'my-editor'
});

const scrollElement = document.documentElement;
<\/script>
\`\`\`

## \u270D\uFE0F \u7F16\u8F91\u6B64\u9875\u9762

[doc-zh-CN](https://github.com/imzbf/md-editor-v3/blob/dev-docs/public/doc-zh-CN.md)
`;const f={class:"container"},x={class:"doc"},k={class:"content"},y={class:"catalog"},T={class:"affix"},M={setup(w){const n=h(),o=u(r(n.state.lang==="en-US"?a:l)),d=()=>{o.value=r(n.state.lang==="en-US"?a:l)},m=document.documentElement;return g(()=>n.state.lang,d),(E,C)=>{const c=s("md-editor-v3"),p=s("md-catalog");return v(),b("div",f,[t("div",x,[t("div",k,[i(c,{"editor-id":"doc-preview",theme:e(n).state.theme,language:e(n).state.lang,"model-value":o.value,"preview-theme":e(n).state.previewTheme,"code-theme":e(n).state.codeTheme,"preview-only":"","show-code-row-number":""},null,8,["theme","language","model-value","preview-theme","code-theme"])]),t("div",y,[t("div",T,[i(p,{"editor-id":"doc-preview",theme:e(n).state.theme,"scroll-element":e(m)},null,8,["theme","scroll-element"])])])])])}}};export{M as default};
