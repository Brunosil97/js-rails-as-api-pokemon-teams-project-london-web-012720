const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainDiv = document.querySelector('main')



const putTrainersOnPage = (trainers) => {
  
    trainers.forEach (trainer => {
        let pokeString = ""
        trainer.pokemons.forEach(pokemon => {
            pokeString += `<li> ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}> Release <button></li>`
        })
        mainDiv.innerHTML += `<div class="card" data-id="${trainer.id}"> <p>${trainer.name}</p>
        <button data-trainer-id="${trainer.id}"> Add Pokemon </button> 
        <ul>${pokeString}</ul>
        </div>
        `
    })

    const addPokemon = (pokemon) => {
        mainDiv.children[pokemon.trainer_id-1].lastElementChild.innerHTML +=
        `<li> ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}> Release <button></li>`
    }

    mainDiv.addEventListener('click', event => {
        
        if (event.target.dataset.trainerId !== undefined) {
            fetch(POKEMONS_URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    trainer_id: event.target.dataset.trainerId
                })
            })
            .then(res => res.json())
            .then(addPokemon)
        }

        if (event.target.dataset.pokemonId !== undefined) {
            event.target.parentElement.remove()
            fetch(POKEMONS_URL + '/' + event.target.dataset.pokemonId, {
                method: 'DELETE'
            })
        }
      })
}

fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(putTrainersOnPage)

   