import { marked } from 'marked';

export interface SourceLine {
  start: number;
  end: number;
}

const calcSourceLine = (tokenList: marked.TokensList) => {
  // 计算一下每行开始结束位置
  const sList: SourceLine[] = [];
  let row = 1;

  tokenList.forEach(({ raw }) => {
    const v = {
      start: row,
      end: row
    };

    // 统计有多少个换行
    const inneRowNum = raw.split('\n').length - 1;
    v.end += inneRowNum;
    row += inneRowNum;

    if (raw.trim() !== '') {
      sList.push(v);
    }
  });

  // console.log('sList', sList);

  return sList;
};

export default calcSourceLine;
