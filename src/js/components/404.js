/*
 * @Author: your name
 * @Date: 2021-07-12 17:12:31
 * @LastEditTime: 2021-07-12 17:12:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/components/404.js
 */

// 创建div
const createDiv = (dom) => {
  let div = document.createElement("div");
  div.setAttribute("class", "errorBox");
  dom.appendChild(div);
  return div;
};
const errorPage = (dom) => {};
