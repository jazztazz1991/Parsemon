/*
Collectibility is an important part of the Pokémon Trading Card Game. Each booster pack contains 10 game cards: 4 commons, 3 uncommons, and 3 foils (at least one of which will be rare or higher). Each booster pack also contains 1 Energy card and 1 code card that can be redeemed in Pokémon TCG Live.
*/

let allCards = [];
const sortedCards = {
    trainer: [],
    pokemon: {
        colorless: [],
        fighting: [],
        fire: [],
        grass: [],
        lightning: [],
        psychic: [],
        water: [],
        all: [],
        duel: []

    },
    energy: []
}


function updateUserDeck(deck) {
    localStorage.setItem('userDeck', JSON.stringify(deck));
}
function getUserDeck() {
    let stringDeck = localStorage.getItem('userDeck');
    let parsedDeck = JSON.parse(stringDeck) || [];
    return parsedDeck;
}
//fetch base1 set cards from pokemontcg api
function getPokecards() {
    $('#loading').text("the pokemon API is loading");
    $.ajax({
        url: 'https://api.pokemontcg.io/v2/cards?q=set.id:base1&orderBy=number',
        success: sortCards
    });
}


function sortCards(res) {
    allCards = res.data;
    for (let card of allCards) {
        if (card.supertype === 'Pokémon') {
            sortedCards.pokemon.all.push(card)
            if (card.types[0] === 'Colorless') {
                sortedCards.pokemon.colorless.push(card)
            } else if (card.types[0] === 'Fighting') {
                sortedCards.pokemon.fighting.push(card)
                sortedCards.pokemon.duel.push(card)
            } else if (card.types[0] === 'Fire') {
                sortedCards.pokemon.fire.push(card)
                sortedCards.pokemon.duel.push(card)
            } else if (card.types[0] === 'Grass') {
                sortedCards.pokemon.grass.push(card)
                sortedCards.pokemon.duel.push(card)
            } else if (card.types[0] === 'Lightning') {
                sortedCards.pokemon.lightning.push(card)
                sortedCards.pokemon.duel.push(card)
            } else if (card.types[0] === 'Psychic') {
                sortedCards.pokemon.psychic.push(card)
                sortedCards.pokemon.duel.push(card)
            } else if (card.types[0] === 'Water') {
                sortedCards.pokemon.water.push(card)
                sortedCards.pokemon.duel.push(card)
            } else {
                console.log('No pokemon array for type: ' + card.types[0])
            }
        } else if (card.supertype === 'Trainer') {
            sortedCards.trainer.push(card);
        } else if (card.supertype === "Energy") {
            sortedCards.energy.push(card);
        } else {
            console.log('this card has no home: ' + card);
        }
    }
    console.log("All Cards: ");
    console.log(allCards);
    console.log("Sorted Cards: ");
    console.log(sortedCards);
}

//TODO: show cards to screen based off users selection=
$('#submitBtn').on('click', userSelection)
function userSelection(event) {
    event.preventDefault()
    const userSelected = $('#category').val();
    if (userSelected === 'trainer') {
        showTrainer();
    } else if (userSelected === 'energy') {
        showEnergy();
    } else if (userSelected === 'pokemon') {
        showPokemon();
    } else {
        console.log('Please select a card type')
    }
}

function showTrainer() {
    const cards = sortedCards.trainer;
    console.log(cards)
    $('#deckBuilder').empty();
    for (let card of cards) {
        const display = $('#deckBuilder');
        const cardDiv = $('<div>').addClass('card').attr('data-cardid', card.id);
        const imgDiv = $('<div>').addClass('card-image')
        const cardImg = $('<img>').attr('src', card.images.small);
        const infoTag = $('<span>').addClass('card-title')
        const iTag = $('<button>').addClass('material-icons modal-trigger').attr('data-cardid', card.id).attr('href', '#infoModal').text('info');
        iTag.on('click', displayAdditionalInfo);
        infoTag.append(iTag);
        const aTag = $('<button>').addClass('material-icons').attr('data-cardid', card.id).text('add_circle');
        aTag.on('click', isDeckFull);
        infoTag.append(aTag);
        imgDiv.append(cardImg, infoTag);
        cardDiv.append(imgDiv);
        display.append(cardDiv);
    }
}

function showPokemon() {
    const type = $('#pokemonType').val();
    let sCards = [];
    $('#deckBuilder').empty();
    switch (type) {
        case 'colorless':
            sCards = sortedCards.pokemon.colorless;
            break;
        case 'fighting':
            sCards = sortedCards.pokemon.fighting;
            break;
        case 'fire':
            sCards = sortedCards.pokemon.fire;
            break;
        case 'grass':
            sCards = sortedCards.pokemon.grass;
            break;
        case 'lightning':
            sCards = sortedCards.pokemon.lightning;
            break;
        case 'psychic':
            sCards = sortedCards.pokemon.psychic;
            break;
        case 'water':
            sCards = sortedCards.pokemon.water;
            break;
        case 'all':
            sCards = sortedCards.pokemon.all;
            break;
    }

    for (let card of sCards) {
        const display = $('#deckBuilder');
        const cardDiv = $('<div>').addClass('card').attr('data-cardid', card.id);
        const imgDiv = $('<div>').addClass('card-image')
        const cardImg = $('<img>').attr('src', card.images.small);
        const infoTag = $('<span>').addClass('card-title')
        const iTag = $('<button>').addClass('material-icons modal-trigger').attr('data-cardid', card.id).attr('href', '#infoModal').text('info');
        iTag.on('click', displayAdditionalInfo);
        infoTag.append(iTag);
        const aTag = $('<button>').addClass('material-icons').attr('data-cardid', card.id).text('add_circle');
        aTag.on('click', isDeckFull);
        infoTag.append(aTag);
        imgDiv.append(cardImg, infoTag);
        cardDiv.append(imgDiv);
        display.append(cardDiv);
    }
}

function showEnergy() {
    const cards = sortedCards.energy;
    console.log(cards)
    $('#deckBuilder').empty();
    for (let card of cards) {
        console.log(card.id)
        const display = $('#deckBuilder');
        const cardDiv = $('<div>').addClass('card').attr('data-cardid', card.id);
        const imgDiv = $('<div>').addClass('card-image')
        const cardImg = $('<img>').attr('src', card.images.small);
        const infoTag = $('<span>').addClass('card-title')
        const iTag = $('<button>').addClass('material-icons modal-trigger').attr('data-cardid', card.id).attr('href', '#infoModal').text('info');
        iTag.on('click', displayAdditionalInfo);
        infoTag.append(iTag);
        const aTag = $('<button>').addClass('material-icons').attr('data-cardid', card.id).text('add_circle');
        aTag.on('click', isDeckFull);
        infoTag.append(aTag);
        imgDiv.append(cardImg, infoTag);
        cardDiv.append(imgDiv);
        display.append(cardDiv);
    }
}

//TODO: display extra information on click of i icon

function displayAdditionalInfo() {
    let cardid = this.dataset.cardid
    let card;
    for (let cards of allCards) {
        if (cardid === cards.id) {
            card = cards
        }
    }
    $('#infoImg').attr('src', card.images.large)
    let modal = `<div id="infoModal" class="modal">
    <div class="modal-content">
      <img href="#!" class="modal-close" src=${card.images.large}>
    </div>
  </div>`
    $('#cardModal').append(modal)

}

//TODO: get user deck from localStorage if avaible and show on screen
function userDeckSidebar() {
    const userDeck = getUserDeck();
    let position = 0;
    $('#selected-cards').empty();
    for (let card of userDeck) {
        const display = $('#selected-cards');
        const cardDiv = $('<div>').addClass('card').attr('data-cardid', card.id);
        const imgDiv = $('<div>').addClass('card-image')
        const cardImg = $('<img>').attr('src', card.images.small);
        const infoTag = $('<span>').addClass('card-title')
        const iTag = $('<button>').addClass('material-icons modal-trigger').attr('data-cardid', card.id).attr('href', '#infoModal').text('info');
        iTag.on('click', displayAdditionalInfo);
        infoTag.append(iTag);
        const aTag = $('<button>').addClass('material-icons').attr('data-position', position).text('remove_circle');
        aTag.on('click', removeCard);
        infoTag.append(aTag);
        imgDiv.append(cardImg, infoTag);
        cardDiv.append(imgDiv);
        display.append(cardDiv);
        position++;
    }
}

//TODO: Check if deck is full, Add card to deck, Add 1 to deck counter, Add card to userDeck localStorage, Update display deck side panel

function isDeckFull() {
    console.log('isDeckFull')
    const id = this.dataset.cardid
    const userDeck = getUserDeck();
    if (userDeck.length < 60) {
        addToDeck(id)
    } else {
        console.log('your deck is full')
    }
}

function addToDeck(id) {
    console.log('addtodeck')
    const usersDeck = getUserDeck();
    let toBeAdded;
    for (let card of allCards) {
        if (id === card.id) {
            toBeAdded = card;
        }
    }
    console.log(toBeAdded)
    usersDeck.push(toBeAdded);
    console.log(usersDeck)
    updateUserDeck(usersDeck);
    userDeckSidebar();

}

//TODO: On click remove the card from the deck, update localStorage, 
function removeCard() {
    let cardPosition = this.dataset.position;
    let usersDeck = getUserDeck();
    if (cardPosition) {
        usersDeck.splice(cardPosition, 1);
    }
    updateUserDeck(usersDeck);
    userDeckSidebar();
}


//==================================================================
//Pokemon War!
let player1Type;
let player2Type;
let player1Health = 5;
let player2Health = 5;
let side;
let play1Card;
let play2Card;
let coinSide;
let currentPlayer;
let firstPlayer;
let secondPlayer;
let player1Deck;
let player2Deck;
//TODO: Math.random for which users selects coin flip
function whoFlips() {
    let rand = Math.round(Math.random())
    if (rand === 0) {
        player1Start();
        $('#playerChoosing').text('Player flips');
    } else {
        player2Start();
        $('#playerChoosing').text('Rival flips');
        const displayButton = $('#flipCoin');
        const btnHeads = $('<button>').text('Heads').attr('href', '#!').addClass('modal-close').on('click', function () {
            side = 'Heads';
            chooseSide('#player-draw', '#rival-draw');
        });
        const btnTails = $('<button>').text('Tails').attr('href', '#!').addClass('modal-close').on('click', function () {
            side = 'Tails';
            chooseSide('#rival-draw', '#player-draw');
        })
        displayButton.empty();
        displayButton.append(btnHeads, btnTails)
    }
}

//TODO: coin flip for who goes first
const settings = {
    async: true,
    crossDomain: true,
    url: 'https://coin-flip1.p.rapidapi.com/headstails',
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '501efeabe9mshd81d164f2107583p17aec3jsn0b63b3047a05',
        'X-RapidAPI-Host': 'coin-flip1.p.rapidapi.com'
    }
};

$.ajax(settings).done(function (response) {
    coinSide = response.outcome
});
function chooseSide(player1, player2) {
    $(player1).removeClass('disabled')
    $(player2).removeClass('disabled')
    if (side === coinSide) {
        firstPlayer = player1
        secondPlayer = player2
        play1Card = '';
        play2card = '';
        console.log(play1Card)
        console.log(play2Card)
        $(player2).addClass('disabled')

    } else {
        firstPlayer = player2
        secondPlayer = player1
        play1Card = '';
        play2card = '';
        console.log(play1Card)
        console.log(play2Card)
        $(player1).addClass('disabled')
    }
}

function buildPlayerDeck() {
    let playerDeck = [];
    for (let i = 0; i < 60; i++) {
        let rand = Math.floor(Math.random() * sortedCards.pokemon.duel.length);
        playerDeck.push(sortedCards.pokemon.duel[rand]);
    }
    return playerDeck;
}
//TODO: Create player deck for player 1
function player1Start() {
    player1Deck = buildPlayerDeck();
    localStorage.setItem('player1Deck', player1Deck);
}

//TODO: Create player deck for player 2
function player2Start() {
    player2Deck = buildPlayerDeck();
    localStorage.setItem('player2Deck', player2Deck);
}

//TODO: PLAYER 1 - On click to play card. pull card from deck. display card pass turn to player 2
function player1Card() {
    if (player1Deck) {
        play1Card = player1Deck[0];
        player1Deck.shift();
        $('#player-card').attr('src', play1Card.images.large)
        if (play2Card) {
            playRound()
        } else {
            $('#player-draw').addClass('disabled');
            $('#rival-draw').removeClass('disabled');

        }
    } else {
        player1Start();
        player1Card();
    }
}

//TODO: PLAYER 1 - On click to play card. pull card from deck. display card. play round
function player2Card() {
    if (player2Deck) {
        play2Card = player2Deck[0];
        player2Deck.shift();
        $('#rival-card').attr('src', play2Card.images.large)
        if (play1Card) {
            playRound()
        } else {
            $('#rival-draw').addClass('disabled');
            $('#player-draw').removeClass('disabled');
        }
    } else {
        player2Start();
        player2Card();
    }
}

function playRound() {
    if (play1Card.weaknesses && play2Card.weaknesses) {
        if (play1Card.types[0] === play2Card.weaknesses[0].type) {
            player2Health--;
            console.log('Player Health: ' + player1Health);
            console.log('Rival Health: ' + player2Health);
            if (player2Health > 0) {
                chooseSide(firstPlayer, secondPlayer)
            }
        } else if (play2Card.types[0] === play1Card.weaknesses[0].type) {
            player1Health--;
            console.log('Player Health: ' + player1Health);
            console.log('Rival Health: ' + player2Health);
            if (player1Health > 0) {
                chooseSide(firstPlayer, secondPlayer)
            }
        } else {
            console.log('no winner. redraw');
            console.log('Player Health: ' + player1Health);
            console.log('Rival Health: ' + player2Health);
            chooseSide(firstPlayer)
        }
    } else if (play1Card.weaknesses && !play2Card.weaknesses) {
        player1Health--;
        console.log('Player Health: ' + player1Health);
        console.log('Rival Health: ' + player2Health);
        if (player1Health > 0) {
            chooseSide(firstPlayer, secondPlayer)
        }
    } else if (!play1Card.weaknesses && play2Card.weaknesses) {
        player2Health--;
        console.log('Player Health: ' + player1Health);
        console.log('Rival Health: ' + player2Health);
        if (player2Health > 0) {
            chooseSide(firstPlayer, secondPlayer)
        }
    } else {
        player1Health--;
        player2Health--;
        console.log('Player Health: ' + player1Health);
        console.log('Rival Health: ' + player2Health);
        if (player1Health > 0 && player2Health > 0) {
            chooseSide(firstPlayer, secondPlayer);
        }
    }

}


$(document).ready(function () {
    getPokecards();
    userDeckSidebar();
    $('.modal').modal();
    $('#player-draw').on('click', player1Card);
    $('#rival-draw').on('click', player2Card);
});























// //build a 60 card deck for each of the 4 main types: fire, water, lightning, grass
// function buildPokeDecks(res) {
//     $('#loading').text('');
//     console.log("buildDeckRunnings");
//     const allCards = res.data;
//     let energy = 0;
//     let pokemon = 0;
//     let trainer = 0;
//     if (allCards) {
//         if (fireDeck.length <= 60) {
//             console.log("firedeck");
//             while (fireDeck.length < 60) {
//                 let num = Math.floor(Math.random() * allCards.length);
//                 let card = allCards[num];
//                 if (card.supertype === 'Energy' && card.name === "Fire Energy" && energy <= 14) {
//                     fireDeck.push(card);
//                     energy++
//                 } else if (card.supertype === 'Energy' && card.name === "Double Colorless Energy" && energy <= 14) {
//                     fireDeck.push(card);
//                     energy++
//                 } else if (card.supertype === 'trainer' && trainer <= 34) {
//                     fireDeck.push(card);
//                     trainer++
//                 } else if (card.supertype === 'Pokémon' && card.types[0] === "Fire" && pokemon <= 12) {
//                     fireDeck.push(card);
//                     pokemon++;
//                 } else if (card.supertype === 'Pokémon' && card.types[0] === "Basic" && pokemon <= 12) {
//                     fireDeck.push(card);
//                     pokemon++;
//                 }
//             }
//             console.log("fire deck" + energy);
//             console.log("fire deck" + trainer);
//             console.log("fire deck" + pokemon);
//             energy = 0;
//             trainer = 0;
//             pokemon = 0;
//         }
//         if (waterDeck.length <= 60) {
//             console.log("waterdeck");
//             while (waterDeck.length < 60) {
//                 let num = Math.floor(Math.random() * allCards.length);
//                 let card = allCards[num];
//                 if (card.supertype === 'Energy' && card.name === "Water Energy" && energy <= 14) {
//                     waterDeck.push(card);
//                     energy++
//                 } else if (card.supertype === 'Energy' && card.name === "Double Colorless Energy" && energy <= 14) {
//                     waterDeck.push(card);
//                     energy++
//                 } else if (card.supertype === 'trainer' && trainer <= 34) {
//                     waterDeck.push(card);
//                     trainer++
//                 } else if (card.supertype === 'Pokémon' && card.types[0] === "Water" && pokemon <= 12) {
//                     waterDeck.push(card);
//                     pokemon++;
//                 } else if (card.supertype === 'Pokémon' && card.types[0] === "Basic" && pokemon <= 12) {
//                     waterDeck.push(card);
//                     pokemon++;
//                 }
//             }
//             console.log("water deck" + energy);
//             console.log("water deck" + trainer);
//             console.log("water deck" + pokemon);
//             energy = 0;
//             trainer = 0;
//             pokemon = 0;
//         }
//         if (lightningDeck.length <= 60) {
//             console.log("lightningdeck");
//             while (lightningDeck.length < 60) {
//                 let num = Math.floor(Math.random() * allCards.length);
//                 let card = allCards[num];
//                 if (card.supertype === 'Energy' && card.name === "Lightning Energy" && energy <= 14) {
//                     lightningDeck.push(card);
//                     energy++
//                 } else if (card.supertype === 'Energy' && card.name === "Double Colorless Energy" && energy <= 14) {
//                     lightningDeck.push(card);
//                     energy++
//                 } else if (card.supertype === 'trainer' && trainer <= 34) {
//                     lightningDeck.push(card);
//                     trainer++
//                 } else if (card.supertype === 'Pokémon' && card.types[0] === "Lightning" && pokemon <= 12) {
//                     lightningDeck.push(card);
//                     pokemon++;
//                 } else if (card.supertype === 'Pokémon' && card.types[0] === "Basic" && pokemon <= 12) {
//                     lightningDeck.push(card);
//                     pokemon++;
//                 }
//             }
//             console.log("lightning deck" + energy);
//             console.log("lightning deck" + trainer);
//             console.log("lightning deck" + pokemon);
//             energy = 0;
//             trainer = 0;
//             pokemon = 0;
//         }
//         if (grassDeck.length <= 60) {
//             console.log("grassdeck");
//             while (grassDeck.length < 60) {
//                 let num = Math.floor(Math.random() * allCards.length);
//                 let card = allCards[num];
//                 if (card.supertype === 'Energy' && card.name === "Grass Energy" && energy <= 14) {
//                     grassDeck.push(card);
//                     energy++
//                 } else if (card.supertype === 'Energy' && card.name === "Double Colorless Energy" && energy <= 14) {
//                     grassDeck.push(card);
//                     energy++
//                 } else if (card.supertype === 'trainer' && trainer <= 34) {
//                     grassDeck.push(card);
//                     trainer++
//                 } else if (card.supertype === 'Pokémon' && card.types[0] === "Grass" && pokemon <= 12) {
//                     grassDeck.push(card);
//                     pokemon++;
//                 } else if (card.supertype === 'Pokémon' && card.types[0] === "Basic" && pokemon <= 12) {
//                     grassDeck.push(card);
//                     pokemon++;
//                 }
//             }
//             console.log("grass deck" + energy);
//             console.log("grass deck" + trainer);
//             console.log("grass deck" + pokemon);
//             energy = 0;
//             trainer = 0;
//             pokemon = 0;
//         }
//         console.log("all decks built");
//         $('#loading').text('');
//     } else {
//         console.log("no data retrieved");
//         return
//     }
// }

// //get the users deck choice and draw their first hand
// function beginPlay(deckChoice) {
//     let userDeck = deckChoice;
//     let userHand = [];
//     localStorage.setItem('userDeck', JSON.stringify(userDeck));
//     console.log(userDeck.length)
//     if (userDeck) {
//         let basicPokemon = false

//         do {
//             userHand = [];
//             //build the users hand
//             for (let i = 0; i < 7; i++) {
//                 const randomNumber = Math.floor(Math.random() * (userDeck.length - 1));
//                 userHand.push(userDeck[randomNumber]);
//                 if (userDeck[randomNumber].subtypes[0] == "Basic" && userDeck[randomNumber].supertype == "Pokémon") {
//                     console.log("basic pokemon added");
//                     basicPokemon = true;
//                 }
//                 userDeck.splice(randomNumber, 1);
//             }
//             if (!basicPokemon) {
//                 console.log('no basics - reshuffling')
//                 for (let i = 0; i < userHand.length; i++) {
//                     userDeck.push(userHand[i])
//                 }
//                 userDeck = shuffleDeck(userDeck);
//                 console.log(userDeck)
//             }
//         } while (!basicPokemon);
//     } else {
//         return;
//     }
//     console.log(userHand);
//     for (let i = 0; i < userHand.length; i++) {
//         const card = buildCard(userHand[i]);
//         $('#userHand').append(card);
//     }
//     const draw = $('<button>').attr('id', 'draw').text('Draw Card');
//     draw.on('click', function () {
//         console.log('draw card');
//         drawCard();
//     });
//     $('#userHand').append(draw);
// }
// function shuffleDeck(deck) {
//     return deck.sort(() => Math.random() - 0.5);
// }

// function buildCard(card) {
//     const newCard = $('<div>').addClass('pokecard');
//     const cardImg = $('<img>').attr('src', card.images.small).addClass('cardImage');
//     const cardName = $('<p>').text(card.name).addClass('cardName');
//     const cardType = $('<p>');
//     if (card.types) {
//         cardType.text(card.types[0]);
//     }
//     const attacks = $('<div>').addClass('attacks');
//     if (card.attacks) {
//         for (let i = 0; i < card.attacks.length; i++) {
//             const cardAttack = $('<button>').addClass('atkBtn').text(card.attacks[i].name).attr('data-attack-name', card.attacks[i].name).attr('data-attack-damage', card.attacks[i].damage)
//             cardAttack.on('click', { name: this }, attack)
//             attacks.append(cardAttack);
//         }
//     }
//     newCard.append(cardImg, cardName, cardType, attacks);
//     return newCard;
// }

// //draw a card from the users deck
// function drawCard() {
//     const userHand = JSON.parse(localStorage.getItem('userHand'));
//     if (userHand.length < 7) {
//         const deck = JSON.parse(localStorage.getItem('userDeck'));
//         const card = buildCard(deck[0]);
//         userHand.append(card);
//         $('#userHand').append(card);
//         deck.shift();
//         localStorage.setItem('userDeck', JSON.stringify(deck));
//         localStorage.setItem('userHand', JSON.stringify(deck));
//     } else {
//         console.log('already at 7 cards')
//     }
// }

// function attack(ability) {
//     const playerAttack = ability;
//     let playerHealth = 100;
//     console.log(playerAttack.delegateTarget.dataset.attackName);
//     console.log(playerAttack.delegateTarget.dataset.attackDamage);

//     playerHealth -= playerAttack.delegateTarget.dataset.attackDamage;
//     console.log(playerHealth);
//     if (playerHealth <= 0) {
//         knockout();
//     }
//     return playerHealth
// }
// function knockout() {
//     console.log("knockout");
// }
// function playCard() {
//     console.log("playCard")
// }
