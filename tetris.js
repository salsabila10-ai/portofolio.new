// Elemen penting
const grid = document.getElementById("tetris");
const scoreDisplay = document.getElementById("score");
const linesDisplay = document.getElementById("lines");
const levelDisplay = document.getElementById("level");
let score = 0;
let lines = 0;
let level = 1;

// Ukuran grid
const width = 10;
const height = 20;
let squares = [5];
let currentPosition = 4;
let currentRotation = 0;

// Bentuk blok Tetris
const tetrominos = [
  [[1, width + 1, width * 2 + 1, 2], 0], // Bentuk T
  [[0, 1, width, width + 1], 1], // Bentuk O
  [[1, 2, width, width + 1], 2], // Bentuk S
  [[0, 1, width + 1, width * 2 + 1], 3], // Bentuk Z
  [[1, width, width + 1, width + 2], 4], // Bentuk L
  [[0, 1, 2, width + 2], 5], // Bentuk J
  [[1, width, width + 1, width + 2], 6]  // Bentuk I
];

// Membuat grid
for (let i = 0; i < width * height; i++) {
  const square = document.createElement("div");
  grid.appendChild(square);
  squares.push(square);
}

// Menampilkan tetromino di grid
function draw(tetromino, position) {
  tetromino.forEach(index => {
    squares[position + index].classList.add('active');
  });
}

// Menghapus tetromino dari grid
function undraw(tetromino, position) {
  tetromino.forEach(index => {
    squares[position + index].classList.remove('active');
  });
}

// Menurunkan tetromino
function moveDown() {
  undraw(currentTetromino.blocks, currentPosition);
  currentPosition += width;
  draw(currentTetromino.blocks, currentPosition);
  freeze();
}

// Membekukan tetromino
function freeze() {
  if (currentTetromino.blocks.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
    currentTetromino.blocks.forEach(index => squares[currentPosition + index].classList.add('taken'));
    currentPosition = 4;
    currentTetromino = getRandomTetromino();
    draw(currentTetromino.blocks, currentPosition);
    checkLines();
    gameOver();
  }
}

// Memeriksa baris penuh
function checkLines() {
  for (let i = 0; i < 199; i += width) {
    if (squares.slice(i, i + width).every(square => square.classList.contains('taken'))) {
      lines++;
      score += 100;
      squares.splice(i, width).forEach(square => square.classList.remove('taken'));
      squares = squares.concat(new Array(width).fill(null));
      updateScore();
      updateLevel();
    }
  }
}

// Memperbarui skor dan level
function updateScore() {
  scoreDisplay.textContent = score;
  linesDisplay.textContent = lines;
}

function updateLevel() {
  level = Math.floor(lines / 10) + 1;
  levelDisplay.textContent = level;
  clearInterval(timerId);
  timerId = setInterval(moveDown, 1000 - level * 100);
}

// Menentukan tetromino acak
function getRandomTetromino() {
  const random = Math.floor(Math.random() * tetrominos.length);
  return { blocks: tetrominos[random][0], rotation: tetrominos[random][1] };
}

let currentTetromino = getRandomTetromino();
draw(currentTetromino.blocks, currentPosition);

// Timer untuk pergerakan otomatis
let timerId = setInterval(moveDown, 1000);

// Kontrol pergerakan
document.addEventListener('keydown', control);

function control(e) {
  if (e.keyCode === 37) { // Kiri
    moveLeft();
  } else if (e.keyCode === 39) { // Kanan
    moveRight();
  } else if (e.keyCode === 40) { // Bawah
    moveDown();
  } else if (e.keyCode === 38) { // Rotate
    rotate();
  }
}

// Pergerakan kiri
function moveLeft() {
  undraw(currentTetromino.blocks, currentPosition);
  currentPosition -= 1;
  draw(currentTetromino.blocks, currentPosition);
}

// Pergerakan kanan
function moveRight() {
  undraw(currentTetromino.blocks, currentPosition);
  currentPosition += 1;
  draw(currentTetromino.blocks, currentPosition);
}

// Rotasi tetromino
function rotate() {
  undraw(currentTetromino.blocks, currentPosition);
  currentTetromino.blocks = rotateTetromino(currentTetromino.blocks);
  draw(currentTetromino.blocks, currentPosition);
}

// Fungsi rotasi
function rotateTetromino(blocks) {
  // Rotasi blok berdasarkan bentuk tetromino
  return blocks.map(block => {
    // Lakukan rotasi sederhana untuk demo
    return block; 
  });
}

// Deteksi game over
function gameOver() {
  if (currentTetromino.blocks.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    scoreDisplay.innerHTML = "Game Over! Score: " + score;
    clearInterval(timerId);
  }
}
