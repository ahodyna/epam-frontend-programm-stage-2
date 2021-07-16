import computerRandomItem from './arrayRandomItem'
import resetGame from './resetGame'
import '../scss/general.scss'
import '../scss/buttons.scss'
import '../img/rock-paper-scissor.jpg'

document.getElementById('start').addEventListener('click', () => {

    document.getElementById('rock').addEventListener('click', () => {
        document.getElementById('playerChoose').innerHTML = 'rock'
        const random = Math.floor(Math.random() * computerRandomItem.length);

        if (computerRandomItem[random] === 'paper') {
            document.getElementById('computerChoose').innerHTML = 'paper'
            let cScore = document.getElementById('computerScore')
            cScore.innerHTML = Number(cScore.innerHTML) + 1;
            document.getElementById('result').innerHTML = 'You loose'
            checkResult()
        } else if (computerRandomItem[random] === 'scissors') {
            document.getElementById('computerChoose').innerHTML = 'scissors'

            let pScore = document.getElementById('playerScore')
            pScore.innerHTML = Number(pScore.innerHTML) + 1;
            document.getElementById('result').innerHTML = 'You won'
            checkResult()
        } else {
            document.getElementById('computerChoose').innerHTML = 'rock'
            document.getElementById('result').innerHTML = 'It`s a tie!'
        }
    })
    document.getElementById('paper').addEventListener('click', () => {
        const random = Math.floor(Math.random() * computerRandomItem.length);
        document.getElementById('playerChoose').innerHTML = 'paper'

        if (computerRandomItem[random] === 'scissors') {
            document.getElementById('computerChoose').innerHTML = 'scissors'
            let cScore = document.getElementById('computerScore')
            cScore.innerHTML = Number(cScore.innerHTML) + 1;
            document.getElementById('result').innerHTML = 'You loose'

            checkResult()

        } else if (computerRandomItem[random] === 'rock') {
            document.getElementById('computerChoose').innerHTML = 'rock'
            let pScore = document.getElementById('playerScore')
            pScore.innerHTML = Number(pScore.innerHTML) + 1;
            document.getElementById('result').innerHTML = 'You won'
            checkResult()

        } else {
            document.getElementById('computerChoose').innerHTML = 'paper'
            document.getElementById('result').innerHTML = 'It`s a tie!'
        }

    })

    document.getElementById('scissors').addEventListener('click', () => {
        const random = Math.floor(Math.random() * computerRandomItem.length);
        document.getElementById('playerChoose').innerHTML = 'scissors'

        if (computerRandomItem[random] === 'rock') {
            document.getElementById('computerChoose').innerHTML = 'rock'
            let cScore = document.getElementById('computerScore')
            cScore.innerHTML = Number(cScore.innerHTML) + 1;
            document.getElementById('result').innerHTML = 'You loose'
            checkResult()
        } else if (computerRandomItem[random] === 'paper') {
            document.getElementById('computerChoose').innerHTML = 'paper'
            let pScore = document.getElementById('playerScore')
            pScore.innerHTML = Number(pScore.innerHTML) + 1;
            document.getElementById('result').innerHTML = 'You won'
            checkResult()
        } else {
            document.getElementById('computerChoose').innerHTML = 'scissors'
            document.getElementById('result').innerHTML = 'It`s a tie!'
        }

    })

})

function checkResult() {

    if (document.getElementById('playerScore').innerHTML === '3') {
        alert("Congratulations!You won!")
        resetGame()

    } else if (document.getElementById('computerScore').innerHTML === '3') {
        alert("Congratulations!Computer won!")
        resetGame()
    }
}



document.getElementById('reset').addEventListener('click', ()=>{
    resetGame()
})