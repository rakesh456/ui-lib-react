import React from "react";

class OperatorDropdown extends React.PureComponent {

    render() {
        return (
            <select className="VS-Query-Dropdown">
                <option value="and">AND</option>
                <option value="or">OR</option>
            </select>
        )
    }
}
export default OperatorDropdown;