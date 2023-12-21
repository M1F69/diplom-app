
const PROXY_CONFIG = {
  '/api': {
    target: "http://localhost:5133/",
    secure: false,
    logLevel: 'debug',
    changeOrigin: true,
    pathRewrite: {
      "^/api": ""
    }
  },
};

module.exports = PROXY_CONFIG;
