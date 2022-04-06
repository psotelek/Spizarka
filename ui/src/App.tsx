import React from 'react';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import { Pantry } from './pages/Pantry';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="pantry" element={<Pantry />} />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="images/PusheenFridge.PNG" className="App-logo" alt="logo" />
        <p>
          Czy w lodówce jest jedzenie?
        </p>
        <nav>
          <Link to="/pantry">Sprawdź</Link>
        </nav>
      </header>
    </div>
  );
}

export default App;
