import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import DatePicker from "./components/Datepicker/index";
import {
    getDateByFormatDDMMYYYY
} from "../src/utils/utils";


(function () {

    if (typeof window.CustomEvent === "function") return false;

    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();

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

function datepickerRender(el) {
    let options = JSON.parse(el.getAttribute('data-options'));

    if(!options){
        options = {"displayFormat": "MM/DD/YYYY", "iconAlignment":"Left", "dateStringAlignment": "Left", "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": false};
    }

    el.setAttribute('selected-date', getDateByFormatDDMMYYYY(new Date(), options.displayFormat));

    function callOnSelectedEvent(_date, el) {
        var ev = new CustomEvent("selected");
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
