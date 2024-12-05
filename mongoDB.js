/* 
 封装DB库操作
 */

// 引入MongoDB 模块
const MongoDB = require("mongodb");
// 引入MongoDB 连接模块
const MongoClient = MongoDB.MongoClient;
// 引入MongoDB ObjectID模块
const ObjectID = MongoDB.ObjectID;
// 引入配置文件
const Config = require("./MongoDB.config.js");

const client = new MongoClient(Config.dbUrl)


class Db {
  // 单例模式，解决多次实例化时候每次创建连接对象不共享的问题，实现共享连接数据库状态
  static getInstance() {
    if (!Db.instance) {
      Db.instance = new Db();
    }
    return Db.instance;
  }
  constructor() {
    // 属性 存放db对象
    this.dbClient = "";
    // 实例化的时候就连接数据库，增加连接数据库速度
    this.connect();
  }
  // 连接数据库
  async connect() {
    if (!this.dbClient) { 
      const c = await client.connect()
      this.dbClient = c.db(Config.dbName);
    }
    return this.dbClient
  }

  /**
   * 查询数据库
   * 使用方法： let result = await DB.find('user',{});
   * @param {String} collectionName 集合名称、数据表名
   * @param {Object} json 查询的条件
   */
  async find(collectionName, json) {
    const db = await this.connect();
    console.log(json)
    return await db.collection(collectionName).find(json).toArray();
  }


  /**
   * 插入数据库
   * 使用方法： let result = await DB.insert('user',{'username':'赵六666','age':30,'sex':'女','status':'2'});
   * @param {String} collectionName 集合名称、数据表名
   * @param {Object} json 插入的新数据
   */
  async insert(collectionName, json) {
    const db = await this.connect();
    await db.collection(collectionName).insertOne(json);
    console.log('插入成功');
  }

  /**
   * 批量插入数据库
   * 使用方法： let result = await DB.insert('user',[{'username':'赵六666','age':30,'sex':'女','status':'2'},{'username':'赵六666','age':30,'sex':'女','status':'2'},{'username':'赵六666','age':30,'sex':'女','status':'2'}...]);
   * @param {String} collectionName 集合名称、数据表名
   * @param {Array} json 批量插入的新数据
   */
  async insertMany(collectionName, arr) {
    const db = await this.connect();
    await db.collection(collectionName).insertMany(arr);
    console.log('插入成功');
  }

  /**
   * 删除数据
   * 使用方法： let result = await DB.remove('user',{'username':'李四'});
   * @param {String} collectionName 集合名称、数据表名
   * @param {Object} json 删除数据的条件
   */
  async remove(collectionName, json) {
    const db = await this.connect();
    await db.collection(collectionName).removeOne(json);
  }

  /**
   * 通过id查询数据时候需要用到此方法，MongoDB里面查询_id ，把字符串转换成对象
   * MongoDB数据库里的_id是自动生成的，通过dind方法查询结果可以看到形式如： {"_id": ObjectId("5aad299bc166236421c99d229")},直接传入5aad299bc166236421c99d229，是查询不到结果的，所以需要包装一下
   * 使用方法： let result = await DB.find('user',{'_id': DB.getObjectID(xxxxx)});
   * @param {String} id 要查询的id
   */
  getObjectID(id) {
    return new ObjectID(id);
  }
}
module.exports = Db.getInstance();



