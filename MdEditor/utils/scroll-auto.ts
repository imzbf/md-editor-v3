import CodeMirrorUt from '~/layouts/Content/codemirror';
import { debounce } from '.';

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
  // 注册一个防抖监听事件函数
  const addEvent = debounce(() => {
    // 宿主绑定事件
    pEle.removeEventListener('scroll', scrollHandler);
    pEle.addEventListener('scroll', scrollHandler);

    // 寄主绑定事件
    cEle.removeEventListener('scroll', scrollHandler);
    cEle.addEventListener('scroll', scrollHandler);
  }, 50);

  const scrollHandler = debounce((e: Event) => {
    const blockInfo = view.lineBlockAtHeight(view.scrollDOM.scrollTop);
    const firstLineInView = view.state.doc.lineAt(blockInfo.from);
    const firstLineScrollTop = view.scrollDOM.scrollTop - blockInfo.top;

    if (e.target === pEle) {
      // 可视区域第一行行号
      const { number: currLine } = firstLineInView;

      // 预览框中带有源行号的元素
      const elesHasLineNumer = Array.from(cEle.children[0].children).filter((item) =>
        item.hasAttribute('data-line')
      ) as HTMLElement[];

      // 找到当前行对应的元素区间
      let startEle: HTMLElement;
      let startLine = 0;
      let endEle: HTMLElement;
      let endLine = 0;
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
        return;
      }

      // 获取开始行到现在已经滚动的距离
      let scrollHeightFromStart = firstLineScrollTop;
      let blockHeightToEnd = 0;

      for (let i = currLine; i > startLine; i--) {
        // 当前循环位置的模块对象
        const forBlock = view.lineBlockAtHeight(
          blockInfo.top - scrollHeightFromStart - 1
        );

        scrollHeightFromStart += forBlock.height;
      }

      for (let i = currLine; i <= endLine; i++) {
        // 当前循环位置的模块对象
        const forBlock = view.lineBlockAtHeight(blockInfo.top + blockHeightToEnd + 1);

        blockHeightToEnd += forBlock.height;
      }
      blockHeightToEnd -= firstLineScrollTop;

      // 计算一个高度比
      const scale = scrollHeightFromStart / (scrollHeightFromStart + blockHeightToEnd);

      const { marginTop: startEleMarginTop } = getComputedStyle(startEle!);
      const startEleOffetTop = startEle!.offsetTop - parseFloat(startEleMarginTop);

      const { marginTop } = getComputedStyle(endEle!);
      const endEleOffetTop = endEle!.offsetTop - parseFloat(marginTop);

      const blockHeight = endEleOffetTop - startEleOffetTop;
      const scrollToTop = startEleOffetTop + blockHeight * scale;

      cEle.scrollTo({
        top: scrollToTop,
        behavior: 'auto'
      });

      addEvent();
    } else {
      //
      // const cScrollTop = cEle.scrollTop;
      // // console.log(cScrollTop);

      // // 预览区域滚动的元素下标
      // let number = 0;

      // const { childNodes } = cEle.childNodes[0];
      // for (let i = 0; i < childNodes.length; i++) {
      //   if (childNodes[i].nodeType === 1) {
      //     const { offsetTop, offsetHeight } = childNodes[i] as HTMLElement;

      //     const { marginBottom } = getComputedStyle(childNodes[i] as HTMLElement, null);
      //     if (offsetTop + offsetHeight + parseFloat(marginBottom) >= cScrollTop) {
      //       break;
      //     }
      //     number++;
      //   }
      // }

      // const { start, end } = relatedList.value[number];

      // // console.log(cScrollTop, number, start, end);

      // const blockInfo = view.lineBlockAtHeight(view.scrollDOM.scrollTop);
      // const firstLineInView = view.state.doc.lineAt(blockInfo.from);

      // if (firstLineInView.number < start) {
      //   // 当前目标内容下面
      // } else if (firstLineInView.number >= start && firstLineInView.number <= end) {
      //   // 当前在目标内容中间
      // } else {
      //   // 当前在目标内容上方
      // }

      // // 获取到当前滚动块
      // console.log('预览滚动');
      // // // 清除宿主监听
      // pEle.removeEventListener('scroll', scrollHandler);
      // // pEle.scrollTo({
      // //   top: cEle.scrollTop * scale
      // //   // behavior: 'smooth'
      // // });
      addEvent();
    }
  }, 2);

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

export default scrollAuto;
