import { debounce, createSmoothScroll, throttle } from '@vavt/util';
import CodeMirrorUt from '~/layouts/Content/codemirror';
import { prefix } from '../config';

const DATA_LINE_SELECTOR = `.${prefix}-preview > [data-line]`;

/**
 * 两块区域同步滚动
 *
 * @param pEle 宿主区域
 * @param cEle 寄主区域
 * @returns 清除监听的方法
 */
export const scrollAutoWithScale = (pEle: HTMLElement, cEle: HTMLElement) => {
  // 注册一个防抖监听事件函数
  const addEvent = debounce(() => {
    // 宿主绑定事件
    pEle.removeEventListener('scroll', scrollHandler);
    pEle.addEventListener('scroll', scrollHandler);

    // 寄主绑定事件
    cEle.removeEventListener('scroll', scrollHandler);
    cEle.addEventListener('scroll', scrollHandler);
  }, 50);

  const scrollHandler = (e: Event) => {
    const pHeight = pEle.clientHeight;
    const cHeight = cEle.clientHeight;

    const pScrollHeight = pEle.scrollHeight;
    const cScrollHeight = cEle.scrollHeight;
    // 计算一个高度比
    const scale = (pScrollHeight - pHeight) / (cScrollHeight - cHeight);

    if (e.target === pEle) {
      // 清除寄主监听
      cEle.removeEventListener('scroll', scrollHandler);

      cEle.scrollTo({
        top: pEle.scrollTop / scale
        // behavior: 'smooth'
      });

      addEvent();
    } else {
      // 清除宿主监听
      pEle.removeEventListener('scroll', scrollHandler);

      pEle.scrollTo({
        top: cEle.scrollTop * scale
        // behavior: 'smooth'
      });

      addEvent();
    }
  };

  return [
    () => {
      addEvent().finally(() => {
        pEle.dispatchEvent(new Event('scroll'));
      });
    },
    () => {
      pEle.removeEventListener('scroll', scrollHandler);
      cEle.removeEventListener('scroll', scrollHandler);
    }
  ];
};

/**
 * 两块区域同步滚动
 *
 * @param pEle 宿主区域
 * @param cEle 寄主区域
 * @returns 清除监听的方法
 */
const scrollAuto = (pEle: HTMLElement, cEle: HTMLElement, codeMirrorUt: CodeMirrorUt) => {
  const { view } = codeMirrorUt;

  const smoothScroll = createSmoothScroll();

  const getTopByLine = (line: number) => {
    return view.lineBlockAt(view.state.doc.line(line).from).top;
  };

  const getHeightByLine = (line: number) => {
    return view.lineBlockAt(view.state.doc.line(line).from).height;
  };

  // 在每次文本变化后，生成所有的行高数据
  let blockMap: Array<{
    start: number;
    end: number;
  }> = [];
  // 预览区域中带有行号的元素列表
  let elesHasLineNumber: HTMLElement[] = [];
  // 带有的行号列表
  let startLines: number[] = [];

  const buildMap = () => {
    blockMap = [];
    elesHasLineNumber = [];
    startLines = [];

    // 预览框中带有源行号的元素
    // 仅获取第一层，嵌套的暂不处理（details标签优化方案代价太大）
    elesHasLineNumber = elesHasLineNumber.concat(
      Array.from(cEle.querySelectorAll<HTMLElement>(DATA_LINE_SELECTOR))
    );

    const startLinesCalc = elesHasLineNumber.map((item) => Number(item.dataset.line) + 1);

    startLines = startLines.concat(startLinesCalc);

    const { lines } = view.state.doc;

    let start = 1;
    let end = startLinesCalc.shift() ?? lines;

    for (let i = 1; i <= lines; i++) {
      if (i === end) {
        start = i;
        end = startLinesCalc.shift() || lines + 1;
      }

      blockMap.push({
        start,
        end: end - 1
      });
    }
  };

  // 为0时可以重新注册事件，否则不可以
  let pLock = 0;
  let cLock = 0;

  const pEleHandler = () => {
    if (cLock !== 0) {
      return false;
    }

    // 加把锁，当前滚动结束后再减掉。
    pLock++;

    const { scrollDOM, contentHeight } = view;

    let cElePaddingTop = +getComputedStyle(cEle).paddingTop.replace('px', '');

    const blockInfo = view.lineBlockAtHeight(scrollDOM.scrollTop);
    // 可视区域第一行行号
    const { number: currLine } = view.state.doc.lineAt(blockInfo.from);

    const blockData = blockMap[currLine - 1];

    if (!blockData) {
      // 复制更大的文本时，blockData未更新
      return false;
    }

    let endLinePosition = getTopByLine(blockData.end) + getHeightByLine(blockData.end);

    // 计算一个高度比
    let scale = 0;
    const startTop = getTopByLine(blockData.start);

    const startEle: HTMLElement =
      cEle.querySelector<HTMLElement>(`[data-line="${blockData.start - 1}"]`) ||
      (cEle.firstElementChild?.firstElementChild as HTMLElement);

    // 获取当前模块结束节点，如果没有，则把预览区域的最后一个节点作为结束节点
    const endEle: HTMLElement =
      cEle.querySelector<HTMLElement>(`[data-line="${blockData.end}"]`) ||
      (cEle.lastElementChild?.lastElementChild as HTMLElement);

    let blockHeight = 0;
    let startEleOffetTop = 0;

    if (startTop === 0) {
      scale = scrollDOM.scrollTop / endLinePosition;
      // 开始结束相同时，需要将padding算入滚动区域
      if (startEle === endEle) {
        cElePaddingTop = 0;
        endLinePosition = contentHeight - scrollDOM.offsetHeight;

        // 如果开始和结束节点相同，则需要将这个节点的高度也算进滚动区域
        blockHeight = endEle.offsetTop + endEle.offsetHeight - cEle.clientHeight;
      } else {
        blockHeight = endEle.offsetTop;
      }
    } else {
      scale = (scrollDOM.scrollTop - startTop) / (endLinePosition - startTop);

      startEleOffetTop = startEle.offsetTop;
      blockHeight = endEle.offsetTop - startEleOffetTop;
    }

    // 如果结束块已经在滚动到底部时的可视区了，那么就将当前块到末尾视为一个整体
    // 达到左侧滚动到底部时，右侧同步滚动到底部的目标
    if (endLinePosition >= scrollDOM.scrollHeight - scrollDOM.clientHeight) {
      scale =
        (scrollDOM.scrollTop - startTop) /
        (scrollDOM.scrollHeight - scrollDOM.clientHeight - startTop);

      startEleOffetTop = startEle.offsetTop;
      blockHeight = cEle.scrollHeight - cEle.clientHeight - startEleOffetTop + 10;
    }

    const scrollToTop = startEleOffetTop - cElePaddingTop + blockHeight * scale;

    smoothScroll(cEle, scrollToTop, () => {
      pLock--;
    });
  };

  const cEleHandler = () => {
    if (pLock !== 0) {
      return;
    }
    cLock++;

    const { scrollDOM } = view;
    // 已经滚动的高度
    const cScrollTop = cEle.scrollTop;
    // 可滚动的高度
    const cScrollHeight = cEle.scrollHeight;

    let realEleStart = cEle.firstElementChild?.firstElementChild as HTMLElement;
    let realEleEnd = cEle.firstElementChild?.lastElementChild as HTMLElement;

    // 1.有可用的标记行
    if (startLines.length > 0) {
      // 根据滚动比较计算一个可能的开始行号位置
      let virtualLine = Math.ceil(
        Number(startLines[startLines.length - 1]) * (cScrollTop / cScrollHeight)
      );

      // 找到与计算的可能行号最近行作为结束行，如果不存在，就取第一个有行号的
      let startLineIndex = startLines.findLastIndex((value) => value <= virtualLine);
      startLineIndex = startLineIndex === -1 ? 0 : startLineIndex;

      virtualLine = startLines[startLineIndex];

      // 然后校验这个行的位置是否是真的开始行
      for (let i = startLineIndex; i >= 0 && i < startLines.length; ) {
        const currentElementTop = elesHasLineNumber[i].offsetTop;

        // 如果当前行已经超过了可视区域
        if (currentElementTop > cScrollTop) {
          // 则需要找到上一行做行号
          if (i - 1 >= 0) {
            i--;
            continue;
          }

          // =0就是开始行，不用找了
          virtualLine = -1;
          startLineIndex = i;
          break;
        } else {
          // 说明下一个带有行号的行也不在可视区域，行号需要往下走
          if (
            i + 1 < startLines.length &&
            elesHasLineNumber[i + 1].offsetTop < cScrollTop
          ) {
            i++;

            continue;
          }

          virtualLine = startLines[i];
          startLineIndex = i;
          break;
        }
      }

      switch (virtualLine) {
        case -1: {
          realEleStart = cEle.firstElementChild?.firstElementChild as HTMLElement;
          realEleEnd = elesHasLineNumber[startLineIndex];
          break;
        }

        case startLines.length - 1: {
          realEleStart = elesHasLineNumber[startLineIndex];
          realEleEnd = cEle.firstElementChild?.lastElementChild as HTMLElement;
          break;
        }

        default: {
          realEleStart = elesHasLineNumber[startLineIndex];
          realEleEnd =
            elesHasLineNumber[
              startLineIndex + 1 === elesHasLineNumber.length
                ? startLineIndex
                : startLineIndex + 1
            ];
        }
      }
    }

    // 2.不考虑没有元素的情况，因为根本不会触发滚动
    // 所以默认的开始结束节点就是真实的

    // 开始节点的顶部高度，如果是第一个节点，就取0
    const eleStartOffsetTop =
      realEleStart === cEle.firstElementChild?.firstElementChild
        ? 0
        : realEleStart.offsetTop;

    let eleEndOffsetTop = realEleEnd.offsetTop;

    let scale = 0;

    const { start, end } = blockMap[Number(realEleStart.dataset.line || 0)];

    // 开始行的滚动高度
    const firstLineScrollTop = getTopByLine(start);
    // 结束行的滚动高度
    const endLineScrollTop = getTopByLine(end === view.state.doc.lines ? end : end + 1);
    let blockHeight = 0;

    // 最后一行距离顶部高度超出了可以滚动的高度，则将当前开始行到最后一个节点视为同一个模块
    if (
      endLineScrollTop > scrollDOM.scrollHeight - scrollDOM.clientHeight ||
      realEleEnd.scrollTop > cEle.scrollHeight - cEle.clientHeight
    ) {
      scale =
        (cScrollTop + cEle.clientHeight - eleStartOffsetTop) /
        (cEle.scrollHeight - eleStartOffsetTop);

      blockHeight = pEle.scrollHeight - firstLineScrollTop - pEle.clientHeight;
    }
    //
    else if (realEleStart === cEle.firstElementChild?.firstElementChild) {
      if (realEleStart === realEleEnd) {
        // 外边框距离顶部高度 + 内容及padding和border高度 + 外下边框
        eleEndOffsetTop =
          realEleEnd.offsetTop +
          realEleEnd.offsetHeight +
          +getComputedStyle(realEleEnd).marginBottom.replace('px', '');

        blockHeight = endLineScrollTop;
      } else {
        blockHeight = endLineScrollTop;
      }

      scale = Math.max(cScrollTop / eleEndOffsetTop, 0);
    }
    // 正常情况
    else {
      scale = Math.max(
        (cScrollTop - eleStartOffsetTop) / (eleEndOffsetTop - eleStartOffsetTop),
        0
      );
      // 这个模块的综合高度
      blockHeight = endLineScrollTop - firstLineScrollTop;
    }

    smoothScroll(pEle, firstLineScrollTop + blockHeight * scale, () => {
      cLock--;
    });
  };

  const scrollHandler = throttle((e: Event) => {
    // 由于虚拟滚动，contentHeight在没有滚动到底部时总是在变化的
    const { scrollDOM, contentHeight } = view;
    const scrollDomHeight = scrollDOM.clientHeight;

    // 编辑区域没有滚动条 || 预览区域没有滚动条
    if (
      contentHeight <= scrollDomHeight ||
      cEle.firstElementChild!.clientHeight <= cEle.clientHeight
    ) {
      return false;
    }

    // 可能是修改文本之前引发的滚动，判断后消除
    if (view.state.doc.lines < blockMap[blockMap.length - 1]?.end) {
      // fix：当删减一个末尾的回车时，同步滚动会失效，因为html没有变化，不会重新绑定事件构建map
      buildMap();
      return false;
    }

    if (e.target === pEle) {
      pEleHandler();
    } else {
      cEleHandler();
    }

    // 计算位置的函数一般在1ms以内
  }, 1);

  return [
    () => {
      buildMap();

      pEle.addEventListener('scroll', scrollHandler);
      cEle.addEventListener('scroll', scrollHandler);

      pEle.dispatchEvent(new Event('scroll'));
    },
    () => {
      // blockMap = [];
      pEle.removeEventListener('scroll', scrollHandler);
      cEle.removeEventListener('scroll', scrollHandler);
    }
  ];
};

export default scrollAuto;
