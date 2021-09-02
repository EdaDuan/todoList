/*
 * @Description:
 * @Version: 2.0
 * @Autor: duanfy
 * @Date: 2021-08-25 13:52:27
 * @LastEditors: duanfy
 * @LastEditTime: 2021-09-02 14:38:17
 */
import Toast from "./toast";
const handelError = (err) => {
  Toast.error(err);
};
export { handelError };
