import { App } from 'vue';

import MdCatalog from './MdCatalog';

MdCatalog.install = (app: App) => {
  app.component(MdCatalog.name as string, MdCatalog);

  return app;
};

export default MdCatalog as typeof MdCatalog & {
  install: (app: App) => App;
};
