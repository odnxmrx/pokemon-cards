import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../Card/Card';
import { getAllPokemons } from '../../redux/actions';
import NavPage from '../NavPage/NavPage';

export default function Cards() {

    const dispatch = useDispatch();
    const [page, setPage] = useState(0); //paginado inicial 1

    const allPokemons = useSelector(state => state.allPokemons); //del estado, obtenemos allPokemons

    console.log('ke es al pokemons : ',allPokemons);

    useEffect(() => {
        dispatch(getAllPokemons(page)); //componentDidMount
    }, [page]);

    return(
        <div>
            <h1>Cards.</h1>
            <NavPage page={page} setPage={setPage} allPokemonsLength={allPokemons.length}/>
            {
                allPokemons?.map((pokemon) => {
                    return(
                        <Card 
                            key={pokemon.id}
                            id={pokemon.id}
                            name={pokemon.name}
                            hp={pokemon.hp}
                            attack={pokemon.attack}
                            types={pokemon.types}
                        />
                    )
                })
            }
        </div>
    )
}