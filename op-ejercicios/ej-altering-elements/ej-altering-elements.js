const container = document.querySelector("#container")
//----------------------------------------
//1)
const pText = document.createElement("p");
pText.textContent = "Hey Im red!"
pText.style.color = "red";
container.appendChild(pText)

//2)
const h3Text = document.createElement("h3");
h3Text.textContent = "Im a blue h3";
h3Text.style.color = "blue";
container.appendChild(h3Text);

//3)
const otherDiv = document.createElement("div");
otherDiv.style.borderColor = "black";
otherDiv.style.backgroundColor = "pink";
container.appendChild(otherDiv);

const otherH1 = document.createElement("h1");
otherH1.textContent = "Im in a div";
otherDiv.appendChild(otherH1);

const otherP = document.createElement("p");
otherP.textContent = "Me too";
otherDiv.appendChild(otherP);

//------------------------------------------
// buttons is a node list. It looks and acts much like an array.
const buttons = document.querySelectorAll("button");

// we use the .forEach method to iterate through each button
buttons.forEach((button) => {
  // and for each one we add a 'click' listener
  button.addEventListener("click", () => {
    alert(button.id);
  });
});