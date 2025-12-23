import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './componets/Navbar';
import Qeue from './pages/Qeue';
import Login from './pages/Login';
import Appoint from './pages/Appoint';
 
import Dashboard from './pages/Dashboard';
import Footer from './componets/Footer';
import Home from './pages/Home';

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
                        <Route path='/Login' element={<Login />} />
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