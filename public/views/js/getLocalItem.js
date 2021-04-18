const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

days.forEach((day) => {
  if (localStorage.hasOwnProperty(day)) {
      item = JSON.parse(localStorage.getItem(day));
      if (!item) return
    item.forEach((li) => {
      newListItem = document.getElementById("sampleListItem").cloneNode(true);
      newListItem.removeAttribute("id");
      newListItem.children[0].innerText = li.text;
      newListItem.setAttribute("text", li.text);
      newListItem.setAttribute("link", li.link);
      newListItem.setAttribute("time", li.time);
      newListItem.setAttribute("type", li.type);
      newListItem.querySelector(".time-element-bi").innerText = li.time;
      newListItem.querySelector(".time-element").classList.add("exam");
      newListItem.querySelector(".link-element").setAttribute("link", li.link);
      document.getElementById(day).appendChild(newListItem);
    });
  }
});
