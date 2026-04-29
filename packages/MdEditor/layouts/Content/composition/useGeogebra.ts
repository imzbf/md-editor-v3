import { randomId } from '@vavt/util';
import { inject, onBeforeUnmount, onMounted, Ref, shallowRef } from 'vue';
import { globalConfig, prefix } from '~/config';
import { CDN_IDS } from '~/static';
import { ERROR_CATCHER } from '~/static/event-name';
import { appendHandler } from '~/utils/dom';
import bus from '~/utils/event-bus';

import { ContentPreviewProps } from '../ContentPreview';

const toNumber = (value: unknown, fallback: number) => {
  const result = Number(value);
  return Number.isFinite(result) && result > 0 ? result : fallback;
};

const syncAppletSize = (container: HTMLElement, appletRoot: HTMLElement, api?: any) => {
  const width = container.clientWidth;
  const height = container.clientHeight;

  if (!width || !height) {
    return;
  }

  appletRoot.style.width = `${width}px`;
  appletRoot.style.height = `${height}px`;
  api?.setSize?.(width, height);

  const injectedRoot = appletRoot.firstElementChild as HTMLElement | null;
  if (injectedRoot) {
    injectedRoot.style.width = `${width}px`;
    injectedRoot.style.height = `${height}px`;
  }

  const iframe = appletRoot.querySelector<HTMLIFrameElement>('iframe');
  if (iframe) {
    iframe.style.width = `${width}px`;
    iframe.style.height = `${height}px`;
  }
};

const useGeogebra = (props: ContentPreviewProps) => {
  const editorId = inject('editorId') as string;
  const rootRef = inject('rootRef') as Ref<HTMLDivElement>;
  const { editorExtensions, editorExtensionsAttrs, geogebraConfig } = globalConfig;

  let GGBApplet = editorExtensions.geogebra!.instance;
  const reRenderGeogebra = shallowRef(-1);

  const configGeogebra = () => {
    if (!props.noGeogebra && GGBApplet) {
      reRenderGeogebra.value = reRenderGeogebra.value + 1;
    }
  };

  onMounted(() => {
    if (props.noGeogebra || GGBApplet) {
      return;
    }

    appendHandler(
      'script',
      {
        ...editorExtensionsAttrs.geogebra?.js,
        src: editorExtensions.geogebra!.js,
        id: CDN_IDS.geogebra,
        onload() {
          GGBApplet = window.GGBApplet;
          configGeogebra();
        }
      },
      'GGBApplet'
    );
  });

  let geogebraSourceEles: Array<HTMLElement> = [];
  let observers: Array<ResizeObserver> = [];

  const clearGeogebraEffects = (force = false) => {
    if (!geogebraSourceEles.length) {
      if (force) {
        observers.forEach((observer) => {
          observer.disconnect?.();
        });
        observers = [];
      }
      return;
    }

    const nextSourceEles: Array<HTMLElement> = [];
    const nextObservers: Array<ResizeObserver> = [];

    geogebraSourceEles.forEach((element, index) => {
      const observer = observers[index];
      const shouldDispose =
        force ||
        !element ||
        !element.isConnected ||
        (rootRef?.value ? !rootRef.value.contains(element) : false);

      if (shouldDispose) {
        observer?.disconnect?.();
        return;
      }

      nextSourceEles.push(element);
      if (observer) {
        nextObservers.push(observer);
      }
    });

    geogebraSourceEles = nextSourceEles;
    observers = nextObservers;
  };

  const replaceGeogebra = () => {
    clearGeogebraEffects();

    if (!props.noGeogebra && GGBApplet) {
      const pendingSourceEles = Array.from(
        rootRef.value.querySelectorAll<HTMLElement>(
          `#${editorId} div.${prefix}-geogebra:not([data-processed])`
        )
      );

      pendingSourceEles.forEach((item) => {
        if (item.dataset.closed === 'false') {
          return false;
        }

        try {
          const baseOptions =
            editorExtensions.geogebra!.parseOption!(item.innerText, {
              editorId,
              element: item
            }) || {};
          const elementWidth = item.clientWidth || 800;
          const elementHeight = item.clientHeight || 600;
          const appletId =
            baseOptions.id || `${prefix}-geogebra-${editorId}-${randomId()}`;
          const options = geogebraConfig({
            appName: 'graphing',
            showToolBar: false,
            showAlgebraInput: false,
            showMenuBar: false,
            ...baseOptions,
            id: appletId,
            width: toNumber(baseOptions.width, elementWidth),
            height: toNumber(baseOptions.height, elementHeight)
          });
          const commands = Array.isArray(options.commands) ? options.commands : [];
          const appletOnLoad = options.appletOnLoad;
          delete options.commands;

          let appletApi: any;

          options.appletOnLoad = (api: any) => {
            appletApi = api;
            commands.forEach((command: string) => {
              api?.evalCommand?.(command);
            });
            appletOnLoad?.(api);
            syncAppletSize(item, appletRoot, appletApi);
          };

          item.textContent = '';
          const appletRoot = document.createElement('div');
          appletRoot.className = `${prefix}-geogebra-applet`;
          appletRoot.style.width = '100%';
          appletRoot.style.height = '100%';
          item.appendChild(appletRoot);

          const applet = new GGBApplet(options, true);
          applet.inject(appletRoot);
          item.setAttribute('data-processed', '');

          geogebraSourceEles.push(item);

          const observer = new ResizeObserver(() => {
            window.requestAnimationFrame(() => {
              syncAppletSize(item, appletRoot, appletApi);
            });
          });
          observer.observe(item);
          observers.push(observer);

          window.requestAnimationFrame(() => {
            syncAppletSize(item, appletRoot, appletApi);
          });
        } catch (error: any) {
          bus.emit(editorId, ERROR_CATCHER, {
            name: 'geogebra',
            message: error?.message,
            error
          });
        }
      });
    }
  };

  onBeforeUnmount(() => {
    clearGeogebraEffects(true);
  });

  return { reRenderGeogebra, replaceGeogebra };
};

export default useGeogebra;
