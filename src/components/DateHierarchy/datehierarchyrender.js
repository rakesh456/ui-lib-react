import React from 'react';
import ReactDOM from 'react-dom';
import DatehierarchyView from './datehierarchyView';
import {
    isUndefinedOrNull
} from "../../utils/utils";

import {
    resetDateHierarchyOptions
} from "../../utils/datehierarchyutils";

import './date-hierarchy.scss';

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
        return HierarchyComponentInstance.getDates();
    }
    
    el.refresh = function () {
        return HierarchyComponentInstance.refresh();
    }

    var HierarchyComponentElement = <DatehierarchyView options={options} onFocus={onFocusHandler} onChange={onChangeHandler} onBlur={onBlurHandler} onInput={onInputHandler} />
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