let o_score=0;
let x_score=0;
display_score();
start_game();

function start_game(){
    let game_board=document.querySelector("#game_board");
    game_board.innerHTML=`<div class="place"><img src="" alt=""></div>
                    <div class="place"><img src="" alt=""></div>
                    <div class="place"><img src="" alt=""></div>
                    <div class="place"><img src="" alt=""></div>
                    <div class="place"><img src="" alt=""></div>
                    <div class="place"><img src="" alt=""></div>
                    <div class="place"><img src="" alt=""></div>
                    <div class="place"><img src="" alt=""></div>
                    <div class="place"><img src="" alt=""></div>`
    
  
    let random =[Math.round(Math.random())];
    turn.innerHTML=random===0?`<img src="letter-o.png" alt="">'s turn`:`<img src="close.png" alt="">'s turn`
    let turn_image = document.querySelector("#turn img");
    instruction(random[random.length-1],turn_image);
    
    
    let arr = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    
    let place = document.querySelectorAll(".place");
    let counter = [0];
    
    place.forEach((element) => {
        element.addEventListener('click', (e) => main_function(e, counter, random,turn_image,place,arr));
    }); 
}


function main_function(e, counter, random,turn_image,place,arr) {
    
    let index = Array.from(place).indexOf(e.target);
    let image = document.querySelectorAll(".place img");

    if (arr[Math.floor(index / 3)][index % 3] !== null) {

        return;
    }

    arr[Math.floor(index / 3)][index % 3] = random[random.length-1];

    image[index].src = random[random.length-1] === 0 ? `letter-o.png` : `close.png`;

    if (check_win(arr,random[random.length-1])) {
        let turn = document.querySelector("#turn");
        turn.innerText = `Player ${random[random.length-1] === 0 ? "O" : "X"} Wins!`;

        let audio = new Audio("victory.mp3");
        audio.play();

        place.forEach(el => el.removeEventListener('click', main_function));

        random[random.length-1]===0? o_score++ : x_score++;
        display_score();
        setTimeout(()=>next_page(random[random.length-1]),1500)
    } 
    else if (counter[counter.length-1] === 8) {
        let turn = document.querySelector("#turn");
        turn.innerText = "It's a draw";

        let audio = new Audio("draw.mp3");
        audio.play();
        setTimeout(start_game,1500)
    } 
    else {
       let random1=random[random.length-1]===0? 1: 0;
      random.push(random1)
        instruction(random[random.length-1],turn_image);
    }

    counter.push(counter[counter.length-1]+1);
    e.target.removeEventListener('click', main_function);
}

function check_win(arr,random) {
    for (let i = 0; i < 3; i++) {
        if (arr[i][0] === random && arr[i][1] === random && arr[i][2] === random) {
            return true;
        }
        if (arr[0][i] === random && arr[1][i] === random && arr[2][i] === random) {
            return true;
        }
    }
    if (arr[0][0] === random && arr[1][1] === random && arr[2][2] === random) {
        return true;
    }
    if (arr[0][2] === random && arr[1][1] === random && arr[2][0] === random) {
        return true;
    }
    return false;
}



function next_page(random){
    let game_board=document.querySelector("#game_board");
    game_board.innerHTML=random===0?` <video src="o.mp4" id="video" autoplay loop disablePictureInPicture muted></video>`:` <video src="x.mp4" id="video" autoplay loop disablePictureInPicture muted></video>`;
    let background=document.querySelector("#background");
    let button=document.createElement("button");
    background.after(button);
    button.classList.add("button");
    button.innerText="Next"
    button.addEventListener('click',()=>{
        button.remove();
        start_game();
    })
}

function display_score(){
    let o_display=document.querySelector("#o_display");
    let x_display=document.querySelector("#x_display");
    o_display.innerText=o_score;
    x_display.innerText=x_score;
}

function instruction(random,turn_image) {
    turn_image.src = random === 0 ? `letter-o.png` : `close.png`;
}
