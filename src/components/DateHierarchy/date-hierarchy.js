import React from "react";
import { getListOfYears } from "../../utils/datehierarchyutils";
import YearView from "./yearView";

class DateHierarchy extends React.PureComponent {
    constructor(props) {
        super(props);
        let {options} = this.props;
        let yearList = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks);
        this.state = { years: yearList};
    }
    updateDimensions() { 
        
    }

    render() {
        const {options} = this.props;
        
        return (
            <div options = {options}>
                {/* <input className= "VS-SearchBox" type="text" placeholder="Search.."> */}
                {/* </input> */}
                <YearView options={options} ></YearView>
            </div>
        )    
    }
}
export default DateHierarchy;