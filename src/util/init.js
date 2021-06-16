import tasks from "../mock/tasks";
console.log("🚀 ~ file: init.js ~ line 2 ~ tasks", tasks)
window.οnlοad=function()
{
  alert("加载完成....");
  for (let i in tasks) {
  console.log("🚀 ~ file: init.js ~ line 6 ~ i", i)
  }
}
