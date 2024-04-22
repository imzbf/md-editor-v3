import { App } from 'vue';

import ModalToolbar from './ModalToolbar';

ModalToolbar.install = (app: App) => {
  app.component(ModalToolbar.name as string, ModalToolbar);

  return app;
};

export default ModalToolbar as typeof ModalToolbar & {
  install: (app: App) => App;
};
