/*
 * @Author: your name
 * @Date: 2021-06-16 18:17:18
 * @LastEditTime: 2021-07-12 17:26:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/init.js
 */
import { todoList } from "./components/todoList";
import { recycleList } from "./components/recycleList";
import { newTodoList } from "./util/operation";
import { getData } from "../http";
const init = () => {
  newTodoList();
  getData().then((res) => {
    res.ok
      ? (todoList(res.data), recycleList(res.data))
      : console.log("数据请求失败～");
  });
};
export { init };
