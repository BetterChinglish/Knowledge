# 问题
学到这里, 每次对项目进行修改保存需要看效果时
都需要重新手动输入命令webpack运行打包然后再看效果

这很浪费时间

使用devServer每当修改保存的时候自动进行打包

# 依赖
```node
npm i webpack-dev-server -D
```

# 使用
```
cd uri

webpack serve
```

# 自动刷新
webpack4可以直接自动刷新

webpack5非正式版需要添加webpack.config.js暴露对象添加属性
```js
// ...
target: 'web',
// ...
```
**但是我不知道为啥, 可能版本更新或我陷入了某个bug, 尝试了诸多方法我仍然无法自动刷新**