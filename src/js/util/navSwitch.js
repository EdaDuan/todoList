/*
 * @Author: your name
 * @Date: 2021-06-17 10:17:57
 * @LastEditTime: 2021-07-22 11:16:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/util/navSwitch.js
 */

import { todoListDataRender } from "../components/todoList";
import doneList from "../components/doneList";
import notDoneList from "../components/notDoneList";
import { recycleRender } from "../components/recycleList";
import { cacheData } from "./storeData";
let cache = cacheData();
let navIsLogin = false;
let navData = [];
const navSwitch = () => {
  var topNav = document.getElementById("top-nav");
  let liItem = topNav.getElementsByTagName("li");
  let boxItem = document.getElementsByClassName("con-box");
  let listArr = [todoListDataRender, doneList, notDoneList, recycleRender];
  boxItem[0].classList.add("current");
  liItem[0].className = "nav-li-current";
  for (var i = 0; i < liItem.length; i++) {
    (function (i) {
      liItem[i].onclick = async function () {
        for (var j = 0; j < boxItem.length; j++) {
          liItem[j].className = "";
          boxItem[j].classList.remove("current");
        }
        if (navIsLogin) {
          // 每次点击都从缓存中获取最新数据
          let catcheData = await cache.get("GET_TODO");
          listArr[i](catcheData ? catcheData : [], navIsLogin);
        } else {
          navData = JSON.parse(localStorage.getItem("todoList"))
            ? JSON.parse(localStorage.getItem("todoList"))
            : [];
          listArr[i](navData, navIsLogin);
        }
        liItem[i].className = "nav-li-current";
        boxItem[i].classList.add("current");
      };
    })(i);
  }
};
const navSwitchData = (isLogin) => {
  navIsLogin = isLogin;
};

export { navSwitch, navSwitchData };
