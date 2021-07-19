/*
 * @Author: your name
 * @Date: 2021-07-13 14:29:08
 * @LastEditTime: 2021-07-15 15:52:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/util/loginDialog.js
 */
// 创建div
const createDiv = (dom, className) => {
  let div = document.createElement("div");
  div.setAttribute("class", className);
  dom.appendChild(div);
  return div;
};
// 创建label
const createLabel = (dom, text) => {
  let label = document.createElement("label");
  label.innerText = text;
  dom.appendChild(label);
};
// 创建input
const createInput = (dom, className, type) => {
  let input = document.createElement("input");
  input.setAttribute("id", className);
  input.setAttribute("type", type);
  input.setAttribute("value", "");
  dom.appendChild(input);
};
// 创建button
const createBtn = (dom, className, text) => {
  let btn = document.createElement("button");
  btn.setAttribute("class", className);
  btn.innerText = text;
  dom.appendChild(btn);
  return btn;
};
// 创建登陆
const createLogin = (dom, login, cancel) => {
  let loginInputAccount = createDiv(dom, "login-input");
  createLabel(loginInputAccount, "账号：");
  createInput(loginInputAccount, "login-account", "text");
  let loginInputPw = createDiv(dom, "login-input");
  createLabel(loginInputPw, "密码：");
  createInput(loginInputPw, "login-password", "password");
  let loginInputBtn = createDiv(dom, "login-input-btn");
  createBtn(loginInputBtn, "login-sure", "确定").addEventListener(
    "click",
    login.bind(
      this,
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
  let registerInputName = createDiv(dom, "register-input");
  createLabel(registerInputName, "用户名：");
  createInput(registerInputName, "register-username", "text");
  let registerInputAccount = createDiv(dom, "register-input");
  createLabel(registerInputAccount, "账号：");
  createInput(registerInputAccount, "register-account", "text");
  let registerInputPw = createDiv(dom, "register-input");
  createLabel(registerInputPw, "密码：");
  createInput(registerInputPw, "register-password", "password");
  let loginInputBtn = createDiv(dom, "register-input-btn");
  createBtn(loginInputBtn, "register-sure", "确定").addEventListener(
    "click",
    register.bind(
      this,
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
let dialogBox = document.querySelector(".dialog-box");
const createDialog = (login, register) => {
  let loginReg = createDiv(dialogBox, "login-register-dialog");
  loginReg.addEventListener("click", (e) => {
    window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
  });
  let loginBtn = createBtn(loginReg, "dialog-login", "登陆");
  let registerBtn = createBtn(loginReg, "dialog-register", "注册");
  let loginBox = createDiv(loginReg, "loginReg-box");
  let registerBox = createDiv(loginReg, "loginReg-box");
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
