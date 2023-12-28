const shiny = document.querySelector('#shiny');
const imgPokemon = document.querySelector('#imgPokemon');
const pokmeon = document.querySelector('#selectPokemon')
const namePokemon = document.querySelector('#namePokemon')
const IdPokemon = document.querySelector('#IdPokemon')
const input = document.querySelector('#selectPokemon')
const form = document.querySelector('form')
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
    imgPokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
}

const infoPokmeonShiny = async (pokemon) => {
    const data = await searchPokemon(pokemon)
    namePokemon.innerHTML = data.name
    IdPokemon.innerHTML = data.id
    imgPokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny']
}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    infoPokmeon(input.value.toLowerCase())
})



shiny.addEventListener('click', async () => {
    if (countShiny) {
        infoPokmeonShiny(input.value)
    } else {
        infoPokmeon(input.value)
        input.value = ''
    }
    countShiny = !countShiny;
});


infoPokmeon('1')