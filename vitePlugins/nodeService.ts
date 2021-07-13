import { Plugin, ViteDevServer } from 'vite';
import multiparty from 'multiparty';
import fs from 'fs';
import path from 'path';

const LOCAL_IMG_PATH = path.resolve(__dirname, '../temp.local');

export default (): Plugin => {
  return {
    name: 'node-service',
    configureServer: (server: ViteDevServer) => {
      server.middlewares.use(async (req, res, next) => {
        if (/^\/api\/img\/upload$/.test(req.url)) {
          if (!fs.existsSync(LOCAL_IMG_PATH)) {
            fs.mkdirSync(LOCAL_IMG_PATH);
          }

          const form = new multiparty.Form({
            uploadDir: LOCAL_IMG_PATH
          });

          form.parse(req, (_, __, files) => {});

          res.end(
            JSON.stringify({
              code: 0,
              url: 'https://art-1252753142.cos.ap-chengdu.myqcloud.com/2021/06301522413082599421018280471.png'
            })
          );
        } else {
          next();
        }
      });
    }
  };
};
