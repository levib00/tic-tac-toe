const game = (() => {
    const playButton = document.querySelectorAll(".play-button")

    const gameBoard = {
        boardArray : ["","","","","","","","",""],
    };

    const turns = {
        xTurn : true,
        oTurn : false
    }

     // need to hide these somewhere
    let roundOver = false;
    let allowStart = false;

    function addToBoardArray() {
       // console.log(gameBoard.boardArray[0])
        if (roundOver === true || allowStart === false) return
        if (this.innerHTML === "X" || this.innerHTML === "O") {
            return
        } else if (turns.xTurn) {
            gameBoard.boardArray[Array.prototype.indexOf.call(playButton, this)] = "X";
            turns.xTurn = false
            turns.oTurn = true
        } else if (turns.oTurn) {
            gameBoard.boardArray[Array.prototype.indexOf.call(playButton, this)] = "O";
            turns.oTurn = false
            turns.xTurn = true
        } 
        render()
        checkWinConditions() 
    }

    const human1 = document.getElementById("human1"); //need to hide these somewhere too
    const human2 = document.getElementById("human2");
    const cpu1 = document.getElementById("cpu1");
    const cpu2 = document.getElementById("cpu2")


    startButton.addEventListener("click",() =>{
        if (allowStart === true) {
            render();
            const hideButtons = document.querySelectorAll(".button-container")
            hideButtons.forEach((hideButton) => {
                hideButton.setAttribute("class","button-container hide")
            })
        }
    })

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
    const notifications = document.getElementById("notification");

    nextButton.addEventListener("click",() => {
        gameBoard.boardArray = ["","","","","","","","",""]
        nextButton.setAttribute("class", "hide menu-button");
        roundOver = false;
        notifications.innerHTML = ""
        render()
    })

    const checkWinConditions = () => {
        
        console.log(gameBoard.boardArray[0], gameBoard.boardArray[1], gameBoard.boardArray[2], gameBoard.boardArray[3], gameBoard.boardArray[4], gameBoard.boardArray[5], gameBoard.boardArray[6], gameBoard.boardArray[7], gameBoard.boardArray[8])
        
        const endRound = () => {
            nextButton.setAttribute("class", "menu-button");
            nextButton.innerHTML = "Next Round!"
            const playerOneScoreDOM = document.getElementById("player-one-score").innerHTML = playerOneScore;
            const playerTwoScoreDOM = document.getElementById("player-two-score").innerHTML = playerTwoScore;
            if (playerOneScore === 3) {
                endGame()
            } else if (playerTwoScore === 3) { 
                endGame()
            }

            const endGame = () => {
                playerOneScore = 0;
                playerTwoScore = 0;
                const playerOneScoreDOM = document.getElementById("player-one-score").innerHTML = playerOneScore;
                const playerTwoScoreDOM = document.getElementById("player-two-score").innerHTML = playerTwoScore;
                turns.xTurn = true
                turns.oTurn = false
                const boardDOM = document.getElementById("board").setAttribute("class","grid-container board hide");
                nextButton.innerHTML = "play again!"
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
                notifications.innerHTML = "player one wins!"
                playerOneScore++
            } else {
                notifications.innerHTML = "player two wins!"
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
})();

const players = (() => {

    const createPlayer = () => {
        const getName = (() =>  {
            if ((!players.human1 && !players.ai1) || (!players.human2 && !players.ai2)) {
                console.log({players},"condition: return")
            } else if ((!players.human1 && players.ai1) && (!players.human2 && players.ai2)) {
                allowStart = true;
                console.log({players}, "condition: both ai")
            } else if ((players.human1 && !players.ai1) && (players.human2 && !players.ai2)) {
                allowStart = true;
                console.log({players}, "condition: both human")
            } else if ((players.human1 ^ players.human2) && (players.ai1 ^ players.ai2)) {
                allowStart = true;
                console.log({players}, "condition: human vs. ai")
            } else if ((players.human1 && players.human2) || (players.ai1 && players.ai2)) {
                console.log({players}, "condition: error")
            }            
        })()
        
    } 

    let playerOneScore = 0;
    let playerTwoScore = 0;

    const players = { //could probably hide objects too.
       

        human1: false,
        human2: false,
        ai1: false,
        ai2: false
    }

})

const gameBoard = (() => {
    const startButton = document.getElementById("start-button")
    const nextButton = document.getElementById("next-round-button")
    
     return render = (function() {
        
        const boardDOM = document.getElementById("board").setAttribute("class","grid-container board");
        const playerOneScoreDOM = document.getElementById("player-one-score").innerHTML = playerOneScore;
        const playerTwoScoreDOM = document.getElementById("player-two-score").innerHTML = playerTwoScore;
        
        i = 0
        playButton.forEach((playButtons) => {
            playButtons.addEventListener('click', addToBoardArray)
            playButtons.innerHTML = gameBoard.boardArray[i];
            i++;
        })
    });

})()
 