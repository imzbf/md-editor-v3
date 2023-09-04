import { debounce, throttle, createSmoothScroll } from '@vavt/util';
import CodeMirrorUt from '~/layouts/Content/codemirror';

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

  // /**
  //  * 这个方法效仿markdown-it的demo的一部分
  //  */
  const buildMap = () => {
    blockMap = [];

    // 预览框中带有源行号的元素
    const startLines = Array.from(cEle.querySelectorAll<HTMLElement>('[data-line]')).map(
      (item) => Number(item.dataset.line) + 1
    );

    const { lines } = view.state.doc;

    let start = 1;
    let end = startLines.shift() ?? lines;

    for (let i = 1; i <= lines; i++) {
      if (i === end) {
        start = i;
        end = startLines.shift() || lines + 1;
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

  const scrollHandler = throttle((e: Event) => {
    if (!cEle.firstElementChild?.firstElementChild) {
      return;
    }

    const blockInfo = view.lineBlockAtHeight(view.scrollDOM.scrollTop);
    // 可视区域第一行行号
    const { number: currLine } = view.state.doc.lineAt(blockInfo.from);

    if (currLine > blockMap.length) {
      return;
    }

    // 可能是修改文本之前引发的滚动，判断后消除
    if (view.state.doc.lines < blockMap[blockMap.length - 1].end) {
      return;
    }

    // 预览区域paddingTop
    let cElePaddingTop = +getComputedStyle(cEle).paddingTop.replace('px', '');
    const cElePaddingBottom = +getComputedStyle(cEle).paddingBottom.replace('px', '');

    if (e.target === pEle) {
      if (cLock !== 0) {
        return;
      }
      // 加把锁，当前滚动结束后再减掉。
      pLock++;

      const blockData = blockMap[currLine - 1];

      let endLinePosition = getTopByLine(blockData.end) + getHeightByLine(blockData.end);

      // 计算一个高度比
      let scale = 0;
      const startTop = getTopByLine(blockData.start);

      const startEle: HTMLElement =
        cEle.querySelector<HTMLElement>(`[data-line="${blockData.start - 1}"]`) ||
        (cEle.firstElementChild?.firstElementChild as HTMLElement);
      const endEle: HTMLElement =
        cEle.querySelector<HTMLElement>(`[data-line="${blockData.end}"]`) ||
        (cEle.lastElementChild?.lastElementChild as HTMLElement);

      let blockHeight = 0;
      let startEleOffetTop = 0;

      if (startTop === 0) {
        if (startEle === endEle) {
          // 开始结束相同时，需要将padding算入滚动区域
          cElePaddingTop = 0;
          endLinePosition = view.contentDOM.offsetHeight - view.scrollDOM.offsetHeight;

          scale = view.scrollDOM.scrollTop / endLinePosition;
          // 如果开始和结束节点相同，则需要将这个节点的高度也算进滚动区域
          blockHeight = endEle.offsetTop + endEle.offsetHeight - cEle.clientHeight;
        } else {
          scale = view.scrollDOM.scrollTop / endLinePosition;
          // 如果开始和结束节点相同，则需要将这个节点的高度也算进滚动区域
          blockHeight = endEle.offsetTop;
        }
      }
      // 如果结束块已经在滚动到底部时的可视区了，那么就将当前块到末尾视为一个整体，达到左侧滚动到底部时，右侧同步滚动到底部的目标
      else if (
        endLinePosition >
        view.scrollDOM.scrollHeight - view.scrollDOM.clientHeight
      ) {
        scale =
          (view.scrollDOM.scrollTop - startTop) /
          (view.scrollDOM.scrollHeight - view.scrollDOM.clientHeight - startTop);

        startEleOffetTop = startEle.offsetTop;
        blockHeight = cEle.scrollHeight - cEle.clientHeight - startEleOffetTop + 10;
      } else {
        scale = (view.scrollDOM.scrollTop - startTop) / (endLinePosition - startTop);

        startEleOffetTop = startEle.offsetTop;
        const endEleOffetTop = endEle.offsetTop;
        blockHeight = endEleOffetTop - startEleOffetTop;
      }

      const scrollToTop = startEleOffetTop - cElePaddingTop + blockHeight * scale;

      smoothScroll(cEle, scrollToTop, () => {
        pLock--;
      });
    } else {
      if (pLock !== 0) {
        return;
      }
      cLock++;

      // 预览框中带有源行号的元素
      const elesHasLineNumer = Array.from(
        cEle.querySelectorAll<HTMLElement>('[data-line]')
      );

      // 已经滚动的高度
      const cScrollTop = cEle.scrollTop;
      const cScrollHeight = cEle.scrollHeight;
      // 可能的行号位置
      let vLineNumber =
        elesHasLineNumer.length === 0
          ? 1
          : Math.ceil(
              Number(elesHasLineNumer[elesHasLineNumer.length - 1].dataset.line) *
                (cScrollTop / cScrollHeight)
            );

      // 找到相对这个行号较近的有明确标记的元素
      let vEle = cEle.firstElementChild?.firstElementChild as HTMLElement;
      for (let i = vLineNumber; i >= 0; i--) {
        const vEle_ = cEle.querySelector<HTMLElement>(`[data-line="${i}"]`);
        if (vEle_ && vEle_.offsetTop <= cScrollTop) {
          vEle = vEle_;
          vLineNumber = i;
          break;
        }
      }
      // 寻找真实的开始和结束节点
      let eleStart = cEle.firstElementChild?.firstElementChild as HTMLElement;
      let eleEnd = cEle.firstElementChild?.lastElementChild as HTMLElement;
      for (; elesHasLineNumer.length > 0; ) {
        const vEleIndex = elesHasLineNumer.indexOf(vEle);

        // 左边没有滚动条，右边有滚动条，可能会出现找不到vEleNext
        if (vEleIndex + 1 >= elesHasLineNumer.length) {
          break;
        }

        const vEleNext = elesHasLineNumer[vEleIndex + 1];

        if (vEleIndex === -1) {
          eleEnd = vEleNext;
          break;
        }

        // 判断这个元素是否在可视区域上方，下一个有明确标记的元素是否处于下方
        const vEleOffsetTop = vEle.offsetTop;
        if (vEleOffsetTop > cScrollTop) {
          if (vEleIndex === 0) {
            eleStart = vEle!;
            eleEnd = vEleNext;
            break;
          }
          vEle = elesHasLineNumer[vEleIndex - 1];
          continue;
        }
        const vEleNextOffsetTop = vEleNext.offsetTop;
        if (vEleOffsetTop <= cScrollTop && vEleNextOffsetTop > cScrollTop) {
          eleStart = vEle!;
          eleEnd = vEleNext;
          break;
        }
        vEle = vEleNext;
      }

      // 计算滚动比例
      const eleStartOffsetTop = eleStart.offsetTop;
      let eleEndOffsetTop = eleEnd.offsetTop;

      let scale = 0;

      const { start, end } = blockMap[Number(eleStart.dataset.line || 0)];
      // 开始行的滚动高度（包括自身高度）
      const firstLineScrollTop = getTopByLine(start);
      // 结束行的滚动高度
      let endLineScrollTop = getTopByLine(end);
      const endLineHeight = getHeightByLine(end);
      let blockHeight = 0;

      if (eleStart === cEle.firstElementChild?.firstElementChild) {
        if (eleStart === eleEnd) {
          eleEndOffsetTop =
            eleEnd.offsetHeight - cEle.offsetHeight + cElePaddingTop + cElePaddingBottom;
          blockHeight = view.contentDOM.offsetHeight - view.scrollDOM.offsetHeight;
        } else {
          blockHeight = endLineScrollTop + endLineHeight - firstLineScrollTop;
        }

        scale = Math.max(cScrollTop / eleEndOffsetTop, 0);
      } else if (
        endLineScrollTop >
        view.scrollDOM.scrollHeight - view.scrollDOM.clientHeight
      ) {
        scale = Math.max(
          (cScrollTop - eleStartOffsetTop) /
            (cEle.scrollHeight - eleStartOffsetTop - cEle.clientHeight),
          0
        );

        endLineScrollTop =
          getTopByLine(view.state.doc.lines) + getHeightByLine(view.state.doc.lines);
        // 8是编辑区的padding
        blockHeight = 8 + endLineScrollTop - firstLineScrollTop - pEle.clientHeight;
      } else {
        scale = Math.max(
          (cScrollTop - eleStartOffsetTop) / (eleEndOffsetTop - eleStartOffsetTop),
          0
        );
        // 这个模块的综合高度
        blockHeight = endLineScrollTop + endLineHeight - firstLineScrollTop;
      }

      smoothScroll(pEle, firstLineScrollTop + blockHeight * scale, () => {
        cLock--;
      });
    }
  }, 10);

  return [
    () => {
      buildMap();

      pEle.addEventListener('scroll', scrollHandler);
      cEle.addEventListener('scroll', scrollHandler);

      pEle.dispatchEvent(new Event('scroll'));
    },
    () => {
      blockMap = [];
      pEle.removeEventListener('scroll', scrollHandler);
      cEle.removeEventListener('scroll', scrollHandler);
    }
  ];
};

export default scrollAuto;
