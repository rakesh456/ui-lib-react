import React from "react";
import './css/vs.scss';
import DatePicker from '../../components/Datepicker/index';
import * as CONSTANTS from '../../utils/constants'
import { isBlank, isUndefinedOrNull } from '../../utils/utils'
import {
    resetOptions,
    formatOptions    
} from "../../utils/calendar";

import TagSelector from '../../components/TagSelector/tag-selector';
import DateHierarchy from '../../components/DateHierarchy/date-hierarchy';


class FormGenerator extends React.PureComponent {
    
    
    
    
    /* Wrappers for Datepicker */
    datePickerWrapper() {}
    // Wrapper for Date Hierarchy
    dateHierarchyWrapper() {}
    // Wrapper for Tag Selector
    tagSelectorWrapper() {}

    // changeToClassName(props) {
    //     if (props["class"]) {
    //         props["className"] = `${CONSTANTS.CLASSES.VS_TEXTBOX}` + props["class"]?  " " + props["class"]: "";
    //         delete props["class"];
    //     }
    //     else 
    //         props["className"] = `${CONSTANTS.CLASSES.VS_TEXTBOX}` + "99";
    //     return props;
    // }
    
    renderForm = () => {
        if (Object.keys(this.props.options) != 0) 
        {
            
            var options = this.props.options;
            var formProps = options.form ? options.form.props : '';
            options.rows.forEach((row) => {
                
            })


            var noOfRows = options.rows.length;
            var tags = [];
            options.rows.forEach(element => {
                //console.log("Inside Form Gen",element.rowElements)
                
            });
            
            /*  Iterate on Radio and Checkbox */
            // It starts from here
            
            options.rows.forEach((option, index) => 
            {
                
                let labelText = option.rowLabel ? option.rowLabel.name : "";
                let noOfRowElements = option.rowElements.length;
                let labelKey = labelText + noOfRowElements;
                let errorId = labelText ? labelText+'_error' : '';
                let inx = 'div'+index;
                if (noOfRowElements > 1) {
                    var optionsInRows = option.rowElements;
                    tags.push(React.createElement(
                        "div",
                        { className: `${CONSTANTS.CLASSES.VS_GC_LBL_COMP}`, key : Math.random()*100},
                        React.createElement(
                            "div",
                            {},
                            React.createElement(
                                "label",
                                { className: option.rowLabel ? (`${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` + ' ' + option.rowLabel.props.className) : `${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` },
                                labelText,
                            )
                        ),
                        React.createElement(
                            "div",
                            {},
                            optionsInRows.map(item =>  
                                
                                // Object.assign(item.props, this.changeToClassName(item.props));
                                // console.log("line 85", item.props);

                                React.createElement(
                                "label",
                                item.elementLabel ? item.elementLabel.props: '',
                                item.elementLabel ? item.elementLabel.name : '',
                                
                                React.createElement(
                                    "input",
                                    item.props
                                ), React.createElement(
                                    "span",
                                    {className : (item.props.type == "checkbox")? "vs-checkmark" : "vs-radio-dot" }
                                )

                            ))                            
                        ), 
                        React.createElement("span", {className: errorId})
                    ));
                }

                /* Iterate on row elements */
                option.rowElements.forEach((rowElement, index) => 
                // for (let j = 0; j < noOfRowElements; j++) 
                {
                    let elementID = rowElement.props.id;
                    let elementType = rowElement.elementType;
                    let elementProps = rowElement.props;
                    let inx = 'divnew'+index;
                    let labelKey = elementID + "label";
                    let labelKeyOuter = labelKey + "Outer";
                    
                    elementProps.key = elementID;

                    

                    if (elementType === "input") {
                        if (elementProps["class"] !== undefined) {
                            elementProps["className"] = `${CONSTANTS.CLASSES.VS_TEXTBOX}` + elementProps["class"]?  " " + elementProps["class"]: "";
                            delete elementProps["class"];
                        }
                        else 
                            elementProps["className"] = `${CONSTANTS.CLASSES.VS_TEXTBOX}`;

                        if (elementProps.type != "radio" && elementProps.type !="checkbox") {
                            tags.push(React.createElement(
                                "div",
                                { className: `${CONSTANTS.CLASSES.VS_GC_LBL_COMP}`,key : Math.random()*100},
                                React.createElement(
                                    "div",
                                    {},
                                    React.createElement(
                                        "label",
                                        { className: option.rowLabel ? (`${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` + ' ' + option.rowLabel.props.className) : `${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` },
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

                        let items = rowElement.options;

                        tags.push(React.createElement(
                            "div",
                            { className: `${CONSTANTS.CLASSES.VS_GC_LBL_COMP}`, key : Math.random()*100 },
                            React.createElement(
                                "div",
                                {},
                                React.createElement(
                                    "label",
                                    { className: option.rowLabel ? (`${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` + ' ' + option.rowLabel.props.className) : `${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` },
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
                                    rowElement.props,
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
                            { className: `${CONSTANTS.CLASSES.VS_GC_LBL_COMP}`,key : Math.random()*100 },
                            React.createElement(
                                "div",
                                {},
                                React.createElement(
                                    "label",
                                    { className: option.rowLabel ? (`${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` + ' ' + option.rowLabel.props.className) : `${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` },
                                    labelText)),
                            React.createElement(
                                "div",
                                {},
                                React.createElement("textarea", elementProps)
                            ),React.createElement("span", {className: errorId})

                        )
                        );

                    }
                    else if (elementType == 'datepicker')
                    {
                        let options = JSON.parse(elementProps['data-options']);
                        options = (isUndefinedOrNull(options))? resetOptions({}) : resetOptions(options);
                        options = formatOptions(options);
                        tags.push(
                        <div className = 'vs-gc-lbl-comp' key= 'Math.random()*100'> 
                        <div><label className = "vs-label">{labelText}</label></div>
                        <div><DatePicker options={options} onFocus={this.datePickerWrapper} onSelect={this.datePickerWrapper} onBlur={this.datePickerWrapper}/></div>
                        </div>)
                    }
                    else if (elementType == 'datehierarchy')
                    {
                        let options = JSON.parse(elementProps['data-options']);
                        options = (isUndefinedOrNull(options))? resetOptions({}) : resetOptions(options);
                        options = formatOptions(options);
                        tags.push(
                        <div className ='vs-gc-lbl-comp' key= 'Math.random()*100'> 
                        <div><label className='vs-label'>{labelText}</label></div>
                        <div><DateHierarchy options={options} onFocus={this.dateHierarchyWrapper} onSelect={this.dateHierarchyWrapper} onBlur={this.dateHierarchyWrapper}/></div>
                        </div>)
                    }
                    else if (elementType == 'tagselector')
                    {
                        let options = JSON.parse(elementProps['data-options']);
                        options = (isUndefinedOrNull(options))? resetOptions({}) : resetOptions(options);
                        options = formatOptions(options);
                        tags.push(
                        <div className ='vs-gc-lbl-comp' key= 'Math.random()*100'>
                        <div><label className='vs-label'>{labelText}</label></div>
                        <div><TagSelector options={options} onFocus={this.tagSelectorWrapper} onSelect={this.tagSelectorWrapper} onBlur={this.tagSelectorWrapper}/></div>
                        </div>)
                    }
                    
                   else 
                   {
                       tags.push(React.createElement(
                           "div",
                           { className: `${CONSTANTS.CLASSES.VS_GC_LBL_COMP}`, key : Math.random()*100},
                           React.createElement(
                               "div",
                               {},
                               React.createElement(
                                "label",
                                { className: option.rowLabel ? (`${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` + ' ' + option.rowLabel.props.className) : `${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` },
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

                }); // the j loop ends here
                tags.push(<br></br>)

            }); //the i loop ends here
            return (
                (options.form) 
                    ?
                    React.createElement(
                    "div",
                    {},
                    React.createElement(
                        "form",
                        {formProps},
                        tags,
                        React.createElement(
                            "button",
                            {className: 'vs-button vs-primary-one-outline',
                            value: 'submit',
                            type: 'button'
                        },
                        "Submit"),
                        React.createElement(
                            "button",
                            {type: 'reset',
                            className: 'vs-button vs-primary-one-outline',
                            value: 'reset'
                        },
                        "Reset"
                        )))
                 : 
                 <div> {tags}</div>
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

    myMethod = () => {
        this.props.onSubmit();
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