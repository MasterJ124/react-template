const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

// 合并公共配置,并添加开发环境配置
module.exports = merge(baseConfig, {
  mode: 'development',
  // devtool: 'eval-cheap-module-source-map', // sourceMap调试
  devServer: {
    open: true,
    port: 8888,
    compress: false,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, '../public'),
    },
    proxy: {
      '/api': {
        target: 'http://kolbiz.api.test.netjoy.com',
        pathRewrite: { '^/api': '' },
      },
    },
  },
});
