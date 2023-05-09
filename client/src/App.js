import Signup from './Pages/Singup';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Spinner from './components/spinner';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import { useSelector } from 'react-redux';
import ProtectedPage from './components/ProtectedPage';
import Profile from './Pages/profile';

function App() {
  const loaders = useSelector(value => value.loading.loading);

  return (
    <div className="App">
      {loaders && <Spinner />}
      <Router>
        <Routes>
          <Route path='/' element={<ProtectedPage><Home /></ProtectedPage>} />
          <Route path='/profile' element={<ProtectedPage><Profile /></ProtectedPage>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;