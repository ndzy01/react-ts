# 加入全局的 sass 支持

npm install sass-resources-loader -D
npm install node-sass -S

```js
// 修改 config 文件夾下的 webpack.config.js 文件
{
  test: sassRegex,
  exclude: sassModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 3,
      // TODO: 不注释掉会有问题
      // modules: true, // css-module
      // localIdentName: '[name]-[local]-[hash:base64:5]', // css-module hash
      sourceMap: isEnvProduction && shouldUseSourceMap, // 是否map
    },
    'sass-loader'
  ).concat({
    // 全局的 样式不需要每次 @import
    loader: 'sass-resources-loader',
    options: {
      resources: [
        // 文件路径自选
        path.resolve(__dirname, '../src/styles/global/common.scss'),
      ],
    },
  }),
  sideEffects: true,
},
```

# 加入路由的支持

npm install react-router-dom @types/react-router-dom react-router -S

# 加入网络请求的支持

npm install axios -S

# 加入动态路由支持

# html 样式优化

npm install normalize.css -S

# 加入 antd

npm install antd -S
