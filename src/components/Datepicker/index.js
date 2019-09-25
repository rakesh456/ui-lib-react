import React from "react";
import { Input } from 'reactstrap';
import CalendarDisplay from "./calendar-display/index";
import CalendarYear from "./calendar-year/calendar-year";
import CalendarPortal from "./portal";
import { FaCalendar, FaClose } from 'react-icons/lib/fa';
import './date-picker.scss';
import {
    isCalendarFormat,
    isYearFormat,
    isValidMonthYearValue,
    isValidOutsideRangeDate,
    getInvalidDateMessage,
    getNewUpdateDateByArrow
} from "../../utils/calendar";
import {
    isValidFormattedDate,
    getCurrentYear,
    getDateByFormatDDMMYYYY,
    guid,
    ARROW_KEYS,
    ARROWS
} from "../../utils/utils";

class DatePicker extends React.PureComponent {

    constructor(props) {
        super(props);
        const datePickerOptions = this.props.options;
        const displayFormat = (datePickerOptions)? datePickerOptions.displayFormat : '';
        this.state = { selectedDate: getDateByFormatDDMMYYYY(new Date(), displayFormat), shouldCalendarOpen: false, isInvalidDate: false, isInvalidRangeDate: false, selectedYear: "", newSelectedYear: "", isValidChar: false, isCalendar: isCalendarFormat(datePickerOptions.displayFormat), isYear: isYearFormat(datePickerOptions.displayFormat) };
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
        style.left = '0px';
        style.right = dimensions.right;
        style.top = '100%';
        style.zIndex = '1';
        // style.bottom = dimensions.bottom;
        this.setState({ style: style });

        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillReceiveProps(nextProps) {}

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

        this.setState({
            shouldCalendarOpen: true,
            newSelectedYear: "",
            selectedDate: _selectedDate
        });

        this.props.onFocus();
    }
    
    onBlur = () => {
        let { manualEntry } = this.props.options;
        if(manualEntry === true){
            if(isValidFormattedDate(this.state.selectedDate, this.props.options)){
                const { showButtons } = this.props.options;
                var _valid = isValidOutsideRangeDate(this.state.selectedDate, this.props.options);
                if(_valid){
                    if(!showButtons){
                        this.setState({ selectedDate: this.state.selectedDate});
                    }
                    // this.onSelectButtonClickHandler();
                    this.props.onSelect(this.state.selectedDate);
                    this.setState({ isInvalidDate: false, isInvalidRangeDate: false });
                } else {
                    this.setState({ isInvalidDate: true, isInvalidRangeDate: true });
                }
            } else {
                this.setState({ isInvalidDate: true, isInvalidRangeDate: false });
            }
        }
        this.props.onBlur();
    }
    
    onKeyPressHandler = (evt) => {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
       
        if ((charCode > 31 && (charCode < 45 || charCode > 57))) {
            evt.preventDefault();;
        } 
    }
    
    onKeyDownHandler = (evt) => {
        evt = (evt) ? evt : window.event;
        const charCode = (evt.which) ? evt.which : evt.keyCode;

        if (evt.ctrlKey) {
            switch (evt.keyCode) {
                case ARROWS.left:{
                    const updatedDate = getNewUpdateDateByArrow(this.state.selectedDate, this.props.options, ARROWS.left, true, false);
                    this.setState({ selectedDate: updatedDate });
                    this.props.onSelect(updatedDate);
                    break;
                }
                case ARROWS.right:{
                    const updatedDate = getNewUpdateDateByArrow(this.state.selectedDate, this.props.options, ARROWS.right, true, false);
                    this.setState({ selectedDate: updatedDate });
                    this.props.onSelect(updatedDate);
                    break;
                }
                case ARROWS.up:{
                    const updatedDate = getNewUpdateDateByArrow(this.state.selectedDate, this.props.options, ARROWS.up, true, false);
                    this.setState({ selectedDate: updatedDate });
                    this.props.onSelect(updatedDate);
                    break;
                }
                case ARROWS.down:{
                    const updatedDate = getNewUpdateDateByArrow(this.state.selectedDate, this.props.options, ARROWS.down, true, false);
                    this.setState({ selectedDate: updatedDate });
                    this.props.onSelect(updatedDate);
                    break;
                }
            }
            
        } else if (evt.shiftKey) {
            switch (evt.keyCode) {
                case ARROWS.left:{
                    const updatedDate = getNewUpdateDateByArrow(this.state.selectedDate, this.props.options, ARROWS.left, true, true);
                    this.setState({ selectedDate: updatedDate });
                    this.props.onSelect(updatedDate);
                    break;
                }
                case ARROWS.right:{
                    const updatedDate = getNewUpdateDateByArrow(this.state.selectedDate, this.props.options, ARROWS.right, true, true);
                    this.setState({ selectedDate: updatedDate });
                    this.props.onSelect(updatedDate);
                    break;
                }
                case ARROWS.up:{
                    const updatedDate = getNewUpdateDateByArrow(this.state.selectedDate, this.props.options, ARROWS.up, true, true);
                    this.setState({ selectedDate: updatedDate });
                    this.props.onSelect(updatedDate);
                    break;
                }
                case ARROWS.down:{
                    const updatedDate = getNewUpdateDateByArrow(this.state.selectedDate, this.props.options, ARROWS.down, true, true);
                    this.setState({ selectedDate: updatedDate });
                    this.props.onSelect(updatedDate);
                    break;
                }
            }
        } else {
            if(charCode == 27){
                this.setState({ shouldCalendarOpen: false });
            }
    
            if(ARROW_KEYS.indexOf(charCode) !== -1){
                const updatedDate = getNewUpdateDateByArrow(this.state.selectedDate, this.props.options, charCode, false, false);
                this.setState({ selectedDate: updatedDate });
                this.props.onSelect(updatedDate);
            }
        }
    }
    
    onChangeHandler(name, e) {
        // var change = {};
        // change[name] = e.target.value;
        // this.setState(change);
        const manualEntry = (this.props.options && this.props.options.manualEntry === true);
        if(manualEntry == true){
            this.setState({
                selectedDate: e.target.value,
                shouldCalendarOpen: false
            });
        }
    }

    closeCalendar = (e) => {
        const { displayFormat } = this.props.options;

        var shouldCalendarOpen = (displayFormat === 'MM/YYYY' || displayFormat === 'QQ/YYYY');

        if(isValidMonthYearValue(this.state.newSelectedYear)){
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
        return (options && options.iconAlignment === 'Left') ? 'VS-PullLeft VS-MrgT5' : 'VS-PullRight VS-MrgT5';
    }

    getDateAlignClass() {
        const options = this.props.options;
        return (options && options.dateStringAlignment === 'Right') ? 'VS-PullRight1 VS-TextRight' : 'VS-PullLeft1 VS-TextLeft';
    }
    
    getInputClass() {
        const options = this.props.options;
        return 'VS-Regular-UPPER-Case VS-Calendar-Input' + ((options && options.showClearIcon === true) ? '-Icon' : '');
    }
    
    getInvalidClass() {
        const { isInvalidDate } = this.state;
        return (isInvalidDate === true) ? 'VS-Invalid-Input' : '';
    }

    getPlaceholder(){
        const options = this.props.options;
        return (this.state.isYear)? options.displayFormat : options.displayFormat;
    }

    getSelectedValue(){
        const options = this.props.options;
        return (this.state.isYear)? this.state.selectedYear : this.state.selectedDate;
    }


    render() {
        const { shouldCalendarOpen, selectedDate, isInvalidDate, isInvalidRangeDate, isCalendar, isYear, selectedYear } = this.state;
        const { options } = this.props;
        const isDisabled = (options && options.isDisabled === true);
        const showClearIcon = (options && options.showClearIcon === true);
        const iconAlignment = options.iconAlignment;
        const manualEntry = (options && options.manualEntry === true);
        const _uuid = guid();

        return (
            <div className="VS-App">
                <div id={`${_uuid}`}></div>
                <header className="VS-App-header">
                    <div className="VS-DatepickerContainer">
                        <div ref={(el) => this.el = el}>
                            <div className={`VS-Input-Border  ${this.getInvalidClass()} ${(showClearIcon) ? 'VS-Input-Icon' : ''} ${(isDisabled) ? 'VS-Disabled' : ''}`}>
                                <span className={this.getIconAlignClass()}><FaCalendar className="VS-Shape VS-TextDark VS-CalenderIcon" /></span>
                                <Input type="text"
                                    value={this.getSelectedValue()}
                                    className={`VS-Regular-UPPER-Case VS-Calendar-Input ${this.getDateAlignClass()}`}
                                    placeholder={this.getPlaceholder()}
                                    onFocus={this.onFocus}
                                    onBlur={this.onBlur}
                                    onKeyPress={this.onKeyPressHandler.bind(this)}
                                    onKeyDown={this.onKeyDownHandler.bind(this)}
                                    onChange={this.onChangeHandler.bind(this, selectedDate)}
                                />
                                {
                                    (showClearIcon === true)?
                                    <span className="VS-PullRight VS-MrgT5"><FaClose className="VS-Shape VS-TextDark VS-CalenderIcon VS-CloseIcon" onClick={() => this.onClearButtonClickHandler()} /></span> : ''
                                }
                                {
                                    (isInvalidDate === true)?
                                    <span className="VS-InvalidText">{getInvalidDateMessage(options.validationMessages, isInvalidRangeDate)}</span> : ''
                                }
                            </div>
                        </div>
                        {
                            (shouldCalendarOpen) ?
                                <CalendarPortal parent="#parent" position="right" arrow="center" uuid={_uuid}>
                                    {
                                        (isCalendar)?
                                        <CalendarDisplay style={this.state.style} options={options} selectedDate={selectedDate} shouldCalendarOpen={shouldCalendarOpen} onSelect={this.onSelectHandler} onSelectButtonClick={this.onSelectButtonClickHandler} onClearButtonClick={this.onClearButtonClickHandler}>
                                        </CalendarDisplay>  : ''
                                    }

                                    {
                                        (isYear)? <CalendarYear style={this.state.style} options={options} onYearSelect={this.onYearSelectHandler} selectedValue={selectedYear}></CalendarYear> : ''
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