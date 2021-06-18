const navSwitch = () => {
  let liItem = document.getElementsByClassName("nav-li");
  let boxItem = document.getElementsByClassName("con-box");
  let aItem = document.getElementsByClassName("nav-a");
  boxItem[0].style.display = "block";
  aItem[0].style.color = "#ff8400";
  liItem[0].classList.add("navLiMouseOver");

  for (var i = 0; i < liItem.length; i++) {
    (function (i) {
      liItem[i].onmouseover = function () {
        for (var j = 0; j < boxItem.length; j++) {
          liItem[j].classList.add("navLiMouseOut");
          liItem[j].classList.remove("navLiMouseOver");
          boxItem[j].style.display = "none";
          aItem[j].style.color = "#fff";
        }
        liItem[i].classList.add("navLiMouseOver");
        liItem[i].classList.remove("navLiMouseOut");
        boxItem[i].style.display = "block";
        aItem[i].style.color = "#ff8400";
      };
    })(i);
  }
};

export default navSwitch;
