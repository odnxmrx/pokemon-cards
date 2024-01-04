import {
  GET_ALL_POKEMONS,
  GET_POKEMON_DETAIL,
  CLEAN_POKEMON_DETAIL,
  GET_ALL_TYPES,
  FILTER_BY_POKEMON_TYPE,
  ORDER_BY_POKEMON_NAME,
  ORDER_BY_POKEMON_ATTACK,
  SET_FILTER_OPTIONS,
} from "./actionTypes";

const initialState = {
  allPokemons: [],
  pokemonDetail: {},
  allTypes: [],
  AllpokemonAux: [],
  filterOptions: {
    type: 'All',
    orderByName: 'A',
    orderByAttack: 'Menor',
  },
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        allPokemons: payload,
        AllpokemonAux: payload,
      };
    case GET_POKEMON_DETAIL:
      return {
        ...state,
        pokemonDetail: payload,
      };
    case CLEAN_POKEMON_DETAIL:
      return {
        ...state,
        pokemonDetail: {},
      };
    case GET_ALL_TYPES:
      return {
        ...state,
        allTypes: payload,
      };
    case FILTER_BY_POKEMON_TYPE:
      const pokemonByType = [...state.allPokemons].filter((pokemon) => {
        return pokemon.types.some((type) => type.name === payload);
      });

      return {
        ...state,
        allPokemons: payload === "All" ? state.AllpokemonAux : pokemonByType,
      };
    case ORDER_BY_POKEMON_NAME:
      const sortPokemonByName = [...state.AllpokemonAux];

      sortPokemonByName.sort((firstEl, secondEl) => {
        if (payload === "A") {
          return firstEl.name.localeCompare(secondEl.name); //ordenando caracteres no ASCII
        } else if (payload === "D") {
          return secondEl.name.localeCompare(firstEl.name);
        }
        // if (payload === "A") {
        //   return firstEl.name - secondEl.name;
        // } else if (payload === "D") {
        //   return secondEl.name - firstEl.name;
        // }
      });

      return {
        ...state,
        allPokemons: sortPokemonByName,
      };
    case ORDER_BY_POKEMON_ATTACK:
      const sortPokemonByAttack = [...state.allPokemons].sort(
        (firstEl, secondEl) => {
          if (payload === "Menor") {
            return firstEl.attack - secondEl.attack;
          } else if (payload === "Mayor") {
            return secondEl.attack - firstEl.attack;
          }
        }
      );

      return {
        ...state,
        allPokemons: sortPokemonByAttack,
      };
    case SET_FILTER_OPTIONS:
      return {
        ...state,
        filterOptions: payload
      }
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
