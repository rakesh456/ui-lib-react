import React from 'react';
import logo from './logo.svg';
import './App.css';
import Datepicker from "./components/Datepicker";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Datepicker />
      </header>
    </div>
  );
}

export default App;
