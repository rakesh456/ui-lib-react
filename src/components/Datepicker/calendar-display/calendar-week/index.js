

import React from "react";
import { CALENDAR_WEEKS } from '../../../../utils/utils';

class Calendarweek extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {month: new Date().getMonth(), year: new Date().getFullYear() };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {}

    render() {
        const weekItems = CALENDAR_WEEKS.map((number, index) =>
            <span className="WeekName" key={index}>{number}</span>
        );
    
        return (
            <div className="CalendarWeek">
                {weekItems}
            </div>
        );
    }
}

export default Calendarweek;