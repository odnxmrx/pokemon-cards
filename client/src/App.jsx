import './App.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Cards from './components/Cards/Cards';
import Detail from './components/Detail/Detail';
import { getAllPokemons, getAllTypes } from './services/actions';
import NavBar from './components/NavBar/NavBar';
import About from './components/About/About';
import PokemonCreate from './components/PokemonCreate/PokemonCreate';
import Welcome from './components/Welcome/Welcome';
import Footer from './components/Footer/Footer';

function App() {

  const URL_BASE = 'http://localhost:3001/pokemonapi';

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [page, setPage] = useState(0); //initial page 0
  const [pageSize, setPageSize] = useState(12) //items per page

  const [sourceToggle, setSourceToggle] = useState(true); // 'true' -> API source

  useEffect(() => {
    //componentDidMount
    dispatch(getAllPokemons(page, pageSize, sourceToggle));
    dispatch(getAllTypes());
  }, [page, pageSize, sourceToggle]);

  //traer 'types' de estado global
  const allTypes = useSelector(state => state.allTypes);
  const allPokemons = useSelector(state => state.allPokemons);
  console.log('que obtuve en allPokemons? ', allPokemons);

  function onSearch(name) {
    if (!name) return alert('Please, enter Pokémon name.');

    axios(`${URL_BASE}/pokemons/?name=${name}`)
      //.then((response) => { console.log('que es response??: ', response)}, (reason) => { console.log('ques reason??: ', reason);
      .then(({ data }) => {
        if (data?.id) { //verificar si obtuvimos la info
          navigate(`/pokemon/${data.id}`);
        }
        else {
          alert('Pokémon not found.');
        }
      }
      )// catch respuesta (error) del servidor:
      .catch(err => alert(err.message))
  }

  return (
    <div className='pageContainer'>
      {pathname !== '/' && <NavBar />}
      <Routes>
        <Route path='/home' element={<Cards onSearch={onSearch} page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize} sourceToggle={sourceToggle} setSourceToggle={setSourceToggle} />} />
        <Route path='/about' element={<About />} />
        <Route path='/' element={<Welcome />} />
        <Route path='/create' element={<PokemonCreate allTypes={allTypes} />} />
        <Route path='/pokemon/:id' element={<Detail setPage={setPage} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;