let BOARD_SIZE = 15
let board;



const cellSize = calculateCellSize();

function startGame(){
    console.log("peli aloitettu")

    document.getElementById('intro-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    board = generateRandomBoard();
    console.log(board);
    
    drawBoard(board);
}

function generateRandomBoard() {
    const newBoard = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(' '));

    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            if (y === 0 || y === BOARD_SIZE - 1 || x === 0 || x === BOARD_SIZE - 1) {
                newBoard[y][x] = 'W';
            }
        }
    }

    generateObstacles(newBoard);

    [playerX, playerY] = randomEmptyPosition(newBoard);

    newBoard[playerX][playerY] = "P";

    return newBoard;
}

function drawBoard(board){
    const gameBoard = document.getElementById("game-board");
    gameBoard.style.gridTemplateColumns = `repeat(${BOARD_SIZE}, 1fr)`;


    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell')
            cell.style.height = cellSize + "px"
            cell.style.width = cellSize + "px"
            if (getCell(board, x, y) === 'W') {
                cell.classList.add('wall'); // 'W' on seinä
            }
            else if (getCell(board, x, y) === 'P') {
                cell.classList.add('player'); 
            }
            gameBoard.appendChild(cell);
        }    
    }
}

function getCell(board, x, y) {
    return board[y][x];
}


function calculateCellSize() {
    // Otetaan talteen pienempi luku ikkunan leveydestä ja korkeudesta
    const screenSize = Math.min(window.innerWidth, window.innerHeight);
    // Tehdään pelilaudasta hieman tätä pienempi, jotta jää pienet reunat
    const gameBoardSize = 0.95 * screenSize;
    // Laudan koko jaetaan ruutujen määrällä, jolloin saadaan yhden ruudun koko
    return gameBoardSize / BOARD_SIZE;
}


function generateObstacles(board){
    const obstacles =[
     [[0,0],[0,1],[1,0],[1,1]],//Neliö
     [[0,0],[0,1],[0,2],[0,3]],//I
     [[0,0],[1,0],[2,0],[1,1]]//T
    ];
    const positions =[
        {startX: 2, startY: 2},
        {startX: 8, startY: 2},
        {startX: 4, startY: 8},
        {startX: 10, startY: 10},
        {startX: 10, startY: 5},
        {startX: 5, startY: 10},
    ]
    positions.forEach(pos=>{
        const randomObstacle = obstacles[Math.floor(Math.random() * obstacles.length)];
        placeObstacle(board,randomObstacle,pos.startX,pos.startY);
    })
}
function placeObstacle(board,obstacle,startX, startY){
    for(coordinatePair of obstacle){
        [x,y] = coordinatePair;
        board[startY + y][startX + x] = 'W';
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


function randomEmptyPosition(board) {
  x = randomInt(1, BOARD_SIZE - 2);
  y = randomInt(1, BOARD_SIZE - 2);
  if (board[y][x] === ' ') {
      return [x, y];
  } else {
      return randomEmptyPosition(board);
  }
}