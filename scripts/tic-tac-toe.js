const game = (() => {
    const playButton = document.querySelectorAll(".play-button")

    const gameBoard = {
        boardArray : [0,1,2,3,4,5,6,7,8],
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
        checkWinConditions()
        render()
        console.log(gameBoard.boardArray)
    }

    const human1 = document.getElementById("human1"); //need to hide these somewhere too
    const human2 = document.getElementById("human2");
    const cpu1 = document.getElementById("cpu1");
    const cpu2 = document.getElementById("cpu2")

    const render = (function() {
        i = 0
        playButton.forEach((playButtons) => {
            playButtons.addEventListener('click', addToBoardArray)
            playButtons.innerHTML = gameBoard.boardArray[i];
            i++;
        })
    });
    render()

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

    const players = { //could probably hide objects too.
        human1: false,
        human2: false,
        ai1: false,
        ai2: false
    }

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
            console.log(allowStart)
            
        })()
        
    } 
    

    const checkWinConditions = () => {
        console.log(gameBoard.boardArray[0], gameBoard.boardArray[1])
        
        if ((gameBoard.boardArray[0] === gameBoard.boardArray[4] && gameBoard.boardArray[0] === gameBoard.boardArray[8])
          || (gameBoard.boardArray[2] === gameBoard.boardArray[4] && gameBoard.boardArray[2] === gameBoard.boardArray[6])
          || (gameBoard.boardArray[0] === gameBoard.boardArray[1] && gameBoard.boardArray[0] === gameBoard.boardArray[2])
          || (gameBoard.boardArray[3] === gameBoard.boardArray[4] && gameBoard.boardArray[3] === gameBoard.boardArray[5])
          || (gameBoard.boardArray[6] === gameBoard.boardArray[7] && gameBoard.boardArray[6] === gameBoard.boardArray[8])
          || (gameBoard.boardArray[0] === gameBoard.boardArray[3] && gameBoard.boardArray[0] === gameBoard.boardArray[6])
          || (gameBoard.boardArray[1] === gameBoard.boardArray[4] && gameBoard.boardArray[1] === gameBoard.boardArray[7])
          || (gameBoard.boardArray[2] === gameBoard.boardArray[5] && gameBoard.boardArray[2] === gameBoard.boardArray[8])) {
            console.log(gameBoard.boardArray[0], gameBoard.boardArray[1], gameBoard.boardArray[2])
            console.log(turns.oTurn === true ? "X Wins!" : "O Wins!")
            return roundOver = true;
          }
    }
})();
