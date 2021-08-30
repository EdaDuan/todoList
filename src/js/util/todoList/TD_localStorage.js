/*
 * @Description:
 * @Version: 2.0
 * @Autor: duanfy
 * @Date: 2021-08-26 17:24:01
 * @LastEditors: duanfy
 * @LastEditTime: 2021-08-27 19:14:51
 */
import formatDate from "../../common/formate";
import { todoLocalStorage } from "../../store/localStorage";
import Toast from "../../common/toast";
const changeCreateLocal = (newtodo, finishTime, changeCreateStatus) => {
  let localTodoList = todoLocalStorage();
  let taskId = localTodoList.length
    ? localTodoList[localTodoList.length - 1].taskId + 1
    : 0;
  newtodo = {
    taskId,
    ...newtodo,
  };
  if (formatDate(new Date(finishTime)) == formatDate(new Date())) {
    changeCreateStatus(newtodo);
  }
  localTodoList.push(newtodo);
  localStorage.setItem("todoList", JSON.stringify(localTodoList));
};
//获取到今日待办项完成与未完成
const filterStatusLocal = (data, status) => {
  data.map((item) => {
    if (formatDate(new Date(item.finishTime)) == formatDate(new Date())) {
      status ? (item.status = 1) : (item.status = 0);
    }
  });
  return data;
};
// 全选是修改本地数据
const changeSelectAllLocal = (status) => {
  let localTodoList = todoLocalStorage();
  let filterData = filterStatusLocal(localTodoList, status);
  localStorage.setItem("todoList", JSON.stringify(filterData));
};
// 勾选待办项修改本地数据
const changSelectLocal = (e, statusFun) => {
  let localTodoList = todoLocalStorage();
  const item = localTodoList.find(
    ({ taskId }) => e.target.parentNode.id == taskId
  );
  if (item) {
    item.status ? (item.status = 0) : (item.status = 1);
    statusFun(e, true);
    localStorage.setItem("todoList", JSON.stringify(localTodoList));
  } else {
    e.target.parentNode.firstChild.checked = true;
    Toast.error("勾选任务项失败");
  }
};
// 删除本地数据
const hanegeDelLocal = (e, delFun) => {
  let localTodoList = todoLocalStorage();
  const item = localTodoList.find(
    ({ taskId }) => e.target.parentNode.id == taskId
  );
  item ? ((item.isDel = 1), delFun(e)) : Toast.error("删除失败");
  localStorage.setItem("todoList", JSON.stringify(localTodoList));
};
// 编辑修改本地数据
const changeEditLocal = (e, item, data, nameValue, finishTime, editFun) => {
  console.log("data: ", data);
  let itemTag = item.finishTime === Date.parse(finishTime) ? true : false;
  let data1 = todoLocalStorage();
  console.log("data1: ", data1);
  item
    ? ((item.taskName = nameValue),
      console.log("item: ", item),
      (item.finishTime = Date.parse(finishTime)),
      editFun(e, nameValue, itemTag, finishTime, false),
      console.log("data: ", data),
      localStorage.setItem("todoList", JSON.stringify(data)))
    : Toast.error("编辑待办项失败");
};
// 回收站恢复本地数据
const changeRecoverLocal = (e, recoverFun) => {
  let localTodoList = todoLocalStorage();
  const item = localTodoList.find(
    ({ taskId }) => e.target.parentNode.id == taskId
  );
  item.isDel = 0;
  recoverFun(e);
  localStorage.setItem("todoList", JSON.stringify(localTodoList));
};
// 回收站删除本地数据
const changeClearLocal = (e, clearFun) => {
  let localTodoList = todoLocalStorage();
  localTodoList.splice(
    localTodoList.findIndex(
      (item) => item.taskId == Number(e.target.parentNode.id)
    ),
    1
  );
  clearFun(e);
  localStorage.setItem("todoList", JSON.stringify(localTodoList));
};
// 回收站本地清空回收站
const changeClearAllLocal = (dom, clearAllFun) => {
  let localTodoList = todoLocalStorage();
  const filterDelList = localTodoList.filter((item) => item.isDel);
  filterDelList.map((listItem) => {
    localTodoList.splice(
      localTodoList.findIndex((item) => item.taskId === listItem.taskId),
      1
    );
  });
  clearAllFun(dom);
  localStorage.setItem("todoList", JSON.stringify(localTodoList));
};
export {
  changeCreateLocal,
  changeSelectAllLocal,
  changSelectLocal,
  hanegeDelLocal,
  changeEditLocal,
  changeRecoverLocal,
  changeClearLocal,
  changeClearAllLocal,
};
