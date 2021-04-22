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
    if (!item) return;
    item.forEach((li) => {
      newListItem = document.getElementById("sampleListItem").cloneNode(true);
      newListItem.removeAttribute("id");
      newListItem.querySelector("text").innerText = li.text;
      newListItem.setAttribute("text", li.text);
      newListItem.setAttribute("link", li.link);
      newListItem.setAttribute("time", li.time);
      newListItem.setAttribute("type", li.type);
      newListItem.querySelector(".time-element-bi").innerText = li.time;
      newListItem.querySelector(".link-element").setAttribute("link", li.link);
      document.getElementById(day).appendChild(newListItem);
    });
  }
});

let linkSpans = document.querySelectorAll(".link-element-bi");
linkSpans.forEach((elem) => {
  if (elem.parentElement.getAttribute("link")) {
    elem.classList.add("bi-link");
    elem.classList.remove("bi-link-45deg");
  }
});


