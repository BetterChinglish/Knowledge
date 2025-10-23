# 安装npm工具

是node.js默认的软件包管理系统

安装node后默认安装好npm

## 查看是否安装过node
```
node --version
或
node -v
```

## 查看npm版本
```
npm -v
```

## 安装npm(更新)
```
npm install npm -g


```

## -g
-g表示global, 全局安装, 并不只是该文件夹下安装
这种方式安装后在其他地方也可以使用
如果不添加-g则只在当前文件夹下安装

-g是简写, 完整写法为  --global

# npm安装的设置

npm服务器可能在国外, 下载速度很慢

可以使用国内的一些镜像服务器

例如使用淘宝镜像:
```
npm config set registry https://registry.npm.taobao.org
npm config set registry https://registry.npm.taobao.org --global
```

## 查看当前npm服务地址

```
npm config get registry
```
## 设置代理
```
本地clash代理
npm config set proxy="http://127.0.0.1:7890"
```
## 使用nrm工具切换淘宝源
```
下载nrm:
npm install -g nrm

查看镜像列表
nrm ls

切换镜像
npx nrm use registryName

测试镜像的响应速度
nrm test registryName
```

# npm的使用
```
安装
npm install (-g) moduleName

安装指定版本
npm i -g moduleName@3.0.0

查看已经全局安装模块
npm list -g

查看某个模块的版本号
npm list moduleName (-g)    不加-g则在当前路径查找

```

# 开发时依赖与运行时依赖
```
将module作为开发时依赖安装
npm i --save-dev moduleName

--save
默认, 运行时依赖
简写为-s

--save-dev
说明是开发需要的, 运行时(发布时)用不到
简写为-D
```