import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from "./index";
import {
    getDateByFormat,
    getDateByFormatNew,
    isUndefinedOrNull
} from "../../utils/utils";
import {
    checkValueByDisplayFormat,
    isCalendarFormat,
    resetOptions,
    formatOptions,
    currentFormatToYYYYMMDDNew
} from "../../utils/calendar";


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
        let ev = new CustomEvent("change");
        trigger(el, 'onChange', ev);
        el.dispatchEvent(ev);
    }
    
    function onFocusHandler() {
        let ev = new CustomEvent('focus');
        el.dispatchEvent(ev);
    }
    
    function onBlurHandler() {
        let ev = new CustomEvent('blur');
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
    
    el.setDataOption = function (updatedOptions) {
        let newOptions = {...options};
        let key;
        let isChanged = false;
        if(!isUndefinedOrNull(updatedOptions)){
            for (key in updatedOptions) {
                if (updatedOptions.hasOwnProperty(key)) {
                    const value = updatedOptions[key];
                    const option = key;
                    
                    if(!isUndefinedOrNull(option) && (option in options)){
                        if(option === 'lowerLimit' || option === 'upperLimit'){
                            let _date = currentFormatToYYYYMMDDNew(value, newOptions);
                            newOptions[option] = _date;
                            isChanged = true;
                        } else {
                            newOptions[option] = value;
                            isChanged = true;
                        }
                    }
                }
            }
            if(isChanged === true){
                myComponentInstance.setState({ options: {...newOptions}});
            }
        }
    }

    el.reload = function () {
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

    let myComponentElement = <DatePicker options={options} onSelect={onSelectHandler} onYearSelect={onYearSelectHandler} onFocus={onFocusHandler} onBlur={onBlurHandler} />;

    let myComponentInstance = ReactDOM.render(
        myComponentElement,
        el
    )
}

export default datepickerRender;