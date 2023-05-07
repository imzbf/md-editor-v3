import { App } from 'vue';

import Editor from './Editor';
// import NormalToolbar from '~~/NormalToolbar';
// import DropdownToolbar from '~~/DropdownToolbar';
// import MdCatalog from '~~/MdCatalog';
// import ModalToolbar from '~~/ModalToolbar';

import { config } from './config';

Editor.install = (app: App) => {
  app.component(Editor.name, Editor);
  // app.component(NormalToolbar.name, NormalToolbar);
  // app.component(DropdownToolbar.name, DropdownToolbar);
  // app.component(MdCatalog.name, MdCatalog);
  // app.component(ModalToolbar.name, ModalToolbar);

  return app;
};

// Editor.NormalToolbar = NormalToolbar;
// Editor.DropdownToolbar = DropdownToolbar;
// Editor.MdCatalog = MdCatalog;
// Editor.ModalToolbar = ModalToolbar;
Editor.config = config;

export default Editor as typeof Editor & {
  /**
   * 默认工具栏组件
   */
  // readonly NormalToolbar: typeof NormalToolbar;
  /**
   * 下拉菜单工具栏组件
   */
  // readonly DropdownToolbar: typeof DropdownToolbar;
  /**
   * 目录组件
   */
  // readonly MdCatalog: typeof MdCatalog;
  /**
   * 弹窗工具栏组件
   */
  // readonly ModalToolbar: typeof ModalToolbar;
  /**
   * 配置编辑器全局内容
   */
  readonly config: typeof config;
  install: (app: App) => App;
};
