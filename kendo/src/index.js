import React from 'react';
import ReactDOM from 'react-dom';
// import KendoGrid from "./components/grid/kendo-grid2";
// import KendoGrid from "./components/grid/kendo-grid4";
import KendoGrid from "./components/grid/kendo-grid2";
import BkeySearcher from "./components/bkey/bkey-searcher";
import * as serviceWorker from './serviceWorker';

Array.prototype.forEach.call(
    document.getElementsByTagName('kendo-grid'),
    (el) => {
        kendogridRender(el);
    })


function kendogridRender(el) {
    var myComponentElement = <KendoGrid/>;

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
    var myComponentElement = <BkeySearcher/>;

    ReactDOM.render(
        myComponentElement,
        el
    )
}

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
