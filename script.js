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
let answersContainer = document.getElementsByClassName(
  "answers-main-container"
)[0];
let continueButtonNode = document.getElementById("continue-button");
let labelNodes = document.getElementsByTagName("label");

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
  return answer === correctAnswer;
}

function getAnswer(eventData) {
  userSelectedAnswer = eventData.target.innerText;
  eventData.target.parentElement.classList.remove("not-selected");

  let notSelectedAnswers = document.getElementsByClassName("not-selected");
  for (let notSelectedAnswer of notSelectedAnswers) {
    notSelectedAnswer.classList.add("disable-answers");
  }
  if (checkAnswer(userSelectedAnswer)) {
    eventData.target.parentElement.classList.add("correct-answer");
    score += 1;
  } else {
    eventData.target.parentElement.classList.add("false-answer");
    for (let label of labelNodes) {
      if (label.innerText === questions[questionNumber - 1].correct_answer) {
        label.parentElement.classList.add("correct-answer");
      }
    }
  }
}

function buildAnswerDivs(answersArray) {
  let answersMainDivNode = document.createElement("div");
  answersMainDivNode.classList.add("answers-main-container");
  questionContainerNode.appendChild(answersMainDivNode);
  for (let i = 0; i < answersArray.length; i++) {
    let divNode = document.createElement("div");
    divNode.classList.add("answer-container");
    divNode.classList.add("not-selected");
    divNode.innerHTML = `<input type='radio' name='quizOption' id='radio${i}'><label for='radio${i}'>${answersArray[i]}</label>`;
    document
      .getElementsByClassName("answers-main-container")[0]
      .appendChild(divNode);
  }
  for (let label of labelNodes) {
    label.addEventListener("click", getAnswer);
  }
}

function generateAnswers(question) {
  let allAnswersArray = question.incorrect_answers;
  allAnswersArray.push(question.correct_answer);

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

function stillHasQuestions(questionNumber) {
  return questionNumber < questions.length;
}

function mainOperations() {
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
