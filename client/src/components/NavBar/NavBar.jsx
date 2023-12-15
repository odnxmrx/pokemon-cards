import { useSelector } from 'react-redux';
import NavigateBtn from "../NavigateBtn/NavigateBtn";
import Searchbar from '../Searchbar/Searchbar';

export default function NavBar ({page, setPage, onSearch}) {

    const allPokemons = useSelector(state => state.allPokemons); //del estado, obtenemos allPokemons

    return(
        <div>
            <p>My Nav bar</p>
            <Searchbar  onSearch={onSearch} />
            <NavigateBtn page={page} setPage={setPage} allPokemonsLength={allPokemons.length}/>

        </div>
    )
}