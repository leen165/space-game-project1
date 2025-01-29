const ship = document.querySelector("#ship");
const bulletsContainer = document.querySelector("#bullets");
const obstaclesContainer = document.querySelector("#obstacles");
const playerScore = document.getElementById("score");
let score = 0;
let shipLeft = 0;
let bulletTopPos = 700;

// to move the space ship
window.addEventListener("mousemove", function (movement) {
    shipLeft = movement.x;
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

window.addEventListener("load", function(){
//load means when the game starts
loadObs();


});

function fire() {
    const shipLocation = ship.getBoundingClientRect();
    //console.log(" booo booo");
    const newBullet = document.createElement("div");
    newBullet.className = "bullet";
    bulletsContainer.appendChild(newBullet);
    newBullet.style.display = "block";
    newBullet.style.left = shipLocation.left + (shipLocation.width / 2) - 2.5 + "px";
   // newBullet.style.top = bulletTop + "px";
    
    let bulletTop =  shipLocation.top  ;

    let timer = setInterval(() => {
       bulletTop -= 20;
       newBullet.style.top = bulletTop + "px";
    // newBullet.style.display = "block";
     //distroy the bullets
       if(bulletTop < 0){
        newBullet.remove();
     //clear the interval
      clearInterval(timer);
     }  
       ifCollision(newBullet);
          
    },90);
}

function loadObs(){
    let obstacles = document.querySelectorAll(".obstacle");
    setInterval(() => {
        if (obstacles.length < 5) {
            creatObstacles();
        }
    }, 1000); 
}
function creatObstacles() {

    const newObstacle = document.createElement("div");
    newObstacle.className = "obstacle";
    newObstacle.style.left = Math.random() * (window.innerWidth - 50) + "px"; 
    //newObstacle.style.bottom = "100%"; 
    newObstacle.style.display = "block";
    obstaclesContainer.appendChild(newObstacle);

    let obstacleTop = 5  ;

    let obstimer = setInterval(() => {
       obstacleTop = obstacleTop + 20;
       newObstacle.style.top = obstacleTop + "px";
     

     //distroy the bullets
       if(obstacleTop >= 700 ){
        newObstacle.remove();

     //clear the interval
      clearInterval(obstimer);
     }       
    },90);


}

function ifCollision(bullet) {
    const bulletPosition = bullet.getBoundingClientRect();
    const allObstacles = document.querySelectorAll(".obstacle"); 
    
    allObstacles.forEach(obstacle => {
        const obstaclePosition = obstacle.getBoundingClientRect();

       //collision conditios
        if (bulletPosition.top < obstaclePosition.bottom && 
            bulletPosition.bottom > obstaclePosition.top &&
            bulletPosition.left < obstaclePosition.right &&
            bulletPosition.right > obstaclePosition.left) {
             
              
           //removing the bullet and the obstacle
            bullet.remove();
            obstacle.remove();
            triggerExplosion(obstacle);
            score ++;
             playerScore.textContent ="your score : "+ score;  
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
   
