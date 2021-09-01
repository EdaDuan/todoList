/*
 * @Description:
 * @Version: 2.0
 * @Autor: duanfy
 * @Date: 2021-08-17 22:58:13
 * @LastEditors: duanfy
 * @LastEditTime: 2021-09-01 11:47:00
 */
// 当修改后没有当前的时间盒子，需要添加DOM元素 未完成页面
import { todoListEvent } from "../util/todoList/index";
const addTimeBoxNotDone = (itemLi, finishTime, isLogin) => {
  const div = document.createElement("div"); //创建DIV
  div.setAttribute("class", "notDoneBox");
  const span = document.createElement("span"); //创建span
  span.setAttribute("id", "notDoneData");
  span.innerText = finishTime;
  div.appendChild(span);
  const ul = document.createElement("ul"); //创建UL
  ul.setAttribute("class", "notDoneUl");
  ul.addEventListener(
    "click",
    todoListEvent.bind(this, "NOTDONE", "NOTDONEDEL", isLogin),
    false
  );
  ul.appendChild(itemLi);
  div.appendChild(ul);
  return div;
};
// 当修改后没有当前的时间盒子，需要添加DOM元素 完成页面
const addTimeBoxDone = (itemLi, finishTime, isLogin) => {
  const div = document.createElement("div"); //创建DIV
  div.setAttribute("class", "doneBox");
  const span = document.createElement("span"); //创建span
  span.setAttribute("id", "doneData");
  span.innerText = finishTime;
  div.appendChild(span);
  const ul = document.createElement("ul"); //创建UL
  ul.setAttribute("class", "doneUl");
  ul.addEventListener(
    "click",
    todoListEvent.bind(this, "DONE", "DONEDEL", isLogin),
    false
  );
  ul.appendChild(itemLi);
  div.appendChild(ul);
  return div;
};
export { addTimeBoxNotDone, addTimeBoxDone };
