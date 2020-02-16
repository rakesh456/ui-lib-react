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
            
            /* Iterate on row elements */
            for (let j = 0; j < noOfRowElements; j++) {
                let elementID     = options.rows[i].rowElements[j].props.id;
                let elementType   = options.rows[i].rowElements[j].props.type;
                let elementProps  = options.rows[i].rowElements[j].props;
                let labelKey      = elementID + "label";
                let labelKeyOuter = labelKey + "Outer";
                elementProps.key  = elementID;
                
                tags.push(<label htmlFor={elementID} key={labelKeyOuter}>{labelText} </label>);
 
                if (elementType === "radio") {              
                    tags.push(<label htmlFor={elementID} key={labelKey}><input type= "radio" name ={options.rows[i].rowElements[j].props.name} id={elementID} required></input>{options.rows[i].rowElements[j].elementLabel.name}</label>);                    
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
                else
                {
                    tags.push(React.createElement(options.rows[i].rowElements[j].elementType, options.rows[i].rowElements[j].props));    
                }            
        }        
    }
        return (
        <div className="wrapper">
            <form action ={options.form.props.action} method={options.form.props.method} className="form-wrapper" id="form">
                {tags}               
                        <div className="col-5">
                        <button type="submit" form="form" value="Submit">Submit</button>
                        <button type="reset" form="form" value="Reset">Reset</button>
                        </div>
                    
                </form>
      </div>
        )
    }
}

export default FormGenerator;