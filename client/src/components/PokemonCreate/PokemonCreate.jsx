import axios from "axios";
import { useState } from "react";

const PokemonCreate = () => {

    const URL_BASE = 'http://localhost:3001/pokemonapi/pokemons';

    const [newPokemon, setNewPokemon] = useState({
        name: '',
    });
    console.log('que va siendooooo: ', newPokemon);

    const handleInput = (event) => {
        setNewPokemon({
            ...newPokemon,
            [event.target.name]: event.target.value //valores dinámicos
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        //POST
        axios.post(`${URL_BASE}`, {
            newPokemon
        }).then(response => console.log(response))
        .catch(error => console.log(error.message));

    }

    return (
        <>
            <form action='' id="pokemon-create" onSubmit={handleSubmit}>

                <label htmlFor="">Name: 
                    <input 
                        type="text"
                        id='name'
                        name='name' 
                        placeholder='Pokémon name'
                        onChange={handleInput}
                    />
                </label>

                <label htmlFor="">HP:
                    <input 
                        type="number" 
                        name="hp" 
                        id="hp"
                        min="0"
                        max="255"
                        onChange={handleInput}
                    />
                </label>

                <label htmlFor="">Attack:
                    <input 
                        type="number" 
                        name="attack" 
                        id="attack"
                        min="0"
                        max="150"
                        onChange={handleInput}
                    />
                </label>

                <label htmlFor="">Defense:
                    <input 
                        type="number" 
                        name="defense" 
                        id="defense"
                        min="0"
                        max="150"
                        onChange={handleInput}
                    />
                </label>

                <label htmlFor="">Speed:
                    <input 
                        type="number" 
                        name="speed" 
                        id="speed"
                        min="0"
                        max="150"
                        onChange={handleInput}
                    />
                </label>

                <label htmlFor="">Height:
                    <input 
                        type="number" 
                        name="height" 
                        id="height"
                        min="0"
                        max="150"
                        onChange={handleInput}
                    />
                </label>

                <label htmlFor="">Weight:
                    <input 
                        type="number" 
                        name="weight" 
                        id="weight"
                        min="0"
                        max="150"
                        onChange={handleInput}
                    />
                </label>

                <label htmlFor="">Types:
                    <input 
                        type="number" 
                        name="types" 
                        id="types"
                        onChange={handleInput}
                    />
                </label>

                <label htmlFor="">image:
                    <input 
                        type="text" 
                        name="image" 
                        id="image"
                        placeholder="Image URL"
                        onChange={handleInput}
                    />
                </label>

                <button type='submit' id='submit' >Create Pokémon</button>
            </form>
        </>
    )
}

export default PokemonCreate;