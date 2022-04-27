const listUL = document.querySelector("#todo-list");
const form = document.querySelector("#todo-item-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const todo = event.target[0].value;
  console.log(todo);
  event.target.reset();

  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: todo, completed: false }),
  };

  fetch(`http://localhost:3000/todos`, opts)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      /* const li = document.createElement("li");
      li.innerText = data.title;
      listUL.append(li); */
      updateTodoList();
    });
});

function clearTodosList() {
  listUL.innerHTML = "";
}

function updateTodoList() {
  clearTodosList();

  fetch("http://localhost:3000/todos")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      for (let i = 0; i < data.length; i++) {
        const todolist = data[i];
        const li = document.createElement("li");

        //li.addEventListener("click", function)

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
}

updateTodoList();
