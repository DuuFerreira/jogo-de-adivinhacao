document.addEventListener('DOMContentLoaded', () => {
    const guessInput = document.getElementById('guessInput')
    const guessButton = document.getElementById('guessButton')
    const message = document.getElementById('message')
    const guessHistory = document.getElementById('guessHistory')
    const attemptsDisplay = document.getElementById('attempts')
 
    let randomNumber = generateRandomNumber()
    let attempts = 0
    let orderedArray = []

    attemptsDisplay.textContent += attempts

    guessInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
        event.preventDefault() // Evita que a página seja recarregada
        guessButton.click()
        }
    })

    guessButton.addEventListener('click', () => {
        if(message.classList.contains('right')){
            guessButton.textContent="Adivinhar"
        }
        const userGuess = Number(guessInput.value)

        updateAttempts()
        
        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            message.textContent = 'Por favor, insira um número válido entre 1 e 100.'
            return
        }

        updateHistory(userGuess)

        message.classList.remove('right', 'wrong')
        if (userGuess === randomNumber) {
            message.textContent = `Parabéns! Você acertou o número ${randomNumber} em ${attempts} tentativas.`
            message.classList.add('right')
            restart()
        } else if (userGuess < randomNumber) {
            message.textContent = 'Tente um número maior!'
            message.classList.add('wrong')
        } else {
            message.textContent = 'Tente um número menor!'
            message.classList.add('wrong')
        }

        clearInput()
        
    })

    function restart(){
        randomNumber = generateRandomNumber()
        attempts = -1
        guessButton.textContent = "Jogar Novamente"
        guessHistory.textContent = ''
        orderedArray = []
    }

    function generateRandomNumber() {
        return Math.floor(Math.random() * 100) + 1
    }

    function updateHistory(userGuess){
        orderedArray.push(userGuess);
        orderedArray.sort((a, b) => a - b);
        guessHistory.textContent = orderedArray.join("\n");
    }

    function updateAttempts(){
        attempts++
        attemptsDisplay.textContent = "Tentativas: "+ attempts
    }

    function clearInput(){
        guessInput.value = ''
        guessInput.focus()
    }
})
