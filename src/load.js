const pokemons = []
async function loadPokemons() {
    const requestPokemons = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=150')
    let pokes = await requestPokemons.json()
    for (let i = 0; i < pokes.results.length; i++) {
        const element = pokes.results[i]
        const requestPokemon = await fetch(element.url)
        let pokemon = await requestPokemon.json()
        pokemons[i] = pokemon
    }
}