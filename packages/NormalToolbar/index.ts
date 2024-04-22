import { App } from 'vue';

import NormalToolbar from './NormalToolbar';

NormalToolbar.install = (app: App) => {
  app.component(NormalToolbar.name as string, NormalToolbar);

  return app;
};

export default NormalToolbar as typeof NormalToolbar & {
  install: (app: App) => App;
};
