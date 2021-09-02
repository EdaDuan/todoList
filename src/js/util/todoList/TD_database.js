/*
 * @Description:
 * @Version: 2.0
 * @Autor: duanfy
 * @Date: 2021-08-26 17:23:19
 * @LastEditors: duanfy
 * @LastEditTime: 2021-09-01 15:20:21
 */
import { get, post } from "../../http/index";
import formatDate from "../../common/format";
import { CACHE_KEY } from "../../common/constant";
import { cacheData } from "../../store/cache";
import { handelError } from "../../common/handelError";
const cache = cacheData();
// 新建待办项
const changeCreateDB = async (newtodo, finishTime, changeNewStatus) => {
  const resInsert = await post("insertTodoList", newtodo);
  const resGet = await get("getTodoList");
  if (!resInsert.data.ok) {
    handelError(resInsert.data.error);
    return;
  }
  if (!resGet.data.ok) {
    handelError(resGet.data.error);
    return;
  }
  cache.set(CACHE_KEY.CACHE_TODO, resGet.data.data);
  if (formatDate(new Date(finishTime)) == formatDate(new Date())) {
    const catcheData = cache.get(CACHE_KEY.CACHE_TODO);
    changeNewStatus(catcheData[catcheData.length - 1]);
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
  const catcheData = cache.get(CACHE_KEY.CACHE_TODO);
  const filterData = filterStatus(catcheData, status);
  const res = await post("updateTodoList", filterData);
  const result = await get("getTodoList");
  if (!res.data.ok) {
    handelError(res.data.error);
    return;
  }
  if (!result.data.ok) {
    handelError(result.data.error);
    return;
  }
  cache.set(CACHE_KEY.CACHE_TODO, result.data.data);
};
// 勾选待办项修改数据库数据
const changSelectDB = async (element, statusFun) => {
  const catcheData = cache.get(CACHE_KEY.CACHE_TODO);
  const item = [];
  item.push(
    catcheData.find(({ taskId }) => element.target.parentNode.id == taskId)
  );
  statusFun(element, true);
  const res = await post("updateTodoList", item);
  const result = await get("getTodoList");
  if (!res.data.ok) {
    handelError(res.data.error);
    return;
  }
  if (!result.data.ok) {
    handelError(result.data.error);
    return;
  }
  cache.set(CACHE_KEY.CACHE_TODO, result.data.data);
};
// 假删除数据库数据
const chanegeDelDB = async (element, delFun) => {
  const catcheData = cache.get(CACHE_KEY.CACHE_TODO);
  const item = catcheData.find(
    ({ taskId }) => element.target.parentNode.id == taskId
  );
  const res = await post("moveTodoToTrash", item);
  const result = await get("getTodoList");
  if (!res.data.ok) {
    handelError(res.data.error);
    return;
  }
  if (!result.data.ok) {
    handelError(result.data.error);
    return;
  }
  cache.set(CACHE_KEY.CACHE_TODO, result.data.data);
  delFun(element);
};
// 编辑 修改数据
const changeEditDB = async (element, item, nameValue, finishTime, editFun) => {
  const itemTag = item.finishTime === Date.parse(finishTime) ? true : false;
  item.taskName = nameValue;
  item.finishTime = Date.parse(finishTime);
  const res = await post("editTodoList", item);
  const result = await get("getTodoList");
  if (!res.data.ok) {
    handelError(res.data.error);
    return;
  }
  if (!result.data.ok) {
    handelError(result.data.error);
    return;
  }
  cache.set(CACHE_KEY.CACHE_TODO, result.data.data);
  editFun(element, nameValue, itemTag, finishTime, true);
};
// 回收站数据库恢复数据
const changeRecoverDB = async (element, recoverFun) => {
  const catcheData = cache.get(CACHE_KEY.CACHE_TODO);
  const item = catcheData.find(
    ({ taskId }) => element.target.parentNode.id == taskId
  );
  const res = await post("moveTodoToTrash", item);
  const result = await get("getTodoList");
  if (!res.data.ok) {
    handelError(res.data.error);
    return;
  }
  if (!result.data.ok) {
    handelError(result.data.error);
    return;
  }
  cache.set(CACHE_KEY.CACHE_TODO, result.data.data);
  recoverFun(element);
};
// 回收站删除数据库数据
const changeClearDB = async (list, dom, clearFun) => {
  const res = await post("deleteTodoList", list);
  const result = await get("getTodoList");
  if (!res.data.ok) {
    handelError(res.data.error);
    return;
  }
  if (!result.data.ok) {
    handelError(result.data.error);
    return;
  }
  cache.set(CACHE_KEY.CACHE_TODO, result.data.data);
  clearFun(dom);
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
