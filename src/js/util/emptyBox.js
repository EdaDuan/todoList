const emptyBox = (text) => {
  let listDiv = document.createElement("div");
  listDiv.className = "nullList";
  listDiv.innerHTML = text;
  return listDiv;
};
export default emptyBox;
