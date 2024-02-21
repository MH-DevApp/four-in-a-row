import "./style.css";
import { GameBoardInstance } from "./gameboard/GameBoard.ts";

if (localStorage.getItem("theme") && localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}

const darkMode = document.querySelector("#darkMode");
const lightMode = document.querySelector("#lightMode");

if (darkMode && lightMode) {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    );
  };

  darkMode.addEventListener("click", toggleTheme);
  lightMode.addEventListener("click", toggleTheme);
}

GameBoardInstance.init();
