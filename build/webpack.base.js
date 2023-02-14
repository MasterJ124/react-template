const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
    filename: 'static/js/[name].js',
    path: path.join(__dirname, '../dist'),
    clean: true,
    publicPath: '/',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
    extensions: ['.js', '.tsx', '.ts'],
  },
  rules: [
    {
      test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
      use: {
        loader: 'babel-loader',
        options: {
          // 预设执行顺序由右往左,所以先处理ts,再处理jsx
          presets: ['@babel/preset-react', '@babel/preset-typescript'],
        },
      },
    },
  ],
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      inject: true,
    }),
  ],
};
