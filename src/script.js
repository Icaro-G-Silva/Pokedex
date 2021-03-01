loadPokemons().then(loadEvolutions).then(load.bind(this, [0]))

var indexAtual = 0
const pokemonAmount = 76

function load(index) {
    items = document.getElementsByClassName('evolutions__item')
    items = Array.from(items)
    element = evolutions[index]
    
    items.forEach((div, index) => {
        if(element[index]){    
            div.style.display = 'flex'
            types = []

            element[index].types.forEach(t => types.push(t.type.name))

            div.children[0].src = element[index].sprites.front_default;       
            div.children[1].children[1].innerText = ` ${element[index].name}`
            div.children[2].children[1].innerText = ` ${types.toString()}`
        }
        else div.style.display = 'none'
    })
}

async function loadEvolutions() {
    evolutions = []
    for (let i = 1; i <= pokemonAmount + 1; i++) {
        chain = []
        const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${i}`)
        const evolution = await response.json()
        chain_step = evolution.chain

        while (chain_step.evolves_to.length > 0) {
            actualPokemon = pokemons.find(item => item.name === chain_step.species.name)
            actualPokemon ? chain.push(actualPokemon) : null
            chain_step = chain_step.evolves_to[0]
        }
        actualPokemon = pokemons.find(item => item.name === chain_step.species.name)
        actualPokemon ? chain.push(actualPokemon) : null

        evolutions.push(chain)
    }
}

function nextPokemon() {
    if (indexAtual < pokemonAmount){
        indexAtual++
        load(indexAtual)
    }
}

function previousPokemon() {
    if (indexAtual > 0){
        indexAtual--
        load(indexAtual)
    }
}
