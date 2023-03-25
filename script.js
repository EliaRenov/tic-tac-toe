'use strict';



const gameBoardModule = (() => {

    let currentTurn = 1;

    let gameBoard;
    
    let HTMLs = {
        boardHTML: document.querySelector('.board'),
        newGameBtn: document.querySelector('.new-game-btn'),
        squares: document.querySelectorAll(".square"),
    }
    
    HTMLs.newGameBtn.addEventListener('click', newGame)
    
    function newGame() {
        resetBoard();
        render();
        highlightCurrentPlayer()
    }
    
    function resetBoard() {
        gameBoard = [
            null, null, null,
            null, null, null,
            null, null, null
        ];
    }
    
    function emptyBoard() {
        while (HTMLs.boardHTML.firstChild) {
            HTMLs.boardHTML.firstChild.remove()
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
        highlightCurrentPlayer()
    }
    
    let playerHTMLs = document.querySelectorAll('.player')
    let player1Title = playerHTMLs[0]
    let player2Title = playerHTMLs[1]

    
    function highlightCurrentPlayer() {

        if (currentTurn === 1) {
            player1Title.classList.add('current')
            player2Title.classList.remove('current')
        } else if (currentTurn === 2) {
            player2Title.classList.add('current')
            player1Title.classList.remove('current')
        }
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
    }
    
    function declareWinner(status) {

        let squares = document.querySelectorAll(".square")
        markSquaresWin(squares[status[1]], squares[status[2]], squares[status[3]])
    }
    
    function gameEnds() {
        let squares = document.querySelectorAll(".square");
        squares.forEach(square => {
            square.replaceWith(square.cloneNode(true))
        })
    
        // Remove current player highlighting
        player1Title.classList.remove('current')
        player2Title.classList.remove('current')
    }
    
    function checkForThree() {
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
        }
        
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
    
        if (checkTie()) return 'tie';
    }
    
    function checkStatus() {
        let status = checkForThree();
        if (status) {
            if (status === 'tie') {
                declareTie()
            }
                if (status[0] === 'x' || status[0] === 'o') {
                    declareWinner(status)
                }
                gameEnds()
            }
    }
    
    function squareFunctionality(square, i) {
        markSquare(square, i);
        switchPlayer()
        render();
        checkStatus();
    
    }
    
    function addSquareListener(square, i) {
        square.addEventListener('click', function () {
            squareFunctionality(square, i)
        })
    }
    
    
    function render() {
        emptyBoard();
    
        for (let i = 0; i < 9; i++) {
            let square = createSquare();
    
            if (gameBoard[i] === 'x') createX(square);
            if (gameBoard[i] === 'o') createO(square);
            
            HTMLs.boardHTML.appendChild(square);
    
            addSquareListener(square, i)
    
        }
    
    }
    return {
        newGame
    }

})();

gameBoardModule.newGame()

const Player = (name) => {

}

let player1Form;
let player2Form;
let player1Game = document.querySelector('.player.one');
let player2Game = document.querySelector('.player.two');


function getNames() {
    player1Form = document.querySelector('#player1-name');
    player2Form = document.querySelector('#player2-name');
    return [player1Form, player2Form]
}

function checkNameValidity(player) {
    if (player.value.length < 2 || player.value === 'TOO SHORT') {
        player.value = 'TOO SHORT';
        return false;
    }
    if (player.value.length > 16 || player.value === 'TOO LONG') {
        player.value = 'TOO LONG';
        return false
    }
    return true;
}

function updateHTMLNames(player1, player2) {
    player1Game.textContent = player1Form.value;
    player2Game.textContent = player2Form.value;
}

function hideForm() {

    document.querySelector('.player-info').classList.add('hidden')
}

const playBtn = document.querySelector('.play-btn');

playBtn.addEventListener('click', function() {

    let [player1, player2] = getNames();

    // if (!checkNameValidity(player1) && !checkNameValidity(player2)) return;

    let namesValid = (!checkNameValidity(player1) && !checkNameValidity(player2))
    console.log(namesValid)
   
    if (!namesValid) {
        updateHTMLNames()
        hideForm()

    }

})

