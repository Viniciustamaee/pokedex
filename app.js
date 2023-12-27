const shiny = document.querySelector('#shiny');
const imgPokemon = document.querySelector('#imgPokemon');
let countShiny = true;

shiny.addEventListener('click', () => {
    if (countShiny) {
        imgPokemon.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png';
    } else {
        imgPokemon.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png';
    }

    countShiny = !countShiny;
});




