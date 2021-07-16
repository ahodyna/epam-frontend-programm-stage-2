export default function resetGame() {
    document.getElementById('computerChoose').innerHTML = ''
    document.getElementById('playerChoose').innerHTML = ''
    document.getElementById('playerScore').innerHTML = 0
    document.getElementById('computerScore').innerHTML = 0
    document.getElementById('result').innerHTML = ''

    alert('Please press button "Start" or choose another button if you want to continue game:)')
}