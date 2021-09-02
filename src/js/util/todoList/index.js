import { inputValue, inputTrim, html_encode } from "../../common/validate";
// 弹窗
import {
  initDialog,
  popupDialog,
  closeDialog,
} from "../../components/todoDialog";
import formatDate from "../../common/format";
import CookieUtil from "../../store/cookieUtils";
import { CACHE_KEY, COMFIRM } from "../../common/constant";
import Toast from "../../common/toast";
import { cacheData } from "../../store/cache";
import {
  changeCreateDB,
  changeSelectAllDB,
  changSelectDB,
  chanegeDelDB,
  changeEditDB,
  changeRecoverDB,
  changeClearDB,
} from "./TD_database";
import {
  changeCreateLocal,
  changeSelectAllLocal,
  changSelectLocal,
  hanegeDelLocal,
  changeEditLocal,
  changeRecoverLocal,
  changeClearLocal,
  changeClearAllLocal,
} from "./TD_localStorage";
import {
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
} from "./TD_status";

const cache = cacheData();

const createTodoItem = () => {
  // 获取当前日期的时间戳
  const createTime = Date.parse(new Date());
  let newtodo = {
    status: 0,
    isDel: 0,
  };
  const taskName = inputTrim(
    document.querySelector("#dialog-input-name").value
  ); //使用nameValue存储
  const finishTime = Date.parse(
    document.querySelector("#dialog-input-time").value
  );
  if (inputValue(taskName) || inputValue(finishTime)) return;
  const flag = confirm(COMFIRM.COMFIRM_ADD_MSG); //弹出确认框
  if (flag) {
    newtodo = {
      taskName: html_encode(taskName),
      createTime,
      finishTime,
      ...newtodo,
    };
    CookieUtil.get("ses_token")
      ? changeCreateDB(newtodo, finishTime, changeCreateStatus)
      : changeCreateLocal(newtodo, finishTime, changeCreateStatus);
  }
  closeDialog();
};
const selectAllList = (isLogin, element) => {
  // 根据当前点击的element判断点击的是todo的全选还是done的全选
  const isClickAllTodo = element.target.id === "selectAllTodo" ? true : false;
  isLogin
    ? changeSelectAllDB(isClickAllTodo)
    : changeSelectAllLocal(isClickAllTodo);
  changeSelectAllStatus(isClickAllTodo);
};
// 勾选待办项修改数据
const selectTodoItem = (isLogin, element, statusFun) => {
  isLogin
    ? changSelectDB(element, statusFun)
    : changSelectLocal(element, statusFun);
};
// 删除数据
const delTodoItem = (isLogin, element, delFun) => {
  isLogin ? chanegeDelDB(element, delFun) : hanegeDelLocal(element, delFun);
};
// 编辑
const getEditData = (element, data) => {
  const item = data.find(
    ({ taskId }) => Number(element.target.parentNode.id) == taskId
  );
  return item;
};
// 编辑确认事件判断
const editSure = (isLogin, element, item) => {
  const nameValue = document.querySelector("#dialog-input-name").value;
  const finishTime = document.querySelector("#dialog-input-time").value;
  if (inputValue(nameValue) || inputValue(finishTime)) {
    return;
  }
  const flag = confirm(COMFIRM.COMFIRM_EDIT_MSG);
  if (flag) {
    isLogin
      ? changeEditDB(element, item, nameValue, finishTime, changeEditStatus)
      : changeEditLocal(element, item, nameValue, finishTime, changeEditStatus);
  }
  closeDialog();
};
// 调用编辑弹窗
const editList = (isLogin, element) => {
  // 点击弹窗需要获取数据，自动补充到input框中
  let data = [];
  data = cache.get(CACHE_KEY.CACHE_TODO);
  const item = getEditData(element, data);
  initDialog({
    text: "编辑任务项",
    nameValue: item.taskName,
    timeValue: formatDate(new Date(item.finishTime)),
    okEvent: editSure.bind(this, isLogin, element, item),
  });
  popupDialog();
};
// 选择勾线事件
const chooseList = (listTag, isLogin, element) => {
  switch (listTag) {
    // 今日待办项
    case "TODO":
      return selectTodoItem(isLogin, element, changTodaySelectStatus);
    //  未完成
    case "NOTDONE":
      return selectTodoItem(isLogin, element, changeNotDoneSelectStatus);
    //  已完成
    case "DONE":
      return selectTodoItem(isLogin, element, changeDoneSelectStatus);
    default:
      console.log("error");
  }
};
// 选择删除事件
const chooseDel = (delTag, isLogin, element) => {
  switch (delTag) {
    // 今日待办项
    case "TODODEL":
      return delTodoItem(isLogin, element, changeTodayDelStatus);
    //  未完成
    case "NOTDONEDEL":
      return delTodoItem(isLogin, element, changeNotDoneDelStatus);
    //  已完成
    case "DONEDEL":
      return delTodoItem(isLogin, element, changeDoneDelStatus);
    default:
      console.log("error");
  }
};
const todoListEvent = (listTag, delTag, isLogin, element) => {
  const nodeName = element.target.nodeName.toLocaleLowerCase();
  if (nodeName == "input" || nodeName == "label") {
    switch (element.target.getAttribute("name")) {
      case "todoCheck":
        chooseList(listTag, isLogin, element);
        break;
      case "todoDel":
        chooseDel(delTag, isLogin, element);
        break;
      case "todoEdit":
        editList(isLogin, element);
        break;
      default:
    }
  }
};
// 待办项恢复
const recoverRecycle = (isLogin, element) => {
  isLogin
    ? changeRecoverDB(element, changeRecycleStatus)
    : changeRecoverLocal(element, changeRecycleStatus);
};
// 删除回收站
const clearRecycle = (isLogin, element) => {
  if (isLogin) {
    const catcheData = cache.get(CACHE_KEY.CACHE_TODO);
    let item = [];
    item.push(
      catcheData.find(
        (item) => item.taskId == Number(element.target.parentNode.id)
      )
    );
    changeClearDB(item, element, changeRecycleStatus);
  } else {
    changeClearLocal(element, changeRecycleStatus);
  }
};
// 清空回收站
const clearAllRecycle = (isLogin, element) => {
  if (element.lastChild.firstChild.tagName == "LI") {
    let flag = confirm(COMFIRM.COMFIRM_CLEAR_MSG); //弹出确认框
    if (flag) {
      if (isLogin) {
        let catcheData = cache.get(CACHE_KEY.CACHE_TODO);
        const filterDelList = catcheData.filter((item) => item.isDel);
        changeClearDB(filterDelList, element, changeClearAllStatus);
      } else {
        changeClearAllLocal(element, changeClearAllStatus);
      }
    }
  } else {
    Toast.show("当前回收站为空");
  }
};
export {
  createTodoItem,
  selectAllList,
  todoListEvent,
  recoverRecycle,
  clearRecycle,
  clearAllRecycle,
};
