console.log("1");
console.log("2");

setTimeout(() => {
  console.log("3");
}, 1000);

setTimeout(() => {
  console.log("4");
}, 3000);

Promise.resolve().then(() => {
  console.log("8");
});

console.log("5");

setTimeout(() => {
  console.log("6");
}, 2000);

Promise.resolve().then(() => {
  console.log("7");
});

console.log("9");