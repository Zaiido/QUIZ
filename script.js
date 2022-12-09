// RULES:
// The player must guess correctly a certain amount of questions
// Each correct answer gives him one point
// Answers could be multiple or true/false
// At the end of the game, the user must know his/her total score

// QUESTIONS:
// You can get them from this URL ( http://bit.ly/strive_QUIZZ ) or you can write your own
// Could be multiple or boolean (true / false)

// HINTS:
// Keep a global variable score for the user score
// Keep a variable questionNumber for the question the user is answering
// When questionNumber is bigger then the available questions, present the score
// Start working with the questions saved in a variable (or you can use AJAX for fetching external questions if you already know how to do it!)
// Start with the easier version and THEN implement the EXTRAs
// Please debug everything / try it on the console to be sure of what to expect from your code

// EXTRA:
// Show if the answer provided was the wrong one or correct it after clicking
// Present the questions one at a time instead of having all of them displayed together
// Let the user select difficulty and number of questions (you can get q/a from https://opentdb.com/api.php?amount=10&category=18&difficulty=easy modifying amount and difficulty)

/* WHEN YOU ARE FINISHED
  Commit and push the code to your personal GitHub repository; then post the link of your commit on the Homework section of today's Eduflow.
*/

const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

let questionContainerNode = document.getElementById("question-container");
let continueButtonNode = document.getElementById("continue-button");

let score = 0;
let questionNumber = 0;
let userSelectedAnswer = "";

function questionOutOf() {
  let h2Node = document.createElement("h2");
  h2Node.innerText = `Question ${questionNumber}/${questions.length}`;
  questionContainerNode.appendChild(h2Node);
}

function generateQuestion(currentQuestion) {
  let questionNode = document.createElement("h3");
  questionNode.innerText = currentQuestion.question;
  questionNode.classList.add("question");
  questionContainerNode.appendChild(questionNode);
}

function checkAnswer(answer) {
  let correctAnswer = questions[questionNumber - 1].correct_answer;
  console.log(answer + "===" + correctAnswer);
  return answer === correctAnswer;
}

function getAnswer(eventData) {
  if (eventData.pointerId === 1) {
    userSelectedAnswer = "";
    let userAnswer = eventData.target.innerText;
    userSelectedAnswer = userAnswer;

    let previouslySelected = document.querySelector(".selected");
    if (previouslySelected !== null) {
      previouslySelected.classList.remove("selected");
    }
    eventData.target.classList.add("selected");
  }
}

function buildAnswerDivs(answersArray) {
  for (let answer of answersArray) {
    // console.log(answer);
    let labelNode = document.createElement("label");
    labelNode.classList.add("answer-container");
    labelNode.innerHTML = `<input type='radio' name='quizOption'>${answer}`;
    labelNode.addEventListener("click", getAnswer);
    questionContainerNode.appendChild(labelNode);
  }
}

function generateAnswers(question) {
  let allAnswersArray = question.incorrect_answers;
  allAnswersArray.push(question.correct_answer);
  // console.log(allAnswersArray);
  if (question.type === "boolean") {
    buildAnswerDivs(allAnswersArray);
  } else {
    for (let i = allAnswersArray.length - 1; i > 0; i--) {
      var y = Math.floor(Math.random() * i);
      var temp = allAnswersArray[i];
      allAnswersArray[i] = allAnswersArray[y];
      allAnswersArray[y] = temp;
    }
    buildAnswerDivs(allAnswersArray);
  }
}

function stillHasQuestions(questionNumber) {
  return questionNumber < questions.length;
}

function controlScore(score) {
  let imgNode = document.createElement("img");
  let scoreNode = document.createElement("h1");
  if (score > 5) {
    scoreNode.innerText = `You passed! 😁 \n Your final score: ${score}`;
    imgNode.src =
      "https://media0.giphy.com/media/l2Je1Jyuhxd3caP1C/200.webp?cid=ecf05e4793ln1oasgqesbw7itj83giv03jxn9aflwz0ieg7m&rid=200.webp&ct=g";
    imgNode.classList.add("success");
  } else {
    scoreNode.innerText = `You failed! 😐 \n Your final score: ${score}`;
    imgNode.src =
      "https://media4.giphy.com/media/YTJXDIivNMPuNSMgc0/giphy.webp?cid=ecf05e47wz3s0wh0bgv15ze240g8yd45ph82pxdm7k45y6xf&rid=giphy.webp&ct=g";
    imgNode.classList.add("fail");
  }
  scoreNode.classList.add("final-score");
  questionContainerNode.appendChild(scoreNode);

  questionContainerNode.appendChild(imgNode);
}

function mainOperations() {
  if (checkAnswer(userSelectedAnswer)) {
    score += 1;
  }

  if (stillHasQuestions(questionNumber)) {
    questionContainerNode.innerHTML = "";
    let currentQuestion = questions[questionNumber];
    questionNumber++;
    questionOutOf();
    generateQuestion(currentQuestion);
    generateAnswers(currentQuestion);
  } else {
    questionContainerNode.innerHTML = "";
    continueButtonNode.classList.add("visibility");
    controlScore(score);
  }
}

function onLoadActions() {
  let currentQuestion = questions[questionNumber];
  questionNumber++;
  questionOutOf();
  generateQuestion(currentQuestion);
  generateAnswers(currentQuestion);
}

window.onload = onLoadActions;
// HINTS
//
// IF YOU ARE DISPLAYING ONE QUESTION AT A TIME
// Display the first question with the text and the radio buttons
// when the user selects an answer, pick the next question from the array and replace the old one with it
// saving the user's choice in a variable

// How to calculate the result? You can do it in 2 ways:
// If you are presenting one question at a time, just add one point or not to the user score if the selected answer === correct_answer
