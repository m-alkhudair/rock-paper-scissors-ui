const gameButtons  = document.querySelectorAll('button.gameButton');
const allDivs = document.querySelectorAll('div.disappear');
const computerSelectionDiv = document.getElementById('computer');
const userSelectionDiv = document.getElementById('user');
const totalScore = document.getElementById('totalScore');
const resetButton = document.getElementById('reset');
const roundDiv = document.getElementById('round');

// variables to be manipulated in the game() function.
let playerTotalScore = 0;
let computerTotalScore = 0;

// Generate computer selection:
const computerPlay = () => {
    const randomNumber = Math.round(Math.random()*30);

    if (randomNumber <= 10) {
        return 'Rock';
    } else if (randomNumber > 10 && randomNumber <= 20) {
        return 'Paper';
    } else if (randomNumber > 20) {
        return 'Scissors';
    } else {
        console.log('Something\'s wrong');
    };

};

// Function to figure out the winner of one round
const playRound  = (playerSelection, computerSelection) => {
    const player = playerSelection.toLowerCase();
    const computer = computerSelection.toLowerCase();

    let result;
    let playerScore = 0;
    let computerScore = 0;

    if (player === 'rock') {
        switch (computer) {
            case 'rock':
                result = 'A Tie! No one wins this round.';
                break;
            case 'paper':
                result = 'Paper beats rock. Computer wins!';
                computerScore++;
                break;
            case 'scissors':
                result = 'Rock beats scissors. You win!';
                playerScore++;
                break;
        };
    } else if (player === 'paper') {
        switch (computer) {
            case 'rock':
                result = 'Paper beats rock. You wins!';
                playerScore++;
                break;
            case 'paper':
                result = 'A Tie! No one wins this round.';
                break;
            case 'scissors':
                result = 'Scissors beat paper. Computer wins!';
                computerScore++;
                break;

        };
    } else if (player === 'scissors') {
        switch (computer) {
            case 'rock':
                result = 'Rock beats scissors. Computer wins';
                computerScore++;
                break;
            case 'paper':
                result = 'Scissors beat paper. You wins!';
                playerScore++;
                break;
            case 'scissors':
                result = 'A Tie! No one wins this round.';
                break;
        };
    } else {
        playerSelection = prompt('Attention! Please check spelling and try again!').trim()
        if (playerSelection != undefined) {
            playRound(playerSelection, computerSelection);
        };
    };

    let messagePlayerSelection = `You selected: ${playerSelection}`;
    let messageComputerSelection = `Computer selected: ${computerSelection}`;
    let messageRoundResult = `The results: ${result}`;

    return {
        messagePlayerSelection: messagePlayerSelection,
        messageComputerSelection: messageComputerSelection,
        messageRoundResult: messageRoundResult,
        playerScore: playerScore,
        computerScore: computerScore,
    };
  
};

// Function to figure out the winner of the whole game so far
const game = (userInput) => {

    const playerSelection= userInput;
    const computerSelection = computerPlay();

    const playRoundResults = playRound(playerSelection, computerSelection);
    
    playerTotalScore += playRoundResults.playerScore;
    computerTotalScore += playRoundResults.computerScore;

    console.log(playRoundResults.messagePlayerSelection)
    console.log(playRoundResults.messageComputerSelection)
    console.log(playRoundResults.messageRoundResult)
    console.log('---------------------');

    displayContent(computerSelectionDiv, playRoundResults.messageComputerSelection);
    displayContent(userSelectionDiv, playRoundResults.messagePlayerSelection);
    displayContent(roundResults, playRoundResults.messageRoundResult);


    const winner = playerTotalScore>computerTotalScore? 'You!' : 'Computer!';
    const tie = playerTotalScore===computerTotalScore? true : false;

    let finalScoresMessage = `Player total score: ${playerTotalScore}, Computer total score: ${computerTotalScore}.`;
    let finalWinner = ` The winner is ${winner}`
    
    console.log(finalScoresMessage);
    tie? console.log('It\'s a Tie!') : console.log(finalWinner);

    const finalScoreMessageObject = {
        finalScoresMessage: finalScoresMessage,
        finalWinnerMessage: tie? 'It\'s a Tie!' : finalWinner,
    }

    displayContent(totalScore, finalScoreMessageObject);    
};

// Function to display content on the browser
const displayContent = (element, content) => {
    if (element.firstChild) {
        element.removeChild(element.firstChild);
    };
    if (typeof content !== 'object') {
        const elementContentDisplay = document.createElement('p');
        elementContentDisplay.textContent = `${content}`;
        element.appendChild(elementContentDisplay);

    } else {
        const elementContentDisplayUL = document.createElement('ul');
        element.appendChild(elementContentDisplayUL);
        for (const property in content) {
            const listItem = document.createElement('li');
            const listText = document.createTextNode(content[property]);
            listItem.appendChild(listText);
            elementContentDisplayUL.appendChild(listItem);
        }
    }
};

// Function to reset everything
const resetGame = () =>{
    for (const div of allDivs) {
        div.classList.add('disappear');
    };
    resetButton.classList.add('disappear');

    playerTotalScore = 0;
    computerTotalScore = 0;

    computerSelectionDiv.innerHTML = '<span>Instructions:</span>'
    userSelectionDiv.textContent = 'Start playing by clicking on either Rock, Paper, or Scissors.';
}


// Event Listeners:
for (const gameBtn of gameButtons) {
    gameBtn.addEventListener('click', ()=> {
        for (const div of allDivs) {
            div.classList.remove('disappear');
        };
        resetButton.classList.remove('disappear');
        game(gameBtn.id);

    });
};

resetButton.addEventListener('click', resetGame);

