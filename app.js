const shiny = document.querySelector('#shiny');
const imgPokemon = document.querySelector('#imgPokemon');
const pokmeon = document.querySelector('#selectPokemon');
const namePokemon = document.querySelector('#namePokemon');
const IdPokemon = document.querySelector('#idPokemon');
const input = document.querySelector('#selectPokemon');
const form = document.querySelector('form');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const firstType = document.querySelector('#firstType');
const secondType = document.querySelector('#secondType');
const HPnumber = document.querySelector('#hpnumber');
const attackNumber = document.querySelector('#attackNumber');
const defenseNumber = document.querySelector('#defenseNumber');
const speedNumber = document.querySelector('#speedNumber');
const barSpeed = document.querySelector('#speed')
const barAttack = document.querySelector('#attack')
const barDefense = document.querySelector('#defense')
const barHP = document.querySelector('#HP')
const shinyIcon = document.querySelector('#shiny')
const body = document.querySelector('body')

let numberPokemon = 1;
let countShiny = true;

const typeColors = {
    ice: '#98D8D8',
    bug: '#A8B820',
    fire: '#F08030',
    rock: '#B8A038',
    dark: '#705848',
    steel: '#B8B8D0',
    water: '#6890F0',
    ghost: '#705898',
    fairy: '#EE99AC',
    grass: '#78C850',
    normal: '#A8A878',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    dragon: '#7038F8',
    psychic: '#F85888',
    fighting: '#C03028',
    electric: '#F8D030'
};

const searchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
};

const infoPokmeon = async (pokemon) => {
    const data = await searchPokemon(pokemon);

    if (input.value > 649) {
        alert('Digite um número menor que 649');
        input.value = '';
        return;
    }
    if (data) {
        namePokemon.innerHTML = data.name;
        IdPokemon.innerHTML = data.id;
        shiny.style.display = '';
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
        input.value = data.id
        numberPokemon = data.id
        barAttack.style.width = attackNumber.innerHTML + 'px';
        barDefense.style.width = defenseNumber.innerHTML + 'px';
        barHP.style.width = HPnumber.innerHTML + 'px';
        barSpeed.style.width = speedNumber.innerHTML + 'px';
        for (let color in typeColors) {
            if (color == firstType.innerHTML) {
                firstType.style.backgroundColor = typeColors[color]

            }
            if (color == secondType.innerHTML) {
                secondType.style.backgroundColor = typeColors[color];


            } else if (secondType.innerText == "") {
                console.log('AAAS')
                body.style.backgroundColor = firstType.style.backgroundColor
            } else if (secondType.innerText !== '') {
                body.style.background = `linear-gradient(to right, ${firstType.style.backgroundColor}, ${secondType.style.backgroundColor})`
            }
        }


    } else {
        namePokemon.innerHTML = 'Not Found'
        IdPokemon.innerHTML = '';
        imgPokemon.src = 'https://4.bp.blogspot.com/-iGaMK0eMGOI/UyNFq5nT5LI/AAAAAAAABKQ/w9xYCLHDgoM/s1600/12.png'
        firstType.style.backgroundColor = '#e9ecef';
        secondType.style.backgroundColor = '#e9ecef';
        firstType.style.color = '#e9ecef';
        secondType.style.color = '#e9ecef';
        HPnumber.innerHTML = '0';
        attackNumber.innerHTML = '0';
        defenseNumber.innerHTML = '0';
        speedNumber.innerHTML = '0';
        barAttack.style.width = '0px';
        barDefense.style.width = '0px';
        barHP.style.width = '0px';
        barSpeed.style.width = '0px';
        shiny.style.display = 'none';


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
        shiny.style.backgroundColor = '#e9ecef';
        body.style.background = 'none'
    }
})

next.addEventListener('click', () => {
    if (input.value <= 648) {
        numberPokemon += 1;
        infoPokmeon(numberPokemon)
        secondType.innerHTML = ''
        firstType.innerHTML = ''
        shiny.style.backgroundColor = '#e9ecef';
        body.style.background = 'none'

    }
})

infoPokmeon(numberPokemon)