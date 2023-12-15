import { useSelector } from 'react-redux';
import Card from '../Card/Card';
// import NavigateBtn from '../NavigateBtn/NavigateBtn';

export default function Cards() {

    const allPokemons = useSelector(state => state.allPokemons); //del estado, obtenemos allPokemons

    return(
        <div>
            <h1>Cards.</h1>
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