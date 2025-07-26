let turn = true;
let round = 1;
const Sign = ['X','O']
const board = [
    ['-','-','-'],
    ['-','-','-'],
    ['-','-','-'],
]
const btn_0 = document.querySelector('.idx0')
const btn_1 = document.querySelector('.idx1')
const btn_2 = document.querySelector('.idx2')
const btn_3 = document.querySelector('.idx3')
const btn_4 = document.querySelector('.idx4')
const btn_5 = document.querySelector('.idx5')
const btn_6 = document.querySelector('.idx6')
const btn_7 = document.querySelector('.idx7')
const btn_8 = document.querySelector('.idx8')
const playerTurn = document.querySelector('.player-turn')
let player1Score = document.querySelector('.player1Score')
let player2Score = document.querySelector('.player2Score')

function Player(name,sign,score) {
    this.name = name
    this.sign = sign
    this.score = score
}

function resetGame(){
    player1.score = 0
    player2.score = 0
    player1Score = player1.score
    player2Score = player2.score

    for (let i = 0; i < 3 ; i++) {
        for (let j = 0; j < 3; j++){
            board[i][j] = '-'
        }
    }
    for (let i = 0; i < 9; i++) {
        const img = document.querySelector(`.idx${i} img`);
        if (!img) return;
        img.src = './assets/empty.svg';
        const btn = document.querySelector(`.idx${i}`);
        btn.disabled = false;
    }
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
    for (let i = 0; i < 9; i++) {
        const img = document.querySelector(`.idx${i} img`);
        if (!img) return;
        img.src = './assets/empty.svg';
        const btn = document.querySelector(`.idx${i}`);
        btn.disabled = false;
    }
    turn = round % 2 !== 0;
}

function place_sign(x,y){
    document.querySelector(`.idx${x * 3 + y}`).disabled = true;
    if (!checkIndex(x,y)) {
        console.log('index not available')
    } else {
        if (turn) {
            board[x][y] = player1.sign
            updateButtons(x*3+y, player1.sign)
            checkWin(player1)
            playerTurn.innerHTML = player2.sign + ' TURN'
            player1Score.innerHTML = player1.score
            player2Score.innerHTML = player2.score
        } else {
            board[x][y] = player2.sign
            updateButtons(x*3+y, player2.sign)
            checkWin(player2)
            playerTurn.innerHTML = player1.sign + ' TURN'
            player1Score.innerHTML = player1.score
            player2Score.innerHTML = player2.score
        }
        turn = !turn;
    }
}

function setupHoverPreview() {
    for (let i = 0; i < 9; i++) {
        const btn = document.querySelector(`.idx${i}`);
        const img = btn.querySelector("img");

        btn.addEventListener("mouseenter", () => {
            const x = Math.floor(i / 3);
            const y = i % 3;
            if (board[x][y] === '-') {
                img.src = turn ? "./assets/x-preview.svg" : "./assets/o-preview.svg";
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

    img.src = sign === Sign[0] ? './assets/x.svg' : './assets/o.svg';
    img.classList.remove("empty-preview");
    img.classList.add("placed");

    setTimeout(() => {
        img.classList.remove("placed");
    }, 300);
}

document.addEventListener("DOMContentLoaded", () => {
    setupHoverPreview();
});

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector('.startGame-btn');

    btn.addEventListener('click', () => {
        btn.classList.add('clicked');
        setTimeout(() => {
            btn.classList.remove('clicked');
        }, 300);
    });
});

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('touchstart', () => {
        button.classList.remove('clicked');
    });
});