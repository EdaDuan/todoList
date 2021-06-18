const model = (msg) => {
  const inputArr = [];
  let diologBox = document.getElementsByClassName("diolog-box")[0];
  diologBox.style.display = "block";
  let diologTip = document.getElementsByClassName("diolog-tip")[0];
  switch (msg) {
    case "tasksNewDialog":
      diologTip.innerText = "新建任务项";
      break;
    default:
      console.log("🚀 ~ file: model.js ~ line 2 ~ model ~ msg", msg);
  }
};
export default model;
