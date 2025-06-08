const quizData = [
  {
    type: "single",
    question: "Who won the IPL 2025 championship?",
    options: ["Mumbai Indians", "CSK", "RCB", "GT"],
    answer: "RCB",
  },
  {
    type: "multi",
    question: "Which countries hosted major AI conferences in 2025? (Multiple answers allowed)",
    options: ["USA", "India", "Germany", "Japan"],
    answer: ["USA", "India", "Germany"],
  },
  {
    type: "text",
    question: "Name the spacecraft launched by ISRO in 2025 to study the Sun.",
    answer: "Aditya-L2",
  },
  {
    type: "single",
    question: "Which country launched the world’s first AI city in 2025?",
    options: ["UAE", "South Korea", "USA", "Singapore"],
    answer: "UAE",
  },
  {
    type: "text",
    question: "Who won the 2025 Nobel Peace Prize?",
    answer: "Greta Thunberg",
  },
];

let current = 0;
let score = 0;
let userAnswers = [];

const questionEl = document.getElementById("question");
const formEl = document.getElementById("quiz-form");
const submitBtn = document.getElementById("submit-btn");
const resultEl = document.getElementById("result");
const answerLinkEl = document.getElementById("answer-link");

function loadQuestion() {
  const q = quizData[current];
  questionEl.textContent = `Q${current + 1}. ${q.question}`;
  formEl.innerHTML = "";

  if (q.type === "single") {
    q.options.forEach(opt => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="answer" value="${opt}"> ${opt}`;
      formEl.appendChild(label);
    });
  } else if (q.type === "multi") {
    q.options.forEach(opt => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="checkbox" name="answer" value="${opt}"> ${opt}`;
      formEl.appendChild(label);
    });
  } else if (q.type === "text") {
    const input = document.createElement("input");
    input.type = "text";
    input.name = "answer";
    formEl.appendChild(input);
  }
}

function getAnswer() {
  const q = quizData[current];
  if (q.type === "single") {
    const selected = formEl.querySelector('input[name="answer"]:checked');
    return selected ? selected.value : null;
  } else if (q.type === "multi") {
    const selected = [...formEl.querySelectorAll('input[name="answer"]:checked')];
    return selected.map(cb => cb.value);
  } else if (q.type === "text") {
    return formEl.querySelector('input[name="answer"]').value.trim();
  }
}

function isCorrect(userAns, correctAns) {
  if (Array.isArray(correctAns)) {
    return (
      Array.isArray(userAns) &&
      correctAns.length === userAns.length &&
      correctAns.every(ans => userAns.includes(ans))
    );
  } else {
    return userAns.toLowerCase() === correctAns.toLowerCase();
  }
}

submitBtn.addEventListener("click", () => {
  const userAns = getAnswer();
  if (!userAns || (Array.isArray(userAns) && userAns.length === 0)) {
    alert("Please answer the question.");
    return;
  }

  const correctAns = quizData[current].answer;
  userAnswers.push({ question: quizData[current].question, correctAns, userAns });

  if (isCorrect(userAns, correctAns)) score++;

  current++;

  if (current < quizData.length) {
    loadQuestion();
  } else {
    localStorage.setItem("quizAnswers", JSON.stringify(userAnswers));
    formEl.innerHTML = "";
    questionEl.textContent = "🎯 Quiz Completed!";
    submitBtn.style.display = "none";
    const percent = Math.round((score / quizData.length) * 100);
    resultEl.innerHTML = `You scored <strong>${score} / ${quizData.length}</strong> (${percent}%)`;

    answerLinkEl.innerHTML = `<a href="answers.html" class="btn">📋 View Answers</a>`;
  }
});

loadQuestion();
