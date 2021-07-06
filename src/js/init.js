import { listEmpty, listNotEmpty } from "./util/common";
import emptyBox from "./util/emptyBox";
import formatData from "./util/formate";
import {
  changeList,
  notDoneChangList,
  doneChangList,
  delList,
  editList,
  selectAllTodoList,
  selectAllDoneList,
} from "./util/operation";
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
const createLabel = (dom, data, id) => {
  let label = document.createElement("label");
  label.setAttribute("id", id);
  label.setAttribute("for", "check" + data.taskId);
  dom.appendChild(label);
};
// 创建span
const createSpan = (dom, data) => {
  let span = document.createElement("span");
  span.innerText = data.taskName;
  dom.appendChild(span);
};
// 创建button
const createBtn = (dom, className, id, text) => {
  let btn = document.createElement("input");
  btn.setAttribute("class", className);
  btn.setAttribute("type", "button");
  btn.setAttribute("id", id);
  btn.setAttribute("value", text);
  dom.appendChild(btn);
};
const chooseList = (listTag, e) => {
  switch (listTag) {
    // 今日待办项
    case "TODO":
      return changeList(e);
    //  未完成
    case "NOTDONE":
      return notDoneChangList(e);
    //  已完成
    case "DONE":
      return doneChangList(e);
    default:
      console.log("error");
  }
};
// 创建待办项
const createTodo = (item) => {
  let li = document.createElement("li");
  li.className = "con-task-li";
  li.setAttribute("id", item.taskId);
  let checkbox = createCheckbox(li, item);
  createLabel(li, item, "todoCheck");
  createSpan(li, item);
  createBtn(li, "con-task-delBtn", "todoDel", "删除");
  createBtn(li, "con-task-editBtn", "todoEdit", "编辑");
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
const todoListEvent = (listTag, e) => {
  let nodeName = e.target.nodeName.toLocaleLowerCase();
  if (nodeName == "input" || nodeName == "label") {
    switch (e.target.id) {
      case "todoCheck":
        // e.preventDefault();
        chooseList(listTag, e);
        break;
      case "todoDel":
        delList(e);
        break;
      case "todoEdit":
        editList(e);
        break;
      default:
    }
  }
};
const initList = (data) => {
  let selectAllTodo = document.getElementById("selectAllTodo");
  let selectAllDone = document.getElementById("selectAllDone");
  let taskLabel = document.getElementsByClassName("taskLabel");
  let conTodoUl = document.querySelector(".con-todo-ul");
  let conDoneUl = document.querySelector(".con-done-ul");
  conTodoUl.innerHTML = "";
  conDoneUl.innerHTML = "";
  // 创建文档片段
  let fragmentTodo = document.createDocumentFragment();
  let fragmentDone = document.createDocumentFragment();
  selectAllTodo.addEventListener("click", selectAllTodoList, false);
  selectAllDone.addEventListener("click", selectAllDoneList, false);
  conTodoUl.addEventListener("click", todoListEvent.bind(this, "TODO"), false);
  conDoneUl.addEventListener("click", todoListEvent.bind(this, "TODO"), false);
  const filterTodoList = data.filter(
    (item) => item.finishTime == formatData(new Date()) && !item.isDel
  );
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
export { initList, createTodo, addCheckName, todoListEvent };
