const listUL = document.querySelector(".todo-list");
const form = document.querySelector(".todo-form");

// Make a GET request with fetch to http://localhost:3000/todos to load all Todos from the server and render them in a list. Completed Todos should be grey and scored out.

function getAndRenderTodoList() {
  fetch("http://localhost:3000/todos")
    .then((res) => res.json())
    .then((data) => {
      renderTodoList(data);
    });
}

function renderTodoList(todos) {
  // clear the html
  listUL.innerHTML = "";
  // loop through the todo items
  todos.forEach((todo) => {
    // create the todo list item element
    const li = document.createElement("li");
    li.innerText = todo.title;
    if (todo.completed) {
      li.setAttribute("class", "completed");
    }
    // append to the listUL
    listUL.append(li);
  });
}

// When the form is submitted, make POST request with fetch to http://localhost:3000/todos to create a new Todo. Update the list of Todos without reloading the page.
form.addEventListener("submit", (event) => {
  // prevent page reload
  event.preventDefault();
  // get value from input field
  const title = event.target[0].value;
  // make a POST request with data
  const obj = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: title, completed: false }),
  };
  fetch(`http://localhost:3000/todos`, obj)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      getAndRenderTodoList();
    });
});

getAndRenderTodoList();
