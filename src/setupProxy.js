const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: process.env.REACT_APP_SERVER_ADDRESS,
      changeOrigin: true,
    }),
  );

  app.use(
    createProxyMiddleware("/redis", {
      target: process.env.REACT_APP_SERVER_ADDRESS,
      changeOrigin: true,
    }),
  );
};
