import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import * as serviceWorker from './serviceWorker';
import formGeneratorRender from "./components/FormGenerator/formgeneratorrender";
import datepickerRender from "./components/Datepicker/datepickerrender";
import queryBuilderRender from "./components/QueryBuilder/querybuilderrender";
import tagSelectorRender from "./components/TagSelector/tagselectorrender";
import dateHierarchyRender from "./components/DateHierarchy/datehierarchyrender";

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

serviceWorker.unregister();
