/*
 * @Author: your name
 * @Date: 2021-07-09 11:44:50
 * @LastEditTime: 2021-07-11 01:38:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/http/index.js
 */
import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:3000";
// 获取todoList的数据
const getData = async () => {
  let resPromise = await new Promise((resolve, reject) => {
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
const insertData = async (newtodo) => {
  let resPromise = await new Promise((resolve, reject) => {
    //请求数据函数
    axios
      .post("/insert", newtodo, {
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
const updateTodayStatus = async (data) => {
  let resPromise = await new Promise((resolve, reject) => {
    //请求数据函数
    axios
      .post("/updateTodayStatus", data, {
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
// 假删除
const moveTodoList = async (data) => {
  let resPromise = await new Promise((resolve, reject) => {
    //请求数据函数
    axios
      .post("/moveTodoList", data, {
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
// 编辑
const editTodoList = async (data) => {
  let resPromise = await new Promise((resolve, reject) => {
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
  let resPromise = await new Promise((resolve, reject) => {
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
  getData,
  insertData,
  updateTodayStatus,
  moveTodoList,
  editTodoList,
  deleteTodoList,
};
