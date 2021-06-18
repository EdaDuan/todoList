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
    let span = document.createElement("span");
    span.innerText = item.taskName;
    li.appendChild(checkBox);
    li.appendChild(span);
    if (item.status) {
      checkBox.setAttribute("name", "todoList");
      todoUlItem.appendChild(li);
    } else {
      checkBox.checked = true;
      checkBox.setAttribute("name", "doneList");
      doneUlItem.appendChild(li);
    }
  });
};
export default init;
