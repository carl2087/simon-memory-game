let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    choices: ["button1", "button2", "button3", "button4"],
    turnNumber: 0,
    lastButton: "",
    turnInProgress: false,
}

function newGame() {
    game.score = 0;
    game.playerMoves = [];
    game.currentGame = [];
    game.turnNumber = 0;
    for (let circle of document.getElementsByClassName("circle")) {         // steps through elements with class circle
        if (circle.getAttribute("data-listener") !== "true") {              // checks if not equal to true
            circle.addEventListener("click", (e) => {                       // adds event listener click and pass in e as event object
                if (game.currentGame.length > 0 && !game.turnInProgress) {  // if statement to only allow clicks if the currentGame array is greater than zero and if game is in progress
                let move = e.target.getAttribute("id");                     // attaches e to variable move by getting id attribute
                game.lastButton = move;                                     // stores move in lastButton 
                lightsOn(move);                                             // calls lights on function and uses variable move to light up correct element
                game.playerMoves.push(move);                                // pushes move into game.playerMoves
                playerTurn();                                               // calls player turn function
                }                                                   
            });
            circle.setAttribute("data-listener", "true");                   // sets data listener attribute to true which makes the test pass
        }
    }
    showScore();
    addTurn();
}

function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    showTurns();
}

function showScore() {
    document.getElementById("score").innerText = game.score;
}

function lightsOn(circ) {
    document.getElementById(circ).classList.add("light");
    setTimeout(() => {
        document.getElementById(circ).classList.remove("light");
    }, 400);
}

function showTurns() {
    game.turnInProgress = true;
    game.turnNumber = 0;
    let turns = setInterval(() => {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
            game.turnInProgress = false;
        };
    }, 800);
};

function playerTurn () {
    let i = game.playerMoves.length - 1;
    if (game.currentGame[i] === game.playerMoves[i]) {
        if (game.currentGame.length === game.playerMoves.length) {
            game.score++;
            showScore();
            addTurn();
        }
    } else {
        alert("Wrong move!");
        newGame();
    }
}


module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn };