let BOARD_SIZE = 15
let board;

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

    return newBoard;
}

function drawBoard(board){
    const gameBoard = document.getElementById("game-board");
    gameBoard.style.gridTemplateColumns = `repeat(${BOARD_SIZE}, 1fr)`;




for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        if (getCell(board, x, y) === 'W') {
            cell.classList.add('wall'); // 'W' on seinä
        }
        gameBoard.appendChild(cell);
    }
    
}
}

function getCell(board, x, y) {
    return board[y][x];
}