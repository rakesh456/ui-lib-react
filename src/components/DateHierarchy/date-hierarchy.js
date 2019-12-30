import React from "react";
import YearView from "./yearView";

class DateHierarchy extends React.PureComponent {
    constructor(props) {
        super(props);              
        let yearList = [];
        this.state = { years: yearList};
    }
    
    updateDimensions() { 
        
    }

    render() {        
        return (
            <div>
                <YearView options={this.props.options} ></YearView>
            </div>
        )    
    }
}
export default DateHierarchy;