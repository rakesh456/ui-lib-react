import React from "react";
import DateInput from "./date-input/index";
import CalendarDisplay from "./calendar-display/index";
import './date-picker.css';
import {
    getIsoDate
} from "../../utils/calendar";
import {
    getDateDDMMYYYY
} from "../../utils/utils";

class DatePicker extends React.PureComponent {
    
    constructor(props) {
        super(props);
        this.state = {date: new Date(), shouldCalendarOpen: true };
        this.handleChildUnmount = this.handleChildUnmount.bind(this);
    }
    
    toggleCalendar = () => {}
    
    componentDidMount() {
    }
    
    componentDidUpdate(prevProps) {
    }

    handleChange = evt => evt.preventDefault();

    handleDateChange = date => {
        const newDate = getIsoDate(date);
        this.setState({ date: newDate, shouldCalendarOpen: false });
	}

    onFocus = () =>  {
        this.setState({
            shouldCalendarOpen: true    
        });
    }

    onBlur = () => {
        // if(newDate === currentDate){
        //     this.setState({
        //         shouldCalendarOpen: !this.state.shouldCalendarOpen
        //     });
        // }
    }
    
    onChange = () => {}

    handleChildUnmount = (_date) => {
        this.setState({
            date: _date,
            shouldCalendarOpen: false
        });
    }

    render() {
        const {shouldCalendarOpen, date} = this.state;

        return (
            <div className="DatepickerContainer">
                <DateInput options={this.props.options} onFocus={ this.onFocus } onBlur={ this.onBlur } value={date} />
                {/* <Dropdown isOpen={shouldCalendarOpen} toggle={this.toggleCalendar}> */}
                    {(shouldCalendarOpen)? <CalendarDisplay options={this.props.options} selectedDate={getDateDDMMYYYY(date)} shouldCalendarOpen={ shouldCalendarOpen } changeSelectedDate={this.handleDateChange} /> : '' }
                {/* </Dropdown> */}
            </div>
        );
    }
}

export default DatePicker;