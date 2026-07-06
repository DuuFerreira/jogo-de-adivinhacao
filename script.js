document.addEventListener('DOMContentLoaded', () => {
    const guessInput = document.getElementById('guessInput')
    const guessButton = document.getElementById('guessButton')
    const message = document.getElementById('message')
    const guessHistory = document.getElementById('guessHistory')
    document.getElementById('guessButton').innerText = "Adivinhar"
   
    
    
    let randomNumber = Math.floor(Math.random() * 100) + 1
    let attempts = 0
    let orderedArray = []

   document.getElementById('attempts').textContent += attempts

    guessInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
        event.preventDefault() // Evita que a página seja recarregada
        guessButton.click()
        }
    })

    guessButton.addEventListener('click', () => {
        if(document.getElementById('guessButton').innerText==="Jogar Novamente"){
            //Verifica o valor no botão, posso fazer assim ou obrigar a pagina a recarregar.
            //Mas preferi fazer desta forma ao invés de utilizar 2 botões e ficar alternando entre eles.
            //Em questões de processamento, não sei o quão relevante é, mas se for muito ruim eu arrumo posteriormente.
            document.getElementById('guessButton').innerText="Adivinhar"
        }
        const userGuess = parseInt(guessInput.value)
        attempts++
        document.getElementById('attempts').textContent = "Tentativas: "+ attempts
        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            message.textContent = 'Por favor, insira um número válido entre 1 e 100.'
            return
        }

        //Ordena o histórico de tentativas
        orderedArray.push(userGuess);
        orderedArray.sort((a, b) => a - b);
        guessHistory.innerText = orderedArray.join("\n");

        message.classList.remove('right', 'wrong')
        if (userGuess === randomNumber) {
            message.textContent = `Parabéns! Você acertou o número ${randomNumber} em ${attempts} tentativas.`
            message.classList.add('right')
            randomNumber = Math.floor(Math.random() * 100) + 1
            attempts = -1
            document.getElementById('guessButton').innerText = "Jogar Novamente"
            guessHistory.innerHTML = ''
            orderedArray = []
        } else if (userGuess < randomNumber) {
            message.textContent = 'Tente um número maior!'
            message.classList.add('wrong')
        } else {
            message.textContent = 'Tente um número menor!'
            message.classList.add('wrong')
        }
        
        guessInput.value = ''
        guessInput.focus()
    })
})
