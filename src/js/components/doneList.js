/*
 * @Author: your name
 * @Date: 2021-06-25 16:22:06
 * @LastEditTime: 2021-07-12 15:48:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/components/doneList.js
 */
import { todoListEvent } from "../util/operation";
import { createTodo, addCheckName } from "./createTodo";
import { objKeySort, classifyTime, emptyBox } from "../util/common";
import formatData from "../util/formate";

// 创建div
const createDiv = (dom) => {
  let div = document.createElement("div");
  div.setAttribute("class", "doneBox");
  dom.appendChild(div);
  return div;
};
// 创建span
const createSpan = (dom, data) => {
  let span = document.createElement("span");
  span.setAttribute("id", "doneData");
  span.innerText = data;
  dom.appendChild(span);
};
// 创建ul
const createUl = (dom) => {
  let ul = document.createElement("ul");
  ul.setAttribute("class", "doneUl");
  ul.addEventListener(
    "click",
    todoListEvent.bind(this, "DONE", "DONEDEL"),
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
const doneList = (data) => {
  let allDone = document.querySelector(".allDone");
  allDone.innerHTML = "";
  let fragmentAllTask = document.createDocumentFragment();
  // 获取所有未完成的待办项
  const filterallDone = data.filter(
    (item) => item.status == false && !item.isDel
  );
  // 获取分类后的数组
  let classifyArr = classifyTime(filterallDone);
  // 获取分类后的DOM 传入排好序的数组
  classifyDom(objKeySort(classifyArr), fragmentAllTask);
  fragmentAllTask.childNodes.length === 0
    ? allDone.appendChild(emptyBox("没有任务已完成～"))
    : allDone.appendChild(fragmentAllTask);
};
export default doneList;
