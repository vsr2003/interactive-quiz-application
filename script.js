// List of quiz questions
const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: 2,
      description: "Paris is the capital and largest city of France, known for its iconic Eiffel Tower and rich cultural heritage."
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1,
      description: "Mars appears red because of iron oxide (rust) on its surface, earning it the nickname 'The Red Planet'."
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
      correctAnswer: 2,
      description: "Leonardo da Vinci painted the Mona Lisa between 1503 and 1519. It is now displayed in the Louvre Museum."
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correctAnswer: 3,
      description: "The Pacific Ocean is the largest and deepest ocean on Earth, covering approximately 63 million square miles."
    },
    {
      question: "Which element has the chemical symbol 'Au'?",
      options: ["Silver", "Gold", "Copper", "Aluminum"],
      correctAnswer: 1,
      description: "Au comes from the Latin word 'aurum', meaning gold. It's a precious metal used in jewelry and electronics."
    }
  ];
  
  // State variables to keep track of quiz progress
  let state = {
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    timeRemaining: 15,
    isAnswered: false,
    isFinished: false,
    timer: null
  };
  
  // All the DOM elements 
  let elements = {};
  
  function setupElements() {
    elements = {
      quiz: document.getElementById('quiz'),
      results: document.getElementById('results'),
      questionCounter: document.querySelector('.question-counter'),
      questionText: document.querySelector('.question-text'),
      optionsContainer: document.querySelector('.options-container'),
      timerText: document.querySelector('.timer-text'),
      progressFill: document.querySelector('.progress-fill'),
      answerDescription: document.querySelector('.answer-description'),
      nextButton: document.querySelector('.next-button'),
      nextButtonContainer: document.querySelector('.next-button-container'),
      finalScore: document.querySelector('.final-score'),
      restartButton: document.querySelector('.restart-button')
    };
  
    elements.nextButton.addEventListener('click', handleNext);
    elements.restartButton.addEventListener('click', resetQuiz);
  }
  
  function startQuiz() {
    showQuestion();
    startTimer();
  }
  
  function showQuestion() {
    const question = questions[state.currentQuestionIndex];
  
    // Show question progress
    elements.questionCounter.textContent = `Question ${state.currentQuestionIndex + 1} of ${questions.length}`;
    elements.progressFill.style.width = `${((state.currentQuestionIndex + 1) / questions.length) * 100}%`;
    elements.questionText.textContent = question.question;
  
    // Show options
    elements.optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.className = 'option-button';
      button.textContent = option;
      button.addEventListener('click', () => handleAnswer(index));
      elements.optionsContainer.appendChild(button);
    });
  
    // Reset view
    elements.answerDescription.classList.add('hidden');
    elements.nextButtonContainer.classList.remove('hidden'); 
    elements.nextButton.textContent = 'Next Question';
  }
  
  function startTimer() {
    state.timeRemaining = 15;
    updateTimer();
  
    clearInterval(state.timer);
    state.timer = setInterval(() => {
      state.timeRemaining--;
      updateTimer();
  
      if (state.timeRemaining <= 0) {
        clearInterval(state.timer);
        handleTimeout();
      }
    }, 1000);
  }
  
  function updateTimer() {
    elements.timerText.textContent = `${state.timeRemaining}s`;
  }
  
  function handleAnswer(selectedIndex) {
    if (state.isAnswered) return;
  
    const current = questions[state.currentQuestionIndex];
    const isCorrect = selectedIndex === current.correctAnswer;
  
    state.isAnswered = true;
    state.answers.push(selectedIndex);
    if (isCorrect) state.score++;
  
    clearInterval(state.timer);
    showAnswer();
  }
  
  function handleTimeout() {
    state.isAnswered = true;
    showAnswer();
  }
  
  function showAnswer() {
    const current = questions[state.currentQuestionIndex];
    const buttons = elements.optionsContainer.querySelectorAll('.option-button');
  
    buttons.forEach((button, index) => {
      button.disabled = true;
      if (index === current.correctAnswer) {
        button.classList.add('correct');
      } else if (index === state.answers[state.currentQuestionIndex]) {
        button.classList.add('incorrect');
      }
    });
  
    elements.answerDescription.textContent = current.description;
    elements.answerDescription.classList.remove('hidden');
  
    if (state.currentQuestionIndex === questions.length - 1) {
      elements.nextButton.textContent = 'Finish Quiz';
    }
  }
  
  function handleNext() {
    if (state.currentQuestionIndex === questions.length - 1) {
      finishQuiz();
    } else {
      state.currentQuestionIndex++;
      state.isAnswered = false;
      showQuestion();
      startTimer();
    }
  }
  
  function finishQuiz() {
    elements.quiz.classList.add('hidden');
    elements.results.classList.remove('hidden');
    elements.finalScore.textContent = `Your score: ${state.score} out of ${questions.length}`;
  }
  
  function resetQuiz() {
    state = {
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      timeRemaining: 15,
      isAnswered: false,
      isFinished: false,
      timer: null
    };
  
    elements.quiz.classList.remove('hidden');
    elements.results.classList.add('hidden');
    startQuiz();
  }
  
  // Start everything
  document.addEventListener('DOMContentLoaded', () => {
    setupElements();
    startQuiz();
  });
  