import { useSelector, useDispatch } from 'react-redux';
import { filterByPokemonType, orderByPokemonName, orderByPokemonAttack } from '../../redux/actions';
import Card from '../Card/Card';
import style from './Cards.module.css';

export default function Cards() {

    const dispatch = useDispatch();
    const allPokemons = useSelector(state => state.allPokemons); //del estado, obtenemos allPokemons

    let tiposDisponibles = []; //los 'types' que están en montaje actual
    allPokemons?.map(({ types }) => {
        types.forEach(element => {
            if (tiposDisponibles.indexOf(element.name) === -1) {
                tiposDisponibles.push(element.name);
            }
        })
    })

    // console.log(tiposDisponibles);
    const listOfTypes = tiposDisponibles?.map((type, i) => {
        return <option key={i} value={type}>{type}</option>
    })

    const handleTypeFilter = (event) => {
        dispatch(filterByPokemonType(event.target.value));
    };

    const handleOrderByName = (event) => {
        dispatch(orderByPokemonName(event.target.value));
    };

    const handleOrderByAttack = (event) => {
        dispatch(orderByPokemonAttack(event.target.value));
    };

    return (
        <div className={style.mainContainer}>

            <label for="typefilter">Filter by Pokémon type:</label>
            <select name="typefilter" id="typefilter" onChange={handleTypeFilter}>
                <option value="All">All types</option>
                {listOfTypes}
            </select>

            <label for="nameorder">Order by name:</label>
            <select name="nameorder" id="nameorder" onChange={handleOrderByName}>
                {/* <option value="orderpokemon" disabled>Order by name</option> */}
                <option value="A">Ascendant</option>
                <option value="D">Descendant</option>
            </select>

            <label for="attackorder">Order by Pokémon attack:</label>
            <select name="attackorder" id="attackorder" onChange={handleOrderByAttack}>
                <option value="Menor">Ascendant</option>
                <option value="Mayor">Descendant</option>
            </select>

            <h1>Cards.</h1>
            <div className={style.container}>
                {
                    allPokemons?.map((pokemon) => {
                        return (
                            <Card
                                key={pokemon.id}
                                id={pokemon.id}
                                name={pokemon.name}
                                image={pokemon.image}
                                hp={pokemon.hp}
                                attack={pokemon.attack}
                                types={pokemon.types}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}