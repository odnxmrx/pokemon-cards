import { useSelector, useDispatch } from 'react-redux';
import { getAllPokemons } from '../../services/actions';
import Card from '../Card/Card';
import Searchbar from '../Searchbar/Searchbar';
import NavigateBtn from '../NavigateBtn/NavigateBtn';
import SourceToggle from '../SourceToggle/SourceToggle';
import style from './Cards.module.css';
import NavigatorPack from '../NavigatorPack/NavigatorPack';
import { useEffect } from 'react';
import FilterOrder from '../FilterOrder/FilterOrder';

export default function Cards({ onSearch, page, setPage, pageSize, setPageSize, sourceToggle, setSourceToggle }) {

    const dispatch = useDispatch();
    const { allPokemons } = useSelector(state => state); //del estado, obtenemos allPokemons
    // const { filterOptions } = useSelector(state => state);


    useEffect(()=> { //Al montar, consultar
        dispatch(getAllPokemons(page, pageSize, sourceToggle));
    }, []);

    return (
        <div className={style.mainContainer}>

            <div className={style.container}>

                <div className={style.filterContainer}>
                    <SourceToggle sourceToggle={sourceToggle} setSourceToggle={setSourceToggle} setPage={setPage} />
                    <Searchbar onSearch={onSearch} />
                    <FilterOrder />
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
            <NavigatorPack page={page} setPage={setPage} setPageSize={setPageSize} allPokemonsLength={allPokemons.length} />
        </div>
    )
}