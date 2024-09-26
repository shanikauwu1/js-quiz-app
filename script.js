const questions = [
  {
    question: "Who painted the famous artwork Mona Lisa?",
    anwsers: [
      { text: "Pablo Picasso", correct: false },
      { text: "Leonardo da Vinci", correct: true },
      { text: "Vincent van Gogh", correct: false },
      { text: "Michelangelo", correct: false },
    ],
  },
  {
    question:
      "What is the name of the Dutch painter who created 'The Starry Night'?",
    anwsers: [
      { text: "Claude Monet", correct: false },
      { text: "Pablo Picasso", correct: false },
      { text: "Rembrandt", correct: false },
      { text: "Vincent van Gogh", correct: true },
    ],
  },
  {
    question: "Who sculpted the famous statue of David?",
    anwsers: [
      { text: "Donatello", correct: false },
      { text: "Michelangelo", correct: true },
      { text: "Leonardo da Vinci", correct: false },
      { text: "Raphael", correct: false },
    ],
  },
  {
    question: "Who painted the ceiling of the Sistine Chapel in Vatican City??",
    anwsers: [
      { text: "Claude Monet", correct: true },
      { text: "Edgar Degas", correct: false },
      { text: "Pierre-Auguste Renoir", correct: false },
      { text: "Édouard Manet", correct: false },
    ],
  },
];

const questionDiv = document.getElementById("quiz-div");
const answerBtn = document.getElementById("answer-div");
const nextBtn = document.getElementById("next");

let currentQustionIndex = 0;
let score = 0;

function startQuiz() {
  currentQustionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQustion();
}
startQuiz();
function showQustion() {
  resetQuentionState();
  console.log(currentQustionIndex);
  let currentQustion = questions[currentQustionIndex];
  let quetionNo = currentQustionIndex + 1;
  questionDiv.innerHTML = quetionNo + ") " + currentQustion.question;

  currentQustion.anwsers.forEach((answer) => {
    //console.log(answer.text);
    const ansButton = document.createElement("button");
    ansButton.innerHTML = answer.text;
    ansButton.classList.add("btn");

    // Append the new <p> to the container
    answerBtn.appendChild(ansButton);
    // add event listner for button
    if (answer.correct) {
      ansButton.dataset.correct = answer.correct;
    }
  });
  answerBtn.addEventListener("click", selectAnswer);
}

function resetQuentionState() {
  nextBtn.style.display = "none";

  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}

function selectAnswer(e) {
  const selectBtn = e.target;

  const isCorrect = selectBtn.dataset.correct === "true";

  if (isCorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
  }

  Array.from(answerBtn.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
    nextBtn.style.display = "block";
  });
}

nextBtn.addEventListener("click", () => {
  if (currentQustionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

function handleNextButton() {
  currentQustionIndex++;
  //console.log(currentQustionIndex)
  if (currentQustionIndex < questions.length) {
    showQustion();
  } else {
    showScore();
  }
}

function showScore() {
  resetQuentionState();
  questionDiv.innerHTML = `your score is ${score} out of ${questions.length}`;
  nextBtn.style.display = "block";
  nextBtn.innerHTML = "Play Again";
}
