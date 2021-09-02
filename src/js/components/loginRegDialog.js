/*
 * @Author: your name
 * @Date: 2021-07-13 14:29:08
 * @LastEditTime: 2021-09-02 11:25:32
 * @LastEditors: duanfy
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/util/loginDialog.js
 */
// 引入校验规则
import {
  checkName,
  checkAccount,
  checkPw,
  getCheckLogin,
  getCheckRes,
} from "../common/validate";
import { USER_TEXT } from "../common/constant";
// 创建div
const createDiv = (dom, className) => {
  const div = document.createElement("div");
  div.setAttribute("class", className);
  dom.appendChild(div);
  return div;
};
// 创建label
const createLabel = (dom, text) => {
  const label = document.createElement("label");
  label.innerText = text;
  dom.appendChild(label);
};
// 创建input
const createInput = (dom, className, type, placeholder) => {
  const input = document.createElement("input");
  input.setAttribute("id", className);
  input.setAttribute("type", type);
  input.placeholder = placeholder;
  dom.appendChild(input);
  return input;
};
// 创建button
const createBtn = (dom, className, text) => {
  const btn = document.createElement("button");
  btn.setAttribute("class", className);
  btn.innerText = text;
  dom.appendChild(btn);
  return btn;
};
// 创建登陆
const createLogin = (dom, login, cancel) => {
  const loginInputAccount = createDiv(dom, "login-input");
  createLabel(loginInputAccount, "账号：");
  createInput(
    loginInputAccount,
    "login-account",
    "text",
    USER_TEXT.USER_ACCOUNT
  ).addEventListener("blur", checkAccount.bind(this, "login-account"));

  const loginInputPw = createDiv(dom, "login-input");
  createLabel(loginInputPw, "密码：");
  createInput(
    loginInputPw,
    "login-password",
    "password",
    USER_TEXT.USER_PW
  ).addEventListener("blur", checkPw.bind(this, "login-password"));

  const loginInputBtn = createDiv(dom, "login-input-btn");
  createBtn(loginInputBtn, "login-sure", "确定").addEventListener(
    "click",
    login.bind(
      this,
      getCheckLogin.bind(this),
      document.querySelector("#login-account"),
      document.querySelector("#login-password")
    )
  );
  createBtn(loginInputBtn, "login-cancel", "取消").addEventListener(
    "click",
    cancel
  );
};

// 创建注册
const createRegister = (dom, register, cancel) => {
  const registerInputName = createDiv(dom, "register-input");
  createLabel(registerInputName, "用户名：");
  createInput(
    registerInputName,
    "register-username",
    "text",
    USER_TEXT.USER_NAME
  ).addEventListener("blur", checkName.bind(this, "register-username"));
  const registerInputAccount = createDiv(dom, "register-input");
  createLabel(registerInputAccount, "账号：");
  createInput(
    registerInputAccount,
    "register-account",
    "text",
    USER_TEXT.USER_ACCOUNT
  ).addEventListener("blur", checkAccount.bind(this, "register-account"));
  const registerInputPw = createDiv(dom, "register-input");
  createLabel(registerInputPw, "密码：");
  createInput(
    registerInputPw,
    "register-password",
    "password",
    USER_TEXT.USER_PW
  ).addEventListener("blur", checkPw.bind(this, "register-password"));
  const loginInputBtn = createDiv(dom, "register-input-btn");
  createBtn(loginInputBtn, "register-sure", "确定").addEventListener(
    "click",
    register.bind(
      this,
      getCheckRes.bind(this),
      document.querySelector("#register-username"),
      document.querySelector("#register-account"),
      document.querySelector("#register-password")
    )
  );
  createBtn(loginInputBtn, "register-cancel", "取消").addEventListener(
    "click",
    cancel
  );
};
const loginRegShow = (showDom, hiddenDom) => {
  hiddenDom.style.display = "none";
  showDom.style.display = "block";
};
// 创建
// 初始化
const dialogBox = document.querySelector(".dialog-box");
const createDialog = (login, register) => {
  const loginReg = createDiv(dialogBox, "login-register-dialog");
  loginReg.addEventListener("click", (element) => {
    window.event
      ? (window.event.cancelBubble = true)
      : element.stopPropagation();
  });
  const loginBtn = createBtn(loginReg, "dialog-login", "登陆");
  const registerBtn = createBtn(loginReg, "dialog-register", "注册");
  const loginBox = createDiv(loginReg, "loginReg-box");
  const registerBox = createDiv(loginReg, "loginReg-box");
  loginBtn.addEventListener(
    "click",
    loginRegShow.bind(this, loginBox, registerBox),
    false
  );
  registerBtn.addEventListener(
    "click",
    loginRegShow.bind(this, registerBox, loginBox),
    false
  );
  createLogin(loginBox, login, closeLogin);
  createRegister(registerBox, register, closeLogin);
  loginRegShow(loginBox, registerBox);
  dialogBox.addEventListener("click", closeLogin, false);
  popupLogin();
};
// 销毁
const destoryLogin = () => {
  dialogBox.removeChild(dialogBox.firstElementChild);
};
// 打开弹窗
const popupLogin = () => {
  dialogBox.style.display = "block";
};
// 关闭弹窗
const closeLogin = () => {
  dialogBox.style.display = "none";
  destoryLogin();
};
export { createDialog, destoryLogin, popupLogin, closeLogin };
