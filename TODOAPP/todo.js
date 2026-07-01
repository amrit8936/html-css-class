const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");
const form = document.querySelector("#todo-form");
const todoList = document.querySelector("#todo-list");

form.addEventListener("select", (event) => {
  event.preventDefault();
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();

  if(title === "" || description === "") {
    alert("Please fill in both the title and description fields.");
    return;
  }
  const li = document.createElement("li");

  const newtitle = document.createElement("h3");
  newtitle.textContent = title;

  const newdescription = document.createElement("p");
  newdescription.textContent = description;
const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.style.backgroundColor = "red";

  

  li.appendChild(newtitle);
  li.appendChild(newdescription);
  li.appendChild(deleteButton);

    todoList.appendChild(li);