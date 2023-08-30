import { prefix, configOption } from '~/config';
import { CustomIcon } from '~/type';

const StrIcon = (name: 'copy', customIcon: CustomIcon): string => {
  if (typeof customIcon[name] === 'string') {
    return customIcon[name] as string;
  }

  const defaultStr = `<i class="${prefix}-iconfont ${prefix}-icon-${name}"></i>`;

  switch (configOption.iconfontType) {
    case 'svg': {
      return `<svg class="${prefix}-icon" aria-hidden="true"><use xlink:href="#${prefix}-icon-${name}"></use></svg>`;
    }
    default: {
      return defaultStr;
    }
  }
};

export default StrIcon;
