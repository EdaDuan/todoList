/*
 * @Description:
 * @Version: 2.0
 * @Autor: duanfy
 * @Date: 2021-08-25 10:46:50
 * @LastEditors: duanfy
 * @LastEditTime: 2021-09-01 14:42:41
 */

import { todoList } from "./TDToday";
import { recycleList } from "./TDRecycly";
import { userBtnRender } from "../util/login_register";
import CookieUtil from "../store/cookieUtils";
import { getTodoList } from "../util/getTodoList";
const renderContent = async () => {
  const isLogin = CookieUtil.get("ses_token") ? true : false;
  let data = [];
  data = await getTodoList(isLogin);
  userBtnRender(isLogin);
  todoList(data, isLogin);
  recycleList(isLogin);
};
export { renderContent };
