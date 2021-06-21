import { initList } from "../init";
const dialogModel = (msg) => {
  const inputArr = [];
  var newtodo = {
    taskId: 17,
    taskName: "", //用户输入的内容
    createTime: "",
    status: true,
  };
  let diologBox = document.getElementsByClassName("diolog-box")[0];
  diologBox.style.display = "block";
  let diologTip = document.getElementsByClassName("diolog-tip")[0];
  let diologSure = document.querySelector(".diolog-sure");
  let diologCancer = document.querySelector(".diolog-cancer");
  console.log("diologSure: ", diologSure);
  switch (msg) {
    case "tasksNewDialog":
      diologTip.innerText = "新建任务项";
      break;
    default:
      console.log("🚀 ~ file: model.js ~ line 2 ~ model ~ msg", msg);
  }
  diologSure.addEventListener("click", (e) => {
    console.log("e: ", e);
    let temp = document.getElementById("diolog-input-name").value; //使用temp存储id为todo标签的value值
    if (temp.length == 0 && temp.trim() == "") {
      //当输入为空时
      alert("输入事项不能为空");
      return;
    }
    var flag = confirm("您确定要添加该事项吗?"); //弹出确认框
    if (flag) {
      newtodo.taskName = temp; //将temp值赋给newtodo对象的taskName属性
      let listItem = JSON.parse(localStorage.getItem("listItem")); //获取本地数据
      listItem.push(newtodo); //往todolist中添加对象
      localStorage.setItem("listItem", JSON.stringify(listItem)); //将JS对象转化成JSON对象并保存到本地
      document.getElementById("diolog-input-name").value = ""; //对输入框进行初始化
      initList();
      alert("添加成功");
      diologBox.style.display = "none";
    } else {
      alert("操作出错");
      return;
    }
  });
  diologCancer.addEventListener("click", (e) => {
    diologBox.style.display = "none";
  });
};
export default dialogModel;
