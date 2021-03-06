//functuon when a new item is to be added
const addItems = (thisElement) => {
  let inputElem = thisElement.querySelector("input");

  if (inputElem.value.trim() != "") {
    newListItem = document.getElementById("sampleListItem").cloneNode(true);
    newListItem.removeAttribute("id");
    newListItem.querySelector("text").innerText = inputElem.value;
    newListItem.setAttribute("text", inputElem.value);
    ulElement = thisElement.parentNode.children[0].appendChild(newListItem);
    inputElem.value = "";
  }
};

const deleteLiFunc = (thisElement) => {
  console.log();
  const selectedLi = thisElement.closest(".list-group-item");
  const mainUl = thisElement.closest(".list-group");
  mainUl.removeChild(selectedLi);
};

const saveFunc = () => {
  class li {
    constructor(text, link, time, type) {
      this.text = text;
      this.link = link;
      this.time = time;
      this.type = type;
    }
  }

  const mainLists = document.querySelectorAll(".list-group");
  // console.log(mainLists)
  mainLists.forEach((ul) => {
    let arr = [];
    items = ul.querySelectorAll("li");

    items.forEach((item) => {
      if (item) {
        tempItem = new li(
          item.getAttribute("text"),
          item.getAttribute("link"),
          item.getAttribute("time"),
          item.getAttribute("type")
        );
        arr.push(tempItem);
      }
    });

    localStorage.setItem(ul.getAttribute("id"), JSON.stringify(arr));
  });
  let list = document.querySelectorAll(".list-group-item");
  list.forEach((item) => {
    type = item.getAttribute("type");
    timeElement = item.querySelector(".time-element");
    if (type == "Exam") {
      timeElement.style.backgroundColor = "#DC3545";
    }
    if (type == "Viva") {
      console.log("viva");
      timeElement.style.backgroundColor = "#6C757D";
    }
    if (type == "Quiz") {
      console.log("quiz");
      timeElement.style.backgroundColor = "#17A2B8";
    }
    if (type == "Regular") {
      timeElement.style.backgroundColor = "#0C6DFC";
    }
  });
};

const targetNode = document.body;
const saveConfig = {
  childList: true,
  attributes: true,
  subtree: true,
  characterData: true,
};

const observer = new MutationObserver(saveFunc);
observer.observe(targetNode, saveConfig);

//function that runs when the link button is pressed
const enterLink = (thisElement) => {
  editSwitch = document.getElementById("editSwitch");
  const mainLi = thisElement.closest(".list-group-item");
  const linkI = thisElement.querySelector(".link-element-bi");
  const iClass = linkI.classList;
  if (editSwitch.checked) {
    let link = prompt(
      "enter the link to class , once the link has been set , it can only be changed by going to editing mode, after setting the link , presing it will take you you to the link inless editing mode is on "
    );
    //thisElement.innerText = "visit"

    if (!link.trim().length) {
      alert("invalid link try again");
      return;
    } else if (isUrl(link) && !link.length) {
      thisElement.setAttribute("link", "https://" + link);
      mainLi.setAttribute("link", "https://" + link);
      iClass.remove("bi-link-45deg");
      iClass.add("bi-link");
    } else {
      thisElement.setAttribute("link", "https://" + link);
      mainLi.setAttribute("link", "https://" + link);
      iClass.remove("bi-link-45deg");
      iClass.add("bi-link");
    }
  } else if (!editSwitch.checked && !thisElement.hasAttribute("link")) {
    alert(
      "please click the edit button and input a link for class , all types of edit can only be done when editing mode is on then turn it off after editing"
    );
  } else {
    window.open(thisElement.getAttribute("link"), "_blank");
  }
};

const isUrl = (string) => {
  try {
    return Boolean(new URL(string));
  } catch (e) {
    return false;
  }
};

const tutFunc = () => {
  alert(
    "to add a class to the list of the day , just type in the input box and press the + button then go to editing mode and add the time and link for class , for deleting just check the checkbox beside the class list item , deleting can only be done in editing mode"
  );
};

const modalFunc = (initiatorBtn) => {
  const modalInput = document.getElementById("modalInput");
  const mainLi = initiatorBtn.parentNode.parentNode;
  document.getElementById("modalSaveBtn").click = null;
  if (modalInput.value.length > 0) {
    mainLi.setAttribute("time", modalInput.value.trim());
    initiatorBtn.children[0].innerText = " " + modalInput.value.trim();
  }
};

const examType = (initiatorBtn) => {
  const selectElement = document.getElementById("classTypeSelect");
  const type = selectElement.value;
  const mainLi = initiatorBtn.parentNode.parentNode;
  mainLi.setAttribute("type", type);
};
const enterTime = (thisElement) => {
  document
    .getElementById("modalSaveBtn")
    .addEventListener("click", () => modalFunc(thisElement), { once: true });
  document
    .getElementById("classTypeSelect")
    .addEventListener("change", () => examType(thisElement));
  document.getElementById("modalInput").flatpickr({
    enableTime: true,
    noCalendar: true,
    dateFormat: "h:i:K",
  });
};

const editFunc = (thisElement) => {
  let timeAnchors = document.querySelectorAll(".time-element");
  let deleteAnchors = document.querySelectorAll(".deleteAnchor");
  let liHandle = document.querySelectorAll(".bi-list");
  //for the time button editing
  if (thisElement.checked) {
    let counter = 0;
    sortable = [];
    document.querySelectorAll(".list-group").forEach((ul) => {
      sortable[counter] = new Sortable(ul, {
        animation: 300,
        handle: ".bi-list",
      });
      counter++;
    });
    liHandle.forEach((element) => (element.style.display = "initial"));
    timeAnchors.forEach((element) => (element.style.pointerEvents = "auto"));
    deleteAnchors.forEach((element) => (element.style.visibility = "initial"));
  } else {
    let counter = 0;
    document.querySelectorAll(".list-group").forEach((ul) => {
      sortable[counter].destroy();
      counter++;
    });
    liHandle.forEach((element) => (element.style.display = "none"));
    timeAnchors.forEach((element) => (element.style.pointerEvents = "none"));
    deleteAnchors.forEach((element) => (element.style.visibility = "hidden"));
  }
};
