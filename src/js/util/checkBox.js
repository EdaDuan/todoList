import { initList } from "../init";
const checkBox = () => {
  let listItem = JSON.parse(localStorage.getItem("listItem")); //获取本地数据
  let todayTask = document.getElementsByClassName("con-todayTask")[0];
  let todoList = document.getElementsByName("todoList");
  let doneList = document.getElementsByName("doneList");
  // 今日待办中的todoList
  document.getElementById("btnTodoOperate").addEventListener("click", (e) => {
    if (todoList.length !== 0) {
      console.log("当todo有数据时");
      for (let i = 0; i < listItem.length; i++) {
        if (listItem[i].status) {
          listItem[i].status = false;
        }
      }
      localStorage.setItem("listItem", JSON.stringify(listItem)); //将JS对象转化成JSON对象并保存到本地
      initList(); //每次保存完都刷新页面
    }
  });
  // 今日待办中的doneList
  document.getElementById("btnDoneOperate").addEventListener("click", (e) => {
    if (doneList.length !== 0) {
      console.log("当done有数据时");
      for (let i = 0; i < listItem.length; i++) {
        if (!listItem[i].status) {
          listItem[i].status = true;
        }
      }
      localStorage.setItem("listItem", JSON.stringify(listItem)); //将JS对象转化成JSON对象并保存到本地
      initList(); //每次保存完都刷新页面
    }
  });
  todayTask.addEventListener("click", (e) => {
    if (e.target.nodeName === "INPUT") {
      listItem.map((item) => {
        if (item.taskId === Number(e.target.id)) {
          item.status = !item.status;
        }
      });
      localStorage.setItem("listItem", JSON.stringify(listItem)); //将JS对象转化成JSON对象并保存到本地
      initList();
    }
  });
};
export default checkBox;
