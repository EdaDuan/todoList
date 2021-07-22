/*
 * @Author: your name
 * @Date: 2021-07-09 11:44:50
 * @LastEditTime: 2021-07-22 11:22:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/http/index.js
 */
import axios from "axios";
import CookieUtil from "../js/util/cookieUtils";
axios.defaults.headers["Authorization"] = `${CookieUtil.get("ses_token")}`;
axios.defaults.baseURL = "http://127.0.0.1:3000";
// 登陆
const userLogin = async (data) => {
  const resPromise = await new Promise((resolve, reject) => {
    //请求数据函数
    axios
      .post("/userLogin", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
      .then((res) => {
        // 数据请求成功
        return resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return resPromise;
};

// 注册
const userRegister = async (data) => {
  const resPromise = await new Promise((resolve, reject) => {
    //请求数据函数
    axios
      .post("/userRegister", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
      .then((res) => {
        // 数据请求成功
        return resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return resPromise;
};
// 获取todoList的数据
const getTodoList = async () => {
  const resPromise = await new Promise((resolve, reject) => {
    axios
      .get("/getTodoList")
      .then((res) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
  return resPromise;
};
// 新增待办项
const insertTodoList = async (newtodo) => {
  const resPromise = await new Promise((resolve, reject) => {
    //请求数据函数
    axios
      .post("/insertTodoList", newtodo, {
        headers: {
          // "Content-Type": "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
      .then((res) => {
        // 数据请求成功
        return resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return resPromise;
};
// 修改status
const updateTodoStatus = async (data) => {
  const resPromise = await new Promise((resolve, reject) => {
    axios
      .post("/updateTodoStatus", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
      .then((res) => {
        return resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return resPromise;
};
// 假删除
const moveTodoList = async (data) => {
  const resPromise = await new Promise((resolve, reject) => {
    //请求数据函数
    axios
      .post("/moveTodoList", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
      .then((res) => {
        // 数据请求成功
        return resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return resPromise;
};
// 编辑
const editTodoList = async (data) => {
  const resPromise = await new Promise((resolve, reject) => {
    axios
      .post("/editTodoList", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
      .then((res) => {
        return resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return resPromise;
};
// 彻底删除
const deleteTodoList = async (data) => {
  const resPromise = await new Promise((resolve, reject) => {
    axios
      .post("/deleteTodoList", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
      .then((res) => {
        return resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return resPromise;
};
export {
  userLogin,
  userRegister,
  getTodoList,
  insertTodoList,
  updateTodoStatus,
  moveTodoList,
  editTodoList,
  deleteTodoList,
};
