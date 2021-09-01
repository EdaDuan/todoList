/*
 * @Author: your name
 * @Date: 2021-07-20 09:18:51
 * @LastEditTime: 2021-09-01 11:52:28
 * @LastEditors: duanfy
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/util/getData.js
 */
//利用js的内存机制 创建缓存池  全局变量不会被回收
const cache = {}; //声明一个缓存池变量
function cacheData(arr) {
  //通过闭包 保证cache不会被GC回收 ,而且能被外界访问
  return {
    set: (key, value) => {
      //存储新数据
      cache[key] = value;
    },
    get: (key) => {
      return key in cache ? cache[key] : [];
    },
  };
}
export { cacheData };
