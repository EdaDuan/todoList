/*
 * @Author: your name
 * @Date: 2021-07-09 10:58:24
 * @LastEditTime: 2021-08-18 11:35:59
 * @LastEditors: duanfy
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/components/createTodo.js
 */

// 创建checkbox
const createCheckbox = (dom, data) => {
  let checkbox = document.createElement("input");
  checkbox.setAttribute("id", "check" + data.taskId);
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("value", data.taskName);
  dom.appendChild(checkbox);
  return checkbox;
};
// 创建lable
const createLabel = (dom, data, name) => {
  let label = document.createElement("label");
  label.setAttribute("name", name);
  label.setAttribute("for", "check" + data.taskId);
  dom.appendChild(label);
};
// 创建span
const createSpan = (dom, data) => {
  let span = document.createElement("span");
  span.innerText = data.taskName;
  dom.appendChild(span);
};
// 创建button
const createBtn = (dom, className, name, text) => {
  let btn = document.createElement("input");
  btn.setAttribute("class", className);
  btn.setAttribute("type", "button");
  btn.setAttribute("name", name);
  btn.setAttribute("value", text);
  dom.appendChild(btn);
};
// 创建待办项
const createTodo = (item) => {
  let li = document.createElement("li");
  li.className = "con-task-li";
  li.setAttribute("id", item.taskId);
  let checkbox = createCheckbox(li, item);
  createLabel(li, item, "todoCheck");
  createSpan(li, item);
  createBtn(li, "con-task-delBtn", "todoDel", "删除");
  createBtn(li, "con-task-editBtn", "todoEdit", "编辑");
  return { dom: li, checkbox };
};
// 根据待办项状态添加checkbox的name属性
const addCheckName = (
  item,
  dom,
  checkbox,
  fragmentTodo,
  fragmentDone = fragmentTodo
) => {
  item.status
    ? ((checkbox.checked = true),
      checkbox.setAttribute("name", "doneList"),
      fragmentDone.appendChild(dom))
    : (checkbox.setAttribute("name", "todoList"),
      fragmentTodo.appendChild(dom));
};
export { createTodo, addCheckName };
