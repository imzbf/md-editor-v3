import { ComponentPublicInstance, SetupContext } from 'vue';

/**
 * 获取指定插槽内容
 * 方法设定：vue组件中v-slot优先级高于props
 *
 * @param param0 组件实例instance，SetupContext（setup二入参），props
 * @param name 插槽名或者props名
 * @returns VNode
 */
export const getSlot = (
  {
    instance,
    ctx,
    props = {}
  }: {
    instance?: ComponentPublicInstance;
    ctx?: SetupContext<Array<any>>;
    props?: any;
  },
  name = 'default'
) => {
  const targetSlot = instance?.$slots[name] || ctx?.slots[name];
  return (targetSlot ? targetSlot(instance) : '') || props[name];
};
