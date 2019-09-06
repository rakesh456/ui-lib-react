import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import DatePicker from "./components/Datepicker/index";
import {
    getDateByFormatDDMMYYYY, getFormatfromOptions
} from "../src/utils/utils";

Array.prototype.forEach.call(
    document.getElementsByTagName('date-picker'),
    (el) => {
        const options = JSON.parse(el.getAttribute('data-options'));

        function handleDateChange(date) {
            el.setAttribute('selected-date', getDateByFormatDDMMYYYY(date, options.displayFormat));
        }
        
        el.getValue = function () {
            return el.getAttribute('selected-date');
        }
        
        el.setValue = function (date) {
            el.setAttribute('selected-date', date);
            myComponentInstance.setDateValue(date);
        }

        var myComponentElement = <DatePicker options={options} changeSelectedDate={handleDateChange} setSelectedValue={el.getValue()} />;

        var myComponentInstance = ReactDOM.render(
            myComponentElement,
            el
        )

        
    }
  )

// ReactDOM.render(<App />, document.getElementById('datepicker'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
