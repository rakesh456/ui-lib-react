import React from "react";
import CalendarWeek from "./calendar-week/index";
import CalendarMonth from "./calendar-month/index";
import CalendarDays from "./calendar-days/index";

import '../date-picker.css';
import {
    convertYYYYMMDD
} from "../../../utils/utils";


let modalRoot = null;

class CalendarDisplay extends React.PureComponent {
    constructor(props) {
        super(props);
        const selectedDate = (this.props && this.props.selectedDate) ? new Date(convertYYYYMMDD(this.props.selectedDate)) : new Date();
        this.state = { month: selectedDate.getMonth() + 1, year: selectedDate.getFullYear() };
        this.el = document.createElement('div');
    }
    
    componentDidMount() {
        modalRoot = document.getElementById('modalroot');
        modalRoot.appendChild(this.el);
    }

    componentDidUpdate(prevProps) {
    }

    componentWillUnmount() {
        modalRoot = document.getElementById('modalroot');
        modalRoot.removeChild(this.el);
    }

    changeSelectedDate = (_date) => {
        this.props.changeSelectedDate(_date);
    }

    goToPrevMonth = () => {
        if (this.state.month === 1) {
            this.setState({
                month: 12,
                year: (this.state.year - 1)
            });
        } else {
            this.setState({
                month: (this.state.month - 1)
            });
        }
    }

    goToNextMonth = () => {
        if (this.state.month === 12) {
            this.setState({
                month: 1,
                year: (this.state.year + 1)
            });
        } else {
            this.setState({
                month: (this.state.month + 1)
            });
        }
    }

    render() {
        const { month, year } = this.state;
        const { selectedDate } = this.props;
        if (!this.props.shouldCalendarOpen) {
            return null;
        }

        return (
            <div className="VS-CalendarContainer VS-shape-rounded-fill VS-modal" style={this.props.style}>
                <CalendarMonth month={month} year={year} goToNextMonth={this.goToNextMonth} goToPrevMonth={this.goToPrevMonth} />
                <CalendarWeek />
                <CalendarDays options={this.props.options} selectedDate={selectedDate} month={month} year={year} changeSelectedDate={this.changeSelectedDate} />
            </div>
        );
    }
}

export default CalendarDisplay;