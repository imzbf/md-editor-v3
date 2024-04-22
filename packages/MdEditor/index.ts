import { App } from 'vue';

import Editor from './Editor';
import NormalToolbar from '~~/NormalToolbar';
import DropdownToolbar from '~~/DropdownToolbar';
import MdCatalog from '~~/MdCatalog';
import ModalToolbar from '~~/ModalToolbar';
import MdPreview from '~~/MdPreview';

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
