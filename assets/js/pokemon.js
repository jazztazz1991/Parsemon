console.log('pokemon js');
$(document).ready(function () {
    // $('#pokemonId').val();
    // $('#getPokemon').on('click', function () {
    $.ajax({
        url: 'https://api.pokemontcg.io/v2/cards/base1?qname=pikachu',
        success: function (res) {
            console.log(res);
        }
    })
    // });
})

function showPokemonCard(res) {
    console.log(res);
}