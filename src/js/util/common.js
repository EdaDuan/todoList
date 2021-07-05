/*
 * @Author: your name
 * @Date: 2021-06-24 18:26:04
 * @LastEditTime: 2021-07-05 15:32:58
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/util/common.js
 */
let conTodoUl = document.querySelector(".con-todo-ul");
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
    return Date.parse(b) - Date.parse(a);
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
    alert("输入事项或时间不能为空");
    return true;
  }
  return false;
};
export {
  removeEmptyBox,
  isListUl,
  listEmpty,
  listNotEmpty,
  objKeySort,
  classifyTime,
  inputValue,
};
