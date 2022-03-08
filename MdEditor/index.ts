import { App } from 'vue';

import Editor from './Editor';
import NormalToolbar from './NormalToolbar';
import DropdownToolbar from './DropdownToolbar';
import Catalog from './layouts/Catalog';

Editor.install = (app: App) => {
  app.component(Editor.name, Editor);
  app.component(NormalToolbar.name, NormalToolbar);
  app.component(DropdownToolbar.name, DropdownToolbar);
  app.component(Catalog.name, Catalog);

  return app;
};

Editor.NormalToolbar = NormalToolbar;
Editor.DropdownToolbar = DropdownToolbar;
Editor.Catalog = Catalog;

export default Editor as typeof Editor & {
  readonly NormalToolbar: typeof NormalToolbar;
  readonly DropdownToolbar: typeof DropdownToolbar;
  readonly Catalog: typeof Catalog;
};

export * from './type';
