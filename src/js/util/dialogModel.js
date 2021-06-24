import { createTodo, addCheckName } from "../init";
import formatData from "../util/formate";
let diologBox = document.querySelector(".diolog-box");
let diologTip = document.querySelector(".diolog-tip");
let diologSure = document.querySelector(".diolog-sure");
let diologCancer = document.querySelector(".diolog-cancer");
let diologInputName = document.querySelector("#diolog-input-name");
let diologInputTime = document.querySelector("#diolog-input-time");

let todoUlItem = document.querySelector(".con-todo-ul");
let creatTime = "";
// 新建的初始化
const newInit = () => {
  let date = new Date(); //当前时间
  let finishTime = formatData(date);
  diologInputName.value = "";
  diologInputTime.value = finishTime;
};
// 失去焦点时获取当前时间
diologInputName.onblur = function () {
  let date = new Date();
  creatTime = formatData(date);
};
// 新建的确认
const newSure = () => {
  let newtodo = {
    taskId: 17,
    taskName: "", //输入的内容
    createTime: "",
    status: true,
  };
  let nameValue = diologInputName.value; //使用nameValue存储
  if (nameValue.length == 0 && nameValue.trim() == "") {
    //当输入为空时
    alert("输入事项不能为空");
    return;
  }
  var flag = confirm("您确定要添加该事项吗?"); //弹出确认框
  if (flag) {
    newtodo.taskName = nameValue; //值赋给newtodo对象的taskName属性
    newtodo.createTime = creatTime;
    newtodo.finishTime = diologInputTime.value;
    let listItem = JSON.parse(localStorage.getItem("listItem")); //获取本地数据
    listItem.push(newtodo); //往todolist中添加对象
    const { dom, checkbox } = createTodo(newtodo);
    addCheckName(newtodo, dom, checkbox, todoUlItem);
    localStorage.setItem("listItem", JSON.stringify(listItem)); //将JS对象转化成JSON对象并保存到本地
    diologInputName.value = ""; //对输入框进行初始化
    alert("添加成功");
    diologBox.style.display = "none";
  } else {
    alert("操作出错");
    return;
  }
};
// 编辑初始化
const editInit = (list) => {
  diologInputName.value = list.taskName;
  diologInputTime.value = list.finishTime;
};
// 编辑确认
const editSure = (item, list) => {
  console.log("list: ", list);
  console.log("item: ", item.target.parentNode.childNodes);
  let nameValue = diologInputName.value;

  if (nameValue.length == 0 && nameValue.trim() == "") {
    //当输入为空时
    alert("输入事项不能为空");
    return;
  }
  var flag = confirm("您确定要修改该事项吗?");
  if (flag) {
    item.target.parentNode.childNodes.forEach((item) => {
      if (item.tagName === "SPAN") {
        item.innerText = nameValue;
      }
    });
    let listItem = JSON.parse(localStorage.getItem("listItem"));
    list.taskName = nameValue;
    localStorage.setItem("listItem", JSON.stringify(listItem)); //将JS对象转化成JSON对象并保存到本地
    alert("编辑成功");
    diologBox.style.display = "none";
  } else {
    alert("操作出错");
    return;
  }
};

const dialogModel = (msg, item = "", list = "") => {
  switch (msg) {
    case "tasksNewDialog":
      diologTip.innerText = "新建任务项";
      diologBox.style.display = "block";
      newInit();
      diologSure.addEventListener("click", function () {
        newSure();
      });
      break;
    case "editorDialog":
      diologTip.innerText = "编辑任务项";
      diologBox.style.display = "block";
      editInit(list);
      diologSure.addEventListener("click", function () {
        editSure(item, list);
      });
      break;
    default:
      console.log("🚀 ~ file: model.js ~ line 2 ~ model ~ msg", msg);
  }
  // 取消
  diologCancer.addEventListener("click", (e) => {
    diologBox.style.display = "none";
  });
  // 弹窗以外部分
  diologBox.addEventListener("click", () => {
    diologBox.style.display = "none";
  });
};
export default dialogModel;
