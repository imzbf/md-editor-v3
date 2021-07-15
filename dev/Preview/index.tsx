import { defineComponent, reactive, PropType } from 'vue';
import Editor from '../../MdEditor';
import { mdText } from '../data';

import { Theme } from '../App';

export default defineComponent({
  props: {
    theme: String as PropType<Theme>,
    onChange: {
      type: Function as PropType<(v: Theme) => void>,
      default: () => {}
    }
  },
  setup(props) {
    const md = reactive({
      text: mdText
    });

    return () => (
      <div class="container">
        <Editor
          theme={props.theme}
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

        <div class="preview-actions">
          <button onClick={() => props.onChange('light')}>默认模式</button>
          <button onClick={() => props.onChange('dark')}>暗黑模式</button>
        </div>
      </div>
    );
  }
});
