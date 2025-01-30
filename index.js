const ship = document.querySelector("#ship");
const bulletsContainer = document.querySelector("#bullets");
const obstaclesContainer = document.querySelector("#obstacles");
const playerScore = document.getElementById("score");
let score = 0;
let shipLeft;
let bulletTopPos = 700;
let obstIntervalCreat;
let goSound = new Audio("game-over-arcade-6435.mp3");
let startSound = new Audio("game-music-loop-7-145285.mp3");


// to move the space ship
window.addEventListener("mousemove", function (movement) {
    shipLeft = Math.min(window.innerWidth - ship.offsetWidth, movement.x);

    ship.style.left = shipLeft + "px";
    
});

//creat shooting with space botton

window.addEventListener("keydown", function (press) {
    // making sure that the space botton was pressed
    if (press.key === " ") {
        //calling the fire function
        fire();
    }
});

window.addEventListener("load", function () {

    //load means when the game starts
    loadObs();

});

function fire() {
    const shipLocation = ship.getBoundingClientRect();
    const newBullet = document.createElement("div");
    newBullet.className = "bullet";
    bulletsContainer.appendChild(newBullet);
    newBullet.style.display = "block";
    newBullet.style.left =
        shipLocation.left + shipLocation.width / 2 - 2.5 + "px";
    // newBullet.style.top = bulletTop + "px";

    let bulletTop = shipLocation.top;

    // move bullets...
    let timer = setInterval(() => {
        bulletTop -= 20;
        newBullet.style.top = bulletTop + "px";

        //distroy the bullets
        if (bulletTop < 0) {
            newBullet.remove();
            //clear the interval
            clearInterval(timer);
        }
        ifCollision(newBullet);
    }, 50);
}

function loadObs() {
    let obstacles = document.querySelectorAll(".obstacle");
    obstIntervalCreat = setInterval(() => {
        if (obstacles.length < 5) {
            creatObstacles();
        }
        ifCollisionWithShip();
    }, 1000);
}

function creatObstacles() {
    if(creatObstacles){
        startSound.play();
    }
    const newObstacle = document.createElement("div");
    newObstacle.className = "obstacle";
    newObstacle.style.left = Math.random() * (window.innerWidth - 50) + "px";
    //newObstacle.style.bottom = "100%";
    newObstacle.style.display = "block";
    obstaclesContainer.appendChild(newObstacle);

    let obstacleTop = 0;
    let speed = 1;
    let obstimer = setInterval(() => {
        speed = Math.floor(Math.random() * (80 - 5 + 1));
        obstacleTop = obstacleTop + speed;
        newObstacle.style.top = obstacleTop + "px";

        //distroy the bullets
        if (obstacleTop >= 700) {
            newObstacle.remove();

            //clear the interval
            clearInterval(obstimer);
        }
    }, 70);

    setInterval(ifCollisionWithShip, 50);
}

function ifCollision(bullet) {
    const bulletPosition = bullet.getBoundingClientRect();
    const allObstacles = document.querySelectorAll(".obstacle");

    allObstacles.forEach((obstacle) => {
        const obstaclePosition = obstacle.getBoundingClientRect();

        //collision conditios
        if (
            bulletPosition.top < obstaclePosition.bottom &&
            bulletPosition.bottom > obstaclePosition.top &&
            bulletPosition.left < obstaclePosition.right &&
            bulletPosition.right > obstaclePosition.left
        ) {
            //removing the bullet and the obstacle
            bullet.remove();
            obstacle.remove();
            triggerExplosion(obstacle);
            score++;
            playerScore.textContent = "your score : " + score;
        }
    });
}

function triggerExplosion(obstacle) {
    const explosion = document.createElement("div");
    explosion.className = "explosion";
    explosion.style.left = obstacle.style.left;
    explosion.style.top = obstacle.style.top;
    //i hade to append it to the body so that it will show
    document.body.appendChild(explosion);

    setTimeout(() => {
        explosion.remove();
    }, 500);
}

function ifCollisionWithShip() {
    const shipPosition = ship.getBoundingClientRect();
    const allObstacles = document.querySelectorAll(".obstacle");

    allObstacles.forEach((obstacle) => {
        const obstaclePosition = obstacle.getBoundingClientRect();

        if (
            shipPosition.top < obstaclePosition.bottom &&
            shipPosition.bottom > obstaclePosition.top &&
            shipPosition.left < obstaclePosition.right &&
            shipPosition.right > obstaclePosition.left
        ) {
            gameOver();
        }
    });
}

function gameOver() {
    if (gameOver) {
        startSound.pause();
        goSound.play();
        
    }

    const gameOverScreen = document.getElementById("game-over-wrapper");
    gameOverScreen.classList.remove("hidden");

    const finalScore = document.getElementById("final-score");
    finalScore.textContent = `your score is: ${score}`;

    clearInterval(obstIntervalCreat);

    // hide the elements ship and obstacles
    document.querySelector("#ship").style.display = "none";
    document
        .querySelectorAll(".obstacle")
        .forEach((obstacle) => (obstacle.style.display = "none"));
    document
        .querySelectorAll(".bullet")
        .forEach((bullet) => (bullet.style.display = "none"));

    const restartButton = document.getElementById("restart-button");
    restartButton.addEventListener("click", restartGame);
}

function restartGame() {
    score = 0;
    playerScore.textContent = "Your score: 0";
    loadObs();
    if(restartGame){
    startSound.play();
    }
    // Show the ship
    const ship = document.querySelector("#ship");
    ship.style.display = "block";

    // Clear all obstacles and bullets
    obstaclesContainer.innerHTML = "";
    bulletsContainer.innerHTML = "";

    // Hide the game-over screen
    const gameOverScreen = document.getElementById("game-over-wrapper");
    gameOverScreen.classList.add("hidden");
}
