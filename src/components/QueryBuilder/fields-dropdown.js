import React from "react";

class FieldDropdown extends React.PureComponent {

    render() {
        const { fields } = this.props.options;
        return (
            <select className="VS-Query-Dropdown">
                { (fields)? fields.map((item, index) => <option value={item.label}>{item.field}</option>) : ''}
            </select>
        )
    }
}
export default FieldDropdown;