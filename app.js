const shiny = document.querySelector('#shiny');
const imgPokemon = document.querySelector('#imgPokemon');
const pokmeon = document.querySelector('#selectPokemon');
const namePokemon = document.querySelector('#namePokemon');
const IdPokemon = document.querySelector('#IdPokemon');
const input = document.querySelector('#selectPokemon');
const form = document.querySelector('form');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const firstType = document.querySelector('#firstType');
const secondType = document.querySelector('#secondType');
const HPnumber = document.querySelector('#HPnumber');
const attackNumber = document.querySelector('#AttackNumber');
const defenseNumber = document.querySelector('#DefenseNumber');
const speedNumber = document.querySelector('#SpeedNumber');
let numberPokemon = 1;
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

    try {
        firstType.innerHTML = data.types['0'].type.name
        secondType.innerHTML = data.types['1'].type.name
        HPnumber.innerHTML = data.stats['0']['base_stat']
        attackNumber.innerHTML = data.stats['1']['base_stat']
        defenseNumber.innerHTML = data.stats['2']['base_stat']
        speedNumber.innerHTML = data.stats['5']['base_stat']



    } catch {
        firstType.innerHTML = data.types['0'].type.name
        secondType.innerHTML = ''
        HPnumber.innerHTML = data.stats['0']['base_stat']
        attackNumber.innerHTML = data.stats['1']['base_stat']
        defenseNumber.innerHTML = data.stats['2']['base_stat']
        speedNumber.innerHTML = data.stats['5']['base_stat']



    }

}

const infoPokmeonShiny = async (pokemon) => {
    data.types['0'].type.name
    const data = await searchPokemon(pokemon)
    namePokemon.innerHTML = data.name
    IdPokemon.innerHTML = data.id
    imgPokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny']

}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    infoPokmeon(input.value.toLowerCase())
})



shiny.addEventListener('click', () => {
    if (countShiny) {
        infoPokmeonShiny(input.value || numberPokemon)
    } else {
        infoPokmeon(input.value || numberPokemon)
        input.value = ''
    }
    countShiny = !countShiny;
});

prev.addEventListener('click', () => {
    if (numberPokemon != 1) {
        numberPokemon -= 1
        infoPokmeon(numberPokemon)
        secondType.innerHTML = ''
        firstType.innerHTML = ''
    }
})

next.addEventListener('click', () => {
    numberPokemon += 1
    infoPokmeon(numberPokemon)
    secondType.innerHTML = ''
    firstType.innerHTML = ''

})


infoPokmeon(numberPokemon)



