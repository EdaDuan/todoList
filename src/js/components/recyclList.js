/*
 * @Author: your name
 * @Date: 2021-06-30 18:57:26
 * @LastEditTime: 2021-07-12 09:58:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/components/recyclList.js
 */
import { emptyBox } from "../util/common";
import { deleteTodoList, moveTodoList } from "../../http";
// 修改状态
const changeStatus = (ul, e) => {
  ul.childNodes.length === 1
    ? (ul.removeChild(e.target.parentNode),
      ul.appendChild(emptyBox("回收站为空～")))
    : ul.removeChild(e.target.parentNode);
};
// 待办项恢复
// 修改数据
const recoverData = async (target, data) => {
  const item = data.find(({ taskId }) => target.parentNode.id == taskId);
  // item.isDel = false;
  await moveTodoList(item);
  // localStorage.setItem("listItem", JSON.stringify(data));
};

const recoverRecycle = (data, e) => {
  console.log("e: ", e);
  console.log("data: ", data);
  let recycleUl = document.querySelector(".recycleUl");
  recoverData(e.target, data);
  changeStatus(recycleUl, e);
};

// 删除回收站
// 删除数据
const clearData = async (target, data) => {
  console.log("data: ", data);
  let item = [];
  item.push(data.find((item) => item.taskId == Number(target.parentNode.id)));
  await deleteTodoList(item);
};
const clearRecycle = (data, e) => {
  let recycleUl = document.querySelector(".recycleUl");
  clearData(e.target, data);
  changeStatus(recycleUl, e);
};
// 清空回收站
const clearAllData = async (list, recycleUl) => {
  let res = await deleteTodoList(list);
  if (res.ok) {
    clearAllStatus(recycleUl);
  } else {
    alert("回收站清空失败～");
  }
};
// 清除样式
const clearAllStatus = (ul) => {
  ul.innerHTML = "";
  ul.appendChild(emptyBox("回收站为空～"));
};
const clearAllRecycle = (list, data) => {
  let recycleUl = document.querySelector(".recycleUl");
  if (recycleUl.firstChild.tagName !== "DIV") {
    var flag = confirm("您确定清空回收站吗?"); //弹出确认框
    if (flag) {
      // 清除数据
      clearAllData(list, recycleUl);
    } else {
      alert("操作取消");
    }
  } else {
    alert("当前回收站为空～");
  }
  localStorage.setItem("listItem", JSON.stringify(data)); //将JS对象转化成JSON对象并保存到本地
};
const recycleEvent = (data, e) => {
  if (e.target.nodeName.toLocaleLowerCase() == "input") {
    switch (e.target.id) {
      case "recover":
        recoverRecycle.call(this, data, e);
        break;
      case "remove":
        clearRecycle.call(this, data, e);
        break;
      default:
    }
  }
};
// 创建div
const createDiv = (dom, className) => {
  let div = document.createElement("div");
  div.setAttribute("class", className);
  dom.appendChild(div);
  return div;
};
// 创建ul
const createUl = (dom, className, data) => {
  let ul = document.createElement("ul");
  ul.setAttribute("class", className);
  ul.addEventListener("click", recycleEvent.bind(this, data), false);
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
const createItem = (index, itemList, data, fragment, className) => {
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
const createDom = (list, data, dom) => {
  let ul = createUl(dom, "recycleUl", data);
  let fragmentLi = document.createDocumentFragment();
  list.forEach((item, index) => {
    createItem(index, item, data, fragmentLi, "con-task-li");
  });
  ul.appendChild(fragmentLi);
};
const recyclList = (data) => {
  let allRecycle = document.querySelector(".allRecycle");
  allRecycle.innerHTML = "";
  let divBox = createDiv(allRecycle, "recoverBox");
  // 获取所以删除的数据
  const filterDelList = data.filter((item) => item.isDel);
  console.log("filterDelList: ", filterDelList);
  let clearAllbtn = document.createElement("input");
  clearAllbtn.setAttribute("class", "clearAll");
  clearAllbtn.setAttribute("type", "button");
  clearAllbtn.addEventListener(
    "click",
    clearAllRecycle.bind(this, filterDelList, data),
    false
  );
  clearAllbtn.setAttribute("value", "清空");
  divBox.appendChild(clearAllbtn);
  createDom(filterDelList, data, divBox);
  divBox.lastChild.childNodes.length === 0
    ? divBox.lastChild.appendChild(emptyBox("回收站为空～"))
    : allRecycle.appendChild(divBox);
};
export default recyclList;
