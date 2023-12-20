
const PROXY_CONFIG = {
  '/api': {
    target: "http://84.54.44.140/",
    secure: false,
    logLevel: 'debug',
    changeOrigin: true,
  },
};

module.exports = PROXY_CONFIG;
