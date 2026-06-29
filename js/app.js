const board = document.querySelector('.board');

// console.log(board)

/// create board 
let c = 1;
for (let i = 1; i <= 9; i++) {
    
    
    let r = 1;
    for (let j = 1; j <=9; j++) {
        
        if ( (c >= 1 && c <= 3) ||(9*c >= 10 && 9*c+3 <= 12) ||(c >= 19 && c <= 21)) {r = 1;}
        else if ((c >= 4 && c <= 6) ||(c >= 13 && c <= 15) ||(c >= 22 && c <= 24)) {r = 2;}
        else if ((c >= 7 && c <= 9) ||(c >= 16 && c <= 18) ||(c >= 25 && c <= 27)) {r = 3;}
        
        else if ((c >= 28 && c <= 30) ||(c >= 37 && c <=39) ||(c >= 46 && c <= 48)) {r = 4;}
        else if ((c >= 31 && c <= 33) ||(c >= 40 && c <= 42) ||(c >= 49 && c <= 51)) {r = 5;}
        else if ((c >= 34 && c <= 34) ||(c >= 43 && c <= 45) ||(c >= 52 && c <= 52)) {r = 6;}
        
        else if ((c >= 55 && c <= 57) ||(c >= 64 && c <= 66) ||(c >= 73 && c <= 75)) {r = 7;}
        else if ((c >= 58 && c <= 60) ||(c >= 67 && c <= 69) ||(c >= 76 && c <= 76)) {r = 8;}
        else if ((c >= 61 && c <= 63) ||(c >= 70 && c <= 72) ||(c >= 79 && c <= 81)) {r = 9;}
        
        
        board.innerHTML += 
        
        
    //     `<input
    // id="${c}" class="sqr box${r}
    // type="text"
    // maxlength="1"></input>` 
        
        
        `<div id="${c}" class="sqr box${r} " > </div>`
        
        c++
    }
    
    
    
}

const squareEls  = document.querySelectorAll('.sqr');
const Numbers  = document.querySelectorAll('.num');

let selectdNumbers=null ;

function handleClick(event) {

    if(event.target.classList.contains("num"))  {
         selectdNumbers = event.target.textContent;
        console.log("Selected:",selectdNumbers)  
        return ;
    }
    
    
    if (event.target.classList.contains("sqr")) {
                
        if(selectdNumbers==null)
          {return}
   
        event.target.textContent = selectdNumbers;
    }    
   selectdNumbers=null
    
}




squareEls.forEach((sql)=>{
 sql.addEventListener('click', handleClick)
      
})
Numbers.forEach((num)=>{
 num.addEventListener('click', handleClick)
      
})







