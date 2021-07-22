/*
 * @Author: your name
 * @Date: 2021-07-20 11:39:42
 * @LastEditTime: 2021-07-22 11:39:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/util/operateDB.js
 */
import {
  insertTodoList,
  getTodoList,
  updateTodoStatus,
  moveTodoList,
  editTodoList,
  deleteTodoList,
} from "../../http";
import formatData from "../util/formate";
import Toast from "../util/toast";
import { cacheData } from "./storeData";
let cache = cacheData();
// 新建待办项
const newDataDB = (
  newtodo,
  finishTime,
  conTodoUl,
  selectAllTodo,
  taskLabel,
  changeNewStatus
) => {
  insertTodoList(newtodo).then((res) => {
    if (res.ok) {
      getTodoList().then(async (res) => {
        if (res.ok) {
          cache.set("GET_TODO", res.data);
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
      });
    } else {
      Toast.error(res.error);
    }
  });
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
// 全选时更改数据库数据
const changeAllDataDB = async (status) => {
  let catcheData = await cache.get("GET_TODO");
  let filterData = filterStatus(catcheData, status);
  if (filterData.length !== 0) {
    updateTodoStatus(filterData).then((res) => {
      if (res.ok) {
        getTodoList().then((res) => {
          res.ok ? cache.set("GET_TODO", res.data) : Toast.error(res.error);
        });
      } else {
        Toast.error(res.error);
      }
    });
  }
};
// 勾选待办项修改数据库数据
const changDataDB = async (e, statusFun) => {
  let catcheData = await cache.get("GET_TODO");
  const item = [];
  item.push(catcheData.find(({ taskId }) => e.target.parentNode.id == taskId));
  updateTodoStatus(item).then((res) => {
    if (res.ok) {
      getTodoList().then((res) => {
        res.ok
          ? (cache.set("GET_TODO", res.data), statusFun(e))
          : Toast.error(res.error);
      });
    } else {
      Toast.error(res.error);
    }
  });
};
// 删除数据库数据
const delDataDB = async (e, delFun) => {
  let catcheData = await cache.get("GET_TODO");
  let item = catcheData.find(({ taskId }) => e.target.parentNode.id == taskId);
  moveTodoList(item).then((res) => {
    if (res.ok) {
      getTodoList().then((res) => {
        res.ok
          ? (cache.set("GET_TODO", res.data), delFun(e))
          : Toast.error(res.error);
      });
    } else {
      Toast.error(res.error);
    }
  });
};
// 编辑 修改数据
const editDataDB = (e, item, nameValue, finishTime, editFun) => {
  item.taskName = nameValue;
  item.finishTime = Date.parse(finishTime);
  editTodoList(item).then((res) => {
    if (res.ok) {
      getTodoList().then((res) => {
        res.ok
          ? (cache.set("GET_TODO", res.data), editFun(e, nameValue))
          : Toast.error(res.error);
      });
    } else {
      Toast.error(res.error);
    }
  });
};
// 回收站数据库恢复数据
const recoverRecycleDB = async (e, recoverFun) => {
  let catcheData = await cache.get("GET_TODO");
  const item = catcheData.find(
    ({ taskId }) => e.target.parentNode.id == taskId
  );
  moveTodoList(item).then((res) => {
    if (res.ok) {
      getTodoList().then((res) => {
        res.ok
          ? (cache.set("GET_TODO", res.data), recoverFun(e))
          : Toast.error(res.error);
      });
    } else {
      Toast.error("恢复失败");
    }
  });
};
// 回收站删除数据库数据
const clearRecycleDB = (list, dom, clearFun) => {
  deleteTodoList(list).then((res) => {
    if (res.ok) {
      getTodoList().then((res) => {
        res.ok
          ? (cache.set("GET_TODO", res.data), clearFun(dom))
          : Toast.error(res.error);
      });
    } else {
      Toast.error(res.error);
    }
  });
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
