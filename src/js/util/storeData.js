/*
 * @Author: your name
 * @Date: 2021-07-20 09:18:51
 * @LastEditTime: 2021-07-22 11:23:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/util/getData.js
 */
import { getTodoList } from "../../http";
//利用js的内存机制 创建缓存池  全局变量不会被回收
var cache = {}; //声明一个缓存池变量
const getAsyncData = async () => {
  const resPromise = await new Promise((resolve) => {
    getTodoList().then((res) => {
      if (res.ok) {
        return resolve(res.data);
      } else {
        return resolve([]);
      }
    });
  });
  return resPromise;
};
function cacheData() {
  //通过闭包 保证cache不会被GC回收 ,而且能被外界访问
  return {
    set: function (tag, data) {
      //存储新数据
      cache[tag] = data;
    },
    get: function (tag) {
      //读取数据
      if (tag in cache) {
        console.log("数据已缓存,无需重复请求");
        return cache[tag];
      } else {
        console.log("需重新请求");
        return getAsyncData();
      }
    },
  };
}
export { cacheData };
