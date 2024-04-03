import './styles/common.css'
import {Routes, Route, BrowserRouter} from 'react-router-dom'

import AppRouter from './components/AppRouter';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="App">
      
    <BrowserRouter>
      <Navbar />
      <AppRouter />
      <Footer />
    </BrowserRouter>

    </div>
  );
}

export default App;
