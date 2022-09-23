const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/aladinapi', {
      target: 'http://www.aladin.co.kr/ttb/',
      changeOrigin: true,
      pathRewrite: {
        '^/aladinapi': '',
      },
    })
  );
  app.use(
    createProxyMiddleware('/api', {
      target:
        'http://ec2-54-180-149-200.ap-northeast-2.compute.amazonaws.com:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};
