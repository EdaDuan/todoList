import {
  clearAllRecycle,
  recoverRecycle,
  clearRecycle,
} from "../util/operation";
import emptyBox from "../util/emptyBox";
// 创建div
const createDiv = (dom, className) => {
  let div = document.createElement("div");
  div.setAttribute("class", className);
  dom.appendChild(div);
  return div;
};
// 创建ul
const createUl = (dom, className) => {
  let ul = document.createElement("ul");
  ul.setAttribute("class", className);
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
// 恢复
const createBtn = (dom, clickEvent, className, text) => {
  let recoverBtn = document.createElement("button");
  recoverBtn.setAttribute("class", className);
  recoverBtn.addEventListener("click", clickEvent, false);
  recoverBtn.innerHTML = text;
  dom.appendChild(recoverBtn);
};
const createItem = (index, itemList, data, fragment, className) => {
  let li = document.createElement("li");
  li.setAttribute("id", itemList.taskId);
  li.setAttribute("class", className);
  createLabel(li, index + 1, "recoverLabel");
  createSpan(itemList, li);
  createBtn(
    li,
    recoverRecycle.bind(this, li, itemList, data),
    "recoverBtn",
    "恢复"
  );
  createBtn(
    li,
    clearRecycle.bind(this, li, itemList, data),
    "recoverBtn",
    "删除"
  );
  fragment.appendChild(li);
};
// 创建回收站的DOM
const createDom = (list, data, dom) => {
  let ul = createUl(dom, "recycleUl");
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
  createBtn(
    divBox,
    clearAllRecycle.bind(this, filterDelList, data),
    "clearAll",
    "清空"
  );
  createDom(filterDelList, data, divBox);
  console.log("divBox: ", divBox.lastChild.childNodes);
  divBox.lastChild.childNodes.length === 0
    ? divBox.lastChild.appendChild(emptyBox("回收站为空～"))
    : allRecycle.appendChild(divBox);
};
export default recyclList;
