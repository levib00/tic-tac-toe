let roundOver = false;
const game = (() => {
    
    const gameBoard = {
        boardArray : ["","","","","","","","",""],
    };
    
    const turns = {
        xTurn : true,
        oTurn : false
    }

    let allowStart = false

    const setScores = () => {
        const playerOneScoreDOM = document.getElementById("player-one-score").innerHTML = playerOneScore;
        const playerTwoScoreDOM = document.getElementById("player-two-score").innerHTML = playerTwoScore;
    }

    const checkWinConditions = (() => {
        const endRound = (() => { 
            roundOver = true
            console.log("endRound", roundOver)

            const endGame = () => {   

                playerOneScore = 0;
                playerTwoScore = 0;
                turns.xTurn = true
                turns.oTurn = false
                const boardDOM = document.getElementById("board").setAttribute("class","grid-container board hide");
                gameElements.DOMElements.nextButton.innerHTML = "play again!"
            }

            setScores()
            gameElements.DOMElements.nextButton.setAttribute("class", "menu-button");
            gameElements.DOMElements.nextButton.innerHTML = "Next Round!"
            if (playerOneScore === 3) {
                endGame()
            } else if (playerTwoScore === 3) { 
                endGame()
            }
            
        })
        
        if ((gameBoard.boardArray[0] === gameBoard.boardArray[4] && gameBoard.boardArray[0] === gameBoard.boardArray[8] && gameBoard.boardArray[0])
          || (gameBoard.boardArray[2] === gameBoard.boardArray[4] && gameBoard.boardArray[2] === gameBoard.boardArray[6] && gameBoard.boardArray[2])
          || (gameBoard.boardArray[0] === gameBoard.boardArray[1] && gameBoard.boardArray[0] === gameBoard.boardArray[2] && gameBoard.boardArray[0])
          || (gameBoard.boardArray[3] === gameBoard.boardArray[4] && gameBoard.boardArray[3] === gameBoard.boardArray[5] && gameBoard.boardArray[3])
          || (gameBoard.boardArray[6] === gameBoard.boardArray[7] && gameBoard.boardArray[6] === gameBoard.boardArray[8] && gameBoard.boardArray[6])
          || (gameBoard.boardArray[0] === gameBoard.boardArray[3] && gameBoard.boardArray[0] === gameBoard.boardArray[6] && gameBoard.boardArray[0])
          || (gameBoard.boardArray[1] === gameBoard.boardArray[4] && gameBoard.boardArray[1] === gameBoard.boardArray[7] && gameBoard.boardArray[1])
          || (gameBoard.boardArray[2] === gameBoard.boardArray[5] && gameBoard.boardArray[2] === gameBoard.boardArray[8] && gameBoard.boardArray[2])) 
        {
            if (turns.oTurn === true)  {
                gameElements.DOMElements.notifications.innerHTML = "player one wins!"
                playerOneScore++
            } else {
                gameElements.DOMElements.notifications.innerHTML = "player two wins!"
                playerTwoScore++
            }
            console.log("checkWinCondition.roundOver",endRound());
            return endRound()
        } else if (gameBoard.boardArray[0] && gameBoard.boardArray[1]
            && gameBoard.boardArray[2] && gameBoard.boardArray[3]
            && gameBoard.boardArray[4] && gameBoard.boardArray[5]
            && gameBoard.boardArray[6] && gameBoard.boardArray[7]
            && gameBoard.boardArray[8]) 
        {
            gameElements.DOMElements.notifications.innerHTML = "It's a draw"
            return endRound()
        }
    })
    const addToBoardArray = function() {
        console.log("roundOver",roundOver)
        if (this.innerHTML === "X" || this.innerHTML === "O" || roundOver === true || game.allowStart === false) {
            return
        } else if (turns.xTurn) {
            gameBoard.boardArray[Array.prototype.indexOf.call(gameElements.DOMElements.playButton, this)] = "X";
            console.log(this);
            turns.xTurn = false
            turns.oTurn = true
        } else if (turns.oTurn) {
            gameBoard.boardArray[Array.prototype.indexOf.call(gameElements.DOMElements.playButton, this)] = "O";
            turns.oTurn = false
            turns.xTurn = true
        } 
        gameElements.render()
        checkWinConditions() 
    }
    return {gameBoard, checkWinConditions, turns, setScores, allowStart, addToBoardArray}
})();

const players = (() => {
    human1.addEventListener("click",() => {
        players.human1 = true;
        players.ai1 = false;
        createPlayer()
    })

    human2.addEventListener("click",() => {
        players.human2 = true;
        players.ai2 = false;
        createPlayer()
    })

    cpu1.addEventListener("click",() => {
        players.ai1 = true;
        players.human1 = false;
        createPlayer()
    })

    cpu2.addEventListener("click",() => {
        players.ai2 = true;
        players.human2 = false;
        createPlayer()
    })

    const createPlayer = () => {
        const getName = (() =>  {
            if ((!players.human1 && !players.ai1) || (!players.human2 && !players.ai2)) {
                return
            } else if ((!players.human1 && players.ai1) && (!players.human2 && players.ai2)) {
                game.allowStart = true;
            } else if ((players.human1 && !players.ai1) && (players.human2 && !players.ai2)) {
                game.allowStart = true;
            } else if ((players.human1 ^ players.human2) && (players.ai1 ^ players.ai2)) {
                game.allowStart = true;
            } else if ((players.human1 && players.human2) || (players.ai1 && players.ai2)) {
                return
            }       
        })()
    } 

    const players = {
        human1: false,
        human2: false,
        ai1: false,
        ai2: false
    }
    return {players}
})()

const gameElements = (() => {
    const DOMElements = {
        playButton : document.querySelectorAll(".play-button"),
        startButton : document.getElementById("start-button"),
        nextButton : document.getElementById("next-round-button"),
        human1 : document.getElementById("human1"),
        human2 : document.getElementById("human2"),
        cpu1 : document.getElementById("cpu1"),
        cpu2 : document.getElementById("cpu2"),
        notifications : document.getElementById("notification")
    }

    DOMElements.startButton.addEventListener("click",() =>{
        console.log("allowStart",game.allowStart)
        if (game.allowStart === true) {
            render();
            const hideButtons = document.querySelectorAll(".button-container")
            hideButtons.forEach((hideButton) => {
                hideButton.setAttribute("class","button-container hide")
            })
        }
    })  

    DOMElements.nextButton.addEventListener("click",() => {
        game.gameBoard.boardArray = ["","","","","","","","",""]
        DOMElements.nextButton.setAttribute("class", "hide menu-button");
        roundOver = false;
        console.log(game.roundOver)
        DOMElements.notifications.innerHTML = ""
        render()
    })

    let execute = false

    const render = (function() {
        const boardDOM = document.getElementById("board").setAttribute("class","grid-container board");
        game.setScores()
        i = 0

        DOMElements.playButton.forEach((playButtons) => {
            if (!execute) {
            playButtons.addEventListener('click', game.addToBoardArray);
            }
            if (i > 7) {
                execute = true
            }
            playButtons.innerHTML = game.gameBoard.boardArray[i];
            i++;
        })
        
    });
    return {DOMElements, render}
})();
