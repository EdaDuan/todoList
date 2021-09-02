/*
 * @Author: your name
 * @Date: 2021-06-30 18:57:26
 * @LastEditTime: 2021-09-02 16:08:55
 * @LastEditors: duanfy
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/components/recycleList.js
 */
import { html_decode } from "../../common/validate";
import { emptyBox } from "../../common/common";
import {
  recoverRecycle,
  clearRecycle,
  clearAllRecycle,
} from "../../util/todoList/index";
import { TASK_EMPTY } from "../../common/constant";

const recycleEvent = (isLogin, element) => {
  if (element.target.nodeName.toLocaleLowerCase() == "input") {
    switch (element.target.id) {
      case "recover":
        recoverRecycle.call(this, isLogin, element);
        break;
      case "remove":
        clearRecycle.call(this, isLogin, element);
        break;
      default:
    }
  }
};
// 创建ul
const createUl = (isLogin, dom, className) => {
  const ul = document.createElement("ul");
  ul.setAttribute("class", className);
  ul.addEventListener("click", recycleEvent.bind(this, isLogin), false);
  dom.appendChild(ul);
  return ul;
};
// 创建lable
const createLabel = (dom, index, className) => {
  const label = document.createElement("label");
  label.setAttribute("class", className);
  label.innerHTML = index;
  dom.appendChild(label);
};
// 创建span
const createSpan = (data, dom) => {
  const span = document.createElement("span");
  span.innerText = html_decode(data.taskName);
  dom.appendChild(span);
};
// 创建按钮
const createBtn = (dom, className, id, text) => {
  const btn = document.createElement("input");
  btn.setAttribute("class", className);
  btn.setAttribute("type", "button");
  btn.setAttribute("id", id);
  btn.setAttribute("value", text);
  dom.appendChild(btn);
};
const createItem = (index, itemList, fragment, className) => {
  const li = document.createElement("li");
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
  const fragmentLi = document.createDocumentFragment();
  list.forEach((item, index) => {
    createItem(index, item, fragmentLi, "con-task-li");
  });
  dom.appendChild(fragmentLi);
};
const recycleRender = (data, isLogin) => {
  const recycleUl = document.querySelector(".recycleUl");
  recycleUl.innerHTML = "";
  // 获取所以删除的数据
  const filterDelList = data.filter((item) => item.isDel);
  createDom(filterDelList, recycleUl);
  if (recycleUl.childNodes.length === 0)
    recycleUl.appendChild(emptyBox(TASK_EMPTY.RECYCLE_MSG));
};
const recycleList = (isLogin) => {
  const allRecycle = document.querySelector(".allRecycle");
  const clearAllbtn = document.createElement("input");
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
