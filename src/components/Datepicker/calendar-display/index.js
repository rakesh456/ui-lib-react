

import React from "react";
import CalendarWeek from "./calendar-week/index";
import CalendarMonth from "./calendar-month/index";
import CalendarDays from "./calendar-days/index";
// import CalendarButtons from "./calendar-buttons/index";
import '../date-picker.css';

class CalendarDisplay extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {month: new Date().getMonth() + 1, year: new Date().getFullYear()};
    }
    
    componentDidMount() {}

    componentDidUpdate(prevProps) {}

    changeSelectedDate = (_date) => {
        this.props.changeSelectedDate(_date);
    }
    
    goToPrevMonth = () => {
        this.setState({
            month: (this.state.month - 1)
        });
    }
    
    goToNextMonth = () => {
        this.setState({
            month: (this.state.month + 1)
        });
    }

    render() {
        const { month, year } = this.state;
        const { selectedDate } = this.props;
        return (
            <div className="CalendarContainer shape-rounded-fill">
                <CalendarMonth month={month} year={year} goToNextMonth={ this.goToNextMonth } goToPrevMonth={ this.goToPrevMonth } />
                <CalendarWeek />
                <CalendarDays selectedDate={selectedDate} month={month} year={year} changeSelectedDate={this.changeSelectedDate} />
                {/* <CalendarButtons /> */}
            </div>
        );
    }

}

export default CalendarDisplay;