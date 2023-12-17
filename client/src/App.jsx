import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Cards from './components/Cards/Cards';
import Detail from './components/Detail/Detail';
import { getAllPokemons } from './redux/actions';
import NavBar from './components/NavBar/NavBar';
import About from './components/About/About';
import PokemonCreate from './components/PokemonCreate/PokemonCreate';

function App() {

  const URL_BASE = 'http://localhost:3001/pokemonapi';

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(0); //paginado inicial 0

  useEffect(() => {
    dispatch(getAllPokemons(page)); //componentDidMount
  }, [page]);


  function onSearch(name) {
    if (!name) return alert('Please, enter Pokémon name.');
    
    axios(`${URL_BASE}/pokemons/?name=${name}`)
      .then(({ data }) => {
          if (data.name) { //verificar si obtuvimos la info
            navigate(`/pokemon/${data.id}`);
          } else {
            alert('Pokémon not found.');
          }
        }
      )// catch respuesta (error) del servidor:
      .catch(err => alert(`${err.response.data.error}`)) //console.log(err.message))
  }

  return (
    <div>
      <NavBar page={page} setPage={setPage} onSearch={onSearch} />
      <Routes>
        <Route path='/home' element={<Cards />} />
        <Route path='/about' element={<About />} />
        <Route path='/create' element={<PokemonCreate />} />
        <Route path='/pokemon/:id' element={<Detail />} />
        {/* <Route path='' element={} /> */}
      </Routes>
    </div>
  )
}

export default App
