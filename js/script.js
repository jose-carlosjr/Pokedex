const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')

const fetchPokemon = async (pokemon) => {
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const data = await APIresponse.json()
    return data
}

const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon)

    pokemonNumber.innerText = data.id + ' -'
    pokemonName.innerText = data.name
    // EVITAR PASSAR OS OBJETOS ATRAVÉS DE PONTOS QUANDO OS MESMOS TIVEREM HÍFEN, PRA EVITAR ERRO
    // EXEMPLO: data.generation-v | data['generation-v']
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    
    console.log(data)
}

renderPokemon('mew')