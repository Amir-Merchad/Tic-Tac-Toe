let turn = true;
let round = 1;
const Sign = ['X','O'];
let selectedSign = 'X'; // Default first player sign
const board = [
    ['-','-','-'],
    ['-','-','-'],
    ['-','-','-'],
];

const playerTurn = document.querySelector('.player-turn');
let player1Score = document.querySelector('.player1Score');
let player2Score = document.querySelector('.player2Score');

// Dialog elements
const startDialog = document.getElementById('startDialog');
const gameOverDialog = document.getElementById('gameOverDialog');
const startGameBtn = document.getElementById('startGameBtn');
const restartGameBtn = document.getElementById('restartGameBtn');

function Player(name, sign, score) {
    this.name = name;
    this.sign = sign;
    this.score = score;
}

// Initialize players with default signs
let player1 = new Player('Player 1', Sign[0], 0);
let player2 = new Player('Player 2', Sign[1], 0);

function resetGame(){
    player1.score = 0;
    player2.score = 0;
    updateScoreDisplay();

    // Reset board
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++){
            board[i][j] = '-';
        }
    }

    // Reset UI
    for (let i = 0; i < 9; i++) {
        const img = document.querySelector(`.idx${i} img`);
        if (!img) continue;
        img.src = './assets/empty.svg';
        const btn = document.querySelector(`.idx${i}`);
        btn.disabled = false;
    }

    // Reset turn
    turn = true;
    round = 1;
    updateTurnDisplay();
}

function updateScoreDisplay() {
    player1Score.innerHTML = player1.score;
    player2Score.innerHTML = player2.score;
}

function updateTurnDisplay() {
    const currentPlayer = turn ? player1 : player2;
    playerTurn.innerHTML = currentPlayer.sign + ' TURN';
}

function printBoard(){
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++){
            if (board[i][j] === Sign[0]) {
                console.log(i, j, Sign[0]);
            } else if (board[i][j] === Sign[1]){
                console.log(i, j, Sign[1]);
            }
        }
    }
}

function checkIndex(x, y) {
    return board[x][y] === '-';
}

function checkForGameWin(){
    if (player1.score === 3) {
        showGameOverDialog(player1.name + ' won the game!');
        return true;
    } else if (player2.score === 3){
        showGameOverDialog(player2.name + ' won the game!');
        return true;
    }
    return false;
}

function checkForDraw(){
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++){
            if (board[i][j] === '-'){
                return false;
            }
        }
    }
    return true;
}

function checkWin(player){
    let hasWon = (
        (board[0][0] === player.sign && board[1][1] === player.sign && board[2][2] === player.sign) ||
        (board[0][0] === player.sign && board[0][1] === player.sign && board[0][2] === player.sign) ||
        (board[1][0] === player.sign && board[1][1] === player.sign && board[1][2] === player.sign) ||
        (board[2][0] === player.sign && board[2][1] === player.sign && board[2][2] === player.sign) ||
        (board[0][0] === player.sign && board[1][0] === player.sign && board[2][0] === player.sign) ||
        (board[0][1] === player.sign && board[1][1] === player.sign && board[2][1] === player.sign) ||
        (board[0][2] === player.sign && board[1][2] === player.sign && board[2][2] === player.sign) ||
        (board[2][0] === player.sign && board[1][1] === player.sign && board[0][2] === player.sign)
    );

    if (hasWon) {
        player.score++;
        console.log(player.name + ' won this round!');
        console.log('Player 1 score: ' + player1.score);
        console.log('Player 2 score: ' + player2.score);
        updateScoreDisplay();

        // Check if someone won the game (best of 3)
        if (!checkForGameWin()) {
            setTimeout(() => {
                gameOver();
                round++;
            }, 1000);
        }
    } else if (checkForDraw()) {
        console.log('Draw!');
        setTimeout(() => {
            gameOver();
            round++;
        }, 1000);
    }
}

function gameOver(){
    console.log('Round over!');
    printBoard();

    // Reset board for next round
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++){
            board[i][j] = '-';
        }
    }

    // Reset UI
    for (let i = 0; i < 9; i++) {
        const img = document.querySelector(`.idx${i} img`);
        if (!img) continue;
        img.src = './assets/empty.svg';
        const btn = document.querySelector(`.idx${i}`);
        btn.disabled = false;
    }

    // Set turn based on round
    turn = round % 2 !== 0;
    updateTurnDisplay();
}

function place_sign(x, y){
    const buttonIndex = x * 3 + y;
    document.querySelector(`.idx${buttonIndex}`).disabled = true;

    if (!checkIndex(x, y)) {
        console.log('Index not available');
        return;
    }

    const currentPlayer = turn ? player1 : player2;
    board[x][y] = currentPlayer.sign;
    updateButtons(buttonIndex, currentPlayer.sign);
    checkWin(currentPlayer);

    // Switch turn
    turn = !turn;
    updateTurnDisplay();
}

function setupHoverPreview() {
    for (let i = 0; i < 9; i++) {
        const btn = document.querySelector(`.idx${i}`);
        const img = btn.querySelector("img");

        btn.addEventListener("mouseenter", () => {
            const x = Math.floor(i / 3);
            const y = i % 3;
            if (board[x][y] === '-') {
                const currentPlayer = turn ? player1 : player2;
                img.src = currentPlayer.sign === 'X' ? "./assets/x-preview.svg" : "./assets/o-preview.svg";
                img.classList.add("empty-preview");
            }
        });

        btn.addEventListener("mouseleave", () => {
            const x = Math.floor(i / 3);
            const y = i % 3;
            if (board[x][y] === '-') {
                img.src = "./assets/empty.svg";
                img.classList.remove("empty-preview");
            }
        });
    }
}

function updateButtons(idx, sign) {
    const img = document.querySelector(`.idx${idx} img`);
    if (!img) return;

    img.src = sign === 'X' ? './assets/x.svg' : './assets/o.svg';
    img.classList.remove("empty-preview");
    img.classList.add("placed");

    setTimeout(() => {
        img.classList.remove("placed");
    }, 300);
}

function showGameOverDialog(message) {
    const winnerText = document.getElementById('winnerText');
    winnerText.textContent = message;
    gameOverDialog.showModal();
}

// Dialog event listeners
startGameBtn.addEventListener('click', () => {
    startGameBtn.classList.add('clicked');

    // Get selected sign
    const selectedRadio = document.querySelector('input[name="select-sign"]:checked');
    selectedSign = selectedRadio.value;

    // Update player signs based on selection
    if (selectedSign === 'X') {
        player1.sign = 'X';
        player2.sign = 'O';
    } else {
        player1.sign = 'O';
        player2.sign = 'X';
    }

    // Update score display labels
    document.querySelector('.xscore h3').textContent = player1.sign === 'X' ? 'PLAYER X' : 'PLAYER O';
    document.querySelector('.oscore h3').textContent = player2.sign === 'X' ? 'PLAYER X' : 'PLAYER O';

    setTimeout(() => {
        startGameBtn.classList.remove('clicked');
        startDialog.close();
        resetGame();
    }, 300);
});

restartGameBtn.addEventListener('click', () => {
    restartGameBtn.classList.add('clicked');

    setTimeout(() => {
        restartGameBtn.classList.remove('clicked');
        gameOverDialog.close();
        startDialog.showModal();
    }, 300);
});

// Initialize the game
document.addEventListener("DOMContentLoaded", () => {
    setupHoverPreview();

    // Show start dialog on load
    startDialog.showModal();

    // Button click animation
    document.querySelectorAll('.startGame-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.add('clicked');
            setTimeout(() => {
                btn.classList.remove('clicked');
            }, 300);
        });
    });

    // Touch device support
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('touchstart', () => {
            button.classList.remove('clicked');
        });
    });
});