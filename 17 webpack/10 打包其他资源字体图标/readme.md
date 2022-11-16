# 使用file-loader
```js
{
    // 排除已经处理过的资源
    exclude:/\.(jpg|png|gif|html|css|less|scss|js)$/,
    loader:'file-loader',
    options: {
        publicPath: './other/',
        outputPath: 'other/',
        name:'[name][hash:8].[ext]',
        limit: 1024 * 64
    }
}

```

# 注意
file-loader已经被asset替代
所以这里没有演示