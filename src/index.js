import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import * as serviceWorker from './serviceWorker';
import datepickerRender from "./components/Datepicker/datepickerrender";
import TagSelector from "./components/TagSelector/tag-selector";
import DateHierarchy from './components/DateHierarchy/date-hierarchy';

import {
    isUndefinedOrNull
} from "../src/utils/utils";

import {
    resetTagSelectorOptions
} from "../src/utils/tagselectorutils";

import {
    resetDateHierarchyOptions
} from "./utils/datehierarchyutils";

import './components/Datepicker/date-picker.scss';
import './components/TagSelector/tag-selector.scss';
import './components/DateHierarchy/date-hierarchy.scss';
import DatehierarchyView from './components/DateHierarchy/datehierarchyView';


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

Array.prototype.forEach.call(
    document.getElementsByTagName('date-picker'),
    (el) => {
        datepickerRender(el);
    })
window.addReactDatepicker = datepickerRender;

function trigger(elem, name, e) {
    // eslint-disable-next-line
    let func = new Function('e', 'with(document) { with(this) {' + elem.getAttribute(name) + '} }');
    func.call(elem, e);
}

Array.prototype.forEach.call(
    document.getElementsByTagName('tag-selector'),
    (el) => {
        tagSelectorRender(el);
    })

function tagSelectorRender(el) {
    let options = JSON.parse(el.getAttribute('data-options'));

    options = (isUndefinedOrNull(options)) ? resetTagSelectorOptions({}) : resetTagSelectorOptions(options);

    function callOnSelectedEvent(selectedItem, el) {
        let ev = new CustomEvent("change", { 'detail': { 'item': selectedItem } });
        trigger(el, 'onSelect', ev);
        el.dispatchEvent(ev);
    }

    function callOnDeSelectedEvent(selectedItem, el) {
        let ev = new CustomEvent("change", { 'detail': { 'item': selectedItem } });
        trigger(el, 'onDeSelect', ev);
        el.dispatchEvent(ev);
    }

    function callOnNotFoundEvent(el) {
        let ev = new CustomEvent("change");
        trigger(el, 'onNotFound', ev);
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

    function onKeyDownHandler() {
        let ev = new CustomEvent('keydown');
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

    el.remove = function (item) {
        tagComponentInstance.removeListItem(item);
    }

    el.setJsonData = function (json) {
        tagComponentInstance.setJsonData(json);
    }

    el.setSelectedItems = function (json) {
        tagComponentInstance.setSelectedItems(json);
    }

    el.refresh = function () {
        tagComponentInstance.refresh();
    }

    let tagComponentElement = <TagSelector options={options} onFocus={onFocusHandler} onBlur={onBlurHandler} onKeyDown={onKeyDownHandler} onSelect={onSelectHandler} onDeSelect={onDeSelectHandler} onNotFound={onNotFoundHandler} />;

    let tagComponentInstance = ReactDOM.render(
        tagComponentElement,
        el
    )
}

Array.prototype.forEach.call(
    document.getElementsByTagName('date-hierarchy'),
    (el) => {
        dateHierarchyRender(el);
    })

function dateHierarchyRender(el) {
    let options = JSON.parse(el.getAttribute('data-options'));
    options = (isUndefinedOrNull(options)) ? resetDateHierarchyOptions({}) : resetDateHierarchyOptions(options);

    el.getValues = function () {
        return HierarchyComponentInstance.getValues();
    function onFocusHandler() {
        let ev = new CustomEvent('focus');
        el.dispatchEvent(ev);
    }
    
    function onChangeHandler() {
        let ev = new CustomEvent("change");
        el.dispatchEvent(ev);
    }

    el.getDates = function () {
        return HierarchyComponentInstance.getDates();
    }

    var HierarchyComponentElement = <DatehierarchyView options={options} onFocus={onFocusHandler} onChange={onChangeHandler} />
    // eslint-disable-next-line
    var HierarchyComponentInstance = ReactDOM.render(
        HierarchyComponentElement,
        el
    )
}

serviceWorker.unregister();
