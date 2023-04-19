// builds task objects
class Task {
  constructor(title, completed) {
    this.title = title;
    this.completed = completed;
  }

  toggle() {
    this.completed = !this.completed;
  }
}

// takes the form input and builds the allTasks array of arrays
function buildTaskList() {
  const textInput = document.querySelector("#text-input");
  const newObject = new Task(textInput.value, false);
  //allTasks.push([]);
  allTaskList[id].push(newObject);
}

// takes an array of tasks and renders it on screen
// also updates the list according to toggle & close actions
function renderTaskList(taskList) {
  taskContainer.innerHTML = "";
  taskList.forEach((task, index) => {
    // create list element with content & append to container
    const taskItem = document.createElement("li");
    const taskCheckbox = document.createElement("div");
    const taskTitle = document.createElement("div");
    const taskClose = document.createElement("div");
    taskCheckbox.className = "checkbox";
    taskTitle.className = "title";
    taskClose.className = "close";
    taskTitle.textContent = task.title;
    taskClose.textContent = "x";
    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskTitle);
    taskItem.appendChild(taskClose);
    taskContainer.appendChild(taskItem);

    // if task is completed add checked
    if (task.completed) {
      taskCheckbox.classList.add("checked");
    }

    // if checkbox is clicked, toggle item and render again
    taskCheckbox.addEventListener("click", () => {
      task.toggle();
      renderTaskList(taskList);
    });

    // if x is clicked, remove item and render again
    taskClose.addEventListener("click", () => {
      taskList.splice(index, 1);
      renderTaskList(taskList);
    });
  });

  console.log(taskList);
}

// program starts here

let form = document.querySelector("form");
const taskContainer = document.querySelector("ul");

let allTaskList = [[], [], [], [], []];
let id = 0;

const btn0 = document.getElementById("0");
const btn1 = document.getElementById("1");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  buildTaskList();
  renderTaskList(allTaskList[id]);
});

btn0.addEventListener("click", () => {
  id = 0;
  renderTaskList(allTaskList[id]);
});

btn1.addEventListener("click", () => {
  id = 1;
  renderTaskList(allTaskList[id]);
});
