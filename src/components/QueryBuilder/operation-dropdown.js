import React from "react";

class OperationDropdown extends React.PureComponent {

    render() {
        return (
            <select className="VS-Query-Dropdown">
                <option value="startwith">Start With</option>
                <option value="endwith">End With</option>
                <option value="contains">Contains</option>
                <option value="equal">Equal</option>
                <option value="notequal">Not Equal</option>
                <option value="in">In</option>
                <option value="notin">Not In</option>
                <option value="isempty">Is Empty</option>
                <option value="isnotempty">Is Not Empty</option>
                <option value="isnull">Is Null</option>
                <option value="isnotnull">Is Not Null</option>
            </select>
        )
    }
}
export default OperationDropdown;