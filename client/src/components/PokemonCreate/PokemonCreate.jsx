import axios from "axios";
import { useState } from "react";

const PokemonCreate = ({ allTypes }) => {

    const URL_BASE = 'http://localhost:3001/pokemonapi/pokemons';

    const [newPokemon, setNewPokemon] = useState({
        name: '',
    });
    // console.log('que va siendooooo: ', newPokemon);
    const [pokemonTypeSelection, setPokemonTypeSelection] = useState([]);

    const handleInput = (event) => {
        setNewPokemon({
            ...newPokemon,
            [event.target.name]: event.target.value, //valores dinámicos
            types: pokemonTypeSelection,
        })
    }

    const listOfTypes = allTypes?.map((type, i) => {
        // console.log(type.name);
        return (<><label key={type.id}>
            <input type="checkbox" id={type.name} value={type.name} onChange={validateTypeSelection} />{type.name}
        </label></>)
    })


    function validateTypeSelection(event) {
        if (pokemonTypeSelection.length <= 2 && pokemonTypeSelection.indexOf(event.target.value) === -1) {
            console.log('length del array: ', pokemonTypeSelection.length);
            setPokemonTypeSelection([
                ...pokemonTypeSelection,
                event.target.value
            ])

        } else if (event.target.checked) {
            event.target.checked = false;
            return;
        } else {//(pokemonTypeSelection.length >= 3){
            event.target.checked = false;
            pokemonTypeSelection.splice(pokemonTypeSelection.indexOf(event.target.value), 1);
            alert('Select 1 to 2 Pokémon types only.')
        }
    }

    // const reformatArrayOfTypes = pokemonTypeSelection.map(type => {
    //     var rType = {};
    //     rType['name'] = type;
    //     return rType;
    // })

    const handleSubmit = (event) => {
        event.preventDefault();

        //POST
        axios.post(`${URL_BASE}`, newPokemon).then(response => console.log(response))
            .catch(error => console.log(error.message));

        alert('Pokemon created!')

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

                <fieldset>
                    <legend>Choose up to 2 Pokémon types</legend>
                    {listOfTypes}
                </fieldset>


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