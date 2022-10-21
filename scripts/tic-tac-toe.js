let roundOver = false; //would like to remove from global code
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

    let allowStart = false

    function switchTurns() {
        if (turns.xTurn) {
            turns.xTurn = false
            turns.oTurn = true
        } else if (turns.oTurn) {
            turns.oTurn = false
            turns.xTurn = true
        }
    }

    const setScores = () => {
        const playerOneScoreDOM = document.getElementById("player-one-score").innerHTML = playerOneScore;
        const playerTwoScoreDOM = document.getElementById("player-two-score").innerHTML = playerTwoScore;
    }

    const checkWinConditions = (() => {
        const endRound = (() => { 
            roundOver = true
            const endGame = () => {   
                playerOneScore = 0;
                playerTwoScore = 0;
                gameElements.boardDOM.setAttribute("class","grid-container board hide");
                gameElements.DOMElements.nextButton.innerHTML = "play again!"
                if (players.players.ai1 === true || players.players.ai2 === true) {
                    turns.xTurn = true // not working
                    turns.oTurn = false
                }
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
            endRound()
        } else if (gameBoard.boardArray[0] && gameBoard.boardArray[1]
            && gameBoard.boardArray[2] && gameBoard.boardArray[3]
            && gameBoard.boardArray[4] && gameBoard.boardArray[5]
            && gameBoard.boardArray[6] && gameBoard.boardArray[7]
            && gameBoard.boardArray[8]) 
        {
            gameElements.DOMElements.notifications.innerHTML = "It's a draw"
            endRound()
        }
    })
    const addToBoardArray = function() {
        
        if (this.innerHTML === "X" || this.innerHTML === "O" || roundOver === true || game.allowStart === false) return
         else if (turns.xTurn) {
            gameBoard.boardArray[Array.prototype.indexOf.call(gameElements.DOMElements.playButton, this)] = "X";
        } else if (turns.oTurn) {
            gameBoard.boardArray[Array.prototype.indexOf.call(gameElements.DOMElements.playButton, this)] = "O";
        } 
        gameElements.render()
        switchTurns()
        if ((!players.players.ai1 && turns.oTurn) || (!players.players.ai2 && turns.xTurn)) {
            checkWinConditions()
        } 
        if (roundOver) {
            switchTurns()
            return
        }
            CPUPlay()
    }

    const CPUPlay = (() => { // make method for each player. call eachothers method in eachothers method if condition to automate full game.
        if (gameBoard.boardArray[0] && gameBoard.boardArray[1]
            && gameBoard.boardArray[2] && gameBoard.boardArray[3]
            && gameBoard.boardArray[4] && gameBoard.boardArray[5]
            && gameBoard.boardArray[6] && gameBoard.boardArray[7]
            && gameBoard.boardArray[8]) {
                switchTurns()
                checkWinConditions()
                return
            }
        function xAi () {
            let done = false
            while (turns.xTurn === true && !done) {
                const choice = Math.floor(Math.random() * 9);
                if (gameBoard.boardArray[choice] === "") {
                    gameBoard.boardArray[choice] = "X"
                    done = true;
                    switchTurns()
                    checkWinConditions()
                    if (players.players.ai2 && turns.oTurn && !roundOver) {
                        setTimeout(oAi(), (1000))
                    }
                }
            }
        }
        function oAi () {
            let done = false
            while (turns.oTurn === true && !done) {       
                const choice = Math.floor(Math.random() * 9);
                if (gameBoard.boardArray[choice] === "") {
                    gameBoard.boardArray[choice] = "O"
                    done = true;
                    switchTurns()
                    checkWinConditions()
                    if (players.players.ai1 && turns.xTurn && !roundOver) {
                        setTimeout(xAi(), (1000))
                    }
                }       
            }
        }
        if (players.players.ai1 === true && roundOver === false && turns.xTurn === true) {
            xAi();
        } else if (players.players.ai2 === true && roundOver === false && turns.oTurn === true) {
            oAi(); 
        }
        gameElements.render()
    })

    return {gameBoard, checkWinConditions, turns, setScores, allowStart, addToBoardArray, CPUPlay}
})();

const players = (() => {// change this name
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
        if (game.allowStart === true) {
            render();
            const hideButtons = document.querySelectorAll(".button-container")
            hideButtons.forEach((hideButton) => {
                hideButton.setAttribute("class","button-container hide")
            })
            setTimeout(game.CPUPlay(),(250))
        }
    })  

    DOMElements.nextButton.addEventListener("click",() => {
        game.gameBoard.boardArray = ["","","","","","","","",""]
        DOMElements.nextButton.setAttribute("class", "hide menu-button");
        roundOver = false;
        console.log(game.roundOver)
        DOMElements.notifications.innerHTML = ""
        setTimeout(game.CPUPlay(),(250))
        render()
    })

    let execute = false
    const boardDOM = document.getElementById("board")
    const render = (function() {
        
        game.setScores()
        i = 0
        boardDOM.setAttribute("class","grid-container board");
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
    return {DOMElements, render,boardDOM}
})();