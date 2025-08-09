console.log("Start loading JS");

const grid = document.getElementById("grid");

const myTempH1 = document.createElement("h1");
grid.appendChild(myTempH1);

console.log("created myTempH1");

myTempH1.textContent = "Bye bye!";

console.log("Finish loading JS");
