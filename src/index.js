import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import DatePicker from "./components/Datepicker/index";
import TagSelector from "./components/TagSelector/tag-selector";
import {
    getDateByFormat,
    getDateByFormatNew,
    isUndefinedOrNull
} from "../src/utils/utils";
import {
    checkValueByDisplayFormat,
    isCalendarFormat,
    resetOptions,
    formatOptions
} from "../src/utils/calendar";
import {
    resetTagSelectorOptions
} from "../src/utils/tagselectorutils";
import './components/Datepicker/date-picker.scss';
import './components/TagSelector/tag-selector.scss';

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
    let func = new Function('e', 'with(document) { with(this) {' + elem.getAttribute(name) + '} }');
    func.call(elem, e);
}

function datepickerRender(el) {
    let options = JSON.parse(el.getAttribute('data-options'));
    options = (isUndefinedOrNull(options))? resetOptions({}) : resetOptions(options);

    options = formatOptions(options);

    if(isCalendarFormat(options.displayFormat)){
        setSelectedAttr(el, getDateByFormat(new Date(), options.displayFormat));
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
        const _date = getDateByFormatNew(date, options.displayFormat);
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
        checkValueByDisplayFormat(date, options, (_date, isInvalidDate, isInvalidRangeDate) => {
            if(isInvalidDate || isInvalidRangeDate){
                myComponentInstance.setDateValue("", isInvalidDate, isInvalidRangeDate);
            } else {
                setSelectedAttr(el, _date);  
                myComponentInstance.setDateValue(_date, isInvalidDate, isInvalidRangeDate);
            }
        });
    }
    
    el.refresh = function () {
        myComponentInstance.refresh();
    }

    el.getStartDate = function () {
        return myComponentInstance.getStartDate();
    }
    
    el.getEndDate = function () {
        return myComponentInstance.getEndDate();
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

Array.prototype.forEach.call(
    document.getElementsByTagName('tag-selector'),
    (el) => {
        tagSelectorRender(el);
    })

function tagSelectorRender(el) {
    let options = JSON.parse(el.getAttribute('data-options'));
    options = (isUndefinedOrNull(options))? resetTagSelectorOptions({}) : resetTagSelectorOptions(options);

    function callOnSelectedEvent(selectedItem, el) {
        var ev = new CustomEvent("change",  {'detail':  { 'item': selectedItem }});
        trigger(el, 'onSelect', ev);
        el.dispatchEvent(ev);
    }
    
    function callOnDeSelectedEvent(selectedItem, el) {
        var ev = new CustomEvent("change",  {'detail':  { 'item': selectedItem }});
        trigger(el, 'onDeSelect', ev);
        el.dispatchEvent(ev);
    }
    
    function callOnNotFoundEvent(el) {
        var ev = new CustomEvent("change");
        trigger(el, 'onNotFound', ev);
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
    
    function onKeyDownHandler() {
        var ev = new CustomEvent('keydown');
        el.dispatchEvent(ev);
    }

    function onSelectHandler(selectedItem) {
        callOnSelectedEvent(selectedItem, el);
    }
    
    function onDeSelectHandler(selectedItem) {
        callOnDeSelectedEvent(selectedItem, el);
    }
    
    function onNotFoundHandler(selectedItem) {
        callOnNotFoundEvent(el);
    }

    el.getNewlyAdded = function () {
        return tagComponentInstance.getNewlyAdded();
    }
    
    el.getSelectedValues = function () {
        return tagComponentInstance.getSelectedValues();
    }
    
    el.getSelectedCounter = function () {
        return tagComponentInstance.getSelectedCounter();
    }

    el.appendNewElement = function (obj) {
        tagComponentInstance.appendNewElement(obj);
    }
    
    el.setJsonData = function (json) {
        tagComponentInstance.setJsonData(json);
    }

    var tagComponentElement = <TagSelector options={options} onFocus={onFocusHandler} onBlur={onBlurHandler} onKeyDown={onKeyDownHandler} onSelect={onSelectHandler} onDeSelect={onDeSelectHandler} onNotFound={onNotFoundHandler} />;

    var tagComponentInstance = ReactDOM.render(
        tagComponentElement,
        el
    )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
