import { Component, ComputedRef, PropType, defineComponent, h, inject } from 'vue';
import Icon, { IconName } from './Icon';
import { CustomIcon } from '~/type';

export default defineComponent({
  props: {
    name: {
      type: String as PropType<IconName>,
      default: ''
    }
  },
  setup(props) {
    const customIcon = inject('customIcon') as ComputedRef<CustomIcon>;

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
