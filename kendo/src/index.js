import React from 'react';
import ReactDOM from 'react-dom';
import FxGrid from "./components/grid/fx-grid";
import BkeySearcher from "./components/bkey/bkey-searcher";
import * as serviceWorker from './serviceWorker';
import './components/grid/fx-grid.scss'

Array.prototype.forEach.call(
    document.getElementsByTagName('fx-grid'),
    (el) => {
        kendogridRender(el);
    })

function kendogridRender(el) {
    let options = JSON.parse(el.getAttribute('data-options'));
    var myComponentElement = <FxGrid options={options} />;

    ReactDOM.render(
        myComponentElement,
        el
    )
}

Array.prototype.forEach.call(
    document.getElementsByTagName('bkey-searcher'),
    (el) => {
        bkeySearcherRender(el);
    })


function bkeySearcherRender(el) {
    var myComponentElement = <BkeySearcher />;

    ReactDOM.render(
        myComponentElement,
        el
    )
}


serviceWorker.unregister();
