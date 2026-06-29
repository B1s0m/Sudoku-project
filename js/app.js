const board = document.querySelector('.board');



let c=0 ;
for (let i = 0; i < 9; i++) {
     
    for (let j = 0; j < 9; j++) {
       board.innerHTML+=`<div class="sqr" >${c}</div>`
      
        console.log(c)

     c++
    }



}