/*
 * @Description:
 * @Version: 2.0
 * @Autor: duanfy
 * @Date: 2021-08-26 14:01:30
 * @LastEditors: duanfy
 * @LastEditTime: 2021-08-30 10:26:16
 */
import { cacheData } from "../store/cache";
import { CACHE_KEY } from "../common/constant";
import { todoLocalStorage } from "../store/localStorage";
let cache = cacheData();
const getTodoList = (isLogin) => {
  return isLogin ? cache.get(CACHE_KEY.CACHE_TODO) : todoLocalStorage();
};
export { getTodoList };
