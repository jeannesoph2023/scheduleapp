import './App.css';
import {BrowserRouter as Router, Routes, Route}  from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FormPage from './pages/FormPage';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import DaysOffUser from './pages/DaysOffUser';
import PDFGenerator from './components/PDFGenerator';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/" element={<Home />}/>
        <Route path="/form" element={<FormPage />}/>
        <Route path="/daysoff" element={<DaysOffUser />}/>
      </Routes>

      
    </Router>
  )
}

export default App;

