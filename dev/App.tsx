import { defineComponent, reactive } from 'vue';
import Editor from '../MdEditor';
import { mdText } from './data';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

import './style.less';

export default defineComponent({
  setup() {
    const md = reactive({
      text: mdText
    });
    return () => (
      <div class="container">
        <Editor
          hljs={hljs}
          modelValue={md.text}
          onChange={(value) => (md.text = value)}
          onUploadImg={(files, callback) => {
            console.log(files);
            callback([
              'https://art-1252753142.cos.ap-chengdu.myqcloud.com/2021/06301522413082599421018280471.png',
              'https://art-1252753142.cos.ap-chengdu.myqcloud.com/2021/06301606102817061001806835437.gif'
            ]);
          }}
        />
      </div>
    );
  }
});
