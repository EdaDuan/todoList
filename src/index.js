import './css/global.css'
import './css/index.css'
import './util/init'
let liitem = document.getElementsByClassName("nav-li");
let boxitem = document.getElementsByClassName("con-box");
let aitem = document.getElementsByClassName("nav-a");
boxitem[0].style.display = "block";
liitem[0].style.borderTop = "3px solid #ff8400";
liitem[0].style.backgroundColor = "white";
aitem[0].style.color = "#ff8400";

for (var i = 0; i < liitem.length; i++) {
	(function(i){
		liitem[i].onmouseover = function() {
			for (var j = 0; j < boxitem.length; j++) {
				boxitem[j].style.display = "none";
				liitem[j].style.borderTop = "transparent";
				liitem[j].style.backgroundColor = "transparent";
        aitem[j].style.color = "#fff";
			}
			boxitem[i].style.display = "block";
			liitem[i].style.borderTop = "3px solid #ff8400";
			liitem[i].style.backgroundColor = "white";
      aitem[i].style.color = "#ff8400";
			if (i==0) {
				liitem[i].style.borderLeft = "none";
        liitem[i].style.borderLeft = "none";
			}
		}
	})(i)
}

