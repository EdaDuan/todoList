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
const operation = () => {
  // 新建todoList
  document
    .getElementsByClassName("tasksNewDialog")[0]
    .addEventListener("click", () => {
      dialogModel("tasksNewDialog");
    });
};
// todo中的全选
// 更改状态
const changStatus = (ul, domList) => {
  if (ul.firstChild.tagName === "DIV") {
    ul.firstChild.remove();
  }
  for (let i = 0; i < domList.length; i++) {
    domList[i].firstChild.checked
      ? ((domList[i].firstChild.checked = false),
        (domList[i].firstChild.name = "todoList"),
        ul.appendChild(domList[i].cloneNode(true)),
        console.log(ul))
      : ((domList[i].firstChild.checked = true),
        (domList[i].firstChild.name = "doneList"),
        ul.appendChild(domList[i].cloneNode(true)),
        console.log(ul));
  }
};
const changData = (list, data, status) => {
  if (list.length !== 0) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].status) {
        data[i].status = status;
      }
    }
  }
};
const todoOperate = () => {
  changData(todoList, listItem, false);
  changStatus(conDoneUl, conTodoUl.childNodes);
  conTodoUl.innerHTML = "";
  listEmpty(btnTodoOperate, taskLabel[0]);
  listNotEmpty(btnDoneOperate, taskLabel[1]);
  conTodoUl.appendChild(emptyBox("今日任务为空，快去创建吧～"));
  localStorage.setItem("listItem", JSON.stringify(listItem)); //将JS对象转化成JSON对象并保存到本地
};
const DoneOperate = () => {
  changData(doneList, listItem, true);
  changStatus(conTodoUl, conDoneUl.childNodes);
  conDoneUl.innerHTML = "";
  listEmpty(btnDoneOperate, taskLabel[1]);
  listNotEmpty(btnTodoOperate, taskLabel[0]);
  conDoneUl.appendChild(emptyBox("今日还没有完成任务～"));
  localStorage.setItem("listItem", JSON.stringify(listItem)); //将JS对象转化成JSON对象并保存到本地
};
// 复选框
const changeStatus = (e) => {
  e.target.parentNode.firstChild.checked
    ? (conTodoUl.appendChild(e.target.parentNode),
      (e.target.parentNode.firstChild.name = "todoList"))
    : (conDoneUl.appendChild(e.target.parentNode),
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
};
// 删除
// 判断是todo还是done中的数据
const delTodoList = (e) => {
  return e.target.parentNode.parentNode.className === "con-tasks-ul con-todo-ul"
    ? true
    : false;
};
// 删除数据
const delData = (data, e) => {
  data.splice(
    data.findIndex((item) => item.taskId === Number(e.target.parentNode.id)),
    1
  );
};
// 判断收否为最后一个
const isListLast = (list, btnOperate, taskLabel, ulItem, text) => {
  if (list.length === 0 || list.length < 0) {
    listEmpty(btnOperate, taskLabel);
    ulItem.appendChild(emptyBox(text));
  }
};
const delBtnData = (e) => {
  console.log("删除");
  let flag = delTodoList(e);
  delData(listItem, e);
  localStorage.setItem("listItem", JSON.stringify(listItem)); //将JS对象转化成JSON对象并保存到本地
  e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  flag
    ? isListLast(
        todoList,
        btnTodoOperate,
        taskLabel[0],
        conTodoUl,
        "今日任务为空，快去创建吧～"
      )
    : isListLast(
        doneList,
        btnDoneOperate,
        taskLabel[1],
        conDoneUl,
        "今日还没有完成任务～"
      );
};
// 编辑
const getEditor = (e, data) => {
  const item = data.find(({ taskId }) => e.target.parentNode.id == taskId);
  return item.taskName;
};
const editBtnData = (e) => {
  dialogModel("editorDialog", getEditor(e, listItem));
};

export {
  operation,
  changList,
  delBtnData,
  editBtnData,
  todoOperate,
  DoneOperate,
};
