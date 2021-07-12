/*
 * @Author: your name
 * @Date: 2021-06-25 16:07:16
 * @LastEditTime: 2021-07-12 09:38:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/components/notDoneList.js
 */
import { todoListEvent } from "../util/operation";
import { createTodo, addCheckName } from "./createTodo";
import { objKeySort, classifyTime, emptyBox } from "../util/common";
import formatData from "../util/formate";
// 创建div
const createDiv = (dom) => {
  let div = document.createElement("div");
  div.setAttribute("class", "notDoneBox");
  dom.appendChild(div);
  return div;
};
// 创建span
const createSpan = (dom, data) => {
  let span = document.createElement("span");
  span.setAttribute("id", "notDoneData");
  span.innerText = data;
  dom.appendChild(span);
};
// 创建ul
const createUl = (dom) => {
  let ul = document.createElement("ul");
  ul.setAttribute("class", "notDoneUl");
  ul.addEventListener(
    "click",
    todoListEvent.bind(this, "NOTDONE", "NOTDONEDEL"),
    false
  );
  dom.appendChild(ul);
  return ul;
};

// 创建分类的DOM
const createDom = (obj, ul) => {
  obj.forEach((item) => {
    const { dom, checkbox } = createTodo(item);
    addCheckName(item, dom, checkbox, ul);
  });
};

const classifyDom = (dataArr, fragment) => {
  for (let key in dataArr) {
    let div = createDiv(fragment); //创建DIV，挂载到fragment上
    createSpan(div, formatData(new Date(Number(key)))); //在DIV上添加span 显示日期
    createDom(dataArr[key], createUl(div)); //创建UL 将当前日期下的所有todoList添加到当前日期的ul下
  }
};
const notDoneList = (data) => {
  // data 当前的所有数据
  // 获取最外层的div
  let allNotDone = document.querySelector(".allNotDone");
  allNotDone.innerHTML = "";
  let fragmentNotDone = document.createDocumentFragment();
  // 获取所有未完成的待办项
  const filterNotDoneList = data.filter(
    (item) => item.status == true && !item.isDel
  );
  // 获取分类后的数组
  let classifyArr = classifyTime(filterNotDoneList);
  // 获取分类后的DOM 传入排好序的数组
  classifyDom(objKeySort(classifyArr), fragmentNotDone);
  fragmentNotDone.childNodes.length === 0
    ? allNotDone.appendChild(emptyBox("所有待办项都已完成～"))
    : allNotDone.appendChild(fragmentNotDone);
};
export default notDoneList;
