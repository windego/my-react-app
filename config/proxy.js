const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    createProxyMiddleware('/react', {
      target: 'https://mock.zhangweijie.info/mock/5e8318a175ca572be0b3c729',
      secure: false,
      changeOrigin: true,
      // pathRewrite: {
      //   '^/react': '/management',
      // },
    }),
  );
  app.use(
    createProxyMiddleware('/v2', {
      // target: 'http://127.0.0.1:6678',
      target: 'http://123.56.15.36:6678',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/v2': '/',
      },
    }),
  );
  app.use(
    createProxyMiddleware('/blog', {
      target: 'http://127.0.0.1:8999',
      secure: false,
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware('/noauth', {
      target: 'http://127.0.0.1:7001',
      secure: false,
      changeOrigin: true,
    }),
  );
};
