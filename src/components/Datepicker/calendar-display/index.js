import React from "react";
import CalendarWeek from "./calendar-week";
import CalendarMonth from "./calendar-month";
import CalendarDays from "./calendar-days";
import CalendarButtons from "./calendar-buttons";

import '../date-picker.scss';
import {
    convertYYYYMMDD,
} from "../../../utils/utils";
import {
    isDate
} from "../../../utils/calendar";
import { setTimeout } from "timers";


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
        // calendarModal = document.getElementById('modalroot');
        // calendarModal.appendChild(this.el);
    }

    componentDidUpdate(prevProps) {
        const selectedDate = (this.props && this.props.selectedDate) ? new Date(convertYYYYMMDD(this.props.selectedDate, this.datePickerOptions)) : new Date();

        if(isDate(selectedDate)){
            console.log(' this.state.month ', this.state.month, selectedDate.getMonth());
            //if(selectedDate.getMonth() === this.state.month){
                this.setState({
                    month: selectedDate.getMonth() + 1,
                    year: selectedDate.getFullYear()
                });
            //}
        }
    }

    componentWillUnmount() {
        if(calendarModal){
            // calendarModal.removeChild(this.el);
        }
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
        const { showButtons } = this.props.options;
        if (!this.props.shouldCalendarOpen) {
            return null;
        }
      

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