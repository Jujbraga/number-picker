// Select form elements
const form = document.querySelector("form");
const inputNumber = document.getElementById("numbers");
const fromNumber = document.getElementById("from");
const toNumber = document.getElementById("to");
const uniqueNumber = document.querySelector("#no-repeat");
const drawSection = document.querySelector(".numbers-draw");

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

    // Prevents error
    if (newDraw.from > newDraw.to) {
      alert("The initial number cannot be bigger than the final number");
    } else if (newDraw.quantity > newDraw.to) {
      alert(
        "Is not possible to get this quantity of numbers from this range. Please change the parameters!"
      );
    } else {
      drawNumbers(newDraw.quantity, newDraw.from, newDraw.to);
    }
  };
}

setFormEvents();

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

  showResult(randomNubers);
}

// Show the draw result
function showResult(numbers) {
  let results = numbers;

  drawSection.style.textAlign = "center";
  drawSection.style.width = "clamp(20rem, 35vw, 30.125rem)";

  // Create new elements inside div
  drawSection.innerHTML = `<h2>Draw result</h2>
      <p class="overline">1º result</p>
      <ul class="numbers-list">
      </ul></div>`;

  // Select the list (ul) created
  const numbersList = document.querySelector(".numbers-list");

  let delay = 3000;
  let index = 0;

  // Create a li inside the ul with each number
  for (let result of results) {
    //Delay the creation of each item
    setTimeout(function () {
      let numbersItem = document.createElement("li");
      numbersItem.textContent = result;
      numbersList.appendChild(numbersItem);
    }, delay * index);
    index++;
  }

  // Create button AFTER all numbers appear
  setTimeout(function () {
    const buttonDrawAgain = document.createElement("button");
    const resultSection = document.querySelector(".result");
    buttonDrawAgain.innerHTML = `<span>Draw Again</span><img src="assets/play.svg" />`;
    resultSection.appendChild(buttonDrawAgain);
    buttonDrawAgain.onclick = restoreForm;
  }, delay * results.length);
}

function restoreForm() {
  console.log("click");
}
