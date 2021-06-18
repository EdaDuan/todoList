const checkBox = () => {
  let todoUlItem = document.getElementsByClassName("con-todo-ul")[0];
  let doneUlItem = document.getElementsByClassName("con-done-ul")[0];
  console.log("doneUlItem: ", doneUlItem);
  let conTodoLi = document.querySelectorAll(".con-todo-li");
  console.log("conTodoLi: ", conTodoLi);
  let conDoneLi = document.querySelectorAll(".con-done-li");
  // 今日待办中的todoList
  document.getElementById("btnTodoOperate").addEventListener("click", () => {
    // 创建文档片段
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < conTodoLi.length; i++) {
      conTodoLi[i].children[0].checked = true;
      conTodoLi[i].children[0].name = "doneList";
      conTodoLi[i].classList.remove("con-todo-li");
      conTodoLi[i].classList.add("con-done-li");
      fragment.appendChild(conTodoLi[i]);
    }
    doneUlItem.appendChild(fragment);
  });

  // 今日待办中的doneList
  document.getElementById("btnDoneOperate").addEventListener("click", () => {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < conDoneLi.length; i++) {
      conDoneLi[i].children[0].checked = false;
      conDoneLi[i].children[0].name = "todoList";
      conDoneLi[i].classList.remove("con-done-li");
      conDoneLi[i].classList.add("con-todo-li");
      fragment.appendChild(conDoneLi[i]);
    }
    todoUlItem.appendChild(fragment);
  });
  todoUlItem.addEventListener("click", (e) => {
    if (e.target.type === "checkbox") {
      console.log(
        "🚀 ~ file: checkBox.js ~ line 27 ~ document.getElementsByClassName ~ e",
        e.path[1]
      );
      e.target.checked = true;
      e.target.name = "doneList";
      e.path[1].classList.remove("con-todo-li");
      e.path[1].classList.add("con-done-li");
      doneUlItem.appendChild(e.path[1]);
    }
  });
  // function cancelChooseColor( clickId ){
  //   //选中点击的元素
  //   $(clickId)[0].checked=true;
  //   //获取选中元素的color值
  //   // var color =$(clickId).val();
  //   // $('#color-input-diy-value').val(color);
  // }
};
export default checkBox;
