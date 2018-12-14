'use strict'
// puts questions in an array
const setQuestions = [
  {
    number: 1,
    questionText: 'Who is the player known as The Godslayer?',
    Answers: ['Leffen', 'Mango', 'S2J', 'Dabuz'],
    correctAnswer: 'Leffen',
    correctArray: 0,
  },

  {
    number: 2,
    questionText: 'Who is the player who popularized the term   "20XX"?',
    Answers: ['Mew2King', 'Amsa', 'Chudat', 'Hax$'],
    correctAnswer: 'Hax$',
    correctArray: 3,
  },

  {
    number: 3,
    questionText: 'Who is NOT one of the five Gods of melee?',
    Answers: ['Mango', 'Armada', 'Scar', 'HungryBox'],
    correctAnswer: 'Scar',
    correctArray: 2,
  },

  {
    number: 4,
    questionText: 'Who is regarded as The King of Smash?',
    Answers: ['Ryu', 'Armada', 'Ken', 'PPMD'],
    correctAnswer: 'Ken',
    correctArray: 2,
  },

  {
    number: 5,
    questionText: 'Who has the most EVO wins in melee history?',
    Answers: ['Mango', 'Armada', 'Leffen', 'Hungry Box'],
    correctAnswer: 'Mango',
    correctArray: 0,
  },

  {
    number: 6,
    questionText: 'Who is the player who pioneered pikachu?',
    Answers: ['Larry Lurr', 'Axe', 'Zero', 'Westballz'],
    correctAnswer: 'Axe',
    correctArray: 1,
  },

  {
    number: 7,
    questionText: 'What is the famous after game quote of Chudat?',
    Answers: ['Booyah', 'Good game', 'Yayuhhzz', 'None of the above'],
    correctAnswer: 'Yayuhhz',
    correctArray: 2,
  },

  {
    number: 8,
    questionText: 'Which year of EVO had the most entrants??',
    Answers: ['EVO 2016', 'EVO 2018',
      'EVO 2017', 'EVO 2015'],
    correctAnswer: 'EVO 2016',
    correctArray: 0,
  },

  {
    number: 9,
    questionText: 'Aside from Ken, who else are the only ones to have taken a set off of FlyAmanitas Ice Climbers in a tournament?',
    Answers: ['PewPewU', 'The Moon', 'Azen', 'All of the above'],
    correctAnswer: 'All of the above',
    correctArray: 3,
  },

  {
    number: 10,
    questionText: 'What does the term "JV" refer to?',
    Answers: ['Winning a tournament in second place',
      'Losing all your stocks in under a minute',
      'winning  with zero opponent-inflicted damage', 'Breaking your controller'],
    correctAnswer: 'winning with zero opponent-inflicted damage',
    correctArray: 2,
  }
];

let currentQuestionNumber = 0;
let totalQuestions = setQuestions.length;
let answersRight = 0;

// handles the start quiz button
function generateQuiz() {
  $('#start-quiz').on('click', function () {
    $('#questionPage').show();
    $('#main-screen').hide();
    $('#start-quiz').hide();
    $('#submit').show();
    $('#nextQuestion').hide();
    $('#question').show();
    $('.questionChoice').show();
    $('#question').text(setQuestions[currentQuestionNumber].questionText);
  });
}

// displays questions and answers
function generateQuestions() {
  $('.questionNum').text('Question:' + (currentQuestionNumber + 1) + '/10');
  $('.questionChoice').empty();
  $('.questionChoice').focus();
  const totalAnswers = setQuestions[currentQuestionNumber].Answers.length;
  for (let i = 0; i < totalAnswers; i++) {
    $('.questionChoice').append(
      `<input class='questionChoice' id="answer-${i}" type="radio" name='answers' tabindex ='0' value='${setQuestions[currentQuestionNumber].Answers[i]}' required>
        <label for='answer-${i}'>${setQuestions[currentQuestionNumber].Answers[i]}</label> </br>`);
  }
}

// handles if answer is right or wrong
function handleAnswers(chosenAnswer) {
  $('#rightAnswer').empty();
  $('#rightAnswer').focus();
  let correctChoice = setQuestions[currentQuestionNumber].correctArray;
  let displayAnswer = setQuestions[currentQuestionNumber].correctAnswer

  $('#rightAnswer').show();
  if (chosenAnswer === displayAnswer) {
    $('#rightAnswer').append("<h2>That is correct, great job! ");
  }

  else {
    $('#rightAnswer').append(`<h2>Sorry the correct answer is ${displayAnswer}`);
  }
}

// handles user answer submission
function submitAnswer() {
  $(document).on('submit', function (event) {
    event.preventDefault();
    var chosenAnswer = $('input[name="answers"]:checked').val();
    if ((currentQuestionNumber + 1) === totalQuestions) {
      $('#nextQuestion').text('Show Results')
    }

    $('#nextQuestion').show();
    $('#submit').hide();
    $('#question').hide();
    $('#feedback').show();
    $('#questionPage').hide();
    $('.questionScore').show();
    $('.questionChoice').hide();
    handleAnswers(chosenAnswer);
    calculateScore(chosenAnswer);
  })
};

// calculates score
function calculateScore(chosenAnswer) {
  let answer = setQuestions[currentQuestionNumber].correctAnswer;
  if (chosenAnswer === answer) {
    answersRight++
  }
  displayScore();
};

// handles user score
function displayScore() {
  $('.questionScore').text('Score:' + (answersRight) + '/10');
};

// handles next question button
function nextQuestion() {
  $('#nextQuestion').click(function (event) {

    if ((currentQuestionNumber + 1) === totalQuestions) {
      $('#submit').hide();
      $('#questionPage').hide();
      $('#feedback').hide();
      $('.sectionPage').hide();
      $('#resultsPage').show();
      $('.questionCount').hide();
      userPass();
    }

    else {
      currentQuestionNumber++;
      generateQuestions();
      $('.questionChoice').show();
      $('#nextQuestion').hide();
      $('#questionPage').show();
      $('#feedback').hide();
      $('#submit').show();
      $('.questionScore').show();
      $('#question').show();
      $('#question').text(setQuestions[currentQuestionNumber].questionText);
    }
  });
};

// handles user restarting quiz
function restartQuiz() {
  $('#restartQuiz').click(function () {
    currentQuestionNumber = 0;
    answersRight = 0;
    $('#main-screen').show();
    $('#start-quiz').show();
    hideEverything();
    generateQuestions();
    displayScore();
  });
};

// did user pass or fail?
function userPass() {
  let passingScore = 6;
  if (answersRight >= passingScore) {
    $('.passingScore').show();
    $('.failingScore').hide();
  }

  else {
    $('.failingScore').show();
    $('.passingScore').hide();
  }

};

// handles what to hide after quiz reset
function hideEverything() {
  $('#questionPage').hide();
  $('.questionCount').hide();
  $('.questionNumber').hide();
  $('#submitAnswer').hide();
  $('#resultsPage').hide();
  $('.questionCount').hide();
  $('#submit').hide();
  $('#nextQuestion').hide();
}

function handleQuiz() {
  hideEverything();
  generateQuiz();
  generateQuestions();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(handleQuiz);
