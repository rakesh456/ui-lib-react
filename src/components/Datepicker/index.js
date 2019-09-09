import React from "react";
import DateInput from "./date-input/index";
import CalendarDisplay from "./calendar-display/index";
import CalendarPortal from "./calendar-display/portal";
import './date-picker.css';
import {
    getIsoDate
} from "../../utils/calendar";
import {
    getDateDDMMYYYY, getDateByFormatDDMMYYYY
} from "../../utils/utils";

class DatePicker extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = { date: new Date(), shouldCalendarOpen: false };
        this.handleChildUnmount = this.handleChildUnmount.bind(this);
        this.style = {};
    }

    setDateValue(dt) {
        this.setState({ date: dt });
    }
    
    handleChildUnmount() {
        this.setState({ shouldCalendarOpen: false });
    }

    updateDimensions() {
        var w = window,
            d = document,
            documentElement = d.documentElement,
            body = d.getElementsByTagName('body')[0],
            width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
            height = w.innerHeight || documentElement.clientHeight || body.clientHeight;
    }

    componentDidMount() {

        document.addEventListener('click', this.closeCalendar);
        const dimensions = this.el.getBoundingClientRect();
        const style = {};
        style.left = dimensions.left;
        style.right = dimensions.right;
        style.top = (dimensions.top + 42);
        style.bottom = dimensions.bottom;
        this.setState({ style: style });

        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillReceiveProps(nextProps) {
    }

    handleDateChange = date => {
        const options=this.props.options;
        const newDate = getDateByFormatDDMMYYYY(date, options.displayFormat);
        this.setState({ date: newDate, shouldCalendarOpen: false });
        this.props.changeSelectedDate(newDate);
    }

    onFocus = () => {
        this.setState({
            shouldCalendarOpen: true
        });
    }

    closeCalendar = (e) => {
        if ((e.target && e.target.classList && !e.target.classList.contains("VS-Calendar-Input") && !e.target.classList.contains("VS-Day") && !e.target.classList.contains("VS-CalDay") && !e.target.classList.contains("VS-NextPrevDay") && !e.target.classList.contains("VS-Icon") && !e.target.classList.contains("VS-CalendarMonth") && this.state.shouldCalendarOpen === true) && (e.target.classList.length !== 0)) {
            this.setState({
                shouldCalendarOpen: false
            });
        }
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
            <div className="VS-App">
                <div id="modalroot"></div>
                <header className="VS-App-header">
                    <div className="VS-DatepickerContainer">
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
                        {/* <CalendarDisplay className={(!shouldCalendarOpen)? 'VS-Hidden' : 'VS-Show'} options={this.props.options} selectedDate={getDateDDMMYYYY(date)} shouldCalendarOpen={ shouldCalendarOpen } changeSelectedDate={this.handleDateChange} /> */}

                    </div>
                </header>
            </div>
        );
    }
}

export default DatePicker;