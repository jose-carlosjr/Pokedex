const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')

const form = document.querySelector('.form')
const input = document.querySelector('.input__search')

const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

// VARIÁVEL QUE INCREMENTA E DECREMENTA O ID DO POKÉMON PARA AS FUNÇÕES DOS BOTÕES NEXT > E < PREV
let searchPokemon = 1

// FUNÇÃO QUE BUSCA OS DADOS DA API
const fetchPokemon = async (pokemon) => {
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if (APIresponse.status === 200) {
        const data = await APIresponse.json()
        return data
    }
}

// FUNÇÃO QUE RENDERIZA OS DADOS DO POKÉMON NA TELA
const renderPokemon = async (pokemon) => {
    pokemonNumber.innerText = ''
    pokemonName.innerText = 'Loading...'

    const data = await fetchPokemon(pokemon)

    // CASO O POKÉMON DIGITADO NÃO EXISTA O data DEVE SER 'undefined', ENTÃO COLOCAMOS TUDO DENTRO DE UMA CONDIÇÃO. CASO O data SE CONFIRME (OU SEJA, CASO O PKM EXISTA) SEGUE A FUNÇÃO. SENÃO, NÃO FAZ NADA.
    if (data) {
        pokemonImage.style.display = 'block'
        pokemonNumber.innerText = data.id + ' -'
        pokemonName.innerText = data.name
        // EVITAR PASSAR OS OBJETOS ATRAVÉS DE PONTOS QUANDO OS MESMOS TIVEREM HÍFEN, PRA EVITAR ERRO
        // EXEMPLO: data.generation-v | data['generation-v']
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        searchPokemon = data.id
    } else {
        pokemonImage.style.display = 'none'
        pokemonName.innerText = 'Not Found'
        pokemonNumber.innerText = '??? -'
    }

    input.value = ''
    
    console.log(data)
}

// ATRAVÉS DO FORMULÁRIO ESSA ARROW FUNCTION CHAMA A FUNÇÃO DE RENDERIZAR O POKÉMON
form.addEventListener('submit', (event) => {
    // PREVINE O COMPORTAMENTO PADRÃO DO FORMULÁRIO
    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
})

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }
})

buttonNext.addEventListener('click', () => {
    if (searchPokemon < 1025) {
        searchPokemon += 1
        renderPokemon(searchPokemon)
    }
})

renderPokemon(searchPokemon)