'use strict';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// RULES BUTTON

const rules = document.querySelector('.rules');
const overlay = document.querySelector('.overlay');
const btnCloseRules = document.querySelector('.close-rules');
const btnsOpenRules = document.querySelectorAll('.show-rules');

//Opening the rules
let openRules = function() {
   rules.classList.remove('hidden');
   overlay.classList.remove('hidden');
 };
for(let i=0; i < btnsOpenRules.length; i++) {
 btnsOpenRules[i].addEventListener('click', openRules)
};

//Closing the rules
let closeRules = function() {
 rules.classList.add('hidden');
 overlay.classList.add('hidden');
};

btnCloseRules.addEventListener('click', closeRules);
overlay.addEventListener('click', closeRules);

document.addEventListener('keydown', function(e) {
 if(e.key === 'Escape') {
   closeRules();
 }
});
//REST OF THE GAME

//Selecting Elements

const play0Btn = document.querySelector('.btn--play--0');
const play1Btn = document.querySelector('.btn--play--1');
const newBtn = document.querySelector('.btn--new');
const hold0Btn = document.querySelector('.btn--hold--0');

const handEl = document.querySelectorAll('.hand');
const hand0El = document.querySelector('.hand--0');
const hand1El = document.querySelector('.hand--1');

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

const player0El = document.querySelector('#player--0');
const player1El = document.querySelector('#player--1');

const lossMsg = document.querySelector('.lossMsg');

const me = document.querySelector('.me');
const sheldon = document.querySelector('.sheldon');
// Starting Conditions

let scores = [0,0];
let playing = true;
let playing0 = true;
let playing1 = false;
let handplayed0 = false;
let handplayed1 = false;
let hold0BtnClicked = false;
let hold1BtnClicked = false;
let playingHand = [];
let lastHand = 5;

const hands = ["scissors", "paper", "rock", "lizard", "spock"];


// Play-0 Button functionality
const clickPlay0 = function() {
   if (playing) {
    if (playing0) {
     //1. Generate hand played by player 0
     let hand0 = Math.trunc(((Math.random())*5));

     // Make sure same hand is not played 2 times.
     while(hand0 === lastHand) {
       hand0 = Math.trunc(((Math.random())*5));
       console.log('Hey');
     }
     lastHand = hand0;

     //2. Display the dice player 0 side
     hand0El.src = `BBTGame/hand-${hand0}.png`;
     hand0El.classList.remove('invisible');

     //declare that player0 has played his hand 
     handplayed0 = true;

     // store the hand's value
     playingHand[0] = hand0;
     console.log(playingHand);
    }
   }
   
}
// const clickPlay0 = function() {
//    console.log('Hi');
   
// }

play0Btn.addEventListener('click', clickPlay0);

// Hold 0 Button Functionality

const clickHold0 = function() {
  if (playing) {
   if(playing0 && !playing1 && handplayed0) {
    // lock the hand played by player 0
     playing0 = false;
     // allow player 1 to play his hands
     playing1 = true;
     //takeaway active player style from player 0 and give it to player 1
     player0El.classList.remove('player--active');
     player1El.classList.add('player--active');
     //make sure that play1 button works only after palyer 0 holds
     hold0BtnClicked = true;

     console.log(playingHand);
   }
 }
}
hold0Btn.addEventListener('click', clickHold0);

// Comparing the 2 hands

const roundwinner = function() {
 let x = playingHand[0];
 let y = playingHand[1];
 let win;
 if((x+1) % 5 === y%5 || (x+3) % 5 === y%5) {
  // x wins
   scores[0] += 1;
   score0El.textContent = scores[0];
   me.classList.remove('hidden');
   sheldon.classList.add('hidden');
 }
 else if( x===y) {

 }
 else {
  
   // y wins
  scores[1] += 1;
  score1El.textContent = scores[1];
  me.classList.add('hidden');
  sheldon.classList.remove('hidden');
 }
}

// Play1 Button Functionality

let clickPlay1 = function() {
  if (playing) {
   if(playing1 && !playing0 && hold0BtnClicked) {
     //1. Generate hand played by player 1
     let hand1 = Math.trunc(((Math.random())*5));

     //2. Display the dice player 1 side
     hand1El.src = `BBTGame/hand-${hand1}.png`;
     hand1El.classList.remove('invisible');

     //declare that player0 has played his hand 
     handplayed1 = true;

     // store the hand's value
     playingHand[1] = hand1;
     console.log(playingHand);

     // lock the hand played by player 1
     playing1 = false;
     console.log(playingHand);

     //give points to winner of the round
     roundwinner();

     //takeaway active player style from player 1 and give it to player 0
     player0El.classList.remove('player--active');
     player1El.classList.add('player--active');

    //end game if one player has 3 points
    if(scores[0] === 3 || scores[1] === 3) {
     
     // freeze both the players
     playing0 = false;
     playing1 = false;
     //finish the game
     sleep(1000).then(() => { 
      hand0El.classList.add('invisible');
     hand1El.classList.add('invisible');
    });
    
     // declare the player with 3 points as the winner
     sleep(1000).then(() => { 
       (scores[0] === 3) ? player0El.classList.add('player--winner') : player1El.classList.add('player--winner');
    });
     playing = false;
     if(scores[1] === 3) {
        lossMsg.classList.remove('hidden');
     }
    }

    // else switch to player 0
    else {
     player0El.classList.add('player--active');
     player1El.classList.remove('player--active');

     playing0 = true;
     playing1 = false;
     handplayed0 = false;
     handplayed1 = false;
     hold0BtnClicked = false;
     hold1BtnClicked = false;
    }
   }
  }  
}
play1Btn.addEventListener('click', clickPlay1);

let clickNew = function () {

 // Setting values to 0
 scores = [0,0];
 score0El.textContent = 0;
 score1El.textContent = 0;
 //Initial conditions
 playing = true;
 playing0 = true;
 playing1 = false;
 handplayed0 = false;
 handplayed1 = false;
 hold0BtnClicked = false;
 hold1BtnClicked = false;
 playingHand = [];
 lastHand = 5;
 // Initial settings
 player0El.classList.remove('player--winner');
 player1El.classList.remove('player--winner');
 player0El.classList.add('player--active');
 player1El.classList.remove('player--active');
 hand0El.classList.add('invisible');
 hand1El.classList.add('invisible');
 me.classList.add('hidden');
 sheldon.classList.add('hidden');
 lossMsg.classList.add('hidden');
 
};

newBtn.addEventListener('click', clickNew);



