import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return () => (
      <header class="header">
        <section class="container">
          <h1>md-editor-v3</h1>
          <p>
            Markdown编辑器，基于vue3，使用jsx和typescript语法开发，支持切换主题、prettier美化文本等。
          </p>
        </section>
      </header>
    );
  }
});
