import {
  removeEmptyBox,
  isListUl,
  listEmpty,
  listNotEmpty,
  inputValue,
  emptyBox,
} from "./common";
// 弹窗
import { initDialog, popupDialog, closeDialog } from "./dialog";
import formatData from "../util/formate";
import { createTodo, addCheckName } from "../components/createTodo";
import {
  insertData,
  getData,
  updateTodayStatus,
  moveTodoList,
  editTodoList,
} from "../../http";
import { todoListDataRender } from "../components/todoList";

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
const newSure = async () => {
  let dialogInputName = document.querySelector("#dialog-input-name");
  let dialogInputTime = document.querySelector("#dialog-input-time");
  // 获取时间戳
  let createTime = Date.parse(new Date());
  let newtodo = {
    status: 1,
    isDel: 0,
    userId: "1001",
  };
  let taskName = dialogInputName.value; //使用nameValue存储
  let finishTime = Date.parse(dialogInputTime.value);
  if (inputValue(taskName) || inputValue(finishTime)) {
    return;
  } else {
    var flag = confirm("您确定添加该待办项吗?"); //弹出确认框
    if (flag) {
      newtodo = {
        taskName,
        createTime,
        finishTime,
        ...newtodo,
      };
      insertData(newtodo).then((res) => {
        if (res.ok) {
          if (formatData(new Date(finishTime)) == formatData(new Date())) {
            changeNewStatus(newtodo, conTodoUl, selectAllTodo, taskLabel[0]);
          }
          getData().then((res) => {
            if (res.ok) todoListDataRender(res.data);
          });
        } else {
          alert("新建失败～");
        }
      });
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
//获取到今日待办项完成与未完成
const filterStatus = (data, status) => {
  return status
    ? data.filter(
        (item) =>
          item.status === 1 &&
          formatData(new Date(item.finishTime)) == formatData(new Date())
      )
    : data.filter(
        (item) =>
          item.status === 0 &&
          formatData(new Date(item.finishTime)) == formatData(new Date())
      );
};
// 更改数据
const changeAllData = (status) => {
  getData().then(async (res) => {
    if (res.ok) {
      let filterData = filterStatus(res.data, status);
      if (filterData.length !== 0) {
        await updateTodayStatus(filterData);
      }
    } else {
      alert("全选失败");
    }
  });
};

const selectAllTodoList = () => {
  changeAllData(true);
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

const selectAllDoneList = () => {
  changeAllData(false);
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
// 今日待办项状态
const changTodoStatus = (e) => {
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
};
// 未完成状态
const notDoneChanStatus = (e) => {
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
// 已完成的勾选事件
const doneChanStatus = (e) => {
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
const changeData = (e, statusFun) => {
  getData().then((res) => {
    if (res.ok) {
      const item = [];
      item.push(
        res.data.find(({ taskId }) => e.target.parentNode.id == taskId)
      );
      updateTodayStatus(item).then((res) => {
        res.ok ? statusFun : alert("勾选任务项失败～");
      });
    } else {
      alert("数据请求失败～");
    }
  });
};
// 今日待办勾选事件
const changeList = (e) => {
  changeData(e, changTodoStatus(e));
};
// 未完成的勾选事件
const notDoneChangList = (e) => {
  // 改变数据
  changeData(e, notDoneChanStatus(e));
};
// 完成勾选事件
const doneChangList = (e) => {
  // 改变数据
  changeData(e, doneChanStatus(e));
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
const delData = async (e, delFun) => {
  let res = await getData();
  if (res.ok) {
    let item = res.data.find(({ taskId }) => e.target.parentNode.id == taskId);
    moveTodoList(item).then((res) => {
      res.ok ? delFun : alert("删除任务项失败～");
    });
  } else {
    alert("数据请求失败～");
  }
};
// 今日待办项的删除
const delList = (e) => {
  delData(e, delStatus(e));
};
// 完成中的删除事件
const delDoneList = (e) => {
  delData(e, delDoneStatus(e));
};
// 未完成中的删除事件
const delNotDoneList = (e) => {
  delData(e, delNotDoneStatus(e));
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
const changeEditData = (e, data, list, nameValue, finishTime, editFun) => {
  data.forEach((item) => {
    if (item.taskId === list.taskId) {
      item.taskName = nameValue;
      item.finishTime = Date.parse(finishTime);
      editTodoList(item).then((res) => {
        res.ok ? editFun(e, nameValue) : alert("编辑待办项失败～");
      });
    }
  });
};
// 编辑确认事件判断
const editSure = (e, item, data) => {
  let dialogInputName = document.querySelector("#dialog-input-name");
  let dialogInputTime = document.querySelector("#dialog-input-time");
  let nameValue = dialogInputName.value;
  let finishTime = dialogInputTime.value;
  if (inputValue(nameValue) || inputValue(finishTime)) {
    return;
  }
  var flag = confirm("您确定修改该待办项吗?");
  if (flag) {
    changeEditData(e, data, item, nameValue, finishTime, changeEditStatus);
  } else {
    return;
  }
  closeDialog();
};
// 调用编辑弹窗
const editList = async (e) => {
  // 点击弹窗需要获取数据，自动补充到input框中
  let res = await getData();
  if (res.ok) {
    let data = res.data;
    console.log("data: ", data);
    let item = getEditData(e, data);
    console.log("item: ", item);
    initDialog({
      text: "编辑任务项",
      nameValue: item.taskName,
      timeValue: formatData(new Date(item.finishTime)),
      okEvent: editSure.bind(this, e, item, data),
    });
    popupDialog();
  } else {
    alert("编辑出错了");
  }
};

// 选择勾线事件
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
// 选择删除事件
const chooseDel = (delTag, e) => {
  switch (delTag) {
    // 今日待办项
    case "TODODEL":
      return delList(e);
    //  未完成
    case "NOTDONEDEL":
      return delNotDoneList(e);
    //  已完成
    case "DONEDEL":
      return delDoneList(e);
    default:
      console.log("error");
  }
};
const todoListEvent = (listTag, delTag, e) => {
  let nodeName = e.target.nodeName.toLocaleLowerCase();
  if (nodeName == "input" || nodeName == "label") {
    switch (e.target.id) {
      case "todoCheck":
        // e.preventDefault();
        chooseList(listTag, e);
        break;
      case "todoDel":
        // delList(e);
        chooseDel(delTag, e);
        break;
      case "todoEdit":
        editList(e);
        break;
      default:
    }
  }
};

export { newTodoList, selectAllTodoList, selectAllDoneList, todoListEvent };
