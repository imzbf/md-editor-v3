// import { Renderer } from 'marked';

import Editor from '../Editor';
import { Config } from '../type';

const config: Config = function (
  this: typeof Editor,
  option = {
    markedRenderer: (r) => r,
    markedExtensions: []
  }
) {
  Reflect.defineProperty(this, 'extension', {
    value: option,
    enumerable: true
  });
};

export default config;
