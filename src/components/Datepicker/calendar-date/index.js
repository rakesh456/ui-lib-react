import React from "react";
import Week from "./week";
import Month from "./month";
import Days from "./days";
import Buttons from "./buttons";

import '../date-picker.scss';
import {
    convertYYYYMMDD,
} from "../../../utils/utils";
import {
    currentFormatToYYYYMMDD,
    currentFormatToYYYYMMDDNew,
    isDate
} from "../../../utils/calendar";

let calendarModal = null;

class CalendarDate extends React.PureComponent {
    constructor(props) {
        super(props);

        this.datePickerOptions = this.props.options;
        
        const selectedDate = (this.props && this.props.selectedDate) ? new Date(convertYYYYMMDD(this.props.selectedDate, this.datePickerOptions)) : new Date();

        this.state = { month: selectedDate.getMonth() + 1, year: selectedDate.getFullYear() };
        this.el = document.createElement('div');
    }
    
    componentDidMount() {}

    componentDidUpdate(prevProps) {
        var { options } = this.props;

        const selectedDate1 = currentFormatToYYYYMMDDNew(this.props.selectedDate, options);
        const selectedDate2 = currentFormatToYYYYMMDDNew(prevProps.selectedDate, options);

        if(isDate(new Date(selectedDate1))){
            const _date1 = (new Date(selectedDate1));
            const _date2 = (new Date(selectedDate2));
            const _month1 = _date1.getMonth() + 1;
            const _month2 = _date2.getMonth() + 1;
            if(selectedDate1 !== selectedDate2 || _month1 !== _month2){
                this.setState({
                    month: _month1,
                    year: _date1.getFullYear()
                });
            }
        }
    }

    componentWillUnmount() {}

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
            <div className={this.getCalendarContainerClass()} style={this.props.style} tabIndex="0" onKeyDown={(e) => this.props.onKeyDown(e)}>
                <Month options={this.props.options} month={month} year={year} goToNextMonth={this.goToNextMonth} goToPrevMonth={this.goToPrevMonth} />
                <Week />
                <Days options={this.props.options} selectedDate={selectedDate} month={month} year={year} onSelect={this.onSelectHandler} />
                {
                    (showButtons === true)? 
                    <Buttons options={this.props.options} onSelectButtonClick={this.onSelectButtonClickHandler} onClearButtonClick={this.onClearButtonClickHandler} /> : ''
                }
            </div>
        );
    }
}

export default CalendarDate;