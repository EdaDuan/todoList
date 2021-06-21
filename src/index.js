// 全局样式
import "./css/global.css";
// 局部样式
import "./css/index.css";
// json数据模拟
import { tasks } from "../mock/export";
// 初始化页面自定义函数自调用
import { initData, initList } from "./js/init";
// 导航栏切换
import navSwitch from "./js/util/navSwitch";
import checkBox from "./js/util/checkBox";
// 弹窗
import dialogModel from "./js/util/dialogModel";

// 初始化页面
initData(tasks);
initList();
// 导航栏
navSwitch();
checkBox();

// 新建todoList
document
  .getElementsByClassName("tasksNewDialog")[0]
  .addEventListener("click", () => {
    dialogModel("tasksNewDialog");
  });

// 点击弹窗以外部分 关闭弹窗
let diologBox = document.getElementsByClassName("diolog-box")[0];
diologBox.addEventListener("click", () => {
  diologBox.style.display = "none";
});

// 阻止弹窗的冒泡事件
document
  .getElementsByClassName("diolog-con")[0]
  .addEventListener("click", (e) => {
    window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
  });
