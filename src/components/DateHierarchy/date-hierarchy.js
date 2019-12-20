import React from "react";
import { Input } from 'reactstrap';
import ReactDOM from 'react-dom';
import { getListOfYears } from "../../utils/datehierarchy";
import YearView from "./yearView";

class DateHierarchy extends React.PureComponent {
    constructor(props) {
        super(props);
        let {options} = this.props;
        let yearList = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks);
        this.state = { years: yearList};
    }
    updateDimensions() { }

    componentDidMount() {
    }
    render() {
        const {options} = this.props;
        
        return (
            <div options = {options}>
                <input className= "VS-SearchBox" type="text" placeholder="Search..">
                </input>
                <YearView options={options}></YearView>
                {/* {this.state.years.map((row, index) => this.renderYear(row, index))} */}
            </div>
        )    
    }
}
export default DateHierarchy;