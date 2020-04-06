import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import * as serviceWorker from './serviceWorker';
import formGeneratorRender from "./components/FormGenerator/formgeneratorrender";

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
    document.getElementsByTagName('form-gen'),
    (el) => {
        formGeneratorRender(el);
    })

window.addFormGenerator = formGeneratorRender;

serviceWorker.unregister();
