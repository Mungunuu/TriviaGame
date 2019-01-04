var queryURL = 'https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple'
var response
var correctAnswer
var currentQuestionIndex = 0

var timeleft = 10
var downloadTimer = setInterval(function () {
  document.getElementById('progressBar').value = 10 - --timeleft
  if (timeleft <= 0) {
    // timeleft = 10
    renderResult('Time is up!')
    unAnswered++
    currentQuestionIndex++
  }
}, 1000)

$.ajax({
  url: queryURL,
  method: 'GET'
}).then(function (res) {
  console.log(res)
  response = res
  //   var correctAnswer = (response.results[i].correct_answer)
  //   console.log('Correct answer: ' + correctAnswer)
  renderQuestion()
})

/**
 * 
 * This function draws current question as well as it's answers
 * 
 *  @param {*} i an index for the current question  
 */

function renderQuestion () {
  timeleft = 10
  $('.giphy-result').empty()
  $('.question-section').empty()
  // renderPoints();

  var question = response.results[currentQuestionIndex].question
  $('.question-section').html('Q' + (currentQuestionIndex + 1) + ': ' + question)
  $('.answer-options').empty()
  $('.result').empty()
  var answers = response.results[currentQuestionIndex].incorrect_answers
  correctAnswer = response.results[currentQuestionIndex].correct_answer
  answers.push(response.results[currentQuestionIndex].correct_answer)
  answers.sort(stringSort)
  for ( var j = 0; j < answers.length; j++) {
    //   console.log(answers[j])
    var answerDiv = $('<div>')
    answerDiv.addClass('answer')
    answerDiv.html(answers[j])
    answerDiv.attr('onclick', "checkAnswer('" + answers[j] + "')")
    $('.answer-options').append(answerDiv)
  }
}
renderPoints();

function renderResult (correctOrIncorrect) {
  $('.question-section').empty()
  $('.answer-options').empty()
  $('.question-section').html(correctOrIncorrect + '<br>The correct answer was: ' + correctAnswer)
  // results.append('<p>Incorrect: ' + incorrectAnswerPoints + '</p>')
  // results.append('<p>Correct: ' + correctAnswerPoints + '</p>')

  answerGiphy()
  setTimeout(renderQuestion, 3000) // wait 3 seconds before continuing
}

function stringSort (a, b) {
  var x = a.toLowerCase()
  var y = b.toLowerCase()
  if (x < y) {return -1;}
  if (x > y) {return 1;}
  return 0
}
var correctAnswerPoints = 0
var incorrectAnswerPoints = 0
var unAnswered = 0

function checkAnswer (answer) {
  currentQuestionIndex++
  if (answer === correctAnswer) {
    correctAnswerPoints++
    renderResult('Correct!')
  } else {
    incorrectAnswerPoints++
    renderResult('Incorrect!')
  }
}

function answerGiphy () {
  var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=m24wOx1shF88Z3Im8EwSiRWKgVJPifBF&limit=1&q=' + correctAnswer
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    console.log(response)
    console.log(response.data[0].images.fixed_height_small.url)
    var giphyImage = $('<img>').attr('src', response.data[0].images.fixed_height.url)
    $('.giphy-result').html(giphyImage)
  })
}

function renderPoints () {

  $('.question-section').html('Correct Answers: ' + correctPoints)
  $('.question-section').append('Incorrect Answers: ' + incorrectAnswerPoints)
  $('.question-section').append('Unanswered: ' + unAnswered)
}
