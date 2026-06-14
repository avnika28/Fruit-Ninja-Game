const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const gameArea = document.getElementById("gameArea");

const scoreText = document.getElementById("score");
const timerText = document.getElementById("timer");
const livesText = document.getElementById("lives");

const gameOverScreen = document.getElementById("gameOverScreen");
const resultText = document.getElementById("resultText");
const finalScore = document.getElementById("finalScore");

const exitBtn = document.getElementById("exitBtn");

let score = 0;
let lives = 20;
let timeLeft = 60;

let gameRunning = false;

let fruitSpawner;
let timerInterval;

const fruits = [
    "🍎",
    "🍉",
    "🍓",
    "🍊",
    "🍍",
    "🥝",
    "🍒",
    "🥭"
];

function updateLives() {
    livesText.innerText = "❤️".repeat(lives);
}

function endGame(message) {

    gameRunning = false;

    clearInterval(fruitSpawner);
    clearInterval(timerInterval);

    resultText.innerText = message;
    finalScore.innerText = `Final Score : ${score}`;

    gameOverScreen.style.display = "flex";
}

function createFruit() {

    if (!gameRunning) return;

    const fruit = document.createElement("div");

    fruit.classList.add("fruit");

    fruit.innerHTML =
        fruits[Math.floor(Math.random() * fruits.length)];

    let x =
        Math.random() *
        (window.innerWidth - 100);

    let y = window.innerHeight;

    fruit.style.left = x + "px";
    fruit.style.top = y + "px";

    gameArea.appendChild(fruit);

    let speed =
        3 + Math.random() * 3;

    const move = setInterval(() => {

        y -= speed;

        fruit.style.top = y + "px";

        if (y < -100) {

            clearInterval(move);

            if (fruit.parentNode) {

                fruit.remove();

                lives--;

                updateLives();

                if (lives <= 0) {

                    endGame("💀 GAME OVER");

                }
            }
        }

    }, 20);

    fruit.addEventListener("mouseenter", () => {

        if (!gameRunning) return;

        clearInterval(move);

        score++;

        scoreText.innerText = score;

        fruit.style.transform =
            "scale(2) rotate(180deg)";

        fruit.style.opacity = "0";

        setTimeout(() => {

            if (fruit.parentNode) {
                fruit.remove();
            }

        }, 200);

        if (score >= 50) {

            if (typeof confetti === "function") {

                confetti({
                    particleCount: 300,
                    spread: 180,
                    origin: { y: 0.6 }
                });

            }

            endGame("🏆 YOU WIN! 🎉");
        }

    });
}

startBtn.addEventListener("click", () => {

    startScreen.style.display = "none";

    gameRunning = true;

    fruitSpawner =
        setInterval(createFruit, 1000);

    timerInterval =
        setInterval(() => {

            timeLeft--;

            timerText.innerText =
                "⏰ " + timeLeft;

            if (timeLeft <= 0) {

                endGame("⌛ TIME OVER");

            }

        }, 1000);

});

exitBtn.addEventListener("click", () => {

    endGame("👋 GAME EXITED");

});

updateLives();

scoreText.innerText = score;
timerText.innerText = "⏰ " + timeLeft;