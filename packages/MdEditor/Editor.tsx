import { computed, defineComponent, onBeforeUnmount, reactive, ref } from 'vue';
import { prefix } from '~/config';
import Content from '~/layouts/Content';
import Footer from '~/layouts/Footer';
import ToolBar from '~/layouts/Toolbar';
import { EditorContext } from '~/type';
import bus from '~/utils/event-bus';

import { getSlot } from '~/utils/vue-tsx';

import {
  useOnSave,
  useProvide,
  useExpansion,
  useConfig,
  useCatalog,
  useExpose,
  useErrorCatcher,
  useEditorId
} from './composition';

import { ContentExposeParam } from './layouts/Content/type';
import { editorProps as props, editorEmits as emits } from './props';

const Editor = defineComponent({
  name: 'MdEditorV3',
  props,
  emits,
  setup(props, ctx: EditorContext) {
    const { noKatex, noMermaid, noHighlight } = props;

    const state = reactive({
      scrollAuto: props.scrollAuto
    });

    const rootRef = ref<HTMLDivElement>();
    const codeRef = ref<ContentExposeParam>();

    const defToolbars = computed(() => getSlot({ props, ctx }, 'defToolbars'));
    const defFooters = computed(() => getSlot({ props, ctx }, 'defFooters'));

    const editorId = useEditorId(props);

    // 部分配置重构
    const [setting, updateSetting] = useConfig(props, ctx, { editorId });
    // 目录状态
    const catalogVisible = useCatalog(props, { editorId });
    // 快捷键监听
    useOnSave(props, ctx, {
      editorId
    });
    // 插入扩展的外链
    useExpansion(props);
    // 错误捕获
    useErrorCatcher(props, ctx, {
      editorId
    });
    // 向外暴露属性
    useExpose(props, ctx, {
      editorId,
      catalogVisible,
      setting,
      updateSetting,
      codeRef
    });

    // provide 部分
    useProvide(props, {
      rootRef,
      editorId,
      setting,
      updateSetting,
      catalogVisible,
      defToolbars
    });

    // 卸载组件前清空全部事件监听
    onBeforeUnmount(() => {
      bus.clear(editorId);
    });

    return () => {
      return (
        <div
          id={editorId}
          class={[
            prefix,
            props.class,
            props.theme === 'dark' && `${prefix}-dark`,
            setting.fullscreen || setting.pageFullscreen ? `${prefix}-fullscreen` : ''
          ]}
          style={props.style}
          ref={rootRef}
        >
          {props.toolbars.length > 0 && (
            <ToolBar toolbars={props.toolbars} toolbarsExclude={props.toolbarsExclude} />
          )}
          <Content
            ref={codeRef}
            modelValue={props.modelValue}
            mdHeadingId={props.mdHeadingId}
            noMermaid={noMermaid}
            sanitize={props.sanitize}
            placeholder={props.placeholder}
            noKatex={noKatex}
            scrollAuto={state.scrollAuto}
            formatCopiedText={props.formatCopiedText}
            autofocus={props.autoFocus}
            readonly={props.readOnly}
            maxlength={props.maxLength}
            autoDetectCode={props.autoDetectCode}
            noHighlight={noHighlight}
            // 区别v-model，它在compositionend之前不会触发
            updateModelValue={(value) => {
              ctx.emit('update:modelValue', value);
            }}
            onChange={(value) => {
              props.onChange?.(value);
              ctx.emit('onChange', value);
            }}
            onHtmlChanged={(html) => {
              props.onHtmlChanged?.(html);
              ctx.emit('onHtmlChanged', html);
            }}
            onGetCatalog={(list) => {
              props.onGetCatalog?.(list);
              ctx.emit('onGetCatalog', list);
            }}
            onBlur={(e) => {
              props.onBlur?.(e);
              ctx.emit('onBlur', e);
            }}
            onFocus={(e) => {
              props.onFocus?.(e);
              ctx.emit('onFocus', e);
            }}
            onInput={(e) => {
              props.onInput?.(e);
              ctx.emit('onInput', e);
            }}
            completions={props.completions}
            noImgZoomIn={props.noImgZoomIn}
            onDrop={(e) => {
              props.onDrop?.(e);
              ctx.emit('onDrop', e);
            }}
            inputBoxWidth={props.inputBoxWidth}
            oninputBoxWidthChange={(width: string) => {
              props.oninputBoxWidthChange?.(width);
              ctx.emit('oninputBoxWidthChange', width);
            }}
            sanitizeMermaid={props.sanitizeMermaid}
            transformImgUrl={props.transformImgUrl}
            codeFoldable={props.codeFoldable}
            autoFoldThreshold={props.autoFoldThreshold}
            onRemount={() => {
              props.onRemount?.();
              ctx.emit('onRemount');
            }}
            catalogLayout={props.catalogLayout}
            catalogMaxDepth={props.catalogMaxDepth}
            noEcharts={props.noEcharts}
            previewComponent={props.previewComponent}
          />
          {props.footers.length > 0 && (
            <Footer
              modelValue={props.modelValue}
              footers={props.footers}
              defFooters={defFooters.value}
              noScrollAuto={
                (!setting.preview && !setting.htmlPreview) || setting.previewOnly
              }
              scrollAuto={state.scrollAuto}
              onScrollAutoChange={(v) => (state.scrollAuto = v)}
            />
          )}
        </div>
      );
    };
  }
});

export default Editor;
