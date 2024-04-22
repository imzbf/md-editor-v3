import { App } from 'vue';

import MdModal from './Modal';

MdModal.install = (app: App) => {
  app.component(MdModal.name as string, MdModal);

  return app;
};

export default MdModal as typeof MdModal & {
  install: (app: App) => App;
};
