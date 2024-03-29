// masterArray constructor
class Master {
  constructor(title, category, list) {
    this.title = title;
    this.category = category;
    this.list = list;
  }
}

// list constructor
class List {
  constructor(text, checked) {
    this.text = text;
    this.checked = checked;
  }

  toggle() {
    this.checked = !this.checked;
  }
}

// finds current date & adds to screen
function renderDate() {
  const dateText = document.querySelector(".date-text");

  // get the current day & month
  const today = new Date();
  const dayName = today.toLocaleString("en-US", { weekday: "long" });
  const monthName = today.toLocaleString("en-US", { month: "long" });
  const day = today.getDate();

  dateText.textContent = `It's ${dayName}, ${monthName} ${day}`;
}

// picks random index of an array
function pickRandomItem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// array of emoji categories
const emojiArray = ["🏠", "⭐", "🍏", "🏋️", "🎯", "🌎"];

// demo array: can be removed to start with a blank app
const masterArray = [
  new Master("Groceries", emojiArray[2], [
    new List("Bread", false),
    new List("Milk", false),
    new List("Broccoli", false),
    new List("Oats", true),
    new List("Eggs", true),
  ]),

  new Master("Doggo", emojiArray[0], [
    new List("Seven Best Doggo", false),
    new List("Dog", false),
    new List("Smart Doggo", false),
  ]),

  new Master("Workout", emojiArray[3], [
    new List("10 Push Ups", false),
    new List("7 Pull Ups", false),
    new List("12 Bicep Curls", false),
    new List("20 min. Running", false),
  ]),

  new Master("Goals", emojiArray[4], [
    new List("Reach 15 Pull Ups", false),
    new List("Visit Australia", false),
    new List("Live With Discipline", false),
  ]),

  new Master("Dreams", emojiArray[1], [
    new List("Travel The World", false),
    new List("Become a Bartender", false),
    new List("Become a Developer", false),
  ]),
];

const left = document.querySelector(".left");
const sidebar = document.querySelector(".sidebar");
const sidebarForm = document.querySelector(".sidebar-form");
const sidebarInput = document.getElementById("sidebar-input");

const right = document.querySelector(".right");
const list = document.querySelector(".list");
const listForm = document.querySelector(".list-form");
const listInput = document.getElementById("list-input");

let id = 0;

// renders list with specified id
function renderList(id) {
  list.innerHTML = "";
  if (masterArray.length) {
    masterArray[id].list.forEach((item, index) => {
      const task = document.createElement("li");
      const taskContainer = document.createElement("div");
      const taskText = document.createElement("span");
      const taskCheckbox = document.createElement("span");
      const taskRemove = document.createElement("span");

      task.className = "task";
      taskContainer.className = "task-container";
      taskText.className = "task-text";
      taskCheckbox.className = "task-checkbox";
      taskRemove.className = "task-remove";

      taskText.textContent = item.text;
      taskRemove.textContent = "x";

      taskContainer.appendChild(taskCheckbox);
      taskContainer.appendChild(taskText);
      task.appendChild(taskContainer);
      task.appendChild(taskRemove);

      list.appendChild(task);

      // update checkbox & text class to show checked style
      let isChecked = masterArray[id].list[index].checked; // true or false
      taskCheckbox.classList.toggle("checked", isChecked);
      taskText.classList.toggle("strikethrough", isChecked);

      // toggle checkbox
      taskCheckbox.addEventListener("click", () => {
        masterArray[id].list[index].toggle();
        renderList(id);
      });

      // remove task
      taskRemove.addEventListener("click", () => {
        masterArray[id].list.splice(index, 1);
        renderList(id);
      });
    });
  }
}

// renders sidebar
function renderSidebar() {
  sidebar.innerHTML = "";
  masterArray.forEach((item, index) => {
    const title = document.createElement("li");
    const titleContainer = document.createElement("div");
    const titleCategory = document.createElement("span");
    const titleText = document.createElement("span");
    const titleRemove = document.createElement("span");

    title.className = "title";
    titleContainer.className = "title-container";
    titleCategory.className = "title-category";
    titleText.className = "title-text";
    titleRemove.className = "title-remove";

    titleCategory.textContent = item.category;
    titleText.textContent = item.title;
    titleRemove.textContent = "x";

    titleContainer.appendChild(titleCategory);
    titleContainer.appendChild(titleText);
    title.appendChild(titleContainer);
    title.appendChild(titleRemove);

    sidebar.appendChild(title);

    // change category
    titleCategory.addEventListener("click", (event) => {
      // prevent bubbling
      event.stopPropagation();
      title.innerHTML = "";

      const emojiContainer = document.createElement("div");
      emojiContainer.className = "emoji-container";

      title.style.cursor = "auto";

      // add emojis to screen
      emojiArray.forEach((emojiItem) => {
        const emoji = document.createElement("span");
        emoji.className = "emoji";
        emoji.textContent = emojiItem;
        emojiContainer.appendChild(emoji);

        // when an emoji is clicked, update masterArray and render
        emoji.addEventListener("click", () => {
          masterArray[index].category = emojiItem;
          renderSidebar();
        });
      });

      title.appendChild(emojiContainer);
    });

    // make editable
    titleText.addEventListener("click", (event) => {
      // prevent bubbling
      event.stopPropagation();

      // replace titleText for inputElement
      titleText.remove();
      titleRemove.remove();

      const inputElement = document.createElement("input");
      inputElement.id = "sidebar-title-input";
      inputElement.type = "text";
      inputElement.placeholder = "+     Edit name";

      titleContainer.appendChild(inputElement);

      inputElement.addEventListener("blur", () => {
        // if the value is not empty, update with the input
        if (inputElement.value.trim()) {
          masterArray[index].title = inputElement.value;
        }
        renderSidebar();
      });

      inputElement.addEventListener("keyup", (event) => {
        // if the value is not empty, update with the input
        if (inputElement.value.trim()) {
          if (event.key === "Enter") {
            masterArray[index].title = inputElement.value;
            renderSidebar();
          }
        } else {
          renderSidebar();
        }
      });

      inputElement.focus();
    });

    // remove title
    titleRemove.addEventListener("click", (event) => {
      // prevent bubbling
      event.stopPropagation();
      masterArray.splice(index, 1);
      // makes sure the id never goes past the last item, prevents bug
      if (masterArray.length > 0) {
        id = Math.min(id, masterArray.length - 1);
      } else {
        id = 0; // set id to a default value if masterArray has no elements
      }

      renderSidebar();
      renderList(id);
    });

    // click on title
    title.addEventListener("click", () => {
      // render current list
      id = index;
      renderSidebar();
      renderList(id);
    });
  });

  // find the title that's currently selected & add class
  let titles = document.querySelectorAll(".title");
  titles[id]?.classList.add("selected"); // '?' checks that titles[id] exists
}

// program starts here

renderDate();
renderList(id);
renderSidebar();

// type new task
listForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // prevent blank inputs
  if (listInput.value.trim()) {
    if (masterArray.length === 0) {
      // edge case: if there are no lists, and user adds a new item
      masterArray.push(
        new Master("Todo 1", pickRandomItem(emojiArray), [new List(listInput.value, false)])
      );
      id = 0;
      renderSidebar();
    } else {
      masterArray[id].list.push(new List(listInput.value, false));
    }
    renderList(id);
  }
  listInput.value = "";
});

// type new list
sidebarForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // prevent blank inputs
  if (sidebarInput.value.trim()) {
    masterArray.push(new Master(sidebarInput.value, pickRandomItem(emojiArray), []));

    // when a new list is created, display that list by default
    id = masterArray.length - 1;
    renderSidebar();
    renderList(id);
  }
  sidebarInput.value = "";
});
