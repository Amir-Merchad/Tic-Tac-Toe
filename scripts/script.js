let turn = true;
let round = 1;
const Sign = ['X','O']
const board = [
    ['-','-','-'],
    ['-','-','-'],
    ['-','-','-'],
]

function Player(name,sign,score) {
    this.name = name
    this.sign = sign
    this.score = score
}

function printBoard(){
     for (let i = 0; i < 3 ; i++) {
         for (let j = 0; j < 3; j++){
             if (board[i][j] === Sign[0]) {
                 console.log(i,j,Sign[0]);
             } else if (board[i][j] === Sign[1]){
                 console.log(i,j,Sign[1]);
             }
         }
    }
}

const player1 = new Player('Player1', Sign[0], 0)
const player2 = new Player('PLayer2', Sign[1], 0)

function checkIndex(x, y) {
    return board[x][y] === '-';
}

function gameWin(){
    if (player1.score ===  2) {
        console.log(player1.name + 'won the game')
    } else if (player2.score === 2){
        console.log(player2.name + 'won the game')
    }
}

function checkForDraw(){
    let x = true
    for (let i = 0; i < 3 ; i++) {
        for (let j = 0; j < 3; j++){
            if (board[i][j] === '-'){
                x = false
            }
        }
    }
    return x
}

function checkWin(player){
    let hasWon=  (
        (board[0][0] === player.sign && board[1][1] === player.sign && board[2][2] === player.sign) ||
        (board[0][0] === player.sign && board[0][1] === player.sign && board[0][2] === player.sign) ||
        (board[1][0] === player.sign && board[1][1] === player.sign && board[1][2] === player.sign) ||
        (board[2][0] === player.sign && board[2][1] === player.sign && board[2][2] === player.sign) ||
        (board[0][0] === player.sign && board[1][0] === player.sign && board[2][0] === player.sign) ||
        (board[0][1] === player.sign && board[1][1] === player.sign && board[2][1] === player.sign) ||
        (board[0][2] === player.sign && board[1][2] === player.sign && board[2][2] === player.sign) ||
        (board[2][0] === player.sign && board[1][1] === player.sign && board[0][2] === player.sign)
    )

    if (hasWon) {
        player.score++;
        console.log(player.name + ' won this round!');
        console.log('player 1 score: ' + player1.score);
        console.log('player 2 score: ' + player2.score);
        gameOver();
        round++;
        gameWin();
    } else if (checkForDraw()) {
        console.log('Draw!');
        gameOver();
        round++;
    } else {
        console.log('Round: ' + round);
    }
}

function gameOver(){
    console.log('game over!')
    printBoard()
    for (let i = 0; i < 3 ; i++) {
        for (let j = 0; j < 3; j++){
            board[i][j] = '-'
        }
    }
    turn = round % 2 !== 0;
}

function place_sign(x,y){
    if (!checkIndex(x,y)) {
        console.log('index not available')
    } else {
        if (turn) {
            board[x][y] = player1.sign
            checkWin(player1)
        } else {
            board[x][y] = player2.sign
            checkWin(player2)
        }
        turn = !turn;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector('.startGame-btn');

    btn.addEventListener('click', () => {
        // Add 'clicked' class
        btn.classList.add('clicked');

        // Optionally: Remove the class after the animation (if you want to allow repeated clicks)
        setTimeout(() => {
            btn.classList.remove('clicked');
        }, 300);
    });
});