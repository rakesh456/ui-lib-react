import React from "react";
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
                let errorId = labelText ? labelText.replace(" ", "").replace(":","") +'_error' : '';
                let inx = 'rowDiv'+index;
                let keyRowLabel = 'rowLabelDiv'+index;
                let keyRowElement = 'rowElementDiv' + index;
                
                if (noOfRowElements > 1) {
                    var optionsInRows = option.rowElements;


                    optionsInRows.forEach((item, optionIndex) => {
                        item.elementLabel.props["className"] = item.elementLabel.props["className"]?CONSTANTS.CLASSES.VS_RADIOBUTTON + " " + item.elementLabel.props["className"]:CONSTANTS.CLASSES.VS_RADIOBUTTON;

                        // item.props["className"] = item.props["className"] ? CONSTANTS.CLASSES.VS_TEXTBOX + 
                        // " " + item.props["className"] : CONSTANTS.CLASSES.VS_TEXTBOX;
                        // item.props["key"] = "rowElementDiv" + optionIndex + "" + index;
                    })


                    tags.push(React.createElement(
                        "div",
                        { className: `${CONSTANTS.CLASSES.VS_GC_LBL_COMP}`, key : {inx}},
                        React.createElement(
                            "div",
                            {key: {keyRowLabel}},
                            React.createElement(
                                "label",
                                { className: option.rowLabel ? (`${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` + ' ' + option.rowLabel.props.className) : `${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` },
                                labelText,
                            )
                        ),
                        React.createElement(
                            "div",
                            {key: keyRowElement},
                            optionsInRows.map(item => React.createElement(
                                "label",
                                item.elementLabel ? item.elementLabel.props: '',
                                item.elementLabel ? item.elementLabel.name : '',
                                
                                React.createElement(
                                    "input",
                                    item.props
                                ), React.createElement(
                                    "span",
                                    {className : (item.props.type === "checkbox")? CONSTANTS.CLASSES.VS_CHECK_MARK : CONSTANTS.CLASSES.VS_RADIO_DOT}
                                )

                            , React.createElement("span", {id: labelText ? labelText+'_error': 'missingID_error'})))                            
                        )
                        
                    ));
                }

                /* Iterate on row elements */
                option.rowElements.forEach((rowElement, index) => 
                {
                    console.log(index,rowElement)
                    let elementID = rowElement.props.id;
                    let elementType = rowElement.elementType;
                    let elementProps = rowElement.props;
                    let inx = 'divnew'+index;
                    let labelKey = elementID + "label";
                    let labelKeyOuter = labelKey + "Outer";    
                    let keyRowLabel = 'rowLabelDiv'+index;
                    let keyRowElement = 'rowElementDiv' + index;
                    let elementError = elementID ? elementID+ '_error' : 'missingID_error';

                    elementProps.key = elementID;    
                    

                    if (elementType === "input") {   
                        elementProps["className"] = elementProps["className"] ? CONSTANTS.CLASSES.VS_TEXTBOX + " " + elementProps["className"]: CONSTANTS.CLASSES.VS_TEXTBOX;
                                             
                        if (elementProps.type !== "radio" && elementProps.type !== "checkbox") {    
                            tags.push(React.createElement(
                                "div",
                                { className: `${CONSTANTS.CLASSES.VS_GC_LBL_COMP}`, key : {inx} },
                                React.createElement(
                                    "div",
                                    {key: keyRowLabel},
                                    React.createElement(
                                        "label",
                                        { className: option.rowLabel ? (`${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` + ' ' + option.rowLabel.props.className) : `${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` },
                                        labelText)),
                                React.createElement(
                                    "div",
                                    {key: keyRowElement},
                                    React.createElement(
                                        "input",
                                        elementProps,
                                        
                                    ), React.createElement("span", {id: elementError})
                                )
                            ));
                        }
                    }
                    else if (elementType === "select") {
                        let items = rowElement.options;
                        tags.push(React.createElement(
                            "div",
                            { className: `${CONSTANTS.CLASSES.VS_GC_LBL_COMP}`, key : {inx} },
                            React.createElement(
                                "div",
                                {key: keyRowLabel},
                                React.createElement(
                                    "label",
                                    { className: option.rowLabel ? (`${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` + ' ' + option.rowLabel.props.className) : `${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` },
                                    labelText
                                )
                            ),
                            React.createElement(
                                "div",
                                {
                                    className: `${CONSTANTS.CLASSES.VS_DROPDOWN}`,
                                    key: keyRowElement
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
                                ), React.createElement("span", {id: elementError})

                            )
                            
                        ));
                    }
                    else if (elementType === "textarea") {
                        elementProps["className"] = elementProps["className"] ? CONSTANTS.CLASSES.VS_TEXTAREA + " " + elementProps["className"]: CONSTANTS.CLASSES.VS_TEXTAREA;

                        tags.push(React.createElement(
                            "div",
                            { className: `${CONSTANTS.CLASSES.VS_GC_LBL_COMP}`, key : {inx} },
                            React.createElement(
                                "div",
                                {key: keyRowLabel},
                                React.createElement(
                                    "label",
                                    { className: option.rowLabel ? (`${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` + ' ' + option.rowLabel.props.className) : `${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` },
                                    labelText)),
                            React.createElement(
                                "div",
                                {key: keyRowElement},
                                React.createElement("textarea", elementProps),React.createElement("span", {id: elementError})
                            )

                        )
                        );
                    }
                    else if (elementType === 'datepicker')
                    {
                        let options = JSON.parse(elementProps['data-options']);
                        options = (isUndefinedOrNull(options))? resetOptions({}) : resetOptions(options);
                        options = formatOptions(options);
                        tags.push(
                        <div className = 'vs-gc-lbl-comp'> 
                        <div><label className = "vs-label">{labelText}</label></div>
                        {/* <div><DatePicker options={options} onFocus={this.datePickerWrapper} onSelect={this.datePickerWrapper} onBlur={this.datePickerWrapper}/></div> */}
                        <div><date-picker data-options = {elementProps['data-options']} id = {elementProps.id} name= {elementProps.name} className=
                        {elementProps.className}></date-picker></div>
                        </div>)
                    }
                    else if (elementType === 'datehierarchy')
                    {
                        let options = JSON.parse(elementProps['data-options']);
                        let ID = elementProps.id ? elementProps.id : '';
                        let elementName = elementProps.name ? elementProps.name : '';
                        options = (isUndefinedOrNull(options))? resetOptions({}) : resetOptions(options);
                        options = formatOptions(options);
                        tags.push(
                        <div className ='vs-gc-lbl-comp'> 
                        <div><label className='vs-label'>{labelText}</label></div>
                        {/* <div><DateHierarchy options={options} onFocus={this.dateHierarchyWrapper} onSelect={this.dateHierarchyWrapper} onBlur={this.dateHierarchyWrapper}/></div> */}
                            <div className="VS-formGen-DH"><date-hierarchy data-options = {elementProps['data-options']} id = {ID} name= {elementName}> </date-hierarchy> </div>
                        </div>)
                    }
                    else if (elementType === 'tagselector')
                    {
                        let options = JSON.parse(elementProps['data-options']);
                        options = (isUndefinedOrNull(options))? resetOptions({}) : resetOptions(options);
                        options = formatOptions(options);
                        tags.push(
                        <div className ='vs-gc-lbl-comp'>
                        <div><label className='vs-label'>{labelText}</label></div>
                        {/* <div><TagSelector options={options} onFocus={this.tagSelectorWrapper} onSelect={this.tagSelectorWrapper} onBlur={this.tagSelectorWrapper}/></div> */}
                        <div><tag-selector data-options = {elementProps['data-options']} id = {elementProps.id} name= {elementProps.name}></tag-selector> </div>
                        </div>)
                    }
                    
                   else 
                   {
                       tags.push(React.createElement(
                           "div",
                           { className: `${CONSTANTS.CLASSES.VS_GC_LBL_COMP}`, key : {inx} },
                           React.createElement(
                               "div",
                               {key: keyRowLabel},
                               React.createElement(
                                "label",
                                { className: option.rowLabel ? (`${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` + ' ' + option.rowLabel.props.className) : `${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` },
                                labelText)),
                                React.createElement(
                                    "div",
                                    {key: keyRowElement},
                                    React.createElement(elementType,elementProps),
                                    React.createElement("span", {id: elementError})
                                )
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
                    {key: "formDiv"},
                    React.createElement(
                        "form",
                        formProps,
                        tags,
                        React.createElement(
                            "button",
                            {className: 'vs-button vs-primary-one-outline',
                            value: 'submit',
                            type: 'submit'},
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
            <div className="VS-Form-Generator-Wrapper">
                {this.renderForm()}
            </div>
        )
    }
}
export default FormGenerator;