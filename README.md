# Docker + mongoDB + mongo-express + koa2
Docker 快速部署本地mongoDB 服务
nodejs + koa2 快速操作本地mongoDB服务

## Docker 部署 mongoDB + mongo-express 可视化UI
  `docker-compose up -d` 部署 mongoDB 部署完成

## 配套简单 koa2 + mongoDB 访问数据库
  `npm run dev` 启动服务

## 打包本地项目到docker
  `docker build -t mongo-node .\Dockerfile`

## 启动node
  `docker run -p 3000:3000 mongo-node`

## <font color="red">注意</font>
 `docker-compose.yml` 中用户名与密码请自行替换

 `docker-compose.yml` 扩展请参考 mongoDB 官方文档

 默认会在本项目下创建`data`文件夹，用于存储数据，若链接全局DB 请自行制定-V 路径，需注意 用户问题

`mongoDB.config.js`中的 `dbUrl`、`dbName` 自行替换

项目中使用的`tag`为最新 实际对应 `mongoDB` 版本 `6.0.5`