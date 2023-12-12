import { GET_ALL_POKEMONS, GET_POKEMON_DETAIL, CLEAN_POKEMON_DETAIL } from "./actionTypes";
import axios from 'axios';

const URL_BASE = 'http://localhost:3001/pokemonapi';
// const URL_BASE = 'https://jsonplaceholder.typicode.com/users';

export const getAllPokemons = (page) => {
    return async function(dispatch) {
        try {
            const { data } = await axios(`${URL_BASE}/pokemons?page=${page}`)
            return dispatch({
                type: GET_ALL_POKEMONS,
                payload: data //.results
            })
        } catch (error) {
            console.log('mi errrrrror', error);
        }
    }
};

export const getPokemonDetail = (id) => {
    return function(dispatch) {
        axios(`${URL_BASE}/pokemons/${id}`)
        .then(({data}) => {
            return dispatch({
                type: GET_POKEMON_DETAIL,
                payload: data
            })
        })
        .catch((error) => {
            console.log(error); //DE MOMENTO. Debo cambiarlo.
        })
    }
};

export const cleanDetail = () => {
    return {
        type: CLEAN_POKEMON_DETAIL
    }
}