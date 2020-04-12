// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
// AddTodo
function addTodo(e) {
  e.preventDefault();

  // Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // Add todo in local storage
  saveLocalTodos(todoInput.value);

  // Check mark button
  const complitedButton = document.createElement("button");
  complitedButton.innerHTML = '<i class="fas fa-check"></i>';
  complitedButton.classList.add("complete-btn");
  todoDiv.appendChild(complitedButton);

  // Check trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("thrash-btn");
  todoDiv.appendChild(trashButton);

  // Append to list
  if (todoInput.value === "") {
    todoInput.placeholder = "Fill the input";
    todoInput.classList.add("fill");
    setTimeout(() => {
      todoInput.placeholder = "";
      todoInput.classList.remove("fill");
    }, 1500);
  } else {
    todoList.appendChild(todoDiv);
  }

  // Clear input
  todoInput.value = "";
}

// DeleteCheck
function deleteCheck(e) {
  const item = e.target;
  let todo = item.parentElement;
  // Delete todo
  if (item.classList.contains("thrash-btn")) {
    // Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function() {
      todo.remove();
    });
  }

  // Check mark
  if (item.classList.contains("complete-btn")) {
    todo.classList.toggle("completed");
  }
}

// Filter Todo

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// Save Todo to Local storage
function saveLocalTodos(todo) {
  // Check if i already have things in local storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// get Todos
function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo) {
    // Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Check mark button
    const complitedButton = document.createElement("button");
    complitedButton.innerHTML = '<i class="fas fa-check"></i>';
    complitedButton.classList.add("complete-btn");
    todoDiv.appendChild(complitedButton);

    // Check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("thrash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}

// Remove local storage todo
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Fetch Quotes Api
fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    let randomNum = Math.floor(Math.random() * Math.floor(data.length));
    let randomText = data[randomNum].text;

    document.querySelector(".quotes").append(randomText);
  });
