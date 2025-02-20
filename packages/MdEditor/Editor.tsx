import { defineComponent, onBeforeUnmount, reactive, ref } from 'vue';
import { prefix } from '~/config';
import ToolBar from '~/layouts/Toolbar';
import Content from '~/layouts/Content';
import Footer from '~/layouts/Footer';
import bus from '~/utils/event-bus';

import { EditorProps, EditorContext } from '~/type';
import { getSlot } from '~/utils/vue-tsx';

import {
  useOnSave,
  useProvide,
  useExpansion,
  useConfig,
  useCatalog,
  useExpose,
  useErrorCatcher
} from './composition';

import { editorProps as props, editorEmits as emits } from './props';
import { ContentExposeParam } from './layouts/Content/type';

const Editor = defineComponent({
  name: 'MdEditorV3',
  props,
  emits,
  setup(props: EditorProps, ctx: EditorContext) {
    // ID不允许响应式（解构会失去响应式能力），这会扰乱eventbus

    const { noKatex, noMermaid, noPrettier, noUploadImg, noHighlight } = props;

    const state = reactive({
      scrollAuto: props.scrollAuto
    });

    const rootRef = ref<HTMLDivElement>();
    const codeRef = ref<ContentExposeParam>();

    // provide 部分prop
    const { editorId } = useProvide(props, rootRef);
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
    // 卸载组件前清空全部事件监听
    onBeforeUnmount(() => {
      bus.clear(editorId);
    });

    return () => {
      const defToolbars = getSlot({ props, ctx }, 'defToolbars');
      const defFooters = getSlot({ props, ctx }, 'defFooters');

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
            <ToolBar
              noPrettier={noPrettier}
              toolbars={props.toolbars}
              toolbarsExclude={props.toolbarsExclude}
              setting={setting}
              updateSetting={updateSetting}
              tableShape={props.tableShape}
              defToolbars={defToolbars}
              noUploadImg={noUploadImg}
              showToolbarName={props.showToolbarName}
              catalogVisible={catalogVisible.value}
              codeTheme={props.codeTheme}
            />
          )}
          <Content
            ref={codeRef}
            modelValue={props.modelValue}
            setting={setting}
            mdHeadingId={props.mdHeadingId}
            noMermaid={noMermaid}
            noPrettier={noPrettier}
            sanitize={props.sanitize}
            placeholder={props.placeholder}
            noKatex={noKatex}
            scrollAuto={state.scrollAuto}
            formatCopiedText={props.formatCopiedText}
            autofocus={props.autoFocus}
            disabled={props.disabled}
            readonly={props.readOnly}
            maxlength={props.maxLength}
            autoDetectCode={props.autoDetectCode}
            noHighlight={noHighlight}
            // 区别v-model，它在compositionend之前不会触发
            updateModelValue={(value) => {
              ctx.emit('update:modelValue', value);
            }}
            onChange={(value) => {
              if (props.onChange) {
                props.onChange(value);
              }

              ctx.emit('onChange', value);
            }}
            onHtmlChanged={(html) => {
              if (props.onHtmlChanged) {
                props.onHtmlChanged(html);
              }

              ctx.emit('onHtmlChanged', html);
            }}
            onGetCatalog={(list) => {
              if (props.onGetCatalog) {
                props.onGetCatalog(list);
              }
              ctx.emit('onGetCatalog', list);
            }}
            onBlur={(e) => {
              if (props.onBlur) {
                props.onBlur(e);
              }
              ctx.emit('onBlur', e);
            }}
            onFocus={(e) => {
              if (props.onFocus) {
                props.onFocus(e);
              }
              ctx.emit('onFocus', e);
            }}
            onInput={(e) => {
              if (props.onInput) {
                props.onInput(e);
              }
              ctx.emit('onInput', e);
            }}
            completions={props.completions}
            catalogVisible={catalogVisible.value}
            theme={props.theme}
            noImgZoomIn={props.noImgZoomIn}
            onDrop={(e) => {
              if (props.onDrop) {
                props.onDrop(e);
              }
              ctx.emit('onDrop', e);
            }}
            inputBoxWidth={props.inputBoxWidth}
            oninputBoxWidthChange={(width: string) => {
              if (props.oninputBoxWidthChange) {
                props.oninputBoxWidthChange(width);
              }
              ctx.emit('oninputBoxWidthChange', width);
            }}
            sanitizeMermaid={props.sanitizeMermaid}
            transformImgUrl={props.transformImgUrl}
            codeFoldable={props.codeFoldable}
            autoFoldThreshold={props.autoFoldThreshold}
            onRemount={() => {
              if (props.onRemount) {
                props.onRemount();
              }
              ctx.emit('onRemount');
            }}
            catalogLayout={props.catalogLayout}
          />
          {props.footers.length > 0 && (
            <Footer
              modelValue={props.modelValue}
              footers={props.footers}
              defFooters={defFooters}
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
