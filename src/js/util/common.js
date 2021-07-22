/*
 * @Author: your name
 * @Date: 2021-06-24 18:26:04
 * @LastEditTime: 2021-07-22 11:18:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/util/common.js
 */
import Toast from "../util/toast";
let conTodoUl = document.querySelector(".con-todo-ul");
const emptyBox = (text) => {
  let listDiv = document.createElement("div");
  listDiv.className = "emity-list";
  listDiv.innerHTML = text;
  return listDiv;
};
// 判断是否为空
const removeEmptyBox = (ul) => {
  if (ul.firstChild.tagName === "DIV") {
    ul.firstChild.remove();
  }
};
// 判断那个ul
const isListUl = (e) => {
  return e.target.parentNode.parentNode == conTodoUl ? true : false;
};
// 当list为空时全选框的样式和内容提示为空
const listEmpty = (btnOperate, taskLabel) => {
  btnOperate.setAttribute("disabled", "false");
  btnOperate.checked = true;
  taskLabel.style.border = "1px solid #eee";
};
// 当list部位空时全选框的样式和内容提示
const listNotEmpty = (btnOperate, taskLabel) => {
  btnOperate.removeAttribute("disabled");
  btnOperate.checked = false;
  taskLabel.style.border = "1px solid #666";
};
// 排序
const objKeySort = (obj) => {
  //排序的函数
  var newkey = Object.keys(obj).sort(function (a, b) {
    return Number(b) - Number(a);
  });
  var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
  for (var i = 0; i < newkey.length; i++) {
    //遍历newkey数组
    newObj[newkey[i]] = obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
  }
  return newObj; //返回排好序的新对象
};

// 分类
const classifyTime = (data) => {
  let listClassifyArr = {};
  for (let i = 0; i < data.length; i++) {
    // 当次循环出的变量
    let temp = data[i];
    // 保存分类条件
    let key = temp.finishTime;
    if (!listClassifyArr[key]) {
      listClassifyArr[key] = [];
    }
    listClassifyArr[key].push(temp);
  }
  return listClassifyArr;
};
// input为空的判断
const inputValue = (data) => {
  if (data.length == 0 && data.trim() == "") {
    //当输入为空时
    Toast.show("输入事项或时间不能为空");
    return true;
  }
  return false;
};
// 账号，密码用户名校验
const checkUser = (className, reg, toastMsg) => {
  let inputValue = document.querySelector(`#${className}`).value;
  if (reg.test(inputValue)) {
    return true;
  } else {
    Toast.error(toastMsg);
    return false;
  }
};

let checkResName = false,
  checkResAccount = false,
  checkResPw = false;
// 检查注册昵称
const checkName = () => {
  let regStr = /[\u4e00-\u9fa5|\w]{2,}/;
  let toastMsg = "请输入至少包含两个字符的用户名";
  checkResName = checkUser("register-username", regStr, toastMsg);
};
// 检查注册账户
const checkAccount = () => {
  let regStr = /^1[3456789]\d{9}$/;
  let toastMsg = "请输入正确的手机号";
  checkResAccount = checkUser("register-account", regStr, toastMsg);
};
// 检查注册密码规则
const checkPw = () => {
  let regStr = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;
  let toastMsg = "请输入包含字母,数字的6～16密码";
  checkResPw = checkUser("register-password", regStr, toastMsg);
};

const getCheckRes = () => {
  return checkResName && checkResAccount && checkResPw;
};
export {
  removeEmptyBox,
  isListUl,
  listEmpty,
  listNotEmpty,
  objKeySort,
  classifyTime,
  inputValue,
  emptyBox,
  checkName,
  checkAccount,
  checkPw,
  getCheckRes,
};
