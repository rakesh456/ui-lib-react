import React from "react";
import tag from "react-icons/lib/fa/tag";
var ReactDOM = require('react-dom');

class FormGenerator extends React.PureComponent {

    constructor(props) {
        super(props);
        const formGenOptions = this.props;
        console.log('At the constructor',formGenOptions);
        this.state = {
        };
        
    }
    

    componentDidMount() {}

    componentDidUpdate() {}

    render() {
        console.log('Options at Render func. for test',this.props.options.elements.length);
        console.log('Options at Render func. for test',Object.keys(this.props.options.elements).length);
        var len = Object.keys(this.props.options.elements).length;
        const tags= [];
        for( var i =0; i< len ; i++)
        {
            var element_type = this.props.options.elements[i].elementType;
            var label_name = this.props.options.elements[i].label.name;
            var required = this.props.options.elements[i].props.required;
            if( label_name != '')
            {
            tags.push(<label for={this.props.options.elements[i].props.id}>{this.props.options.elements[i].label.name}</label>)
            tags.push(":")
            
            }
            if (element_type == 'input' && required == 'required')
            {
                tags.push(<input type = {this.props.options.elements[i].props.type} placeholder='input' id={this.props.options.elements[i].props.id} required></input>)
            }
            else if(element_type =='email')
            {
                tags.push(<input type = {this.props.options.elements[i].props.type} placeholder='Enter your email' id={this.props.options.elements[i].props.id} pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"></input>)
            }
            else if (element_type == 'input')
            {
                tags.push(<input type = {this.props.options.elements[i].props.type} placeholder='input' id={this.props.options.elements[i].props.id}></input>)
            }

            tags.push(<br></br>)
        }
    

        return (
        <div>
            <form action ={this.props.options.form.props.action} method={this.props.options.form.props.action}>
                {tags}
                <input type="submit" value="Submit" ></input>
                <input type="reset" value="Reset"></input>
                </form>
    </div>
        )
    }
}

export default FormGenerator;