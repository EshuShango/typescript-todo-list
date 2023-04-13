import {v4 as uuidV4} from "../_snowpack/pkg/uuid.js";
console.log(uuidV4());
const clearTasksButton = document.getElementById("clear-tasks");
const list = document.querySelector("#list");
const form = document.getElementById("new-task-form");
const input = document.querySelector("#new-task-item");
const tasks = loadTasks();
tasks.forEach(addListItem);
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input?.value == "" || input.value == null)
    return;
  const newTask = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  };
  tasks.push(newTask);
  saveTasks();
  tasks.pop(newTask);
  saveTasks();
  addListItem(newTask);
  input.value = "";
});
clearTasksButton?.addEventListener("click", () => {
  clearTasks();
});
function addListItem(task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}
function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}
function loadTasks() {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON == null)
    return [];
  return JSON.parse(taskJSON);
}
function clearTasks() {
  tasks.length = 0;
  localStorage.removeItem("TASKS");
  if (list) {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
  }
}
