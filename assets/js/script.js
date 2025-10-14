//declare global variables. Not completed in this order
var body = document.body;
var clock = document.querySelector(".clock");
var questionElement = document.getElementById("questions");
//text for the start button
var h1 = document.createElement("h1");
h1.textContent = "Welcome to the Full Stack Code Quiz!"
var h2 = document.createElement("h2");
h2.textContent = "Test your knowledge of the tools used for full stack web develpment. Click anywhere in this box to begin.";
document.getElementById("showScoresButton").addEventListener("click", displayScores)

//create start button
var startButton = document.createElement("button");
startButton.setAttribute("style", "background: lightcyan; color: black;");
startButton.appendChild(h1);
startButton.appendChild(h2);

//create input box and button to enter name for leaderboard
var nameInput = document.createElement("input");
nameInput.setAttribute("type", "text");
nameInput.setAttribute("id", "input");
nameInput.setAttribute("style", "width: 50%; margin-right: 50%; margin-bottom: 3px");
var enterButton = document.createElement("button");
enterButton.textContent = "OK";

//create answer button array
var choiceElements = [
  document.getElementById("button1"),
  document.getElementById("button2"),
  document.getElementById("button3"),
  document.getElementById("button4")
];

//create and add function to play again button 
var playAgain = document.createElement("button");
playAgain.textContent = "Play Again"
playAgain.addEventListener("click", reload)
function reload() {
  location.reload()
}
// sets time limit for quiz
let timeLeft = 1045;
//begins the questions at index 0
let questionIndex = 0;

let score = 0;
//question and answer array. correct shows the index of the correct answer.
// var quiz = [
//     {
//       question: "Which programming language is used to build the basic framework of a web page?",
//       choices: ["JavaScript", "HTML", "CSS", "Python"],
//       correctAnswer: "button2"
//     },
//     {
//       question: "Which pogramming language is used to add style elements like fonts, colors, and sizing to a webpage?",
//       choices: ["JavaScript", "HTML", "CSS", "Python"],
//       correctAnswer: "button3"
//     },
//     {
//       question: "Which element is not a proper CSS selector?",
//       choices: ["#footer", "footer", "%footer", ".footer"],
//       correctAnswer: "button3"
//     },
//     {
//       question: "Which element is a Class Selector?",
//       choices: ["#footer", "footer", "%footer", ".footer"],
//       correctAnswer: "button4"
//     },
//     {
//       question: "Which element is an ID Selector?",
//       choices: ["#footer", "footer", "%footer", ".footer"],
//       correctAnswer: "button1"
//     },
//     {
//       question: "Which language is used to add interactivity to a webpage built with HTML?",
//       choices: ["CSS", "JavaScript", "R", "Kotlin"],
//       correctAnswer: "button2"
//     },
//     {
//       question: "Which of the following is the preferred declaration of a JavaScript variable that will never change?",
//       choices: ["var x = 1", "const x = 1", "x = 1", "let x = 1"],
//       correctAnswer: "button2"
//     },
//     {
//       question: "What is the correct way to write a comment in JavaScript?",
//       choices: [`!\<-- This is a comment--\> `, `/* This is a comment */`, `// This is a comment`, `# This is a comment`],
//       correctAnswer: "button3"
//     },
//     {
//       question: "Which of the following is NOT a valid JavaScript loop?",
//       choices: ["for loop", "while loop", "repeat loop", "do-while loop"],
//       correctAnswer: "button3"
//     },
//     {
//       question: "What does the `===` operator in JavaScript represent?",
//       choices: ["Equality", "Assignment", "Logical OR", "Strict equality"],
//       correctAnswer: "button4"
//     },
//     {
//       question: "How do you write an if statement in JavaScript?",
//       choices: ["if (condition) { // code to execute }", "if { // code to execute } (condition)", "if [condition] then { // code to execute }", "if (condition) then { // code to execute }"],
//       correctAnswer: "button1"
//     },
//     {
//       question: "Which method is used to add an element at the end of an array in JavaScript?",
//       choices: ["push()", "add()", "append()", "insert()"],
//       correctAnswer: "button1"
//     },
//     {
//       question: "How do you access the length of an array in JavaScript?",
//       choices: ["array.size", "array.length", "array.count", "array.length()"],
//       correctAnswer: "button2"
//     },
//     {
//       question: "How do you check the data type of a variable in JavaScript?",
//       choices: ["typeof variableName", "variableName.typeOf()", "variableName.dataType", "typeOf variableName"],
//       correctAnswer: "button1"
//     }
    
//   ];
var quiz = [
  {
    question: "Oversized fire doors must bear what kind of marking?",
    choices: ["Fire door label", "Manufacturer test standard and finish classification", "Manufacturer test standards", "Manufacturer test standard and the fire-resistance rating"],
    code_reference: "2024 IBC 716.2.9.2",
    correct_answer: "button1"
  },
  {
    question: "A type of load imposed by the designed use and operation within a structure is defined as?",
    choices: ["Dead load", "Common load", "Live load", "Shifting load"],
    code_reference: "2024 IBC 1607.3",
    correct_answer: "button3"
  }
  
]

//Functions

//shows the time remaining in the upper right corner
//this part still works. for now.
function setTime() {  
    var timerInterval = setInterval(function() {
      timeLeft--; //decrements time left by 1, every 1000ms
      clock.textContent = "You have " + timeLeft + " seconds remaining"; //displays time remaining 
      if(timeLeft < 1) {
        clearInterval(timerInterval);
        endQuiz();
      } 
    }, 1000);
  }

//displays current question with matching answer buttons
function displayQuestion () {
    var currentQuestion = quiz[questionIndex];
    var questionElement = document.getElementById("questions")
    var codeElement = document.getElementById("codeReference");
    questionElement.textContent = currentQuestion.question;
    for (let i = 0; i < currentQuestion.choices.length; i++) {
      choiceElements[i].innerHTML = currentQuestion.choices[i];
      choiceElements[i].setAttribute("style", "border: black 1px");
      choiceElements[i].addEventListener("click", answerCounter);
    }
    codeElement.textContent = currentQuestion.code_reference;
  }

//adds points to score when user answers correctly, time remaining is reduced with an incorrect answer
function answerCounter (event) {
    var userAnswer = event.target;
    console.log(userAnswer.id)
    var currentQuestion = quiz[questionIndex];
    if (userAnswer.id === currentQuestion.correct_answer){
      score++;
    } else {
      timeLeft = timeLeft - 15
    }
    
    for (i = 0; i < choiceElements.length; i++) {
      choiceElements[i].removeEventListener("click", answerCounter);
    }
    // Moves on to the next question
    questionIndex++;
    
    //Check to see if there are any more questions, and if any time remains.
    if (questionIndex < quiz.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }

  // Display finishing message and input box for user initials
function endQuiz() {
    
    questionElement.textContent = `All done! You scored ${score} out of 14. Enter your name and click OK to see the leader board.`;
    document.getElementById("answers").setAttribute("style", "display: none");
    questionElement.appendChild(nameInput);
    questionElement.appendChild(enterButton); 
    enterButton.addEventListener("click", showHighScores)
    questionElement.appendChild(playAgain)
    
  }

  // Syncs the timer with the question display
function syncTimer() {
  setTime();
  displayQuestion();
  document.getElementById("table").setAttribute("style", "display: none");
  document.getElementById("showScoresButton").setAttribute("style", "display: none")
}

  //initial function called when the page loads. Shows start button.
function start(){
    var quizbox = document.getElementById("questions")
    quizbox.appendChild(startButton)
    startButton.addEventListener("click", syncTimer);
    
  }


  //pulls leaderboard from local storage, adds new score, stores new data as leaderboard in localstorage
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
function addScore (userName, userScore) {
  leaderboard.push({userName, userScore});
  leaderboard.sort((a, b) => b.userScore - a.userScore);
  leaderboard = leaderboard.slice(0, 10);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  enterButton.removeEventListener("click", showHighScores);
}

// reads leaderboard data from local storage, 
function displayScores() {

  var leaderboardElement = document.getElementById("highScores");

  leaderboardElement.innerHTML = "";
  //sorts leaderboard by score, in descending order
  leaderboard = leaderboard.sort((a, b) => b.userScore - a.userScore);
  //creates table rows and table data to display leaderboard
  leaderboard.forEach((entry, index) => {
    var row = document.createElement("tr");

    var rankCell = document.createElement('td');
    rankCell.textContent = index + 1;
    row.appendChild(rankCell);
    
    var usernameCell = document.createElement("td");
    usernameCell.textContent = entry.userName;
    row.appendChild(usernameCell);

    var scoreCell = document.createElement("td");
    scoreCell.textContent = entry.userScore;
    row.appendChild(scoreCell);

    leaderboardElement.appendChild(row);
  });
  
  
  var table = document.getElementById("table");
  //default display is 'none' so the table is hidden unless the user chooses to see it.
  table.setAttribute("style", "display: table");
  
}

//adds newest player score to leaderboard, then displays leaderboard from local storage
function showHighScores() {
  addScore(nameInput.value, score);
  displayScores();
}

//initializes the code quiz
start()

