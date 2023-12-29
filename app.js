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
const barSpeed = document.querySelector('#Speed')
const barAttack = document.querySelector('#Attack')
const barDefense = document.querySelector('#Defense')
const barHP = document.querySelector('#HP')
const shinyIcon = document.querySelector('#shiny')


let numberPokemon = 1;
let countShiny = true;

const typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dark: '#705848',
    steel: '#B8B8D0',
    dragon: '#7038F8',
    fairy: '#EE99AC'
};

const searchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await APIResponse.json();
    return data;
};

const infoPokmeon = async (pokemon) => {
    const data = await searchPokemon(pokemon);

    if (input.value > 649) {
        alert('Digite um número menor que 459');
        input.value = '';
    } else {
        try {
            namePokemon.innerHTML = data.name;
            IdPokemon.innerHTML = data.id;
            imgPokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
            firstType.innerHTML = data.types[0].type.name;

            if (data.types.length > 1) {
                secondType.innerHTML = data.types[1].type.name;
                secondType.style.display = '';
            } else {
                secondType.style.display = 'none';
            }

            HPnumber.innerHTML = data.stats[0].base_stat;
            attackNumber.innerHTML = data.stats[1].base_stat;
            defenseNumber.innerHTML = data.stats[2].base_stat;
            speedNumber.innerHTML = data.stats[5].base_stat;

            barAttack.style.width = attackNumber.innerHTML + 'px';
            barDefense.style.width = defenseNumber.innerHTML + 'px';
            barHP.style.width = HPnumber.innerHTML + 'px';
            barSpeed.style.width = speedNumber.innerHTML + 'px';

            for (let x in typeColors) {
                if (x == firstType.innerHTML) {
                    firstType.style.backgroundColor = typeColors[x];
                }
                if (x == secondType.innerHTML) {
                    secondType.style.backgroundColor = typeColors[x];
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
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
    numberPokemon = parseInt(input.value, 10);
})



shiny.addEventListener('click', () => {
    if (countShiny) {
        infoPokmeonShiny(input.value || numberPokemon)
        shiny.style.backgroundColor = '#dee2e6';

    } else {
        infoPokmeon(input.value || numberPokemon)
        shiny.style.backgroundColor = '#e9ecef';

    }
    countShiny = !countShiny;
});

prev.addEventListener('click', () => {
    if (numberPokemon != 1) {
        numberPokemon -= 1
        input.value = numberPokemon;
        infoPokmeon(numberPokemon)
        secondType.innerHTML = ''
        firstType.innerHTML = ''
    }
})

next.addEventListener('click', () => {
    numberPokemon += 1;
    input.value = numberPokemon;
    infoPokmeon(numberPokemon)
    secondType.innerHTML = ''
    firstType.innerHTML = ''

})

infoPokmeon(numberPokemon)



