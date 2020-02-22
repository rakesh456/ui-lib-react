import React from "react";
import './css/vs.scss';
import DatePicker from '../../components/Datepicker/index';
import * as CONSTANTS from '../../utils/constants'
import TagSelector from '../../components/TagSelector/tag-selector';
import DateHierarchy from '../../components/DateHierarchy/date-hierarchy';


class FormGenerator extends React.PureComponent {

    renderForm = () => {
        var options = this.props.options;
        var noOfRows = options.rows.length;
        var formTag  = options.form?true:false;
        var tags = [];
        /*  Iterate on rows */
        for (let i = 0; i < noOfRows; i++) {

            let labelText = options.rows[i].rowLabel.name ? options.rows[i].rowLabel.name : "";
            let noOfRowElements = options.rows[i].rowElements.length;
            let labelKey = labelText + noOfRowElements;

            if (noOfRowElements > 1) {
                var optionsInRows = options.rows[i].rowElements;

                
                tags.push(React.createElement(
                    "div",
                    { className: `${CONSTANTS.CLASSES.VS_GC_LBL_COMP}`},
                    React.createElement(
                        "div",
                        {},
                        React.createElement(
                            "label",
                            { className: `${CONSTANTS.CLASSES.VS_LABEL}`},
                            labelText,
                        )
                    ),
                    React.createElement(
                        "div",
                        {},
                        optionsInRows.map(item => React.createElement(
                            "label",
                            {},
                            item.elementLabel.name,
                            React.createElement(
                                "input",
                                item.props
                            ),

                        )), React.createElement("br", {})
                    )
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
                    if (elementProps.type != "radio") {
                     tags.push(React.createElement(
                         "div",
                         {className: `${CONSTANTS.CLASSES.VS_GC_LBL_COMP}`},
                         React.createElement(
                             "div",
                             {},
                             React.createElement(
                                 "label",
                                 {className : `${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}`},
                                 labelText)),
                                 React.createElement(
                                     "div",
                                     {contentEditable: "true"},
                                     React.createElement(
                                         "input",
                                         elementProps,
                                     )
                                 )
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
                                { className: `${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` },
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

                        )
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
                                { className: `${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` },
                                labelText)),
                        React.createElement(
                            "div",
                            {},
                            React.createElement("textarea", elementProps)
                        )

                    )
                    );

                }
                else if (elementType === "datehierarchy") {
                    tags.push(<DateHierarchy options={JSON.parse(elementProps['data-options'])}></DateHierarchy>);
                }

            }
            tags.push(<br></br>)
            
        }
        if (formTag)
            return (
                <form> {tags}</form>
            )
        else
            return (
                {tags}
            )
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