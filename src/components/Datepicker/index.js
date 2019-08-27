import React from "react";
import DateInput from "./date-input/index";
import CalendarDisplay from "./calendar-display/index";
import CalendarPortal from "./calendar-display/portal";
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
        this.state = { date: new Date(), shouldCalendarOpen: false };
        this.handleChildUnmount = this.handleChildUnmount.bind(this);
        this.style = {};
    }

    handleChildUnmount() {
        this.setState({ shouldCalendarOpen: false });
    }

    updateDimensions(){
        let w = window,
            d = document,
            documentElement = d.documentElement,
            body = d.getElementsByTagName('body')[0],
            width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
            height = w.innerHeight || documentElement.clientHeight || body.clientHeight;
    }

    componentDidMount() {
        document.body.addEventListener('click', this.closeCalendar);
        const dimensions = this.el.getBoundingClientRect();
        const style = {};
        style.left = dimensions.left;
        style.right = dimensions.right;
        style.top = (dimensions.top + 42);
        style.bottom = dimensions.bottom;
        this.setState({ style: style });

        window.addEventListener("resize", this.updateDimensions);
    }

    componentDidUpdate(prevProps) {
    }

    handleDateChange = date => {
        const newDate = getIsoDate(date);
        
        this.setState({ date: newDate, shouldCalendarOpen: false });
    }

    onFocus = () => {
        this.setState({
            shouldCalendarOpen: true
        });
    }

    closeCalendar = (e) => {
        if (e.target && e.target.classList && !e.target.classList.contains("Calendar-Input") && !e.target.classList.contains("Day") && !e.target.classList.contains("CalDay") && !e.target.classList.contains("NextPrevDay") && !e.target.classList.contains("Icon") && e.target.classList.length !== 0 && this.state.shouldCalendarOpen === true) {
            this.setState({
                shouldCalendarOpen: false
            });
        }
    }

    onBlur = () => {
    }

    handleChildUnmount = (_date) => {
        this.setState({
            date: _date,
            shouldCalendarOpen: false
        });
    }


    render() {
        const { shouldCalendarOpen, date } = this.state;
        return (
            <div className="DatepickerContainer">
                <div ref={(el) => this.el = el}>
                    <DateInput options={this.props.options} onFocus={this.onFocus} onBlur={this.onBlur} value={date} />
                </div>
                {
                    (shouldCalendarOpen) ?
                        <CalendarPortal parent="#parent" position="right" arrow="center">
                            <CalendarDisplay style={this.state.style} options={this.props.options} selectedDate={getDateDDMMYYYY(date)} shouldCalendarOpen={shouldCalendarOpen} changeSelectedDate={this.handleDateChange}>
                            </CalendarDisplay>
                        </CalendarPortal>
                        : ''
                }
                {/* <CalendarDisplay className={(!shouldCalendarOpen)? 'Hidden' : 'Show'} options={this.props.options} selectedDate={getDateDDMMYYYY(date)} shouldCalendarOpen={ shouldCalendarOpen } changeSelectedDate={this.handleDateChange} /> */}

            </div>
        );
    }
}

export default DatePicker;