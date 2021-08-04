//import {annouceWinner} from "./design.js";
// Row 1 elements
let b1 = document.getElementById('b1');
let b2 = document.getElementById('b2');
let b3 = document.getElementById('b3');
// Row 2 elements
let b4 = document.getElementById('b4');
let b5 = document.getElementById('b5');
let b6 = document.getElementById('b6');
//Row 3 elements
let b7 = document.getElementById('b7');
let b8 = document.getElementById('b8');
let b9 = document.getElementById('b9');

let boxList = [b1, b2, b3, b4, b5, b6, b7, b8, b9];
//the reset button
let reset = document.getElementById('button');

//text that will change when a player wins
let text1 = document.getElementById('note1');
let text2 = document.getElementById("note2");


let round = 0; //keeps track of rounds, is incremented each time playerTurn() is called
const player1 = 'X';
const player2 = 'O'
let gameFinished = false; //used to help prevent players inserting more chips once the game is over

const winningConditions = [
  //horizontal cases
  [b1 ,b2, b3],
  [b4, b5, b6],
  [b6, b7, b9],
  //vertical cases
  [b1, b4, b7],
  [b2, b5, b8],
  [b3, b6, b9],
  //diagnol cases
  [b1, b5, b9],
  [b3, b5, b7]
];

const playerTurn = () => {
  let currentPlayer;
  // X plays on even rounds, O plays on odd rounds
  if((round) % 2 == 0) {
    currentPlayer = player1;
  }else {
    currentPlayer = player2;
  }
  round++;
  return currentPlayer;
}

const isClicked = (box) => {
  // is the box is empty and the game is not over, then let the player put in their chip for that box
  if(box.innerHTML == '' && !gameFinished) {
    return false;
  } else {
    return true;
  }
}

const clicker = (box) => {
  if (!isClicked(box)) {
    box.style.backgroundColor = "whitesmoke";
    box.innerHTML = playerTurn();
    box.style.cursor = "default"
  }
}

function isWin(player) {
  let count = 0
  /* The winning algorithm works like this: We iterate through winningConditions and detect if one of those condition
  all have the equal value of the current player and the variable count counts the number of times player has the same value as a winning
  conditions and it only takes 3 so once that condition is met a win is detected*/
  for(let i = 0; i < winningConditions.length; i++) {
    for(let j = 0; j < 3; j++) {

      if(winningConditions[i][j].innerHTML === player) {
        count++;
      }
    }
    if(count == 3) {
      winMakeOver(winningConditions[i][0], winningConditions[i][1], winningConditions[i][2], player);
      return true;
    }
    count = 0;
  }
  return false;
}

function detectWin() {
  let currentPlayer;
  // finds what player we are soppuse to detect a win for prolly should had just created a function to do just that
  if ((round-1) % 2 == 0) {
    currentPlayer = player1;
  }else {
    currentPlayer = player2;
  }
  if(isWin(currentPlayer)) {
    gameFinished = true;
    //annouceWinner(currentPlayer)
  }
}
b1.onclick = function() {
  clicker(b1);
  detectWin();
}
b2.onclick = function() {
  clicker(b2);
  detectWin();
}
b3.onclick = function() {
  clicker(b3);
  detectWin();
}
b4.onclick = function() {
  clicker(b4);
  detectWin();
}
b5.onclick = function() {
  clicker(b5);
  detectWin();
}
b6.onclick = function() {
  clicker(b6);
  detectWin();
}
b7.onclick = function() {
  clicker(b7);
  detectWin();
}
b8.onclick = function() {
  clicker(b8);
  detectWin();
}
b9.onclick = function() {
  clicker(b9);
  detectWin();
}

reset.onclick = function() {
  round = 0;
  gameFinished = false;
  text1.innerHTML = 'The player to start has a chip of X';
  text2.innerHTML = "The second player's chip is O";
  boxList.forEach(box => {
    box.style.backgroundColor = 'white';
    box.innerHTML = '';
    box.style.cursor = "pointer";
  })

}

function winMakeOver(box1, box2, box3, player) {
  box1.style.backgroundColor = 'gold';
  box2.style.backgroundColor = 'gold';
  box3.style.backgroundColor = 'gold';
  let winner;
  if(player == 'X') {
    winner = 'Player 1';
  } else {
    winner = 'Player 2';
  }
  text1.innerHTML = `${winner} Won!!!!!!`
  text2.innerHTML = "";
}