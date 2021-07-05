/*
 * @Author: your name
 * @Date: 2021-06-17 10:17:57
 * @LastEditTime: 2021-07-05 10:14:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/util/navSwitch.js
 */
import { initList } from "../init";
import doneList from "../components/doneList";
import notDoneList from "../components/notDoneList";
import recyclLis from "../components/recyclList";
const navSwitch = () => {
  let liItem = document.getElementsByClassName("nav-li");
  let boxItem = document.getElementsByClassName("con-box");

  let listArr = [initList, doneList, notDoneList, recyclLis];
  boxItem[0].classList.add("current");

  liItem[0].classList.add("nav-li-mouse-over");
  for (var i = 0; i < liItem.length; i++) {
    (function (i) {
      liItem[i].onclick = function () {
        for (var j = 0; j < boxItem.length; j++) {
          liItem[j].classList.add("nav-li-mouse-out");
          liItem[j].classList.remove("nav-li-mouse-over");
          boxItem[j].classList.remove("current");
        }
        let listItem = JSON.parse(localStorage.getItem("listItem")); //获取本地的数据
        listArr[i](listItem);
        liItem[i].classList.add("nav-li-mouse-over");
        liItem[i].classList.remove("nav-li-mouse-out");
        boxItem[i].classList.add("current");
      };
    })(i);
  }
};

export default navSwitch;
