// Create Var: Game Values
// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNumber(min, max),
  guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if won
  else if (guess === winningNum) {
    // Game over - won
    gameOver(true, `Congrats! ${winningNum} is correct!`);

    // Check If Lost
  } else {
    // Takes away 1 guess
    guessesLeft -= 1;

    // // Change Border Color
    guessInput.style.borderColor = 'red';

    // If guesses reach 0
    if (guessesLeft === 0) {
      gameOver(false, `Sorry! ${winningNum} was the winning number!`);
      // Guess Continues, Answers Wrong
    } else {
      // Change Border Color
      guessInput.style.borderColor = 'red';

      // Clear Value After Submission
      guessInput.value = '';

      // Tells User Num Is Wrong
      setMessage(
        `${guess} is wrong! You have ${guessesLeft} guesses left!`,
        'red'
      );
    }
  }
});

// Game Over
function gameOver(won, msg) {
  let color;
  won === true ? (color = 'green') : (color = 'red');

  // Disable input
  guessInput.disabled = true;

  // Change border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Set message
  setMessage(msg);

  // PLay Again?
  guessBtn.value = 'Play Again';
  // Append Class
  guessBtn.className += 'play-again';
}

// Get Winning Number
function getRandomNumber(min, max) {
  // 10 - 9 + 1 + min
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set Message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
