/*
checkerboard
have 2 icons, one is us, another one
we start upper left corner
computer will start in bottom right
we move our icon using arrows
computer will move
when ocmputer catches us, game is over
*/
const BOARD_SIZE = 8;
const boardSquares = [];
let deathSquare;
let score = 0;
let highScore = 0;

const player = {
    icon: '🤠',
    row: 0,
    column: 0,
    startRow: 0,
    startColumn: 0,
    collide: '☠️'
};

const computer = {
    icon: '🐍',
    row: BOARD_SIZE - 1,
    column: BOARD_SIZE - 1,
    startRow: BOARD_SIZE - 1,
    startColumn: BOARD_SIZE - 1
};

document.addEventListener('DOMContentLoaded', () => {
    setUpBoard();
    //handle moves
    document.body.addEventListener('keyup', handleTurn);
    // handle 
    const resetBtn = document.getElementById('reset');
    resetBtn.addEventListener('click', () => {
        score = 0;
        updateScore();
        resetPlayer();
        deathSquare.classList.remove('death-square');
        document.body.addEventListener('keyup', handleTurn);
    });
});

function setUpBoard() {
    // load board size into css variable --grid-size
    const html = document.querySelector('html');
    html.style.setProperty('--grid-size', BOARD_SIZE);
    // need to create the grid items
    const gameboard = document.getElementById('gameboard');
    for (let row = 0; row < BOARD_SIZE; row++) {
        boardSquares[row] = [];
        for (let column = 0; column < BOARD_SIZE; column++) {
            const div = document.createElement('div');
            div.setAttribute('row', row);
            div.setAttribute('column', column);
            if ((row + column) % 2 === 0) {
                div.setAttribute('class', 'black');
            } else {
                div.setAttribute('class', 'other');
            }
            gameboard.appendChild(div);
            boardSquares[row][column] = div;
        }
    }
    resetPlayer()
}

function resetPlayer() {
    move(player, player.startRow, player.startColumn);
    move(computer, computer.startRow, computer.startColumn);
}

function move(character, row, column) {
    if (row >= 0 && column >= 0 && row < BOARD_SIZE && column < BOARD_SIZE) {
        boardSquares[character.row][character.column].innerText = '';
        boardSquares[row][column].innerText = character.icon;
        character.row = row;
        character.column = column;
    }
}

function handleTurn(event) {
    handleKeyUp(event);
    checkForCollision();
    score++;
    updateScore();
    updateScore();
    moveComputer();
    checkForCollision();
}

function handleKeyUp(event) {
    if (event.key === 'ArrowLeft') {
        move(player, player.row, player.column - 1);
    }
    if (event.key === 'ArrowRight') {
        move(player, player.row, player.column + 1);
    }
    if (event.key === 'ArrowUp') {
        move(player, player.row - 1, player.column);
    }
    if (event.key === 'ArrowDown') {
        move(player, player.row + 1, player.column);
    }

}

function checkForCollision() {
    if (player.row === computer.row && player.column === computer.column) {
        boardSquares[player.row][player.column].innerText = player.collide;
        deathSquare = boardSquares[player.row][player.column];
        deathSquare.classList.add('death-square');
        document.body.removeEventListener('keyup', handleTurn);
    }

}

function moveComputer() {
    let row = computer.row;
    let column = computer.column;
    let targetRow = player.row;
    let targetColumn = player.column;
    const randomMove = Math.floor((Math.random() * 20));
    console.log(randomMove)
    if (randomMove === 0) {
        row++;
    } else if (randomMove === 1) {
        row--;
    } else if (randomMove === 2) {
        column++;
    } else if (randomMove === 3) {
        column--;
    } else {
        if (row > targetRow) {
            row--;
        } else if (row < targetRow) {
            row++;
        } else if (column < targetColumn) {
            column++;
        } else if (column > targetColumn) {
            column--;
        }

    }
    move(computer, row, column);
}

function updateScore() {
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.innerText = score;
    if (score > highScore) {
        highScore = score;
        const highScoreDisplay = document.getElementById('highScore');
        highScoreDisplay.innerText = highScore;
    }
}