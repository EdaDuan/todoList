/*
 * @Author: your name
 * @Date: 2021-06-16 15:35:10
 * @LastEditTime: 2021-07-05 15:49:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/index.js
 */
import axios from "axios";
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
const getData = () => {
  //请求数据函数
  axios
    .post("http://127.0.0.1:3000")
    .then(function (res) {
      console.log(res.data);
    })
    .catch(function (err) {
      console.log(err);
    });
};
getData();
