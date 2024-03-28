const select = document.getElementById('pokemon-select');
const detailsDiv = document.getElementById('pokemon-details');

//fetch Pokémon details?
function fetchPokemonDetails(pokemonName) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`) //the link here?//
    .then(response => response.json())
    .then(data => {
      // Display it
      const { name, id, height, weight, sprites } = data;
      const spriteUrl = sprites.front_default;
      detailsDiv.innerHTML = `
        <h3>${name}</h3>
        <p>ID: ${id}</p>
        <p>Height: ${height}</p>
        <p>Weight: ${weight}</p>
        <img src="${spriteUrl}" alt="${name}" style="max-width: 100px;">
      `;
    })
    .catch(error => {
      console.error('Error fetching Pokémon details:', error);
      detailsDiv.innerHTML = '<p>Failed to load Pokémon details</p>';
    });
}

// get Pokémon data from PokeAPI site
fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
  .then(response => response.json())
  .then(data => {
    const pokemons = data.results;
    // Put the things into the drop down from pokemon
    pokemons.forEach(pokemon => {
      const option = document.createElement('option');
      option.value = pokemon.name;
      option.textContent = pokemon.name;
      select.appendChild(option);
    });
    // Remove loading message so it goes away once it loads
    select.options[0].textContent = 'Select a Pokémon';
  })
  .catch(error => {
    console.error('Error fetching Pokémon:', error);
    select.options[0].textContent = 'Failed to load Pokémon';
  });

//dropdown change?
select.addEventListener('change', (event) => {
  const selectedPokemon = event.target.value;
 
  if (selectedPokemon) {
    fetchPokemonDetails(selectedPokemon);
  } else {
    // Clear details if no Pokémon is selected
    detailsDiv.innerHTML = '';
  }
});
