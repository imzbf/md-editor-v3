import { App } from 'vue';

import Editor from './Editor';
import NormalToolbar from './extensions/NormalToolbar';
import DropdownToolbar from './extensions/DropdownToolbar';
import MdCatalog from './extensions/MdCatalog';
import ModalToolbar from './extensions/ModalToolbar';

import { config } from './config';

Editor.install = (app: App) => {
  app.component(Editor.name, Editor);
  app.component(NormalToolbar.name, NormalToolbar);
  app.component(DropdownToolbar.name, DropdownToolbar);
  app.component(MdCatalog.name, MdCatalog);
  app.component(ModalToolbar.name, ModalToolbar);

  return app;
};

Editor.NormalToolbar = NormalToolbar;
Editor.DropdownToolbar = DropdownToolbar;
Editor.MdCatalog = MdCatalog;
Editor.ModalToolbar = ModalToolbar;
Editor.config = config;

export default Editor as typeof Editor & {
  readonly NormalToolbar: typeof NormalToolbar;
  readonly DropdownToolbar: typeof DropdownToolbar;
  readonly MdCatalog: typeof MdCatalog;
  readonly ModalToolbar: typeof ModalToolbar;
  readonly config: typeof config;
  install: (app: App) => App;
};

export * from './type';
