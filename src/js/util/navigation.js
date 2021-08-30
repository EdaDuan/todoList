/*
 * @Description:
 * @Version: 2.0
 * @Autor: duanfy
 * @Date: 2021-08-25 17:13:16
 * @LastEditors: duanfy
 * @LastEditTime: 2021-08-30 10:28:42
 */

import { todoListDataRender } from "../pages/TDToday";
import doneList from "../pages/TDFinished";
import notDoneList from "../pages/TDUnfinished";
import { recycleRender } from "../pages/TDRecycly";

import CookieUtil from "../store/cookieUtils";
import { getTodoList } from "./getTodoList";
const navigation = () => {
  let navData = [];
  let isLogin = CookieUtil.get("ses_token") ? true : false;
  let topNav = document.getElementById("top-nav");
  let liItem = topNav.getElementsByTagName("li");
  let boxItem = document.getElementsByClassName("con-box");
  let listArr = [todoListDataRender, doneList, notDoneList, recycleRender];
  boxItem[0].classList.add("current");
  liItem[0].className = "nav-li-current";
  for (let i = 0; i < liItem.length; i++) {
    (function (i) {
      liItem[i].onclick = async function () {
        for (let j = 0; j < boxItem.length; j++) {
          liItem[j].className = "";
          boxItem[j].classList.remove("current");
        }
        navData = getTodoList(isLogin);
        listArr[i](navData, isLogin);
        liItem[i].className = "nav-li-current";
        boxItem[i].classList.add("current");
      };
    })(i);
  }
};

export default navigation;
