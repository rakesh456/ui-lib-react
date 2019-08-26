import React from 'react';
import './App.less';
import DatePicker from "./components/Datepicker";

function App() {
  const options = { displayFormat: 'MM/DD/YYYY', iconAlignment: 'Left', dateStringAligngment: 'Right', lowerDateLimit: new Date("2019-07-10"), upperDateLimit: new Date("2019-09-10") };

  return (
    <div className="App">
      <div id="modalroot"></div>
      <header className="App-header">
        <DatePicker options={options} />
      </header>
    </div>
  );
}

export default App;
