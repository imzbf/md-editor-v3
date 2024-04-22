import { App } from 'vue';

import DropdownToolbar from './DropdownToolbar';

DropdownToolbar.install = (app: App) => {
  app.component(DropdownToolbar.name as string, DropdownToolbar);

  return app;
};

export default DropdownToolbar as typeof DropdownToolbar & {
  install: (app: App) => App;
};
