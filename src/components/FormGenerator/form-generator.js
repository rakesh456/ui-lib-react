import React from "react";
import './style.css';

class FormGenerator extends React.PureComponent {

    render() {
        console.log('Options at Render func. for test',this.props.options.rows.length);
        console.log('Options at Render func. for test',Object.keys(this.props.options.rows).length);
        var len = this.props.options.rows.length;
        
        const tags= [];
        for( var i = 0; i < len ; i++)
        {   
            
            var label_name = this.props.options.rows[i].rowLabel.name;
            var rowElements_length = this.props.options.rows[i].rowElements.length;
            if( label_name !== '')
            {
                tags.push(<label htmlFor={id}>{label_name} </label>)
            }
            for (var j = 0; j < rowElements_length; j++)
            {
            var id = this.props.options.rows[i].rowElements[j].props.id;
            console.log("If radio or not :",this.props.options.rows[i].rowElements[j].props.type)
            if((this.props.options.rows[i].rowElements[j].props.type) == "radio")
                     {              
                        tags.push(<label htmlFor={this.props.options.rows[i].rowElements[j].props.id}><input type= "radio" name ={this.props.options.rows[i].rowElements[j].props.name} id={this.props.options.rows[i].rowElements[j].props.id} required></input>{this.props.options.rows[i].rowElements[j].elementLabel.name}</label>);
            
                     }
             else if ((this.props.options.rows[i].rowElements[j].elementType) == "select")
             {
                    var items = this.props.options.rows[i].rowElements[j].options;
                    items.unshift({ 
                        "props":{ 
                           "value":""
                        },
                        "optionLabel":"Select One"
                     });

                    tags.push(React.createElement(
                        "select",
                        this.props.options.rows[i].rowElements[j].props,
                        items.map(item => React.createElement(
                          "option",
                          { value: item.props.value,
                            selected : item.props.selected ? "selected" :""
                        }, 
                          item.optionLabel
                        ))
                      ));
             }
             else if ((this.props.options.rows[i].rowElements[j].elementType) == "textarea")
             {
                        tags.push(React.createElement(
                        "textarea",
                        this.props.options.rows[i].rowElements[j].props
                    ));
             }
            
            else
            {
                    tags.push(React.createElement(this.props.options.rows[i].rowElements[j].elementType, this.props.options.rows[i].rowElements[j].props));    
            }
            
        }
        tags.push(<br></br>)
        
    }

        return (
        <div className="wrapper">
            <form action ={this.props.options.form.props.action} method={this.props.options.form.props.method} className="form-wrapper" id="form">
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



