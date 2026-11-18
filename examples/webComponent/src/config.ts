import Cropper from 'cropperjs';
import * as echarts from 'echarts';
import highlight from 'highlight.js';
import katex from 'katex';
import { config } from 'md-editor-v3';
import mermaid from 'mermaid';
import parserMarkdown from 'prettier/plugins/markdown';
import * as prettier from 'prettier/standalone';
import screenfull from 'screenfull';

// Configure shared dependencies once, before any editor mounts.
config({
  editorExtensions: {
    prettier: {
      prettierInstance: prettier,
      parserMarkdownInstance: parserMarkdown
    },
    highlight: { instance: highlight },
    screenfull: { instance: screenfull },
    katex: { instance: katex },
    cropper: { instance: Cropper },
    mermaid: { instance: mermaid },
    echarts: { instance: echarts }
  }
});
