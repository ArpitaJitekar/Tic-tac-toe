const cells=document.querySelectorAll('.box');
const player=document.querySelector('.current-player');
const timer=document.querySelector('.timer')
let currentPlayer='X'
let game=true
//for saving data on board to check win ,tie and already played box
let board=['','','','','','','','','']
const reset=document.querySelector('.reset-game');
console.log(reset);
const conditionOfWinning=[
    [0,1,2],[3,4,5],[6,7,8],[0,4,8]
    ,[0,3,6],[1,4,7],[2,5,8],[2,4,6]
];
function clicked(event){
    const cell=event.target
    //index of element to set board array
    let i=cell.getAttribute('data-index')
    //if box on board already contain x or o or game is over stop excuting function
    if(board[i]!=='' || game===false){
        return;
    }
    
      board[i]=`${currentPlayer}`
      //if player wins display it on board
  if(win()){
  
        let wish
        game=false;
        cell.innerText=`${currentPlayer}`
        player.innerHTML=`${currentPlayer}  wins !!`
      //alert and prompt load before any other : thus stTimeout is used
        setTimeout(() => {
            if(replay())
                restart()
             else
             return
        }, 500);
       
    

    

  }
  //if tie between two player display it on board
  if(draw()){
    
        game=false;
        cell.innerText=`${currentPlayer}`
        player.innerHTML=`tie !!`
        
        setTimeout(() => {
            if(replay())
                restart()
             else
             return
        }, 500);
   
  }
 
  
    cell.innerText=`${currentPlayer}`
   
    currentPlayer=(currentPlayer=='X')?'O':'X'
     player.textContent=`${currentPlayer}'s Turn`
    
}
//for playing directly after one round is done
function replay(){
   
    if(win()){
        let winner=(currentPlayer==='X')?'O':'X'
        alert(`${winner} Wins `)
    }
    else if(draw()){
        alert(`It's Tie`)
    }

    let wish=prompt("Do you want to play again")
    if(wish==='yes' || wish==='Yes'){
       return true
    }
    else
     return false
}
//function returns true if winning coditions are satisfied
function win(){
    for(let condition of conditionOfWinning){
        let [a,b,c]=condition
    if(board[c]&& board[c]==board[a] && board[c]==board[b]){
        return true
    }
    }
    return false;
}
//function returns true if thre is tie between two players
function draw(){
    
    if(!win() &&  board.every(ele=> ele!=='')){
      return true
    }

return false
}

//reset the game board onclicking reset buttton
reset.addEventListener('click',restart)
function restart(){
    
    board = ['', '', '', '', '', '', '', '', ''];
        
        //make actual board , empty as initial
       cells.forEach(cell=>{
        cell.textContent=''
       }
       )
        currentPlayer='X'
        player.innerHTML=` X's Turn`
        game=true
    
    }






//adding click eventlisener for grasping click on board
cells.forEach(cell => {
    cell.addEventListener('click',clicked)
});
player.innerHTML=`${currentPlayer}'s Turn`
