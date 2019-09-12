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

function trigger(elem, name, e) {
    var func = new Function('e', 'with(document) { with(this) {' + elem.getAttribute(name) + '} }');
    func.call(elem, e);
}

function datepickerRender(el){
    const options = JSON.parse(el.getAttribute('data-options'));

    el.setAttribute('selected-date', getDateByFormatDDMMYYYY(new Date(), options.displayFormat));
    
    function callOnSelectedEvent(_date, el){
        var ev = new Event("selected");
        trigger(el, 'onSelected', ev);
        el.dispatchEvent(ev);
    }

    function onSelectHandler(date) {
        const _date = getDateByFormatDDMMYYYY(date, options.displayFormat);
        el.setAttribute('selected-date', _date);
        callOnSelectedEvent(_date, el);
    }

    el.getValue = function () {
        return el.getAttribute('selected-date');
    }

    el.setValue = function (date) {
        var _date = getDateByFormatDDMMYYYY(date, options.displayFormat);
        el.setAttribute('selected-date', _date);
        myComponentInstance.setDateValue(_date);
    }

    var myComponentElement = <DatePicker options={options} onSelect={onSelectHandler} />;

    var myComponentInstance = ReactDOM.render(
        myComponentElement,
        el
    )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
