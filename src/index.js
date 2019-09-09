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
        datepickerRender(el);
    })

window.addReactDatepicker = datepickerRender;

function datepickerRender(el){
    const options = JSON.parse(el.getAttribute('data-options'));

    el.setAttribute('selected-date', getDateByFormatDDMMYYYY(new Date(), options.displayFormat));

    function handleDateChange(date) {
        el.setAttribute('selected-date', getDateByFormatDDMMYYYY(date, options.displayFormat));
    }

    el.getValue = function () {
        return getDateByFormatDDMMYYYY(el.getAttribute('selected-date'), options.displayFormat);
    }

    el.setValue = function (date) {
        var _date = getDateByFormatDDMMYYYY(date, options.displayFormat);
        el.setAttribute('selected-date', _date);
        myComponentInstance.setDateValue(_date);
    }

    var myComponentElement = <DatePicker options={options} changeSelectedDate={handleDateChange} setSelectedValue={el.getValue()} />;

    var myComponentInstance = ReactDOM.render(
        myComponentElement,
        el
    )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
