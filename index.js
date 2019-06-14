// 'use strict';

let questionNum = 0;

let score = 0;

function quizTemplate() {
  if (questionNum < quizData.length) {
    return `<div class="question-${questionNum}">
    <h2>${quizData[questionNum].question}</h2>
    <form>
    <fieldset>
    <label class="answerSelection">
    <input id="userSelection" type="radio" value="${quizData[questionNum].answers[0]}" name="answer" required>
    <span>${quizData[questionNum].answers[0]}</span>
    </label>
    <label class="answerSelection">
    <input id="userSelection" type="radio" value="${quizData[questionNum].answers[1]}" name="answer" required>
    <span>${quizData[questionNum].answers[1]}</span>
    </label>
    <label class="answerSelection">
    <input id="userSelection" type="radio" value="${quizData[questionNum].answers[2]}" name="answer" required>
    <span>${quizData[questionNum].answers[2]}</span>
    </label>
    <label class="answerSelection">
    <input id="userSelection" type="radio" value="${quizData[questionNum].answers[3]}" name="answer" required>
    <span>${quizData[questionNum].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
  } else {
    quizResults();
    redoQuiz();
    $('.questionNum').text(10);
  }
}

function beginQuiz() {
  $('.startQuiz').on('click', '.startButton', function (e) {
    $('.startQuiz').css('display', 'none');
    $('.quizForm').css('display', 'block');
    $('.questionNum').text(1);
  });
}

function quizQuestion() {
  $('.quizForm').html(quizTemplate());
}

function chosenAnswer() {
  $('form').on('submit', function (e) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${quizData[questionNum].correctAnswer}`;
    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      correctAnswerSelected();
    } else {
      selected.parent().addClass('incorrect');
      wrongAnswerSelected();
    }
  });
}

function correctAnswerSelected() {
  correctAnswerFeedback();
  updateScore();
}

function correctAnswerFeedback() {
  let correctAnswer = `${quizData[questionNum].correctAnswer}`;
  let funFact = `${quizData[questionNum].fact}`;
  $('.quizForm').html(`<div class="Feedback"><h2>That\'s right!<p><span>${funFact}</span></p></h2><button type=button class="nextButton">Keep going</button></div>`);
}

function wrongAnswerSelected() {
  wrongAnswerFeedback();
}

function wrongAnswerFeedback() {
  let correctAnswer = `${quizData[questionNum].correctAnswer}`;
  let funFact = `${quizData[questionNum].fact}`;
  $('.quizForm').html(`<div class="Feedback"><h2>Sorry! The answer was <span>"${correctAnswer}"</span><p><span>${funFact}</span></p></h2><button type=button class="nextButton">Keep going</button></div>`);
}

function updateScore() {
  newScore();
  $('.score').text(score);
}

function newScore() {
  score++;
}

function nextQuestion() {
  if (questionNum < quizData.length) {
    questionNum++;
  }
  $('.questionNum').text(questionNum + 1);
}

function nextQuizQuestion() {
  $('main').on('click', '.nextButton', function (e) {
    nextQuestion();
    quizQuestion();
    chosenAnswer();
  });
}

function quizResults() {
  if (score >= 8) {
    $('.quizForm').html(`<div class="results Feedback"><h2>You must be a park ranger!</h2><p> ${score} / 10</p><button type=button class="redoButton">Take the quiz again</button></div>`);
  } else if (score < 8 && score >= 4) {
    $('.quizForm').html(`<div class="results Feedback"><h2>You have some pretty good national parks facts!</h2><p> ${score} / 10</p><button type=button class="redoButton">Take the quiz again</button></div>`);
  } else {
    $('.quizForm').html(`<div class="results Feedback"><h2>Have you ever been to a national park? Get out there and explore.</h2><p> ${score} / 10</p><button type=button class="redoButton">Take the quiz again</button></div>`);
  }
}

function redoQuiz() {
  $('main').on('click', '.redoButton', function (e) {
    location.reload();
  });
}

function newQuiz() {
  beginQuiz();
  quizQuestion();
  chosenAnswer();
  nextQuizQuestion();
}

$(newQuiz);
