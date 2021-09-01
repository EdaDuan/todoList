/*
 * @Description:
 * @Version: 2.0
 * @Autor: duanfy
 * @Date: 2021-08-26 14:01:30
 * @LastEditors: duanfy
 * @LastEditTime: 2021-09-01 11:52:45
 */
import { cacheData } from "../store/cache";
import { CACHE_KEY } from "../common/constant";
import { get } from "../http/index";
import { todoLocalStorage } from "../store/localStorage";
const cache = cacheData();
const getTodoList = async (isLogin) => {
  let data = [];
  if (isLogin) {
    const res = await get("/getTodoList");
    data = res.data ? res.data.data : res;
  } else {
    data = todoLocalStorage();
  }
  cache.set(CACHE_KEY.CACHE_TODO, data);
  return data;
};
export { getTodoList };
