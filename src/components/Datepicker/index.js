import React from "react";
import { Input } from 'reactstrap';
import CalendarDate from "./calendar-date/index";
import Year from "./calendar-other/year";
import CalendarPortal from "./portal";
import { FaCalendar, FaClose } from 'react-icons/lib/fa';
import './date-picker.scss';
import * as CONSTANTS from '../../utils/constants'
import {
    isCalendarFormat,
    isYearFormat,
    isValidMMYYYYValue,
    isValidYYYYValue,
    isValidQQYYYYValue,
    isValidOutsideRangeDate,
    isValidOutsideRangeDateMonthYear,
    isValidOutsideRangeDateYear,
    isValidOutsideRangeDateQQYear,
    getProperFormattedDate,
    getInvalidDateMessage,
    getNewUpdateDateByArrow,
    getDefaultQQMMYYYYDateByFormat,
    isValidFormattedDate,
    isQQYYYYFormat,
    isMMYYYYFormat,
    checkAllowedChars,
    isLeft,
    isRight
} from "../../utils/calendar";
import {
    getDateByFormat,
    guid,
    ARROW_KEYS,
    ARROWS,
    isValidDate
} from "../../utils/utils";

class DatePicker extends React.PureComponent {

    constructor(props) {
        super(props);
        const datePickerOptions = this.props.options;
        const displayFormat = (datePickerOptions)? datePickerOptions.displayFormat : '';

        const _date = this.getDefaultDate();

        this.state = { selectedDate: getDateByFormat(_date, displayFormat), shouldCalendarOpen: false, isInvalidDate: false, isInvalidRangeDate: false, selectedYear: getDefaultQQMMYYYYDateByFormat(datePickerOptions), newSelectedYear: "", isValidChar: false, isCalendar: isCalendarFormat(datePickerOptions.displayFormat), isMonthYear: isYearFormat(datePickerOptions.displayFormat), allowedNextChar: true };
        this.handleChildUnmount = this.handleChildUnmount.bind(this);
    }

    setDateValue(dt, isInvalidDate, isInvalidRangeDate) {
        const options = this.props.options;
        if(isCalendarFormat(options.displayFormat)){
            this.setState({ selectedDate: dt, isInvalidDate: isInvalidDate, isInvalidRangeDate: isInvalidRangeDate });
        } else if(isYearFormat(options.displayFormat)){
            this.setState({ selectedYear: dt, isInvalidDate: isInvalidDate, isInvalidRangeDate: isInvalidRangeDate });
        }
    }
    
    handleChildUnmount() {}

    getDefaultDate(){
        const options = this.props.options;
        var _lowerDate = getProperFormattedDate(options.lowerLimit, options);
        var _upperLimit = getProperFormattedDate(options.upperLimit, options);
        var _date = (_lowerDate >= new Date())? _lowerDate : new Date();
        _date = (_upperLimit <= new Date())? _lowerDate : _date;
        return _date;
    }

    updateDimensions() {}

    componentDidMount() {
        document.addEventListener('click', this.closeCalendar);
        const dimensions = this.el.getBoundingClientRect();
        const style = {};
        style.left = '0px';
        style.right = dimensions.right;
        style.top = '100%';
        style.zIndex = '1';
        this.setState({ style: style });

        window.addEventListener("resize", this.updateDimensions);
    }

    onSelectHandler = date => {
        const { displayFormat, showButtons } = this.props.options;
        const newDate = getDateByFormat(date, displayFormat);
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
            this.setState({ selectedYear: year, newSelectedYear: year, shouldCalendarOpen: true });
        } else {
            this.setState({ selectedYear: year, newSelectedYear: year, shouldCalendarOpen: false });
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
        const _selectedDate = (isValidFormattedDate(this.state.selectedDate, this.props.options))? this.state.selectedDate : "";
        const { displayFormat } = this.props.options;
        const _date = this.getDefaultDate();

        this.setState({
            shouldCalendarOpen: true,
            newSelectedYear: "",
            selectedDate: (this.state.isInvalidRangeDate || this.state.isInvalidDate)? getDateByFormat(_date, displayFormat) : _selectedDate,
            selectedYear: (this.state.isInvalidDate)? "" : this.state.selectedYear
        });

        this.props.onFocus();
    }
    
    onBlur = () => {
        let { manualEntry, showButtons, displayFormat } = this.props.options;

        if(manualEntry === true){
            if(this.state.isMonthYear){
                const { selectedYear } = this.state;
                if(isQQYYYYFormat(displayFormat)){
                    var _upperYear = selectedYear.toUpperCase();
                    var _validFormatQQYear = isValidQQYYYYValue(_upperYear); 
                    if(_validFormatQQYear){
                        var _validQQYear = isValidOutsideRangeDateQQYear(_upperYear, this.props.options); 
                        if(_validQQYear){
                            if(!showButtons){
                                this.setState({ selectedYear: _upperYear});
                            }
                            this.props.onSelect(_upperYear);
                            this.setState({ isInvalidDate: false, isInvalidRangeDate: false });
                        } else {
                            this.setState({ isInvalidDate: true, isInvalidRangeDate: true });
                        }
                    } else {
                        this.setState({ isInvalidDate: true, isInvalidRangeDate: false });
                    }
                } else if(isMMYYYYFormat(displayFormat)) {
                    if(isValidMMYYYYValue(selectedYear)){
                        var _validMonthYear = isValidOutsideRangeDateMonthYear(selectedYear, this.props.options);  
                        if(_validMonthYear){
                            if(!showButtons){
                                this.setState({ selectedYear: selectedYear});
                            }
                            this.props.onSelect(selectedYear);
                            this.setState({ isInvalidDate: false, isInvalidRangeDate: false });
                        } else {
                            this.setState({ isInvalidDate: true, isInvalidRangeDate: true });
                        }
                    } else {
                        this.setState({ isInvalidDate: true, isInvalidRangeDate: false });
                    }
                } else {
                    if(isValidYYYYValue(selectedYear)){
                        var _validDateYear = isValidOutsideRangeDateYear(selectedYear, this.props.options);  
                        if(_validDateYear){
                            if(!showButtons){
                                this.setState({ selectedYear: selectedYear});
                            }
                            this.props.onSelect(selectedYear);
                            this.setState({ isInvalidDate: false, isInvalidRangeDate: false });
                        } else {
                            this.setState({ isInvalidDate: true, isInvalidRangeDate: true });
                        }
                    } else {
                        this.setState({ isInvalidDate: true, isInvalidRangeDate: false });
                    }
                }
            } else {
                var _validFormat = isValidFormattedDate(this.state.selectedDate, this.props.options); 
                if(_validFormat){
                    var _validOutRange = isValidOutsideRangeDate(this.state.selectedDate, this.props.options);
                    if(_validOutRange){
                        if(!showButtons){
                            this.setState({ selectedDate: this.state.selectedDate});
                        }
                        this.setState({ isInvalidDate: false, isInvalidRangeDate: false });
                        this.props.onSelect(this.state.selectedDate);
                    } else {
                        this.setState({ isInvalidDate: true, isInvalidRangeDate: true });
                    }
                } else {
                    this.setState({ isInvalidDate: true, isInvalidRangeDate: false });
                    this.setState({ selectedDate: ""});
                }
            }
        }
        this.setState({ shouldCalendarOpen: false});
        this.props.onBlur();
    }
    
    onKeyDownHandler = (evt) => {
        if(!this.state.isMonthYear && this.state.shouldCalendarOpen){
            evt = (evt) ? evt : window.event;
            const charCode = (evt.which) ? evt.which : evt.keyCode;
            const { options } = this.props;
            var { displayFormat, lowerLimit, upperLimit } = options;
    
            lowerLimit = (lowerLimit)? ((isValidDate(lowerLimit))? lowerLimit : null) : null;
            upperLimit = (upperLimit)? ((isValidDate(upperLimit))? upperLimit : null) : null;
    
            if (evt.ctrlKey || evt.metaKey) {
                switch (evt.keyCode) {
                    case ARROWS.left:{
                        const updatedDate = getNewUpdateDateByArrow(this.state.selectedDate, false, options, displayFormat, lowerLimit, upperLimit, ARROWS.left, true, false);
                        this.setState({ selectedDate: updatedDate });
                        this.props.onSelect(updatedDate);
                        break;
                    }
                    case ARROWS.right:{
                        const updatedDate = getNewUpdateDateByArrow(this.state.selectedDate, false, options, displayFormat, lowerLimit, upperLimit, ARROWS.right, true, false);
                        this.setState({ selectedDate: updatedDate });
                        this.props.onSelect(updatedDate);
                        break;
                    }
                    case ARROWS.up:{
                        const updatedDate = getNewUpdateDateByArrow(this.state.selectedDate, false, options, displayFormat, lowerLimit, upperLimit, ARROWS.up, true, false);
                        this.setState({ selectedDate: updatedDate });
                        this.props.onSelect(updatedDate);
                        break;
                    }
                    case ARROWS.down:{
                        const updatedDate = getNewUpdateDateByArrow(this.state.selectedDate, false, options, displayFormat, lowerLimit, upperLimit, ARROWS.down, true, false);
                        this.setState({ selectedDate: updatedDate });
                        this.props.onSelect(updatedDate);
                        break;
                    }
                    default: {
                        break;
                    }
                }
                
            } else if (evt.shiftKey) {
                switch (evt.keyCode) {
                    case ARROWS.left:{
                        const updatedDate = getNewUpdateDateByArrow(this.state.selectedDate, false, options, displayFormat, lowerLimit, upperLimit, ARROWS.left, false, true);
                        this.setState({ selectedDate: updatedDate });
                        this.props.onSelect(updatedDate);
                        break;
                    }
                    case ARROWS.right:{
                        const updatedDate = getNewUpdateDateByArrow(this.state.selectedDate, false, options, displayFormat, lowerLimit, upperLimit, ARROWS.right, false, true);
                        this.setState({ selectedDate: updatedDate });
                        this.props.onSelect(updatedDate);
                        break;
                    }
                    case ARROWS.up:{
                        const updatedDate = getNewUpdateDateByArrow(this.state.selectedDate, false, options, displayFormat, lowerLimit, upperLimit, ARROWS.up, false, true);
                        this.setState({ selectedDate: updatedDate });
                        this.props.onSelect(updatedDate);
                        break;
                    }
                    case ARROWS.down:{
                        const updatedDate = getNewUpdateDateByArrow(this.state.selectedDate, false, options, displayFormat, lowerLimit, upperLimit, ARROWS.down, false, true);
                        this.setState({ selectedDate: updatedDate });
                        this.props.onSelect(updatedDate);
                        break;
                    }
                    default: {
                        break;
                    }
                }
            } else {
                if(charCode === CONSTANTS.KEY_CODES.ESCAPE_KEY){
                    this.setState({ shouldCalendarOpen: false });
                }
        
                if(ARROW_KEYS.indexOf(charCode) !== -1){
                    const updatedDate = getNewUpdateDateByArrow(this.state.selectedDate, false, options, displayFormat, lowerLimit, upperLimit, charCode, false, false);
                    
                    this.setState({ selectedDate: updatedDate });
                    this.props.onSelect(updatedDate);
                }
            }
        }
    }
    
    onKeyPressHandler = (evt) => {
        const { displayFormat } = this.props.options;
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
       
        if ((charCode >= CONSTANTS.KEY_CODES.SPACE && (charCode <= CONSTANTS.KEY_CODES.COMMA || charCode > CONSTANTS.KEY_CODES.NINE)) && (!isQQYYYYFormat(displayFormat))) {
            evt.preventDefault();
        }
    }

    onChangeHandler(name, e) {
        const manualEntry = (this.props.options && this.props.options.manualEntry === true);
        const { displayFormat } = this.props.options;

        if(manualEntry === true && checkAllowedChars(displayFormat, e.target.value)){
            this.setState({
                selectedDate: e.target.value,
                selectedYear: e.target.value,
                shouldCalendarOpen: false
            });
        }
    }

    closeCalendar = (e) => {
        const { displayFormat } = this.props.options;

        var shouldCalendarOpen = (isMMYYYYFormat(displayFormat) || isQQYYYYFormat(displayFormat));

        if(isValidMMYYYYValue(this.state.newSelectedYear) || (e.target.classList.length <= 0)){
            shouldCalendarOpen = false;
        }

        if (((e.target && e.target.classList && !e.target.classList.contains("VS-Calendar-Input") && !e.target.classList.contains("VS-Day") && !e.target.classList.contains("VS-CalDay") && !e.target.classList.contains("VS-NextPrevDay") && !e.target.classList.contains("VS-Icon") && !e.target.classList.contains("VS-CalendarMonth") && this.state.shouldCalendarOpen === true)) && (e.target.nodeName !== 'path')) {
            if(e.target.classList.contains("VS-App-header")){
                this.setState({
                    shouldCalendarOpen: false
                });
            } else {
                this.setState({
                    shouldCalendarOpen: shouldCalendarOpen
                });
            }
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
        return (options && isLeft(options.iconAlignment)) ? 'VS-PullLeft VS-MrgT5' : 'VS-PullRight VS-MrgT5';
    }

    getDateAlignClass() {
        const options = this.props.options;
        return (options && isRight(options.dateStringAlignment)) ? 'VS-PullRight1 VS-TextRight' : 'VS-PullLeft1 VS-TextLeft';
    }
    
    getInvalidClass() {
        const { isInvalidDate } = this.state;
        return (isInvalidDate === true) ? 'VS-Invalid-Input' : '';
    }

    getPlaceholder(){
        const options = this.props.options;
        return (this.state.isMonthYear)? options.displayFormat : options.displayFormat;
    }

    getSelectedValue(){
        return (this.state.isMonthYear)? this.state.selectedYear : this.state.selectedDate;
    }

    render() {
        const { shouldCalendarOpen, selectedDate, isInvalidDate, isInvalidRangeDate, isCalendar, isMonthYear, selectedYear } = this.state;
        const { options } = this.props;
        const isDisabled = (options && options.isDisabled === true);
        const showClearIcon = (options && options.showClearIcon === true);
        const showErrorMessage = (options && options.showErrorMessage === true);
        const _uuid = guid();

        return (
            <div className="VS-App">
                <div id={`${_uuid}`}></div>
                <header className="VS-App-header">
                    <div className="VS-DatepickerContainer" >
                        <div ref={(el) => this.el = el}>
                            <div className={`VS-Input-Border ${this.getInvalidClass()} ${(showClearIcon) ? 'VS-Input-Icon' : ''} ${(isDisabled) ? 'VS-Disabled' : ''}`}>
                                <span className={this.getIconAlignClass()}><FaCalendar className="VS-Shape VS-TextDark" /></span>
                                <Input type="text"
                                    value={this.getSelectedValue()}
                                    className={`VS-Regular-UPPER-Case VS-Calendar-Input ${this.getDateAlignClass()}`}
                                    placeholder={this.getPlaceholder()}
                                    onClick={this.onFocus}
                                    onBlur={this.onBlur}
                                    onKeyDown={(e) => this.onKeyDownHandler(e)}
                                    onKeyPress={this.onKeyPressHandler.bind(this)}                                    
                                    onChange={this.onChangeHandler.bind(this, selectedDate)}
                                />
                                {
                                    (showClearIcon === true)?
                                    <span className="VS-PullRight VS-MrgT5"><FaClose className="VS-Shape VS-TextDark VS-CloseIcon" onClick={() => this.onClearButtonClickHandler()} /></span> : ''
                                }
                                {
                                    ((isInvalidDate === true || isInvalidRangeDate === true) && showErrorMessage === true)?
                                    <span className="VS-InvalidText">{getInvalidDateMessage(options.validationMessages, isInvalidRangeDate)}</span> : ''
                                }
                            </div>
                        </div>
                        {
                            (shouldCalendarOpen) ?
                                <CalendarPortal parent="#parent" position="right" arrow="center" uuid={_uuid}>
                                    {
                                        (isCalendar)?
                                        <CalendarDate style={this.state.style} options={options} onKeyDown={this.onKeyDownHandler} selectedDate={selectedDate} shouldCalendarOpen={shouldCalendarOpen} onSelect={this.onSelectHandler} onSelectButtonClick={this.onSelectButtonClickHandler} onClearButtonClick={this.onClearButtonClickHandler}>
                                        </CalendarDate>  : ''
                                    }

                                    {
                                        (isMonthYear)? <Year style={this.state.style} options={options} onYearSelect={this.onYearSelectHandler} selectedValue={selectedYear}></Year> : ''
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