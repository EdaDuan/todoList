const checkBox = () => {
  // 今日待办中的todoList
  document.getElementById("btnTodoOperate").addEventListener("click", () => {
    var arr = new Array();
    var items = document.getElementsByName("todoList");
    for (let i = 0; i < items.length; i++) {
      if (items[i].checked) {
        arr.push(items[i].value);
      }
    }
    alert("选择的个数为：" + arr.length);
  });
  // 今日待办中的doneList
  document.getElementById("btnDoneOperate").addEventListener("click", () => {
    var arr = new Array();
    var items = document.getElementsByName("doneList");
    for (let i = 0; i < items.length; i++) {
      if (items[i].checked) {
        arr.push(items[i].value);
      }
    }
    alert("选择的个数为：" + arr.length);
  });
};
export default checkBox;
