import { useSelector, useDispatch } from 'react-redux';
import { getAllPokemons, filterByPokemonType, orderByPokemonName, orderByPokemonAttack, setFilterOptions } from '../../services/actions';
import { useEffect } from 'react';
import style from './FilterOrder.module.css';


const FilterOrder = () => {

    const dispatch = useDispatch();
    const { allPokemons } = useSelector(state => state); //del estado, obtenemos allPokemons
    const { filterOptions } = useSelector(state => state);
    const { type, orderByName, orderByAttack } = useSelector(state => state.filterOptions);

    let tiposDisponibles = []; //los 'types' que están en montaje actual
    allPokemons.map(({ types }) => {
        types.forEach(element => {
            if (tiposDisponibles.indexOf(element.name) === -1) {
                tiposDisponibles.push(element.name);
            }
        })
    });

    const listOfTypes = tiposDisponibles?.map((type, i) => {
        return <option key={i} value={type}>{type}</option>
    });

    // const handleOnChange = (event) => {
    //     dispatch(setFilterOptions({
    //         ...filterOptions,
    //         [event.target.name]: event.target.value
    //     }))
    // }

    const handleTypeFilter = (event) => {
        const newFilterType = event.target.value;
        dispatch(setFilterOptions({ ...filterOptions, type: event.target.value }));
        dispatch(filterByPokemonType(newFilterType));
      };

      const handleOrderByName = (event) => {
        const newOrderByName = event.target.value;
        dispatch(setFilterOptions({ ...filterOptions, orderByName: event.target.value }));
        dispatch(orderByPokemonName(newOrderByName));
      };

      const handleOrderByAttack = (event) => {
        const newOrderByAttack = event.target.value;
        dispatch(setFilterOptions({ ...filterOptions, orderByAttack: event.target.value }));
        dispatch(orderByPokemonAttack(newOrderByAttack));
      };

    // useEffect(() => {
        // dispatch(setFilterOptions({ type, orderByName, orderByAttack }));
        // dispatch(filterByPokemonType(type));
        // dispatch(orderByPokemonName(orderByName));
        // dispatch(orderByPokemonAttack(orderByAttack));
    // }, [type, orderByName, orderByAttack ])

    return (
        <span className={style.filterOrder}>

            <label for="type">Filter by type:<br />
                <select name="type" id="type" value={type} onChange={handleTypeFilter}>
                    <option value="All" >All types</option>
                    {listOfTypes}
                </select>
            </label>

            <label for="orderByName">Order by name:<br />
                <select name="orderByName" id="orderByName" onChange={handleOrderByName} value={orderByName}>
                    {/* <option value="orderpokemon" disabled>Order by name</option> */}
                    <option value="A">Ascendant</option>
                    <option value="D">Descendant</option>
                </select>
            </label>

            <label for="orderByAttack">Order by attack:<br />
                <select name="orderByAttack" id="orderByAttack" onChange={handleOrderByAttack} value={orderByAttack}>
                    <option value="Menor">Ascendant</option>
                    <option value="Mayor">Descendant</option>
                </select>
            </label>

        </span>
    )
}

export default FilterOrder;