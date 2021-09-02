/*
 * @Description:
 * @Version: 2.0
 * @Autor: duanfy
 * @Date: 2021-08-25 17:13:16
 * @LastEditors: duanfy
 * @LastEditTime: 2021-09-02 16:15:10
 */

import { todoListDataRender } from "../pages/TDToday";
import doneList from "../pages/TDFinished";
import notDoneList from "../pages/TDUnfinished";
import { recycleRender } from "../pages/TDRecycly";

import CookieUtil from "../store/cookieUtils";
import { CACHE_KEY } from "../common/constant";
import { cacheData } from "../store/cache";

const cache = cacheData();

const navigation = () => {
  let navData = [];
  const isLogin = CookieUtil.get("ses_token") ? true : false;
  const topNav = document.getElementById("top-nav");
  const liItem = topNav.getElementsByTagName("li");
  const boxItem = document.getElementsByClassName("con-box");
  const listArr = [todoListDataRender, doneList, notDoneList, recycleRender];
  boxItem[0].classList.add("current");
  liItem[0].className = "nav-li-current";

  for (let i = 0; i < liItem.length; i++) {
    liItem[i].onclick = function () {
      for (let j = 0; j < boxItem.length; j++) {
        liItem[j].className = "";
        boxItem[j].classList.remove("current");
      }
      navData = cache.get(CACHE_KEY.CACHE_TODO);
      listArr[i](navData, isLogin);
      liItem[i].className = "nav-li-current";
      boxItem[i].classList.add("current");
    };
  }
};

export default navigation;
