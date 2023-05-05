import Signup from './Pages/Singup';
import Login from './Pages/Login';
import Home from './Pages/Home';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';
import ProtectedPage from './components/ProtectedPage';

function App() {
  return (
      <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<ProtectedPage><Home/></ProtectedPage>}/>
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;