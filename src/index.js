import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import * as serviceWorker from './serviceWorker';
import formGeneratorRender from "./components/FormGenerator/formgeneratorrender";
import datepickerRender from "./components/Datepicker/datepickerrender";
import queryBuilderRender from "./components/QueryBuilder/querybuilderrender";
import tagSelectorRender from "./components/TagSelector/tagselectorrender";
import dateHierarchyRender from "./components/DateHierarchy/datehierarchyrender";
import FormGenerator from './components/FormGenerator/form-generator';
// import FormGenerator from './components/FormGenerator/form-generator';

import {
    isUndefinedOrNull
} from "../src/utils/utils";

import './components/Datepicker/date-picker.scss';
import './components/TagSelector/tag-selector.scss';
import './components/DateHierarchy/date-hierarchy.scss';
import './components/QueryBuilder/query-builder.scss';
// import DatehierarchyView from './components/DateHierarchy/datehierarchyView';
// mock function 
function resetFormGenOptions(options) {

    return { ...options };
}

Array.prototype.forEach.call(
    document.getElementsByTagName('form-gen'),
    (el) => {
        formGenRender(el);
    })

    function myFunc() {
        alert("Event listener");
    }

function formGenRender(el) {
    try {
    let options = JSON.parse(el.getAttribute('data-options'));
   
    options = (isUndefinedOrNull(options)) ? resetFormGenOptions({}) : resetFormGenOptions(options);
        
    el.getValues = function () {
        return FormGenComponentInstance.getValues();
    }
    
    function onFocusHandler() {
        let ev = new CustomEvent('focus');
        el.dispatchEvent(ev);
    }
    
    function submitHandler() {
        let ev = new CustomEvent('submit');
        el.dispatchEvent(ev);
    }

    function onChangeHandler() {
        let ev = new CustomEvent("change");
        el.dispatchEvent(ev);
    }

    function onBlurHandler() {
        let ev = new CustomEvent("blur");
        el.dispatchEvent(ev);
    }

    function onInputHandler(){
        let ev = new CustomEvent("input");
        el.dispatchEvent(ev);
    }

    el.getDates = function () {
        return FormGenComponentInstance.getDates();
    }

    el.refresh = function (){
        return FormGenComponentInstance.refresh();
    }

    var FormGenComponentElement = <FormGenerator options={options} onSubmit={submitHandler} onFocus={onFocusHandler} onChange={onChangeHandler} onBlur={onBlurHandler} onInput ={onInputHandler}/>
    el.setValues = function (json) {
        FormGenComponentInstance.setValues(json);
    }    

    // eslint-disable-next-line
    var FormGenComponentInstance = ReactDOM.render(
        FormGenComponentElement,
        el
    )
        
    /* Custom event Listeners provided by the user */
    if (options.form !== undefined && options.form.props !== undefined
         && options.form.props.id != undefined) {                 
             if (options.form.eventHandlers) {
                 options.form.eventHandlers.forEach((eventHandler) => {
                    document.getElementById(options.form.props.id).addEventListener(eventHandler.event, window[eventHandler.handler]);   
                 })
             }
    }
    
    options.rows.forEach( (option) =>
    {   
        // If options are present
        if(option){
            option.rowElements.forEach((element) => {
                var ID = element.props.id;
                // If event listener is given by the user
                if(element.eventHandlers)
                {
                element.eventHandlers.forEach((eventHandler)=>
                {
                
                  console.log("Element", ID);
                  document.getElementById(ID).addEventListener(eventHandler.event, window[eventHandler.handler]);   
                });
            }
                  
            });
        }
    
    
    });
 } catch(error) {
     console.error(error);
 }
}


(function () {
    if (typeof window.CustomEvent === "function") return false;

    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        let evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();

// Datepicker render 
Array.prototype.forEach.call(
    document.getElementsByTagName('date-picker'),
    (el) => {
        datepickerRender(el);
    })
window.addReactDatepicker = datepickerRender;

// Tag-selector render 
Array.prototype.forEach.call(
    document.getElementsByTagName('tag-selector'),
    (el) => {
        tagSelectorRender(el);
    })
window.addTagSelector = tagSelectorRender;

// Date-hierarchy render
Array.prototype.forEach.call(
    document.getElementsByTagName('date-hierarchy'),
    (el) => {
        dateHierarchyRender(el);
    })
window.addDateHierarchyRender = dateHierarchyRender;

serviceWorker.unregister();

// Form generator render 
Array.prototype.forEach.call(
    document.getElementsByTagName('form-gen'),
    (el) => {
        formGeneratorRender(el);
    })

window.addFormGenerator = formGeneratorRender;

// Query builder render 
Array.prototype.forEach.call(
    document.getElementsByTagName('query-builder'),
    (el) => {
        queryBuilderRender(el);
    })
window.addReactDatepicker = datepickerRender;
