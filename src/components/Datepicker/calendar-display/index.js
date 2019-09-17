import React from "react";
import CalendarWeek from "./calendar-week/index";
import CalendarMonth from "./calendar-month/index";
import CalendarDays from "./calendar-days/index";
import CalendarButtons from "./calendar-buttons/index";

import '../date-picker.css';
import {
    convertYYYYMMDD
} from "../../../utils/utils";


let calendarModal = null;

class CalendarDisplay extends React.PureComponent {
    constructor(props) {
        super(props);

        this.datePickerOptions = this.props.options;
        
        const selectedDate = (this.props && this.props.selectedDate) ? new Date(convertYYYYMMDD(this.props.selectedDate, this.datePickerOptions)) : new Date();

        this.state = { month: selectedDate.getMonth() + 1, year: selectedDate.getFullYear() };
        this.el = document.createElement('div');
    }
    
    componentDidMount() {
        calendarModal = document.getElementById('modalroot');
        calendarModal.appendChild(this.el);
    }

    componentDidUpdate(prevProps) {
    }

    componentWillUnmount() {
        calendarModal = document.getElementById('modalroot');
        calendarModal.removeChild(this.el);
    }

    onSelectHandler = (_date) => {
        this.props.onSelect(_date);
    }
   
    onSelectButtonClickHandler = () => {
        this.props.onSelectButtonClick();
    }
    
    onClearButtonClickHandler = () => {
        this.props.onClearButtonClick();
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

    getCalendarContainerClass = () => {
        const { showButtons } = this.props.options;
        return "VS-CalendarContainer VS-modal " + ((showButtons && showButtons === true)? "VS-shape-rounded-fill-with-button" : "VS-shape-rounded-fill");
    }

    render() {
        const { month, year } = this.state;
        const { selectedDate } = this.props;
        if (!this.props.shouldCalendarOpen) {
            return null;
        }

        const { showButtons } = this.props.options;
      

        return (
            <div className={this.getCalendarContainerClass()} style={this.props.style}>
                <CalendarMonth month={month} year={year} goToNextMonth={this.goToNextMonth} goToPrevMonth={this.goToPrevMonth} />
                <CalendarWeek />
                <CalendarDays options={this.props.options} selectedDate={selectedDate} month={month} year={year} onSelect={this.onSelectHandler} />
                {
                    (showButtons === true)? 
                    <CalendarButtons onSelectButtonClick={this.onSelectButtonClickHandler} onClearButtonClick={this.onClearButtonClickHandler} /> : ''
                }
            </div>
        );
    }
}

export default CalendarDisplay;