'use strict';

let gameBoard = [
    null, null, null,
    null, null, null,
    null, null, null
];

let boardHTML = document.querySelector('.board');

let newGameBtn = document.querySelector('.new-game-btn')
newGameBtn.addEventListener('click', newGame)

function newGame() {
    resetBoard()
    render()
}

function resetBoard() {
    gameBoard = [
        null, null, null,
        null, null, null,
        null, null, null
    ];
}

function emptyBoard() {
    while (boardHTML.firstChild) {
        boardHTML.firstChild.remove()
    }
}

function createX(square) {
    let x = document.createElement('span')
    x.classList.add('x')
    x.textContent = 'x'
    square.appendChild(x)
}

function createO(square) {
    let o = document.createElement('span')
    o.classList.add('o')
    o.textContent = 'o'
    square.appendChild(o)
}

function createSquare() {
    let square = document.createElement('div');
    square.classList.add('square');
    
    return square;
}

function switchPlayer() {
    currentTurn === 1 ? currentTurn = 2 : currentTurn = 1;
}

function markSquare(square, i) {
    if (square.textContent) return;

    if (currentTurn === 1) {
        gameBoard[i] = 'x';
    } else if (currentTurn === 2) {
        gameBoard[i] = 'o';
    }
}

function checkTie() {
    if (!(gameBoard.includes(null))) return 'tie'
}

// function wins(winner) {
//     console.log(`${winner} WINS`)
// }

function markSquareTie(square) {
    square.classList.add('tie-square')
}

function markSquaresWin(square1, square2, square3) {
    square1.classList.add('win-square')
    square2.classList.add('win-square')
    square3.classList.add('win-square')
}

function declareTie() {
    let squares = document.querySelectorAll(".square");
    squares.forEach(square => markSquareTie(square));
    squares.forEach(square => console.log(square));
}

function declareWinner(status) {
    let squares = document.querySelectorAll(".square")
    markSquaresWin(squares[status[1]], squares[status[2]], squares[status[3]])

}

function checkStatus() {

    if (checkTie()) return 'tie';

    /*
        # # #
        # # #
        # # #
    */
    if (gameBoard[0]) {
    /*
        X X X
        # # #
        # # #
    */
        if (gameBoard[0] === gameBoard[1] && gameBoard[0] === gameBoard[2]) return [gameBoard[0],0,1,2]
    /*
        X # #
        X # #
        X # #
    */
        if (gameBoard[0] === gameBoard[3] && gameBoard[0] === gameBoard[6]) return [gameBoard[0],0,3,6]
    /*
        X # #
        # X #
        # # X
    */
        if (gameBoard[0] === gameBoard[4] && gameBoard[0] === gameBoard[8]) return [gameBoard[0],0,4,8]
    }

    if (gameBoard[1]) {
    /*
        # X #
        # X #
        # X #
    */
        if (gameBoard[1] === gameBoard[4] && gameBoard[1] === gameBoard[7]) return [gameBoard[1],1,4,7]

    if(gameBoard[2]) {
    /*
        # # X
        # # X
        # # X
    */
        if (gameBoard[2] === gameBoard[5] && gameBoard[2] === gameBoard[8]) return [gameBoard[2],2,5,8]

    /*
        # # X
        # X #
        X # #
    */   
        if (gameBoard[2] === gameBoard[4] && gameBoard[2] === gameBoard[6]) return [gameBoard[2],2,4,6]
    }
    

    if(gameBoard[3]) {
    /*
        # # #
        X X X
        # # #
    */   
        if (gameBoard[3] === gameBoard[4] && gameBoard[3] === gameBoard[5]) return [gameBoard[3],3,4,5]
    }

    if(gameBoard[6]) {
    /*
        # # #
        # # #
        X X X
    */   
        if (gameBoard[6] === gameBoard[7] && gameBoard[6] === gameBoard[8]) return [gameBoard[6],6,7,8]
    }
    }
}

function render() {
    emptyBoard();


    for (let i = 0; i < 9; i++) {
        let square = createSquare();

        if (gameBoard[i] === 'x') createX(square);
        if (gameBoard[i] === 'o') createO(square);
        
        boardHTML.appendChild(square);

        square.addEventListener('click', function () {
            markSquare(square, i);
            switchPlayer()
            render();
            let status = checkStatus();
            console.log(status)
            if (status) {
                if (status === 'tie') {
                    declareTie()
                }
                if (status[0] === 'x' || status[0] === 'o') {
                    declareWinner(status)
                }
                
            }

        })

    }

}
newGame()

let currentTurn = 1;




function getNames() {
    player1 = document.querySelector('#player1-name').value;
    player2 = document.querySelector('#player2-name').value;
    return [player1, player2]
}

function checkNameValidity(player) {
    if (player.length < 2) return alert('Name must be longer than 2 characters')
    if (player.length > 16) return alert('Name must be shorter than than 16 characters')
}

const playBtn = document.querySelector('.play-btn');

playBtn.addEventListener('click', function() {

    let [player1, player2] = getNames();

    console.log(player1)
    console.log(player2)
    checkNameValidity(player1)
    checkNameValidity(player2)
})