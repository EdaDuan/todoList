/*
 * @Description:输入校验和账号校验规则
 * @Version: 2.0
 * @Autor: duanfy
 * @Date: 2021-08-26 15:48:59
 * @LastEditors: duanfy
 * @LastEditTime: 2021-08-29 20:41:37
 */
import Toast from "./toast";
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
  let inputValue = document.querySelector(`#${idName}`).value;
  console.log("inputValue: ", inputValue);
  if (reg.test(inputValue)) {
    return true;
  } else {
    Toast.error(toastMsg);
    return false;
  }
};
let checkResName = false,
  checkResAccount = false,
  checkResPw = false;
// 检查注册昵称
const checkName = (idName) => {
  let regStr = /[\u4e00-\u9fa5|\w]{2,}/;
  let toastMsg = "请输入至少包含两个字符的用户名";
  checkResName = checkUser(idName, regStr, toastMsg);
};
// 检查注册账户
const checkAccount = (idName) => {
  console.log("检查注册账户");
  let regStr = /^1[3456789]\d{9}$/;
  let toastMsg = "请输入正确的手机号";
  checkResAccount = checkUser(idName, regStr, toastMsg);
};
// 检查注册密码规则
const checkPw = (idName) => {
  let regStr = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;
  let toastMsg = "请输入包含字母,数字的6～16密码";
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
