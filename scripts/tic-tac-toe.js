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
            i++
        } 
        )
    });
    render()
    const human1 = true;
    const human2 = true;
    const ai1 = false;
    const ai2 = false;
    const createPlayer = () => {
        const getName = () =>  {
            if ((!human1 && !ai1) || (!human2 && !ai2)) {
                console.log({human1, human2, ai1, ai2},"condition: return")
            } else if ((!human1 && ai1) && (!human2 && ai2)) {
                console.log({human1, human2, ai1, ai2}, "condition: both ai")
            } else if ((human1 && !ai1) && (human2 && !ai2)) {
                console.log({human1, human2, ai1, ai2}, "condition: both human")
            } else if ((human1 ^ human2) && (ai1 ^ ai2)) {
                console.log({human1, human2, ai1, ai2}, "condition: human vs. ai")
            } else if ((human1 && human2) || (ai1 && ai2)) {
                console.log({human1, human2, ai1, ai2}, "condition: error")
            }

        }
        getName()
    }
    createPlayer()
    const players = {
        
    }
    
})();
