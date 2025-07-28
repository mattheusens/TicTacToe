let choosingStyle = document.getElementById("choosing-style");
let buttonAI = document.getElementById("ai");
let buttonMultiplayer = document.getElementById("multiplayer");

let playfield = document.getElementById("playfield");
let boxes = document.getElementsByClassName("playfield-box");
let playerInfo = document.getElementById("player-info");

let endOverlay = document.getElementById("end-overlay");
let buttonAgain = document.getElementById("play-again");
let buttonMenu = document.getElementById("main-menu");

let sortGame = "";
let fieldArray = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1],
];
let filledFields = 0;
let player1Turn = true;
let playerWin = -1;

buttonAI.addEventListener("click", () => {
  sortGame = "ai";
  startGame();
});

buttonMultiplayer.addEventListener("click", () => {
  sortGame = "multiplayer";
  startGame();
});

buttonAgain.addEventListener("click", () => {
  resetGame();
  endOverlay.classList.add("hidden");
});

buttonMenu.addEventListener("click", () => {
  resetGame();
  playfield.classList.add("hidden");
  endOverlay.classList.add("hidden");
  choosingStyle.classList.remove("hidden");
  playerInfo.classList.add("hidden");
});

function startGame() {
  choosingStyle.classList.add("hidden");
  playfield.classList.remove("hidden");
  playerInfo.classList.remove("hidden");
  if (sortGame == "ai")
    document.getElementById("text-change").innerHTML = " AI ";
}

function resetGame() {
  for (let i = 0; i < 9; i++) {
    boxes[i].innerHTML = "";
    if (boxes[i].classList.contains("blue")) boxes[i].classList.remove("blue");
    if (boxes[i].classList.contains("red")) boxes[i].classList.remove("red");
  }

  fieldArray = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
  ];
  filledFields = 0;
  player1Turn = true;
  playerWin = -1;
}

for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", () => {
    if (endOverlay.classList.contains("hidden")) {
      if (fieldArray[Math.floor(i / 3)][i % 3] != -1) {
      } else {
        turn(i);
      }
    }
  });
}

function turn(boxNumber) {
  player1Turn = !player1Turn;

  fillBox(boxNumber);
  filledFields++;

  checkWin();

  if (sortGame == "ai" && filledFields < 9) {
    player1Turn = !player1Turn;
    turnAI();
    filledFields++;
    checkWin();
  }

  if (playerWin != -1 || filledFields == 9) endGame();
}

function turnAI() {
  let searchBox = true;

  while (searchBox) {
    boxNumber = Math.floor(Math.random() * 9);
    if (boxNumber == 9) boxNumber = 8;

    if (fieldArray[Math.floor(boxNumber / 3)][boxNumber % 3] == -1) {
      searchBox = false;
    }
  }

  fillBox(boxNumber);
}

function fillBox(boxNumber) {
  valueField = Number(player1Turn);
  box = boxes[boxNumber];

  fieldArray[Math.floor(boxNumber / 3)][boxNumber % 3] = valueField;
  switch (valueField) {
    case 0:
      box.innerHTML = "X";
      box.classList.add("blue");
      break;
    case 1:
      box.innerHTML = "O";
      box.classList.add("red");
      break;
    default:
      break;
  }
}

function checkWin() {
  for (let i = 0; i < 2; i++) {
    winArray = [i, i, i];
    for (let j = 0; j < 3; j++) {
      if (equalArrays(fieldArray[j], winArray)) playerWin = i;
    }
    vertical1 = [fieldArray[0][0], fieldArray[1][0], fieldArray[2][0]];
    vertical2 = [fieldArray[0][1], fieldArray[1][1], fieldArray[2][1]];
    vertical3 = [fieldArray[0][2], fieldArray[1][2], fieldArray[2][2]];
    cross1 = [fieldArray[0][0], fieldArray[1][1], fieldArray[2][2]];
    cross2 = [fieldArray[0][2], fieldArray[1][1], fieldArray[2][0]];
    if (
      equalArrays(vertical1, winArray) ||
      equalArrays(vertical2, winArray) ||
      equalArrays(vertical3, winArray) ||
      equalArrays(cross1, winArray) ||
      equalArrays(cross2, winArray)
    )
      playerWin = i;
  }
}

function equalArrays(a1, a2) {
  if (a1[0] == a2[0] && a1[1] == a2[1] && a1[2] == a2[2]) return true;
  return false;
}

function endGame() {
  endOverlay.classList.remove("hidden");
  winnerText = document.getElementById("winner-text");
  switch (playerWin) {
    case 0:
      winnerText.innerHTML = "Player 1";
      break;
    case 1:
      if (sortGame == "ai") winnerText.innerHTML = "AI";
      else winnerText.innerHTML = "Player 2";
      break;
    case -1:
      winnerText.innerHTML = "Nobody";
      break;
    default:
      break;
  }
}
