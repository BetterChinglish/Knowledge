



# docker

## 推送相关

假设已经在 Docker Hub 创建了仓库（比如 `betterchinglish/mydb`），而你本地的容器名字或镜像名不同，完整流程如下：

1. **找到你的容器 ID**
```shell
docker ps
```
注意显示的container id可能是截取后的，可以打开docker desktop查看完整的容器 ID并点击复制按钮复制


2. **将容器提交为镜像**  
   假设容器 ID 为 `abc123`，提交为本地镜像（比如叫 `local-mysql`）：
```shell
docker commit abc123 local-mysql:latest
```

3. **给镜像打标签，改成你 Docker Hub 仓库名**
```shell
docker tag local-mysql:latest betterchinglish/mydb:latest
```

4. **登录 Docker Hub**
```shell
docker login
```

5. **推送镜像到 Docker Hub**
```shell
docker push betterchinglish/mydb:latest
```

这样就能把你的容器内容上传到指定仓库，无需本地镜像名和仓库名一致。


## docker代理设置

1. 打开docker desktop
2. 点击右上角设置图标
3. 点击左侧resources
4. 点击proxies
5. 打开proxy
6. http与https两个输入框输入http://127.0.0.1:7890(注意端口写一下自己对应的)