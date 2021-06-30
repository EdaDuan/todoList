import { createTodo, addCheckName } from "../init";
import { objKeySort, classifyTime } from "../util/common";
import emptyBox from "../util/emptyBox";

// 创建div
const createDiv = (dom) => {
  let div = document.createElement("div");
  div.setAttribute("class", "allListBox");
  dom.appendChild(div);
  return div;
};
// 创建span
const createSpan = (dom, data) => {
  let span = document.createElement("span");
  span.setAttribute("class", "allListData");
  span.innerText = data;
  dom.appendChild(span);
};
// 创建ul
const createUl = (dom) => {
  let ul = document.createElement("ul");
  ul.setAttribute("class", "allListUl");
  dom.appendChild(ul);
  return ul;
};
// 创建分类的DOM
const createDom = (obj, ul) => {
  obj.forEach((item) => {
    const { dom, checkbox } = createTodo(item, "ALLLIST");
    addCheckName(item, dom, checkbox, ul);
  });
};
const classifyDom = (dataArr, fragment) => {
  for (let key in dataArr) {
    let div = createDiv(fragment); //创建DIV，挂载到fragment上
    createSpan(div, key); //在DIV上添加span 显示日期
    createDom(dataArr[key], createUl(div)); //创建UL 将当前日期下的所有todoList添加到当前日期的ul下
  }
};
const doneList = (data) => {
  let allList = document.querySelector(".allList");
  allList.innerHTML = "";
  let fragmentAllTask = document.createDocumentFragment();
  // 获取所有未完成的待办项
  const filterAllList = data.filter((item) => item.status == false);
  // 获取分类后的数组
  let classifyArr = classifyTime(filterAllList);
  // 获取分类后的DOM 传入排好序的数组
  classifyDom(objKeySort(classifyArr), fragmentAllTask);
  fragmentAllTask.childNodes.length === 0
    ? allList.appendChild(emptyBox("还没有待办项，快去创建吧～"))
    : allList.appendChild(fragmentAllTask);
};
export default doneList;
