/*
 * @Description:输入校验和账号校验规则
 * @Version: 2.0
 * @Autor: duanfy
 * @Date: 2021-08-26 15:48:59
 * @LastEditors: duanfy
 * @LastEditTime: 2021-09-01 11:44:14
 */
import Toast from "./toast";
import { REG_STR, CHECK_MSG } from "../common/constant";
import { handelError } from "./handelError";
// input为空的判断
const inputValue = (data) => {
  if (data.length == 0 && data.trim() == "") {
    Toast.show("输入事项或时间不能为空");
    return true;
  }
  return false;
};
const inputTrim = (string) => {
  return string.replace(/^\s+|\s+$/g, "");
};
// 账号，密码用户名校验
const checkUser = (idName, reg, toastMsg) => {
  const inputValue = document.querySelector(`#${idName}`).value;
  console.log("inputValue: ", inputValue);
  if (reg.test(inputValue)) {
    return true;
  } else {
    handelError(toastMsg);
    return false;
  }
};
let checkResName = false,
  checkResAccount = false,
  checkResPw = false;
// 检查注册昵称
const checkName = (idName) => {
  const regStr = REG_STR.USERNAME_REG;
  const toastMsg = CHECK_MSG.USERNAME_MSG;
  checkResName = checkUser(idName, regStr, toastMsg);
};
// 检查注册账户
const checkAccount = (idName) => {
  const regStr = REG_STR.ACCOUNT_REG;
  const toastMsg = CHECK_MSG.ACCOUNT_MSG;
  checkResAccount = checkUser(idName, regStr, toastMsg);
};
// 检查注册密码规则
const checkPw = (idName) => {
  const regStr = REG_STR.PW_REG;
  const toastMsg = CHECK_MSG.PW_MSG;
  checkResPw = checkUser(idName, regStr, toastMsg);
};
const getCheckLogin = () => {
  return checkResAccount && checkResPw;
};
const getCheckRes = () => {
  return checkResName && checkResAccount && checkResPw;
};
const html_encode = (string) => {
  return string
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/\'/g, "&#039;")
    .replace(/\//g, "&#x2f")
    .replace(/\n/g, "<br/>");
};
const html_decode = (string) => {
  return string
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x2f/g, "/")
    .replace(/<br\/>/g, "\n");
};
export {
  inputValue,
  inputTrim,
  checkName,
  checkAccount,
  checkPw,
  getCheckLogin,
  getCheckRes,
  html_encode,
  html_decode,
};
