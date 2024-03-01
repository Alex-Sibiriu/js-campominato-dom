/**************
  ELEMENTS
**************/
const grid = document.getElementById('grid-container');
const btnStart = document.getElementById('btn-start');
const btnRestart = document.getElementById('btn-restart');
const difficultyArray = [49, 81, 100];
const bombArray = [];
const bombNumber = 16;
let score = 0;
let maxSquares;
let win;

grid.append(btnStart);

/**************
  EVENTS
**************/
btnStart.addEventListener('click', startGame);
btnRestart.addEventListener('click', startGame);
console.log(bombArray)

/**************
  FUNCTIONS
**************/
// Funzione di avvio gioco
function startGame() {
  reset();
  
  const difficulty = document.getElementById('difficulty').value;

  setMaxSquares(difficulty);
  createBombs();
  createGrid(maxSquares);

  btnStart.classList.add('d-none');
  btnRestart.classList.remove('disable');
}

// Funzione per impostare il numero di quadrati
function setMaxSquares(difficultyValue) {
  maxSquares = difficultyArray[difficultyValue];
}

// Funzione per creare le bombe
function createBombs() {
  do {
    const bombID = Math.ceil(Math.random() * maxSquares);
    if (!(bombArray.includes(bombID))) {
      bombArray.push(bombID);
    }
  } while (bombArray.length < bombNumber);
}

// Funzione per creare la griglia
function createGrid(maxSquares) {
  grid.className = 'grid' + maxSquares;
  for (let i = 1; i <= maxSquares; i++) {
    const square = createSquare(i);
    grid.append(square);
  }
}

// Funzione per creare i quadrati
function createSquare(indexN) {
  const cell = document.createElement('div');
  cell.className = 'square';

  cell._cellID = indexN;

  cell.addEventListener('click', function() {
    if (!(this.classList.contains('empty'))) {
      score++;
    }
    this.classList.add('empty');
    checkLose(this);
    console.log(score)
    checkWin();
  })

  return cell;
}

// Funzione per controllare se il giocatore ha vinto
function checkWin() {
  if (score === (maxSquares - bombNumber)) {
    win = true;
    printResult(win);
  } 
}

// Funzione per vedere se hai cliccato una bomba
function checkLose(cell) {
  if (bombArray.includes(cell._cellID)) {
    cell.classList.add('bomb');
    win = false;
    score--;
    showBombs()
    printResult(win);
  }
}

// Funzione per mostrare tutte le bombe
function showBombs() {
  const allSquares = document.querySelectorAll('.square')

  for (let i = 0; i < allSquares.length; i++) {
    if (bombArray.includes(allSquares[i]._cellID)) {
      allSquares[i].classList.add('bomb');
      allSquares[i].innerHTML = '<i class="fa-solid fa-bomb"></i>';
    }
  }
}

// Funzione per stampare il risultato
function printResult(win) {
  const message = document.createElement('div');
  message.className = 'game-end';

  if (win) {
  message.classList.add('win');
  message.innerHTML =
  message.innerHTML = 
  `
  Hai Vinto!<br>
  Il tuo punteggio è di:<br>
  ${score}/${maxSquares - bombNumber}
  `;
  } else {
  message.classList.add('lose');
  message.innerHTML = 
  `
  Hai Perso!<br>
  Il tuo punteggio è di:<br>
  ${score}/${maxSquares - bombNumber}
  `;
  }

  grid.append(message);
}

// Funzione di reset della griglia
function reset() {
  grid.innerHTML = '';
  bombArray.splice(0);
  score = 0;
}