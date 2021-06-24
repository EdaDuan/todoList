import { listEmpty, listNotEmpty } from "../init";
// 弹窗
import dialogModel from "../util/dialogModel";
import emptyBox from "../util/emptyBox";
let listItem = JSON.parse(localStorage.getItem("listItem")); //获取本地数据
let todoList = document.getElementsByName("todoList");
let doneList = document.getElementsByName("doneList");
let conTodoUl = document.querySelector(".con-todo-ul");
let conDoneUl = document.querySelector(".con-done-ul");
let btnTodoOperate = document.getElementById("btnTodoOperate");
let btnDoneOperate = document.getElementById("btnDoneOperate");
let taskLabel = document.getElementsByClassName("taskLabel");
let newDialog = document.querySelector(".tasksNewDialog");
// 新建todoList
const newList = () => {
  newDialog.addEventListener("click", () => {
    dialogModel("tasksNewDialog");
  });
};
// todo中的全选
// 更改状态
const changeAllStatus = (ul, domList) => {
  isEmptyBox(ul);
  for (let i = 0; i < domList.length; i++) {
    domList[i].firstChild.checked
      ? ((domList[i].firstChild.checked = false),
        (domList[i].firstChild.name = "todoList"))
      : ((domList[i].firstChild.checked = true),
        (domList[i].firstChild.name = "doneList"));
    ul.appendChild(domList[i].cloneNode(true));
    // console.log("domList[i]11: ", domList[i]),
    // ul.appendChild(domList[i]))
  }
};
const changeAllData = (list, data, status) => {
  if (list.length !== 0) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].status) {
        data[i].status = status;
      }
    }
  }
};
const todoOperate = () => {
  changeAllData(todoList, listItem, false);
  changeAllStatus(conDoneUl, conTodoUl.childNodes);
  conTodoUl.innerHTML = "";
  listEmpty(btnTodoOperate, taskLabel[0]);
  listNotEmpty(btnDoneOperate, taskLabel[1]);
  conTodoUl.appendChild(emptyBox("今日任务为空，快去创建吧～"));
  localStorage.setItem("listItem", JSON.stringify(listItem)); //将JS对象转化成JSON对象并保存到本地
};
const DoneOperate = () => {
  changeAllData(doneList, listItem, true);
  changeAllStatus(conTodoUl, conDoneUl.childNodes);
  conDoneUl.innerHTML = "";
  listEmpty(btnDoneOperate, taskLabel[1]);
  listNotEmpty(btnTodoOperate, taskLabel[0]);
  conDoneUl.appendChild(emptyBox("今日还没有完成任务～"));
  localStorage.setItem("listItem", JSON.stringify(listItem)); //将JS对象转化成JSON对象并保存到本地
};

// 复选框
// 判断那个ul
const isListUl = (e) => {
  return e.target.parentNode.parentNode == conTodoUl ? true : false;
};
// 判断收否为最后一个
const isListLast = (e) => {
  if (isListUl(e) && conTodoUl.childNodes.length === 1) {
    conTodoUl.appendChild(emptyBox("今日任务为空，快去创建吧～")),
      listEmpty(btnTodoOperate, taskLabel[0]);
  } else if (!isListUl(e) && conDoneUl.childNodes.length === 1) {
    conDoneUl.appendChild(emptyBox("今日任务为空，快去创建吧～")),
      listEmpty(btnTodoOperate, taskLabel[0]);
  }
};
// 判断是否为空
const isEmptyBox = (ul) => {
  if (ul.firstChild.tagName === "DIV") {
    ul.firstChild.remove();
  }
};
const changeStatus = (e) => {
  isListLast(e);
  e.target.parentNode.firstChild.checked
    ? (isEmptyBox(conTodoUl),
      listNotEmpty(btnTodoOperate, taskLabel[0]),
      conTodoUl.appendChild(e.target.parentNode),
      (e.target.parentNode.firstChild.name = "todoList"))
    : (isEmptyBox(conDoneUl),
      listNotEmpty(btnDoneOperate, taskLabel[1]),
      conDoneUl.appendChild(e.target.parentNode),
      (e.target.parentNode.firstChild.name = "doneList"));
};
const changeData = (e, data) => {
  const item = data.find(({ taskId }) => e.target.parentNode.id == taskId);
  item.status = !item.status;
  localStorage.setItem("listItem", JSON.stringify(listItem)); //将JS对象转化成JSON对象并保存到本地
};
const changList = (e) => {
  changeStatus(e);
  changeData(e, listItem);
  console.log("listItem: ", listItem);
};
// 删除
// 删除数据
const delData = (data, e) => {
  data.splice(
    data.findIndex((item) => item.taskId === Number(e.target.parentNode.id)),
    1
  );
};
const delBtnData = (e) => {
  delData(listItem, e);
  localStorage.setItem("listItem", JSON.stringify(listItem)); //将JS对象转化成JSON对象并保存到本地
  e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  isListLast(e);
};
// 编辑
const getEditor = (e, data) => {
  const item = data.find(({ taskId }) => e.target.parentNode.id == taskId);
  return item;
};
const editBtnData = (e) => {
  dialogModel("editorDialog", e, getEditor(e, listItem));
};

export {
  newList,
  changList,
  delBtnData,
  editBtnData,
  todoOperate,
  DoneOperate,
};
