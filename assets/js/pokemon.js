console.log('pokemon js');
const fireDeck = [];
const waterDeck = [];
const lightningDeck = [];
const grassDeck = [];

function getPokecards() {
    $.ajax({
        url: 'https://api.pokemontcg.io/v2/cards?q=set.id:base1&orderBy=number',
        success: buildPokeDecks
    })
}

function buildPokeDecks(res) {
    console.log("buildDeckRunnings")
    const allCards = res.data;
    let energy = 0;
    let pokemon = 0;
    let trainer = 0;
    let keepLooping = true;
    if (allCards) {
        console.log(allCards);
    } else {
        console.log("no data retrieved");
        return
    }
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
}
console.log("Fire Deck: " + fireDeck);
// console.log("Water Deck: " + waterDeck);
// console.log("Grass Deck: " + grassDeck);
// console.log("Lightning Deck: " + lightningDeck);

$(document).ready(function () {
    getPokecards();
})