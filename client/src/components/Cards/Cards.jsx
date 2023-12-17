import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import style from './Cards.module.css';

export default function Cards() {

    const allPokemons = useSelector(state => state.allPokemons); //del estado, obtenemos allPokemons
    return (
        <div className={style.mainContainer}>
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