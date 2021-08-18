/*
 * @Author: your name
 * @Date: 2021-07-20 09:18:51
 * @LastEditTime: 2021-08-16 17:47:17
 * @LastEditors: duanfy
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/util/getData.js
 */
import { get } from "../../http/index";
//利用js的内存机制 创建缓存池  全局变量不会被回收
var cache = {}; //声明一个缓存池变量
function cacheData() {
  //通过闭包 保证cache不会被GC回收 ,而且能被外界访问
  return {
    set: function (tag, data) {
      //存储新数据
      cache[tag] = data;
    },
    get: async (tag) => {
      //读取数据
      if (tag in cache) {
        return cache[tag];
      } else {
        let res = await get("getTodoList");
        if (res.data.ok) {
          return res.data;
        } else {
          return [];
        }
      }
    },
  };
}
export { cacheData };
