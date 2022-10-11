# 安装-json-server

npm install -g json-server

# 创建db.json文件
```json
{
    "posts":[
        {
            "id":1,
            "title":"json-server",
            "author":"typicode"
        }
    ],
    "comments":[
        {
            "id":1,
            "body":"some comment",
            "postId":1
        }
    ],
    "profile":{
        "name":"typicode"
    }
}


```


# 运行json-server

路径应当处于db.json这层目录中

json-server --watch db.json

或 
json-server --watch ......./db.json
最后这个对应你需要运行的db.json文件



# 查看

出现Resources三个连接
随意点击一个查看
发现正是db.json中添加的三个:posts, comments, profile

可以在  http://localhost:3000/posts   后加/1, 
即可查看posts后id=1的内容

可见db.json的格式应该如下(个人的简单猜测,具体看github的-json-server文档)
```json
{
    "name1":[
        {
            "id": num,
            "para2": "value2",
            // ...
        },
        {
            "id":num,
            "para":"value"
        },
        {},
        // ...
    ],

    "name2":[
        {
            //
        },
        {
            //
        },
        // ...
    ],

    // ...
}
```

