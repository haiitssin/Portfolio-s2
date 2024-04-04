//fetch Pokémon data from the API
async function fetchPokemonData(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();
    return data;
}

// put infomation into this layout for pokemon card?
function generatePokemonCard(pokemon) {
    return `
    <div class="pokecard">
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <h2>${pokemon.name}</h2>
        <p>Height: ${pokemon.height}</p>
        <p>Weight: ${pokemon.weight}</p>
        <p>Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
    </div>
    `;
}

//populate dropdown with Pokémon options
async function populateDropdown() {
    const select = document.getElementById("pokemonSelect");
    select.innerHTML = "";

    // make select the default
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Select";
    select.appendChild(defaultOption);

    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const data = await response.json();
    const pokemons = data.results;

    pokemons.forEach(pokemon => {
        const option = document.createElement("option");
        option.value = pokemon.name;
        option.text = pokemon.name;
        select.appendChild(option);
    });
}

//clear Pokémon team
function clearPokemonTeam() {
    document.getElementById("pokemonCards").innerHTML = "";
    document.getElementById("pokemonSelect").selectedIndex = 0; // Reset to select
}

//dropdown change
document.getElementById("pokemonSelect").addEventListener("change", async function() {
    const selectedPokemon = this.value;
    if (selectedPokemon !== "") {
        const pokemonData = await fetchPokemonData(selectedPokemon);
        const cardHTML = generatePokemonCard(pokemonData);
        document.getElementById("pokemonCards").innerHTML += cardHTML;
    }
});

//clear button
document.getElementById("clearButton").addEventListener("click", clearPokemonTeam);

// Initialize the dropdown
populateDropdown();
