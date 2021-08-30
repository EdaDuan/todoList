/*
 * @Author: your name
 * @Date: 2021-06-25 16:22:06
 * @LastEditTime: 2021-08-29 21:05:42
 * @LastEditors: duanfy
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/components/doneList.js
 */
import { todoListEvent } from "../../util/todoList/index";
import { createTodo, addCheckName } from "../../components/todoItem";
import { objKeySort, classifyTime, emptyBox } from "../../common/common";
import formatDate from "../../common/formate";

// 创建div
const createDiv = (dom) => {
  let div = document.createElement("div");
  div.setAttribute("class", "doneBox");
  dom.appendChild(div);
  return div;
};
// 创建span
const createSpan = (dom, data) => {
  console.log("data: ", data);
  let span = document.createElement("span");
  span.setAttribute("id", "doneData");
  span.innerText = data;
  dom.appendChild(span);
};
// 创建ul
const createUl = (dom, isLogin) => {
  let ul = document.createElement("ul");
  ul.setAttribute("class", "doneUl");
  ul.addEventListener(
    "click",
    todoListEvent.bind(this, "DONE", "DONEDEL", isLogin),
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
const classifyDom = (dataArr, fragment, isLogin) => {
  for (let key in dataArr) {
    let div = createDiv(fragment); //创建DIV，挂载到fragment上
    createSpan(div, formatDate(new Date(Number(key)))); //在DIV上添加span 显示日期
    createDom(dataArr[key], createUl(div, isLogin)); //创建UL 将当前日期下的所有todoList添加到当前日期的ul下
  }
};
const doneList = (data, isLogin) => {
  let allDone = document.querySelector(".allDone");
  allDone.innerHTML = "";
  let fragmentAllTask = document.createDocumentFragment();
  // 获取所有未完成的待办项
  const filterallDone = data.filter(
    (item) => item.status == true && !item.isDel
  );
  // 获取分类后的数组
  let classifyArr = classifyTime(filterallDone);
  // 获取分类后的DOM 传入排好序的数组
  classifyDom(objKeySort(classifyArr), fragmentAllTask, isLogin);
  fragmentAllTask.childNodes.length === 0
    ? allDone.appendChild(emptyBox("没有任务已完成～"))
    : allDone.appendChild(fragmentAllTask);
};
export default doneList;
