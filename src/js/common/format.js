/*
 * @Description:
 * @Version: 2.0
 * @Autor: duanfy
 * @Date: 2021-06-23 17:18:33
 * @LastEditors: duanfy
 * @LastEditTime: 2021-09-01 11:28:02
 */
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const curTime =
    year +
    "-" +
    month.toString().padStart(2, "0") +
    "-" +
    day.toString().padStart(2, "0");
  return curTime;
};

export default formatDate;
