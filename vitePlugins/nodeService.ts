import { Plugin, ViteDevServer } from 'vite';

export default (): Plugin => {
  return {
    name: 'node-service',
    configureServer: (server: ViteDevServer) => {
      server.middlewares.use((req, res, next) => {
        if (/^\/api\/img\/upload$/.test(req.url)) {
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
