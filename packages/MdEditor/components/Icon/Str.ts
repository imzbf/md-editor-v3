import { CustomIcon } from '~/type';
import { prefix } from '~/config';

type StrIconName = 'copy' | 'collapse-tips';

const iconMaps: { [key in StrIconName]: string } = {
  copy: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy ${prefix}-icon"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,
  'collapse-tips': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-chevron-left ${prefix}-icon"><circle cx="12" cy="12" r="10"/><path d="m14 16-4-4 4-4"/></svg>`
};
const StrIcon = (name: StrIconName, customIcon: CustomIcon): string => {
  if (typeof customIcon[name] === 'string') {
    return customIcon[name] as string;
  }

  return iconMaps[name];
};

export default StrIcon;
