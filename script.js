const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const modeButtons = document.querySelectorAll('.mode-buttons button');
const quoteElement = document.getElementById('quote');
const skipQuoteBtn = document.getElementById('skipQuoteBtn');

// Debug log to check if elements are found
console.log({
    timerDisplay,
    startBtn,
    resetBtn,
    modeButtons,
    quoteElement,
    skipQuoteBtn
});

let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isRunning = false;

const quotes = [
    "\"I'm going to be King of the Pirates!\" - Monkey D. Luffy",
    "\"When do you think people die?\" - Dr. Hiluluk",
    "\"If you don't take risks, you can't create a future!\" - Monkey D. Luffy",
    "\"Being alone is more painful than getting hurt!\" - Monkey D. Luffy",
    "\"Inherited Will, The Destiny of the Age, The Dreams of the People. These are things that will not be stopped!\" - Gol D. Roger"
];

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    console.log('Start timer clicked'); // Debug log
    if (!isRunning) {
        isRunning = true;
        startBtn.textContent = 'Pause';
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft === 0) {
                clearInterval(timerId);
                isRunning = false;
                startBtn.textContent = 'Start';
                alert('Time is up! Take a break, pirate!');
                quoteElement.textContent = quotes[Math.floor(Math.random() * quotes.length)];
            }
        }, 1000);
    } else {
        clearInterval(timerId);
        isRunning = false;
        startBtn.textContent = 'Start';
    }
}

function resetTimer() {
    console.log('Reset timer clicked'); // Debug log
    clearInterval(timerId);
    isRunning = false;
    startBtn.textContent = 'Start';
    const activeButton = document.querySelector('.mode-buttons button.active');
    timeLeft = parseInt(activeButton.dataset.time) * 60;
    updateDisplay();
}

function updateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = quotes[randomIndex];
}

modeButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('Mode button clicked:', button.dataset.time); // Debug log
        modeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        timeLeft = parseInt(button.dataset.time) * 60;
        updateDisplay();
        clearInterval(timerId);
        isRunning = false;
        startBtn.textContent = 'Start';
    });
});

// Add event listeners and confirm they're attached
startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
skipQuoteBtn.addEventListener('click', updateQuote);

// Initial display update
updateDisplay(); 