import emptyBox from "./util/emptyBox";
// 定义全局变量
let todoListStorage;
let btnTodoOperate = document.getElementById("btnTodoOperate");
let btnDoneOperate = document.getElementById("btnDoneOperate");
let taskLabel = document.getElementsByClassName("taskLabel");

const initData = (tasks) => {
  localStorage.setItem("listItem", JSON.stringify(tasks)); //将JS对象转化成JSON对象并保存到本地
};
const initList = () => {
  let listItem = localStorage.getItem("listItem"); //获取本地的数据
  if (listItem != null) {
    //不为空时
    todoListStorage = JSON.parse(listItem); //JSON对象转换为JS对象
  } else {
    todoListStorage = []; //置空
  }
  let todoUlItem = document.getElementsByClassName("con-todo-ul")[0];
  todoUlItem.innerHTML = "";
  let doneUlItem = document.getElementsByClassName("con-done-ul")[0];
  doneUlItem.innerHTML = "";
  let fragmentTodo = document.createDocumentFragment();
  let fragmentDone = document.createDocumentFragment();
  todoListStorage.forEach((item) => {
    let li = document.createElement("li");
    li.className = "con-task-li";
    let checkBox = document.createElement("input");
    checkBox.setAttribute("id", item.taskId);
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("value", item.taskName);
    let label = document.createElement("label");
    label.setAttribute("for", item.taskId);
    let span = document.createElement("span");
    span.innerText = item.taskName;
    let delBtn = document.createElement("button");
    delBtn.innerHTML = "删除";
    let editorBtn = document.createElement("button");
    editorBtn.innerHTML = "编辑";
    li.appendChild(checkBox);
    li.appendChild(label);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(editorBtn);
    if (item.status) {
      checkBox.setAttribute("name", "todoList");
      fragmentTodo.appendChild(li);
    } else {
      checkBox.checked = true;
      checkBox.setAttribute("name", "doneList");
      fragmentDone.appendChild(li);
    }
  });
  fragmentTodo.childNodes.length === 0
    ? (btnTodoOperate.setAttribute("disabled", "false"),
      (btnTodoOperate.checked = true),
      (taskLabel[0].style.border = "1px solid #eee"),
      todoUlItem.appendChild(emptyBox("今日任务为空，快去创建吧～")))
    : (btnTodoOperate.removeAttribute("disabled"),
      (btnTodoOperate.checked = false),
      (taskLabel[0].style.border = "1px solid #666"),
      todoUlItem.appendChild(fragmentTodo));
  fragmentDone.childNodes.length === 0
    ? (btnDoneOperate.setAttribute("disabled", "false"),
      (btnDoneOperate.checked = true),
      (taskLabel[1].style.border = "1px solid #eee"),
      doneUlItem.appendChild(emptyBox("今日还没有完成任务～")))
    : (btnDoneOperate.removeAttribute("disabled"),
      (btnDoneOperate.checked = false),
      (taskLabel[1].style.border = "1px solid #666"),
      doneUlItem.appendChild(fragmentDone));
};
const initCheck = () => {};
export { initData, initList };
