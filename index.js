const listUL = document.querySelector("#todo-list");
const form = document.querySelector("#todo-item-form");

/* Make a GET request with fetch to http://localhost:3000/todos 
to load all Todos from the server and render them in a list. 
Completed Todos should be grey and scored out. */

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const todo = event.target[0].value;

  event.target.reset();
});

function clearTodosList() {
  listUL.innerHTML = "";
}

fetch("http://localhost:3000/todos")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    for (let i = 0; i < data.length; i++) {
      const todolist = data[i];
      const li = document.createElement("li");
      li.innerText = todolist.title;
      if (todolist.completed) {
        li.setAttribute("class", "completed");
      } else {
        li.setAttribute("class", "todo");
      }
      listUL.append(li);
    }
    return listUL;
  });

/* When the form is submitted, make POST request with fetch to http://localhost:3000/todos to create a new Todo. 
  Update the list of Todos without reloading the page. */

/* const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: title }),
  }; 

    fetch(`http://localhost:3000/todos`, opts)
    .then((res) => res.json())
    .then((data) => {
      // update the page with the new item
      const li = document.createElement("li");
      li.innerText = data.title;
      listUL.append(li);
    }); */
