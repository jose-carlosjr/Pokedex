const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')

const form = document.querySelector('.form')
const input = document.querySelector('.input__search')

// FUNÇÃO QUE BUSCA OS DADOS DA API
const fetchPokemon = async (pokemon) => {
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)

    if (APIresponse.status === 200) {
        const data = await APIresponse.json()
        return data
    } else {
        alert('Not Found')
    }
}

// FUNÇÃO QUE RENDERIZA OS DADOS DO POKÉMON NA TELA
const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon)

    // CASO O POKÉMON DIGITADO NÃO EXISTA O data DEVE SER 'undefined', ENTÃO COLOCAMOS TUDO DENTRO DE UMA CONDIÇÃO. CASO O data SE CONFIRME (OU SEJA, CASO O PKM EXISTA) SEGUE A FUNÇÃO. SENÃO, NÃO FAZ NADA.
    if (data) {
        pokemonNumber.innerText = data.id + ' -'
        pokemonName.innerText = data.name
        // EVITAR PASSAR OS OBJETOS ATRAVÉS DE PONTOS QUANDO OS MESMOS TIVEREM HÍFEN, PRA EVITAR ERRO
        // EXEMPLO: data.generation-v | data['generation-v']
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    }

    input.value = ''
    
    console.log(data)
}

// ATRAVÉS DO FORMULÁRIO ESSA ARROW FUNCTION CHAMA A FUNÇÃO DE RENDERIZAR O POKÉMON
form.addEventListener('submit', (event) => {
    // PREVINE O COMPORTAMENTO PADRÃO DO FORMULÁRIO
    event.preventDefault()
    renderPokemon(input.value)
})