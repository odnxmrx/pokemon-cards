import { GET_ALL_POKEMONS, GET_POKEMON_DETAIL, CLEAN_POKEMON_DETAIL } from "./actionTypes";

const initialState = {
    allPokemons: [],
    pokemonDetail: {}
}

const rootReducer = ( state = initialState, {type, payload}) => {
    switch (type) {
        case GET_ALL_POKEMONS:
            return {
                ...state,
                allPokemons: payload
            }
        case GET_POKEMON_DETAIL:
            return {
                ...state,
                pokemonDetail: payload
            }
        case CLEAN_POKEMON_DETAIL:
            return {
                ...state,
                pokemonDetail: {}
            }
        default:
            return {
                ...state
            }
    }
}

export default rootReducer;