import axios from "axios";
import * as Joi from "joi";

class Pokemon {
    name: string;
    types: Array<{
        type: {
            name: 'poison' | 'grass';
        };
    }>;

    constructor(data: Partial<Pokemon>) {
        this.validate(data);
        Object.assign(this, data);
    }

    validate(data: Partial<Pokemon>) {
        const validationSchema = Joi.object({
            name: Joi.string(),
            types: Joi.array().items(
                Joi.object({
                    type: Joi.object({
                        name: Joi.string().valid('poison', 'grass')
                    }).unknown()
                }).unknown()
            )
        }).unknown();
        const {error} = validationSchema.validate(data);

        if (error) {
            throw new Error(error.message);
        }
    }

    hasPoison(): boolean {
        return this.types.some(({type}) => type.name === "poison");
    }

    poisonAttack(): void {
        if (!this.hasPoison()) {
            return;
        }

        console.log(`${this.name} has poisoned you!`)
    }
}

async function fetchPokemon({pokemonName}: { pokemonName: string }): Promise<Pokemon> {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    return new Pokemon(response.data);
}

async function main() {
    const bulbasaur = await fetchPokemon({pokemonName: 'bulbasaur'});

    if (bulbasaur.hasPoison()) {
        console.log('Pokemon can poisons you!');
    }

    await bulbasaur.poisonAttack();
}

main();
