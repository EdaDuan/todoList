import {
  removeEmptyBox,
  isListUl,
  listEmpty,
  listNotEmpty,
  inputValue,
} from "./common";
import { createTodo, addCheckName } from "../init";
// 弹窗
import { initDialog, popupDialog, closeDialog } from "./dialog";
import emptyBox from "../util/emptyBox";
import formatData from "../util/formate";
// 新建todoList
// 新建待办项的UI
const changeNewStatus = (newtodo, domUl, domInput, domLabel) => {
  const { dom, checkbox } = createTodo(newtodo);
  if (domUl.childNodes.length === 1) {
    // 全选按钮可选
    removeEmptyBox(domUl);
    listNotEmpty(domInput, domLabel);
  }
  addCheckName(newtodo, dom, checkbox, domUl);
};
// 新建待办项的data
const changeNewData = (newtodo, data) => {
  data.push(newtodo); //往todolist中添加对象
  localStorage.setItem("listItem", JSON.stringify(data)); //将JS对象转化成JSON对象并保存到本地
};
const newSure = () => {
  let conTodoUl = document.querySelector(".con-todo-ul");
  let selectAllTodo = document.getElementById("selectAllTodo");
  let taskLabel = document.getElementsByClassName("taskLabel");
  let dialogInputName = document.querySelector("#dialog-input-name");
  let dialogInputTime = document.querySelector("#dialog-input-time");
  let listItem = JSON.parse(localStorage.getItem("listItem")); //获取本地数据
  let curTime = formatData(new Date());
  let newtodo = {
    taskId: listItem[listItem.length - 1].taskId + 1,
    taskName: "", //输入的内容
    createTime: "",
    status: true,
    isDel: false,
  };
  let nameValue = dialogInputName.value; //使用nameValue存储
  let finishTime = dialogInputTime.value;
  if (inputValue(nameValue) || inputValue(finishTime)) {
    return;
  } else {
    var flag = confirm("您确定添加该待办项吗?"); //弹出确认框
    if (flag) {
      newtodo.taskName = nameValue;
      newtodo.createTime = curTime;
      newtodo.finishTime = finishTime;
      changeNewStatus(newtodo, conTodoUl, selectAllTodo, taskLabel[0]);
      changeNewData(newtodo, listItem);
      alert("添加成功");
    } else {
      alert("操作取消");
    }
    closeDialog();
  }
};
// 新建待办项的弹窗
const newTodoList = () => {
  let newDialog = document.querySelector(".tasks-new-dialog");
  newDialog.addEventListener("click", () => {
    initDialog({
      text: "新建任务项",
      nameValue: "",
      timeValue: formatData(new Date()),
      okEvent: newSure,
    });
    popupDialog();
  });
};
// todo中的全选
// 更改状态
const changeAllStatus = (fragment, ul, domList) => {
  if (ul.firstChild) {
    removeEmptyBox(ul);
  }
  domList.firstChild.name === "todoList"
    ? ((domList.firstChild.checked = true),
      (domList.firstChild.name = "doneList"))
    : ((domList.firstChild.checked = false),
      (domList.firstChild.name = "todoList"));
  fragment.appendChild(domList);
};
// 更改数据
const changeAllData = (list, data, status) => {
  if (list.length !== 0) {
    for (let i = 0; i < data.length; i++) {
      data[i].status = status;
    }
  }
};
const selectAllTodoList = () => {
  let conTodoUl = document.querySelector(".con-todo-ul");
  let conDoneUl = document.querySelector(".con-done-ul");
  let selectAllTodo = document.getElementById("selectAllTodo");
  let selectAllDone = document.getElementById("selectAllDone");
  let taskLabel = document.getElementsByClassName("taskLabel");
  let listItem = JSON.parse(localStorage.getItem("listItem")); //获取本地数据
  changeAllData(conTodoUl.childNodes, listItem, false);
  let length = conTodoUl.childNodes.length;
  let fragmentTodo = document.createDocumentFragment();
  for (let i = 0; i < length; i++) {
    changeAllStatus(fragmentTodo, conDoneUl, conTodoUl.childNodes[0]);
  }
  conDoneUl.appendChild(fragmentTodo);
  conTodoUl.innerHTML = "";
  listEmpty(selectAllTodo, taskLabel[0]);
  listNotEmpty(selectAllDone, taskLabel[1]);
  conTodoUl.appendChild(emptyBox("今日任务已全部完成～"));
  localStorage.setItem("listItem", JSON.stringify(listItem)); //将JS对象转化成JSON对象并保存到本地
};
const selectAllDoneList = () => {
  let conTodoUl = document.querySelector(".con-todo-ul");
  let conDoneUl = document.querySelector(".con-done-ul");
  let selectAllTodo = document.getElementById("selectAllTodo");
  let selectAllDone = document.getElementById("selectAllDone");
  let taskLabel = document.getElementsByClassName("taskLabel");
  let listItem = JSON.parse(localStorage.getItem("listItem")); //获取本地数据
  changeAllData(conDoneUl.childNodes, listItem, true);
  let length = conDoneUl.childNodes.length;
  let fragmentDone = document.createDocumentFragment();
  for (let i = 0; i < length; i++) {
    changeAllStatus(fragmentDone, conTodoUl, conDoneUl.childNodes[0]);
  }
  conTodoUl.appendChild(fragmentDone);
  conDoneUl.innerHTML = "";
  listEmpty(selectAllDone, taskLabel[1]);
  listNotEmpty(selectAllTodo, taskLabel[0]);
  conDoneUl.appendChild(emptyBox("今日还未完成任务～"));
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
  localStorage.setItem("listItem", JSON.stringify(data)); //将JS对象转化成JSON对象并保存到本地
};
const changeList = (e) => {
  let conTodoUl = document.querySelector(".con-todo-ul");
  let conDoneUl = document.querySelector(".con-done-ul");
  let selectAllTodo = document.getElementById("selectAllTodo");
  let selectAllDone = document.getElementById("selectAllDone");
  let taskLabel = document.getElementsByClassName("taskLabel");
  let listItem = JSON.parse(localStorage.getItem("listItem"));
  isListUl(e)
    ? // todo
      changeStatus(
        e,
        selectAllTodo,
        selectAllDone,
        taskLabel[0],
        taskLabel[1],
        conDoneUl,
        "今日任务已全部完成～"
      )
    : // done
      changeStatus(
        e,
        selectAllDone,
        selectAllTodo,
        taskLabel[1],
        taskLabel[0],
        conTodoUl,
        "今日还未完成任务～"
      );
  changeData(e, listItem);
};
// 删除
// 删除数据
const delData = (data, e) => {
  const item = data.find(({ taskId }) => e.target.parentNode.id == taskId);
  item.isDel = true;
};
const delList = (e) => {
  let selectAllTodo = document.getElementById("selectAllTodo");
  let selectAllDone = document.getElementById("selectAllDone");
  let taskLabel = document.getElementsByClassName("taskLabel");
  let listItem = JSON.parse(localStorage.getItem("listItem")); //获取本地数据
  //  判断是否为最后一项,为最后一项，在点击之后需要添加空盒子和给全选按钮加状态
  if (e.target.parentNode.parentNode.childNodes.length === 1) {
    isListUl(e)
      ? isTodoLast(e, selectAllTodo, taskLabel[0], "今日任务已全部完成～")
      : isTodoLast(e, selectAllDone, taskLabel[1], "今日还未完成任务～");
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
// 编辑 修改UI
const changeEditStatus = (element, nameValue) => {
  element.target.parentNode.childNodes.forEach((item) => {
    if (item.tagName === "SPAN") {
      item.innerText = nameValue;
    }
  });
};
// 编辑 修改数据
const changeEditData = (data, list, nameValue, finishTime) => {
  data.forEach((item) => {
    if (item.taskId === list.taskId) {
      item.taskName = nameValue;
      item.finishTime = finishTime;
    }
  });
};
// 编辑确认事件判断
const editSure = (e, item) => {
  let dialogInputName = document.querySelector("#dialog-input-name");
  let dialogInputTime = document.querySelector("#dialog-input-time");
  let nameValue = dialogInputName.value;
  let finishTime = dialogInputTime.value;
  if (inputValue(nameValue) || inputValue(finishTime)) {
    return;
  }
  var flag = confirm("您确定修改该待办项吗?");
  if (flag) {
    let listItem = JSON.parse(localStorage.getItem("listItem"));
    changeEditStatus(e, nameValue);
    changeEditData(listItem, item, nameValue, finishTime);
    localStorage.setItem("listItem", JSON.stringify(listItem)); //将JS对象转化成JSON对象并保存到本地
    alert("编辑成功");
  } else {
    alert("操作取消");
    return;
  }
  closeDialog();
};
// 调用编辑弹窗
const editList = (e) => {
  let listItem = JSON.parse(localStorage.getItem("listItem")); //获取本地数据
  let item = getEditData(e, listItem);
  initDialog({
    text: "编辑任务项",
    nameValue: item.taskName,
    timeValue: item.finishTime,
    okEvent: editSure.bind(this, e, item),
  });
  popupDialog();
};

// 未完成的勾选事件
// 改变状态函数
const notDoneChanStatus = (e, dom) => {
  // 修改checkbox的name属性值
  e.target.parentNode.firstChild.name = "doneList";
  // 当当前日期盒子只有一条数据时 移除当前盒子 否则 移除当前待办项
  e.target.parentNode.parentNode.childNodes.length === 1
    ? e.target.parentNode.parentNode.parentNode.remove()
    : e.target.parentNode.remove();
  if (dom.childNodes.length === 0) {
    dom.appendChild(emptyBox("所有任务已完成～"));
  }
};
const notDoneChangList = (e) => {
  let listItem = JSON.parse(localStorage.getItem("listItem")); //获取本地数据
  let allNotDone = document.querySelector(".allNotDone");
  // 改变状态
  notDoneChanStatus(e, allNotDone);
  // 改变数据
  changeData(e, listItem);
};

// 已完成的勾选事件
const doneChanStatus = (e, dom) => {
  // 修改checkbox的name属性值
  e.target.parentNode.firstChild.name = "todoList";
  e.target.parentNode.parentNode.childNodes.length === 1
    ? e.target.parentNode.parentNode.parentNode.remove()
    : e.target.parentNode.remove();
  // 当没有选项时添加空盒子
  if (dom.childNodes.length === 0) {
    dom.appendChild(emptyBox("没有任务已完成～"));
  }
};
const doneChangList = (e) => {
  let listItem = JSON.parse(localStorage.getItem("listItem")); //获取本地数据
  let allDone = document.querySelector(".allDone");
  // 改变状态
  doneChanStatus(e, allDone);
  // 改变数据
  changeData(e, listItem);
};
export {
  newTodoList,
  changeList,
  notDoneChangList,
  doneChangList,
  delList,
  editList,
  selectAllTodoList,
  selectAllDoneList,
};
