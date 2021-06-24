const zeroFill = (i) => {
  if (i >= 0 && i <= 9) {
    return "0" + i;
  } else {
    return i;
  }
};
const formatData = (date) => {
  let year = zeroFill(date.getFullYear());
  let month = zeroFill(date.getMonth() + 1);
  let day = zeroFill(date.getDate());
  let curTime = year + "-" + month + "-" + day;
  return curTime;
};

export default formatData;
