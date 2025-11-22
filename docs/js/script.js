let mario = document.querySelector('.mario');
let pipe = document.querySelector('.pipe');
let difficulty = "easy"; // padrão
let pipeSpeed = 1500; // velocidade padrão do fácil
let gameBoard = document.querySelector('.game-board');

let startBtn = document.getElementById("btnStart");
let startScreen = document.querySelector(".start-screen");

let bestScoreElement = document.getElementById("bestScore");
let bestScore = localStorage.getItem("bestScore") || 0; //buscar no navegador um valor salvo anteriormente
bestScoreElement.innerText = bestScore;

let scoreElement = document.getElementById("score");
let score = 0;

let gameOverScreen = document.querySelector(".game-over-screen");
let restartBtn = document.getElementById("restartBtn");

document.getElementById("difficulty").addEventListener("change", function () {
    difficulty = this.value;

    if (difficulty === "easy") pipeSpeed = 1800;
    if (difficulty === "medium") pipeSpeed = 1200;
    if (difficulty === "hard") pipeSpeed = 800;

    // Atualiza animação do pipe ANTES do jogo começar
    pipe.style.animationDuration = `${pipeSpeed}ms`;
});


function jump() {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

function startGame() {
    startScreen.style.display = "none";
    // Ajusta a velocidade do pipe de acordo com a dificuldade
    pipe.style.animationDuration = `${pipeSpeed}ms`;

    score = 0;
    scoreElement.innerText = score;


    const loop = setInterval(() => {
        let pipePosition = pipe.offsetLeft;
        let marioPosition = +window.getComputedStyle(mario).bottom.replace('px', ''); //replace para tirar o px e o + para tranformar em string

        score++;
        scoreElement.innerText = score;

        if (bestScore < score) {
            bestScore = score;
            localStorage.setItem("bestScore", bestScore);
            bestScoreElement.innerText = bestScore;
        }


        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 65) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;
            mario.src = 'img/game-over.png';
            mario.style.width = '75px';
            mario.style.marginLeft = '45px';

            clearInterval(loop);
            gameOverScreen.style.display = "flex";

        }

    }, 10)
}

function resetGame() {
    // Ocultar tela de Game Over
    gameOverScreen.style.display = "none";

    // Resetar Mario
    mario.src = "img/mario.gif";
    mario.style.width = "150px";
    mario.style.bottom = "0";
    mario.style.marginLeft = "0";
    mario.style.animation = "";

    // Resetar Pipe
    pipe.style.animation = "";
    pipe.style.left = "";

    // Resetar Score
    score = 0;
    scoreElement.innerText = score;
}


document.addEventListener('keydown', jump); //quando pressionar uma teclado
startBtn.addEventListener("click", () => {
    resetGame();
    startGame();
});

restartBtn.addEventListener("click", () => {
    resetGame();
    startGame();
});
