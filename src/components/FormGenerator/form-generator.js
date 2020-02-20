import React from "react";
import './css/vs.css';
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
            
            
            /* Iterate on row elements */
            for (let j = 0; j < noOfRowElements; j++) {
                let elementID     = options.rows[i].rowElements[j].props.id;
                let elementType   = options.rows[i].rowElements[j].elementType;
                let elementProps  = options.rows[i].rowElements[j].props;
                let labelKey      = elementID + "label";
                let labelKeyOuter = labelKey + "Outer";
                elementProps.key  = elementID;
                // tags.push(<label htmlFor={elementID} key={labelKeyOuter}>{labelText} </label>);
 
                if (elementType === "input") {  
                    if (elementProps.type ==="radio"){
                        // var name = {options.rows[i].rowElements[j].props.name};
                        var props = options.rows[i].rowElements[j].elementLabel.props;
                        var radioname = options.rows[i].rowElements[j].elementLabel.name;
                        var radioprops =options.rows[i].rowElements[j].props;
                        let elementLabel = options.rows[i].rowElements[j].elementLabel.name;
                        // tags.push(<div className="vs-gc-lbl-comp"><div><label htmlFor={elementID} key={labelKey} className="vs-radiobutton"><div><input type= "radio" name ={options.rows[i].rowElements[j].props.name} id={elementID} required></input></div>{options.rows[i].rowElements[j].elementLabel.name}</label></div></div>);
                        // tags.push(<label htmlFor={elementID} key={labelKey}><input type= "radio" name ={options.rows[i].rowElements[j].props.name} id={elementID} required></input>{options.rows[i].rowElements[j].elementLabel.name}</label>);

                        tags.push(<div className="vs-gc-lbl-comp">
                            <div> <label className="vs-label">{labelText}</label></div>
                            <div><label></label></div>
                        </div>)
                        
                        
                        tags.push(React.createElement(
                                "div",
                                {className : "vs-gc-lbl-comp"}, 
                                React.createElement(
                                    "div",
                                    {},
                                    React.createElement(
                                        "label",
                                        {className : "vs-label"},
                                        labelText
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    {},
                                    React.createElement(
                                        "label",
                                        props,
                                        radioname,
                                        React.createElement(
                                            "input",
                                            radioprops
                                        )

                                        
                                    )

                                )
                                                                
                            )


                        );




                    }    
                    else{
                        // tags.push(React.createElement(options.rows[i].rowElements[j].elementType, options.rows[i].rowElements[j].props)); 
                        // tags.push(React.createElement("div", {class : "vs-gc-lbl-comp"}, React.createElement("div", React.createElement("input",options.rows[i].rowElements[j].props))); 
                    
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
                    // tags.push(React.createElement(
                    // "textarea",
                    // elementProps
                    // ));



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
        {/* <form action ={options.form.props.action} method={options.form.props.method} className="form-wrapper" id="form"> */}
                {tags}                           
                
      </div>
        )
    }
}

export default FormGenerator;