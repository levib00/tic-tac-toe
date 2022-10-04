const game = (() => {
    const playButton = document.querySelectorAll(".play-button")

    const gameBoard = {
        myArray : [1,2,3,4,5,6,7,8,9],
    };

    function test() {
        if (this.innerHTML === "X" || this.innerHTML === "O") {
            console.log(this.innerHTML)
            return
        } else {
        gameBoard.myArray[Array.prototype.indexOf.call(playButton, this)] = "X";
        render()
        }
    }

    const render = (function() {
        i = 0
        playButton.forEach((playButtons) => {
            playButtons.addEventListener('click', test)
            playButtons.innerHTML = gameBoard.myArray[i];
            i++;
        })
    });
    render()

    const human1 = document.getElementById("human1");
    const human2 = document.getElementById("human2");
    const cpu1 = document.getElementById("cpu1");
    const cpu2 = document.getElementById("cpu2")

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

    const players = {
        human1: false,
        human2: false,
        ai1: true,
        ai2: true
    }
    const createPlayer = () => {
        const getName = () =>  {
            if ((!players.human1 && !players.ai1) || (!players.human2 && !players.ai2)) {
                console.log({players},"condition: return")
            } else if ((!players.human1 && players.ai1) && (!players.human2 && players.ai2)) {
                console.log({players}, "condition: both ai")
            } else if ((players.human1 && !players.ai1) && (players.human2 && !players.ai2)) {
                console.log({players}, "condition: both human")
            } else if ((players.human1 ^ players.human2) && (players.ai1 ^ players.ai2)) {
                console.log({players}, "condition: human vs. ai")
            } else if ((players.human1 && players.human2) || (players.ai1 && players.ai2)) {
                console.log({players}, "condition: error")
            }
        }
        getName()
    }
    createPlayer()
    
})();
