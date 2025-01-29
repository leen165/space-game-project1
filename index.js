const ship = document.querySelector("#ship");
const bulletsContainer = document.querySelector("#bullets");
const obstaclesContainer = document.querySelector("#obstacles")
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
       bulletTop = bulletTop - 20;
       newBullet.style.top = bulletTop + "px";
       newBullet.style.display = "block";
     //distroy the bullets
       if(bulletTop == -2000){
        newBullet.remove();
     //clear the interval
      clearInterval(timer);
     }       
    },90);

}
function loadObs(){
    let obstacles = document.querySelectorAll(".obstacle");
    while(obstacles.length < 5 ){
        //add an obstacle to the list 
        creatObstacles();
       obstacles ++;
    } 
}
function creatObstacles() {

    const newObstacle = document.createElement("div");
    newObstacle.className = "obstacle";
    newObstacle.color = "red";
    newObstacle.style.left = Math.random() * (window.innerWidth - 50) + "px"; 
    //newObstacle.style.bottom = "100%"; 
    newObstacle.style.display = "block";
    obstaclesContainer.appendChild(newObstacle);

    let obstacleTop = 5  ;

    let obstimer = setInterval(() => {
       obstacleTop = obstacleTop + 20;
       newObstacle.style.top = obstacleTop + "px";
       newObstacle.style.display = "block";
     //distroy the bullets
       if(obstacleTop > 800 ){
        newObstacle.remove();
     //clear the interval
      clearInterval(obstimer);
     }       
    },90);


}
