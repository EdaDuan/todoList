/*
 * @Description:
 * @Version: 2.0
 * @Autor: duanfy
 * @Date: 2021-08-26 17:20:59
 * @LastEditors: duanfy
 * @LastEditTime: 2021-09-01 14:29:41
 */
import {
  removeEmptyBox,
  listEmpty,
  listNotEmpty,
  emptyBox,
} from "../../common/common";
import { createTodo, addCheckName } from "../../components/todoItem";
import { addTimeBoxNotDone, addTimeBoxDone } from "../../components/dateBox";
import { TASK_EMPTY } from "../../common/constant";
const conTodoUl = document.querySelector("#con-todo-ul");
const conDoneUl = document.querySelector("#con-done-ul");
const selectAllTodo = document.querySelector("#selectAllTodo");
const selectAllDone = document.querySelector("#selectAllDone");
const taskLabel = document.getElementsByClassName("taskLabel");
// 新建待办项的UI
const changeCreateStatus = (newtodo) => {
  const { dom, checkbox } = createTodo(newtodo);
  if (conTodoUl.childNodes.length === 1) {
    // 全选按钮可选
    removeEmptyBox(conTodoUl);
    listNotEmpty(selectAllTodo, taskLabel[0]);
  }
  addCheckName(newtodo, dom, checkbox, conTodoUl);
};
// todo中的全选更改状态
const changeSelectAllStatus = (status) => {
  const beforMoveUl = status ? conTodoUl : conDoneUl;
  const alterMoveUl = status ? conDoneUl : conTodoUl;
  const beforMoveSelectAll = status ? selectAllTodo : selectAllDone;
  const alterMoveSelectAll = status ? selectAllDone : selectAllTodo;
  const beforMoveLabel = status ? taskLabel[0] : taskLabel[1];
  const alterMoveLabel = status ? taskLabel[1] : taskLabel[0];
  const text = status ? TASK_EMPTY.TODAY_TODO_MSG : TASK_EMPTY.TODAY_DONE_MSG;
  const length = beforMoveUl.childNodes.length;
  const fragmentTodo = document.createDocumentFragment();
  let firstItem = {};
  for (let i = 0; i < length; i++) {
    if (alterMoveUl.firstChild) {
      removeEmptyBox(alterMoveUl);
    }
    firstItem = beforMoveUl.childNodes[0];
    firstItem.firstChild.name === "todoList"
      ? ((firstItem.firstChild.checked = true),
        (firstItem.firstChild.name = "doneList"))
      : ((firstItem.firstChild.checked = false),
        (firstItem.firstChild.name = "todoList"));
    fragmentTodo.appendChild(firstItem);
  }
  alterMoveUl.appendChild(fragmentTodo);
  beforMoveUl.innerHTML = "";
  listEmpty(beforMoveSelectAll, beforMoveLabel);
  listNotEmpty(alterMoveSelectAll, alterMoveLabel);
  beforMoveUl.appendChild(emptyBox(text));
};
// 复选框
// 勾选时判断是否为最后一个，是最后一个需要加上空盒子，修改全选按钮的状态
const isTodoLast = (element, clickAllBtn, taskLabel, text) => {
  element.target.parentNode.parentNode.appendChild(emptyBox(text)),
    listEmpty(clickAllBtn, taskLabel);
};
// 今日待办项状态
const changTodaySelectStatus = (element, isEdit) => {
  const status =
    element.target.parentNode.parentNode.id === "con-todo-ul" ? true : false;
  const appendUl = status ? conDoneUl : conTodoUl;
  const beforMoveSelectAll = status ? selectAllTodo : selectAllDone;
  const alterMoveSelectAll = status ? selectAllDone : selectAllTodo;
  const beforMoveLabel = status ? taskLabel[0] : taskLabel[1];
  const alterMoveLabel = status ? taskLabel[1] : taskLabel[0];
  const text = status ? TASK_EMPTY.TODAY_TODO_MSG : TASK_EMPTY.TODAY_DONE_MSG;
  // 判断是否为最后一项,为最后一项，在点击之后需要添加空盒子和给全选按钮加状态
  if (element.target.parentNode.parentNode.childNodes.length === 1 && isEdit) {
    isTodoLast(element, beforMoveSelectAll, beforMoveLabel, text);
  }
  removeEmptyBox(appendUl);
  listNotEmpty(alterMoveSelectAll, alterMoveLabel);
  appendUl.appendChild(element.target.parentNode);
  element.target.parentNode.firstChild.checked
    ? (element.target.parentNode.firstChild.name = "todoList")
    : (element.target.parentNode.firstChild.name = "doneList");
};
// 未完成状态
const changeNotDoneSelectStatus = (element) => {
  const allNotDone = document.querySelector(".allNotDone");
  // 修改checkbox的name属性值
  element.target.parentNode.firstChild.name = "doneList";
  // 当当前日期盒子只有一条数据时 移除当前盒子 否则 移除当前待办项
  element.target.parentNode.parentNode.childNodes.length === 1
    ? element.target.parentNode.parentNode.parentNode.remove()
    : element.target.parentNode.remove();
  if (allNotDone.childNodes.length === 0) {
    allNotDone.appendChild(emptyBox(TASK_EMPTY.UNFINISH_MSG));
  }
};
// 已完成
const changeDoneSelectStatus = (element) => {
  const allDone = document.querySelector(".allDone");
  // 修改checkbox的name属性值
  element.target.parentNode.firstChild.name = "todoList";
  element.target.parentNode.parentNode.childNodes.length === 1
    ? element.target.parentNode.parentNode.parentNode.remove()
    : element.target.parentNode.remove();
  // 当没有选项时添加空盒子
  if (allDone.childNodes.length === 0) {
    allDone.appendChild(emptyBox(TASK_EMPTY.FINISH_MSG));
  }
};
// 删除
// 今日待办项删除状态
const changeTodayDelStatus = (element) => {
  //  判断是否为最后一项,为最后一项，在点击之后需要添加空盒子和给全选按钮加状态
  const targetUlDom = element.target.parentNode.parentNode;
  if (targetUlDom.childNodes.length === 1) {
    const status = targetUlDom.id === "con-todo-ul" ? true : false;
    const targetSelectAll = status ? selectAllTodo : selectAllDone;
    const targetLabel = status ? taskLabel[0] : taskLabel[1];
    const text = status ? TASK_EMPTY.TODAY_TODO_MSG : TASK_EMPTY.TODAY_DONE_MSG;
    isTodoLast(element, targetSelectAll, targetLabel, text);
  }
  element.target.parentNode.remove();
};
// 已完成待办项删除状态
const changeDoneDelStatus = (element) => {
  const allDone = document.querySelector(".allDone");
  element.target.parentNode.parentNode.childNodes.length === 1
    ? element.target.parentNode.parentNode.parentNode.remove()
    : element.target.parentNode.remove();
  // 当没有选项时添加空盒子
  if (allDone.childNodes.length === 0) {
    allDone.appendChild(emptyBox(TASK_EMPTY.FINISH_MSG));
  }
};
// 未完成待办项删除状态
const changeNotDoneDelStatus = (element) => {
  const allNotDone = document.querySelector(".allNotDone");
  element.target.parentNode.parentNode.childNodes.length === 1
    ? element.target.parentNode.parentNode.parentNode.remove()
    : element.target.parentNode.remove();
  // 当没有选项时添加空盒子
  if (allNotDone.childNodes.length === 0) {
    allNotDone.appendChild(emptyBox(TASK_EMPTY.UNFINISH_MSG));
  }
};
// 编辑
// 当修改后没有修改后的时间盒子，需要添加一个新的时间盒子DOM，获取添加的位置
const getInsertDom = (obj, finishTime) => {
  for (let item in obj) {
    if (Date.parse(item) < Date.parse(finishTime)) {
      return obj[item];
    }
  }
  return null;
};
// 在完成页面将todo修改为不同时间
const changDiffTimeDone = (element, currentItemBox, finishTime, isLogin) => {
  const allDone = document.querySelector(".allDone");
  const doneBox = document.querySelectorAll(".doneBox"); //获取所有doneBox
  let DateItem; //保存当前时间盒子
  let timeSortObj = {}; // 定义时间盒子对象
  // 遍历时间盒子 是否存在当前时间
  doneBox.forEach((item) => {
    timeSortObj[item.childNodes[0].innerHTML] = item;
    if (item.childNodes[0].innerHTML == finishTime) {
      DateItem = item;
    }
  });
  // 如果当前有这个时间盒子
  if (DateItem) {
    DateItem.childNodes[1].appendChild(element.target.parentNode);
    // 如果当前没有修改后的时间盒子 需要新增
  } else {
    const timeBox = addTimeBoxDone(
      element.target.parentNode,
      finishTime,
      isLogin
    );
    const beferDom = getInsertDom(timeSortObj, finishTime); // 获取到插入的位置
    if (beferDom) {
      allDone.insertBefore(timeBox, beferDom);
    } else {
      allDone.appendChild(timeBox);
    }
  }
  if (currentItemBox.childNodes[1].childNodes.length === 0) {
    currentItemBox.remove();
  }
};
// 在未完成页面将todo修改为不同时间
const changDiffTimeNotDone = (element, currentItemBox, finishTime, isLogin) => {
  const allNotDone = document.querySelector(".allNotDone");
  const notDoneBox = document.querySelectorAll(".notDoneBox"); //获取所有doneBox
  let DateItem; //保存当前时间盒子
  let timeSortObj = {}; // 定义时间盒子对象
  // 遍历时间盒子 是否存在当前时间
  notDoneBox.forEach((item) => {
    timeSortObj[item.childNodes[0].innerHTML] = item;
    if (item.childNodes[0].innerHTML == finishTime) {
      DateItem = item;
    }
  });
  // 如果当前有这个时间盒子
  if (DateItem) {
    DateItem.childNodes[1].appendChild(element.target.parentNode);
    // 如果当前没有修改后的时间盒子 需要新增
  } else {
    const timeBox = addTimeBoxNotDone(
      element.target.parentNode,
      finishTime,
      isLogin
    );
    const beferDom = getInsertDom(timeSortObj, finishTime); // 获取到插入的位置
    if (beferDom) {
      allNotDone.insertBefore(timeBox, beferDom);
    } else {
      allNotDone.appendChild(timeBox);
    }
  }
  if (currentItemBox.childNodes[1].childNodes.length === 0) {
    currentItemBox.remove();
  }
};
// 修改UI
const changeEditStatus = (element, nameValue, itemTag, finishTime, isLogin) => {
  element.target.parentNode.childNodes.forEach((item) => {
    if (item.tagName === "SPAN") {
      item.innerText = nameValue;
    }
  }); //当修改的时间与当前的时间不一样的时候
  if (!itemTag) {
    // 获取DOM节点 当前编辑页面的外层DOM
    const getCLassName =
      element.target.parentNode.parentNode.getAttribute("class");
    const currentItemBox = element.target.parentNode.parentNode.parentNode; //保存当前点击的box
    switch (getCLassName) {
      case "doneUl":
        changDiffTimeDone(element, currentItemBox, finishTime, isLogin);
        break;
      case "notDoneUl":
        changDiffTimeNotDone(element, currentItemBox, finishTime, isLogin);
        break;
      default:
        changTodaySelectStatus(element, true);
        element.target.parentNode.parentNode.removeChild(
          element.target.parentNode
        );
    }
  }
};
const changeRecycleStatus = (element) => {
  const ulNode = element.target.parentNode.parentNode;
  ulNode.childNodes.length === 1
    ? (ulNode.removeChild(element.target.parentNode),
      ulNode.appendChild(emptyBox(TASK_EMPTY.RECYCLE_MSG)))
    : ulNode.removeChild(element.target.parentNode);
};
// 清空全部样式
const changeClearAllStatus = (dom) => {
  dom.lastChild.innerHTML = "";
  dom.lastChild.appendChild(emptyBox(TASK_EMPTY.RECYCLE_MSG));
};
export {
  changeCreateStatus,
  changeSelectAllStatus,
  changTodaySelectStatus,
  changeNotDoneSelectStatus,
  changeDoneSelectStatus,
  changeTodayDelStatus,
  changeDoneDelStatus,
  changeNotDoneDelStatus,
  changeEditStatus,
  changeRecycleStatus,
  changeClearAllStatus,
};
