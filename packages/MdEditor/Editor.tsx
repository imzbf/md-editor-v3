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
    // eslint-disable-next-line vue/no-setup-props-destructure
    const { editorId, noKatex, noMermaid, noPrettier, noUploadImg, noHighlight } = props;

    const state = reactive({
      scrollAuto: props.scrollAuto
    });

    const codeRef = ref<ContentExposeParam>();

    // 快捷键监听
    useOnSave(props, ctx);
    // provide 部分prop
    useProvide(props);
    // 插入扩展的外链
    useExpansion(props);
    // 错误捕获
    useErrorCatcher(props, ctx);
    // 部分配置重构
    const [setting, updateSetting] = useConfig(props, ctx);
    // 目录状态
    const catalogVisible = useCatalog(props);
    // 卸载组件前清空全部事件监听
    onBeforeUnmount(() => {
      bus.clear(editorId);
    });

    useExpose(props, ctx, catalogVisible, setting, updateSetting, codeRef);

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
        >
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
          />
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
            onChange={(value) => {
              if (props.onChange) {
                props.onChange(value);
              }

              ctx.emit('update:modelValue', value);
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
            inputBoxWitdh={props.inputBoxWitdh}
            onInputBoxWitdhChange={(width: string) => {
              if (props.onInputBoxWitdhChange) {
                props.onInputBoxWitdhChange(width);
              }
              ctx.emit('onInputBoxWitdhChange', width);
            }}
            sanitizeMermaid={props.sanitizeMermaid}
          />
          {props.footers?.length > 0 && (
            <Footer
              modelValue={props.modelValue}
              footers={props.footers}
              defFooters={defFooters}
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
