import React from 'react';
import ReactDOM from 'react-dom';
import QueryBuilder from "./index";
import {
    isUndefinedOrNull
} from "../../utils/utils";

function queryBuilderRender(el) {
    let options = JSON.parse(el.getAttribute('data-options'));

    el.reload = function () {
    }

    let myComponentElement = <QueryBuilder options={options} />;

    let myComponentInstance = ReactDOM.render(
        myComponentElement,
        el
    )
}

export default queryBuilderRender;