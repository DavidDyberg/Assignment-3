let words = [
    "HOODIE",
    "TIGER",
    "BRAINSTORM",
    "CAVA",
    "TORNADO",
    "SKELETON",
    "GOBLIN",
    "SODASTREAM"

]

let maxWrong = 6;
let mistakes = 0;
let answerArray = [];
let wordStatus = [];
let word;


function randomWord() {
  word = words[Math.floor(Math.random() * words.length)];

  wordStatus = [];

  for (i = 0; i < word.length; i++) {
    wordStatus[i] = "_";
  }
}

function generateButtons() {
  let buttonsHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter =>
    `
      <button
        class="button"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  answerArray.indexOf(chosenLetter) === -1 ? answerArray.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (word.indexOf(chosenLetter) >= 0) {
    guessedWord(chosenLetter);
    IfGameWon();
  } else if (word.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    IfGameLost();
    
  }
}

function IfGameWon() {
  if (wordStatus.join('') === word) {
    $("#keyboard").text("You won, good job!");
  }
}

function IfGameLost() {
  if (mistakes === maxWrong) {
    $("#wordArray").text("GAME OVER: The anser was: " + word);
    $("#keyboard").text("You lost, looser!");
  }
}

function guessedWord(chosenLetter) {
   for (let i = 0; i < word.length; i++) {
    if (word[i] === chosenLetter) {
        wordStatus[i] = chosenLetter;
    }
  }
  

  document.getElementById('wordArray').innerHTML = wordStatus.join(' ');
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  answerArray = [];
  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;
$(".start-button").click(generateButtons);
$(".reset-button").click(reset);
randomWord();
guessedWord();

console.log(word);