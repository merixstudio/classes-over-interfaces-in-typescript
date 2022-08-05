import axios from "axios";

interface Pokemon {
    name: string;
    types: Array<{
        type: {
            name: 'poison' | 'grass';
        };
    }>;
}

async function fetchPokemon({pokemonName}: { pokemonName: string }): Promise<Pokemon> {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    return response.data;
}

function poisonAttack(pokemon: Pokemon) {
    const hasPoison = pokemon.types.some(({type}) => type.name === "poison");
    if (!hasPoison) {
        return;
    }

    console.log(`${pokemon.name} has poisoned you!`);
}

async function main() {
    const bulbasaur = await fetchPokemon({pokemonName: 'bulbasaur'});

    if (bulbasaur.types.some(({type}) => type.name === "poison")) {
        console.log('Pokemon can poisons you!');
    }

    await poisonAttack(bulbasaur);
}

main();
