document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".buttons button");
  const historyList = document.getElementById("history");
  const clearHistoryBtn = document.querySelector(".clear-history");

  let displayValue = "0";
  let currentExpression = ""; // To store current expression being built
  let history = [];

  // Update display function
  function updateDisplay() {
    display.value = displayValue;
  }

  // Clear display function
  function clearDisplay() {
    displayValue = "0";
    updateDisplay();
  }

  // Clear history function
  function clearHistory() {
    history = [];
    renderHistory();
  }

  // Render history function
  function renderHistory() {
    historyList.innerHTML = "";
    history.forEach((entry) => {
      const historyItem = document.createElement("li");
      historyItem.textContent = entry;
      historyList.appendChild(historyItem);
    });
  }

  // Add event listeners to all buttons
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const { value } = button;

      if (value === "all-clear") {
        clearDisplay();
      } else if (value === "clear-history") {
        clearHistory();
      } else if (value === "=") {
        handleEqualSign();
      } else {
        addToDisplay(value);
      }

      updateDisplay();
    });
  });

  // Function to add value to display and currentExpression
  function addToDisplay(value) {
    if (value === "+" || value === "-" || value === "*" || value === "/") {
      currentExpression += ` ${value} `;
    } else {
      currentExpression += value;
    }
    displayValue = currentExpression;
  }

  // Function to handle equal sign input
  function handleEqualSign() {
    const result = eval(currentExpression); // Evaluate current expression
    const historyEntry = `${currentExpression} = ${result}`;

    history.push(historyEntry);
    currentExpression = ""; // Reset current expression
    renderHistory();

    // Display result underneath
    displayValue = result;
  }

  // Initial render of history
  renderHistory();
});
