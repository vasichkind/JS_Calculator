const input = document.getElementById("calculator-input");
const buttons = document.querySelectorAll("button");
let currentInput = "";
let previousInput = "";
let operation = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");
    processingInput(value);
  });
});

function processingInput(value) {
  switch (value) {
    case "clear":
      clearInput();
      break;
    case "toggle-sign":
      switchSign();
      break;
    case "percentage":
      percentage();
      break;
    case "/":
    case "*":
    case "-":
    case "+":
      addOperator(value);
      break;
    case "=":
      equally();
      break;
    default:
      addNumber(value);
      break;
  }
};

function clearInput() {
  currentInput = "";
  previousInput = "";
  operation = "";
  input.value = "";
};

function switchSign() {
  if (currentInput !== "") {
    if (currentInput.startsWith("-")) {
      currentInput = currentInput.slice(1);
    } else {
      currentInput = "-" + currentInput;
    }
    input.value = currentInput;
  }
};

function percentage() {
  if (!previousInput || !currentInput) return;
  let result = (previousInput * currentInput) / 100;
  currentInput = result;
  input.value = result;
};

function addOperator(operator) {
  if (currentInput) {
    if (operation) {
      currentInput = calculateResult(previousInput, currentInput, operation);
      input.value = currentInput;
    }
    previousInput = currentInput;
    currentInput = "";
    operation = operator;
  }
};

function calculateResult(a, b, operator) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case "/":
      if (b === 0) {
        return "Ошибка";
      } else {
        return (a / b).toString();
      }
    case "*":
      return (a * b).toString();
    case "-":
      return (a - b).toString();
    case "+":
      return (a + b).toString();
    default:
      return "";
  }
};

function equally() {
  if (operation && currentInput) {
    currentInput = calculateResult(previousInput, currentInput, operation);
    operation = "";
    previousInput = "";
    input.value = currentInput;
  }
};

function addNumber(num) {
  if (num === "." && currentInput.includes(".")) return;
  currentInput += num;
  input.value = currentInput;
};

function deleteLastCharacter() {
  currentInput = currentInput.slice(0, -1);
  input.value = currentInput;
};

function addOperatorHover(operator) {
  document.querySelectorAll(".operator-hover").forEach((button) => {
    button.classList.remove("operator-hover");
  });
  if (operator) {
    const operatorButton = document.querySelector(
      `button[data-value="${operator}"]`
    );
    if (operatorButton) {
      operatorButton.classList.add("operator-hover");
    }
  }
};

function keyboardInput(event) {
  const key = event.key;
  event.preventDefault();
  switch (key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case ".":
      addNumber(key);
      addOperatorHover(null);
      break;
    case "/":
    case "*":
    case "-":
    case "+":
      addOperator(key);
      addOperatorHover(key);
      break;
    case "Enter":
    case "=":
      equally();
      addOperatorHover("=");
      break;
    case "Backspace":
      deleteLastCharacter();
      addOperatorHover(null);
      break;
    case "Escape":
      clearInput();
      addOperatorHover(null);
      break;
    case "%":
      percentage();
      addOperatorHover(null);
      break;
    default:
      break;
  }
};
document.addEventListener("keydown", keyboardInput);