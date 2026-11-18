import {
  Component,
  ComputedRef,
  PropType,
  computed,
  defineComponent,
  h,
  inject
} from 'vue';
import Icon, { IconName } from './Icon';
import { prefix } from '~/config';
import { CustomIcon } from '~/type';

export default defineComponent({
  name: `${prefix}-icon`,
  props: {
    name: {
      type: String as PropType<IconName>,
      default: ''
    }
  },
  setup(props) {
    // 独立使用 MdModal 时没有编辑器提供的图标配置，仍应渲染内置图标。
    const customIcon = inject<ComputedRef<CustomIcon>>(
      'customIcon',
      computed(() => ({}))
    );

    return () => {
      const item = customIcon.value[props.name];

      // 自定义的图标总是对象结构，唯一的copy图标只会通过Str判断内容
      if (typeof item === 'object') {
        return typeof item.component === 'object' ? (
          h(item.component as Component, item.props)
        ) : (
          <span innerHTML={item.component as string}></span>
        );
      }

      // 其他按钮但是没有提供，使用默认的
      return <Icon name={props.name} />;
    };
  }
});
