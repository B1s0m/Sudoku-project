const board = document.querySelector('.board');
const Mistakec = document.querySelector('.Mistakes');
const timerEl = document.querySelector('.time');

const btn = document.querySelector('#btn')

/// create board 
let c = 1;
for (let i = 1; i <= 9; i++) {


    let r = 1;
    for (let j = 1; j <= 9; j++) {

        if ((c >= 1 && c <= 3) || (9 * c >= 10 && 9 * c + 3 <= 12) || (c >= 19 && c <= 21)) { r = 1; }
        else if ((c >= 4 && c <= 6) || (c >= 13 && c <= 15) || (c >= 22 && c <= 24)) { r = 2; }
        else if ((c >= 7 && c <= 9) || (c >= 16 && c <= 18) || (c >= 25 && c <= 27)) { r = 3; }

        else if ((c >= 28 && c <= 30) || (c >= 37 && c <= 39) || (c >= 46 && c <= 48)) { r = 4; }
        else if ((c >= 31 && c <= 33) || (c >= 40 && c <= 42) || (c >= 49 && c <= 51)) { r = 5; }
        else if ((c >= 34 && c <= 34) || (c >= 43 && c <= 45) || (c >= 52 && c <= 52)) { r = 6; }

        else if ((c >= 55 && c <= 57) || (c >= 64 && c <= 66) || (c >= 73 && c <= 75)) { r = 7; }
        else if ((c >= 58 && c <= 60) || (c >= 67 && c <= 69) || (c >= 76 && c <= 76)) { r = 8; }
        else if ((c >= 61 && c <= 63) || (c >= 70 && c <= 72) || (c >= 79 && c <= 81)) { r = 9; }


        board.innerHTML += `<div id="${c}" class="sqr box${r} " > </div>`

        c++
    }



}

// board values 
let boarD = [
    5, 3, "", 6, 7, "", "", 1, 2,
    "", "", "", 1, "", 5, 3, 4, 8,
    "", "", "", 3, 4, "", 5, 6, 7,

    "", "", "", "", "", "", "", 2, 3,
    4, "", 6, 8, 5, "", "", "", "",
    7, "", 3, "", "", 4, "", 5, 6,

    9, "", 1, 5, 3, 7, 2, 8, 4,
    2, "", 7, 4, "", 9, 6, "", 5,
    3, 4, 5, "", 8, 6, "", "", 9
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

function startTimer() {
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

function stopTimer() {
    clearInterval(timer);
}

function resetTimer() {
    clearInterval(timer);
    seconds = 0;
    timerEl.textContent = "Time :00:00";
    startTimer()
}


const squareEls = document.querySelectorAll('.sqr');
const Numbers = document.querySelectorAll('.num');

let selectdNumbers = null;



let gameOver = false;
let boxcolor;
let mistake = [];

/*-------------------------------- Functions --------------------------------*/


function updateBoard() {
    // loop through the board variable using forEach

    boarD.forEach((cell, index) => {
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

        setTimeout(() => {
            ind.target.style.backgroundColor = "#FFFFFF"
        }, 3000);
        return true
    } else {
        ind.target.style.backgroundColor = "#F9B4C0"
        mistake.push(ind.target.id)
        Mistakec.textContent = "Mistakes :" + mistake.length + "/5";
        if (mistake.length == 5) {  stopTimer();  gameOver=true;}
        return false
    }

}







function handleClick(event) {
if (gameOver  ) 
    {
        
        return;}

    if (event.target.classList.contains("num")) {
        // console.log("perboxc olor:",mistake)  
        // mistake .forEach((b)=>{b.style.backgroundColor ="##FFFFFF" })
        // mistake
        // boxC.forEach((b)=>{b.style.backgroundColor ="#FFFFFF" }) 
        selectdNumbers = event.target.textContent;
        console.log("Selected:", selectdNumbers)
        return;
    }


    if (event.target.classList.contains("sqr")) {
        // boxcolor = event.target.classList;
        // let boxC=document.querySelectorAll('.'+boxcolor[1]);
        // // console.log (event.target.classList)
        // boxC.forEach((b)=>{b.style.backgroundColor ="#BBDEFB" })

        if (selectdNumbers == null || !event.target.textContent == "") { return }


        checkBoard(selectdNumbers, event)

    }
    selectdNumbers = null

}



function Rest() {
    
    resetTimer()

    mistake.forEach((e)=>{
       squareEls[e-1].style.backgroundColor="#FFFFFF"
    })
    mistake.length = 0;
     Mistakec.textContent = "Mistakes :" + mistake.length + "/5";
     gameOver=false
    updateBoard()

    
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


