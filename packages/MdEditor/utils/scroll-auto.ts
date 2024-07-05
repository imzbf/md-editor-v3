import { debounce, createSmoothScroll } from '@vavt/util';
import CodeMirrorUt from '~/layouts/Content/codemirror';
import { prefix } from '../config';

const DATA_LINE_SELECTOR = `.${prefix}-preview > [data-line]`;

const getComputedStyleNum = (ele: HTMLElement, key: string) => {
  return +getComputedStyle(ele).getPropertyValue(key).replace('px', '');
};

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
    return view.lineBlockAt(view.state.doc.line(line + 1).from).top;
  };

  const getBottomByLine = (line: number) => {
    return view.lineBlockAt(view.state.doc.line(line + 1).from).bottom;
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
    // 预览框中带有源行号的元素
    // 仅获取第一层，嵌套的暂不处理（details标签优化方案代价太大）
    elesHasLineNumber = Array.from(
      cEle.querySelectorAll<HTMLElement>(DATA_LINE_SELECTOR)
    );
    startLines = elesHasLineNumber.map((item) => Number(item.dataset.line));

    const tempStartLines = [...startLines];
    const { lines } = view.state.doc;

    let start = tempStartLines.shift() || 0;
    let end = tempStartLines.shift() || lines;

    for (let i = 0; i < lines; i++) {
      if (i === end) {
        start = i;
        end = tempStartLines.shift() || lines;
      }

      blockMap.push({
        start: start,
        end: end - 1
      });
    }
  };

  const getLineNumber = (pMaxScrollLength: number, cMaxScrollLength: number) => {
    let lineNumer = 1;
    for (let i = elesHasLineNumber.length - 1; i - 1 >= 0; i--) {
      const curr = elesHasLineNumber[i];
      const sibling = elesHasLineNumber[i - 1];
      if (
        curr.offsetTop + curr.offsetHeight > cMaxScrollLength &&
        sibling.offsetTop < cMaxScrollLength
      ) {
        lineNumer = Number(sibling.dataset.line);
        break;
      }
    }

    for (let i = blockMap.length - 1; i >= 0; i--) {
      const itemBottom = getBottomByLine(blockMap[i].end);
      const itemTop = getTopByLine(blockMap[i].start);

      if (itemBottom > pMaxScrollLength && itemTop <= pMaxScrollLength) {
        lineNumer = lineNumer < blockMap[i].start ? lineNumer : blockMap[i].start;
        break;
      }
    }

    return lineNumer;
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

    let cElePaddingTop = getComputedStyleNum(cEle, 'padding-top');

    const blockInfo = view.lineBlockAtHeight(scrollDOM.scrollTop);
    // 可视区域第一行行号
    const { number: currLine } = view.state.doc.lineAt(blockInfo.from);

    const blockData = blockMap[currLine - 1];

    if (!blockData) {
      // 复制更大的文本时，blockData未更新
      return false;
    }

    let scale = 1;

    const startEle: HTMLElement =
      cEle.querySelector<HTMLElement>(`[data-line="${blockData.start}"]`) ||
      (cEle.firstElementChild?.firstElementChild as HTMLElement);
    // 获取当前模块结束节点，如果没有，则把预览区域的最后一个节点作为结束节点
    const endEle: HTMLElement =
      cEle.querySelector<HTMLElement>(`[data-line="${blockData.end + 1}"]`) ||
      (cEle.lastElementChild?.lastElementChild as HTMLElement);

    const pMaxScrollLength = scrollDOM.scrollHeight - scrollDOM.clientHeight;
    const cMaxScrollLength = cEle.scrollHeight - cEle.clientHeight;

    let startTop = getTopByLine(blockData.start);
    let endBottom = getBottomByLine(blockData.end);

    // 把margin算到元素高度中去，可以避免第一个元素不到顶部的情况
    let startEleOffetTop = startEle.offsetTop;
    let blockHeight = endEle.offsetTop - startEleOffetTop;

    if (startTop === 0) {
      // offsetTop会包含margin，所以当是开始行时，要将margin-top纳入高度
      // 而后面的则不需要
      startEleOffetTop = 0;
      // 开始结束相同时(文档中只存在一个模块)，需要将padding算入滚动区域
      if (startEle === endEle) {
        cElePaddingTop = 0;

        // 如果开始和结束节点相同，则需要将这个节点的高度也算进滚动区域
        endBottom = contentHeight - scrollDOM.offsetHeight;
        blockHeight = cMaxScrollLength;
      } else {
        blockHeight = endEle.offsetTop;
      }
    }

    // 计算一个高度比
    scale = (scrollDOM.scrollTop - startTop) / (endBottom - startTop);

    // 如果结束块已经在滚动到底部时的可视区了，那么就将当前块到末尾视为一个整体
    // 两种情况
    // 1. 左边的模块结束行已经在
    // 2. 右边的模块结束行已经在
    // 取两则最先在可视区的情况
    const endElePos =
      endEle == cEle.lastElementChild?.lastElementChild
        ? endEle.offsetTop + endEle.clientHeight
        : endEle.offsetTop;

    if (endBottom >= pMaxScrollLength || endElePos > cMaxScrollLength) {
      const lineNumer = getLineNumber(pMaxScrollLength, cMaxScrollLength);

      startTop = getTopByLine(lineNumer);
      scale = (scrollDOM.scrollTop - startTop) / (pMaxScrollLength - startTop);

      const _startEle = document.querySelector<HTMLElement>(`[data-line="${lineNumer}"]`);

      if (startTop > 0 && _startEle) {
        startEleOffetTop = _startEle.offsetTop;
      }

      blockHeight =
        cMaxScrollLength - startEleOffetTop + getComputedStyleNum(cEle, 'padding-top');
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

    const pMaxScrollLength = scrollDOM.scrollHeight - scrollDOM.clientHeight;
    const cMaxScrollLength = cEle.scrollHeight - cEle.clientHeight;

    let realEleStart = cEle.firstElementChild?.firstElementChild as HTMLElement;
    let realEleEnd = cEle.firstElementChild?.lastElementChild as HTMLElement;

    // 1.有可用的标记行
    if (startLines.length > 0) {
      // 根据滚动比较计算一个可能的开始行号位置
      let virtualLine = Math.ceil(
        startLines[startLines.length - 1] * (cScrollTop / cScrollHeight)
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

      switch (startLineIndex) {
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
    let eleStartOffsetTop =
      realEleStart === cEle.firstElementChild?.firstElementChild
        ? 0
        : realEleStart.offsetTop - getComputedStyleNum(realEleStart, 'margin-top');

    let eleEndOffsetTop = realEleEnd.offsetTop;

    let scale = 0;

    const { start, end } = blockMap[Number(realEleStart.dataset.line || 0)];
    // 开始行的滚动高度
    let firstLineScrollTop = getTopByLine(start);
    // 结束行的滚动高度
    const endLineScrollTop = getTopByLine(
      end + 1 === view.state.doc.lines ? end : end + 1
    );
    let blockHeight = 0;

    // 最后一行距离顶部高度超出了可以滚动的高度，则将当前开始行到最后一个节点视为同一个模块
    if (
      endLineScrollTop > pMaxScrollLength ||
      realEleEnd.offsetTop + realEleEnd.offsetHeight > cMaxScrollLength
    ) {
      const lineNumer = getLineNumber(pMaxScrollLength, cMaxScrollLength);

      const _startEle = document.querySelector<HTMLElement>(`[data-line="${lineNumer}"]`);

      eleStartOffsetTop = _startEle
        ? _startEle.offsetTop - getComputedStyleNum(_startEle, 'margin-top')
        : eleStartOffsetTop;
      firstLineScrollTop = getTopByLine(lineNumer);

      scale = (cScrollTop - eleStartOffsetTop) / (cMaxScrollLength - eleStartOffsetTop);
      blockHeight = pMaxScrollLength - firstLineScrollTop;
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

  const scrollHandler = (e: Event) => {
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
    if (view.state.doc.lines <= blockMap[blockMap.length - 1]?.end) {
      // fix：当删减一个末尾的回车时，同步滚动会失效，因为html没有变化，不会重新绑定事件构建map
      // buildMap();
      return false;
    }

    if (e.target === pEle) {
      pEleHandler();
    } else {
      cEleHandler();
    }

    // 计算位置的函数一般在1ms以内
  };

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
