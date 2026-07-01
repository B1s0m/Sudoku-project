const boardEl = document.querySelector('.board');
const Mistakec = document.querySelector('.Mistakes');
const timerEl = document.querySelector('.time');
const stopTimerEl = document.querySelectorAll('.stop');

const btn = document.querySelector('#btn')
const messageEl = document.querySelector('.mes')

/// create board 
let c = 1;
for (let i = 1; i <= 9; i++) {


    let r = 1;
    for (let j = 1; j <= 9; j++) {
        //    this for give each cell  box index
        if ((c >= 1 && c <= 3) || (9 * c >= 10 && 9 * c + 3 <= 12) || (c >= 19 && c <= 21)) { r = 1; }
        else if ((c >= 4 && c <= 6) || (c >= 13 && c <= 15) || (c >= 22 && c <= 24)) { r = 2; }
        else if ((c >= 7 && c <= 9) || (c >= 16 && c <= 18) || (c >= 25 && c <= 27)) { r = 3; }

        else if ((c >= 28 && c <= 30) || (c >= 37 && c <= 39) || (c >= 46 && c <= 48)) { r = 4; }
        else if ((c >= 31 && c <= 33) || (c >= 40 && c <= 42) || (c >= 49 && c <= 51)) { r = 5; }
        else if ((c >= 34 && c <= 34) || (c >= 43 && c <= 45) || (c >= 52 && c <= 52)) { r = 6; }

        else if ((c >= 55 && c <= 57) || (c >= 64 && c <= 66) || (c >= 73 && c <= 75)) { r = 7; }
        else if ((c >= 58 && c <= 60) || (c >= 67 && c <= 69) || (c >= 76 && c <= 76)) { r = 8; }
        else if ((c >= 61 && c <= 63) || (c >= 70 && c <= 72) || (c >= 79 && c <= 81)) { r = 9; }


        boardEl.innerHTML += `<div id="${c}" class="sqr box${r} " > </div>`

        c++
    }



}

// board values 
let boardQuations = [
    "", "", "", 6, 7, "", "", "", "",
    6, "", 2, "", 9, 5, "", 4, 8,
    1, 9, "", 3, "", 2, 5, "", 7,

    "", 5, "", "", 6, 1, 4, 2, 3,
    "", "", 6, "", "", 3, "", 9, 1,
    7, "", "", 9, "", 4, "", 5, 6,


    "", 6, "", "", 3, "", "", 8, 4,
    2, "", 7, 4, "", 9, "", 3, 5,
    "", 4, 5, "", "", 6, "", 7, 9
];


const boardAnswer = [
    5, 3, 4, 6, 7, 8, 9, 1, 2,
    6, 7, 2, 1, 9, 5, 3, 4, 8,
    1, 9, 8, 3, 4, 2, 5, 6, 7,

    8, 5, 9, 7, 6, 1, 4, 2, 3,
    4, 2, 6, 8, 5, 3, 7, 9, 1,
    7, 1, 3, 9, 2, 4, 8, 5, 6,

    9, 6, 1, 5, 3, 7, 2, 8, 4,
    2, 8, 7, 4, 1, 9, 6, 3, 5,
    3, 4, 5, 2, 8, 6, 1, 7, 9
];



//  set time 

let timer;
let seconds = 0;
let stopGame = false;
let isPaused = false;
//  this start timer /
function startTimer() {
    if (timer != null) return; // Already running
    timer = setInterval(() => {
        seconds++;

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        timerEl.textContent =
            "Time :" +
            String(minutes).padStart(2, "0") +
            ":" +
            String(remainingSeconds).padStart(2, "0");
    }, 1000);
}
// / ths stop game  so the gameover 
function stopTimerAndGame() {
    clearInterval(timer);
    timer = null;
    isPaused = false;


}
//  this rest timer new game 
function resetTimer() {
    clearInterval(timer);

    timer = null;
    seconds = 0;
    isPaused = false;

    timerEl.textContent = "Time :00:00";
    startTimer()
}
// this pause game  for rest ehen click the timer start when stop
function pause() {

    if (!isPaused) {
        // Pause the timer
        clearInterval(timer);
        timer = null;
        isPaused = true;
        boardEl.style.visibility = "hidden"
    } else {
        // Resume the timer
        startTimer();
        isPaused = false;
        boardEl.style.visibility = "visible"

    }

}

const squareEls = document.querySelectorAll('.sqr');
const Numbers = document.querySelectorAll('.num');

let selectdNumbers = null;



let gameOver = false;
let boxcolor;
let mistake = [];
/*-------------------------------- Functions --------------------------------*/
function updateMessage() {

    for (let i = 0; i < boardAnswer.length; i++) {
        if (Number(squareEls[i].textContent) !== boardAnswer[i]) {
            return; // not finished yet
        }
    }

    messageEl.textContent = "🎉 Congratulations! You completed the puzzle!";
    stopTimerAndGame();
    clearHighlight()
    clearboldSelelcted()
    gameOver = true;
}
function updateBoard() {
    // loop through the board variable using forEach

    boardQuations.forEach((cell, index) => {
        squareEls[index].textContent = cell
    })

}

function init() {
    console.log('init game')
    startTimer()
    updateBoard()

}




function checkBoard(numb, ind) {
    if (boardAnswer[ind.target.id - 1] == numb) {

        ind.target.textContent = selectdNumbers;
        ind.target.style.backgroundColor = "#D0F5D5"
        updateMessage()


        return true
    } else {
        ind.target.style.backgroundColor = "#F9B4C0"
        mistake.push(ind.target.id)
        Mistakec.textContent = "Mistakes :" + mistake.length + "/5";
        if (mistake.length == 5) {
            clearHighlight()
            messageEl.textContent = "😢 Game Over ! You reached 5 mistakes."
            stopTimerAndGame(); gameOver = true;
        }
        return false
    }

}







function handleClick(event) {
    if (gameOver || isPaused == true) {

        return;
    }


    boldSelelcted(event)
    if (event.target.classList.contains("num")) {
        selectdNumbers = event.target.textContent;
        console.log("Selected:", selectdNumbers)

        return;
    }


    if (event.target.classList.contains("sqr")) {

        highlightCell(event);
        if (selectdNumbers == null || !event.target.textContent == "") { return }

        checkBoard(selectdNumbers, event)

    }
    selectdNumbers = null

}



function Rest() {
    clearboldSelelcted()
    clearHighlight()
    boardEl.style.visibility = "visible"
    messageEl.textContent = ""
    isPaused = false
    resetTimer()

    mistake.forEach((e) => {
        squareEls[e - 1].style.backgroundColor = "#FFFFFF"
    })
    mistake.length = 0;
    Mistakec.textContent = "Mistakes :" + mistake.length + "/5";
    gameOver = false
    updateBoard()


}
function stopTimerFun(event) {
    clearHighlight()
    clearboldSelelcted()
    if (gameOver == true) {
        return
    }
    // console.log(event.target.id)
    if (event.target.id == "Start") {

        pause()

        event.target.style.display = "none"
        stopTimerEl.forEach((e) => {
            if (e.id == "Stop") {
                e.style.display = "block"

            }
        })

    }
    if (event.target.id == "Stop") {
        pause()
        event.target.style.display = "none"
        stopTimerEl.forEach((e) => {
            if (e.id == "Start") {
                e.style.display = "block"

            }
        })

    }

}

function clearboldSelelcted() {
    squareEls.forEach(cell => {
        cell.style.fontSize = "26px";
        cell.style.fontWeight = "normal"
    });


}
function boldSelelcted(event) {

    clearboldSelelcted()
    squareEls.forEach((cell, index) => {

        if (event.target.textContent === cell.textContent) {
            // console.log(event.target.textContent)
            cell.style.fontSize = "30px";
            cell.style.fontWeight = "bold"

        }

    }

    )
}

let chackcopy;
function clearHighlight() {
    squareEls.forEach(cell => {
        cell.style.backgroundColor = "#FFFFFF";
    });

    //    remain red for mistake cell 

    mistake.forEach(id => {

        if (squareEls[id - 1].textContent == "") {

            squareEls[id - 1].style.backgroundColor = "#F9B4C0";

        }
    });
}

function highlightCell(event) {

    const id = Number(event.target.id);

    const row = Math.floor((id - 1) / 9);
    const col = (id - 1) % 9;

    const boxcolorCopyf = event.target.classList
    const boxClass = [...boxcolorCopyf]

    //    console.log(boxClass[1])
    clearHighlight();
    //    this for check row , cloum and box 
    squareEls.forEach((cell, index) => {

        const r = Math.floor(index / 9);
        const c = index % 9;

        if (
            r === row ||
            c === col ||
            cell.classList.contains(boxClass[1])
        ) {
            cell.style.backgroundColor = "#BBDEFB";
        }
    })

    // for selected cell
    event.target.style.backgroundColor = "#64B5F6";
}



init()
/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((sql) => {
    sql.addEventListener('click', handleClick)

})
Numbers.forEach((num) => {
    num.addEventListener('click', handleClick)

})




btn.addEventListener('click', Rest)

stopTimerEl.forEach((e) => {

    e.addEventListener('click', stopTimerFun)
})



