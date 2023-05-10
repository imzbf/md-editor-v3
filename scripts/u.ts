import fs from 'fs';
import path from 'path';

export const removeDir = (dirpath: string) => {
  if (!fs.existsSync(dirpath)) {
    return;
  }
  const fileList = fs.readdirSync(dirpath);
  fileList.forEach((x) => {
    const p = path.resolve(dirpath, x);
    const pinfo = fs.statSync(p);
    if (pinfo.isFile()) {
      fs.unlinkSync(p);
    } else if (pinfo.isDirectory()) {
      removeDir(p);
    }
  });
  fs.rmdirSync(dirpath);
};
