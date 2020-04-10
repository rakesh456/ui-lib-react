import React from 'react';
import ReactDOM from 'react-dom';
import DatehierarchyView from './datehierarchyView';
import {
    isUndefinedOrNull,
    preventOnInputCallWhileFocus,
    tempFunction
} from "../../utils/utils";

import {
    resetDateHierarchyOptions
} from "../../utils/datehierarchyutils";

import './date-hierarchy.scss';

function trigger(elem, name, e) {
    // eslint-disable-next-line
   let func = new Function('e', 'with(document) { with(this) {' + elem.getAttribute(name) + '} }');
   func.call(elem, e);
}

function dateHierarchyRender(el) {
    let options = JSON.parse(el.getAttribute('data-options'));
    options = (isUndefinedOrNull(options)) ? resetDateHierarchyOptions({}) : resetDateHierarchyOptions(options);

    el.getValues = function () {
        return HierarchyComponentInstance.getValues();
    }

    function onFocusHandler() {
        let ev = new CustomEvent('focus');
        el.dispatchEvent(ev);
    }
    
    function onValueChangeHandler() {
        let ev = new CustomEvent("change");
        trigger(el, 'onValueChange', ev);
        // el.dispatchEvent(ev);
    }

    function onBlurHandler() {
        let ev = new CustomEvent("blur");
        el.dispatchEvent(ev);
    }

    function onCustomInputHandler() {
        let ev = new CustomEvent("input");
        trigger(el, 'onInput', ev);
        // el.dispatchEvent(ev);
    }

    el.getDates = function () {
        return HierarchyComponentInstance.getDates();
    }
    
    el.refresh = function () {
        return HierarchyComponentInstance.refresh();
    }

    el.addEventListener("input", preventOnInputCallWhileFocus(tempFunction), true);
    
    var HierarchyComponentElement = <DatehierarchyView options={options} onFocus={onFocusHandler} onBlur={onBlurHandler} onCustomInput={onCustomInputHandler} onValueChange={onValueChangeHandler} />

    el.setValues = function (json) {
        HierarchyComponentInstance.setValues(json);
    }

    // eslint-disable-next-line
    var HierarchyComponentInstance = ReactDOM.render(
        HierarchyComponentElement,
        el
    )
}

export default dateHierarchyRender;