import { removeEmptyBox, isListUl, listEmpty, listNotEmpty } from "./common";
// 弹窗
import dialogModel from "../util/dialogModel";
import emptyBox from "../util/emptyBox";
let listItem = JSON.parse(localStorage.getItem("listItem")); //获取本地数据
let todoList = document.getElementsByName("todoList");
let doneList = document.getElementsByName("doneList");
let conTodoUl = document.querySelector(".con-todo-ul");
let conDoneUl = document.querySelector(".con-done-ul");
let selectAllTodo = document.getElementById("selectAllTodo");
let selectAllDone = document.getElementById("selectAllDone");
let taskLabel = document.getElementsByClassName("taskLabel");
let newDialog = document.querySelector(".tasksNewDialog");
// 新建todoList
const newTodoList = () => {
  newDialog.addEventListener("click", () => {
    dialogModel("tasksNewDialog");
  });
};
// todo中的全选
// 更改状态
const changeAllStatus = (ul, domList) => {
  removeEmptyBox(ul);
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
const changeAllStatus2 = (ul, domList) => {
  console.log("domList: ", domList);
  console.log("domList.firstChild.checked: ", domList.firstChild.checked);
  removeEmptyBox(ul);
  // for (let i = 0; i < domList.length; i++) {
  domList.firstChild.checked
    ? ((domList.firstChild.checked = false),
      (domList.firstChild.name = "todoList"))
    : ((domList.firstChild.checked = true),
      (domList.firstChild.name = "doneList"));
  ul.appendChild(domList);
  // console.log("domList[i]11: ", domList[i]),
  // ul.appendChild(domList[i]))
  // }
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
const selectAllTodoList = () => {
  changeAllData(todoList, listItem, false);
  conTodoUl.innerHTML = "";
  // for (let i = 0; i < conTodoUl.childNodes.length; i++) {
  //   changeAllStatus2(conDoneUl, conTodoUl.childNodes[i]);
  // }
  changeAllStatus(conDoneUl, conTodoUl.childNodes);

  listEmpty(selectAllTodo, taskLabel[0]);
  listNotEmpty(selectAllDone, taskLabel[1]);
  conTodoUl.appendChild(emptyBox("今日任务为空，快去创建吧～"));
  localStorage.setItem("listItem", JSON.stringify(listItem)); //将JS对象转化成JSON对象并保存到本地
};
const selectAllDoneList = () => {
  console.log("conDoneUl.childNodes.length: ", conDoneUl.childNodes.length);
  changeAllData(doneList, listItem, true);
  conDoneUl.innerHTML = "";
  // for (let i = 0; i < conDoneUl.childNodes.length; i++) {
  //   changeAllStatus2(conTodoUl, conDoneUl.childNodes[i]);
  // }
  changeAllStatus(conTodoUl, conDoneUl.childNodes);

  listEmpty(selectAllDone, taskLabel[1]);
  listNotEmpty(selectAllTodo, taskLabel[0]);
  conDoneUl.appendChild(emptyBox("今日还没有完成任务～"));
  localStorage.setItem("listItem", JSON.stringify(listItem)); //将JS对象转化成JSON对象并保存到本地
};

// 复选框
// 勾选时判断是否为最后一个，是最后一个需要加上空盒子，修改全选按钮的状态
const isTodoLast = (e, clickAllBtn, taskLabel, text) => {
  e.target.parentNode.parentNode.appendChild(emptyBox(text)),
    listEmpty(clickAllBtn, taskLabel);
};
// 在ul中添加li 待办项时，先判断是否为空，如果为空需要先移除空盒子，将li的name进行修改，修改全选按钮的状态
const isTodoEmpty = (e, renderAllBtn, taskLabel, ul, checkName) => {
  removeEmptyBox(ul);
  listNotEmpty(renderAllBtn, taskLabel);
  ul.appendChild(e.target.parentNode);
  e.target.parentNode.firstChild.name = checkName;
};
// 勾选的时候修改状态
const changeStatus = (
  e,
  clickAllBtn,
  renderAllBtn,
  clickLabel,
  renderLabel,
  ul,
  text
) => {
  // 判断是否为最后一项,为最后一项，在点击之后需要添加空盒子和给全选按钮加状态
  if (e.target.parentNode.parentNode.childNodes.length === 1) {
    isTodoLast(e, clickAllBtn, clickLabel, text);
  }
  e.target.parentNode.firstChild.checked
    ? isTodoEmpty(e, renderAllBtn, renderLabel, ul, "todoList")
    : isTodoEmpty(e, renderAllBtn, renderLabel, ul, "doneList");
};
// 勾选的时候修改数据
const changeData = (e, data) => {
  const item = data.find(({ taskId }) => e.target.parentNode.id == taskId);
  item.status = !item.status;
  localStorage.setItem("listItem", JSON.stringify(listItem)); //将JS对象转化成JSON对象并保存到本地
};
const changeList = (e) => {
  listItem = JSON.parse(localStorage.getItem("listItem")); //获取本地数据
  console.log("listItem: ", listItem);
  isListUl(e)
    ? // todo
      changeStatus(
        e,
        selectAllTodo,
        selectAllDone,
        taskLabel[0],
        taskLabel[1],
        conDoneUl,
        "今日任务为空，快去创建吧～"
      )
    : // done
      changeStatus(
        e,
        selectAllDone,
        selectAllTodo,
        taskLabel[1],
        taskLabel[0],
        conTodoUl,
        "今日还没有完成任务～"
      );
  changeData(e, listItem);
};
// 删除
// 删除数据
const delData = (data, e) => {
  data.splice(
    data.findIndex((item) => item.taskId === Number(e.target.parentNode.id)),
    1
  );
};
const delList = (e) => {
  listItem = JSON.parse(localStorage.getItem("listItem")); //获取本地数据
  //  判断是否为最后一项,为最后一项，在点击之后需要添加空盒子和给全选按钮加状态
  if (e.target.parentNode.parentNode.childNodes.length === 1) {
    isListUl(e)
      ? isTodoLast(e, selectAllTodo, taskLabel[0], "今日任务为空，快去创建吧～")
      : isTodoLast(e, selectAllDone, taskLabel[1], "今日还没有完成任务～");
  }
  delData(listItem, e);
  localStorage.setItem("listItem", JSON.stringify(listItem)); //将JS对象转化成JSON对象并保存到本地
  e.target.parentNode.parentNode.removeChild(e.target.parentNode);
};
// 编辑
const getEditData = (e, data) => {
  const item = data.find(({ taskId }) => e.target.parentNode.id == taskId);
  return item;
};
const editList = (e) => {
  let listItem = JSON.parse(localStorage.getItem("listItem")); //获取本地数据
  dialogModel("editorDialog", e, getEditData(e, listItem));
};

// 未完成的勾选事件
// 改变状态函数
const notDoneChanStatus = (e) => {
  // 修改checkbox的name属性值
  e.target.parentNode.firstChild.name = "doneList";
  // 当当前日期盒子只有一条数据时 移除当前盒子 否则 移除当前待办项
  e.target.parentNode.parentNode.childNodes.length === 1
    ? e.target.parentNode.parentNode.parentNode.remove()
    : e.target.parentNode.remove();
};
const notDoneChangList = (e) => {
  listItem = JSON.parse(localStorage.getItem("listItem")); //获取本地数据
  // 改变状态
  notDoneChanStatus(e);
  // 改变数据
  changeData(e, listItem);
};

// 已完成的勾选事件
const allListChanStatus = (e) => {
  // 修改checkbox的name属性值
  e.target.parentNode.firstChild.name = "todoList";
  // 当前日期盒子只有一条数据时 移除当前盒子 否则 移除当前待办项
  e.target.parentNode.parentNode.childNodes.length === 1
    ? e.target.parentNode.parentNode.parentNode.remove()
    : e.target.parentNode.remove();
};
const allListChangList = (e) => {
  listItem = JSON.parse(localStorage.getItem("listItem")); //获取本地数据
  // 改变状态
  allListChanStatus(e);
  // 改变数据
  changeData(e, listItem);
};
export {
  newTodoList,
  changeList,
  notDoneChangList,
  allListChangList,
  delList,
  editList,
  selectAllTodoList,
  selectAllDoneList,
};
