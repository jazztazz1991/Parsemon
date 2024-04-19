//==================================================================
//Pokemon War!
let player1Type;
let player2Type;
let player1Health = 5;
let player2Health = 5;
//TODO: Math.random for which users selects coin flip
function whoFlips() {}

//TODO: coin flip for who goes first
const settings = {
  async: true,
  crossDomain: true,
  url: "https://coin-flip1.p.rapidapi.com/headstails",
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "501efeabe9mshd81d164f2107583p17aec3jsn0b63b3047a05",
    "X-RapidAPI-Host": "coin-flip1.p.rapidapi.com",
  },
};

$.ajax(settings).done(function (response) {
  console.log(response);
});

//TODO: Create player deck for player 1
function player1Start() {}

//TODO: Create player deck for player 2
function player2Start() {}

//TODO: PLAYER 1 - On click to play card. pull card from deck. display card pass turn to player 2
$("").on("click", player1Card);
function player1Card() {}

//TODO: PLAYER 1 - On click to play card. pull card from deck. display card. play round
$("").on("click", player2Card);
function player2Card() {}

function playRound() {}

$(document).ready(function () {
  getPokecards();
  userDeckSidebar();
});
