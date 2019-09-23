

import React from "react";
import { WEEK_SHORT_NAMES } from '../../../utils/calendar';

class CalendarWeek extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {month: new Date().getMonth(), year: new Date().getFullYear() };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {}

    render() {
        const weekItems = WEEK_SHORT_NAMES.map((number, index) =>
            <span className="VS-Day VS-Medium-UPPER-Case" key={index}>{number}</span>
        );
    
        return (
            <div className="VS-CalendarWeek">
                {weekItems}
            </div>
        );
    }
}

export default CalendarWeek;