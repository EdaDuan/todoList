/*
 * @Author: your name
 * @Date: 2021-06-16 18:17:18
 * @LastEditTime: 2021-07-19 00:06:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/init.js
 */
import { todoList } from "./components/todoList";
import { recycleList } from "./components/recycleList";
import { newTodoList } from "./util/operation";
import { loginShow } from "./util/login";
import { getData } from "../http";
import CookieUtil from "./util/cookieUtils";
// 登陆按钮的DOM
const init = () => {
  let useMsgCookie = CookieUtil.get("ses_token");
  // 登陆
  loginShow();
  newTodoList();
  if (useMsgCookie) {
    getData().then((res) => {
      // 初始化DOM
      // 当登陆的时候，从数据库获取数据，并将数据存储在本地
      res.ok
        ? (todoList(res.data, true),
          recycleList(res.data, true),
          localStorage.setItem("todoList", JSON.stringify(res.data)))
        : console.log("数据请求失败");
    });
  } else {
    // 当没有登陆的时候，从本地缓存中获取数据
    let localTodoList = JSON.parse(localStorage.getItem("todoList"))
      ? JSON.parse(localStorage.getItem("todoList"))
      : [];
    todoList(localTodoList, false);
    recycleList(localTodoList, false);
  }
};
export { init };
