import { defineComponent, onBeforeUnmount, PropType, reactive, ref } from 'vue';
import { MdPreview } from '~~/index';
import type { Theme } from './App';
import mdText from './data.md';

const SOURCE_TEXT = mdText as string;
const SOURCE_CHARS = Array.from(SOURCE_TEXT);
const TOTAL_LENGTH = SOURCE_CHARS.length;

const SPEED_PRESETS = [
  { label: '慢速 · 40字/s', value: 40 },
  { label: '标准 · 80字/s', value: 80 },
  { label: '快速 · 160字/s', value: 160 }
];

const DEFAULT_SPEED = 80;
const intervalFromSpeed = (speed: number) => Math.max(1, Math.floor(1000 / speed));

export default defineComponent({
  name: 'StreamDemo',
  props: {
    theme: {
      type: String as PropType<Theme>,
      default: 'light'
    },
    previewTheme: {
      type: String as PropType<string>,
      default: undefined
    },
    codeTheme: {
      type: String as PropType<string>,
      default: undefined
    },
    lang: {
      type: String as PropType<string>,
      default: 'zh-CN'
    }
  },
  setup(props) {
    const state = reactive({
      content: '',
      running: false,
      index: 0,
      speed: DEFAULT_SPEED
    });

    const timer = ref<number>();

    const stopTimer = () => {
      if (timer.value) {
        clearInterval(timer.value);
        timer.value = undefined;
      }
    };

    const appendNextChar = () => {
      if (state.index >= TOTAL_LENGTH) {
        stopStream();
        return;
      }

      state.content += SOURCE_CHARS[state.index];
      state.index += 1;

      if (state.index >= TOTAL_LENGTH) {
        stopStream();
      }
    };

    const startTimer = () => {
      stopTimer();
      const interval = intervalFromSpeed(state.speed);
      timer.value = window.setInterval(() => {
        appendNextChar();
      }, interval);
    };

    const startStream = () => {
      if (state.running) {
        return;
      }
      if (state.index === TOTAL_LENGTH) {
        resetStream();
      }

      state.running = true;
      appendNextChar();

      if (state.index >= TOTAL_LENGTH) {
        return;
      }

      startTimer();
    };

    const stopStream = () => {
      stopTimer();
      state.running = false;
    };

    const resetStream = () => {
      stopStream();
      state.content = '';
      state.index = 0;
    };

    const skipAll = () => {
      stopStream();
      state.content = SOURCE_TEXT;
      state.index = TOTAL_LENGTH;
    };

    const updateSpeed = (nextSpeed: number) => {
      if (state.speed === nextSpeed) {
        return;
      }

      state.speed = nextSpeed;

      if (state.running) {
        startTimer();
      }
    };

    onBeforeUnmount(() => {
      stopStream();
    });

    return () => (
      <section class="stream-demo container">
        <header class="stream-demo__header">
          <h2>模拟流式输出</h2>
          <p>点击“播放”开始模拟，文本会逐字追加到预览区，可随时切换速度、暂停或跳过。</p>
        </header>
        <div class="stream-demo__controls" style={{ marginTop: '14px' }}>
          <button class="btn" disabled={state.running} onClick={startStream}>
            播放
          </button>
          <button class="btn" disabled={!state.running} onClick={stopStream}>
            暂停
          </button>
          <button class="btn" onClick={resetStream}>
            重置
          </button>
          <button class="btn" onClick={skipAll}>
            快速完成
          </button>
        </div>
        <div class="stream-demo__speeds" style={{ marginTop: '14px' }}>
          {SPEED_PRESETS.map((item) => (
            <button
              class={['btn', state.speed === item.value ? 'btn-active' : '']}
              key={item.value}
              onClick={() => updateSpeed(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <MdPreview
          modelValue={state.content}
          theme={props.theme}
          previewTheme={props.previewTheme}
          codeTheme={props.codeTheme}
          language={props.lang}
          showCodeRowNumber
        />
      </section>
    );
  }
});
