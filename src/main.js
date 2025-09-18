// ---- Variables ----

let start = false;
let step = 0;
let count = 0;
let interval;
let timeLaps = 2000;

//canvas
const canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

//variables grid
let gridSize = 10; //tamaño del grid
let squareSize = canvas.width / gridSize;
let grid = [];
let newGrid = [];

//patrones
const bread = [[1,0],[2,0],[0,1],[3,1],[1,2],[3,2],[2,3]];
const frog = [[1,0],[2,0],[3,0],[0,1],[1,1],[2,1]];
const plane = [[1,0],[2,1],[0,2],[1,2],[2,2]];
const spaceship = [[0,0],[3,0],[4,1],[0,2],[4,2],[1,3],[2,3],[3,3],[4,3]];
const firework = [[1,0],[1,1],[0,2],[2,2],[1,3],[1,4]];


// ---- Botones web ----

const startB = document.querySelector("#str");
const stopB = document.querySelector("#sto");
const stepB = document.querySelector("#stp");
const algorithmB = document.querySelector("#alg");
const cleanB = document.querySelector("#cle")

//slider
let sliderG = document.querySelector("#myRange");
let output = document.querySelector("#demo");
let output2 = document.querySelector("#demo2");
let sliderT = document.querySelector("#myTime")
let output3 = document.querySelector("#demo3");
let stepCounter = document.querySelector("#step");

//algoritmos
const Alg1 = document.querySelector("#A1");
const Alg2 = document.querySelector("#A2");
const Alg3 = document.querySelector("#A3");
const Alg4 = document.querySelector("#A4");
const Alg5 = document.querySelector("#A5");

// ---- Funciones botones ----

//start
startB.addEventListener("click", (e) => {
  if (start == false) {
    start = true;
    interval = setInterval(() => {
      gameOfLife();
      step++;
      stepCounter.innerHTML = step;
    }, timeLaps);
  };
});

//stop
stopB.addEventListener("click", (e) => {
  if (start == true) {
    start = false;
    clearInterval(interval);
  };
});

//step
stepB.addEventListener("click", (e) => {
  gameOfLife();
  step++;
  stepCounter.innerHTML = step;
});

//clean
cleanB.addEventListener("click", (e) => {
  cleanCanvas();
});

//slider cuadros
sliderG.oninput = function() {
  start = false;
  clearInterval(interval);
  step = 0;
  stepCounter.innerHTML = step;

  output.innerHTML = this.value;
  output2.innerHTML = this.value;
  gridSize = parseInt(this.value);
  squareSize = canvas.width / gridSize;
  createGrid();
  drawGrid();
};

//slider tiempo
sliderT.oninput = function() {
  output3.innerHTML = (this.value*1000);
  timeLaps = parseInt((this.value)*1000);
}

//Hacer click en el canvas
canvas.addEventListener("click", function (event) {
  const mouseX = event.clientX - canvas.getBoundingClientRect().left;
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;

  const i = Math.floor(mouseX / squareSize);
  const j = Math.floor(mouseY / squareSize);

  toggleColor(i, j);
  drawGrid();
});

//algoritmos
Alg1.addEventListener("click", (e) => {
  cleanCanvas();
  for ([di, dj] of bread) {
    i = 3 + di;
    j = 3 + dj;
    grid[i][j] = 1;
  };
  drawGrid();
});

Alg2.addEventListener("click", (e) => {
  cleanCanvas();
  for ([di, dj] of frog) {
    i = 3 + di;
    j = 3 + dj;
    grid[i][j] = 1;
  };
  drawGrid();
});

Alg3.addEventListener("click", (e) => {
  cleanCanvas();
  for ([di, dj] of plane) {
    i = 3 + di;
    j = 3 + dj;
    grid[i][j] = 1;
  };
  drawGrid();
});

Alg4.addEventListener("click", (e) => {
  cleanCanvas();
  for ([di, dj] of spaceship) {
    i = 3 + di;
    j = 3 + dj;
    grid[i][j] = 1;
  };
  drawGrid();
});

Alg5.addEventListener("click", (e) => {
  cleanCanvas();
  for ([di, dj] of firework) {
    i = 3 + di;
    j = 3 + dj;
    grid[i][j] = 1;
  };
  drawGrid();
});

// ---- Funciones ----

//Crear el array de 0s
function createGrid() {
  grid = [];
  for (let i = 0; i < gridSize; i++) {
    grid[i] = [];
    for (let j = 0; j < gridSize; j++) {
      grid[i][j] = 0;
    };
  };
};

//Dibujar el array
function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j] == 1) {
        ctx.fillStyle = "yellowgreen";
      } else {
        ctx.fillStyle = "white";
      };

      ctx.fillRect(i * squareSize, j * squareSize, squareSize, squareSize);
      ctx.strokeStyle = "black";
      ctx.strokeRect(i * squareSize, j * squareSize, squareSize, squareSize);
    };
  };
};

//Cambiar el color de 0 a 1 con un click
function toggleColor(i, j) {
  if (grid[i][j] == 0) {
    grid[i][j] = 1;
  } else {
    grid[i][j] = 0;
  };
};

//Contar los 1 alrededor de la coordenada x,y
function countCells(i, j) {
    let count = 0;
    if (i-1 >= 0) {
        if (grid[i-1][j] == 1) count++;
    }
    if (i-1 >= 0 && j-1 >= 0) {
        if (grid[i-1][j-1] == 1) count++;
    }
    if (i-1 >= 0 && j+1 < gridSize) {
        if (grid[i-1][j+1] == 1) count++;
    }
    if (j-1 >= 0) {
        if (grid[i][j-1] == 1) count++;
    }
    if (j+1 < gridSize) {
        if (grid[i][j+1] == 1) count++;
    }
    if (i+1 < gridSize) {
        if (grid[i+1][j] == 1) count++;
    }
    if (i+1 < gridSize && j-1 >= 0) {
        if (grid[i+1][j-1] == 1) count++;
    }
    if (i+1 < gridSize && j+1 < gridSize) {
        if (grid[i+1][j+1] == 1) count++;
    }
    return count;
};

//Reglas game of life
function gameOfLife() {
  newGrid = [];

  for (let i = 0; i < gridSize; i++) {
  newGrid[i] = []
    for (let j = 0; j < gridSize; j++) {
      count = countCells(i, j);

      if (grid[i][j] == 1) {
        if (count < 2 || count > 3) {
          newGrid[i][j] = 0; // muere por tener menos de 2 o más de 3
        } else {
          newGrid[i][j] = 1; // se mantiene viva si tiene 2 o 3
        }
      } else {
        if (count == 3) {
          newGrid[i][j] = 1; // nace si tiene 3
        } else {
          newGrid[i][j] = 0; // no pasa nada si no tiene 3
        }
      };
    };
  };
  grid = newGrid;
  drawGrid();
};

//Limpiar y reinicar canvas
function cleanCanvas() {
  start = false;
  clearInterval(interval);
  createGrid();
  drawGrid();
  step = 0;
  stepCounter.innerHTML = step;
}

// ---- Iniciar funciones ----

createGrid();
drawGrid();