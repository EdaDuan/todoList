import { createTodo, addCheckName } from "../init";
import { removeEmptyBox, inputValue } from "./common";
import formatData from "../util/formate";
let dialogBox = document.querySelector(".dialog-box");
let dialogTip = document.querySelector(".dialog-tip");
let dialogSure = document.querySelector(".dialog-sure");
let dialogCancel = document.querySelector(".dialog-cancel");
let dialogInputName = document.querySelector("#dialog-input-name");
let dialogInputTime = document.querySelector("#dialog-input-time");

let todoUlItem = document.querySelector(".con-todo-ul");
let creatTime = "";
// 新建待办项弹窗的初始化
const newInit = () => {
  let date = new Date(); //当前时间
  let finishTime = formatData(date);
  dialogInputName.value = "";
  dialogInputTime.value = finishTime;
};
// // 待办项输入框失去焦点时获取当前时间
dialogInputName.onblur = function () {
  let date = new Date();
  creatTime = formatData(date);
};
// 新建待办项的UI
const changeNewStatus = (newtodo) => {
  const { dom, checkbox } = createTodo(newtodo, "TODO");
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
    taskId: listItem[listItem.length - 1].taskId + 1,
    taskName: "", //输入的内容
    createTime: "",
    status: true,
  };
  let nameValue = dialogInputName.value; //使用nameValue存储
  let finishTime = dialogInputTime.value;
  if (inputValue(nameValue) || inputValue(finishTime)) {
    return;
  } else {
    var flag = confirm("您确定要添加该事项吗?"); //弹出确认框
    if (flag) {
      newtodo.taskName = nameValue;
      newtodo.createTime = creatTime;
      newtodo.finishTime = finishTime;
      changeNewStatus(newtodo);
      changeNewData(newtodo, listItem, nameValue, finishTime);
      alert("添加成功");
    } else {
      alert("操作取消");
    }
    dialogBox.style.display = "none";
  }
  unclick();
};
// 编辑初始化
const editInit = (list) => {
  dialogInputName.value = list.taskName;
  dialogInputTime.value = list.finishTime;
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
  let nameValue = dialogInputName.value;
  let finishTime = dialogInputTime.value;
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
    dialogBox.style.display = "none";
  } else {
    alert("操作取消");
    dialogBox.style.display = "none";
    return;
  }
};
function handelFun() {
  if (dialogSure._status === "new") {
    console.log("新建");
    handelNewSure();
  } else {
    console.log("编辑");
    handelEditSure();
  }
}
function handelNewSure() {
  newSure();
}
function handelEditSure() {
  const params = dialogSure._params;
  editSure(params.element, params.list);
  unclick();
}
// 函数移除
const unclick = () => {
  console.log("调用了移除函数");
  dialogSure.removeEventListener("click", handelFun, false);
};
// 判断弹窗
const changeModel = (msg, element, list) => {
  switch (msg) {
    case "tasksNewDialog":
      dialogTip.innerText = "新建任务项";
      dialogBox.style.display = "block";
      newInit();
      dialogSure._status = "new";
      dialogSure.addEventListener("click", handelFun, false);
      break;
    case "editorDialog":
      dialogTip.innerText = "编辑任务项";
      dialogBox.style.display = "block";
      editInit(list);
      dialogSure._params = { element, list };
      dialogSure._status = "edit";
      dialogSure.addEventListener("click", handelFun, false);
      break;
    default:
      console.log("弹窗出错了！");
  }
};

const dialogModel = (msg, element = "", list = "") => {
  changeModel(msg, element, list);
  // 取消
  dialogCancel.addEventListener("click", (e) => {
    unclick();
    dialogBox.style.display = "none";
  });
  // 弹窗以外部分
  dialogBox.addEventListener("click", () => {
    dialogBox.style.display = "none";
  });
};
export default dialogModel;
