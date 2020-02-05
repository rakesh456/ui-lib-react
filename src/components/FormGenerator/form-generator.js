import React from "react";

class FormGenerator extends React.PureComponent {

    constructor(props) {
        super(props);
        console.log(props);
        const formGenOptions = this.props.options;
        console.log(formGenOptions);
        this.state = {};
    }

    componentDidMount() {}

    componentDidUpdate() {}

    render() {
        return (
        <div>
            <label>{formGenOptions.label}</label>
        </div>
        )
    }
}

export default FormGenerator;