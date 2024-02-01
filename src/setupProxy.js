const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  if (process.env.REACT_APP_NODE_ENV === 'development') {
    app.use(
      createProxyMiddleware("/api", {
        target: process.env.REACT_APP_SERVER_ADDRESS,
        withCredentials: true,
        changeOrigin: true,
      }),
    );

    app.use(
      createProxyMiddleware("/redis", {
        target: process.env.REACT_APP_SERVER_ADDRESS,
        withCredentials: true,
        changeOrigin: true,
      }),
    );
  }
};

