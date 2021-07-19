/*
 * @Author: your name
 * @Date: 2021-07-08 16:52:16
 * @LastEditTime: 2021-07-18 11:12:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/components/todoList.js
 */
import { listEmpty, listNotEmpty, emptyBox } from "../util/common";
import formatData from "../util/formate";
import {
  selectAllTodoList,
  selectAllDoneList,
  todoListEvent,
} from "../util/operation";
import { createTodo, addCheckName } from "./createTodo";
// 获取今日待办项的ul
let conTodoUl = document.querySelector(".con-todo-ul");
let conDoneUl = document.querySelector(".con-done-ul");
let selectAllTodo = document.getElementById("selectAllTodo");
let selectAllDone = document.getElementById("selectAllDone");
let taskLabel = document.getElementsByClassName("taskLabel");

const todoListDataRender = (data) => {
  // 创建文档片段
  let fragmentTodo = document.createDocumentFragment();
  let fragmentDone = document.createDocumentFragment();
  conTodoUl.innerHTML = "";
  conDoneUl.innerHTML = "";
  // 根据所有数据，过滤获取今日的todoList
  const filterTodoList = data.filter(
    (item) =>
      formatData(new Date(item.finishTime)) == formatData(new Date()) &&
      !item.isDel
  );
  // 根据今日待办项，创建DOM
  filterTodoList.forEach((item) => {
    const { dom, checkbox } = createTodo(item);
    addCheckName(item, dom, checkbox, fragmentTodo, fragmentDone);
  });
  fragmentTodo.childNodes.length === 0
    ? (listEmpty(selectAllTodo, taskLabel[0]),
      conTodoUl.appendChild(emptyBox("今日任务已全部完成～")))
    : (listNotEmpty(selectAllTodo, taskLabel[0]),
      conTodoUl.appendChild(fragmentTodo));

  fragmentDone.childNodes.length === 0
    ? (listEmpty(selectAllDone, taskLabel[1]),
      conDoneUl.appendChild(emptyBox("今日还未完成任务～")))
    : (listNotEmpty(selectAllDone, taskLabel[1]),
      conDoneUl.appendChild(fragmentDone));
};
const todoList = (data, isLogin) => {
  // 事件代理添加点击事件
  conTodoUl.addEventListener(
    "click",
    todoListEvent.bind(this, "TODO", "TODODEL", isLogin),
    false
  );
  conDoneUl.addEventListener(
    "click",
    todoListEvent.bind(this, "TODO", "TODODEL", isLogin),
    false
  );
  selectAllTodo.addEventListener(
    "click",
    selectAllTodoList.bind(this, isLogin),
    false
  );
  selectAllDone.addEventListener(
    "click",
    selectAllDoneList.bind(this, isLogin),
    false
  );
  todoListDataRender(data);
};
export { todoList, todoListDataRender };
