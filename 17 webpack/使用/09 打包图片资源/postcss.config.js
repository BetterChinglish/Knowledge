module.exports = {
    plugins: [
        // require后立即()调用, 这里会自动寻找package.json文件中的browserlist
        // browserlist规定兼容哪些浏览器, 根据这里的说明进行兼容性配置
        require('postcss-preset-env')()
    ]
}