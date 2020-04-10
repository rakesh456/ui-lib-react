import React from 'react';
import ReactDOM from 'react-dom';
import TagSelector from "./tag-selector";
import {
    isUndefinedOrNull,
    preventOnInputCallWhileFocus
} from "../../utils/utils";

import {
    resetTagSelectorOptions
} from "../../utils/tagselectorutils";

import './tag-selector.scss';

function trigger(elem, name, e) {
    // eslint-disable-next-line
    let func = new Function('e', 'with(document) { with(this) {' + elem.getAttribute(name) + '} }');
    func.call(elem, e);
}

function tagSelectorRender(el) {
    let options = JSON.parse(el.getAttribute('data-options'));

    options = (isUndefinedOrNull(options)) ? resetTagSelectorOptions({}) : resetTagSelectorOptions(options);

    function onValueChangeHandler() {
        let ev = new CustomEvent("change");
        trigger(el, 'onValueChange', ev);
    }

    function callOnSelectedEvent(selectedItem, el) {
        let ev = new CustomEvent("change", { 'detail': { 'item': selectedItem } });
        trigger(el, 'onSelect', ev);
    }

    function callOnDeSelectedEvent(selectedItem, el) {
        let ev = new CustomEvent("change", { 'detail': { 'item': selectedItem } });
        trigger(el, 'onDeSelect', ev);
    }

    function callOnNotFoundEvent(el) {
        let ev = new CustomEvent("change");
        trigger(el, 'onNotFound', ev);
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

    function onNotFoundHandler() {
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

    el.addEventListener("input", preventOnInputCallWhileFocus({}), true);

    let tagComponentElement = <TagSelector options={options} onFocus={onFocusHandler} onBlur={onBlurHandler} onKeyDown={onKeyDownHandler} onSelect={onSelectHandler} onDeSelect={onDeSelectHandler} onNotFound={onNotFoundHandler} onValueChange={onValueChangeHandler} />;

    let tagComponentInstance = ReactDOM.render(
        tagComponentElement,
        el
    )
}

export default tagSelectorRender;