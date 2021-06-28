// 全局样式
import "./css/global.css";
// 局部样式
import "./css/index.css";
// json数据模拟
import { tasks } from "../mock/export";
// 导航栏切换
import navSwitch from "./js/util/navSwitch";
import { newTodoList } from "./js/util/operation";
// 初始化页面
import { initList } from "./js/init";
let listData = JSON.parse(localStorage.getItem("listItem")); //获取本地的数据
localStorage.setItem("listItem", JSON.stringify(listData || tasks)); //将JS对象转化成JSON对象并保存到本地
initList(listData || tasks);
// 导航栏
navSwitch();
newTodoList();
// 阻止弹窗的冒泡事件
document
  .getElementsByClassName("diolog-con")[0]
  .addEventListener("click", (e) => {
    window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
  });
