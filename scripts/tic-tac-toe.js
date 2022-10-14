const game = (() => {
    
    const gameBoard = {
        boardArray : ["","","","","","","","",""],
    };
    
    const turns = {
        xTurn : true,
        oTurn : false
    }

    let playerOneScore = 0;
    let playerTwoScore = 0;

    let roundOver = false;
    let allowStart = false

    const setScores = () => {
        const playerOneScoreDOM = document.getElementById("player-one-score").innerHTML = playerOneScore;
        const playerTwoScoreDOM = document.getElementById("player-two-score").innerHTML = playerTwoScore;
    }

    const checkWinConditions = () => {
        
        console.log(gameBoard.boardArray[0], gameBoard.boardArray[1], gameBoard.boardArray[2], gameBoard.boardArray[3], gameBoard.boardArray[4], gameBoard.boardArray[5], gameBoard.boardArray[6], gameBoard.boardArray[7], gameBoard.boardArray[8])
        
        const endRound = () => {
            const endGame = () => {
                playerOneScore = 0;
                playerTwoScore = 0;
                turns.xTurn = true
                turns.oTurn = false
                const boardDOM = document.getElementById("board").setAttribute("class","grid-container board hide");
                gameElements.DOMElements.nextButton.innerHTML = "play again!"
            }

            setScores()
            roundOver = true;
            gameElements.DOMElements.nextButton.setAttribute("class", "menu-button");
            gameElements.DOMElements.nextButton.innerHTML = "Next Round!"
            if (playerOneScore === 3) {
                endGame()
            } else if (playerTwoScore === 3) { 
                endGame()
            }
        }
        
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
            endRound()
        } else if (gameBoard.boardArray[0] && gameBoard.boardArray[1]
            && gameBoard.boardArray[2] && gameBoard.boardArray[3]
            && gameBoard.boardArray[4] && gameBoard.boardArray[5]
            && gameBoard.boardArray[6] && gameBoard.boardArray[7]
            && gameBoard.boardArray[8]) 
        {
            endRound()
            notifications.innerHTML = "It's a draw"
        }
    }
    return {gameBoard, checkWinConditions, roundOver, turns, setScores, allowStart}
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
                console.log({players},"condition: return")
            } else if ((!players.human1 && players.ai1) && (!players.human2 && players.ai2)) {
                game.allowStart = true;
                console.log({players}, "condition: both ai")
            } else if ((players.human1 && !players.ai1) && (players.human2 && !players.ai2)) {
                game.allowStart = true;
                console.log({players}, "condition: both human")
            } else if ((players.human1 ^ players.human2) && (players.ai1 ^ players.ai2)) {
                game.allowStart = true;
                console.log({players}, "condition: human vs. ai")
            } else if ((players.human1 && players.human2) || (players.ai1 && players.ai2)) {
                console.log({players}, "condition: error")
            }       
        })()
        
    } 

    const players = { //could probably hide objects too.
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
        human1 : document.getElementById("human1"), //need to hide these somewhere too
        human2 : document.getElementById("human2"),
        cpu1 : document.getElementById("cpu1"),
        cpu2 : document.getElementById("cpu2"),
        notifications : document.getElementById("notification")
    }

    DOMElements.startButton.addEventListener("click",() =>{
        console.log(game.allowStart)
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
        game.roundOver = false;
        DOMElements.notifications.innerHTML = ""
        render()
    })
    
    const render = (function() {
        const boardDOM = document.getElementById("board").setAttribute("class","grid-container board");
        game.setScores()
        
        i = 0
        DOMElements.playButton.forEach((playButtons) => {
            playButtons.addEventListener('click', addToBoardArray)
            playButtons.innerHTML = game.gameBoard.boardArray[i];
            i++;
        })
        function addToBoardArray() {
            console.log(game.roundOver)
                if (game.roundOver === true || game.allowStart === false) return
                if (this.innerHTML === "X" || this.innerHTML === "O") {
                    return
                } else if (game.turns.xTurn) {
                    game.gameBoard.boardArray[Array.prototype.indexOf.call(DOMElements.playButton, this)] = "X";
                    game.turns.xTurn = false
                    game.turns.oTurn = true
                } else if (game.turns.oTurn) {
                    game.gameBoard.boardArray[Array.prototype.indexOf.call(DOMElements.playButton, this)] = "O";
                    game.turns.oTurn = false
                    game.turns.xTurn = true
                } 
                render()
                game.checkWinConditions() 
            }
    });
    return {DOMElements}
})()