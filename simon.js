let item = document.querySelector(".par");
let body = document.querySelector("body");
let high = document.querySelector("#h2");
let highscore = localStorage.getItem("highscore")?parseInt(localStorage.getItem("highscore")):0;
high.innerHTML = `${highscore}`;    
let one = document.querySelector("#one");
let two = document.querySelector("#two");
let three = document.querySelector("#three");
let four = document.querySelector("#four");

let arr = [one, two, three, four];
let head = document.querySelector("#para");
let started = false;
let ended = false;
let level = 0;
let currentBox = null;

let gameseq = [];
let userseq = [];
let counter = 0;

function animate(box) {
    box.style.opacity = "0";
    setTimeout(() => {
        box.style.opacity = "1";
    }, 150);
}

function checkAns(ind) {
    return userseq[ind] === gameseq[ind];
}

function endGame(){
    body.style.backgroundColor = "red";
    setTimeout(() => {
        body.style.backgroundColor = "white";
    }, 150);
    started = false;
    counter = 0;
    level = 0;
    gameseq = [];
    userseq = [];
}

function nextSequence() {
    let randomNum = Math.floor(Math.random() * 4);
    animate(arr[randomNum]);
    console.log(arr[randomNum].getAttribute("id"));
    // replaySequence();
    gameseq.push(arr[randomNum]);
}

// function replaySequence() {
//     let i = 0;
//     const interval = setInterval(() => {
//         animate(gameseq[i]);
//         i++;
//         if (i >= gameseq.length) clearInterval(interval);
//     }, 400);
// }

document.addEventListener("keypress", () => {
    if(!started){
        userseq = [];
        gameseq = [];
        counter = 0;
        started = true;
        head.innerHTML = "Level 1";
        level = 1;
        nextSequence();
    }
});

item.addEventListener("click", (e) => {
    if (arr.includes(e.target)) {
        if(counter < level) {
            userseq.push(e.target);
            if(checkAns(counter)){
                counter++;
                
                animate(e.target);
                if(counter === level){
                    userseq = [];
                    counter = 0;
                    if(level > highscore){
                        highscore = level;
                        localStorage.setItem("highscore", highscore);
                        high.innerHTML = `${highscore}`;
                    }
                    level++;
                    head.innerHTML = "Level " + level;
                    setTimeout(() => {
                        nextSequence();
                    }, 1000);
                }
            } else {
                head.innerHTML = "Game Over! Press to Restart";
                ended = true;
                endGame();
            }       
        }
    }
} );
