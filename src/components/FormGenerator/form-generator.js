import React from "react";
import * as CONSTANTS from '../../utils/constants'

class FormGenerator extends React.PureComponent {   
    
    /* Wrappers for Datepicker */
    datePickerWrapper() {}
    // Wrapper for Date Hierarchy
    dateHierarchyWrapper() {}
    // Wrapper for Tag Selector
    tagSelectorWrapper() {}

    renderForm = () => {
        const options = this.props.options;
        if (Object.keys(options) !== 0) 
        {        
            let formProps = options.form ? options.form.props : '';
            formProps["key"] = options.form.id ? "form"+options.form.id : "form1";
            let tags = [];
            
            /*  Iterate on Radio and Checkbox */ 
            const rows =  options.rows;  
            if(rows.length!==0){
            rows.forEach((row, index) => 
            {    
                console.log(row)           
                 let labelText = row.rowLabel ? row.rowLabel.name : "";
                let noOfRowElements = row.rowElements.length;
                let keyRowDiv = 'rowDiv'+index;
                let keyRowLabel = 'rowLabel'
                let keyLabelDiv = 'labelDiv' + index;
                let keyElementDiv = 'elementDiv' + index;
             
                
                if (noOfRowElements > 1) {
                    const optionsInRows = row.rowElements;
                    optionsInRows.forEach((item, optionIndex) => {
                        item.elementLabel.props["className"] = item.elementLabel.props["className"]?CONSTANTS.CLASSES.VS_RADIOBUTTON + " " + item.elementLabel.props["className"]:CONSTANTS.CLASSES.VS_RADIOBUTTON;
                        item.elementLabel.props["key"] = keyRowLabel+optionIndex;

                    })


                    tags.push(React.createElement(
                        "div",
                        { className: `${CONSTANTS.CLASSES.VS_GC_LBL_COMP}`, key : keyRowDiv},
                        React.createElement(
                            "div",
                            {key: keyLabelDiv},
                            React.createElement(
                                "label",
                                {className: row.rowLabel ? (`${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY} , ${row.rowLabel.props.className}`) : `${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` },
                                labelText,
                            )
                        ),
                        React.createElement(
                            "div",
                            {key: keyElementDiv},
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
                let rowElements =  row.rowElements;
                if(rowElements.length!==0){
                rowElements.forEach((rowElement, index) => 
                {
                    
                    let elementID = rowElement.props.id;
                    let elementType = rowElement.elementType;
                    let elementProps = rowElement.props;
                    let keyRowLabel = 'rowLabelDiv'+index;
                    let keyRowElement= 'rowElementDiv' + index;
                    let elementError = elementID ? elementID+ '_error' : 'missingID_error';
                    elementProps.key = elementID;   

                    if (elementType === "input") {   
                        elementProps["className"] = elementProps["className"] ? CONSTANTS.CLASSES.VS_TEXTBOX + " " + elementProps["className"]: CONSTANTS.CLASSES.VS_TEXTBOX;
                                             
                        if (elementProps.type !== "radio" && elementProps.type !== "checkbox") {    
                            tags.push(React.createElement(
                                "div",
                                { className: `${CONSTANTS.CLASSES.VS_GC_LBL_COMP}`, key : keyRowDiv },
                                React.createElement(
                                    "div",
                                    {key: keyRowLabel},
                                    React.createElement(
                                        "label",
                                        { className: row.rowLabel ? (`${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY} ${row.rowLabel.props.className}`) : `${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` },
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
                            { className: `${CONSTANTS.CLASSES.VS_GC_LBL_COMP}`, key : keyRowDiv },
                            React.createElement(
                                "div",
                                {key: keyRowLabel},
                                React.createElement(
                                    "label",
                                    { className: row.rowLabel ? (`${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY} ${row.rowLabel.props.className}`) : `${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` },
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
                            { className: `${CONSTANTS.CLASSES.VS_GC_LBL_COMP}`, key : keyRowDiv },
                            React.createElement(
                                "div",
                                {key: keyRowLabel},
                                React.createElement(
                                    "label",
                                    { className: row.rowLabel ? (`${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY} ${row.rowLabel.props.className}`) : `${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` },
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
                        tags.push(
                        <div className = 'vs-gc-lbl-comp' key={keyRowDiv}> 
                        <div key={keyLabelDiv}><label className = "vs-label">{labelText}</label></div>
                        <div key={keyElementDiv}><date-picker data-options = {elementProps['data-options']} id = {elementProps.id} name= {elementProps.name} className={elementProps.className}></date-picker></div>
                        </div>
                        )
                    }
                    else if (elementType === 'datehierarchy')
                    {
                        
                        let ID = elementProps.id ? elementProps.id : '';
                        let elementName = elementProps.name ? elementProps.name : '';
                        tags.push(
                        <div className ='vs-gc-lbl-comp' key={keyRowDiv}> 
                        <div key={keyLabelDiv}><label className='vs-label'>{labelText}</label></div>
                            <div key={keyElementDiv}><date-hierarchy data-options = {elementProps['data-options']} id = {ID} name= {elementName}></date-hierarchy> </div>
                        </div>
                        )
                    }
                    else if (elementType === 'tagselector')
                    {
                        tags.push(
                        <div className ='vs-gc-lbl-comp' key={keyRowDiv}>
                        <div key={keyLabelDiv}><label className='vs-label'>{labelText}</label></div>
                        <div key={keyElementDiv}><tag-selector data-options = {elementProps['data-options']} id = {elementProps.id} name= {elementProps.name}></tag-selector> </div>
                        </div>
                        )
                    }
                   else 
                   {
                       tags.push(React.createElement(
                           "div",
                           { className: `${CONSTANTS.CLASSES.VS_GC_LBL_COMP}`, key : keyRowDiv },
                           React.createElement(
                               "div",
                               {key: keyRowLabel},
                               React.createElement(
                                "label",
                                { className: row.rowLabel ? (`${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY} ${row.rowLabel.props.className}`) : `${CONSTANTS.CLASSES.VS_BODY_REGULAR_PRIMARY}` },
                                labelText)),
                                React.createElement(
                                    "div",
                                    {key: keyRowElement},
                                    React.createElement(elementType,elementProps),
                                    React.createElement("span", {id: elementError})
                                )
                               )
                           );                       
                   } }); // Iteration on row elements ends here
            }}); // Iteration on rows ends here
            }
            
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