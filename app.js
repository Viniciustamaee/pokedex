const shiny = document.querySelector('#shiny');
const imgPokemon = document.querySelector('#imgPokemon');
const pokmeon = document.querySelector('#selectPokemon')
const namePokemon = document.querySelector('#namePokemon')
const IdPokemon = document.querySelector('#IdPokemon')
let countShiny = true;


const searchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await APIResponse.json();
    return data;
};

const infoPokmeon = async (pokemon) => {
    const data = await searchPokemon(pokemon)
    namePokemon.innerHTML = data.name
    IdPokemon.innerHTML = data.id

}



shiny.addEventListener('click', () => {
    if (countShiny) {
        imgPokemon.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/1.gif';
    } else {
        imgPokemon.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif';
    }
    countShiny = !countShiny;
});


// infoPokmeon('1')












