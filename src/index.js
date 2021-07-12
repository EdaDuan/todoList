/*
 * @Author: your name
 * @Date: 2021-06-16 15:35:10
 * @LastEditTime: 2021-07-09 14:20:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/index.js
 */

// 全局样式
import "./css/global.css";
// 局部样式
import "./css/index.css";
// 导航栏切换
import navSwitch from "./js/util/navSwitch";
// 初始化页面
import { init } from "./js/init";
init();
// 导航栏
navSwitch();
