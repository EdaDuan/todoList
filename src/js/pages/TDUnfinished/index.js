/*
 * @Author: your name
 * @Date: 2021-06-25 16:07:16
 * @LastEditTime: 2021-09-01 14:35:39
 * @LastEditors: duanfy
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/components/notDoneList.js
 */
import { todoListEvent } from "../../util/todoList/index";
import { createTodo, addCheckName } from "../../components/todoItem";
import { objKeySort, classifyTime, emptyBox } from "../../common/common";
import formatDate from "../../common/format";
import { TASK_EMPTY } from "../../common/constant";
// 创建div
const createDiv = (dom) => {
  const div = document.createElement("div");
  div.setAttribute("class", "notDoneBox");
  dom.appendChild(div);
  return div;
};
// 创建span
const createSpan = (dom, data) => {
  const span = document.createElement("span");
  span.setAttribute("id", "notDoneData");
  span.innerText = data;
  dom.appendChild(span);
};
// 创建ul
const createUl = (dom, isLogin) => {
  const ul = document.createElement("ul");
  ul.setAttribute("class", "notDoneUl");
  ul.addEventListener(
    "click",
    todoListEvent.bind(this, "NOTDONE", "NOTDONEDEL", isLogin),
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
    const div = createDiv(fragment); //创建DIV，挂载到fragment上
    createSpan(div, formatDate(new Date(Number(key)))); //在DIV上添加span 显示日期
    createDom(dataArr[key], createUl(div, isLogin)); //创建UL 将当前日期下的所有todoList添加到当前日期的ul下
  }
};
const notDoneList = (data, isLogin) => {
  // data 当前的所有数据
  // 获取最外层的div
  const allNotDone = document.querySelector(".allNotDone");
  allNotDone.innerHTML = "";
  const fragmentNotDone = document.createDocumentFragment();
  // 获取所有未完成的待办项
  const filterNotDoneList = data.filter(
    (item) => item.status == false && !item.isDel
  );
  // 获取分类后的数组
  const classifyArr = classifyTime(filterNotDoneList);
  // 获取分类后的DOM 传入排好序的数组
  classifyDom(objKeySort(classifyArr), fragmentNotDone, isLogin);
  fragmentNotDone.childNodes.length === 0
    ? allNotDone.appendChild(emptyBox(TASK_EMPTY.UNFINISH_MSG))
    : allNotDone.appendChild(fragmentNotDone);
};
export default notDoneList;
