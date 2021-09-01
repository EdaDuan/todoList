/*
 * @Description:
 * @Version: 2.0
 * @Autor: duanfy
 * @Date: 2021-08-25 13:52:27
 * @LastEditors: duanfy
 * @LastEditTime: 2021-08-31 11:32:58
 */
import Toast from "./toast";
// const handelError = async (request) => {
//   try {
//     let res = await request;
//     if (!res.data.ok) {
//       Toast.error(res.data.error);
//     }
//     return res.data;
//   } catch (e) {
//     Toast.error("服务器连接失败");
//     return [];
//   }
// };
const handelError = (err) => {
  console.log("err: ", err);
  Toast.error(err);
};
export { handelError };
