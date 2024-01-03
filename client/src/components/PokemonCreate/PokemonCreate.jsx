import axios from "axios";
import { useState, useEffect } from "react";
import { validatePokemon } from "../../utils/validation";
import style from './PokemonCreate.module.css';
import BackButton from "../BackButton/BackButton";
import pokemonlabpic from '../../assets/pokemon_lab_by_jynxedones_d93e28q-375w-2x.jpg';

const PokemonCreate = ({ allTypes, setPage }) => {

    const URL_BASE = 'http://localhost:3001/pokemonapi/pokemons';

    const [newPokemon, setNewPokemon] = useState({
        name: '',
    });
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
        return (<label key={type.id}>
            <input type="checkbox" id={type.name} value={type.name} />{type.name}
        </label>)
    })

    /* Type validator*/
    function validateTypeSelection(event) {
        if (pokemonTypeSelection.length < 2 && pokemonTypeSelection.indexOf(event.target.value) === -1) {
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
            alert(response.data);
            setNewPokemon({
                name: '',
                attack: '',
                defense: '',
                height: '',
                hp: '',
                image: '',
                speed: '',
                // types: [],
                weight: '',
            });
            setPage(0);
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
        <div>
            <BackButton />
            <h2>Pokémon Lab</h2>
            <p>Create your own Pokémon! Provide the following data:</p>
            <div className={style.formContainer}>

                <div className={style.leftContainer}>
                    <form action='' id="pokemonCreate" onSubmit={handleSubmit}>

                        <span className={style.leftItem}>
                            <label htmlFor="name">Name:
                            </label>
                        </span>

                        <span className={style.rightItem}>
                            <input
                                type="text"
                                id='name'
                                name='name'
                                placeholder='Pokémon name'
                                value={newPokemon.name}
                                onChange={handleInput}
                            />
                        </span>

                        <div className={style.errorLog}>
                            {errors.name && <small>*{errors.name}</small>}
                        </div>

                        <span className={style.leftItem}>
                            <label htmlFor="hp">HP:
                            </label>
                        </span>

                        <span className={style.rightItem}>
                            <input
                                type="number"
                                name="hp"
                                id="hp"
                                min="0"
                                max="255"
                                placeholder="1-255"
                                value={newPokemon.hp}
                                onChange={handleInput}
                            />
                        </span>

                        <div className={style.errorLog}>
                            {errors.hp && <small>*{errors.hp}</small>}
                        </div>

                        <span className={style.leftItem}>
                            <label htmlFor="attack">Attack:
                            </label>
                        </span>
                        <span className={style.rightItem}>
                            <input
                                type="number"
                                name="attack"
                                id="attack"
                                min="0"
                                max="180"
                                placeholder="1-180"
                                value={newPokemon.attack}
                                onChange={handleInput}
                            />
                        </span>

                        <div className={style.errorLog}>
                            {errors.attack && <small>*{errors.attack}</small>}
                        </div>

                        <span className={style.leftItem}>
                            <label htmlFor="defense">Defense:
                            </label>
                        </span>
                        <span className={style.rightItem}>
                            <input
                                type="number"
                                name="defense"
                                id="defense"
                                min="0"
                                max="230"
                                placeholder="0-230"
                                value={newPokemon.defense}
                                onChange={handleInput}
                            />
                        </span>

                        <div className={style.errorLog}>
                            {errors.defense && <small>*{errors.defense}</small>}
                        </div>

                        <span className={style.leftItem}>
                            <label htmlFor="speed">Speed:
                            </label>
                        </span>
                        <span className={style.rightItem}>
                            <input
                                type="number"
                                name="speed"
                                id="speed"
                                min="0"
                                max="180"
                                placeholder="0-180"
                                value={newPokemon.speed}
                                onChange={handleInput}
                            />
                        </span>

                        <div className={style.errorLog}>
                            {errors.speed && <small>*{errors.speed}</small>}
                        </div>

                        <span className={style.leftItem}>
                            <label htmlFor="height">Height:
                            </label>
                        </span>

                        <span className={style.rightItem}>
                            <input
                                type="number"
                                name="height"
                                id="height"
                                min="0"
                                max="20"
                                placeholder="0-20"
                                value={newPokemon.height}
                                onChange={handleInput}
                            />
                        </span>

                        <div className={style.errorLog}>
                            {errors.height && <small>*{errors.height}</small>}
                        </div>

                        <span className={style.leftItem}>
                            <label htmlFor="weight">Weight:
                            </label>
                        </span>

                        <span className={style.rightItem}>
                            <input
                                type="number"
                                name="weight"
                                id="weight"
                                min="0"
                                max="400"
                                placeholder="0-400"
                                value={newPokemon.weight}
                                onChange={handleInput}
                            />
                        </span>

                        <div className={style.errorLog}>
                            {errors.weight && <small>*{errors.weight}</small>}
                        </div>
                        <br />

                        <fieldset onChange={validateTypeSelection} >
                            <legend>Choose up to 2 Pokémon types</legend>
                            {listOfTypes}
                        </fieldset>
                        <br />

                        <span className={style.leftItem}>
                            <label htmlFor="">image:
                            </label>
                        </span>
                        <span className={style.rightItem}>
                            <input
                                type="text"
                                name="image"
                                id="image"
                                placeholder="Image URL"
                                value={newPokemon.image}
                                onChange={handleInput}
                            />
                        </span>
                        <div className={style.errorLog}>
                            {errors.image && <small>*{errors.image}</small>}
                        </div>
                        <br />
                        <button
                            type='submit'
                            id='submit'
                            className={style.formButton}
                            disabled={!disableBtnValidator()}
                        >Create Pokémon
                        </button>
                    </form>
                </div>
                <div className={style.rightContainer}>
                    <img src={pokemonlabpic} alt="Pokemon lab image" />
                    {/*as found on deviantart https://www.deviantart.com/jynxedones/art/Pokemon-Lab-549890522 */}
                </div>
            </div>
        </div>
    )
}

export default PokemonCreate;