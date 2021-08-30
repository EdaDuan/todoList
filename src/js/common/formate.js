/*
 * @Description:
 * @Version: 2.0
 * @Autor: duanfy
 * @Date: 2021-06-23 17:18:33
 * @LastEditors: duanfy
 * @LastEditTime: 2021-08-26 15:45:15
 */
const formatDate = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let curTime =
    year +
    "-" +
    month.toString().padStart(2, "0") +
    "-" +
    day.toString().padStart(2, "0");
  return curTime;
};

export default formatDate;
