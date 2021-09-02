/*
 * @Author: your name
 * @Date: 2021-07-14 15:32:01
 * @LastEditTime: 2021-09-02 11:22:13
 * @LastEditors: duanfy
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/js/util/cookieUtils.js
 */
//设置cookie的方法

const CookieUtil = {
  //获取
  get: function (name) {
    let cookieName = encodeURIComponent(name) + "=",
      cookieStart = document.cookie.indexOf(cookieName),
      cookieValue = null;

    if (cookieStart > -1) {
      let cookieEnd = document.cookie.indexOf(";", cookieStart);
      if (cookieEnd == -1) {
        cookieEnd = document.cookie.length;
      }
      cookieValue = decodeURIComponent(
        document.cookie.substring(cookieStart + cookieName.length, cookieEnd)
      );
    }

    return cookieValue;
  },
  //设置
  set: function (name, value, expires, path, domain, secure) {
    // name和value是必须，其他参数可以不设
    let cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    if (expires instanceof Date) {
      cookieText += "; expires=" + expires.toGMTString();
    }

    if (path) {
      cookieText += "; path=" + path;
    }

    if (domain) {
      cookieText += "; domain=" + domain;
    }

    if (secure) {
      cookieText += "; secure";
    }

    document.cookie = cookieText;
  },

  // 删除，name必须
  unset: function (name, path, domain, secure) {
    this.set(name, "", new Date(0), path, domain, secure);
  },
};
export default CookieUtil;
