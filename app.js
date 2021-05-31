"use strict";

const container = document.querySelector(".grid-container");
const fields = document.querySelectorAll(".grid-item");
const reset = document.querySelector("button");
const p1markup = document.querySelector(".p1");
const p2markup = document.querySelector(".p2");
const endBanner = document.querySelector(".banner");

const gameboard = (function () {
  //prettier-ignore
  let gameboard = [null, null, null, null, null, null, null, null, null]

  const checkVictory = player => {
    const vicArr = [];
    gameboard.forEach((symbol, i) => {
      if (symbol === player) {
        vicArr.push(i);
      }
    });
    if (
      (vicArr.includes(0) && vicArr.includes(1) && vicArr.includes(2)) ||
      (vicArr.includes(3) && vicArr.includes(4) && vicArr.includes(5)) ||
      (vicArr.includes(6) && vicArr.includes(7) && vicArr.includes(8)) ||
      (vicArr.includes(0) && vicArr.includes(3) && vicArr.includes(6)) ||
      (vicArr.includes(1) && vicArr.includes(4) && vicArr.includes(7)) ||
      (vicArr.includes(2) && vicArr.includes(5) && vicArr.includes(8)) ||
      (vicArr.includes(0) && vicArr.includes(4) && vicArr.includes(8)) ||
      (vicArr.includes(2) && vicArr.includes(4) && vicArr.includes(6))
    )
      return false;
    else return true;
  };

  const updateGameboard = (player, id) => {
    gameboard[id] = player;
    console.log(gameboard);
  };
  const resetGameboard = () => {
    gameboard = [null, null, null, null, null, null, null, null, null];
  };
  const checkTie = () => {
    if (gameboard.indexOf(null) === -1) return true;
  };
  return { updateGameboard, checkVictory, resetGameboard, checkTie };
})();

const playerFactory = player => {
  this.player = player;
  this.symbol = player === 1 ? "X" : "O";
  this.htmlSymbol =
    player === 1
      ? '<i class="fa fa-times" aria-hidden="true"></i>'
      : '<i class="fa fa-circle-o" aria-hidden="true"></i>';
  return { symbol, htmlSymbol };
};

const p1 = playerFactory(1);
const p2 = playerFactory(2);

const view = (function () {
  const showBanner = (player = false) => {
    endBanner.classList.remove("hidden");
    if (!player) endBanner.textContent = "It's a draw!";
    else
      endBanner.textContent = `${
        player === "X" ? "Player 1" : "Player 2"
      } wins!`;
  };

  return { showBanner };
})();

const controller = (function () {
  let flag = true;
  let activePlayer = p1;

  // field click
  container.addEventListener("click", function (e) {
    if (!e.target.classList.contains("grid-item")) return;
    if (!flag) return;

    const id = e.target.dataset.field;
    e.target.innerHTML = activePlayer.htmlSymbol;
    gameboard.updateGameboard(activePlayer.symbol, id);
    // gameboard.checkVictory(activePlayer.symbol);
    // flag = gameboard.checkVictory(activePlayer.symbol);
    if (!gameboard.checkVictory(activePlayer.symbol)) {
      flag = false;
      view.showBanner(activePlayer.symbol);
    }
    if (!flag) return;
    if (gameboard.checkTie()) {
      flag = false;
      p1markup.classList.add("active");
      p2markup.classList.add("active");
      view.showBanner();
    }
    activePlayer === p1 ? (activePlayer = p2) : (activePlayer = p1);
    p1markup.classList.toggle("active");
    p2markup.classList.toggle("active");
    // console.log(activePlayer);
  });

  // reset game
  reset.addEventListener("click", function () {
    flag = true;
    fields.forEach(field => (field.innerHTML = ""));
    activePlayer = p1;
    gameboard.resetGameboard();
    p1markup.classList.add("active");
    p2markup.classList.remove("active");
    endBanner.innerHTML = "";
    endBanner.classList.add("hidden");
  });
})();

// gameboard.updateGameboard(p1.symbol, 3);
// gameboard.updateGameboard(p2.symbol, 1);
