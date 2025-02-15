let tasks = [];

function addtask() {
  const taskNameInput = document.getElementById("task_name");
  const dateInput = document.getElementById("date");
  const priorityInput = document.getElementById("priority");
  const tasklist = document.getElementById("tasklist");

  const taskName = taskNameInput.value.trim();
  const date = dateInput.value;
  const priority = priorityInput.value;

  const emptyTaskName = document.getElementById("emptyTaskName");
  const emptyDate = document.getElementById("emptyDate");
  const emptyPriority = document.getElementById("emptyPriority");

  emptyTaskName.textContent = "";
  emptyDate.textContent = "";
  emptyPriority.textContent = "";

  let valid = true;

  if (!taskName) {
    emptyTaskName.textContent = "Task name is required.";
    emptyTaskName.classList.add("text-red-500");
    valid = false;
  }

  if (!date || !isValidDate(date)) {
    emptyDate.textContent = "Enter a valid date (MM/DD/YYYY) and not before today.";
    emptyDate.classList.add("text-red-500");
    valid = false;
  }

  if (priority === "Select Priority") {
    emptyPriority.textContent = "Please select a priority level.";
    emptyPriority.classList.add("text-red-500");
    valid = false;
  }

  if (!valid) return;

  const formattedDate = formatDate(date);
  const task = { taskName, date: formattedDate, priority, completed: false };

  tasks.push(task);
  rendertask();
  taskNameInput.value = "";
  dateInput.value = "";
  priorityInput.value = "Select Priority";
}

function rendertask() {
  const tasklist = document.getElementById("tasklist");
  tasklist.innerHTML = "";

  tasks.forEach((task, index) => {
    const row = document.createElement("tr");
    row.classList.add("border-b");

    row.innerHTML = `
      <td class="px-6 py-4">${task.taskName}</td>
      <td class="px-6 py-4">${task.date}</td>
      <td class="px-6 py-4 ${getPriorityColor(task.priority)}">${task.priority}</td>
      <td class="px-6 py-4 text-center">
        <button onclick="completed(${index})" 
          class="text-white transform transition-all duration-500 ease-in-out px-3 py-1 rounded ${
            task.completed ? 'bg-green-500' : 'bg-orange-500'
          }">
          ${task.completed ? "Completed" : "Pending"}
        </button>
      </td>`;

    tasklist.appendChild(row);
  });
}

function completed(index) {
  tasks[index].completed = !tasks[index].completed;
  rendertask();
}

function getPriorityColor(priority) {
  switch (priority) {
    case "High":
      return "text-red-500 font-bold";
    case "Medium":
      return "text-yellow-500 font-bold";
    case "Low":
      return "text-green-500 font-bold";
    default:
      return "";
  }
}

function isValidDate(dateString) {
  const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  if (!regex.test(dateString)) return false;

  const inputDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return inputDate >= today;
}

function formatDate(dateString) {
  const [month, day, year] = dateString.split("/");
  return `${month.padStart(2, "0")}/${day.padStart(2, "0")}/${year}`;
}
