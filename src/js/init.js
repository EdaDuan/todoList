import emptyBox from "./util/emptyBox";
import {
  delBtnData,
  editBtnData,
  changList,
  todoOperate,
  DoneOperate,
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
  createLabel(li, item, changList);
  createSpan(li, item);
  createDelBtn(li, delBtnData, "con-task-delBtn");
  createEidtBtn(li, editBtnData, "con-task-editorBtn");
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
// 当list为空时全选框的样式和内容提示为空
const listEmpty = (btnOperate, taskLabel) => {
  btnOperate.setAttribute("disabled", "false");
  btnOperate.checked = true;
  taskLabel.style.border = "1px solid #eee";
};
const listNotEmpty = (btnOperate, taskLabel) => {
  btnOperate.removeAttribute("disabled");
  btnOperate.checked = false;
  taskLabel.style.border = "1px solid #666";
};
const initList = () => {
  let btnTodoOperate = document.getElementById("btnTodoOperate");
  let btnDoneOperate = document.getElementById("btnDoneOperate");
  let taskLabel = document.getElementsByClassName("taskLabel");
  let listItem = localStorage.getItem("listItem"); //获取本地的数据
  if (listItem != null) {
    //不为空时
    todoListStorage = JSON.parse(listItem); //JSON对象转换为JS对象
  }
  let todoUlItem = document.getElementsByClassName("con-todo-ul")[0];
  todoUlItem.innerHTML = "";
  let doneUlItem = document.getElementsByClassName("con-done-ul")[0];
  doneUlItem.innerHTML = "";
  // 创建文档
  let fragmentTodo = document.createDocumentFragment();
  let fragmentDone = document.createDocumentFragment();
  btnTodoOperate.addEventListener("click", todoOperate, false);
  btnDoneOperate.addEventListener("click", DoneOperate, false);
  todoListStorage.forEach((item) => {
    const { dom, checkbox } = createTodo(item);
    addCheckName(item, dom, checkbox, fragmentTodo, fragmentDone);
  });
  fragmentTodo.childNodes.length === 0
    ? (listEmpty(btnTodoOperate, taskLabel[0]),
      todoUlItem.appendChild(emptyBox("今日任务为空，快去创建吧～")))
    : (listNotEmpty(btnTodoOperate, taskLabel[0]),
      todoUlItem.appendChild(fragmentTodo));
  fragmentDone.childNodes.length === 0
    ? (listEmpty(btnDoneOperate, taskLabel[1]),
      doneUlItem.appendChild(emptyBox("今日还没有完成任务～")))
    : (listNotEmpty(btnDoneOperate, taskLabel[1]),
      doneUlItem.appendChild(fragmentDone));
};
export { initList, createTodo, addCheckName, listEmpty, listNotEmpty };
