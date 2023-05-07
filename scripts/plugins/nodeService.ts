import { Plugin, ViteDevServer } from 'vite';
import multiparty from 'multiparty';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('..', import.meta.url));
const LOCAL_IMG_PATH = path.resolve(__dirname, '../../dev/public/temp.local');

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

          form.parse(req, (err, fields, files) => {
            const filename = files.file[0].path
              .replace(/\\/g, '/')
              .split('md-editor-v3/dev/public')[1];

            res.end(
              JSON.stringify({
                code: 0,
                url: filename
              })
            );
          });
        } else {
          next();
        }
      });
    }
  };
};
