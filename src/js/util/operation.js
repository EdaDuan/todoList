import {
  removeEmptyBox,
  isListUl,
  listEmpty,
  listNotEmpty,
  inputValue,
  emptyBox,
} from "./common";
// 弹窗
import { initDialog, popupDialog, closeDialog } from "../components/dialog";
import formatData from "../util/formate";
import { createTodo, addCheckName } from "../components/createTodo";
import CookieUtil from "./cookieUtils";
import {
  newDataDB,
  changeAllDataDB,
  changDataDB,
  delDataDB,
  editDataDB,
  recoverRecycleDB,
  clearRecycleDB,
} from "./operateDB";
import {
  newDataLocal,
  changeAllDataLocal,
  changDataLocal,
  delDataLocal,
  editDataLocal,
  recoverRecycleLocal,
  clearRecycleLocal,
  clearAllDateLocal,
} from "./operateLocal";
import { addTimeBoxNotDone, addTimeBoxDone } from "../components/createTimeBox";
import Toast from "../util/toast";
import { cacheData } from "./storeData";
let cache = cacheData();
let conTodoUl = document.querySelector(".con-todo-ul");
let conDoneUl = document.querySelector(".con-done-ul");
let selectAllTodo = document.getElementById("selectAllTodo");
let selectAllDone = document.getElementById("selectAllDone");
let taskLabel = document.getElementsByClassName("taskLabel");
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
const newSure = () => {
  let dialogInputName = document.querySelector("#dialog-input-name");
  let dialogInputTime = document.querySelector("#dialog-input-time");
  // 获取时间戳
  let createTime = Date.parse(new Date());
  let newtodo = {
    status: 0,
    isDel: 0,
  };
  let taskName = dialogInputName.value; //使用nameValue存储
  let finishTime = Date.parse(dialogInputTime.value);
  if (inputValue(taskName) || inputValue(finishTime)) {
    return;
  } else {
    let flag = confirm("您确定添加该待办项吗?"); //弹出确认框
    if (flag) {
      let useMsgCookie = CookieUtil.get("ses_token");
      newtodo = {
        taskName,
        createTime,
        finishTime,
        ...newtodo,
      };
      useMsgCookie
        ? newDataDB(
            newtodo,
            finishTime,
            conTodoUl,
            selectAllTodo,
            taskLabel[0],
            changeNewStatus
          )
        : newDataLocal(
            newtodo,
            finishTime,
            conTodoUl,
            selectAllTodo,
            taskLabel[0],
            changeNewStatus
          );
      closeDialog();
    } else closeDialog();
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
const changeAllData = async (status, isLogin) => {
  if (isLogin) {
    await changeAllDataDB(status);
  } else {
    changeAllDataLocal(status);
  }
};
const selectAllTodoList = (isLogin) => {
  changeAllData(true, isLogin);
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
};

const selectAllDoneList = (isLogin) => {
  changeAllData(false, isLogin);
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
  isEdit,
  text
) => {
  // 判断是否为最后一项,为最后一项，在点击之后需要添加空盒子和给全选按钮加状态
  if (e.target.parentNode.parentNode.childNodes.length === 1 && isEdit) {
    isTodoLast(e, clickAllBtn, clickLabel, text);
  }
  e.target.parentNode.firstChild.checked
    ? isTodoEmpty(e, renderAllBtn, renderLabel, ul, "todoList")
    : isTodoEmpty(e, renderAllBtn, renderLabel, ul, "doneList");
};
// 今日待办项状态
const changTodoStatus = (e, isEdit) => {
  isListUl(e)
    ? // todo
      changeStatus(
        e,
        selectAllTodo,
        selectAllDone,
        taskLabel[0],
        taskLabel[1],
        conDoneUl,
        isEdit,
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
        isEdit,
        "今日还未完成任务～"
      );
};
// 未完成状态
const notDoneChangeStatus = (e) => {
  let allNotDone = document.querySelector(".allNotDone");
  // 修改checkbox的name属性值
  e.target.parentNode.firstChild.name = "doneList";
  // 当当前日期盒子只有一条数据时 移除当前盒子 否则 移除当前待办项
  e.target.parentNode.parentNode.childNodes.length === 1
    ? e.target.parentNode.parentNode.parentNode.remove()
    : e.target.parentNode.remove();
  if (allNotDone.childNodes.length === 0) {
    allNotDone.appendChild(emptyBox("所有任务已完成～"));
  }
};
// 已完成
const doneChangeStatus = (e) => {
  let allDone = document.querySelector(".allDone");
  // 修改checkbox的name属性值
  e.target.parentNode.firstChild.name = "todoList";
  e.target.parentNode.parentNode.childNodes.length === 1
    ? e.target.parentNode.parentNode.parentNode.remove()
    : e.target.parentNode.remove();
  // 当没有选项时添加空盒子
  if (allDone.childNodes.length === 0) {
    allDone.appendChild(emptyBox("没有任务已完成～"));
  }
};
// 勾选待办项修改数据
const changeData = (isLogin, e, statusFun) => {
  if (isLogin) {
    changDataDB(e, statusFun);
  } else {
    changDataLocal(e, statusFun);
  }
};
// 删除
// 今日待办项删除状态
const delStatus = (e) => {
  //  判断是否为最后一项,为最后一项，在点击之后需要添加空盒子和给全选按钮加状态
  if (e.target.parentNode.parentNode.childNodes.length === 1) {
    isListUl(e)
      ? isTodoLast(e, selectAllTodo, taskLabel[0], "今日任务已全部完成～")
      : isTodoLast(e, selectAllDone, taskLabel[1], "今日还未完成任务～");
  }
  e.target.parentNode.remove();
};
// 已完成待办项删除状态
const delDoneStatus = (e) => {
  let allDone = document.querySelector(".allDone");
  e.target.parentNode.parentNode.childNodes.length === 1
    ? e.target.parentNode.parentNode.parentNode.remove()
    : e.target.parentNode.remove();
  // 当没有选项时添加空盒子
  if (allDone.childNodes.length === 0) {
    allDone.appendChild(emptyBox("没有任务已完成～"));
  }
};
// 未完成待办项删除状态
const delNotDoneStatus = (e) => {
  let allNotDone = document.querySelector(".allNotDone");
  e.target.parentNode.parentNode.childNodes.length === 1
    ? e.target.parentNode.parentNode.parentNode.remove()
    : e.target.parentNode.remove();
  // 当没有选项时添加空盒子
  if (allNotDone.childNodes.length === 0) {
    allNotDone.appendChild(emptyBox("所有任务已完成～"));
  }
};
// 删除数据
const delData = (isLogin, e, delFun) => {
  if (isLogin) {
    delDataDB(e, delFun);
  } else {
    delDataLocal(e, delFun);
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
  let allDone = document.querySelector(".allDone");
  let doneBox = document.querySelectorAll(".doneBox"); //获取所有doneBox
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
    let timeBox = addTimeBoxDone(
      element.target.parentNode,
      finishTime,
      isLogin
    );
    let beferDom = getInsertDom(timeSortObj, finishTime); // 获取到插入的位置
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
// 在完成页面将todo修改为不同时间
const changDiffTimeNotDone = (element, currentItemBox, finishTime, isLogin) => {
  let allNotDone = document.querySelector(".allNotDone");
  let notDoneBox = document.querySelectorAll(".notDoneBox"); //获取所有doneBox
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
    let timeBox = addTimeBoxNotDone(
      element.target.parentNode,
      finishTime,
      isLogin
    );
    let beferDom = getInsertDom(timeSortObj, finishTime); // 获取到插入的位置
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
    let getCLassName =
      element.target.parentNode.parentNode.getAttribute("class");
    let currentItemBox = element.target.parentNode.parentNode.parentNode; //保存当前点击的box
    switch (getCLassName) {
      case "doneUl":
        changDiffTimeDone(element, currentItemBox, finishTime, isLogin);
        break;
      case "notDoneUl":
        changDiffTimeNotDone(element, currentItemBox, finishTime, isLogin);
        break;
      default:
        changTodoStatus(element, true);
        element.target.parentNode.parentNode.removeChild(
          element.target.parentNode
        );
    }
  }
};
// 编辑
const getEditData = (e, data) => {
  const item = data.find(
    ({ taskId }) => Number(e.target.parentNode.id) == taskId
  );
  return item;
};
// 编辑确认事件判断
const editSure = (isLogin, e, item, data) => {
  let dialogInputName = document.querySelector("#dialog-input-name");
  let dialogInputTime = document.querySelector("#dialog-input-time");
  let nameValue = dialogInputName.value;
  let finishTime = dialogInputTime.value;
  if (inputValue(nameValue) || inputValue(finishTime)) {
    return;
  }
  var flag = confirm("您确定修改该待办项吗?");
  if (flag) {
    isLogin
      ? editDataDB(e, item, nameValue, finishTime, changeEditStatus)
      : editDataLocal(e, item, data, nameValue, finishTime, changeEditStatus);
  } else return;
  closeDialog();
};
// 调用编辑弹窗
const editList = async (isLogin, e) => {
  // 点击弹窗需要获取数据，自动补充到input框中
  let data = [];
  let item = {};
  if (isLogin) {
    let catcheData = await cache.get("GET_TODO");
    (item = getEditData(e, catcheData)),
      initDialog({
        text: "编辑任务项",
        nameValue: item.taskName,
        timeValue: formatData(new Date(item.finishTime)),
        okEvent: editSure.bind(this, isLogin, e, item),
      });
  } else {
    data = JSON.parse(localStorage.getItem("todoList"))
      ? JSON.parse(localStorage.getItem("todoList"))
      : [];
    item = getEditData(e, data);
    initDialog({
      text: "编辑任务项",
      nameValue: item.taskName,
      timeValue: formatData(new Date(item.finishTime)),
      okEvent: editSure.bind(this, isLogin, e, item, data),
    });
  }
  popupDialog();
};

// 选择勾线事件
const chooseList = (listTag, isLogin, e) => {
  switch (listTag) {
    // 今日待办项
    case "TODO":
      return changeData(isLogin, e, changTodoStatus);
    //  未完成
    case "NOTDONE":
      return changeData(isLogin, e, notDoneChangeStatus);
    //  已完成
    case "DONE":
      return changeData(isLogin, e, doneChangeStatus);
    default:
      console.log("error");
  }
};
// 选择删除事件
const chooseDel = (delTag, isLogin, e) => {
  switch (delTag) {
    // 今日待办项
    case "TODODEL":
      return delData(isLogin, e, delStatus);
    //  未完成
    case "NOTDONEDEL":
      return delData(isLogin, e, delNotDoneStatus);
    //  已完成
    case "DONEDEL":
      return delData(isLogin, e, delDoneStatus);
    default:
      console.log("error");
  }
};
const todoListEvent = (listTag, delTag, isLogin, e) => {
  let nodeName = e.target.nodeName.toLocaleLowerCase();
  if (nodeName == "input" || nodeName == "label") {
    switch (e.target.getAttribute("name")) {
      case "todoCheck":
        chooseList(listTag, isLogin, e);
        break;
      case "todoDel":
        chooseDel(delTag, isLogin, e);
        break;
      case "todoEdit":
        editList(isLogin, e);
        break;
      default:
    }
  }
};
// 回收站
// 修改状态
const changeRecycleStatus = (e) => {
  let ulNode = e.target.parentNode.parentNode;
  ulNode.childNodes.length === 1
    ? (ulNode.removeChild(e.target.parentNode),
      ulNode.appendChild(emptyBox("回收站为空～")))
    : ulNode.removeChild(e.target.parentNode);
};
// 待办项恢复
const recoverRecycle = (isLogin, e) => {
  if (isLogin) {
    recoverRecycleDB(e, changeRecycleStatus);
  } else {
    recoverRecycleLocal(e, changeRecycleStatus);
  }
};
// 删除回收站
const clearRecycle = async (isLogin, e) => {
  if (isLogin) {
    let catcheData = await cache.get("GET_TODO");
    let item = [];
    item.push(
      catcheData.find((item) => item.taskId == Number(e.target.parentNode.id))
    );
    clearRecycleDB(item, e, changeRecycleStatus);
  } else {
    clearRecycleLocal(e, changeRecycleStatus);
  }
};
// 清空全部样式
const clearAllStatus = (dom) => {
  dom.lastChild.innerHTML = "";
  dom.lastChild.appendChild(emptyBox("回收站为空～"));
};
// 清空回收站
const clearAllRecycle = async (isLogin, dom) => {
  if (dom.lastChild.firstChild.tagName == "LI") {
    var flag = confirm("您确定清空回收站吗?"); //弹出确认框
    if (flag) {
      if (isLogin) {
        let catcheData = await cache.get("GET_TODO");
        const filterDelList = catcheData.filter((item) => item.isDel);
        clearRecycleDB(filterDelList, dom, clearAllStatus);
      } else {
        clearAllDateLocal(dom, clearAllStatus);
      }
    }
  } else {
    Toast.show("当前回收站为空");
  }
};
export {
  newTodoList,
  selectAllTodoList,
  selectAllDoneList,
  todoListEvent,
  recoverRecycle,
  clearRecycle,
  clearAllRecycle,
};
