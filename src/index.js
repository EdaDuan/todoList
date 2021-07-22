/*
 * @Author: your name
 * @Date: 2021-06-16 15:35:10
 * @LastEditTime: 2021-07-22 09:17:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/index.js
 */

// 全局样式
import "./css/global.css";
// 局部样式
import "./css/index.css";
// 初始化页面
import { init } from "./js/init";
import { newTodoList } from "./js/util/operation";
import { loginShow } from "./js/util/login";
import { navSwitch } from "./js/util/navSwitch";
init();
navSwitch();
// 登陆
loginShow();
newTodoList();
