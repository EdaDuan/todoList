/*
 * @Author: your name
 * @Date: 2021-06-16 18:17:18
 * @LastEditTime: 2021-08-09 14:48:55
 * @LastEditors: duanfy
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/init.js
 */
import { todoList } from "./components/todoList";
import { recycleList } from "./components/recycleList";
import { navSwitch, navSwitchData } from "./util/navSwitch";
import { newTodoList } from "./util/operation";
import { loginShow } from "./util/login";
import { cacheData } from "./util/storeData";
import CookieUtil from "./util/cookieUtils";
import Toast from "./util/toast";
let cache = cacheData();
import { get } from "../http/index";
// 登陆按钮的DOM
const init = async () => {
  navSwitch();
  // 登陆
  loginShow();
  newTodoList();
  // 初始化时获取cookie值判断是否登陆
  let useTokenCookie = CookieUtil.get("ses_token");
  if (useTokenCookie) {
    try {
      let res = await get("getTodoList");
      res.data.ok
        ? (todoList(res.data.data, true),
          recycleList(true),
          navSwitchData(true),
          // 页面初始化时，将todoList添加到缓存
          cache.set("GET_TODO", res.data.data))
        : Toast.error(res.data.error);
    } catch (error) {
      todoList([], true);
      recycleList(true);
      navSwitchData(true);
      cache.set("GET_TODO", []);
      Toast.error("服务器连接失败");
    }
  } else {
    // 当没有登陆的时候，从本地缓存中获取数据
    let localTodoList = JSON.parse(localStorage.getItem("todoList"))
      ? JSON.parse(localStorage.getItem("todoList"))
      : [];
    todoList(localTodoList, false);
    recycleList(false);
    navSwitchData(false);
  }
};
export { init };
