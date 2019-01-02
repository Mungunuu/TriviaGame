var queryURL = 'https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple'
var response
var correctAnswer
var currentQuestionIndex = 0

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
  $('.question-section').empty()
  var question = response.results[currentQuestionIndex].question
  $('.question-section').text(question)
  $('.answer-options').empty()
  $('.result').empty();
  var answers = response.results[currentQuestionIndex].incorrect_answers
  correctAnswer = response.results[currentQuestionIndex].correct_answer
  answers.push(response.results[currentQuestionIndex].correct_answer)
  answers.sort(stringSort)
  for ( var j = 0; j < answers.length; j++) {
    //   console.log(answers[j])
    var answerDiv = $('<div>')
    answerDiv.addClass('answer')
    answerDiv.text(answers[j])
    const a = 'asdasd'
    answerDiv.attr('onclick', "checkAnswer('" + answers[j] + "')")
    $('.answer-options').append(answerDiv)
  }
}

function renderResult (result) {
  $('.question-section').empty()
  $('.answer-options').empty()
  var results = $('<div>');
  results.addClass('result')
  $(".result").text(result)
  results.append('<p>Incorrect: ' + incorrectAnswerPoints + '</p>')
  results.append('<p>Correct: ' + correctAnswerPoints + '</p>')
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
//   if (currentQuestionIndex >= 9) {
//     window.location.href = 'result.html?incorrect=' + incorrectAnswerPoints + '&&correct=' + correctAnswerPoints
//   }
//   renderQuestion(currentQuestionIndex)
}

function answerGiphy () {
    var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=m24wOx1shF88Z3Im8EwSiRWKgVJPifBF&limit=1&q=' + correctAnswer
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function (response) {
      $('#animals-view').empty()
  
      for (var i = 0; i < 10; i++) {
        // console.log(response)
        // console.log(response.data[i].rating)
        var animalDiv = $("<div class = 'animal'>")
        var rating = response.data[i].rating
        var pOne = $('<p>').text('Rating: ' + rating)
        animalDiv.append(pOne)
        var animatedUrl = response.data[i].images.fixed_height.url
        var stillUrl = response.data[i].images.fixed_height_still.url
  
        var image = $('<img>').attr('src', animatedUrl)
        image.addClass('gif')
        image.attr('data-state', 'animated')
  
        image.attr('data-still', stillUrl)
        image.attr('data-animated', animatedUrl)
  
        image.on('click', function () {
          var state = $(this).attr('data-state')
          if (state === 'still') {
            $(this).attr('src', $(this).attr('data-animated'))
            $(this).attr('data-state', 'animated')
          } else {
            $(this).attr('src', $(this).attr('data-still'))
            $(this).attr('data-state', 'still')
          }
        })
  
        animalDiv.append(image)
        $('#animals-view').prepend(animalDiv)
      }
    })
  }