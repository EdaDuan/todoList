import { initList } from "../init";
import notDoneList from "../components/notDoneList";
import allTodoList from "../components/allTodoList";
const navSwitch = () => {
  let liItem = document.getElementsByClassName("nav-li");
  let boxItem = document.getElementsByClassName("con-box");
  let aItem = document.getElementsByClassName("nav-a");
  let listArr = [initList, notDoneList, allTodoList];
  boxItem[0].style.display = "block";
  aItem[0].style.color = "#ff8400";
  liItem[0].classList.add("navLiMouseOver");

  for (var i = 0; i < liItem.length; i++) {
    (function (i) {
      liItem[i].onclick = function () {
        for (var j = 0; j < boxItem.length; j++) {
          liItem[j].classList.add("navLiMouseOut");
          liItem[j].classList.remove("navLiMouseOver");
          boxItem[j].style.display = "none";
          aItem[j].style.color = "#fff";
        }
        let listItem = JSON.parse(localStorage.getItem("listItem")); //获取本地的数据
        listArr[i](listItem);
        liItem[i].classList.add("navLiMouseOver");
        liItem[i].classList.remove("navLiMouseOut");
        boxItem[i].style.display = "block";
        aItem[i].style.color = "#ff8400";
      };
    })(i);
  }
};

export default navSwitch;
