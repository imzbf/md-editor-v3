import { REPLACE } from '~/static/event-name';
import type { ToolDirective } from '~/utils/content-help';
import bus from '~/utils/event-bus';

export interface ReplacePayload {
  /** 要执行的编辑指令。 */
  direct: ToolDirective;
  /** 指令自身需要的数据，例如链接地址、表格尺寸或通用内容生成器。 */
  params?: Record<string, unknown>;
  /** 公开 API 属于程序化更新，不受原生 disabled/readOnly 交互限制。 */
  source?: 'interaction' | 'programmatic';
}

/**
 * 使用单一载荷发送文本替换事件，避免调用方依赖不断增长的位置参数顺序。
 */
export const emitReplace = (editorId: string, payload: ReplacePayload) => {
  bus.emit(editorId, REPLACE, payload);
};
