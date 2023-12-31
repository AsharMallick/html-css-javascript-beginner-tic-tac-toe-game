let textBoxes = document.querySelectorAll(".text");
let heading = document.querySelector(".heading");
let score_0 = document.querySelector(".score_0");
let score_x = document.querySelector(".score_x");
let resetScore = document.querySelector(".resetScores");
let scores = {};

const winningAudio = new Audio("winning-music.mp3");
let turn = "X";


function changeTurnRandomly(){
    let randInt = Math.round(Math.random());
    if(randInt===0){
        turn = "X";
    }else {
        turn = "0";
    }
    
}
changeTurnRandomly()
addEventListener("load", () => {
  heading.innerHTML = `${turn == "X" ? "X" : "0"}'s turn`;
});

//JavaScript function hoisting
displayScores();

function animateColor() {
  let i = 184;
  let k = 0;
  let m = 50;
  setInterval(() => {
    m += Math.ceil(Math.random() * 250);
    i += Math.ceil(Math.random() * 50);
    k += Math.ceil(Math.random() * 50);
    if (i >= 255) {
      i = Math.ceil(Math.random() * 250);
    }
    if (k >= 20) {
      k = Math.ceil(Math.random() * 250);
    }
    if (m >= 200) {
      m = 200 || Math.ceil(Math.random() * 250);
    }
    document.body.style.backgroundColor = `rgb(${m}, ${i}, ${k})`;
  }, 2000);
}

animateColor();

function resetGame() {
  Array.from(textBoxes).forEach((item) => {
    item.innerText = "";
  });
  heading.innerHTML = `${turn == "X" ? "X" : "0"}'s turn`;
}

function clearOnDraw() {
  let draw = true;
  Array.from(textBoxes).forEach((item) => {
    if (item.innerText == "") {
      draw = false;
    }
  });
  return draw;
}

function win(turn) {
  turn = turn == "X" ? "0" : "X";
  let someoneWon = false;
  let wins = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [2, 4, 6],
    [2, 5, 8],
    [1, 4, 7],
    [3, 4, 5],
    [6, 7, 8],
  ];
  wins.forEach((item) => {
    let e = Array.from(textBoxes);
    if (
      !(
        e[item[0]].innerText == turn &&
        e[item[1]].innerText == turn &&
        e[item[2]].innerText == turn &&
        e[item[0]].innerText != ""
      )
    ) {
    } else {
      let localData;
      if (localStorage.getItem("scores")) {
        localData = JSON.parse(localStorage.getItem("scores"));
      } else {
        localData = { X: 1, zero: 0 };
      }
      console.log({ someoneWon });
      someoneWon = true;
      (async () => await winningAudio.play())();
      setTimeout(() => {
        alert(`${turn} won`);
        resetGame();
      }, 250);
      heading.innerHTML = `${turn == "X" ? "X" : "0"}'s turn`;

      console.log({ localData });
      if (turn == "X") {
        localData["X"] += 1;
        localStorage.setItem("scores", JSON.stringify(localData));
        score_x.innerText = localData["X"];
      } else {
        localData["zero"] += 1;
        localStorage.setItem("scores", JSON.stringify(localData));
        score_0.innerText = localData["zero"];
      }
    }
  });
  return someoneWon;
}

Array.from(textBoxes).forEach((item) => {
  item.addEventListener("click", () => {
    if (item.innerHTML == "") {
      item.innerText = turn;
      turn = turn == "X" ? "0" : "X";
    }

    let someoneWon = win(turn);
    let draw = clearOnDraw();
    console.log({ draw, someoneWon });
    if (draw && !someoneWon) {
      setTimeout(() => {
        alert("Game drawn");
      }, 200);
      resetGame();
    }
    heading.innerHTML = `${turn == "X" ? "X" : "0"}'s turn`;
  });
});

reset.addEventListener("click", () => {
  let sure = confirm("Are you sure to want to reset the game?");
  if (sure) {
    resetGame();
  }
});

function displayScores() {
  let localData;
  if (localStorage.getItem("scores")) {
    localData = JSON.parse(localStorage.getItem("scores"));
  } else {
    localData = { X: 0, zero: 0 };
  }
  console.log({ localData });
  localStorage.setItem("scores", JSON.stringify(localData));
  console.log({ afterstoring: localData });
  score_x.innerText = localData["X"];
  score_0.innerText = localData["zero"];
}

resetScore.addEventListener("click", () => {
  let sure = confirm("Are you sure to want to reset scores?");
  if (sure) {
    localStorage.clear();
    score_x.innerText = 0;
    score_0.innerText = 0;
  }
});

heading.innerHTML = `${turn == "X" ? "X" : "0"}'s turn`;
