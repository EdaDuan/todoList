// 创建div
const createDiv = (dom, className) => {
  let div = document.createElement("div");
  div.setAttribute("class", className);
  dom.appendChild(div);
  return div;
};
// 创建span
const createSpan = (dom, text) => {
  let span = document.createElement("span");
  span.setAttribute("class", "dialog-tip");
  span.innerText = text;
  dom.appendChild(span);
};
// 创建label
const createLabel = (dom, text) => {
  let label = document.createElement("label");
  label.innerText = text;
  dom.appendChild(label);
};
// 创建input
const createInput = (dom, className, value, type) => {
  let input = document.createElement("input");
  input.setAttribute("id", className);
  input.setAttribute("type", type);
  input.value = value;
  dom.appendChild(input);
};
// 创建button
const createBtn = (dom, clickEvent, className, text) => {
  let btn = document.createElement("button");
  btn.setAttribute("class", className);
  btn.addEventListener("click", clickEvent, false);
  btn.innerText = text;
  dom.appendChild(btn);
};

// 创建
const createDialog = (dom, text, nameValue, timeValue, okBtn, cancelBtn) => {
  let dialogCon = createDiv(dom, "dialog-con");
  dialogCon.addEventListener("click", (e) => {
    window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
  });
  createSpan(dialogCon, text);
  let dialogInputName = createDiv(dialogCon, "dialog-input");
  createLabel(dialogInputName, "待办项：");
  createInput(dialogInputName, "dialog-input-name", nameValue, "text");
  let dialogInputTime = createDiv(dialogCon, "dialog-input");
  createLabel(dialogInputTime, "完成时间：");
  createInput(dialogInputTime, "dialog-input-time", timeValue, "date");
  let dialogInputBtn = createDiv(dialogCon, "dialog-input-btn");
  createBtn(dialogInputBtn, okBtn, "dialog-sure", "确定");
  createBtn(dialogInputBtn, cancelBtn, "dialog-cance", "取消");
};
// 初始化
let dialogBox = document.querySelector(".dialog-box");
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
