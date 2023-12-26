import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NavigateBtn from "../NavigateBtn/NavigateBtn";
// import Searchbar from '../Searchbar/Searchbar';
import style from './NavBar.module.css';

export default function NavBar() {

    const allPokemonsLength = useSelector(state => state.allPokemons.length); //del estado, obtenemos allPokemons

    return (
        <div className={style.navContainer}>
            <div className={style.navMenu}>
                <ul>
                    <li className={style.myLogo}>
                        <Link to='/home'>Pokémon App</Link>
                    </li>
                    <li>
                        <Link to='/home'>Home</Link>
                    </li>
                    <li>
                        <Link to='/create'>Create</Link>
                    </li>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}