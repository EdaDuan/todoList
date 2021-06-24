// 全局样式
import "./css/global.css";
// 局部样式
import "./css/index.css";
// json数据模拟
import { tasks } from "../mock/export";
// 初始化页面自定义函数自调用
import { initList } from "./js/init";
// 导航栏切换
import navSwitch from "./js/util/navSwitch";
import { newList } from "./js/util/operation";
// 初始化页面
localStorage.setItem("listItem", JSON.stringify(tasks)); //将JS对象转化成JSON对象并保存到本地
initList();
// 导航栏
navSwitch();
newList();
// 阻止弹窗的冒泡事件
document
  .getElementsByClassName("diolog-con")[0]
  .addEventListener("click", (e) => {
    window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
  });
