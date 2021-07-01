import { initList } from "../init";
import doneList from "../components/doneList";
import notDoneList from "../components/notDoneList";
import recyclLis from "../components/recyclList";
const navSwitch = () => {
  let liItem = document.getElementsByClassName("nav-li");
  let boxItem = document.getElementsByClassName("con-box");
  let aItem = document.getElementsByClassName("nav-a");
  let listArr = [initList, doneList, notDoneList, recyclLis];
  boxItem[0].style.display = "block";
  aItem[0].style.color = "#ff8400";
  liItem[0].classList.add("nav-li-mouse-over");

  for (var i = 0; i < liItem.length; i++) {
    (function (i) {
      liItem[i].onclick = function () {
        for (var j = 0; j < boxItem.length; j++) {
          liItem[j].classList.add("nav-li-mouse-out");
          liItem[j].classList.remove("nav-li-mouse-over");
          boxItem[j].style.display = "none";
          aItem[j].style.color = "#fff";
        }
        let listItem = JSON.parse(localStorage.getItem("listItem")); //获取本地的数据
        listArr[i](listItem);
        liItem[i].classList.add("nav-li-mouse-over");
        liItem[i].classList.remove("nav-li-mouse-out");
        boxItem[i].style.display = "block";
        aItem[i].style.color = "#ff8400";
      };
    })(i);
  }
};

export default navSwitch;
