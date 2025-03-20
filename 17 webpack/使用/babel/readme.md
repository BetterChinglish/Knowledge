# install
```js
npm install -D babel-loader @babel/core @babel/preset-env
```

# usage
example:
```js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,  // 排除
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-object-rest-spread'],
        },
      },
    },
  ];
}

```
detail: webpack official document



