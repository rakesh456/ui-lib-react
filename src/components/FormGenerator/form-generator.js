import React from "react";
import './css/vs.scss';
import DatePicker from '../../components/Datepicker/index';


class FormGenerator extends React.PureComponent {

    render() {
        var options  = this.props.options;
        var noOfRows = options.rows.length;        
        var tags     = [];
        
        
        /*  Iterate on rows */
        for(let i = 0; i < noOfRows ; i++) {   
            
            let labelText       = options.rows[i].rowLabel.name?options.rows[i].rowLabel.name : "Your Input";
            let noOfRowElements = options.rows[i].rowElements.length;
            let labelKey = labelText + noOfRowElements; 
            
            if (noOfRowElements > 1)
            {
                var genderoptions1 = options.rows[i].rowElements;
                
                console.log("Gender options are", genderoptions1);
                tags.push(React.createElement(
                    "div",
                    {className : "vs-gc-lbl-comp"},
                    React.createElement(
                        "div",
                        {},
                        React.createElement(
                            "label",
                            {className : "vs-label"},
                            labelText,
                        )
                    ), 
                    React.createElement(
                        "div",
                        {},
                        genderoptions1.map(item => React.createElement(
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
                let elementID     = options.rows[i].rowElements[j].props.id;
                let elementType   = options.rows[i].rowElements[j].elementType;
                let elementProps  = options.rows[i].rowElements[j].props;
                let labelKey      = elementID + "label";
                let labelKeyOuter = labelKey + "Outer";
                elementProps.key  = elementID;
                
 
                if (elementType === "input") {  
                    if (elementProps.type != "radio"){
                        tags.push(<div class="vs-gc-lbl-comp"><div><label className="vs-body-regular-primary">{labelText}</label></div><div><input type={elementProps.type} className={elementProps.className} id={elementProps.id} title={elementProps.title}></input></div></div>)

                    }                           
                }
                else if (elementType === "select")
                {
                    
                    let items = options.rows[i].rowElements[j].options;
                
                        tags.push(React.createElement(
                            "div",
                            {className : "vs-gc-lbl-comp"},
                            React.createElement(
                                "div",
                                {},
                                React.createElement(
                                    "label",
                                    {className: "vs-body-regular-primary"},
                                    labelText
                                )
                            ), 
                            React.createElement(
                                "div",
                                {
                                    className : "vs-dropdown"
                                },
                                
                                React.createElement(
                                    "select",
                                    options.rows[i].rowElements[j].props,
                                    items.map(item => React.createElement(
                                        "option",
                                        { value: item.props.value,
                                        selected : item.props.selected ? "selected" :"",
                                        key: item.props.value
                                    }, 
                                        item.optionLabel
                                    ))
                                    )

                            )
                        ));
                        
                }
                else if (elementType === "textarea")
                {
                    tags.push(React.createElement(
                        "div",
                        {className : "vs-gc-lbl-comp"},
                        React.createElement(
                           "div",
                           {},
                           React.createElement(
                               "label",
                               {className : "vs-body-regular-primary"},
                               labelText)),
                                React.createElement(
                                     "div",
                                     {},
                                     React.createElement("textarea", elementProps)
                        )

                    )
                 );
                    
                }      
                else if (elementType === "datepicker")   
                {
                    console.log(JSON.parse(elementProps['data-options']));
                    tags.push(<DatePicker options= {JSON.parse(elementProps['data-options'])}></DatePicker>); 
                }   
                       
        } 
        tags.push(<br></br>)      
    }
        return (
        <div>
                
            <h1>Your form</h1>
                {tags}                           
                
      </div>
        )
    }
}

export default FormGenerator;