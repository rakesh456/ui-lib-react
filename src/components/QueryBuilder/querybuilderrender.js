import React from 'react';
import ReactDOM from 'react-dom';
import QueryBuilder from "./index";
import './query-builder.scss';

function queryBuilderRender(el) {
    let options = JSON.parse(el.getAttribute('data-options'));

    el.reload = function () {
    }

    let myComponentElement = <QueryBuilder options={options} />;

    ReactDOM.render(
        myComponentElement,
        el
    )
}

export default queryBuilderRender;