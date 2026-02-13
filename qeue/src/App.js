import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './componets/Navbar';
import Qeue from './pages/Qeue.js';
import Login from './pages/Login.js';
import Medication from './pages/Medication.js';
import Appoint from './pages/Appoint.js';
import Dashboard from './pages/Dashboard.js';
import Footer from './componets/Footer';
import Home from './pages/Home.js';
import Register from './pages/register.js';

function App() {
    return(
        <>
        <Router>
            <div className="App">
                <Navbar />
                <div>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/queue' element={<Qeue />} />
                        <Route path='/login' element={<Login />} /> 
                        <Route path='/register' element={<Register />} />
                        <Route path='/medication' element={<Medication />} />
                        <Route path='/appoint' element={<Appoint />} />
                        <Route path='/dashboard' element={<Dashboard />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
        </>
    )
}
export default App;