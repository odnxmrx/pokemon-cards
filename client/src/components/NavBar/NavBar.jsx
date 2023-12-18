import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NavigateBtn from "../NavigateBtn/NavigateBtn";
import Searchbar from '../Searchbar/Searchbar';

export default function NavBar ({page, setPage, onSearch}) {

    const allPokemonsLength = useSelector(state => state.allPokemons.length); //del estado, obtenemos allPokemons
    
    return(
        <div>
            <p>My Nav bar</p>
            <button>
                <Link to='/home'>Home</Link>
            </button>
            <button>
                <Link to='/about'>About</Link>
            </button>
            <button>
                <Link to='/create'>Create</Link>
            </button>
            <Searchbar onSearch={onSearch} />
            <NavigateBtn page={page} setPage={setPage} allPokemonsLength={allPokemonsLength}/>

        </div>
    )
}