import CodeMirrorUt from '~/layouts/Content/codemirror';
import { debounce } from '.';
import smoothScroll from './smooth-scroll';

const getOffsetTopWithOutMarginTop = (ele: HTMLElement) => {
  const { marginTop } = getComputedStyle(ele);
  // offsetTop已经被浏览器四舍五入处理，所以对应的mt需要手动处理
  return ele.offsetTop - Math.round(parseFloat(marginTop));
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
const scrollAuto = (
  pEle: HTMLElement,
  cEle: HTMLElement,
  codeMirrorUt: CodeMirrorUt,
  text: string
) => {
  const { view } = codeMirrorUt;

  // 在每次文本变化后，生成所有的行高数据
  let sourceLineHeightMap: Array<{
    lineHeight: number;
    scrollHeight: number;
  }> = [];

  /**
   * 这个方法效仿markdown-it的demo的一部分
   */
  const buildMap = () => {
    // 先清空旧数据
    sourceLineHeightMap = [];

    // 模拟一个codeMirror的环境
    const { width, lineHeight, fontFamily, fontSize, whiteSpace } = getComputedStyle(
      document.querySelector('.cm-content') as HTMLElement
    );
    const tempEle = document.createElement('div');
    tempEle.style.visibility = 'none';
    tempEle.style.zIndex = '-1';
    tempEle.style.width = width;
    tempEle.style.lineHeight = lineHeight;
    tempEle.style.fontFamily = fontFamily;
    tempEle.style.fontSize = fontSize;
    tempEle.style.whiteSpace = whiteSpace;
    document.body.appendChild(tempEle);

    // 累计行高
    let addup = 0;

    text.split('\n').forEach((textRow) => {
      tempEle.innerText = textRow || '-';

      addup += tempEle.offsetHeight;
      const lineData = {
        lineHeight: tempEle.offsetHeight,
        scrollHeight: addup
      };
      sourceLineHeightMap.push(lineData);
    });

    tempEle.remove();
  };

  // 为0时可以重新注册事件，否则不可以
  let pLock = 0;
  let cLock = 0;

  const scrollHandler = debounce((e: Event) => {
    const blockInfo = view.lineBlockAtHeight(view.scrollDOM.scrollTop);
    const firstLineInView = view.state.doc.lineAt(blockInfo.from);

    // 预览框中带有源行号的元素
    const elesHasLineNumer = Array.from(
      cEle.querySelectorAll<HTMLElement>('[data-line]')
    );

    if (e.target === pEle) {
      if (cLock !== 0) {
        return;
      }
      // 加把锁，当前滚动结束后再减掉。
      pLock++;
      // console.log('编辑滚动');

      // 可视区域第一行行号
      const { number: currLine } = firstLineInView;

      // 找到当前行对应的元素区间
      let startEle = cEle.firstElementChild?.firstElementChild as HTMLElement;
      if (!startEle) {
        // 这说明预览区域没有内容
        return;
      }

      let startLine = 1;
      let endEle: HTMLElement =
        elesHasLineNumer.length === 0
          ? (cEle.firstElementChild?.lastElementChild as HTMLElement)
          : elesHasLineNumer[0];
      let endLine =
        elesHasLineNumer.length === 0
          ? sourceLineHeightMap.length
          : Number(elesHasLineNumer[0].dataset.line);

      for (let i = 0; i < elesHasLineNumer.length; i++) {
        const startLine_ = Number(elesHasLineNumer[i].dataset.line) + 1;
        const endLine_ = Number(
          i + 1 >= elesHasLineNumer.length ? -2 : elesHasLineNumer[i + 1].dataset.line
        );
        if (currLine >= startLine_ && currLine <= endLine_) {
          startEle = elesHasLineNumer[i];
          endEle = elesHasLineNumer[i + 1];

          // mdit的行号从0开始
          startLine = startLine_;
          endLine = endLine_;

          break;
        }
      }

      // 计算一个高度比
      let scale = 0;
      // 块结束的滚动高度
      const endEleScrollHeight = sourceLineHeightMap[endLine - 1].scrollHeight;

      // 如果结束块已经在滚动到底部时的可视区了，那么就将当前块到末尾视为一个整体，达到左侧滚动到底部时，右侧同步滚动到底部的目标
      if (
        endEleScrollHeight >
        view.scrollDOM.scrollHeight - view.scrollDOM.clientHeight
      ) {
        endLine = sourceLineHeightMap.length;
        endEle = cEle.firstElementChild?.lastElementChild as HTMLElement;

        // 这个时候的高度比就需要算上可视区域了

        scale =
          (pEle.scrollTop -
            sourceLineHeightMap[startLine - 1].scrollHeight +
            sourceLineHeightMap[startLine - 1].lineHeight) /
          (pEle.scrollHeight -
            sourceLineHeightMap[startLine - 1].scrollHeight +
            sourceLineHeightMap[startLine - 1].lineHeight -
            view.scrollDOM.clientHeight);
      } else {
        scale =
          (view.scrollDOM.scrollTop -
            sourceLineHeightMap[startLine - 1].scrollHeight +
            sourceLineHeightMap[startLine - 1].lineHeight) /
          (sourceLineHeightMap[endLine - 1].scrollHeight -
            sourceLineHeightMap[startLine - 1].scrollHeight +
            sourceLineHeightMap[startLine - 1].lineHeight);
      }

      const { marginTop: startEleMarginTop } = getComputedStyle(startEle);
      const startEleOffetTop = startEle.offsetTop - parseFloat(startEleMarginTop);

      const { marginTop } = getComputedStyle(endEle!);
      const endEleOffetTop = endEle.offsetTop - parseFloat(marginTop);

      const blockHeight = endEleOffetTop - startEleOffetTop;

      // 减去了10的滚动区域paddingTop
      const scrollToTop = startEleOffetTop - 10 + blockHeight * scale;

      smoothScroll(cEle, scrollToTop, () => {
        pLock--;
      });
    } else {
      if (pLock !== 0) {
        return;
      }

      cLock++;
      // console.log('预览滚动');

      // 已经滚动的高度
      const cScrollTop = cEle.scrollTop;
      const cScrollHeight = cEle.scrollHeight;

      // 计算一个可能的行号位置
      let vLineNumber =
        elesHasLineNumer.length === 0
          ? 0
          : Math.floor(
              Number(elesHasLineNumer[elesHasLineNumer.length - 1].dataset.line) *
                (cScrollTop / cScrollHeight)
            );

      // 找到相对这个行号较近的有明确标记的元素
      let vEle = cEle.firstElementChild?.firstElementChild as HTMLElement;
      for (let i = vLineNumber; i >= 0; i--) {
        const vEle_ = cEle.querySelector(`[data-line="${i}"]`) as HTMLElement;

        if (vEle_) {
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
        const vEleNext = elesHasLineNumer[vEleIndex + 1];

        // 判断这个元素是否在可视区域上方，下一个有明确标记的元素是否处于下方
        const vEleOffsetTopWithOutMarginTop = getOffsetTopWithOutMarginTop(vEle);

        if (vEleOffsetTopWithOutMarginTop > cScrollTop) {
          if (vEleIndex === 0) {
            eleStart = vEle!;
            eleEnd = vEleNext;
            break;
          }

          vEle = elesHasLineNumer[vEleIndex - 1];
          continue;
        }

        const vEleNextOffsetTopWithOutMarginTop = getOffsetTopWithOutMarginTop(vEleNext);

        if (
          vEleOffsetTopWithOutMarginTop <= cScrollTop &&
          vEleNextOffsetTopWithOutMarginTop > cScrollTop
        ) {
          eleStart = vEle!;
          eleEnd = vEleNext;
          break;
        }

        vEle = vEleNext;
      }

      // 计算滚动比例
      const eleStartOffsetTopWithOutMarginTop = getOffsetTopWithOutMarginTop(eleStart);
      const eleEndOffsetTopWithOutMarginTop = getOffsetTopWithOutMarginTop(eleEnd);
      const scale =
        (cScrollTop - eleStartOffsetTopWithOutMarginTop + 10) /
        (eleEndOffsetTopWithOutMarginTop - eleStartOffsetTopWithOutMarginTop);

      const startLine = Number(eleStart.dataset.line || 0);
      // 结束行时不包括在当前模块中的
      const endLine = Number(eleEnd.dataset.line || sourceLineHeightMap.length) - 1;

      // 开始行的滚动高度（包括自身高度）
      const firstLineScrollTop = sourceLineHeightMap[startLine].scrollHeight;
      const firstLineHeight = sourceLineHeightMap[startLine].lineHeight;
      // 结束行的滚动高度
      let endLineScrollTop = sourceLineHeightMap[endLine].scrollHeight;

      let blockHeight = 0;
      if (endLineScrollTop > view.scrollDOM.scrollHeight - view.scrollDOM.clientHeight) {
        endLineScrollTop =
          sourceLineHeightMap[sourceLineHeightMap.length - 1].scrollHeight;

        // 8是编辑区的padding
        blockHeight =
          8 + endLineScrollTop - firstLineScrollTop + firstLineHeight - pEle.clientHeight;
      } else {
        // 这个模块的综合高度
        blockHeight = endLineScrollTop - firstLineScrollTop + firstLineHeight;
      }

      smoothScroll(
        pEle,
        firstLineScrollTop - firstLineHeight + blockHeight * scale,
        () => {
          cLock--;
        }
      );
    }
  }, 6);

  return [
    () => {
      buildMap();

      pEle.addEventListener('scroll', scrollHandler, {
        passive: true
      });
      cEle.addEventListener('scroll', scrollHandler, {
        passive: true
      });
      pEle.dispatchEvent(new Event('scroll'));
    },
    () => {
      pEle.removeEventListener('scroll', scrollHandler);
      cEle.removeEventListener('scroll', scrollHandler);
    }
  ];
};

export default scrollAuto;
