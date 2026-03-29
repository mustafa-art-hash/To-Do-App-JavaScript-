let tasks = JSON.parse(localStorage.getItem("tasks")) || []

function addTask() {
  let input = document.getElementById("taskInput")

  if (input.value === "") return

  let task = {
    text: input.value,
    completed: false
  }

  tasks.push(task)
  saveTasks()
  displayTasks()

  input.value = ""
}

function displayTasks() {
  let list = document.getElementById("taskList")
  list.innerHTML = ""

  tasks.forEach((task, index) => {
    let li = document.createElement("li")

    let checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked = task.completed

    checkbox.onchange = function () {
      task.completed = checkbox.checked
      saveTasks()
      displayTasks()
    }

    let span = document.createElement("span")
    span.textContent = task.text

    if (task.completed) {
      span.style.textDecoration = "line-through"
    }

    let deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Delete"
    deleteBtn.classList.add("delete")

    deleteBtn.onclick = function () {
      tasks.splice(index, 1)
      saveTasks()
      displayTasks()
    }

    li.appendChild(checkbox)
    li.appendChild(span)
    li.appendChild(deleteBtn)

    list.appendChild(li)
  })
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

function toggleDarkMode() {
  document.body.classList.toggle("dark")
}
displayTasks()