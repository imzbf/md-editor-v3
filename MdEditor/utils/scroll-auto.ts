import CodeMirrorUt from '~/layouts/Content/codemirror';
import { debounce } from '.';
import smoothScroll from './smooth-scroll';

const getOffsetTopWithOutMarginTop = (ele: HTMLElement) => {
  const { marginTop } = getComputedStyle(ele);
  return ele.offsetTop - parseFloat(marginTop);
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

  // 为0时可以重新注册事件，否则不可以
  let lock = 0;

  // 注册一个防抖监听事件函数
  const addEvent = debounce(() => {
    // 宿主绑定事件
    pEle.removeEventListener('scroll', scrollHandler);
    pEle.addEventListener('scroll', scrollHandler);

    // 寄主绑定事件
    cEle.removeEventListener('scroll', scrollHandler);
    cEle.addEventListener('scroll', scrollHandler);
  }, 50);

  // codeMirror的虚拟滚动可能导致获取不到虚拟区域的正确行高
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

  const scrollHandler = debounce((e: Event) => {
    // 加把锁，当前滚动结束后再减掉。
    lock++;

    const blockInfo = view.lineBlockAtHeight(view.scrollDOM.scrollTop);
    const firstLineInView = view.state.doc.lineAt(blockInfo.from);

    // 预览框中带有源行号的元素
    const elesHasLineNumer = Array.from(cEle.children[0].children).filter((item) =>
      item.hasAttribute('data-line')
    ) as HTMLElement[];

    if (e.target === pEle) {
      // console.log('编辑滚动');
      cEle.removeEventListener('scroll', scrollHandler);

      // 如果到底部了
      if (pEle.scrollTop + pEle.clientHeight >= pEle.scrollHeight) {
        smoothScroll(cEle, cEle.scrollHeight - cEle.clientHeight, () => {
          if (--lock !== 0) {
            return;
          }
          addEvent();
        });
        return;
      }

      // 可视区域第一行行号
      const { number: currLine } = firstLineInView;

      // 找到当前行对应的元素区间
      let startEle = cEle.firstElementChild?.firstElementChild as HTMLElement;
      let startLine = 1;
      let endEle: HTMLElement =
        elesHasLineNumer.length === 0
          ? (cEle.firstElementChild?.lastElementChild as HTMLElement)
          : elesHasLineNumer[0];
      let endLine =
        elesHasLineNumer.length === 0 ? 0 : Number(elesHasLineNumer[0].dataset.line);

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

      // 没有找到目标，不滚动本次
      if (!startEle!) {
        lock--;
        return;
      }

      // 计算一个高度比
      const scale =
        (view.scrollDOM.scrollTop -
          sourceLineHeightMap[startLine - 1].scrollHeight +
          sourceLineHeightMap[startLine - 1].lineHeight) /
        (sourceLineHeightMap[endLine - 1].scrollHeight -
          sourceLineHeightMap[startLine - 1].scrollHeight +
          sourceLineHeightMap[startLine - 1].lineHeight);

      const { marginTop: startEleMarginTop } = getComputedStyle(startEle!);
      const startEleOffetTop = startEle!.offsetTop - parseFloat(startEleMarginTop);

      const { marginTop } = getComputedStyle(endEle!);
      const endEleOffetTop = endEle.offsetTop - parseFloat(marginTop);

      const blockHeight = endEleOffetTop - startEleOffetTop;

      const scrollToTop = startEleOffetTop + blockHeight * scale;

      smoothScroll(cEle, scrollToTop, () => {
        if (--lock !== 0) {
          return;
        }
        // console.log(lock);

        addEvent();
      });
    } else {
      // console.log('预览滚动');
      // 清除宿主监听
      pEle.removeEventListener('scroll', scrollHandler);

      // 如果到顶部了
      if (cEle.scrollTop === 0) {
        smoothScroll(pEle, 0, () => {
          if (--lock !== 0) {
            return;
          }
          addEvent();
        });
        return;
      }
      // 底部
      else if (cEle.scrollTop + cEle.clientHeight >= cEle.scrollHeight) {
        smoothScroll(pEle, pEle.scrollHeight - pEle.clientHeight, () => {
          if (--lock !== 0) {
            return;
          }
          addEvent();
        });
        return;
      }

      // 已经滚动的高度
      const cScrollTop = cEle.scrollTop;
      const cScrollHeight = cEle.scrollHeight;

      // 计算一个可能的行号位置
      let vLineNumber = Math.floor(
        Number(elesHasLineNumer[elesHasLineNumer.length - 1].dataset.line) *
          (cScrollTop / cScrollHeight)
      );

      // 找到相对这个行号较近的有明确标记的元素
      let vEle: HTMLElement;
      for (let i = vLineNumber; i >= 0; i--) {
        const vEle_ = cEle.querySelector(`[data-line="${i}"]`) as HTMLElement;

        if (vEle_) {
          vEle = vEle_;
          vLineNumber = i;
          break;
        }
      }

      // 没有找到目标，不滚动本次
      if (!vEle!) {
        lock--;
        return;
      }

      // 寻找真实的开始和结束节点
      let eleStart: HTMLElement;
      let eleEnd: HTMLElement;

      for (;;) {
        const vEleIndex = elesHasLineNumer.indexOf(vEle!);
        const vEleNext = elesHasLineNumer[vEleIndex + 1];

        // 判断这个元素是否在可视区域上方，下一个有明确标记的元素是否处于下方
        const vEleOffsetTopWithOutMarginTop = getOffsetTopWithOutMarginTop(vEle!);

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
        (cScrollTop - eleStartOffsetTopWithOutMarginTop) /
        (eleEndOffsetTopWithOutMarginTop - eleStartOffsetTopWithOutMarginTop);

      const startLine = Number(eleStart.dataset.line);
      const endLine = Number(eleEnd.dataset.line);

      // 开始行的滚动高度
      const firstLineScrollTop = sourceLineHeightMap[startLine].scrollHeight;
      // 结束行的滚动高度
      const endLineScrollTop = sourceLineHeightMap[endLine].scrollHeight;
      // 这个模块的综合高度
      const blockHeight = endLineScrollTop - firstLineScrollTop;

      smoothScroll(pEle, firstLineScrollTop + blockHeight * scale, () => {
        if (--lock !== 0) {
          return;
        }
        addEvent();
      });
    }
  }, 6);

  return [
    () => {
      buildMap();
      addEvent().finally(() => {
        pEle.dispatchEvent(new Event('scroll'));
      });
    },
    () => {
      lock = 0;
      // buildMap();
      pEle.removeEventListener('scroll', scrollHandler);
      cEle.removeEventListener('scroll', scrollHandler);
    }
  ];
};

export default scrollAuto;
