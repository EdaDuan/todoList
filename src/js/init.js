import { listEmpty, listNotEmpty } from "./util/common";
import emptyBox from "./util/emptyBox";
import formatData from "./util/formate";
import {
  changeList,
  delList,
  editList,
  selectAllTodoList,
  selectAllDoneList,
} from "./util/operation";
let todoListStorage = [];
// 创建checkbox
const createCheckbox = (dom, data) => {
  let checkbox = document.createElement("input");
  checkbox.setAttribute("id", "check" + data.taskId);
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("value", data.taskName);
  dom.appendChild(checkbox);
  return checkbox;
};
// 创建lable
const createLabel = (dom, data, clickEvent) => {
  let label = document.createElement("label");
  label.setAttribute("for", "check" + data.taskId);
  label.addEventListener("click", clickEvent, false);
  dom.appendChild(label);
};
// 创建span
const createSpan = (dom, data) => {
  let span = document.createElement("span");
  span.innerText = data.taskName;
  dom.appendChild(span);
};
// 删除
const createDelBtn = (dom, clickEvent, className) => {
  let delBtn = document.createElement("button");
  delBtn.setAttribute("class", className);
  delBtn.addEventListener("click", clickEvent, false);
  delBtn.innerHTML = "删除";
  dom.appendChild(delBtn);
};
// 编辑
const createEidtBtn = (dom, clickEvent, className) => {
  let editBtn = document.createElement("button");
  editBtn.setAttribute("class", className);
  editBtn.addEventListener("click", clickEvent, false);
  editBtn.innerHTML = "编辑";
  dom.appendChild(editBtn);
};
// 创建待办项
const createTodo = (item) => {
  let li = document.createElement("li");
  li.className = "con-task-li";
  li.setAttribute("id", item.taskId);
  let checkbox = createCheckbox(li, item);
  createLabel(li, item, changeList);
  createSpan(li, item);
  createDelBtn(li, delList, "con-task-delBtn");
  createEidtBtn(li, editList, "con-task-editBtn");
  return { dom: li, checkbox };
};
// 根据待办项状态添加checkbox的name属性
const addCheckName = (
  item,
  dom,
  checkbox,
  fragmentTodo,
  fragmentDone = fragmentTodo
) => {
  item.status
    ? (checkbox.setAttribute("name", "todoList"), fragmentTodo.appendChild(dom))
    : ((checkbox.checked = true),
      checkbox.setAttribute("name", "doneList"),
      fragmentDone.appendChild(dom));
};

const initList = () => {
  let selectAllTodo = document.getElementById("selectAllTodo");
  let selectAllDone = document.getElementById("selectAllDone");
  let taskLabel = document.getElementsByClassName("taskLabel");
  let listItem = localStorage.getItem("listItem"); //获取本地的数据
  if (listItem != null) {
    //不为空时
    todoListStorage = JSON.parse(listItem); //JSON对象转换为JS对象
  }
  let conTodoUl = document.querySelector(".con-todo-ul");
  let conDoneUl = document.querySelector(".con-done-ul");
  conTodoUl.innerHTML = "";
  conDoneUl.innerHTML = "";
  // 创建文档
  let fragmentTodo = document.createDocumentFragment();
  let fragmentDone = document.createDocumentFragment();
  selectAllTodo.addEventListener("click", selectAllTodoList, false);
  selectAllDone.addEventListener("click", selectAllDoneList, false);
  const filterTodoList = todoListStorage.filter(
    (item) => item.finishTime == formatData(new Date())
  );
  filterTodoList.forEach((item) => {
    const { dom, checkbox } = createTodo(item);
    addCheckName(item, dom, checkbox, fragmentTodo, fragmentDone);
  });
  fragmentTodo.childNodes.length === 0
    ? (listEmpty(selectAllTodo, taskLabel[0]),
      conTodoUl.appendChild(emptyBox("今日任务为空，快去创建吧～")))
    : (listNotEmpty(selectAllTodo, taskLabel[0]),
      conTodoUl.appendChild(fragmentTodo));

  fragmentDone.childNodes.length === 0
    ? (listEmpty(selectAllDone, taskLabel[1]),
      conDoneUl.appendChild(emptyBox("今日还没有完成任务～")))
    : (listNotEmpty(selectAllDone, taskLabel[1]),
      conDoneUl.appendChild(fragmentDone));
};
const initNotDoneList = () => {
  let listItem = localStorage.getItem("listItem"); //获取本地的数据
  let allNotDoneStorage = [];
  if (listItem != null) {
    //不为空时
    allNotDoneStorage = JSON.parse(listItem); //JSON对象转换为JS对象
  }
  let allNotDoneUl = document.querySelector(".allNotDone-ul");
  allNotDoneUl.innerHTML = "";
  let fragmentNotDone = document.createDocumentFragment();
  const filterNotDoneList = allNotDoneStorage.filter(
    (item) => item.status == true
  );
  filterNotDoneList.forEach((item) => {
    const { dom, checkbox } = createTodo(item);
    addCheckName(item, dom, checkbox, fragmentNotDone);
  });
  fragmentNotDone.childNodes.length === 0
    ? allNotDoneUl.appendChild(emptyBox("所有待办项都已完成～"))
    : allNotDoneUl.appendChild(fragmentNotDone);
};
const initAllList = () => {
  let listItem = localStorage.getItem("listItem"); //获取本地的数据
  let allTaskStorage = [];
  if (listItem != null) {
    //不为空时
    allTaskStorage = JSON.parse(listItem); //JSON对象转换为JS对象
  }
  let allListUl = document.querySelector(".allList-ul");
  allListUl.innerHTML = "";
  let fragmentAllTask = document.createDocumentFragment();
  allTaskStorage.forEach((item) => {
    const { dom, checkbox } = createTodo(item);
    addCheckName(item, dom, checkbox, fragmentAllTask);
  });
  fragmentAllTask.childNodes.length === 0
    ? allListUl.appendChild(emptyBox("还没有待办项，快去创建吧～"))
    : allListUl.appendChild(fragmentAllTask);
};
export { initList, initNotDoneList, initAllList, createTodo, addCheckName };
