/*
 * @Author: your name
 * @Date: 2021-07-20 11:39:52
 * @LastEditTime: 2021-08-18 11:35:09
 * @LastEditors: duanfy
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/util/operateLocal.js
 */
// 新建待办项
import formatData from "../util/formate";
import Toast from "../util/toast";
const newDataLocal = (
  newtodo,
  finishTime,
  conTodoUl,
  selectAllTodo,
  taskLabel,
  changeNewStatus
) => {
  let localTodoList = JSON.parse(localStorage.getItem("todoList"))
    ? JSON.parse(localStorage.getItem("todoList"))
    : [];
  let taskId = localTodoList.length
    ? localTodoList[localTodoList.length - 1].taskId + 1
    : 0;
  newtodo = {
    taskId,
    ...newtodo,
  };
  if (formatData(new Date(finishTime)) == formatData(new Date())) {
    changeNewStatus(newtodo, conTodoUl, selectAllTodo, taskLabel);
  }
  localTodoList.push(newtodo);
  localStorage.setItem("todoList", JSON.stringify(localTodoList));
};
//获取到今日待办项完成与未完成
const filterStatusLocal = (data, status) => {
  data.map((item) => {
    if (formatData(new Date(item.finishTime)) == formatData(new Date())) {
      status ? (item.status = 1) : (item.status = 0);
    }
  });
  return data;
};
// 全选是修改本地数据
const changeAllDataLocal = (status) => {
  let localTodoList = JSON.parse(localStorage.getItem("todoList"))
    ? JSON.parse(localStorage.getItem("todoList"))
    : [];
  let filterData = filterStatusLocal(localTodoList, status);
  localStorage.setItem("todoList", JSON.stringify(filterData));
};
// 勾选待办项修改本地数据
const changDataLocal = (e, statusFun) => {
  let localTodoList = JSON.parse(localStorage.getItem("todoList"))
    ? JSON.parse(localStorage.getItem("todoList"))
    : [];
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
const delDataLocal = (e, delFun) => {
  let localTodoList = JSON.parse(localStorage.getItem("todoList"))
    ? JSON.parse(localStorage.getItem("todoList"))
    : [];
  const item = localTodoList.find(
    ({ taskId }) => e.target.parentNode.id == taskId
  );
  item ? ((item.isDel = 1), delFun(e)) : Toast.error("删除失败");
  localStorage.setItem("todoList", JSON.stringify(localTodoList));
};
// 编辑修改本地数据
const editDataLocal = (e, item, data, nameValue, finishTime, editFun) => {
  let itemTag = item.finishTime === Date.parse(finishTime) ? true : false;
  item
    ? ((item.taskName = nameValue),
      (item.finishTime = Date.parse(finishTime)),
      editFun(e, nameValue, itemTag, finishTime, false),
      localStorage.setItem("todoList", JSON.stringify(data)))
    : Toast.error("编辑待办项失败");
};
// 回收站恢复本地数据
const recoverRecycleLocal = (e, recoverFun) => {
  let localTodoList = JSON.parse(localStorage.getItem("todoList"))
    ? JSON.parse(localStorage.getItem("todoList"))
    : [];
  const item = localTodoList.find(
    ({ taskId }) => e.target.parentNode.id == taskId
  );
  item.isDel = 0;
  recoverFun(e);
  localStorage.setItem("todoList", JSON.stringify(localTodoList));
};
// 回收站删除本地数据
const clearRecycleLocal = (e, clearFun) => {
  let localTodoList = JSON.parse(localStorage.getItem("todoList"))
    ? JSON.parse(localStorage.getItem("todoList"))
    : [];
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
const clearAllDateLocal = (dom, clearAllFun) => {
  let localTodoList = JSON.parse(localStorage.getItem("todoList"))
    ? JSON.parse(localStorage.getItem("todoList"))
    : [];
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
  newDataLocal,
  changeAllDataLocal,
  changDataLocal,
  delDataLocal,
  editDataLocal,
  recoverRecycleLocal,
  clearRecycleLocal,
  clearAllDateLocal,
};
