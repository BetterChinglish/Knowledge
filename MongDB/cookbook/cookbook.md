# 基本

## 数据库
存放集合

## 集合
存放文档，类比sql的表

## 文档
表中的一条数据，类比sql的行


# 操作

## 查看数据库

```sql
show databases;
```

## 使用(切换)数据库
use database_name;
```sql
use user;
```

## 查看集合
类似查看有哪些表
```sql
show collections;
```

## 查看集合中的文档
类似查看表中有哪些行数据

use database_name 切换数据库后

可以使用db.collection_name.find()查看集合中的文档, 其中db、find固定, collection_name替换为具体的集合名称

```sql
db.collection_name.find();
```

## 插入一条数据
使用use database_name 切换数据库后

使用db.collection_name.insertOne({key1: value1, key2: value2, ...})插入一条数据

其中db、insertOne固定, collection_name替换为具体的集合名称, {key1: value1, key2: value2, ...}替换为具体的键值对数据
```sql
db.collection_name.insertOne({key1: value1, key2: value2, ...});
```


## 插入多条数据
使用use database_name 切换数据库后

使用db.collection_name.insertMany([{key1: value1, key2: value2, ...}, {key1: value1, key2: value2, ...}, ...])插入多条数据
其中db、insertMany固定, collection_name替换为具体的集合名称, [{key1: value1, key2: value2, ...}, {key1: value1, key2: value2, ...}, ...]替换为具体的多条键值对数据
```sql
db.collection_name.insertMany([{key1: value1, key2: value2, ...}, {key1: value1, key2: value2, ...}, ...]);
```
