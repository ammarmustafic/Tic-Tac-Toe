let startGameBtn = document.querySelector(".btn");
startGameBtn.addEventListener("click", start);
let cells = document.querySelectorAll(".cell");
let resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", resetGame);
resetBtn.style.display = "none";

let currentPlayer = false;
let moveX = true;
let gameOver = false;

function KoJeNaRedu() {
  if (moveX) {
    moveX = false;
    return "X";
  } else {
    moveX = true;
    return "O";
  }
}

function start() {
  resetGame();
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function () {
      if (!gameOver) {
        if (!cells[i].innerText) {
          cells[i].innerText = KoJeNaRedu();
          checkForWinner();
        }
      }
    });
  }
}

function checkForWinner() {
  const winningComb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let comb of winningComb) {
    const [a, b, c] = comb;
    if (
      cells[a].innerText &&
      cells[a].innerText == cells[b].innerText &&
      cells[c].innerText == cells[b].innerText
    ) {
      gameOver = true;
      const gameOverMessage = document.querySelector(".game-over-message");
      gameOverMessage.innerText = `${cells[a].innerText} wins!`;
      resetBtn.style.display = "block";
      startGameBtn.style.display = "none";
      gameOverMessage.classList.add("fadeIn");
      setTimeout(() => {
        gameOverMessage.classList.add("fadeOut");
      }, 1500);
      setTimeout(() => {
        gameOverMessage.classList.remove("fadeIn", "fadeOut");
      }, 2000);
      return;
    }
  }

  let tie = true;
  for (let i = 0; i < cells.length; i++) {
    if (!cells[i].innerText) {
      tie = false;
      break;
    }
  }

  if (tie) {
    gameOver = true;
    let gameOverMessage = document.querySelector(".game-over-message");
    gameOverMessage.innerText = `Tie Game!`;
    resetBtn.style.display = "block";
    startGameBtn.style.display = "none";
    gameOverMessage.classList.add("fadeIn");
    setTimeout(() => {
      gameOverMessage.classList.add("fadeOut");
    }, 1500);
    setTimeout(() => {
      gameOverMessage.classList.remove("fadeIn", "fadeOut");
    }, 2000);
    return;
  }
}
function displayWinner(winner) {
  setTimeout(function () {
    alert(winner + " wins!");
  }, 1000);
}

function resetGame() {
  startGameBtn.remove();
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
  }
  gameOver = false;
  currentPlayer = false;
  moveX = true;
  resetBtn.style.display = "none";
  startGameBtn.style.display = "block";
  document.querySelector(".game-over-message").innerText = "";
}
