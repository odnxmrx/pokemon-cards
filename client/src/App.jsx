import './App.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Cards from './components/Cards/Cards';
import Detail from './components/Detail/Detail';
import { getAllPokemons, getAllTypes } from './redux/actions';
import NavBar from './components/NavBar/NavBar';
import About from './components/About/About';
import PokemonCreate from './components/PokemonCreate/PokemonCreate';
import GoToPage from './components/GoToPage/GoToPage';
import PostPerPage from './components/PostsPerPage/PostPerPage';
import Welcome from './components/Welcome/Welcome';
import NavigateBtn from './components/NavigateBtn/NavigateBtn';

function App() {

  const URL_BASE = 'http://localhost:3001/pokemonapi';

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [page, setPage] = useState(0); //initial page 0
  const [pageSize, setPageSize] = useState(12) //items per page

  useEffect(() => {
    //componentDidMount
    dispatch(getAllPokemons(page, pageSize));
    dispatch(getAllTypes());
  }, [page, pageSize]);

  //traer 'types' de estado global
  const allTypes = useSelector(state => state.allTypes);
  const allPokemons = useSelector(state => state.allPokemons);

  function onSearch(name) {
    if (!name) return alert('Please, enter Pokémon name.');

    axios(`${URL_BASE}/pokemons/?name=${name}`)
      //.then((response) => { console.log('que es response??: ', response)}, (reason) => { console.log('ques reason??: ', reason);
      .then(({ data }) => {
        if (name) { //verificar si obtuvimos la info
          navigate(`/pokemon/${data.id}`);
        }
        else {
          // console.log(data);
          alert('Pokémon not found.');
        }
      }
      )// catch respuesta (error) del servidor:
      .catch(err => console.log(err))
  }

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/home' element={<Cards onSearch={onSearch} page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize} />} />
        <Route path='/about' element={<About />} />
        <Route path='/' element={<Welcome />} />
        <Route path='/create' element={<PokemonCreate allTypes={allTypes} />} />
        <Route path='/pokemon/:id' element={<Detail />} />
      </Routes>
      {pathname === '/home' && <PostPerPage pageSize={pageSize} setPageSize={setPageSize} />}
      {pathname === '/home' && <GoToPage setPage={setPage} />}
    </div>
  )
}

export default App
