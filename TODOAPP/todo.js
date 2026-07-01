const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");
const form = document.querySelector("#todo-form");
const todoList = document.querySelector("#todo-list");

if (form && todoList) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (title === "" || description === "") {
      alert("Please fill in both the title and description fields.");
      return;
    }

    const card = document.createElement("article");
    card.className = "todo-card";

    const newTitle = document.createElement("h3");
    newTitle.textContent = title;

    const newDescription = document.createElement("p");
    newDescription.textContent = description;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.style.backgroundColor = "red";
    deleteButton.style.marginTop = "12px";
    deleteButton.addEventListener("click", () => {
      card.remove();
    });

    card.appendChild(newTitle);
    card.appendChild(newDescription);
    card.appendChild(deleteButton);

    todoList.appendChild(card);
    form.reset();
  });
}