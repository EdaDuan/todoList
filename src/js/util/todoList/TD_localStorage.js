/*
 * @Description:
 * @Version: 2.0
 * @Autor: duanfy
 * @Date: 2021-08-26 17:24:01
 * @LastEditors: duanfy
 * @LastEditTime: 2021-09-01 14:35:44
 */
import formatDate from "../../common/format";
import { CACHE_KEY, LOCAL_ERRMSG } from "../../common/constant";
import { cacheData } from "../../store/cache";
import { handelError } from "../../common/handelError";
const cache = cacheData();
const changeCreateLocal = (newtodo, finishTime, changeCreateStatus) => {
  const localTodoList = cache.get(CACHE_KEY.CACHE_TODO);
  const taskId = Date.parse(new Date());
  newtodo = {
    taskId,
    ...newtodo,
  };
  if (formatDate(new Date(finishTime)) == formatDate(new Date())) {
    changeCreateStatus(newtodo);
  }
  localTodoList.push(newtodo);
  cache.set(CACHE_KEY.CACHE_TODO, localTodoList);
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
  const localTodoList = cache.get(CACHE_KEY.CACHE_TODO);
  const filterData = filterStatusLocal(localTodoList, status);
  cache.set(CACHE_KEY.CACHE_TODO, filterData);
  localStorage.setItem("todoList", JSON.stringify(filterData));
};
// 勾选待办项修改本地数据
const changSelectLocal = (element, statusFun) => {
  const localTodoList = cache.get(CACHE_KEY.CACHE_TODO);
  const currentChcked = element.target.parentNode.firstChild.checked;
  const item = localTodoList.find(
    ({ taskId }) => element.target.parentNode.id == taskId
  );
  if (!item) {
    currentChcked = !currentChcked;
    handelError(LOCAL_ERRMSG.CHANGEMSG);
    return;
  }
  item.status ? (item.status = 0) : (item.status = 1);
  statusFun(element, true);
  cache.set(CACHE_KEY.CACHE_TODO, localTodoList);
  localStorage.setItem("todoList", JSON.stringify(localTodoList));
};
// 删除本地数据
const hanegeDelLocal = (element, delFun) => {
  const localTodoList = cache.get(CACHE_KEY.CACHE_TODO);
  const item = localTodoList.find(
    ({ taskId }) => element.target.parentNode.id == taskId
  );
  item ? ((item.isDel = 1), delFun(element)) : handelError(LOCAL_ERRMSG.DELMSG);
  cache.set(CACHE_KEY.CACHE_TODO, localTodoList);
  localStorage.setItem("todoList", JSON.stringify(localTodoList));
};
// 编辑修改本地数据
const changeEditLocal = (element, item, nameValue, finishTime, editFun) => {
  const itemTag = item.finishTime === Date.parse(finishTime) ? true : false;
  const data = cache.get(CACHE_KEY.CACHE_TODO);
  if (!item) {
    handelError(LOCAL_ERRMSG.EDITEMSG);
    return;
  }
  item.taskName = nameValue;
  item.finishTime = Date.parse(finishTime);
  editFun(element, nameValue, itemTag, finishTime, false);
  cache.set(CACHE_KEY.CACHE_TODO, data);
  localStorage.setItem("todoList", JSON.stringify(data));
};
// 回收站恢复本地数据
const changeRecoverLocal = (element, recoverFun) => {
  const localTodoList = cache.get(CACHE_KEY.CACHE_TODO);
  const item = localTodoList.find(
    ({ taskId }) => element.target.parentNode.id == taskId
  );
  item.isDel = 0;
  recoverFun(element);
  cache.set(CACHE_KEY.CACHE_TODO, localTodoList);
  localStorage.setItem("todoList", JSON.stringify(localTodoList));
};
// 回收站删除本地数据
const changeClearLocal = (element, clearFun) => {
  const localTodoList = cache.get(CACHE_KEY.CACHE_TODO);
  localTodoList.splice(
    localTodoList.findIndex(
      (item) => item.taskId == Number(element.target.parentNode.id)
    ),
    1
  );
  clearFun(element);
  cache.set(CACHE_KEY.CACHE_TODO, localTodoList);
  localStorage.setItem("todoList", JSON.stringify(localTodoList));
};
// 回收站本地清空回收站
const changeClearAllLocal = (dom, clearAllFun) => {
  const localTodoList = cache.get(CACHE_KEY.CACHE_TODO);
  const filterDelList = localTodoList.filter((item) => item.isDel);
  filterDelList.map((listItem) => {
    localTodoList.splice(
      localTodoList.findIndex((item) => item.taskId === listItem.taskId),
      1
    );
  });
  clearAllFun(dom);
  cache.set(CACHE_KEY.CACHE_TODO, localTodoList);
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
