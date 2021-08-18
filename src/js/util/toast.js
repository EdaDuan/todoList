/*
 * @Author: your name
 * @Date: 2021-07-20 16:30:50
 * @LastEditTime: 2021-08-18 15:04:50
 * @LastEditors: duanfy
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/util/toast.js
 */

function Toast(props) {
  let ToastWrap = null;
  let count = 0;
  if (!ToastWrap) {
    ToastWrap = document.createElement("div");
    ToastWrap.setAttribute("class", "toast-wrap");
    document.body.append(ToastWrap);
  }
  let id = "" + Date.now() + count++;
  let toast = document.createElement("div");
  toast.setAttribute("id", id);
  toast.innerHTML = `<div class="cpt-toast"><span style="color: ${props.color}">${props.msg}</span></div>`;
  ToastWrap.append(toast);
  setTimeout(() => {
    document.getElementsByClassName("toast-wrap")[0].remove();
  }, props.time || 2000);
}

export default {
  show(msg, time) {
    Toast({ msg, time, color: "orange" });
  },
  success(msg, time) {
    Toast({ msg, time, color: "green" });
  },
  error(msg, time) {
    Toast({ msg, time, color: "red" });
  },
};
