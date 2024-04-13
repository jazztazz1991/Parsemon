console.log('pokemon js');
const fireDeck = [];
const waterDeck = [];
const lightningDeck = [];
const grassDeck = [];

//fetch base1 set cards from pokemontcg api
function getPokecards() {
    $.ajax({
        url: 'https://api.pokemontcg.io/v2/cards?q=set.id:base1&orderBy=number',
        success: buildPokeDecks
    })
}

//build a 60 card deck for each of the 4 main types: fire, water, lightning, grass
function buildPokeDecks(res) {
    console.log("buildDeckRunnings")
    const allCards = res.data;
    let energy = 0;
    let pokemon = 0;
    let trainer = 0;
    let keepLooping = true;
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
        beginPlay(fireDeck);
    } else {
        console.log("no data retrieved");
        return
    }
}

//get the users deck choice and draw their first hand
function beginPlay(deckChoice) {
    const userDeck = deckChoice;
    let userHand = []

    if (userDeck) {
        let basicPokemon = false
        do {
            //build the users hand
            for (let i = 0; i < 7; i++) {
                const randomNumber = Math.floor(Math.random() * userDeck.length);
                userHand.push(userDeck[randomNumber]);
                userDeck.splice(randomNumber, 1);
                
            }
            //check if there are any basic pokemon in user hand
            for (let x = 0; x < userHand.length; x++) {
                if (userHand[x].subtypes[0] === "basic") {
                    basicPokemon = true;
                }
            }
        } while (basicPokemon == true);
    } else {
        return;
    }
    console.log(userHand);
}

$(document).ready(function () {
    getPokecards();
})