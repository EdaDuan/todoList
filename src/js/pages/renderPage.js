/*
 * @Description:
 * @Version: 2.0
 * @Autor: duanfy
 * @Date: 2021-08-25 10:46:50
 * @LastEditors: duanfy
 * @LastEditTime: 2021-08-30 10:26:15
 */

import { todoList } from "./TDToday";
import { recycleList } from "./TDRecycly";
import { userBtnRender } from "../util/user";
import { handelError } from "../common/handelError";

import { CACHE_KEY } from "../common/constant";
import { get } from "../http/index";
import { todoLocalStorage } from "../store/localStorage";
import CookieUtil from "../store/cookieUtils";
import { cacheData } from "../store/cache";
let cache = cacheData();
const renderPage = async () => {
  let isLogin = CookieUtil.get("ses_token") ? true : false;
  let data = [];
  data = isLogin
    ? (await handelError(get("getTodoList"))).data
    : todoLocalStorage();
  cache.set(CACHE_KEY.CACHE_TODO, data);
  userBtnRender(isLogin);
  todoList(data, isLogin);
  recycleList(isLogin);
};
export { renderPage };
