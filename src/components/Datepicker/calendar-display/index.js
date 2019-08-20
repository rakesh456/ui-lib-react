

import React from "react";
import Calendarweek from "./calendar-week/index";
import Calendarmonth from "./calendar-month/index";
import Calendarbuttons from "./calendar-buttons/index";
import '../date-picker.css';

class Calendardisplay extends React.PureComponent {
    componentDidMount() {}

    componentDidUpdate(prevProps) {}

    render() {
        return (
            <div className="CalendarContainer">
                <Calendarmonth />
                <Calendarweek />
                <Calendarbuttons />
            </div>
        );
    }

}

export default Calendardisplay;