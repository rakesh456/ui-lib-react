import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import DatePicker from "./components/Datepicker/index";
import {
    getDateByFormatDDMMYYYY,
    getDateByFormatDDMMYYYYNew,
    isUndefinedOrNull
} from "../src/utils/utils";
import {
    isCalendarFormat,
    isYearFormat,
    resetOptions,
    formatOptions
} from "../src/utils/calendar";


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
    options = (isUndefinedOrNull(options))? resetOptions({}) : resetOptions(options);

    options = formatOptions(options);

    if(isCalendarFormat(options.displayFormat)){
        setSelectedAttr(el, getDateByFormatDDMMYYYY(new Date(), options.displayFormat));
    }

    function callOnSelectedEvent(_date, el) {
        var ev = new CustomEvent("change");
        trigger(el, 'onChange', ev);
        el.dispatchEvent(ev);
    }
    
    function onFocusHandler() {
        var ev = new CustomEvent('focus');
        el.dispatchEvent(ev);
    }
    
    function onBlurHandler() {
        var ev = new CustomEvent('blur');
        el.dispatchEvent(ev);
    }

    function onSelectHandler(date) {
        const _date = getDateByFormatDDMMYYYYNew(date, options.displayFormat);
        setSelectedAttr(el, _date);
        callOnSelectedEvent(_date, el);
    }
    
    function onYearSelectHandler(year) {
        setSelectedAttr(el, year);
        callOnSelectedEvent(year, el);
    }

    function setSelectedAttr(el, date){
        el.setAttribute('selected-date', date);
    }

    el.getValue = function () {
        return el.getAttribute('selected-date');
    }

    el.setValue = function (date) {
        var _date = getDateByFormatDDMMYYYY(date, options.displayFormat);
        setSelectedAttr(el, _date);
        myComponentInstance.setDateValue(_date);
    }

    el.addEventListener('mousedown', (e) => { 
        if(e.target.tagName !== 'INPUT'){
            e.preventDefault(); 
        }
    }, false);

    var myComponentElement = <DatePicker options={options} onSelect={onSelectHandler} onYearSelect={onYearSelectHandler} onFocus={onFocusHandler} onBlur={onBlurHandler} />;

    var myComponentInstance = ReactDOM.render(
        myComponentElement,
        el
    )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
