/*
 * @Author: your name
 * @Date: 2021-07-08 16:52:16
 * @LastEditTime: 2021-09-02 18:38:42
 * @LastEditors: duanfy
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/components/todoList.js
 */
import { listEmpty, listNotEmpty, emptyBox } from "../../common/common";
import formatDate from "../../common/format";
import {
  selectAllList,
  todoListEvent,
  createTodoItem,
} from "../../util/todoList/index";
import { createTodo, addCheckName } from "../../components/todoItem";
import { initDialog, popupDialog } from "../../components/todoDialog";
import { TASK_EMPTY } from "../../common/constant";

// 获取今日待办项的ul
const conTodoUl = document.querySelector("#con-todo-ul");
const conDoneUl = document.querySelector("#con-done-ul");
const selectAllTodo = document.getElementById("selectAllTodo");
const selectAllDone = document.getElementById("selectAllDone");
const taskLabel = document.getElementsByClassName("taskLabel");
const newDialog = document.querySelector(".tasks-new-dialog");

const todoListDataRender = (data) => {
  // 创建文档片段
  const fragmentTodo = document.createDocumentFragment();
  const fragmentDone = document.createDocumentFragment();
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
      conTodoUl.appendChild(emptyBox(TASK_EMPTY.TODAY_TODO_MSG)))
    : (listNotEmpty(selectAllTodo, taskLabel[0]),
      conTodoUl.appendChild(fragmentTodo));

  fragmentDone.childNodes.length === 0
    ? (listEmpty(selectAllDone, taskLabel[1]),
      conDoneUl.appendChild(emptyBox(TASK_EMPTY.TODAY_DONE_MSG)))
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
