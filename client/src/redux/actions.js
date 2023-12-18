import {
  GET_ALL_POKEMONS,
  GET_POKEMON_DETAIL,
  CLEAN_POKEMON_DETAIL,
  GET_ALL_TYPES,
  FILTER_BY_POKEMON_TYPE,
  ORDER_BY_POKEMON_NAME,
  ORDER_BY_POKEMON_ATTACK,
} from "./actionTypes";
import axios from "axios";

const URL_BASE = "http://localhost:3001/pokemonapi";

export const getAllPokemons = (page) => {
  return async function (dispatch) {
    try {
      const { data } = await axios(`${URL_BASE}/pokemons?page=${page}`);
      return dispatch({
        type: GET_ALL_POKEMONS,
        payload: data, //.results
      });
    } catch (error) {
      console.log("mi errrrrror", error);
    }
  };
};

export const getPokemonDetail = (id) => {
  return function (dispatch) {
    axios(`${URL_BASE}/pokemons/${id}`)
      .then(({ data }) => {
        return dispatch({
          type: GET_POKEMON_DETAIL,
          payload: data,
        });
      })
      .catch((error) => {
        console.log(error); //DE MOMENTO. Debo cambiarlo.
      });
  };
};

export const cleanDetail = () => {
  return {
    type: CLEAN_POKEMON_DETAIL,
  };
};

export const getAllTypes = () => {
  return function (dispatch) {
    axios
      .get(`${URL_BASE}/types`)
      .then(({ data }) => {
        return dispatch({
          type: GET_ALL_TYPES,
          payload: data,
        });
      })
      .catch((error) => {
        console.log(error.message); //DE MOMENTO. Debo cambiarlo.
      });
  };
};

export const filterByPokemonType = (type) => {
  return {
    type: FILTER_BY_POKEMON_TYPE,
    payload: type,
  };
};

export const orderByPokemonName = (namesort) => {
  return {
    type: ORDER_BY_POKEMON_NAME,
    payload: namesort,
  };
};

export const orderByPokemonAttack = (attack) => {
    return {
        type: ORDER_BY_POKEMON_ATTACK,
        payload: attack,
    }
}
