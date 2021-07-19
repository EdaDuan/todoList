/*
 * @Author: your name
 * @Date: 2021-06-30 18:57:26
 * @LastEditTime: 2021-07-19 01:04:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/components/recycleList.js
 */
import { emptyBox } from "../util/common";
import { deleteTodoList, moveTodoList } from "../../http";
// 修改状态
const changeStatus = (e) => {
  let ulNode = e.target.parentNode.parentNode;
  ulNode.childNodes.length === 1
    ? (ulNode.removeChild(e.target.parentNode),
      ulNode.appendChild(emptyBox("回收站为空～")))
    : ulNode.removeChild(e.target.parentNode);
};
// 待办项恢复
const recoverRecycle = (isLogin, data, e) => {
  const item = data.find(({ taskId }) => e.target.parentNode.id == taskId);
  if (isLogin) {
    moveTodoList(item).then((res) => {
      res.ok ? changeStatus(e) : alert("恢复失败～");
    });
  } else {
    let localTodoList = JSON.parse(localStorage.getItem("todoList"))
      ? JSON.parse(localStorage.getItem("todoList"))
      : [];
    const item = localTodoList.find(
      ({ taskId }) => e.target.parentNode.id == taskId
    );
    item.isDel = 0;
    changeStatus(e);
    localStorage.setItem("todoList", JSON.stringify(localTodoList));
  }
};
// 删除回收站
const clearRecycle = (isLogin, data, e) => {
  if (isLogin) {
    let item = [];
    item.push(
      data.find((item) => item.taskId == Number(e.target.parentNode.id))
    );
    deleteTodoList(item).then((res) => {
      res.ok ? changeStatus(e) : alert("待办项删除失败～");
    });
  } else {
    let localTodoList = JSON.parse(localStorage.getItem("todoList"))
      ? JSON.parse(localStorage.getItem("todoList"))
      : [];
    localTodoList.splice(
      localTodoList.findIndex(
        (item) => item.taskId == Number(e.target.parentNode.id)
      ),
      1
    );
    changeStatus(e);
    localStorage.setItem("todoList", JSON.stringify(localTodoList));
  }
};
// 清空全部样式
const clearAllStatus = (dom) => {
  dom.lastChild.innerHTML = "";
  dom.lastChild.appendChild(emptyBox("回收站为空～"));
};
const clearAllDate = (list, dom) => {
  if (dom.lastChild.firstChild.tagName == "LI") {
    var flag = confirm("您确定清空回收站吗?"); //弹出确认框
    if (flag) {
      deleteTodoList(list).then((res) => {
        res.ok ? clearAllStatus(dom) : alert("回收站清空失败～");
      });
    } else {
      console.log("操作取消");
    }
  } else {
    alert("当前回收站为空～");
  }
};
const clearAllDateLocal = (list, dom) => {
  let localTodoList = JSON.parse(localStorage.getItem("todoList"))
    ? JSON.parse(localStorage.getItem("todoList"))
    : [];
  if (dom.lastChild.firstChild.tagName == "LI") {
    var flag = confirm("您确定清空回收站吗?"); //弹出确认框
    if (flag) {
      list.map((listItem) => {
        localTodoList.splice(
          localTodoList.findIndex((item) => item.taskId === listItem.taskId),
          1
        );
      });
      clearAllStatus(dom);
      localStorage.setItem("todoList", JSON.stringify(localTodoList));
    }
  } else {
    alert("当前回收站为空～");
  }
};
// 清空回收站
const clearAllRecycle = (isLogin, list, dom) => {
  isLogin ? clearAllDate(list, dom) : clearAllDateLocal(list, dom);
};
const recycleEvent = (isLogin, data, e) => {
  if (e.target.nodeName.toLocaleLowerCase() == "input") {
    switch (e.target.id) {
      case "recover":
        recoverRecycle.call(this, isLogin, data, e);
        break;
      case "remove":
        clearRecycle.call(this, isLogin, data, e);
        break;
      default:
    }
  }
};
// 创建ul
const createUl = (isLogin, dom, className, data) => {
  let ul = document.createElement("ul");
  ul.setAttribute("class", className);
  ul.addEventListener("click", recycleEvent.bind(this, isLogin, data), false);
  dom.appendChild(ul);
  return ul;
};
// 创建lable
const createLabel = (dom, index, className) => {
  let label = document.createElement("label");
  label.setAttribute("class", className);
  label.innerHTML = index;
  dom.appendChild(label);
};
// 创建span
const createSpan = (data, dom) => {
  let span = document.createElement("span");
  span.innerText = data.taskName;
  dom.appendChild(span);
};
// 创建按钮
const createBtn = (dom, className, id, text) => {
  let btn = document.createElement("input");
  btn.setAttribute("class", className);
  btn.setAttribute("type", "button");
  btn.setAttribute("id", id);
  btn.setAttribute("value", text);
  dom.appendChild(btn);
};
const createItem = (index, itemList, fragment, className) => {
  let li = document.createElement("li");
  li.setAttribute("id", itemList.taskId);
  li.setAttribute("class", className);
  createLabel(li, index + 1, "recoverLabel");
  createSpan(itemList, li);
  createBtn(li, "recoverBtn", "recover", "恢复");
  createBtn(li, "delBtn", "remove", "删除");
  fragment.appendChild(li);
};
// 创建回收站的DOM
const createDom = (list, dom) => {
  let fragmentLi = document.createDocumentFragment();
  list.forEach((item, index) => {
    createItem(index, item, fragmentLi, "con-task-li");
  });
  dom.appendChild(fragmentLi);
};
const recycleRender = (data, isLogin) => {
  let recycleUl = document.querySelector(".recycleUl");
  recycleUl.innerHTML = "";
  // 获取所以删除的数据
  const filterDelList = data.filter((item) => item.isDel);
  createDom(filterDelList, recycleUl);
  if (recycleUl.childNodes.length === 0)
    recycleUl.appendChild(emptyBox("回收站为空～"));
};
const recycleList = (data, isLogin) => {
  let allRecycle = document.querySelector(".allRecycle");
  // 获取所以删除的数据
  const filterDelList = data.filter((item) => item.isDel);
  let clearAllbtn = document.createElement("input");
  clearAllbtn.setAttribute("class", "clearAll");
  clearAllbtn.setAttribute("type", "button");
  clearAllbtn.addEventListener(
    "click",
    clearAllRecycle.bind(this, isLogin, filterDelList, allRecycle),
    false
  );
  clearAllbtn.setAttribute("value", "清空");
  allRecycle.appendChild(clearAllbtn);
  // 创建ul
  createUl(isLogin, allRecycle, "recycleUl", data);
};
export { recycleList, recycleRender };
