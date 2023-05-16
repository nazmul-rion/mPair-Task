import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './Pages/HomePage/HomePage';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Dashboard from './Pages/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">

      <BrowserRouter>

        <Routes>
          <Route exact path="/" element={<Homepage />} />

          <Route path="/home" element={<Homepage />} />


          <Route path="/signin" element={<Login />} />

          <Route path="/signup" element={<Register />} />


          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>

      </BrowserRouter >





    </div >
  );
}

export default App;
