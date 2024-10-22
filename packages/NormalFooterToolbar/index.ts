import { App } from 'vue';

import NormalFooterToolbar from './NormalFooterToolbar';

NormalFooterToolbar.install = (app: App) => {
  app.component(NormalFooterToolbar.name as string, NormalFooterToolbar);

  return app;
};

export default NormalFooterToolbar as typeof NormalFooterToolbar & {
  install: (app: App) => App;
};
