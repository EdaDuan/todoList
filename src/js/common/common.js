/*
 * @Author: your name
 * @Date: 2021-06-24 18:26:04
 * @LastEditTime: 2021-09-02 11:21:59
 * @LastEditors: duanfy
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/util/common.js
 */
const emptyBox = (text) => {
  const listDiv = document.createElement("div");
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
  const newkey = Object.keys(obj).sort(function (a, b) {
    return Number(b) - Number(a);
  });
  let newObj = {}; //创建一个新的对象，用于存放排好序的键值对
  for (let i = 0; i < newkey.length; i++) {
    //遍历newkey数组
    newObj[newkey[i]] = obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
  }
  return newObj; //返回排好序的新对象
};

// 分类
const classifyTime = (data) => {
  const listClassifyArr = {};
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
export {
  removeEmptyBox,
  listEmpty,
  listNotEmpty,
  objKeySort,
  classifyTime,
  emptyBox,
};
