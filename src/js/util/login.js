/*
 * @Author: your name
 * @Date: 2021-07-13 17:21:11
 * @LastEditTime: 2021-07-30 10:48:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/util/login.js
 */
import {
  createDialog,
  popupLogin,
  closeLogin,
} from "../components/loginDialog";
import { userLogin, userRegister } from "../../http/api";
import CookieUtil from "../util/cookieUtils";
import Toast from "../util/toast";
// 登陆按钮的DOM
let loginBtn = document.querySelector("#loginBtn");
let userMsg = document.querySelector("#userMsg");
// DOM的修改。登陆样式的修改
const loginStatus = () => {
  let useMsgCookie =
    CookieUtil.get("user_msg") && JSON.parse(CookieUtil.get("user_msg"));
  useMsgCookie
    ? ((userMsg.firstElementChild.innerHTML = useMsgCookie.name),
      (userMsg.lastElementChild.innerHTML = "注销"))
    : ((userMsg.firstElementChild.innerHTML = ""),
      (userMsg.lastElementChild.innerHTML = "登陆/注册"));
};
// 修改弹窗的点击事件
const onCLick = () => {
  let useMsgCookie =
    CookieUtil.get("user_msg") && JSON.parse(CookieUtil.get("user_msg"));
  useMsgCookie ? logout() : (createDialog(login, register), popupLogin());
};
const changClick = () => {
  loginBtn.addEventListener("click", onCLick);
};
// 询问用户是否需要将本地数据同步到当前登陆账户
// 确认登陆
const login = (accountDom, pwdDom) => {
  let localTodoList = JSON.parse(localStorage.getItem("todoList"))
    ? JSON.parse(localStorage.getItem("todoList"))
    : [];
  let tag = "";
  let flag = confirm("是否同步本地数据?");
  flag ? (tag = true) : (tag = false);
  userLogin({
    account: accountDom.value,
    pwd: pwdDom.value,
    localTodoList,
    tag,
  })
    .then((res) => {
      if (res.ok) {
        CookieUtil.set("ses_token", res.ses_token);
        CookieUtil.set(
          "user_msg",
          JSON.stringify({
            name: res.data[0].userName,
          })
        );
        // 登陆成功更新页面的数据
        loginStatus();
        changClick();
        closeLogin();
        location.reload();
      } else {
        Toast.error(res.error);
      }
    })
    .catch((e) => {
      closeLogin();
      Toast.error("服务器连接失败");
    });
};
// 确认注册方法
const register = (regRes, nameDom, accountDom, pwdDom) => {
  if (regRes()) {
    userRegister({
      userName: nameDom.value,
      account: accountDom.value,
      pwd: pwdDom.value,
    }).then((res) => {
      if (res.ok) {
        Toast.show("注册成功，请登录");
        nameDom.value = "";
        accountDom.value = "";
        pwdDom.value = "";
      } else {
        Toast.error(res.error);
      }
    });
  }
};
// 注销账号
const logout = () => {
  var flag = confirm("您确定退出账号吗?");
  if (flag) {
    CookieUtil.unset("ses_token");
    CookieUtil.unset("user_msg");
    loginStatus();
    changClick();
    location.reload();
  }
};
// 登陆弹窗
const loginShow = () => {
  loginStatus();
  changClick();
};
export { loginShow };
