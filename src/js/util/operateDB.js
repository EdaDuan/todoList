/*
 * @Author: your name
 * @Date: 2021-07-20 11:39:42
 * @LastEditTime: 2021-08-09 16:29:58
 * @LastEditors: duanfy
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/util/operateDB.js
 */
import { get, post } from "../../http/index";
import formatData from "../util/formate";
import Toast from "../util/toast";
import { cacheData } from "./storeData";
let cache = cacheData();
// 新建待办项
const newDataDB = async (
  newtodo,
  finishTime,
  conTodoUl,
  selectAllTodo,
  taskLabel,
  changeNewStatus
) => {
  let res = await post("insertTodoList", newtodo);
  if (res.data.ok) {
    let result = await get("getTodoList");
    if (result.data.ok) {
      cache.set("GET_TODO", result.data.data);
      if (formatData(new Date(finishTime)) == formatData(new Date())) {
        let catcheData = await cache.get("GET_TODO");
        changeNewStatus(
          catcheData[catcheData.length - 1],
          conTodoUl,
          selectAllTodo,
          taskLabel
        );
      }
    } else Toast.error(res.error);
  } else {
    Toast.error(res.data.error);
  }
};
//获取到今日待办项完成与未完成
const filterStatus = (data, status) => {
  return status
    ? data.filter(
        (item) =>
          item.status === 0 &&
          formatData(new Date(item.finishTime)) == formatData(new Date())
      )
    : data.filter(
        (item) =>
          item.status === 1 &&
          formatData(new Date(item.finishTime)) == formatData(new Date())
      );
};
// 全选时更改数据库数据
const changeAllDataDB = async (status) => {
  let catcheData = await cache.get("GET_TODO");
  let filterData = filterStatus(catcheData, status);
  if (filterData.length !== 0) {
    let res = await post("updateTodoStatus", filterData);
    if (res.data.ok) {
      let result = await get("getTodoList");
      result.data.ok
        ? cache.set("GET_TODO", result.data.data)
        : Toast.error(result.data.error);
    } else {
      Toast.error(res.data.error);
    }
  }
};
// 勾选待办项修改数据库数据
const changDataDB = async (e, statusFun) => {
  let catcheData = await cache.get("GET_TODO");
  const item = [];
  item.push(catcheData.find(({ taskId }) => e.target.parentNode.id == taskId));
  let res = await post("updateTodoStatus", item);
  if (res.data.ok) {
    let result = await get("getTodoList");
    result.data.ok
      ? (cache.set("GET_TODO", result.data.data), statusFun(e, true))
      : Toast.error(result.data.error);
  } else {
    Toast.error(res.data.error);
  }
};
// 假删除数据库数据
const delDataDB = async (e, delFun) => {
  let catcheData = await cache.get("GET_TODO");
  let item = catcheData.find(({ taskId }) => e.target.parentNode.id == taskId);
  let res = await post("moveTodoList", item);
  if (res.data.ok) {
    let result = await get("getTodoList");
    result.data.ok
      ? (cache.set("GET_TODO", result.data.data), delFun(e))
      : Toast.error(result.data.error);
  } else {
    Toast.error(res.data.error);
  }
};
// 编辑 修改数据
const editDataDB = async (e, item, nameValue, finishTime, editFun) => {
  item.taskName = nameValue;
  item.finishTime = Date.parse(finishTime);

  let res = await post("editTodoList", item);
  if (res.data.ok) {
    let result = await get("getTodoList");
    result.data.ok
      ? (cache.set("GET_TODO", result.data.data), editFun(e, nameValue))
      : Toast.error(result.data.error);
  } else {
    Toast.error(res.data.error);
  }
};
// 回收站数据库恢复数据
const recoverRecycleDB = async (e, recoverFun) => {
  let catcheData = await cache.get("GET_TODO");
  const item = catcheData.find(
    ({ taskId }) => e.target.parentNode.id == taskId
  );
  let res = await post("moveTodoList", item);
  if (res.data.ok) {
    let result = await get("getTodoList");
    result.data.ok
      ? (cache.set("GET_TODO", result.data.data), recoverFun(e))
      : Toast.error(result.data.error);
  } else {
    Toast.error(res.data.error);
  }
};
// 回收站删除数据库数据
const clearRecycleDB = async (list, dom, clearFun) => {
  let res = await post("deleteTodoList", list);
  if (res.data.ok) {
    let result = await get("getTodoList");
    result.data.ok
      ? (cache.set("GET_TODO", result.data.data), clearFun(dom))
      : Toast.error(result.data.error);
  } else {
    Toast.error(res.data.error);
  }
};
export {
  newDataDB,
  changeAllDataDB,
  changDataDB,
  delDataDB,
  editDataDB,
  recoverRecycleDB,
  clearRecycleDB,
};
