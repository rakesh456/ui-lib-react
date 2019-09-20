import React from "react";
import { Input } from 'reactstrap';
import CalendarDisplay from "./calendar-display/index";
import CalendarYear from "./calendar-year";
import CalendarPortal from "./calendar-display/portal";
import { FaCalendar, FaClose } from 'react-icons/lib/fa';
import './date-picker.scss';
import {
    isCalendarFormat,
    isYearFormat
} from "../../utils/calendar";
import {
    isValidFormattedDate,
    getCurrentYear,
    getDateByFormatDDMMYYYY
} from "../../utils/utils";

class DatePicker extends React.PureComponent {

    constructor(props) {
        super(props);
        const datePickerOptions = this.props.options;
        const displayFormat = (datePickerOptions)? datePickerOptions.displayFormat : '';
        this.state = { selectedDate: getDateByFormatDDMMYYYY(new Date(), displayFormat), shouldCalendarOpen: false, isInvalidDate: false, selectedYear: "", isValidChar: false, isCalendar: isCalendarFormat(datePickerOptions.displayFormat), isYear: isYearFormat(datePickerOptions.displayFormat) };
        this.handleChildUnmount = this.handleChildUnmount.bind(this);
    }

    setDateValue(dt) {
        this.setState({ selectedDate: dt });
    }
    
    handleChildUnmount() {
        // this.setState({ shouldCalendarOpen: false });
    }

    updateDimensions() {
        // var w = window,
        //     d = document,
        //     documentElement = d.documentElement,
        //     body = d.getElementsByTagName('body')[0],
        //     width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
        //     height = w.innerHeight || documentElement.clientHeight || body.clientHeight;
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
        const { displayFormat, showButtons } = this.props.options;
        const newDate = getDateByFormatDDMMYYYY(date, displayFormat);
        if(showButtons === true){
            this.setState({ selectedDate: newDate, shouldCalendarOpen: true });
        } else {
            this.setState({ selectedDate: newDate, shouldCalendarOpen: false });
            this.props.onSelect(newDate);
        }
    }
   
    onYearSelectHandler = year => {
        const { showButtons } = this.props.options;
        if(showButtons === true){
            this.setState({ selectedYear: year, shouldCalendarOpen: true });
        } else {
            this.setState({ selectedYear: year, shouldCalendarOpen: false });
            this.props.onYearSelect(year);
        }
    }
    
    onSelectButtonClickHandler = () => {
        this.setState({ shouldCalendarOpen: false });
        this.props.onSelect(this.state.selectedDate);
    }
    
    onClearButtonClickHandler = () => {
        this.setState({ selectedDate: "", shouldCalendarOpen: false });
    }

    onFocus = () => {
        this.setState({
            shouldCalendarOpen: true
        });
        this.props.onFocus();
    }
    
    onBlur = () => {
        // let { manualEntry } = this.props.options;
        // let { selectedDate, shouldCalendarOpen } = this.state;
        // console.log(' shouldCalendarOpen ', shouldCalendarOpen);
        // if(manualEntry === true){
        //     if(isValidFormattedDate(selectedDate, this.props.options)){
        //         const { showButtons } = this.props.options;
        //         if(!showButtons){
        //             this.setState({ selectedDate: selectedDate});
        //         }
        //         this.onSelectButtonClickHandler();
        //         this.setState({ isInvalidDate: false, shouldCalendarOpen: true });
        //     } else {
        //         this.setState({ isInvalidDate: true });
        //     }
        // }
        this.props.onBlur();
    }
    
    onKeyPressHandler = (evt) => {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        
        if ((charCode > 31 && (charCode < 45 || charCode > 57))) {
            evt.preventDefault();;
        } 
    }
    
    onChangeHandler(name, e) {
        // var change = {};
        // change[name] = e.target.value;
        // this.setState(change);
        const manualEntry = (this.props.options && this.props.options.manualEntry === true);
        if(manualEntry == true){
            this.setState({
                selectedDate: e.target.value
            });
        }
    }

    closeCalendar = (e) => {
        if (((e.target && e.target.classList && !e.target.classList.contains("VS-Calendar-Input") && !e.target.classList.contains("VS-Day") && !e.target.classList.contains("VS-CalDay") && !e.target.classList.contains("VS-NextPrevDay") && !e.target.classList.contains("VS-Icon") && !e.target.classList.contains("VS-CalendarMonth") && this.state.shouldCalendarOpen === true)) && (e.target.nodeName !== 'path')) {
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

    getIconAlignClass() {
        const options = this.props.options;
        return (options && options.iconAlignment === 'Left') ? 'VS-PullLeft VS-MrgT5' : 'VS-PullRight VS-MrgT5';
    }

    getDateAlignClass() {
        const options = this.props.options;
        return (options && options.dateStringAlignment === 'Right') ? 'VS-PullRight VS-TextRight' : 'VS-PullLeft VS-TextLeft';
    }
    
    getInvalidClass() {
        const { isInvalidDate } = this.state;
        return (isInvalidDate === true) ? 'VS-Invalid-Input' : '';
    }

    getPlaceholder(){
        const options = this.props.options;
        return (this.state.isYear)? "YYYY" : options.displayFormat;
    }

    getSelectedValue(){
        const options = this.props.options;
        return (this.state.isYear)? this.state.selectedYear : this.state.selectedDate;
    }


    render() {
        const { shouldCalendarOpen, selectedDate, isInvalidDate, isCalendar, isYear } = this.state;
        const options = this.props.options;
        const isDisabled = (options && options.isDisabled === true);
        const showClearIcon = (options && options.showClearIcon === true);
        const manualEntry = (options && options.manualEntry === true);

        return (
            <div className="VS-App">
                <div id="modalroot"></div>
                <header className="VS-App-header">
                    <div className="VS-DatepickerContainer">
                        <div ref={(el) => this.el = el}>
                            <div className={`VS-Input-Border ${this.getInvalidClass()} ${(isDisabled) ? 'VS-Disabled' : ''}`}>
                                <span className={this.getIconAlignClass()}><FaCalendar className="VS-Shape VS-TextDark VS-CalenderIcon" /></span>
                                <Input type="text"
                                    value={this.getSelectedValue()}
                                    className={`VS-Regular-UPPER-Case VS-Calendar-Input ${this.getDateAlignClass()}`}
                                    placeholder={this.getPlaceholder()}
                                    onFocus={this.onFocus}
                                    onBlur={this.onBlur}
                                    onKeyPress={this.onKeyPressHandler.bind(this)}
                                    onChange={this.onChangeHandler.bind(this, selectedDate)}
                                />
                                {
                                    (showClearIcon === true)?
                                    <span className="VS-PullRight VS-MrgT5"><FaClose className="VS-Shape VS-TextDark VS-CalenderIcon VS-CloseIcon" onClick={() => this.onClearButtonClickHandler()} /></span> : ''
                                }
                            </div>
                        </div>
                        {
                            (shouldCalendarOpen) ?
                                <CalendarPortal parent="#parent" position="right" arrow="center">
                                    {
                                        (isCalendar)?
                                        <CalendarDisplay style={this.state.style} options={options} selectedDate={selectedDate} shouldCalendarOpen={shouldCalendarOpen} onSelect={this.onSelectHandler} onSelectButtonClick={this.onSelectButtonClickHandler} onClearButtonClick={this.onClearButtonClickHandler}>
                                        </CalendarDisplay>  : ''
                                    }

                                    {
                                        (isYear)? <CalendarYear style={this.state.style} options={options} onYearSelect={this.onYearSelectHandler}></CalendarYear> : ''
                                    }
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