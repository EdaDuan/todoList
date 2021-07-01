const emptyBox = (text) => {
  let listDiv = document.createElement("div");
  listDiv.className = "emity-list";
  listDiv.innerHTML = text;
  return listDiv;
};
export default emptyBox;
