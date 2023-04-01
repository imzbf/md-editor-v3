import { Ref } from 'vue';
import CodeMirrorUt from '~/layouts/Content/codemirror';
import { SourceLine } from '~/layouts/Content/marked/calcSourceLine';
import { debounce } from '.';

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
  relatedList: Ref<SourceLine[]>,
  codeMirrorUt: CodeMirrorUt
) => {
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

    // console.log(firstLineInView, blockInfo.height, firstLineScrollTop);

    // const cmLines = document.querySelectorAll<HTMLDivElement>('.cm-line');

    // const pHeight = pEle.clientHeight;
    // const cHeight = cEle.clientHeight;

    // const pScrollHeight = pEle.scrollHeight;
    // const cScrollHeight = cEle.scrollHeight;

    if (e.target === pEle) {
      // ====================
      // for (let i = 0; i < cmLines.length; i++) {
      //   currLineNum = i;

      //   // console.log('accHeight', accHeight, 'pEle.scrollTop', pEle.scrollTop);

      //   if (cmLines[i].offsetTop > pEle.scrollTop) {
      //     // console.log(cmLines[i]);
      //     break;
      //   }
      // }

      // console.log('currLineNum', currLineNum);

      // 可视区域第一行行号
      const { number } = firstLineInView;

      // 预览框
      const childBlockNodes = Array.from(cEle.childNodes[0].childNodes).filter(
        (item) => item.nodeType === 1
      );

      // 预览区域滚动元素
      let cScrollNode = null;
      // 滚动元素的下一个元素，计算margin重叠
      let cNextScrollNode = null;
      let lineStart = number;
      let lineEnd = number;

      for (let i = 0; i < relatedList.value.length; i++) {
        const { start, end } = relatedList.value[i];
        // // 把当前结束位置定位到下一个开始位置，末尾取自己结束
        const vend =
          i + 1 >= relatedList.value.length ? end : relatedList.value[i + 1].start - 1;

        if (number >= start && number <= vend) {
          cScrollNode = childBlockNodes[i];
          cNextScrollNode = childBlockNodes[i + 1];
          lineStart = start;
          lineEnd = vend;
        }
      }

      // 当前模块滚动隐藏的高度
      let blockHeightToStart = 0;
      // console.log('=mdBlockHeight', lineEnd, mdBlockHeight);

      // console.log(lineStart, lineEnd);

      for (;;) {
        // 当前循环位置的模块对象
        const forBlock = view.lineBlockAtHeight(blockInfo.top - blockHeightToStart - 1);
        // 获取到行号
        const { number } = view.state.doc.lineAt(forBlock.from);

        // console.log('=number', lineEnd, mdBlockHeight, number);
        // console.log(
        //   'number',
        //   number,
        //   forBlock.height,
        //   'lineStart',
        //   lineStart,
        //   'blockHeightToStart',
        //   blockHeightToStart
        // );

        // 如果行号与开始相同，则已取得了大模块开始距离滚动位置的距离
        if (number < lineStart) {
          // console.log(
          //   'number',
          //   number,
          //   forBlock.height,
          //   'blockHeightToStart',
          //   blockHeightToStart
          // );

          break;
        } else if (number === lineStart) {
          if (number !== firstLineInView.number) blockHeightToStart += forBlock.height;

          break;
        }

        blockHeightToStart += forBlock.height;
      }

      // 将距离结束位置设置为当前行的高度
      let blockHeightToEnd = blockInfo.height;
      // console.log(blockInfo.height, firstLineScrollTop);

      // console.log('==================');
      for (let i = 0; ; i++) {
        const forBlock = view.lineBlockAtHeight(blockInfo.top + blockHeightToEnd + 1);
        const { number } = view.state.doc.lineAt(forBlock.from);

        if (number > lineEnd) {
          // console.log('=number', number, 'blockHeightToEnd', blockHeightToEnd);

          // console.log('===i', i);
          // if (i === 0) {
          //   blockHeightToEnd = 0;
          // }
          break;
        } else if (number === lineStart) {
          if (number !== firstLineInView.number) blockHeightToEnd += forBlock.height;

          break;
        }

        blockHeightToEnd += forBlock.height;
      }

      const blockHeight = blockHeightToStart + blockHeightToEnd;

      // console.log('blockHeight', blockHeightToStart, blockHeightToEnd);

      // console.log(
      //   '==',
      //   blockInfo.top,
      //   mdBlockHeight,
      //   view.state.doc.lineAt(view.lineBlockAtHeight(blockInfo.top + mdBlockHeight).from)
      //     .number
      // );

      // 计算一个高度比
      const scale = (blockHeightToStart + firstLineScrollTop) / blockHeight;

      // console.log(blockHeightToStart, firstLineScrollTop, blockHeight);

      // console.log(lineEnd, view.lineBlockAt(lineEnd));

      // console.log('currLineNum', number, cScrollNode?.offsetTop);
      // ====================

      // 清除寄主监听
      cEle.removeEventListener('scroll', scrollHandler);

      if (cScrollNode) {
        const { height, marginTop, marginBottom, paddingTop, paddingBottom } =
          getComputedStyle(cScrollNode as HTMLElement);

        let cNextScrollNodeMarginTop = '0';

        if (cNextScrollNode) {
          cNextScrollNodeMarginTop = getComputedStyle(
            cNextScrollNode as HTMLElement
          ).marginTop;
        }

        // console.log('cNextScrollNodeMarginTop', cNextScrollNodeMarginTop);

        const nodeHeight =
          parseFloat(height) +
          parseFloat(marginTop) +
          parseFloat(marginBottom) +
          parseFloat(paddingTop) +
          parseFloat(paddingBottom) -
          parseFloat(cNextScrollNodeMarginTop);
        const scrollToTop =
          (cScrollNode as HTMLElement).offsetTop -
          parseFloat(marginTop) +
          nodeHeight * scale;

        // console.log((cScrollNode as HTMLElement).offsetTop, marginTop, nodeHeight, scale);

        cEle.scrollTo({
          top: scrollToTop,
          behavior: 'auto'
        });
      }

      // console.log('relatedList', [...relatedList.value]);

      addEvent();
    } else {
      //
      const cScrollTop = cEle.scrollTop;
      // console.log(cScrollTop);

      // 预览区域滚动的元素下标
      let number = 0;

      const { childNodes } = cEle.childNodes[0];
      for (let i = 0; i < childNodes.length; i++) {
        if (childNodes[i].nodeType === 1) {
          const { offsetTop, offsetHeight } = childNodes[i] as HTMLElement;

          const { marginBottom } = getComputedStyle(childNodes[i] as HTMLElement, null);
          if (offsetTop + offsetHeight + parseFloat(marginBottom) >= cScrollTop) {
            break;
          }
          number++;
        }
      }

      const { start, end } = relatedList.value[number];

      // console.log(cScrollTop, number, start, end);

      const blockInfo = view.lineBlockAtHeight(view.scrollDOM.scrollTop);
      const firstLineInView = view.state.doc.lineAt(blockInfo.from);

      if (firstLineInView.number < start) {
        // 当前目标内容下面
      } else if (firstLineInView.number >= start && firstLineInView.number <= end) {
        // 当前在目标内容中间
      } else {
        // 当前在目标内容上方
      }

      // 获取到当前滚动块
      console.log('预览滚动');
      // // 清除宿主监听
      pEle.removeEventListener('scroll', scrollHandler);
      // pEle.scrollTo({
      //   top: cEle.scrollTop * scale
      //   // behavior: 'smooth'
      // });
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
