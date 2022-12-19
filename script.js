"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

// Starting Condition
let scores, currenrScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currenrScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

let switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currenrScore = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling dice functionalty
btnRoll.addEventListener("click", (e) => {
  if (playing == true) {
    // 1. genarate a random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2. display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `imgs/dice-${dice}.png`;

    // 3. Cheack for roll 1: if true, switch to next player
    if (dice !== 1) {
      currenrScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currenrScore;
      // current0El.textContent = currenrScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (playing == true) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currenrScore;

    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
    }
    // Switch to the next player
    switchPlayer();
  }
});

btnNew.addEventListener("click", init);
