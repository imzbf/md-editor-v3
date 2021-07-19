import { App } from 'vue';

import Editor from './Editor';

Editor.install = (app: App) => {
  app.component(Editor.name, Editor);

  return app;
};

export default Editor;
