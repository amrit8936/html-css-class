const grandParent = document.querySelector("#grandparent");
const parent = document.querySelector("#parent");
const child = document.querySelector("#child");
const body = document.querySelector("#body");

grandParent.addEventListener("click", () => {
  console.log("Grandparent - event capturing");
}, true);

grandParent.addEventListener("click", () => {
  console.log("Grandparent - event bubbling");
});

parent.addEventListener("click", () => {
  console.log("Parent - event capturing");
}, true);

parent.addEventListener("click", () => {
  console.log("Parent - event bubbling");
});

child.addEventListener("click", () => {
  console.log("Child - event capturing");
}, true);

child.addEventListener("click", () => {
  console.log("Child - event bubbling");
});

body.addEventListener("click", () => {
  console.log("Body - event bubbling");
});

