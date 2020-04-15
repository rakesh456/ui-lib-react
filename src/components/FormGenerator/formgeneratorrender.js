import React from 'react';
import './css/vs.scss';
import ReactDOM from 'react-dom';
import {
    isUndefinedOrNull
} from "../../utils/utils";
import FormGenerator from './form-generator'

//mock function
function resetFormGenOptions(options) {
    return { ...options };
}

function formGeneratorRender(el) {
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

        function onInputHandler() {
            let ev = new CustomEvent("input");
            el.dispatchEvent(ev);
        }

        el.getDates = function () {
            return FormGenComponentInstance.getDates();
        }

        el.refresh = function () {
            return FormGenComponentInstance.refresh();
        }

        el.getDataOptions = function(options)
        {
            return FormGenComponentInstance.getDataOptions(options);
        }

        el.createFormGenHTML = function(json)
        {
            var FormGenComponentElement = <FormGenerator options={options} onSubmit={submitHandler} onFocus={onFocusHandler} onChange={onChangeHandler} onBlur={onBlurHandler} onInput={onInputHandler} />

        }
       /*  el.setDataOptions = function(updateOptions)
        {
           
            let newOptions = {...options}
            let key;
            let isChanged = false;
            if(!isUndefinedOrNull(updateOptions)){
                for (key in updateOptions) {

                    if (updateOptions.hasOwnProperty(key)) {
                        const value = updateOptions[key];
                        const option = key; 
                        console.log(option)
                        //console.log({...(updateOptions)})
                       if(option==='form')
                       {
                        console.log(value)
                       }
                    }
                }
            }

        } */
       

        var FormGenComponentElement = <FormGenerator options={options} onSubmit={submitHandler} onFocus={onFocusHandler} onChange={onChangeHandler} onBlur={onBlurHandler} onInput={onInputHandler} />
        el.setValues = function (json) {
            FormGenComponentInstance.setValues(json);
        }

        // eslint-disable-next-line
       /*  var FormGenComponentInstance = ReactDOM.render(
            FormGenComponentElement,
            el
        ) */

        /* Custom event Listeners provided by the user */
        if (options.form !== undefined && options.form.props !== undefined
            && options.form.props.id !== undefined) {
            if (options.form.eventHandlers) {
                options.form.eventHandlers.forEach((eventHandler) => {
                    document.getElementById(options.form.props.id).addEventListener(eventHandler.event, window[eventHandler.handler]);
                })
            }
        }

        options.rows.forEach((option) => {
            // If options are present
            if (option) {
                option.rowElements.forEach((element) => {
                    var ID = element.props.id;
                    // If event listener is given by the user
                    if (element.eventHandlers) {
                        element.eventHandlers.forEach((eventHandler) => {
                            document.getElementById(ID).addEventListener(eventHandler.event, window[eventHandler.handler]);
                        });
                    }

                });
            }


        });
    } catch (error) {
        console.error(error);
    }
}

export default formGeneratorRender;