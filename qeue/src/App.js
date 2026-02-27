import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './componets/Navbar';
import Qeue from './pages/Qeue.js';
import Login from './pages/login.js';
import Medication from './pages/Medication.js';
import Appoint from './pages/Appoint.js';
import Dashboard from './pages/Dashboard.js';
import Footer from './componets/Footer';
import Home from './pages/Home.js';
import Register from './pages/Register.js';

// Create a wrapper component to conditionally render Navbar
function AppContent() {
  const location = useLocation();
  
  // Routes where Navbar should NOT be displayed
  const hideNavbarRoutes = ['/login', '/register', '/dashboard', '/medication', '/appoint'];
  
  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/queue' element={<Qeue />} />
          <Route path='/login' element={<Login />} />
          <Route path='/appoint' element={<Appoint />} />
          <Route path='/register' element={<Register />} />
          <Route path='/medication' element={<Medication />} />
          <Route path='/appoint' element={<Appoint />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

function App() {
    return(
        <Router>
            <div className="App">
                <AppContent />
            </div>
        </Router>
    )
}

export default App;