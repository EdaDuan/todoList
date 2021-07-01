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
const chooseList = (listTag) => {
  switch (listTag) {
    // 今日待办项
    case "TODO":
      return changeList;
    //  未完成
    case "NOTDONE":
      return notDoneChangList;
    //  已完成
    case "DONE":
      return doneChangList;
    default:
      console.log("error");
  }
};
// 创建待办项
const createTodo = (item, listTag) => {
  let li = document.createElement("li");
  li.className = "con-task-li";
  li.setAttribute("id", item.taskId);
  let checkbox = createCheckbox(li, item);
  // 创建label时，传递不同的点击事件
  createLabel(li, item, chooseList(listTag));
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

const initList = (data) => {
  let selectAllTodo = document.getElementById("selectAllTodo");
  let selectAllDone = document.getElementById("selectAllDone");
  let taskLabel = document.getElementsByClassName("taskLabel");
  let conTodoUl = document.querySelector(".con-todo-ul");
  let conDoneUl = document.querySelector(".con-done-ul");
  conTodoUl.innerHTML = "";
  conDoneUl.innerHTML = "";
  // 创建文档
  let fragmentTodo = document.createDocumentFragment();
  let fragmentDone = document.createDocumentFragment();
  selectAllTodo.addEventListener("click", selectAllTodoList, false);
  selectAllDone.addEventListener("click", selectAllDoneList, false);
  const filterTodoList = data.filter(
    (item) => item.finishTime == formatData(new Date()) && !item.isDel
  );
  filterTodoList.forEach((item) => {
    const { dom, checkbox } = createTodo(item, "TODO");
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
export { initList, createTodo, addCheckName };
