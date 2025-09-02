import { App } from 'vue';

import DropdownToolbar from '~~/DropdownToolbar';
import MdCatalog from '~~/MdCatalog';
import MdPreview from '~~/MdPreview';
import ModalToolbar from '~~/ModalToolbar';
import NormalToolbar from '~~/NormalToolbar';
import Editor from './Editor';

Editor.install = (app: App) => {
  app.component(Editor.name as string, Editor);

  app
    .use(NormalToolbar)
    .use(DropdownToolbar)
    .use(ModalToolbar)
    .use(MdCatalog)
    .use(MdPreview);

  return app;
};

export default Editor as typeof Editor & {
  install: (app: App) => App;
};
