const target = document.getElementById('target');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const message = document.getElementById('message');
const gameContainer = document.querySelector('.game-container');

let score = 0;
let time = 30;  // seconds
let gameInterval;
let countdownInterval;

function randomPosition() {
    const containerRect = gameContainer.getBoundingClientRect();
    const maxX = containerRect.width - target.offsetWidth;
    const maxY = containerRect.height - target.offsetHeight;

    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);

    return { x, y };
}

function moveTarget() {
    const { x, y } = randomPosition();
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
}

function startGame() {
    score = 0;
    time = 30;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time: ${time}`;
    message.textContent = '';
    target.style.display = 'block';
    startBtn.disabled = true;

    moveTarget();

    gameInterval = setInterval(() => {
        moveTarget();
    }, 1000);

    countdownInterval = setInterval(() => {
        time--;
        timerDisplay.textContent = `Time: ${time}`;

        if (time <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(countdownInterval);
    target.style.display = 'none';
    message.textContent = `Game over! Your score is ${score}.`;
    startBtn.disabled = false;
}

target.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    moveTarget();
});

startBtn.addEventListener('click', startGame);
