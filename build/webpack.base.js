const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    path: path.join(__dirname, '../dist'),
    clean: true,
    publicPath: process.env.REACT_PUBLIC_PATH,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
    extensions: ['.js', '.tsx', '.ts'],
  },
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        use: 'babel-loader',
      },
      {
        test: /.(css|less)$/, //匹配 css和less 文件
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: 'static/images/[name].[contenthash:8][ext]',
        },
      },
      {
        test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: 'static/fonts/[name].[contenthash:8][ext]',
        },
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: 'static/media/[name].[contenthash:8][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      inject: true,
    }),
    new ReactRefreshWebpackPlugin(), // 热更新插件
  ],
};
