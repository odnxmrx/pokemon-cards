import axios from "axios";
import { useState, useEffect } from "react";
import { validatePokemon } from "./validation";
import style from './PokemonCreate.module.css';
import BackButton from "../BackButton/BackButton";

const PokemonCreate = ({ allTypes }) => {

    const URL_BASE = 'http://localhost:3001/pokemonapi/pokemons';

    const [newPokemon, setNewPokemon] = useState({
        name: '',
    });
    // console.log('que va siendooooo: ', newPokemon);
    const [pokemonTypeSelection, setPokemonTypeSelection] = useState([]);

    const [errors, setErrors] = useState({}); //error validator

    const handleInput = (event) => {
        setNewPokemon({
            ...newPokemon,
            [event.target.name]: event.target.value, //valores dinámicos
            types: pokemonTypeSelection, //array of types
        })
        setErrors(validatePokemon(newPokemon));
    }

    const listOfTypes = allTypes?.map((type, i) => {
        // console.log(type.name);
        return (<label key={type.id}>
            <input type="checkbox" id={type.name} value={type.name} />{type.name}
        </label>)
    })

    //******************puedo modularizar: (en error handler) */
    function validateTypeSelection(event) {
        if (pokemonTypeSelection.length < 2 && pokemonTypeSelection.indexOf(event.target.value) === -1) {
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
            // alert('Select 1 to 2 Pokémon types only.')
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
        axios.post(`${URL_BASE}`, newPokemon).then(response => {
            alert(response.data)
            console.log('que fue response.data al crear el pokemon??? ', response.data);
            setNewPokemon({
                name:'',
                attack:'',
                defense:'',
                height:'',
                hp:'',
                image:'',
                speed:'',
                types: [],
                weight:'',
            })
        })
            .catch(error => alert(error.response.data.error));
    };

    const disableBtnValidator = () => {
        return (
            [newPokemon.name, newPokemon.image, newPokemon.hp, newPokemon.attack, newPokemon.defense, newPokemon.types].every(Boolean)
            &&
            newPokemon.types.length > 0
        )
    }

    return (
        <div className={style.formContainer}>
            <BackButton />
            <form action='' id="pokemon-create" onSubmit={handleSubmit}>

                <label htmlFor="">Name:
                    <input
                        type="text"
                        id='name'
                        name='name'
                        placeholder='Pokémon name'
                        value={newPokemon.name}
                        onChange={handleInput}
                    />
                </label>
                {errors.name && <small>*{errors.name}</small>}

                <label htmlFor="">HP:
                    <input
                        type="number"
                        name="hp"
                        id="hp"
                        min="0"
                        max="255"
                        value={newPokemon.hp}
                        onChange={handleInput}
                    />
                </label>
                {errors.hp && <small>*{errors.hp}</small>}


                <label htmlFor="">Attack:
                    <input
                        type="number"
                        name="attack"
                        id="attack"
                        min="0"
                        max="180"
                        value={newPokemon.attack}
                        onChange={handleInput}
                    />
                </label>
                {errors.attack && <small>*{errors.attack}</small>}


                <label htmlFor="">Defense:
                    <input
                        type="number"
                        name="defense"
                        id="defense"
                        min="0"
                        max="230"
                        value={newPokemon.defense}
                        onChange={handleInput}
                    />
                </label>
                {errors.defense && <small>*{errors.defense}</small>}


                <label htmlFor="">Speed:
                    <input
                        type="number"
                        name="speed"
                        id="speed"
                        min="0"
                        max="180"
                        value={newPokemon.speed}
                        onChange={handleInput}
                    />
                </label>
                {errors.speed && <small>*{errors.speed}</small>}


                <label htmlFor="">Height:
                    <input
                        type="number"
                        name="height"
                        id="height"
                        min="0"
                        max="20"
                        value={newPokemon.height}
                        onChange={handleInput}
                    />
                </label>
                {errors.height && <small>*{errors.height}</small>}


                <label htmlFor="">Weight:
                    <input
                        type="number"
                        name="weight"
                        id="weight"
                        min="0"
                        max="400"
                        value={newPokemon.weight}
                        onChange={handleInput}
                    />
                </label>
                {errors.weight && <small>*{errors.weight}</small>}


                <fieldset onChange={validateTypeSelection} >
                    <legend>Choose up to 2 Pokémon types</legend>
                    {listOfTypes}
                </fieldset>


                <label htmlFor="">image:
                    <input
                        type="text"
                        name="image"
                        id="image"
                        placeholder="Image URL"
                        value={newPokemon.image}
                        onChange={handleInput}
                    />
                </label>
                {errors.image && <small>*{errors.image}</small>}

                <button type='submit' id='submit' disabled={!disableBtnValidator()} >Create Pokémon</button>
            </form>
        </div>
    )
}

export default PokemonCreate;