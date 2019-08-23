

import React from "react";
import DateInput from "./date-input/index";
import CalendarDisplay from "./calendar-display/index";
import './date-picker.css';

class DatePicker extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {date: new Date(), isCalendarOpen: false };
    }

    toggleCalendar = () => this.setState({ isCalendarOpen: !this.state.isCalendarOpen })

    componentDidMount() {}

    componentDidUpdate(prevProps) {
    }

    handleChange = evt => evt.preventDefault();

    onFocus = () =>  {
        this.setState({
            isCalendarOpen: !this.state.isCalendarOpen
        });
    }

    onBlur = () => {
        this.setState({
            isCalendarOpen: !this.state.isCalendarOpen
        });
    }
    
    onChange = () => {}

    changeSelectedDate = (_date) => {
        this.setState({
            date: _date
        });
    }

    render() {
        const {isCalendarOpen} = this.state;

        return (
            <div className="DatepickerContainer">
                <DateInput onFocus={ this.onFocus } onBlur={ this.onBlur } value={this.state.date} />
                {
                    isCalendarOpen && <CalendarDisplay changeSelectedDate={this.changeSelectedDate}/>
                }
            </div>
        );
    }
}

export default DatePicker;

