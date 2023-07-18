let score = 0;
let highscore = 0;
let timeLeft = 10;

$(document).ready(function() {
  let currentQuestion;
  let interval;

  let updateScore = function (amount) {
    score += amount;
    $('#score').text(score);
    if (score > highscore) {
      highscore = score;
      $('#highscore').text(highscore);
    }
  };

  let randomNumberGenerator = function(size) {
    return Math.ceil(Math.random() * size);
  }

  let questionGenerator = function() {
    let question = {};
    let num3;
    const num1 = randomNumberGenerator(10);
    const num2 = randomNumberGenerator(10);
    const equationType = randomNumberGenerator(4);
    switch (equationType) {
      case 1:
        question.answer = num1 + num2;
        question.equation = String(num1) + ' + ' + String(num2);
        break;
      case 2:
        num3 = num1 + num2;
        question.answer = num2;
        question.equation = String(num3) + ' - ' + String(num1);
        break;
      case 3:
        question.answer = num1 * num2;
        question.equation = String(num1) + ' x ' + String(num2);
        break;
      case 4:
        num3 = num1 * num2;
        question.answer = num2;
        question.equation = String(num3) + ' / ' + String(num1);
        break;
    }
    return question;
  }

  let renderNewQuestion = function() {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);
  }
  

  let checkAnswer = function (userInput, answer) {
    if(userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  }

  $('#user-input').on('keyup', function() {
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  let updateTimeLeft = function(amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
    if(timeLeft === 0) {
      clearInterval(interval);
      interval = undefined;
      alert('Time has finished! The answer was ' + currentQuestion.answer + '. You ended with ' + score + ' points. ' + (score === highscore ? 'Impresive! You got a new highscore.' : 'Try harder to reach your highscore!') + ' Your actual highscore is ' + highscore + ' points.');
      updateTimeLeft(10);
      updateScore(-score);
    }
  }

  let startGame = function() {
    if(!interval) {
      interval = setInterval(function() {
        updateTimeLeft(-1);
      }, 1000);
    }
  };

  $('#user-input').on('keyup', function() {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  renderNewQuestion();
});