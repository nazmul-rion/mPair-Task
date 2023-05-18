import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './Pages/HomePage/HomePage';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Dashboard from './Pages/Dashboard/Dashboard';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import NavigationBar from './Pages/Section/NavigationBar';
import SalaryManagement from './Pages/SalaryManagement/SalaryManagement';
import AuthProvider from './context/AuthProvider';
import AdminRoute from './Routes/AdminRoute';
import PrivateRoute from './Routes/PrivateRoute';

function App() {
  return (
    <div className="App">

      <BrowserRouter>

        <AuthProvider >

          <Routes>

            <Route exact path="/" element={<><NavigationBar /><Homepage /></>} />

            <Route path="/home" element={<><NavigationBar /><Homepage /></>} />

            <Route path="/login" element={<><NavigationBar /><Login /></>} />

            <Route path="/register" element={<><NavigationBar /><Register /></>} />

            <Route path="/dashboard" element={<><PrivateRoute><NavigationBar /><Dashboard /></PrivateRoute></>} />
            <Route path="/salary-management" element={<><AdminRoute><NavigationBar /><SalaryManagement /></AdminRoute></>} />

            <Route path="*" element={<><NavigationBar /><NotFoundPage /></>} />

          </Routes>

        </AuthProvider >

      </BrowserRouter >





    </div >
  );
}

export default App;
