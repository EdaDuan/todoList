/*
 * @Description:
 * @Version: 2.0
 * @Autor: duanfy
 * @Date: 2021-06-29 17:31:24
 * @LastEditors: duanfy
 * @LastEditTime: 2021-09-01 11:47:49
 */
import { html_decode } from "../common/validate";
// 创建div
const createDiv = (dom, className) => {
  const div = document.createElement("div");
  div.setAttribute("class", className);
  dom.appendChild(div);
  return div;
};
// 创建span
const createSpan = (dom, text) => {
  const span = document.createElement("span");
  span.setAttribute("class", "dialog-tip");
  span.innerText = text;
  dom.appendChild(span);
};
// 创建label
const createLabel = (dom, text) => {
  const label = document.createElement("label");
  label.innerText = text;
  dom.appendChild(label);
};
// 创建input
const createInput = (dom, className, value, type) => {
  const input = document.createElement("input");
  input.setAttribute("id", className);
  input.setAttribute("type", type);
  input.placeholder = "例：明天有早会";
  input.value = html_decode(value);
  dom.appendChild(input);
};
// 创建button
const createBtn = (dom, clickEvent, className, text) => {
  const btn = document.createElement("button");
  btn.setAttribute("class", className);
  btn.addEventListener("click", clickEvent, false);
  btn.innerText = text;
  dom.appendChild(btn);
};

// 创建
const createDialog = (dom, text, nameValue, timeValue, okBtn, cancelBtn) => {
  const dialogCon = createDiv(dom, "dialog-con");
  dialogCon.addEventListener("click", (element) => {
    window.event
      ? (window.event.cancelBubble = true)
      : element.stopPropagation();
  });
  createSpan(dialogCon, text);
  const dialogInputName = createDiv(dialogCon, "dialog-input");
  createLabel(dialogInputName, "待办项：");
  createInput(dialogInputName, "dialog-input-name", nameValue, "text");
  const dialogInputTime = createDiv(dialogCon, "dialog-input");
  createLabel(dialogInputTime, "完成时间：");
  createInput(dialogInputTime, "dialog-input-time", timeValue, "date");
  const dialogInputBtn = createDiv(dialogCon, "dialog-input-btn");
  createBtn(dialogInputBtn, okBtn, "dialog-sure", "确定");
  createBtn(dialogInputBtn, cancelBtn, "dialog-cance", "取消");
};
// 初始化
const dialogBox = document.querySelector(".dialog-box");
const initDialog = (options) => {
  const { text, nameValue, timeValue, okEvent } = options;
  createDialog(dialogBox, text, nameValue, timeValue, okEvent, closeDialog);
  dialogBox.addEventListener("click", closeDialog, false);
};

// 销毁
const destoryDialog = () => {
  dialogBox.removeChild(dialogBox.firstElementChild);
};
// 打开弹窗
const popupDialog = () => {
  dialogBox.style.display = "block";
};
// 关闭弹窗
const closeDialog = () => {
  dialogBox.style.display = "none";
  destoryDialog();
};
export { initDialog, destoryDialog, popupDialog, closeDialog };
