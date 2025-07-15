// --- Quiz Data ---
const quizData = [
    {
        question: "Who is the 1st Prime Minister of India?",
        answers: [
            { text: "Gandhi", correct: false },
            { text: "Sardar V Patel", correct: false },
            { text: "J Nehru", correct: true },
            { text: "Rajendra Prasad", correct: false }
        ]
    },
    {
        question: "'M' in MEAN Stack stands for ? ",
        answers: [
            { text: "Mangoose", correct: false },
            { text: "Mangos", correct: false },
            { text: "MongoDB", correct: true },
            { text: "Miracle", correct: false }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true }
        ]
    },
    {
        question: "Which is Leap Year?",
        answers: [
            { text: "2020", correct: true },
            { text: "2023", correct: false },
            { text: "2027", correct: false },
            { text: "2019", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for Gold?",
        answers: [
            { text: "Ag", correct: false },
            { text: "Go", correct: false },
            { text: "Au", correct: true },
            { text: "Gd", correct: false }
        ]
    }
];


// Getting references to all the necessary HTML elements.
const questionSection = document.getElementById('question-section');
const scoreSection = document.getElementById('score-section');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const progressText = document.getElementById('progress-text');
const scoreText = document.getElementById('score-text');
const scoreFeedback = document.getElementById('score-feedback');


// Variables to keep track of the quiz's current state.
let currentQuestionIndex = 0;
let score = 0;

// --- Functions ---

// Starts the quiz by resetting state and showing the first question.
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreSection.classList.add('hidden');
    questionSection.classList.remove('hidden');
    nextBtn.disabled = true;
    nextBtn.textContent = 'Next';
    showQuestion();
}

// Displays the current question and its answer options.
function showQuestion() {
    resetState();
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;

    // Create a button for each answer option.
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('answer-btn', 'w-full', 'p-4', 'border-2', 'border-slate-300', 'rounded-lg', 'text-left', 'text-slate-700', 'font-medium', 'hover:bg-slate-100', 'hover:border-indigo-400');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

// Resets the state of answer buttons and the next button before showing a new question.
function resetState() {
    nextBtn.disabled = true;
    // Clear out any old answer buttons.
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

/**
 * Handles the logic when a user clicks an answer.
 * @param {Event} e The click event object.
 */
function selectAnswer(e) {
    const selectedBtn = e.target;
    // e.target
    const isCorrect = selectedBtn.dataset.correct === 'true';

    if (isCorrect) {
        score++;
    }

    // Provide visual feedback for all buttons (green for correct, red for incorrect).
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        } else {
            button.classList.add('incorrect');
        }
        button.disabled = true; // Disable all buttons after an answer is selected.
    });

    nextBtn.disabled = false; // Enable the next button.
}

// Shows the final score and feedback at the end of the quiz.
function showScore() {
    questionSection.classList.add('hidden');
    scoreSection.classList.remove('hidden');
    progressText.textContent = 'Quiz Completed!';
    nextBtn.disabled = true;

    scoreText.textContent = `You scored ${score} out of ${quizData.length}!`;

    // Provide different feedback messages based on the user's score.
    let feedback = '';
    const percentage = (score / quizData.length) * 100;
    if (percentage === 100) {
        feedback = "Perfect! You're a genius! 🥳";
    } else if (percentage >= 80) {
        feedback = "Great job! You really know your stuff. 👍";
    } else if (percentage >= 50) {
        feedback = "Not bad! A little more practice and you'll be an expert. 😊";
    } else {
        feedback = "Good effort! Keep learning and try again. 📚";
    }
    scoreFeedback.textContent = feedback;
}

// Moves to the next question or ends the quiz if it's the last question.
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// Assign functions to be called on button clicks.
nextBtn.addEventListener('click', handleNextButton);
restartBtn.addEventListener('click', startQuiz);

// Start the quiz as soon as the page content has fully loaded.
document.addEventListener('DOMContentLoaded', startQuiz);
