import React from "react";
import './style.css';

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
            tags.push(<label key={labelKey}>{labelText}</label>);
            
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
                        tags.push(<label htmlFor={elementID} key={labelKey}><input type= "radio" name ={options.rows[i].rowElements[j].props.name} id={elementID} required></input>{options.rows[i].rowElements[j].elementLabel.name}</label>);
                    }    
                    else{
                        tags.push(React.createElement(options.rows[i].rowElements[j].elementType, options.rows[i].rowElements[j].props)); 
                    }          
                                         
                }
                else if (elementType === "select")
                {
                    
                    let items = options.rows[i].rowElements[j].options;
                    
                    
                    
                    tags.push(React.createElement(
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
                        ));
                }
                else if (elementType === "textarea")
                {
                    tags.push(React.createElement(
                    "textarea",
                    elementProps
                    ));
                }            
                       
        }  
        tags.push(<br></br>)      
    }
        return (
        <div className="wrapper">
            <h1>Your form</h1>
            <form action ={options.form.props.action} method={options.form.props.method} className="form-wrapper" id="form">
                {tags}               
                        <div className="col-6">
                        <button type="submit" form="form" value="Submit">Submit</button>
                        </div>
                        <div>
                        <button type="reset" form="form" value="Reset">Reset</button>
                        </div>
                    
                </form>
      </div>
        )
    }
}

export default FormGenerator;