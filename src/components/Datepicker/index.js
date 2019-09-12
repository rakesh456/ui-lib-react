import React from "react";
import DateInput from "./date-input/index";
import { Input } from 'reactstrap';
import CalendarDisplay from "./calendar-display/index";
import CalendarPortal from "./calendar-display/portal";
import { FaCalendar } from 'react-icons/lib/fa';
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
        this.datePickerOptions = this.props.options;
        this.displayFormat = (this.datePickerOptions)? this.datePickerOptions.displayFormat : '';
        this.state = { selectedDate: getDateByFormatDDMMYYYY(new Date(), this.displayFormat), shouldCalendarOpen: false };
        this.handleChildUnmount = this.handleChildUnmount.bind(this);
        this.style = {};
    }

    setDateValue(dt) {
        this.setState({ selectedDate: dt });
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

    onSelectHandler = date => {
        const options=this.props.options;
        const newDate = getDateByFormatDDMMYYYY(date, options.displayFormat);
        this.setState({ selectedDate: newDate, shouldCalendarOpen: false });
        this.props.onSelect(newDate);
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
            selectedDate: _date,
            shouldCalendarOpen: false
        });
    }

    handleChange(name, e) {
        var change = {};
        change[name] = e.target.value;
        this.setState(change);
    }

    getIconAlignClass() {
        const options = this.props.options;
        return (options && options.iconAlignment === 'Left') ? 'VS-PullLeft VS-MrgT5' : 'VS-PullRight VS-MrgT5';
    }

    getDateAlignClass() {
        const options = this.props.options;
        return (options && options.dateStringAlignment === 'Right') ? 'VS-PullRight VS-TextRight' : 'VS-PullLeft VS-TextLeft';
    }

    render() {
        const { shouldCalendarOpen, selectedDate } = this.state;
        const disable = (this.props.options && this.props.options.disable === true);
        return (
            <div className="VS-App">
                <div id="modalroot"></div>
                <header className="VS-App-header">
                    <div className="VS-DatepickerContainer">
                        <div ref={(el) => this.el = el}>

                            <div className={`VS-Input-Border ${(disable) ? 'VS-Disabled' : ''}`}>
                                <span className={this.getIconAlignClass()}><FaCalendar className="VS-Shape VS-TextDark VS-CalenderIcon" /></span>
                                <Input type="text"
                                    disabled={disable}
                                    value={selectedDate}
                                    className={`VS-Regular-UPPER-Case VS-Calendar-Input ${this.getDateAlignClass()}`}
                                    placeholder="MM/DD/YYYY"
                                    onFocus={this.onFocus}
                                    onBlur={this.props.onBlur}
                                    onChange={this.handleChange.bind(this, selectedDate)}
                                />
                            </div>
                        </div>
                        {
                            (shouldCalendarOpen) ?
                                <CalendarPortal parent="#parent" position="right" arrow="center">
                                    <CalendarDisplay style={this.state.style} options={this.props.options} selectedDate={selectedDate} shouldCalendarOpen={shouldCalendarOpen} onSelect={this.onSelectHandler}>
                                    </CalendarDisplay>
                                </CalendarPortal>
                                : ''
                        }

                    </div>
                </header>
            </div>
        );
    }
}

export default DatePicker;