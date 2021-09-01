/*
 * @Author: your name
 * @Date: 2021-07-13 17:21:11
 * @LastEditTime: 2021-09-01 14:42:43
 * @LastEditors: duanfy
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/util/login.js
 */
import {
  createDialog,
  popupLogin,
  closeLogin,
} from "../components/loginRegDialog";
import { post } from "../http/index";
import CookieUtil from "../store/cookieUtils";
import { todoLocalStorage } from "../store/localStorage";
import Toast from "../common/toast";
import { USER_TEXT } from "../common/constant";
import { handelError } from "../common/handelError";
// 登陆按钮的DOM
const loginBtn = document.querySelector("#loginBtn");
const userMsg = document.querySelector("#userMsg");
// DOM的修改。登陆样式的修改
const loginStatus = (isLogin) => {
  isLogin
    ? ((userMsg.firstElementChild.innerHTML = JSON.parse(
        CookieUtil.get("user_msg")
      ).name),
      (userMsg.lastElementChild.innerHTML = "注销"))
    : ((userMsg.firstElementChild.innerHTML = ""),
      (userMsg.lastElementChild.innerHTML = "登陆/注册"));
};
// 修改弹窗的点击事件
const onCLick = (isLogin) => {
  isLogin ? logout() : (createDialog(login, register), popupLogin());
};
// 询问用户是否需要将本地数据同步到当前登陆账户
// 确认登陆
const login = async (regLogin, accountDom, pwdDom) => {
  if (!regLogin()) {
    handelError(USER_TEXT.USER_LOGIN_ERRMSG);
    return;
  }
  const localTodoList = todoLocalStorage();
  let tag = "";
  const flag = confirm("是否同步本地数据?");
  flag ? (tag = true) : (tag = false);
  const res = await post("login", {
    account: accountDom.value,
    pwd: pwdDom.value,
    localTodoList,
    tag,
  });
  if (!res.data.ok) {
    handelError(res.data.error);
    return;
  }
  CookieUtil.set("ses_token", res.data.ses_token),
    CookieUtil.set(
      "user_msg",
      JSON.stringify({
        name: res.data.data[0].userName,
      })
    ),
    userBtnRender(true),
    closeLogin(),
    location.reload();
};
// 确认注册方法
const register = async (regRes, nameDom, accountDom, pwdDom) => {
  if (!regRes()) {
    handelError(USER_TEXT.USER_REGISTER_ERRMSG);
    return;
  }
  const res = await post("register", {
    userName: nameDom.value,
    account: accountDom.value,
    pwd: pwdDom.value,
  });
  if (!res.data.ok) {
    handelError(res.data.error);
    return;
  }
  Toast.show(USER_TEXT.USER_REGISTER_SUCCSMSG);
  nameDom.value = "";
  accountDom.value = "";
  pwdDom.value = "";
};
// 注销账号
const logout = () => {
  var flag = confirm("您确定退出账号吗?");
  if (flag) {
    CookieUtil.unset("ses_token");
    CookieUtil.unset("user_msg");
    userBtnRender(false), location.reload();
  }
};
// 登陆弹窗
const userBtnRender = (isLogin) => {
  loginStatus(isLogin);
  loginBtn.addEventListener("click", onCLick.bind(this, isLogin));
};
export { userBtnRender };
