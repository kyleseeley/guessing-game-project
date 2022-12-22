const readline = require('readline')

const rl = readline.createInterface({    
    input: process.stdin,    
    output: process.stdout
});

let numAttempts = 0;

function randomInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let secretNumber =  Math.floor(Math.random() * (max - min) + min); 
    return secretNumber;
}

let askLimit = () => {
    rl.question('Enter the attempts: ', attempts => {
        attempts = Math.floor(Number(attempts))
        numAttempts = attempts;
        console.log(`The amount of attempts are ${numAttempts}`)
        askRange();
    })
}

let askRange = () => {
    rl.question('Enter in a minimum number: ', min => {
        console.log('min = ' + min)

        rl.question('Enter in a maximum number: ', max => {
            console.log('max = ' + max)

            console.log(`I'm thinking of a number between ${min} and ${max}...`)
            secretNumber = randomInRange(Number(min), Number(max))
            askGuess()
        })
    })
}

let askGuess = () => {
    rl.question('Enter a guess: ', answer => {
        let guess = checkGuess(Number(answer))
        
        if(!guess){
            numAttempts--
            if(numAttempts === 0){
                console.log('You lose.')
                // numAttempts = askLimit()
                // askRange()
                rl.close()
            } else {
                askGuess()
            }
        } else {
            console.log('You win!')
            rl.close();
        }
    })
}

let checkGuess = num => {
    if(num === secretNumber){
        console.log('Correct!')
        //console.log('You win!')
        return true
    }

    if(num > secretNumber){
        console.log('Too high.')
    }

    if(num < secretNumber){
        console.log('Too low.')
    }
    return false
}
askLimit();
askRange();
//askGuess();