// Select form elements
const form = document.querySelector("form");
const inputNumber = document.getElementById("numbers");
const fromNumber = document.getElementById("from");
const toNumber = document.getElementById("to");
const uniqueNumber = document.querySelector("#no-repeat");

function setFormEvents() {
  // Format input to accept just numbers
  form.addEventListener("input", (event) => {
    if (event.target.matches('form input[type="text"]')) {
      let value = event.target.value.replace(/\D/g, "");
      event.target.value = value;
    }
  });

  // Set the input value to 1 if it is empty
  form.addEventListener("focusout", (event) => {
    if (event.target.matches('form input[type="text"]')) {
      if (event.target.value === "" || event.target.value === "0") {
        event.target.value = "1";
      }
    }
  });

  // Onsubmit prevent reload and create an object with the numbers details
  form.onsubmit = (event) => {
    event.preventDefault();

    const newDraw = {
      quantity: Number(inputNumber.value),
      from: Number(fromNumber.value),
      to: Number(toNumber.value),
    };

    drawNumbers(newDraw.quantity, newDraw.from, newDraw.to);
  };
}

setFormEvents();

function onlyPositiveNumber() {}

function drawNumbers(quantity, from, to) {
  let randomNubers = [];
  let getRandomNumber = () =>
    Math.floor(Math.random() * (to - from + 1)) + from;

  // If input is checked converts in a array of unique numbers
  if (uniqueNumber.checked) {
    randomNubers = [...new Set(randomNubers)];
  }

  // Add a new random numbers until the array length is equal to the quantity
  while (randomNubers.length < quantity) {
    randomNubers.push(getRandomNumber());
  }

  return randomNubers;
}

// Show the draw result
