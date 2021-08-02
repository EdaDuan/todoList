/*
 * @Author: your name
 * @Date: 2021-07-30 10:43:28
 * @LastEditTime: 2021-07-30 11:26:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /todoList/src/http/api.js
 */
import { get, post } from "./index";
// 登陆
const userLogin = (data) => {
  return post("/userLogin", data);
};
// 注册
const userRegister = (data) => {
  return post("/userRegister", data);
};
// 获取todoList的数据
const getTodoList = () => {
  return get("/getTodoList");
};
// 新增待办项;
const insertTodoList = (newtodo) => {
  return post("/insertTodoList", newtodo);
};
// 修改status
const updateTodoStatus = (data) => {
  return post("/updateTodoStatus", data);
};
// 假删除
const moveTodoList = (data) => {
  return post("/moveTodoList", data);
};
// 编辑
const editTodoList = (data) => {
  return post("/editTodoList", data);
};
// 彻底删除
const deleteTodoList = (data) => {
  return post("/deleteTodoList", data);
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
