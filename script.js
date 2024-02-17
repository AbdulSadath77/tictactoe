const leaderBoard = document.getElementById("leaderBoard");
const xWonPoints = document.getElementById("xWonPoints");
const oWonPoints = document.getElementById("oWonPoints");
const restart = document.getElementById("restart");
const reset = document.getElementById("reset");
const btns = document.querySelectorAll(".container > button");
const mrcd = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function setLocalStorage(x = 0, o = 0) {
  localStorage.setItem("tictactoe", JSON.stringify({ x: x, o: o }));
}

function getLocalStorage() {
  if (localStorage.tictactoe) {
    return JSON.parse(localStorage.getItem("tictactoe"));
  }
}

xWonPoints.textContent += getLocalStorage()?.x || 0;
oWonPoints.textContent += getLocalStorage()?.o || 0;

let count = 0;
btns.forEach((btn, btni) => {
  btn.addEventListener("click", () => {
    if (btn.innerHTML === "") {
      btn.innerHTML = count % 2 == 0 ? "X" : "O";
      for (let i = 0; i < mrcd.length; i++) {
        for (let j = 0; j < mrcd[i].length; j++) {
          if (btni === mrcd[i][j]) {
            if (
              count % 2 === 0 &&
              btns[mrcd[i][0]].innerHTML === "X" &&
              btns[mrcd[i][1]].innerHTML === "X" &&
              btns[mrcd[i][2]].innerHTML === "X"
            ) {
              leaderBoard.textContent = " X-Won";
              btns.forEach((bttn) => (bttn.disabled = true));
              setLocalStorage(
                getLocalStorage()?.x + 1 || 1,
                getLocalStorage()?.o || 0
              );
            } else if (
              count % 2 === 1 &&
              btns[mrcd[i][0]].innerHTML === "O" &&
              btns[mrcd[i][1]].innerHTML === "O" &&
              btns[mrcd[i][2]].innerHTML === "O"
            ) {
              leaderBoard.textContent = " O-Won";
              btns.forEach((bttn) => (bttn.disabled = true));
              setLocalStorage(
                getLocalStorage()?.x || 0,
                getLocalStorage()?.o + 1 || 1
              );
            } else if (count === 8) {
              leaderBoard.textContent = "Draw-Match";
            }
          }
        }
      }
      count++;
    }
  });
});

restart.addEventListener("click", () => {
  location.reload();
});

reset.addEventListener("click", () => {
  setLocalStorage(0, 0);
  location.reload();
});
