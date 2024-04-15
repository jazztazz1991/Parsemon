console.log('pokemon js');
const fireDeck = [];
const waterDeck = [];
const lightningDeck = [];
const grassDeck = [];

//fetch base1 set cards from pokemontcg api
function getStoredHand() {
    return JSON.parse(localStorage.getItem('userHand'));
}
function getStoredDeck() {
    return JSON.parse(localStorage.getItem('userDeck'));
}
function getPokecards() {
    $('#loading').text("the pokemon API is loading");
    $.ajax({
        url: 'https://api.pokemontcg.io/v2/cards?q=set.id:base1&orderBy=number',
        success: buildPokeDecks
    })
}

//build a 60 card deck for each of the 4 main types: fire, water, lightning, grass
function buildPokeDecks(res) {
    $('#loading').text('');
    console.log("buildDeckRunnings");
    const allCards = res.data;
    let energy = 0;
    let pokemon = 0;
    let trainer = 0;
    if (allCards) {
        if (fireDeck.length <= 60) {
            console.log("firedeck");
            while (fireDeck.length < 60) {
                let num = Math.floor(Math.random() * allCards.length);
                let card = allCards[num];
                if (card.supertype === 'Energy' && card.name === "Fire Energy" && energy <= 14) {
                    fireDeck.push(card);
                    energy++
                } else if (card.supertype === 'Energy' && card.name === "Double Colorless Energy" && energy <= 14) {
                    fireDeck.push(card);
                    energy++
                } else if (card.supertype === 'trainer' && trainer <= 34) {
                    fireDeck.push(card);
                    trainer++
                } else if (card.supertype === 'Pokémon' && card.types[0] === "Fire" && trainer <= 12) {
                    fireDeck.push(card);
                    pokemon++;
                } else if (card.supertype === 'Pokémon' && card.types[0] === "Basic" && trainer <= 12) {
                    fireDeck.push(card);
                    pokemon++;
                }
            }
            energy = 0;
            trainer = 0;
            pokemon = 0;
        }
        if (waterDeck.length <= 60) {
            console.log("waterdeck");
            while (waterDeck.length < 60) {
                let num = Math.floor(Math.random() * allCards.length);
                let card = allCards[num];
                if (card.supertype === 'Energy' && card.name === "Water Energy" && energy <= 14) {
                    waterDeck.push(card);
                    energy++
                } else if (card.supertype === 'Energy' && card.name === "Double Colorless Energy" && energy <= 14) {
                    waterDeck.push(card);
                    energy++
                } else if (card.supertype === 'trainer' && trainer <= 34) {
                    waterDeck.push(card);
                    trainer++
                } else if (card.supertype === 'Pokémon' && card.types[0] === "Water" && trainer <= 12) {
                    waterDeck.push(card);
                    pokemon++;
                } else if (card.supertype === 'Pokémon' && card.types[0] === "Basic" && trainer <= 12) {
                    waterDeck.push(card);
                    pokemon++;
                }
            }
            energy = 0;
            trainer = 0;
            pokemon = 0;
        }
        if (lightningDeck.length <= 60) {
            console.log("lightningdeck");
            while (lightningDeck.length < 60) {
                let num = Math.floor(Math.random() * allCards.length);
                let card = allCards[num];
                if (card.supertype === 'Energy' && card.name === "Lightning Energy" && energy <= 14) {
                    lightningDeck.push(card);
                    energy++
                } else if (card.supertype === 'Energy' && card.name === "Double Colorless Energy" && energy <= 14) {
                    lightningDeck.push(card);
                    energy++
                } else if (card.supertype === 'trainer' && trainer <= 34) {
                    lightningDeck.push(card);
                    trainer++
                } else if (card.supertype === 'Pokémon' && card.types[0] === "Lightning" && trainer <= 12) {
                    lightningDeck.push(card);
                    pokemon++;
                } else if (card.supertype === 'Pokémon' && card.types[0] === "Basic" && trainer <= 12) {
                    lightningDeck.push(card);
                    pokemon++;
                }
            }
            energy = 0;
            trainer = 0;
            pokemon = 0;
        }
        if (grassDeck.length <= 60) {
            console.log("grassdeck");
            while (grassDeck.length < 60) {
                let num = Math.floor(Math.random() * allCards.length);
                let card = allCards[num];
                if (card.supertype === 'Energy' && card.name === "Grass Energy" && energy <= 14) {
                    grassDeck.push(card);
                    energy++
                } else if (card.supertype === 'Energy' && card.name === "Double Colorless Energy" && energy <= 14) {
                    grassDeck.push(card);
                    energy++
                } else if (card.supertype === 'trainer' && trainer <= 34) {
                    grassDeck.push(card);
                    trainer++
                } else if (card.supertype === 'Pokémon' && card.types[0] === "Grass" && trainer <= 12) {
                    grassDeck.push(card);
                    pokemon++;
                } else if (card.supertype === 'Pokémon' && card.types[0] === "Basic" && trainer <= 12) {
                    grassDeck.push(card);
                    pokemon++;
                }
            }
            energy = 0;
            trainer = 0;
            pokemon = 0;
        }
        console.log("all decks built");
    } else {
        console.log("no data retrieved");
        return
    }
}

//get the users deck choice and draw their first hand
function beginPlay(deckChoice) {
    let userDeck = deckChoice;
    let userHand = [];
    localStorage.setItem('userDeck', JSON.stringify(userDeck));
    console.log(userDeck.length)
    if (userDeck) {
        let basicPokemon = false

        do {
            userHand = [];
            //build the users hand
            for (let i = 0; i < 7; i++) {
                const randomNumber = Math.floor(Math.random() * (userDeck.length - 1));
                userHand.push(userDeck[randomNumber]);
                if (userDeck[randomNumber].subtypes[0] == "Basic" && userDeck[randomNumber].supertype == "Pokémon") {
                    console.log("basic pokemon added");
                    basicPokemon = true;
                }
                userDeck.splice(randomNumber, 1);
            }
            if (!basicPokemon) {
                console.log('no basics - reshuffling')
                for (let i = 0; i < userHand.length; i++) {
                    userDeck.push(userHand[i])
                }
                userDeck = shuffleDeck(userDeck);
                console.log(userDeck)
            }
        } while (!basicPokemon);
    } else {
        return;
    }
    console.log(userHand);
    for (let i = 0; i < userHand.length; i++) {
        const card = buildCard(userHand[i]);
        $('#userHand').append(card);
    }
    const draw = $('<button>').attr('id', 'draw').text('Draw Card');
    draw.on('click', function () {
        console.log('draw card');
        drawCard();
    });
    $('#userHand').append(draw);
}
function shuffleDeck(deck) {
    return deck.sort(() => Math.random() - 0.5);
}

function buildCard(card) {
    const newCard = $('<div>').addClass('pokecard');
    const cardImg = $('<img>').attr('src', card.images.small).addClass('cardImage');
    const cardName = $('<p>').text(card.name).addClass('cardName');
    const cardType = $('<p>');
    if (card.types) {
        cardType.text(card.types[0]);
    }
    const attacks = $('<div>').addClass('attacks');
    if (card.attacks) {
        for (let i = 0; i < card.attacks.length; i++) {
            const cardAttack = $('<button>').addClass('atkBtn').text(card.attacks[i].name);
            attacks.append(cardAttack);
        }
    }
    newCard.append(cardImg, cardName, cardType, attacks);
    return newCard;
}

//draw a card from the users deck
function drawCard() {
    const deck = JSON.parse(localStorage.getItem('userDeck'));
    const card = buildCard(deck[0]);
    $('#userHand').append(card);
    deck.shift();
    localStorage.setItem('userDeck', JSON.stringify(deck));
}

$(document).ready(function () {
    getPokecards();


    $("#fire").click(function () {
        beginPlay(fireDeck);
    });
    $("#water").click(function () {
        beginPlay(waterDeck);
    });
    $("#lightning").click(function () {
        beginPlay(lightningDeck);
    });
    $("#grass").click(function () {
        beginPlay(grassDeck);
    });

});