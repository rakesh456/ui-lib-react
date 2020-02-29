import React from "react";
import './css/vs.scss';
import DatePicker from '../../components/Datepicker/index';
import * as CONSTANTS from '../../utils/constants'
import { isUndefinedOrNull } from '../../utils/utils'
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

    renderForm = () => {
        if (Object.keys(this.props.options) !== 0) 
        {            
            let options = this.props.options;
            let formProps = options.form ? options.form.props : '';
            formProps["key"] = options.form.id?"form"+options.form.id:"form1";
            let tags = [];
            
            /*  Iterate on Radio and Checkbox */            
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
                            optionsInRows.map(item => React.createElement(
                                "label",
                                item.elementLabel ? item.elementLabel.props: '',
                                item.elementLabel ? item.elementLabel.name : '',
                                
                                React.createElement(
                                    "input",
                                    item.props
                                ), React.createElement(
                                    "span",
                                    {className : (item.props.type === "checkbox")? "vs-checkmark" : "vs-radio-dot" }
                                )

                            ))                            
                        ), 
                        React.createElement("span", {className: errorId})
                    ));
                }

                /* Iterate on row elements */
                option.rowElements.forEach((rowElement, index) => 
                {
                    let elementID = rowElement.props.id;
                    let elementType = rowElement.elementType;
                    let elementProps = rowElement.props;
                    let inx = 'divnew'+index;
                    let labelKey = elementID + "label";
                    let labelKeyOuter = labelKey + "Outer";                    
                    elementProps.key = elementID;         
                    elementProps["className"] = elementProps["className"] ? CONSTANTS.CLASSES.VS_TEXTBOX + " " + elementProps["className"]: CONSTANTS.CLASSES.VS_TEXTBOX;

                    if (elementType === "input") {                        
                        if (elementProps.type !== "radio" && elementProps.type !== "checkbox") {    
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
                    else if (elementType === 'datepicker')
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
                    else if (elementType === 'datehierarchy')
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
                    else if (elementType === 'tagselector')
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

                }); // Iteration on row elements ends here
                
            }); // Iteration on rows ends here
            return (
                (options.form) 
                    ?
                    React.createElement(
                    "div",
                    {},
                    React.createElement(
                        "form",
                        formProps,
                        tags,
                        React.createElement(
                            "button",
                            {className: 'vs-button vs-primary-one-outline',
                            value: 'submit',
                            type: 'button'},
                        "Submit"),
                        React.createElement(
                            "button",
                            {className: 'vs-button vs-primary-one-outline',
                            value: 'reset',
                            type: 'reset'
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