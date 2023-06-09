import { v4 as uuidV4 } from "uuid";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

console.log(uuidV4());

const clearTasksButton = document.getElementById(
  "clear-tasks",
) as HTMLButtonElement | null;

const list = document.querySelector<HTMLUListElement>("#list");
// const form = document.querySelector<HTMLFormElement>('#new-task-form');
const form = document.getElementById("new-task-form") as HTMLFormElement | null;

const input = document.querySelector<HTMLInputElement>("#new-task-item");

const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input?.value == "" || input.value == null) return;
  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
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
function addListItem(task: Task) {
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

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}

function clearTasks(): void {
  tasks.length = 0; // Empty the tasks array
  localStorage.removeItem("TASKS"); // Remove tasks from local storage

  // Remove all child elements from the list
  if (list) {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
  }
}

//^ the ? is optional chaining
