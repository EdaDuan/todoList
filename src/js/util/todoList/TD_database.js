/*
 * @Description:
 * @Version: 2.0
 * @Autor: duanfy
 * @Date: 2021-08-26 17:23:19
 * @LastEditors: duanfy
 * @LastEditTime: 2021-08-29 17:55:57
 */
import { get, post } from "../../http/index";
import formatDate from "../../common/formate";
import Toast from "../../common/toast";
import { CACHE_KEY } from "../../common/constant";
import { cacheData } from "../../store/cache";
import { handelError } from "../../common/handelError";
let cache = cacheData();
// 新建待办项
const changeCreateDB = async (newtodo, finishTime, changeNewStatus) => {
  console.log("newtodo: ", newtodo);
  let res = await handelError(post("insertTodoList", newtodo));
  if (res.ok) {
    let result = await handelError(get("getTodoList"));
    if (result.ok) {
      cache.set(CACHE_KEY.CACHE_TODO, result.data);
      if (formatDate(new Date(finishTime)) == formatDate(new Date())) {
        let catcheData = cache.get(CACHE_KEY.CACHE_TODO);
        changeNewStatus(catcheData[catcheData.length - 1]);
      }
    } else Toast.error(result.error);
  } else {
    Toast.error(res.error);
  }
};
//获取到今日待办项完成与未完成
const filterStatus = (data, status) => {
  return status
    ? data.filter(
        (item) =>
          item.status === 0 &&
          formatDate(new Date(item.finishTime)) == formatDate(new Date())
      )
    : data.filter(
        (item) =>
          item.status === 1 &&
          formatDate(new Date(item.finishTime)) == formatDate(new Date())
      );
};
// 全选时更改数据库数据
const changeSelectAllDB = async (status) => {
  let catcheData = cache.get(CACHE_KEY.CACHE_TODO);
  let filterData = filterStatus(catcheData, status);
  if (filterData.length !== 0) {
    let res = await handelError(post("updateTodoList", filterData));
    if (res.ok) {
      let result = await handelError(get("getTodoList"));
      result.ok
        ? cache.set(CACHE_KEY.CACHE_TODO, result.data)
        : Toast.error(result.error);
    } else {
      Toast.error(res.error);
    }
  }
};
// 勾选待办项修改数据库数据
const changSelectDB = async (e, statusFun) => {
  let catcheData = cache.get(CACHE_KEY.CACHE_TODO);
  const item = [];
  item.push(catcheData.find(({ taskId }) => e.target.parentNode.id == taskId));
  statusFun(e, true);
  let res = await handelError(post("updateTodoList", item));
  console.log("res: ", res);
  if (res.ok) {
    let result = await handelError(get("getTodoList"));
    console.log("result: ", result);
    result.ok
      ? cache.set(CACHE_KEY.CACHE_TODO, result.data)
      : Toast.error(result.error);
  } else {
    Toast.error(res.error);
  }
};
// 假删除数据库数据
const chanegeDelDB = async (e, delFun) => {
  let catcheData = cache.get(CACHE_KEY.CACHE_TODO);
  let item = catcheData.find(({ taskId }) => e.target.parentNode.id == taskId);
  let res = await handelError(post("moveTodoToTrash", item));
  if (res.ok) {
    let result = await handelError(get("getTodoList"));
    result.ok
      ? (cache.set(CACHE_KEY.CACHE_TODO, result.data), delFun(e))
      : Toast.error(result.error);
  } else {
    Toast.error(res.error);
  }
};
// 编辑 修改数据
const changeEditDB = async (e, item, nameValue, finishTime, editFun) => {
  let itemTag = item.finishTime === Date.parse(finishTime) ? true : false;
  item.taskName = nameValue;
  item.finishTime = Date.parse(finishTime);
  let res = await handelError(post("editTodoList", item));
  if (res.ok) {
    let result = await handelError(get("getTodoList"));
    result.ok
      ? (cache.set(CACHE_KEY.CACHE_TODO, result.data),
        editFun(e, nameValue, itemTag, finishTime, true))
      : Toast.error(result.error);
  } else {
    Toast.error(res.error);
  }
};
// 回收站数据库恢复数据
const changeRecoverDB = async (e, recoverFun) => {
  let catcheData = cache.get(CACHE_KEY.CACHE_TODO);
  const item = catcheData.find(
    ({ taskId }) => e.target.parentNode.id == taskId
  );
  let res = await handelError(post("moveTodoToTrash", item));
  if (res.ok) {
    let result = await handelError(get("getTodoList"));
    result.ok
      ? (cache.set(CACHE_KEY.CACHE_TODO, result.data), recoverFun(e))
      : Toast.error(result.error);
  } else {
    Toast.error(res.error);
  }
};
// 回收站删除数据库数据
const changeClearDB = async (list, dom, clearFun) => {
  let res = await handelError(post("deleteTodoList", list));
  if (res.ok) {
    let result = await handelError(get("getTodoList"));
    result.ok
      ? (cache.set(CACHE_KEY.CACHE_TODO, result.data), clearFun(dom))
      : Toast.error(result.error);
  } else {
    Toast.error(res.error);
  }
};
export {
  changeCreateDB,
  changeSelectAllDB,
  changSelectDB,
  chanegeDelDB,
  changeEditDB,
  changeRecoverDB,
  changeClearDB,
};
