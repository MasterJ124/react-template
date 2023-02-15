const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(baseConfig, {
  mode: 'production', // 生产模式 开启tree-shaking和压缩代码,以及其他优化
  optimization: {
    splitChunks: {
      // 代码分割
      cacheGroups: {
        vendors: {
          test: /node_modules/, // 只匹配node_modules里面的模块
          name: 'vendors',
          minChunks: 1,
          chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0,
          priority: 1, // 提取优先级为1
        },
        commons: {
          name: 'commons', // 公共模块
          minChunks: 2,
          chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0,
        },
      },
    },
    minimizer: [
      new CssMinimizerPlugin(), // 压缩css
      new TerserPlugin({
        // 压缩js
        parallel: true, // 开启多线程压缩
        terserOptions: {
          compress: {
            drop_debugger: true, // 删除debugger
            pure_funcs: ['console.log'], // 删除console.log
          },
        },
      }),
      new CompressionPlugin({
        test: /.(js|css)$/, // 只生成css,js压缩文件
        filename: '[path][base].gz',
        algorithm: 'gzip',
        threshold: 10240,
        minRatio: 0.8, // 压缩率,默认值是 0.8
      }),
    ],
  },
});
