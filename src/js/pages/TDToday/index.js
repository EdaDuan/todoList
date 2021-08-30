/*
 * @Author: your name
 * @Date: 2021-07-08 16:52:16
 * @LastEditTime: 2021-08-29 10:57:44
 * @LastEditors: duanfy
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/components/todoList.js
 */
import { listEmpty, listNotEmpty, emptyBox } from "../../common/common";
import formatDate from "../../common/formate";
import {
  selectAllList,
  todoListEvent,
  createTodoItem,
} from "../../util/todoList/index";
import { createTodo, addCheckName } from "../../components/todoItem";
import { initDialog, popupDialog } from "../../components/todoDialog";
// 获取今日待办项的ul
let conTodoUl = document.querySelector("#con-todo-ul");
let conDoneUl = document.querySelector("#con-done-ul");
let selectAllTodo = document.getElementById("selectAllTodo");
let selectAllDone = document.getElementById("selectAllDone");
let taskLabel = document.getElementsByClassName("taskLabel");
let newDialog = document.querySelector(".tasks-new-dialog");

const todoListDataRender = (data) => {
  // 创建文档片段
  let fragmentTodo = document.createDocumentFragment();
  let fragmentDone = document.createDocumentFragment();
  conTodoUl.innerHTML = "";
  conDoneUl.innerHTML = "";
  // 根据所有数据，过滤获取今日的todoList
  const filterTodoList = data.filter(
    (item) =>
      formatDate(new Date(item.finishTime)) == formatDate(new Date()) &&
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
    selectAllList.bind(this, isLogin),
    false
  );
  selectAllDone.addEventListener(
    "click",
    selectAllList.bind(this, isLogin),
    false
  );
  newDialog.addEventListener("click", () => {
    initDialog({
      text: "新建任务项",
      nameValue: "",
      timeValue: formatDate(new Date()),
      okEvent: createTodoItem,
    });
    popupDialog();
  });
  todoListDataRender(data);
};
export { todoList, todoListDataRender };
