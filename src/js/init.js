/*
 * @Author: your name
 * @Date: 2021-06-16 18:17:18
 * @LastEditTime: 2021-07-30 11:57:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/init.js
 */
import { todoList } from "./components/todoList";
import { recycleList } from "./components/recycleList";
import { navSwitchData } from "./util/navSwitch";
import { getTodoList } from "../http/api";
import { cacheData } from "./util/storeData";
import CookieUtil from "./util/cookieUtils";
import Toast from "./util/toast";
let cache = cacheData();
// 登陆按钮的DOM
const init = () => {
  // 初始化时获取cookie值判断是否登陆
  let useTokenCookie = CookieUtil.get("ses_token");
  if (useTokenCookie) {
    getTodoList()
      .then((res) => {
        // 当登陆的时候，从数据库获取数据
        res.ok
          ? (todoList(res.data, true),
            recycleList(true),
            navSwitchData(true),
            // 页面初始化时，将todoList添加到缓存
            cache.set("GET_TODO", res.data))
          : Toast.error(res.error);
      })
      .catch(() => {
        todoList([], true);
        recycleList(true);
        navSwitchData(true);
        cache.set("GET_TODO", []);
        Toast.error("服务器连接失败");
      });
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
