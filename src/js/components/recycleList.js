/*
 * @Author: your name
 * @Date: 2021-06-30 18:57:26
 * @LastEditTime: 2021-07-22 11:45:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/components/recycleList.js
 */
import { emptyBox } from "../util/common";
import { recoverRecycleDB, clearRecycleDB } from "../util/operateDB";
import {
  recoverRecycleLocal,
  clearRecycleLocal,
  clearAllDateLocal,
} from "../util/operateLocal";
import { cacheData } from "../util/storeData";
let cache = cacheData();
import Toast from "../util/toast";
// 修改状态
const changeStatus = (e) => {
  let ulNode = e.target.parentNode.parentNode;
  ulNode.childNodes.length === 1
    ? (ulNode.removeChild(e.target.parentNode),
      ulNode.appendChild(emptyBox("回收站为空～")))
    : ulNode.removeChild(e.target.parentNode);
};
// 待办项恢复
const recoverRecycle = (isLogin, e) => {
  if (isLogin) {
    recoverRecycleDB(e, changeStatus);
  } else {
    recoverRecycleLocal(e, changeStatus);
  }
};
// 删除回收站
const clearRecycle = async (isLogin, e) => {
  if (isLogin) {
    let catcheData = await cache.get("GET_TODO");
    let item = [];
    item.push(
      catcheData.find((item) => item.taskId == Number(e.target.parentNode.id))
    );
    clearRecycleDB(item, e, changeStatus);
  } else {
    clearRecycleLocal(e, changeStatus);
  }
};
// 清空全部样式
const clearAllStatus = (dom) => {
  dom.lastChild.innerHTML = "";
  dom.lastChild.appendChild(emptyBox("回收站为空～"));
};
// 清空回收站
const clearAllRecycle = async (isLogin, dom) => {
  if (dom.lastChild.firstChild.tagName == "LI") {
    var flag = confirm("您确定清空回收站吗?"); //弹出确认框
    if (flag) {
      if (isLogin) {
        let catcheData = await cache.get("GET_TODO");
        const filterDelList = catcheData.filter((item) => item.isDel);
        clearRecycleDB(filterDelList, dom, clearAllStatus);
      } else {
        clearAllDateLocal(dom, clearAllStatus);
      }
    }
  } else {
    Toast.show("当前回收站为空");
  }
};
const recycleEvent = (isLogin, e) => {
  if (e.target.nodeName.toLocaleLowerCase() == "input") {
    switch (e.target.id) {
      case "recover":
        recoverRecycle.call(this, isLogin, e);
        break;
      case "remove":
        clearRecycle.call(this, isLogin, e);
        break;
      default:
    }
  }
};
// 创建ul
const createUl = (isLogin, dom, className) => {
  let ul = document.createElement("ul");
  ul.setAttribute("class", className);
  ul.addEventListener("click", recycleEvent.bind(this, isLogin), false);
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
const recycleList = (isLogin) => {
  let allRecycle = document.querySelector(".allRecycle");
  let clearAllbtn = document.createElement("input");
  clearAllbtn.setAttribute("class", "clearAll");
  clearAllbtn.setAttribute("type", "button");
  clearAllbtn.addEventListener(
    "click",
    clearAllRecycle.bind(this, isLogin, allRecycle),
    false
  );
  clearAllbtn.setAttribute("value", "清空");
  allRecycle.appendChild(clearAllbtn);
  // 创建ul
  createUl(isLogin, allRecycle, "recycleUl");
};
export { recycleList, recycleRender };
