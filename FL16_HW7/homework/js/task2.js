const initialPrize = 100
const initialRange = 8
const roundPrizeIncreaseStep = 100
const roundRangeIncreaseStep = 4

let userWantToPlayNextRound,
    currentRound,
    totalPrise;


function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function resetGame() {
    userWantToPlayNextRound = true
    currentRound = 0
    totalPrise = 0
}

function runGameRound(prizeNumber, totalPrise, range, attempts) {
    let attemptsLeft = attempts;
    let prize = prizeNumber;
    const random = getRandom(0, range);

    while (attemptsLeft > 0) {

        let number = prompt(`Choose a roulette pocket number from 0 to ${range} ` + 
            `\n ${attempts} left: ${attemptsLeft} \n` +
            `Total prize: ${totalPrise}$ \n` +
            `Possible prize on current attempt: ${prize}$`)
        if (number === null) {
            return null;
        }
        if (random === number) {
            return prize
        }

        const prizeReductionStep = 2
        prize = prize / prizeReductionStep
        attemptsLeft--;
    }
    return null;
}


function runGame() {
    resetGame()

    while (userWantToPlayNextRound) {

        const roundRange = initialRange + currentRound * roundRangeIncreaseStep
        const roundPrice = initialPrize + currentRound * roundPrizeIncreaseStep
        const maxAttempts = 3

        const reward = runGameRound(roundPrice, totalPrise, roundRange, maxAttempts)
        currentRound++

        if (reward !== null) {
            totalPrise += reward
            userWantToPlayNextRound = confirm(`Congratulation, you won! \nYour prize is ${totalPrise}. ` + 
            `Do you want to continue?`)

            if (!userWantToPlayNextRound) {
                alert(`Thank you for your participation. Your prize is: ${totalPrise}`)

                if (confirm('Do you want to play again?')) {
                    resetGame()
                }
            }
        } else {
            if (confirm('Do you want to play again?')) {
                resetGame()
            } else {
                userWantToPlayNextRound = false
            }
        }
    }

}

if (confirm('Do you want to play a game?')) {
    runGame()
} else {
    alert('You did not become a billionaire, but can.')
}
