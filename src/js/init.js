const init = (tasks) => {
  let todoUlItem = document.getElementsByClassName("con-todo-ul")[0];
  let doneUlItem = document.getElementsByClassName("con-done-ul")[0];
  tasks.forEach((item) => {
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
      li.classList.add("con-todo-li");
      todoUlItem.appendChild(li);
    } else {
      checkBox.checked = true;
      checkBox.setAttribute("name", "doneList");
      li.classList.add("con-done-li");
      doneUlItem.appendChild(li);
    }
  });
};
export default init;
