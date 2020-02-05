import React from "react";

class FormGenerator extends React.PureComponent {

    constructor(props) {
        super(props);
        const formGenOptions = this.props.options;
        this.state = {};
    }

    componentDidMount() {}

    componentDidUpdate() {}

    render() {
        return (
        <div>
            <p>Logic to render form should come here!</p>
        </div>
        )
    }
}

export default FormGenerator;