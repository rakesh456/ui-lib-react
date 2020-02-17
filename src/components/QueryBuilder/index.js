import React from "react";
import OperatorDropdown from "./operator-dropdown";
import OperationDropdown from "./operation-dropdown";
import FieldDropdown from "./fields-dropdown";
import * as CONSTANTS from '../../utils/constants'
import {
    isUndefinedOrNull
} from "../../utils/utils";

class QueryBuilder extends React.PureComponent {

    constructor(props) {
        super(props);
        const options = this.props.options;
        this.state = { options: options };
    }

    // Component lifecycle methods started
    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }
    // Component lifecycle methods end

    // Component render methods started

    renderQueryRow = () => {
        return (
            <div className="VS-Query-Row">
                <FieldDropdown options={this.props.options}></FieldDropdown>
                <OperationDropdown></OperationDropdown>
                <input type="text"
                    value=""
                    className=""
                    placeholder=""
                />
            </div>
        )
    }

    render() {
        const { fields } = this.props.options;
        return (
            <div>
                <fieldset>
                    <legend>Group:</legend>
                    <OperatorDropdown></OperatorDropdown>
                    {
                        this.renderQueryRow()
                    }
                </fieldset>
            </div>
        );
    }
    // Component render methods end
}

export default QueryBuilder;