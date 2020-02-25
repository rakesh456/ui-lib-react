import React from "react";
import './css/vs.scss';
import DatePicker from '../../components/Datepicker/index';
import * as CONSTANTS from '../../utils/constants'
import { isBlank, isUndefinedOrNull } from '../../utils/utils'
import TagSelector from '../../components/TagSelector/tag-selector';
import DateHierarchy from '../../components/DateHierarchy/date-hierarchy';


class FormGenerator extends React.PureComponent {

    renderForm = () => {
        if (Object.keys(this.props.options) != 0) 
        {
            var options = this.props.options;
            var noOfRows = options.rows.length;
            var tags = [];


            /*  Iterate on Radio and Checkbox */

            
            for (var i = 0; i < noOfRows; i++) {
                
                let labelText = options.rows[i].rowLabel ? options.rows[i].rowLabel.name : "";
                let noOfRowElements = options.rows[i].rowElements.length;
                let labelKey = labelText + noOfRowElements;
                let errorId = labelText ? labelText+'_error' : '';
                if (noOfRowElements > 1) {
                    var optionsInRows = options.rows[i].rowElements;
                    tags.push(React.createElement(
                        "div",
                        { className: `${CONSTANTS.CLASSES.VS_GC_LBL_COMP}` },
                        React.createElement(
                            "div",
                            {},
                            React.createElement(
                                "label",
                                { className: options.rows[i].rowLabel ? (`${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` + ' ' + options.rows[i].rowLabel.props.className) : `${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` },
                                labelText,
                            )
                        ),
                        React.createElement(
                            "div",
                            {},
                            optionsInRows.map(item => React.createElement(
                                "label",
                                {},
                                item.elementLabel ? item.elementLabel.name : '',
                                React.createElement(
                                    "input",
                                    item.props
                                ),

                            ))
                        ), 
                        React.createElement("span", {className: errorId})
                    ));
                }

                /* Iterate on row elements */
                for (let j = 0; j < noOfRowElements; j++) {
                    let elementID = options.rows[i].rowElements[j].props.id;
                    let elementType = options.rows[i].rowElements[j].elementType;
                    let elementProps = options.rows[i].rowElements[j].props;
                    let labelKey = elementID + "label";
                    let labelKeyOuter = labelKey + "Outer";
                    
                    elementProps.key = elementID;


                    if (elementType === "input") {
                        if (elementProps.type != "radio" && elementProps.type !="checkbox") {
                            tags.push(React.createElement(
                                "div",
                                { className: `${CONSTANTS.CLASSES.VS_GC_LBL_COMP}` },
                                React.createElement(
                                    "div",
                                    {},
                                    React.createElement(
                                        "label",
                                        { className: options.rows[i].rowLabel ? (`${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` + ' ' + options.rows[i].rowLabel.props.className) : `${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` },
                                        labelText)),
                                React.createElement(
                                    "div",
                                    {},
                                    React.createElement(
                                        "input",
                                        elementProps,
                                    )
                                ),
                                React.createElement("span", {className: errorId})
                            ));
                        }
                    }
                    else if (elementType === "select") {

                        let items = options.rows[i].rowElements[j].options;

                        tags.push(React.createElement(
                            "div",
                            { className: `${CONSTANTS.CLASSES.VS_GC_LBL_COMP}` },
                            React.createElement(
                                "div",
                                {},
                                React.createElement(
                                    "label",
                                    { className: options.rows[i].rowLabel ? (`${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` + ' ' + options.rows[i].rowLabel.props.className) : `${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` },
                                    labelText
                                )
                            ),
                            React.createElement(
                                "div",
                                {
                                    className: `${CONSTANTS.CLASSES.VS_DROPDOWN}`
                                },

                                React.createElement(
                                    "select",
                                    options.rows[i].rowElements[j].props,
                                    items.map(item => React.createElement(
                                        "option",
                                        {
                                            value: item.props.value,
                                            selected: item.props.selected ? "selected" : "",
                                            key: item.props.value
                                        },
                                        item.optionLabel
                                    ))
                                )

                            ),
                            React.createElement("span", {className: errorId})
                        ));

                    }
                    else if (elementType === "textarea") {
                        tags.push(React.createElement(
                            "div",
                            { className: `${CONSTANTS.CLASSES.VS_GC_LBL_COMP}` },
                            React.createElement(
                                "div",
                                {},
                                React.createElement(
                                    "label",
                                    { className: options.rows[i].rowLabel ? (`${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` + ' ' + options.rows[i].rowLabel.props.className) : `${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` },
                                    labelText)),
                            React.createElement(
                                "div",
                                {},
                                React.createElement("textarea", elementProps)
                            ),React.createElement("span", {className: errorId})

                        )
                        );

                    }
                   else 
                   {
                       tags.push(React.createElement(
                           "div",
                           { className: `${CONSTANTS.CLASSES.VS_GC_LBL_COMP}` },
                           React.createElement(
                               "div",
                               {},
                               React.createElement(
                                "label",
                                { className: options.rows[i].rowLabel ? (`${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` + ' ' + options.rows[i].rowLabel.props.className) : `${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` },
                                labelText)),
                                React.createElement(
                                    "div",
                                    {},
                                    React.createElement(elementType,elementProps)
                                ),
                                React.createElement("span", {className: errorId})
                               )
                           );
                       
                   }

                }
                tags.push(<br></br>)

            }
            return (

                
                (options.form) ? <form> {tags}<button type="submit" value="submit">Submit</button><button type="reset" value="reset">Reset</button></form> : <div> {tags}</div>


            )
        }
        else {
            
            return (
                ""
            )
        }

        // if (formTag) {
        //     tags.push(React.createElement(
        //         "input",
        //         {"type": "submit"}
        //     ));
        //     return (
        //         // <form> {tags}</form>
        //         React.createElement(
        //             'form',
        //             options.form.props,
        //             tags
        //         )
        //     )
        // }
        // else
        //     return (
        //         {tags}
        //     )

    }

    render() {
        return (
            <div>
                {this.renderForm()}
            </div>
        )
    }
}


export default FormGenerator;