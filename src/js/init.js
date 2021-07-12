/*
 * @Author: your name
 * @Date: 2021-06-16 18:17:18
 * @LastEditTime: 2021-07-09 17:58:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/init.js
 */
import { todoList } from "./components/todoList";
import { newTodoList } from "./util/operation";
import { getData } from "../http";
const init = async () => {
  newTodoList();
  let res = await getData();
  todoList(res.data);
};
export { init };
