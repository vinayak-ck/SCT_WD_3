const answerList = document.getElementById("answers-list");
const data = JSON.parse(localStorage.getItem("quizAnswers")) || [];

data.forEach((item, i) => {
  const card = document.createElement("div");
  card.className = "answer-card";

  const userAnswer = Array.isArray(item.userAns)
    ? item.userAns.join(", ")
    : item.userAns;

  const correctAnswer = Array.isArray(item.correctAns)
    ? item.correctAns.join(", ")
    : item.correctAns;

  const correct = userAnswer.toLowerCase() === correctAnswer.toLowerCase();

  card.innerHTML = `
    <p><strong>Q${i + 1}:</strong> ${item.question}</p>
    <p>Your Answer: <span class="${correct ? "correct" : "incorrect"}">${userAnswer}</span></p>
    <p>Correct Answer: <span class="correct">${correctAnswer}</span></p>
  `;
  answerList.appendChild(card);
});
