import { App } from 'vue';

import Editor from './Editor';

Editor.install = (app: App) => {
  app.component(Editor.name);

  return app;
};

export default Editor;
