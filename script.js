// 1. Add a fourth question to the questions data structure that has three incorrect answers and one correct answer. 
const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Madrid", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false }
    ]
  },
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true }
    ]
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Cascading Style Sheets", correct: true },
      { text: "Colorful Style Scripts", correct: false },
      { text: "Computer Style Sheets", correct: false },
      { text: "Creative Style Syntax", correct: false }
    ]
  },
  {
    question: "What is the name of the longest river in the world",
    answers: [
      { text: "Amazon River", correct: false},
      { text: "The Nile River", correct: true},
      { text: "The Congo River", correct: false },
      { text: "The Indus River", correct: false}
    ]
  }
];

// 2. How do we know what id to search for when using document.getElementById()? Where are the following ids specified in index.html? 
// Inside the Quiz container class, the ids question, answer-buttons, next-btn, hint-btn are defined. We get the relevant ids from the index.html code.  
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const hintButton = document.getElementById("hint-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.textContent = "Next";
  hintButton.textContent = "Hint";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    // 3. Why are these HTML elements being created dynamically in the JS file, while other page elements are defined statically in the HTML file?
    // Creating dynamic HTML elements allows us to dynamically respond to user inputs. More concretly during quiz play, we have to select the answers,  
    // and depending on our answers, we get dynamic response.
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    // 4. What is the line below doing? 
    // When I commented out the line below, the optional answers did not show. 
    // This line adds the text in our memory to the display in Live View. It is adding
    // the newly created button on line 68 to display on the screen. 
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  hintButton.style.display = "block";
  answerButtonsElement.innerHTML = "";
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  Array.from(answerButtonsElement.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  // 5. Why is it important to change the display styling rule for the "Next" button to "block" here? What would happen if you did not have this line?
  //  If we comment out the line below, the next button does not show. 
  // Adding this line displays the Next button to have a block shape, which allows us to click it and move to the next question.
  nextButton.style.display = "block";
  hintButton.style.display = "none";
}

function showScore() {
  resetState();
  questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
  nextButton.textContent = "Restart";
  hintButton.style.display = "none";
  nextButton.style.display = "block";

}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function handleHintButton() {
  const buttons = Array.from(answerButtonsElement.children);
  const incorrectButtons = buttons.filter(btn => btn.dataset.correct !== "true" && !btn.classList.contains("wrong"));

  if (incorrectButtons.length > 0) {
    const randomIndex = Math.floor(Math.random() * incorrectButtons.length);
    const chosenButton = incorrectButtons[randomIndex];
    
    chosenButton.classList.add("wrong");
    chosenButton.disabled = true;

  }

  hintButton.style.display = "none";
}

// 6. Summarize in your own words what you think this block of code is doing. 
// This block is activated if we click the Next button. If we click the next button and we have 
// not run out of questions yet (current question index < total number of questions), the function calls
// the handleNextButton function which shows either the next set of questions or the 
// score card.  If we have run out of questions, it restarts. 

nextButton.addEventListener("click", () => { 
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

hintButton.addEventListener("click", () => { 
  handleHintButton()
});


startQuiz();
