import { useSelector, useDispatch } from 'react-redux';
import { filterByPokemonType, orderByPokemonName, orderByPokemonAttack } from '../../redux/actions';
import Card from '../Card/Card';
import Searchbar from '../Searchbar/Searchbar';
import NavigateBtn from '../NavigateBtn/NavigateBtn';
import SourceToggle from '../SourceToggle/SourceToggle';
import style from './Cards.module.css';

export default function Cards({ onSearch, page, setPage, sourceToggle, setSourceToggle }) {

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

            <div className={style.container}>

                <div className={style.filterContainer}>
                    <SourceToggle sourceToggle={sourceToggle} setSourceToggle={setSourceToggle} setPage={setPage} />
                    <Searchbar onSearch={onSearch} />

                    <label for="typefilter">Filter by type:<br />
                        <select name="typefilter" id="typefilter" onChange={handleTypeFilter}>
                            <option value="All">All types</option>
                            {listOfTypes}
                        </select>
                    </label>

                    <label for="nameorder">Order by name:<br />
                        <select name="nameorder" id="nameorder" onChange={handleOrderByName}>
                            {/* <option value="orderpokemon" disabled>Order by name</option> */}
                            <option value="A">Ascendant</option>
                            <option value="D">Descendant</option>
                        </select>
                    </label>

                    <label for="attackorder">Order by attack:<br />
                        <select name="attackorder" id="attackorder" onChange={handleOrderByAttack}>
                            <option value="Menor">Ascendant</option>
                            <option value="Mayor">Descendant</option>
                        </select>
                    </label>

                </div>
                <NavigateBtn page={page} setPage={setPage} allPokemonsLength={allPokemons.length} />
            </div>

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