// Select form elements
const form = document.querySelector("form");
const inputNumber = document.getElementById("numbers");
const fromNumber = document.getElementById("from");
const toNumber = document.getElementById("to");
const uniqueNumber = document.querySelector("#no-repeat");

form.onsubmit = (event) => {
  event.preventDefault();

  // Create an object with the numbers details
  const newDraw = {
    quantity: Number(inputNumber.value),
    from: Number(fromNumber.value),
    to: Number(toNumber.value),
  };

  drawNumbers(newDraw.quantity, newDraw.from, newDraw.to);

  console.log(drawNumbers(newDraw.quantity, newDraw.from, newDraw.to));
};

function drawNumbers(quantity, from, to) {
  let randomNubers = [];
  let getRandomNumber = () =>
    Math.floor(Math.random() * (to - from + 1)) + from;

  // If input is checked converts in a array of unique numbers
  if (uniqueNumber.checked) {
    randomNubers = [...new Set(randomNubers)];
  }

  // Add a new random numbers until the array length is equal to the quntity
  while (randomNubers.length < quantity) {
    randomNubers.push(getRandomNumber());
  }

  return randomNubers;
}
