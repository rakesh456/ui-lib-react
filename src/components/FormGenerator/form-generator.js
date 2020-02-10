import React from "react";
import tag from "react-icons/lib/fa/tag";
import './style.css';
var ReactDOM = require('react-dom');

class FormGenerator extends React.PureComponent {

    constructor(props) {
        super(props);
        const formGenOptions = this.props;
        console.log('At the constructor',formGenOptions);
        this.state = {
            // formValid: false,
            // errorCount: null,
            
        };
        
    }
    
//     requiredFeild = (event) =>
//     {
//         event.preventDefault();
//         const {name,value} = event.target;
//         let errors = this.state.errors;

//         errors.reqfield = value.length < 1 ? 'Value is required': '';

//     this.setState({errors, [name]: value});
// }


    

    
    componentDidMount() {}

    componentDidUpdate() {}

    render() {
        console.log('Options at Render func. for test',this.props.options.elements.length);
        console.log('Options at Render func. for test',Object.keys(this.props.options.elements).length);
        var len = Object.keys(this.props.options.elements).length;
        const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        // handleChange = (event) => 
        // {

        // }
        const tags= [];
        for( var i =0; i< len ; i++)
        {
            var element_type = this.props.options.elements[i].elementType;
            var label_name = this.props.options.elements[i].label.name;
            var required = this.props.options.elements[i].props.required;
            var id = this.props.options.elements[i].props.id;
            var placeholder_custom = "Enter your "+this.props.options.elements[i].label.name;
            if( label_name != '')
            {
            tags.push(<label htmlFor={this.props.options.elements[i].props.id}>Your {this.props.options.elements[i].label.name} is</label>)
            // tags.push(":")
            
            }
            if (element_type == 'input' && required == 'true')
            {
                tags.push(<input type = {this.props.options.elements[i].props.type} placeholder={placeholder_custom}  title={this.props.options.elements[i].props.title}  id={this.props.options.elements[i].props.id} required></input>)
            }
            else if(element_type =='email' && required =='true')
            {
                tags.push(<input type = {this.props.options.elements[i].props.type} placeholder={placeholder_custom}  title={this.props.options.elements[i].props.title} id={this.props.options.elements[i].props.id} pattern='/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i' required></input>)
            }
            else if (element_type == 'input')
            {
                tags.push(<input type = {this.props.options.elements[i].props.type} placeholder={placeholder_custom} title={this.props.options.elements[i].props.title} id={this.props.options.elements[i].props.id}></input>)
            }
            // if (errors.id.length > 0) 
            //   tags.push(<span className='error'>{errors.fullName}</span>)
            console.log("The values are",this.props.options.elements[i].props.id.value);
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




{/* <input type="submit" value="Submit" class="col-6" ></input>
<input type="reset" value="Reset" class="col-6"></input> */}