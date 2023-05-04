import Signup from './Pages/Singup';
import Login from './Pages/Login';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';

function App() {
  return (
      <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;