/*
 * @Description:
 * @Version: 2.0
 * @Autor: duanfy
 * @Date: 2021-08-26 11:47:26
 * @LastEditors: duanfy
 * @LastEditTime: 2021-08-26 11:52:39
 */
const todoLocalStorage = () => {
  return localStorage.hasOwnProperty("todoList")
    ? JSON.parse(localStorage.getItem("todoList"))
    : [];
};
export { todoLocalStorage };
