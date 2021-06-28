import { createTodo, addCheckName } from "../init";
import emptyBox from "../util/emptyBox";
// 创建div
const createDiv = (dom) => {
  let div = document.createElement("div");
  div.setAttribute("class", "notDoneBox");
  dom.appendChild(div);
  return div;
};
// 创建span
const createSpan = (dom, data) => {
  let span = document.createElement("span");
  span.setAttribute("class", "notDoneData");
  span.innerText = data;
  dom.appendChild(span);
};
// 创建ul
const createUl = (dom) => {
  let ul = document.createElement("ul");
  ul.setAttribute("class", "notoDoneUl");
  dom.appendChild(ul);
  return ul;
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
// 创建分类的DOM
const createDom = (obj, ul) => {
  obj.forEach((item) => {
    const { dom, checkbox } = createTodo(item, "NOTDONE");
    addCheckName(item, dom, checkbox, ul);
  });
};

const classifyDom = (dataArr, fragment) => {
  for (let key in dataArr) {
    let div = createDiv(fragment); //创建DIV，挂载到fragment上
    createSpan(div, key); //在DIV上添加span 显示日期
    createDom(dataArr[key], createUl(div)); //创建UL 将当前日期下的所有todoList添加到当前日期的ul下
  }
};
const notDoneList = (data) => {
  // data 当前的所有数据
  // 获取最外层的ul
  let allNotDone = document.querySelector(".allNotDone");
  allNotDone.innerHTML = "";
  let fragmentNotDone = document.createDocumentFragment();
  // 获取所有未完成的待办项
  const filterNotDoneList = data.filter((item) => item.status == true);
  // 获取分类后的数组
  let classifyArr = classifyTime(filterNotDoneList);
  // 获取分类后的DOM 传入排好序的数组
  classifyDom(objKeySort(classifyArr), fragmentNotDone);
  fragmentNotDone.childNodes.length === 0
    ? allNotDone.appendChild(emptyBox("所有待办项都已完成～"))
    : allNotDone.appendChild(fragmentNotDone);
};
export default notDoneList;
