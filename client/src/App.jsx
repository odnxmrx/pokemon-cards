import './App.css';
import { Routes, Route } from 'react-router-dom';
import Cards from './components/Cards/Cards';
import Detail from './components/Detail/Detail';

function App() {

  return (
    <div>
      <Routes>
        <Route path='/home' element={<Cards />}/>
        <Route path='/pokemon/:id' element={<Detail />} />
        {/* <Route path='' element={} /> */}
      </Routes>
    </div>
  )
}

export default App
