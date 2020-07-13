import cat from "./cat.jpg";

const catEle = document.createElement("img");
catEle.src = cat;

document.querySelector("#root").appendChild(catEle);
