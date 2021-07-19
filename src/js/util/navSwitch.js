/*
 * @Author: your name
 * @Date: 2021-06-17 10:17:57
 * @LastEditTime: 2021-07-19 00:13:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/util/navSwitch.js
 */

import { todoListDataRender } from "../components/todoList";
import doneList from "../components/doneList";
import notDoneList from "../components/notDoneList";
import { recycleRender } from "../components/recycleList";
import { getData } from "../../http";
import CookieUtil from "./cookieUtils";

const navSwitch = () => {
  var topNav = document.getElementById("top-nav");
  let liItem = topNav.getElementsByTagName("li");
  let boxItem = document.getElementsByClassName("con-box");
  let listArr = [todoListDataRender, doneList, notDoneList, recycleRender];
  boxItem[0].classList.add("current");
  liItem[0].className = "nav-li-current";
  for (var i = 0; i < liItem.length; i++) {
    (function (i) {
      let useMsgCookie = CookieUtil.get("ses_token");
      liItem[i].onclick = async function () {
        for (var j = 0; j < boxItem.length; j++) {
          liItem[j].className = "";
          boxItem[j].classList.remove("current");
        }
        if (useMsgCookie) {
          let res = await getData();
          listArr[i](res.data, true);
        } else {
          let localTodoList = JSON.parse(localStorage.getItem("todoList"))
            ? JSON.parse(localStorage.getItem("todoList"))
            : [];
          listArr[i](localTodoList, false);
        }
        liItem[i].className = "nav-li-current";
        boxItem[i].classList.add("current");
      };
    })(i);
  }
};

export default navSwitch;
