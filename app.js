const playerX= "X";
const player0= "zero";
let cellElements= document.querySelectorAll(".cell");
let winningText=document.querySelector(".winning-text");
let winningMsg=document.querySelector(".winning-message");
let restart=document.querySelector(".restart");

restart.addEventListener("click",resetGame);

let circleTurn=false;
let currentPlayer;
const winCombination=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function resetGame(){
    cellElements.forEach((cell)=>{
        cell.classList.remove("X");
        cell.classList.remove("zero");
        cell.removeEventListener("click",handleClick);
    });
    winningText.classList.remove("show");
    render();
}

function render(){
    cellElements.forEach((cell)=>{
        cell.addEventListener("click",handleClick,{once:true})
    });

}
 
function handleClick(e){
  currentPlayer = circleTurn ? player0 :playerX
  const cell= e.target;
  cell.classList.add(currentPlayer);
  if(checkWins()){
    console.log(`${currentPlayer} wins ! Congrats`);
    winningMsg.innerText=`${currentPlayer} wins ! Congrats`;
    winningText.classList.add("show");
  } 
  else if(checkDraw()){
    console.log(`Draw`);
    winningMsg.innerText=`Its a draw`;
    winningText.classList.add("show");
  }
  swapPlayer();
}

function swapPlayer(){
    circleTurn=!circleTurn;
}

function checkDraw(){
    return [...cellElements].every((cell)=>{
        return (cell.classList.contains("X") || cell.classList.contains("zero"));
    })
}

function checkWins(){
   return winCombination.some((combination)=>{
        return combination.every((index)=>{
          return [...cellElements][index].classList.contains(currentPlayer);
        })
    })
}

render();