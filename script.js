const button = document.querySelectorAll(".btn");
const txt = document.querySelector(".text-area");

const mode = document.querySelectorAll(".mode");

const container = document.querySelector(".container");

const selectBtn = document.querySelectorAll(".btn-dark");

let previousvalue = "";
let currantMode = "light";

function Calculator() {
  button.forEach((btn) => {
    btn.addEventListener("click", () => handleInput(btn.textContent));
  });

  document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (
      (key >= "0" && key <= "9") ||
      ["+", "-", "*", "/"].includes(key)
    ) {
      handleInput(key);
    } else if (key === "Enter") {
      handleInput("=");
    } else if (key === "Backspace") {
      handleInput("D");
    } else if (key.toLowerCase() === "c") {
      handleInput("AC");
    }
  });
}

function handleInput(value) {
  if (value === "AC") {
    txt.textContent = "";
    previousvalue = "";
  } else if (value === "D") {
    previousvalue = previousvalue.slice(0, -1);
    txt.textContent = previousvalue;
  } else if (value === "=") {
    try {
      let expression = previousvalue.replace(/x/g, "*");
      let result = eval(expression);
      txt.textContent = result;
      previousvalue = result.toString();
    } catch (error) {
      txt.textContent = "Error";
      previousvalue = "";
    }
  } else {
    previousvalue += value;
    txt.textContent = previousvalue;
  }
}

mode.forEach((mod) => {
  mod.addEventListener("click", () => {
    if (currantMode === "light") {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      currantMode = "dark";
      document.querySelector(".light-mode").style.display = "none";
      document.querySelector(".dark-mode").style.display = "block";
      document.querySelector(".calculator-name").style.color = "black";
      container.classList.add("bg-light");
      container.classList.remove("bg-dark");
      selectBtn.forEach((bgBtn) => {
        bgBtn.classList.remove("btn-dark");
        bgBtn.classList.add("btn-light");
      });
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      currantMode = "light";
      document.querySelector(".dark-mode").style.display = "none";
      document.querySelector(".light-mode").style.display = "block";
      document.querySelector(".calculator-name").style.color = "white";
      container.classList.add("bg-dark");
      container.classList.remove("bg-light");
      selectBtn.forEach((bgBtn) => {
        bgBtn.classList.add("btn-dark");
        bgBtn.classList.remove("btn-light");
      });
    }
  });
});

Calculator();
