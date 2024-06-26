import { App } from 'vue';

import MdPreview from './MdPreview';

MdPreview.install = (app: App) => {
  app.component(MdPreview.name as string, MdPreview);

  return app;
};

export default MdPreview as typeof MdPreview & {
  install: (app: App) => App;
};
