class Calculator {
  constructor(operationTextElement, resultTextElement) {
    this.operationTextElement = operationTextElement;
    this.resultTextElement = resultTextElement;
    this.clear();
  }
  clear() {
    this.operationText = "";
    this.resultText = "";
    this.operation = undefined;
  }
  delete() {
    this.resultText = this.resultText.slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.resultText.includes(".")) return;
    this.resultText += number;
  }
  chooseOperation(operation) {
    if (this.resultText === "") return;
    if (this.operationText !== "") {
      this.compute();
    }
    this.operation = operation;
    this.operationText = this.resultText + " " + operation;
    this.resultText = "";
  }
  compute() {
    let computation;
    const oper = parseFloat(this.operationText);
    const res = parseFloat(this.resultText);
    if (isNaN(oper) || isNaN(res)) return;
    switch (this.operation) {
      case "+":
        computation = oper + res;
        break;
      case "*":
        computation = oper * res;
        break;
      case "-":
        computation = oper - res;
        break;
      case "/":
        computation = oper / res;
        break;
      default:
        return;
    }
    this.resultText = computation;
    this.operation = undefined;
    this.operationText = "";
  }
  updateDisplay() {
    this.resultTextElement.innerText = this.resultText;
    this.operationTextElement.innerText = this.operationText;
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const operationTextElement = document.querySelector("[data-operation]");
const resultTextElement = document.querySelector("[data-result]");
const calculator = new Calculator(operationTextElement, resultTextElement);
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});
allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
