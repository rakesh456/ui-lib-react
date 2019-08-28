import React from 'react';
import './App.css';
import DatePicker from "./components/Datepicker/index";

function App() {
  const options = {};

  return (
    <div className="VS-App">
      <div id="modalroot"></div>
      <header className="VS-App-header">
        <DatePicker options={options} />
      </header>
    </div>
  );
}

export default App;
