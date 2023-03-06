
let pelota = document.getElementById("pelota")
let positionX = pelota.style.left
let positionY = pelota.style.top

let speedX = 3
let speedY = 1

setInterval(function(){

    if(positionX < 0 || positionX + 10 > window.innerWidth){
        speedX = eval(speedX*-1)
    }
    if(positionY < 0 || positionY + 10 > window.innerHeight){
        speedY = eval(speedY*-1)
    }

    positionX = eval(positionX + speedX)
    positionY = eval(positionY + speedY)

    pelota.style.top = positionY +"px"
    pelota.style.left = positionX +"px"

},1);