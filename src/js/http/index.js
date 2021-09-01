/*
 * @Author: your name
 * @Date: 2021-07-09 11:44:50
 * @LastEditTime: 2021-09-01 10:16:09
 * @LastEditors: duanfy
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/http/index.js
 */
import axios from "axios";
import CookieUtil from "../store/cookieUtils";
import { handelError } from "../common/handelError";
// 使用了自定义请求头，每次请求都会有预请求
axios.defaults.headers["Authorization"] = `${CookieUtil.get("ses_token")}`;
axios.defaults.baseURL = "http://127.0.0.1:3000";

const request = (url, params, method) => {
  return axios({
    url: url,
    method: method,
    data: params,
  }).catch(() => {
    handelError("服务器连接失败");
    return [];
  });
};
// 封装GET请求
function get(url, params) {
  return request(url, params, "get");
}
// 封装POST请求
function post(url, params) {
  return request(url, params, "post");
}

export { get, post };
