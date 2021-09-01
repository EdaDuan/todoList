/*
 * @Description:
 * @Version: 2.0
 * @Autor: duanfy
 * @Date: 2021-08-31 11:01:12
 * @LastEditors: duanfy
 * @LastEditTime: 2021-08-31 11:05:06
 */
// 抽离成公共获取值和错误的方法
const handelResult = (promise) => {
  return promise.then((data) => [null, data.data]).catch((err) => [err, null]);
};
export { handelResult };
