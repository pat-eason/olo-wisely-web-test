module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Wisely Test";
      return args;
    });
  },
  configureWebpack: (config) => {
    config.watchOptions = {
      ignored: /node_modules/,
      aggregateTimeout: 300,
      poll: 500,
    };
  },
};
