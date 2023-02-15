const isDEV = process.env.NODE_ENV === 'development';

module.exports = {
  // 预设执行顺序由右往左,所以先处理ts,再处理jsx
  presets: ['@babel/preset-react', '@babel/preset-typescript'],
  plugins: [
    isDEV && require.resolve('react-refresh/babel'), // 如果是开发模式,就启动react热更新插件
  ].filter(Boolean),
};
