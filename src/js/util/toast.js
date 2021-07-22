/*
 * @Author: your name
 * @Date: 2021-07-20 16:30:50
 * @LastEditTime: 2021-07-22 09:32:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/util/toast.js
 */
let ToastWrap = null;
let count = 0;

function Toast(props) {
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
    document.getElementById(id).remove();
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
