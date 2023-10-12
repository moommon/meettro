import { questions } from "./data.js";

const progressValueEl = document.querySelector(".progress .value");
const numberEl = document.querySelector(".number");
const questionEl = document.querySelector(".question");
const choice1El = document.querySelector(".choice1");
const choice2El = document.querySelector(".choice2");
const ttEl = document.querySelector(".question-tt");

let currentNumber = 0;
let testtype = "";

function renderQuestion() {
  if (currentNumber === questions.length) {
    showResultPage();
    return;
  }
  const question = questions[currentNumber];
  numberEl.innerHTML = question.number;
  questionEl.innerHTML = question.question;
  choice1El.innerHTML = question.choices[0].text;
  choice2El.innerHTML = question.choices[1].text;
  progressValueEl.style.width = (currentNumber + 1) * 12.5 + "%";
  ttEl.style.marginLeft = (currentNumber + 0.6) * 12.5 + "%";
}
function nextQustion(choiceNumber) {
  const question = questions[currentNumber];
  testtype = testtype + question.choices[choiceNumber].value;
  //testtype = "" + "i" == "i"+"n"=="in"
  currentNumber = currentNumber + 1;
  renderQuestion();
}
function showResultPage() {
  location.href = "./test-results.html?testtype=" + testtype; //쿼리스트링
}
choice1El.addEventListener("click", function () {
  nextQustion(0);
});
choice2El.addEventListener("click", function () {
  nextQustion(1);
});

renderQuestion();
