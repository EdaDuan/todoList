let conTodoUl = document.querySelector(".con-todo-ul");
// 判断是否为空
const removeEmptyBox = (ul) => {
  if (ul.firstChild.tagName === "DIV") {
    ul.firstChild.remove();
  }
};
// 判断那个ul
const isListUl = (e) => {
  return e.target.parentNode.parentNode == conTodoUl ? true : false;
};
// 当list为空时全选框的样式和内容提示为空
const listEmpty = (btnOperate, taskLabel) => {
  console.log("btnOperate: ", btnOperate);
  btnOperate.setAttribute("disabled", "false");
  btnOperate.checked = true;
  taskLabel.style.border = "1px solid #eee";
};
const listNotEmpty = (btnOperate, taskLabel) => {
  btnOperate.removeAttribute("disabled");
  btnOperate.checked = false;
  taskLabel.style.border = "1px solid #666";
};
export { removeEmptyBox, isListUl, listEmpty, listNotEmpty };
