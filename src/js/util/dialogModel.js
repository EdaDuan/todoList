import { createTodo, addCheckName } from "../init";
import { removeEmptyBox } from "./common";
import formatData from "../util/formate";
let diologBox = document.querySelector(".diolog-box");
let diologTip = document.querySelector(".diolog-tip");
let diologSure = document.querySelector(".diolog-sure");
let diologCancer = document.querySelector(".diolog-cancer");
let diologInputName = document.querySelector("#diolog-input-name");
let diologInputTime = document.querySelector("#diolog-input-time");

let todoUlItem = document.querySelector(".con-todo-ul");
let creatTime = "";
// 新建待办项弹窗的初始化
const newInit = () => {
  let date = new Date(); //当前时间
  let finishTime = formatData(date);
  diologInputName.value = "";
  diologInputTime.value = finishTime;
};
// 待办项输入框失去焦点时获取当前时间
diologInputName.onblur = function () {
  let date = new Date();
  creatTime = formatData(date);
};
// 新建待办项的UI
const changeNewStatus = (newtodo) => {
  const { dom, checkbox } = createTodo(newtodo);
  console.log("todoUlItem: ", todoUlItem);
  removeEmptyBox(todoUlItem);
  addCheckName(newtodo, dom, checkbox, todoUlItem);
};
// 新建待办项的data
const changeNewData = (newtodo, data) => {
  data.push(newtodo); //往todolist中添加对象
  localStorage.setItem("listItem", JSON.stringify(data)); //将JS对象转化成JSON对象并保存到本地
};
// 新建待办项的确认事件
const newSure = () => {
  let listItem = JSON.parse(localStorage.getItem("listItem")); //获取本地数据
  let newtodo = {
    taskId: listItem.length,
    taskName: "", //输入的内容
    createTime: "",
    status: true,
  };
  let nameValue = diologInputName.value; //使用nameValue存储
  let finishTime = diologInputTime.value;
  if (nameValue.length == 0 && nameValue.trim() == "") {
    //当输入为空时
    alert("输入事项不能为空");
    return;
  }
  var flag = confirm("您确定要添加该事项吗?"); //弹出确认框
  if (flag) {
    newtodo.taskName = nameValue;
    newtodo.createTime = creatTime;
    newtodo.finishTime = finishTime;
    changeNewStatus(newtodo);
    changeNewData(newtodo, listItem, nameValue, finishTime);
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
// 编辑 修改UI
const changeEditStatus = (element, nameValue) => {
  element.target.parentNode.childNodes.forEach((item) => {
    if (item.tagName === "SPAN") {
      item.innerText = nameValue;
    }
  });
};
// 编辑 修改数据
const changeEditData = (data, list, nameValue, finishTime) => {
  data.forEach((item) => {
    if (item.taskId === list.taskId) {
      item.taskName = nameValue;
      item.finishTime = finishTime;
    }
  });
};
// 编辑确认事件判断
const editSure = (element, list) => {
  let nameValue = diologInputName.value;
  let finishTime = diologInputTime.value;
  if (nameValue.length == 0 && nameValue.trim() == "") {
    //当输入为空时
    alert("输入事项不能为空");
    return;
  }
  var flag = confirm("您确定要修改该事项吗?");
  if (flag) {
    let listItem = JSON.parse(localStorage.getItem("listItem"));
    changeEditStatus(element, nameValue);
    changeEditData(listItem, list, nameValue, finishTime);
    localStorage.setItem("listItem", JSON.stringify(listItem)); //将JS对象转化成JSON对象并保存到本地
    console.log("listItem: ", listItem);
    alert("编辑成功");
    diologBox.style.display = "none";
  } else {
    alert("操作出错");
    return;
  }
};
// 函数移除
function handelNewSure() {
  newSure();
  diologSure.removeEventListener("click", handelNewSure, false);
}
function handelEditSure() {
  const params = diologSure._params;
  editSure(params.element, params.list);
  diologSure.removeEventListener("click", handelEditSure, false);
}
// 判断弹窗
const changeModel = (msg, element, list) => {
  switch (msg) {
    case "tasksNewDialog":
      diologTip.innerText = "新建任务项";
      diologBox.style.display = "block";
      newInit();
      diologSure.addEventListener("click", handelNewSure, false);
      break;
    case "editorDialog":
      diologTip.innerText = "编辑任务项";
      diologBox.style.display = "block";
      editInit(list);
      diologSure._params = { element, list };
      diologSure.addEventListener("click", handelEditSure, false);
      break;
    default:
      console.log("弹窗出错了！");
  }
};

const dialogModel = (msg, element = "", list = "") => {
  changeModel(msg, element, list);
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
