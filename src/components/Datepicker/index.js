import React from "react";
import CalendarDate from "./calendar-date/index";
import Year from "./calendar-other/year";
import MonthsView from "./calendar-other/months-view";
import YearsView from "./calendar-other/years-view";
import CalendarPortal from "./portal";
import { FaCalendar, FaClose } from 'react-icons/lib/fa';
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
    getSelectedYearFromDate,
    getSelectedMonthFromDate,
    getSelectedYear,
    getProperFormattedDate,
    getInvalidDateMessage,
    getNewUpdateDateByArrow,
    currentFormatToYYYYMMDD,
    getMonthIndex,
    isValidFormattedDate,
    isQQYYYYFormat,
    isMMYYYYFormat,
    checkAllowedChars,
    isLeft,
    isRight,
    currentFormatToYYYYMMDDNew,
    dateIsInDisabledList,
    reverseFormatOptions,
    DEFAULT_OPTIONS
} from "../../utils/calendar";
import {
    getDateByFormat,
    guid,
    ARROW_KEYS,
    ARROWS,
    isValidDate,
    compareObjects,
    isUndefinedOrNull    
} from "../../utils/utils";

class DatePicker extends React.PureComponent {

    constructor(props) {
        super(props);
        const datePickerOptions = { ...this.props.options };
        const displayFormat = (datePickerOptions) ? datePickerOptions.displayFormat : '';
        this.state = { selectedDate: "", shouldCalendarOpen: false, isInvalidDate: false, isInvalidRangeDate: false, selectedYear: "", newSelectedYear: "", isValidChar: false, isCalendar: isCalendarFormat(displayFormat), isMonthYear: isYearFormat(displayFormat), allowedNextChar: true, showMonthSelection: false, showYearSelection: false, isMonthSelected: false, isYearSelected: false, isDisabled: false, isDisabledFull: false, options: datePickerOptions };
    }

    // Component lifecycle methods started
    componentDidMount() {
        document.addEventListener('click', this.closeCalendar);
        const dimensions = (this.el) ? this.el.getBoundingClientRect() : {};
        const style = {};
        const options = { ...this.props.options };
        const calendarLocation = (options.calendarLocation && options.calendarLocation === 'up') ? 'up' : 'down';

        style.left = '0px';
        style.right = dimensions.right;
        if (calendarLocation === 'up') {
            style.bottom = '100%';
        } else {
            style.top = '100%';
        }
        style.zIndex = '1';
        this.setState({ style: style });

        window.addEventListener("resize", this.updateDimensions);

        const datePickerOptions = { ...this.props.options };
        const displayFormat = (datePickerOptions) ? datePickerOptions.displayFormat : '';
        const _date = this.getDefaultDate();
        const _selectedYear = this.getDefaultYear();

        this.setState({
            selectedDate: (typeof _date === 'string') ? _date : getDateByFormat(_date, displayFormat),
            selectedYear: _selectedYear,
        });
    }

    componentDidUpdate(prevProps, prevState) {
        let prevOptions = { ...prevState.options };
        let thisOptions = { ...this.state.options };
        const displayFormat = (thisOptions) ? thisOptions.displayFormat : '';
        const objSame = compareObjects(prevOptions, thisOptions);

        if (!objSame && (prevOptions.lowerLimit !== thisOptions.lowerLimit || prevOptions.upperLimit !== thisOptions.upperLimit || prevOptions.disabledList !== thisOptions.disabledList)) {
            const _date = this.getDefaultDate();

            this.setState({
                selectedDate: (typeof _date === 'string') ? _date : getDateByFormat(_date, displayFormat),
                isCalendar: isCalendarFormat(displayFormat),
                isMonthYear: isYearFormat(displayFormat)
            });
        }
    }
    // Component lifecycle methods end

    // Component explicit methods started 
    setDateValue(dt, isInvalidDate, isInvalidRangeDate) {
        const options = this.state.options;
        if (isCalendarFormat(options.displayFormat)) {
            this.setState({ selectedDate: dt, isInvalidDate: isInvalidDate, isInvalidRangeDate: isInvalidRangeDate });
        } else if (isYearFormat(options.displayFormat)) {
            this.setState({ selectedYear: dt, isInvalidDate: isInvalidDate, isInvalidRangeDate: isInvalidRangeDate });
        }
    }

    refresh() {
        const { displayFormat } = this.state.options;
        if (isCalendarFormat(displayFormat)) {
            this.setState({ selectedDate: getDateByFormat(this.getDefaultDate(), displayFormat), isInvalidDate: false, isInvalidRangeDate: false });
        } else if (isYearFormat(displayFormat)) {
            this.setState({ selectedYear: this.getDefaultYear(), isInvalidDate: false, isInvalidRangeDate: false });
        }
    }

    getDataOptions(items) {
        let options = { ...this.state.options };
        let datePickerOptions = { ...this.props.options };
        let finalOption = { ...DEFAULT_OPTIONS, ...datePickerOptions, ...options };
        let newObj = {displayFormat: finalOption.displayFormat};
        if (items && items.length > 0) {
            items.forEach((item) => {
                if (item && typeof finalOption[item] !== "undefined") {
                    newObj[item] = finalOption[item];
                }
            });

            let data = reverseFormatOptions(newObj);

            if(items.indexOf('displayFormat') === -1){
                delete data['displayFormat'];
            }

            return data;
        } else {
            return reverseFormatOptions(finalOption);
        }
    }

    getDefaultDate() {
        const options = (this.state.options) ? this.state.options : {};
        let { defaultDate } = options;
        if (defaultDate === "") {
            return "";
        } else if (typeof (defaultDate) !== "undefined") {
            let _isValid = false;

            let _date = currentFormatToYYYYMMDDNew(defaultDate, options);
            let _valid = (isValidDate(_date));
            _isValid = (_valid) ? isValidOutsideRangeDate(_date, options) : _valid;
            return (_isValid) ? defaultDate : '';
        } else {
            return '';
        }
    }

    getDefaultYear() {
        const options = (this.props.options) ? this.props.options : {};
        let { defaultDate, displayFormat } = options;
        if (defaultDate === "") {
            return "";
        } else if (typeof (defaultDate) !== "undefined") {
            let _isValid = false;

            if (displayFormat === 'QQ/YYYY') {
                let _valid = (isValidQQYYYYValue(defaultDate));
                _isValid = (_valid) ? isValidOutsideRangeDateQQYear(defaultDate, options) : _valid;
            } else if (displayFormat === 'MM/YYYY') {
                let _valid = (isValidMMYYYYValue(defaultDate));
                _isValid = (_valid) ? isValidOutsideRangeDateMonthYear(defaultDate, options) : _valid;
            } else if (displayFormat === 'YYYY') {
                let _valid = (isValidYYYYValue(defaultDate));
                _isValid = (_valid) ? isValidOutsideRangeDateYear(defaultDate, options) : _valid;
            }
            return (_isValid) ? defaultDate : '';
        } else {
            return '';
        }
    }
    // Component explicit methods end

    // Component method handler called from child started
    onSelectHandler = date => {
        const { displayFormat, showButtons } = this.state.options;
        const newDate = getDateByFormat(date, displayFormat);
        if (showButtons === true) {
            this.setState({ selectedDate: newDate, shouldCalendarOpen: true, isInvalidDate: false });
        } else {
            this.setState({ selectedDate: newDate, shouldCalendarOpen: false, isInvalidDate: false }, () => {
                if (this.props.onSelect) {
                    this.props.onSelect(newDate);
                }
            });            
        }
    }

    onYearSelectHandler = year => {
        const { showButtons } = this.state.options;

        if (showButtons === true) {
            this.setState({ selectedYear: year, newSelectedYear: year, shouldCalendarOpen: true, isInvalidDate: false });
        } else {
            this.setState({ selectedYear: year, newSelectedYear: year, shouldCalendarOpen: false, isInvalidDate: false });
            if (this.props.onYearSelect) {
                this.props.onYearSelect(year);
            }
        }
    }

    onSelectButtonClickHandler = () => {
        this.setState({ shouldCalendarOpen: false });
        if (this.props.onSelect) {
            this.props.onSelect(this.state.selectedDate);
        }
    }

    onClearButtonClickHandler = () => {
        this.setState({ selectedDate: "", selectedYear: "", shouldCalendarOpen: false });
    }

    goToSelectMonthYear = () => {
        this.setState({ showMonthSelection: true });
    }

    onSelectMonthHandler = (month) => {
        const { options } = this.state;
        const _date = (this.state.selectedDate) ? new Date(currentFormatToYYYYMMDD(this.state.selectedDate, options)) : new Date();
        _date.setMonth(parseInt(getMonthIndex(month)) - 1);
        const newDate = getDateByFormat(_date, options.displayFormat);

        this.setState({
            isMonthSelected: true,
            isYearSelected: false,
            showYearSelection: false,
            showMonthSelection: false,
            selectedDate: newDate,
            shouldCalendarOpen: true
        });
    }

    onSelectYearHandler = (year) => {
        const { options } = this.state;
        const _date = (this.state.selectedDate) ? new Date(currentFormatToYYYYMMDD(this.state.selectedDate, options)) : new Date();
        // const _date = new Date(currentFormatToYYYYMMDD(this.state.selectedDate, options));
        _date.setFullYear(parseInt(year));
        const newDate = getDateByFormat(_date, options.displayFormat);

        this.setState({
            isMonthSelected: false,
            isYearSelected: true,
            showYearSelection: false,
            showMonthSelection: true,
            selectedDate: newDate,
            shouldCalendarOpen: true
        });
    }

    onGoToSelectYearHandler = () => {
        this.setState({
            showMonthSelection: false,
            showYearSelection: true
        });
    }

    goToNextYearHandler = () => {
        const { selectedDate } = this.state;
        const { options } = this.state;
        // const _date = new Date(currentFormatToYYYYMMDD(this.state.selectedDate, options));
        const _date = (this.state.selectedDate) ? new Date(currentFormatToYYYYMMDD(this.state.selectedDate, options)) : new Date();

        let currentDateYear = getSelectedYearFromDate(selectedDate, options);
        currentDateYear = (Number.isNaN(currentDateYear)) ? _date.getFullYear() : currentDateYear;
        _date.setFullYear(parseInt(currentDateYear) + 1);
        const newDate = getDateByFormat(_date, options.displayFormat);
        this.setState({
            selectedDate: newDate
        });
    }

    goToPrevYearHandler = () => {
        const { selectedDate } = this.state;
        const { options } = this.state;
        const _date = (this.state.selectedDate) ? new Date(currentFormatToYYYYMMDD(this.state.selectedDate, options)) : new Date();
        let currentDateYear = getSelectedYearFromDate(selectedDate, options);
        currentDateYear = (Number.isNaN(currentDateYear)) ? _date.getFullYear() : currentDateYear;
        _date.setFullYear(parseInt(currentDateYear) - 1);
        const newDate = getDateByFormat(_date, options.displayFormat);
        this.setState({
            selectedDate: newDate
        });
    }

    closeCalendar = (e) => {
        const { displayFormat } = this.state.options;
        const { isMonthSelected, isYearSelected } = this.state;

        let shouldCalendarOpen = (isMMYYYYFormat(displayFormat) || isQQYYYYFormat(displayFormat));

        if (isValidMMYYYYValue(this.state.newSelectedYear) || (e.target && e.target.classList && e.target.classList.length <= 0)) {
            shouldCalendarOpen = false;
        }

        shouldCalendarOpen = (isMonthSelected === true || isYearSelected === true) ? true : shouldCalendarOpen;

        if (((e.target && e.target.classList && !e.target.classList.contains(`${CONSTANTS.CLASSES.VS_CALENDAR_INPUT}`) && !e.target.classList.contains(`${CONSTANTS.CLASSES.VS_DAY}`) && !e.target.classList.contains(`${CONSTANTS.CLASSES.VS_CAL_DAY}`) && !e.target.classList.contains(`${CONSTANTS.CLASSES.VS_NEXT_PREV_DAY}`) && !e.target.classList.contains(`${CONSTANTS.CLASSES.VS_ICON}`) && !e.target.classList.contains(`${CONSTANTS.CLASSES.VS_CALENDAR_MONTH}`) && this.state.shouldCalendarOpen === true)) && (e.target.nodeName !== 'path') && !e.target.classList.contains(`${CONSTANTS.CLASSES.VS_MONTH_NAME}`)) {
            if (e.target.classList.contains(`${CONSTANTS.CLASSES.VS_APP_HEADER}`)) {
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
    // Component method handler called from child end

    // Component events handler started
    onFocus = () => {
        const _selectedDate = (isValidFormattedDate(this.state.selectedDate, this.state.options)) ? this.state.selectedDate : "";
        const { displayFormat } = this.state.options;
        const _date = this.getDefaultDate();

        this.setState({
            shouldCalendarOpen: true,
            newSelectedYear: "",
            selectedDate: (this.state.isInvalidRangeDate || this.state.isInvalidDate) ? getDateByFormat(_date, displayFormat) : _selectedDate,
            selectedYear: (this.state.isInvalidDate) ? this.getDefaultYear() : this.state.selectedYear
        });

        if (this.props.onFocus) {
            this.props.onFocus();
        }
    }

    onBlur = () => {
        let { manualEntry, showButtons, displayFormat } = this.state.options;
        let { isDisabled } = this.state;

        if (isDisabled === false) {
            if (manualEntry === true) {
                if (this.state.isMonthYear) {
                    const { selectedYear } = this.state;
                    if (isQQYYYYFormat(displayFormat)) {
                        let _upperYear = selectedYear.toUpperCase();
                        let _validFormatQQYear = isValidQQYYYYValue(_upperYear);
                        if (_validFormatQQYear) {
                            let _validQQYear = isValidOutsideRangeDateQQYear(_upperYear, this.state.options);
                            if (_validQQYear) {
                                if (!showButtons) {
                                    this.setState({ selectedYear: _upperYear });
                                }                                
                                this.setState({ isInvalidDate: false, isInvalidRangeDate: false });
                            } else {
                                this.setState({ isInvalidDate: false, isInvalidRangeDate: true });
                            }
                        } else {
                            this.setState({ isInvalidDate: true, isInvalidRangeDate: false });
                        }
                    } else if (isMMYYYYFormat(displayFormat)) {
                        if (isValidMMYYYYValue(selectedYear)) {
                            let _validMonthYear = isValidOutsideRangeDateMonthYear(selectedYear, this.state.options);
                            if (_validMonthYear) {
                                if (!showButtons) {
                                    this.setState({ selectedYear: selectedYear });
                                }                                
                                this.setState({ isInvalidDate: false, isInvalidRangeDate: false });
                            } else {
                                this.setState({ isInvalidDate: false, isInvalidRangeDate: true });
                            }
                        } else {
                            this.setState({ isInvalidDate: true, isInvalidRangeDate: false });
                        }
                    } else {
                        if (isValidYYYYValue(selectedYear)) {
                            let _validDateYear = isValidOutsideRangeDateYear(selectedYear, this.state.options);
                            if (_validDateYear) {
                                if (!showButtons) {
                                    this.setState({ selectedYear: selectedYear });
                                }                                
                                this.setState({ isInvalidDate: false, isInvalidRangeDate: false });
                            } else {
                                this.setState({ isInvalidDate: false, isInvalidRangeDate: true });
                            }
                        } else {
                            this.setState({ isInvalidDate: true, isInvalidRangeDate: false });
                        }
                    }
                } else {
                    let _validFormat = isValidFormattedDate(this.state.selectedDate, this.state.options);
                    if (_validFormat) {
                        let _validOutRange = isValidOutsideRangeDate(this.state.selectedDate, this.state.options);
                        if (_validOutRange) {
                            if (!showButtons) {
                                this.setState({ selectedDate: this.state.selectedDate });
                            }
                            this.setState({ isInvalidDate: false, isInvalidRangeDate: false });                            
                        } else {
                            this.setState({ isInvalidDate: false, isInvalidRangeDate: true });
                        }
                    } else {
                        this.setState({ isInvalidDate: true, isInvalidRangeDate: false });
                        this.setState({ selectedDate: "" });
                    }
                }
            }
        }
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    }

    onKeyDownHandler = (evt) => {
        evt = (evt) ? evt : window.event;
        const charCode = (evt.which) ? evt.which : evt.keyCode;
        const { options } = this.state;
        let { displayFormat, lowerLimit, upperLimit } = options;

        if(ARROWS.left === charCode){
            this.props.onKeyLeft();
        } else if(ARROWS.right === charCode){
            this.props.onKeyRight();
        }

        if (charCode === CONSTANTS.KEY_CODES.ESCAPE || charCode === CONSTANTS.KEY_CODES.TAB_KEY) {
            this.setState({ shouldCalendarOpen: false });
        } else {

            lowerLimit = (lowerLimit) ? ((isValidDate(lowerLimit)) ? lowerLimit : null) : null;
            upperLimit = (upperLimit) ? ((isValidDate(upperLimit)) ? upperLimit : null) : null;

            if (!this.state.isMonthYear && this.state.shouldCalendarOpen && !isUndefinedOrNull(this.state.selectedDate)) {
                if (evt.ctrlKey || evt.metaKey) {
                    switch (evt.keyCode) {
                        case ARROWS.left: {
                            const updatedDate = getNewUpdateDateByArrow(this.state.selectedDate, false, options, displayFormat, lowerLimit, upperLimit, ARROWS.left, true, false);
                            this.setState({ selectedDate: updatedDate });
                            if (this.props.onSelect) {
                                this.props.onSelect(updatedDate);
                            }
                            break;
                        }
                        case ARROWS.right: {
                            const updatedDate = getNewUpdateDateByArrow(this.state.selectedDate, false, options, displayFormat, lowerLimit, upperLimit, ARROWS.right, true, false);
                            this.setState({ selectedDate: updatedDate });
                            if (this.props.onSelect) {
                                this.props.onSelect(updatedDate);
                            }
                            break;
                        }
                        case ARROWS.up: {
                            const updatedDate = getNewUpdateDateByArrow(this.state.selectedDate, false, options, displayFormat, lowerLimit, upperLimit, ARROWS.up, true, false);
                            this.setState({ selectedDate: updatedDate });
                            if (this.props.onSelect) {
                                this.props.onSelect(updatedDate);
                            }
                            break;
                        }
                        case ARROWS.down: {
                            const updatedDate = getNewUpdateDateByArrow(this.state.selectedDate, false, options, displayFormat, lowerLimit, upperLimit, ARROWS.down, true, false);
                            this.setState({ selectedDate: updatedDate });
                            if (this.props.onSelect) {
                                this.props.onSelect(updatedDate);
                            }
                            break;
                        }
                        default: {
                            break;
                        }
                    }

                } else if (evt.shiftKey) {
                    switch (evt.keyCode) {
                        case ARROWS.left: {
                            const updatedDate = getNewUpdateDateByArrow(this.state.selectedDate, false, options, displayFormat, lowerLimit, upperLimit, ARROWS.left, false, true);
                            this.setState({ selectedDate: updatedDate });
                            if (this.props.onSelect) {
                                this.props.onSelect(updatedDate);
                            }
                            break;
                        }
                        case ARROWS.right: {
                            const updatedDate = getNewUpdateDateByArrow(this.state.selectedDate, false, options, displayFormat, lowerLimit, upperLimit, ARROWS.right, false, true);
                            this.setState({ selectedDate: updatedDate });
                            if (this.props.onSelect) {
                                this.props.onSelect(updatedDate);
                            }
                            break;
                        }
                        case ARROWS.up: {
                            const updatedDate = getNewUpdateDateByArrow(this.state.selectedDate, false, options, displayFormat, lowerLimit, upperLimit, ARROWS.up, false, true);
                            this.setState({ selectedDate: updatedDate });
                            if (this.props.onSelect) {
                                this.props.onSelect(updatedDate);
                            }
                            break;
                        }
                        case ARROWS.down: {
                            const updatedDate = getNewUpdateDateByArrow(this.state.selectedDate, false, options, displayFormat, lowerLimit, upperLimit, ARROWS.down, false, true);
                            this.setState({ selectedDate: updatedDate });
                            if (this.props.onSelect) {
                                this.props.onSelect(updatedDate);
                            }
                            break;
                        }
                        default: {
                            break;
                        }
                    }
                } else {


                    if (ARROW_KEYS.indexOf(charCode) !== -1) {
                        const updatedDate = getNewUpdateDateByArrow(this.state.selectedDate, false, options, displayFormat, lowerLimit, upperLimit, charCode, false, false);

                        this.setState({ selectedDate: updatedDate });
                        if (this.props.onSelect) {
                            this.props.onSelect(updatedDate);
                        }
                    }
                }
            }
        }

    }

    onKeyPressHandler = (evt) => {
        const { displayFormat } = this.state.options;
        evt = (evt) ? evt : window.event;
        let charCode = (evt.which) ? evt.which : evt.keyCode;

        if ((charCode >= CONSTANTS.KEY_CODES.SPACE && (charCode <= CONSTANTS.KEY_CODES.COMMA || charCode > CONSTANTS.KEY_CODES.NINE)) && (!isQQYYYYFormat(displayFormat))) {
            evt.preventDefault();
        }
    }

    onChangeHandler(name, e) {
        const manualEntry = (this.state.options && this.state.options.manualEntry === true);
        const { displayFormat } = this.state.options;

        if (manualEntry === true && checkAllowedChars(displayFormat, e.target.value)) {
            this.setState({
                selectedDate: e.target.value,
                selectedYear: e.target.value,
                shouldCalendarOpen: false
            });
        }
    }
    // Component events handler end

    handleChildUnmount = (_date) => {
        this.setState({
            selectedDate: _date,
            shouldCalendarOpen: false
        });
    }

    // Component methods to return classes started
    getIconAlignClass() {
        const options = this.state.options;
        return (options && isLeft(options.iconAlignment)) ? `${CONSTANTS.CLASSES.VS_PULL_LEFT} ${CONSTANTS.CLASSES.VS_MRG_T5}` : `${CONSTANTS.CLASSES.VS_PULL_RIGHT} ${CONSTANTS.CLASSES.VS_MRG_T5}`;
    }

    getDateAlignClass() {
        const options = this.state.options;
        return (options && isRight(options.dateStringAlignment)) ? `${CONSTANTS.CLASSES.VS_TEXT_RIGHT}` : `${CONSTANTS.CLASSES.VS_TEXT_LEFT}`;
    }

    getInvalidClass() {
        const { isInvalidDate } = this.state;
        return (isInvalidDate === true) ? `${CONSTANTS.CLASSES.VS_INVALID_INPUT}` : '';
    }

    getPlaceholder() {
        const options = this.state.options;
        return (options && options.displayFormat) ? options.displayFormat : '';
    }

    getSelectedValue() {
        return (this.state.isMonthYear) ? this.state.selectedYear : this.state.selectedDate;
    }
    // Component methods to return classes end

    // Component render methods started
    render() {
        const { shouldCalendarOpen, selectedDate, isInvalidDate, isInvalidRangeDate, isCalendar, isMonthYear, selectedYear, showMonthSelection, showYearSelection } = this.state;
        const { options } = this.state;
        const displayFormat = (options) ? options.displayFormat : "";
        const showClearIcon = (options && options.showClearIcon === true);
        const showErrorMessage = (options && options.showErrorMessage === true);
        const _uuid = guid();
        const currentDateMMMQQ = (isCalendar === true)?  getSelectedMonthFromDate(selectedDate, options) : getSelectedYear(selectedYear);
        const currentDateYear = (isCalendar === true)? getSelectedYearFromDate(selectedDate, options) : getSelectedYear(selectedYear);

        let isDisabled = ((options && options.isDisabled === true) || (options.lowerLimit && options.upperLimit && isCalendarFormat(displayFormat) && selectedDate === null) || (options.lowerLimit && options.upperLimit && isYearFormat(displayFormat) && selectedYear === null)) ? true : false;
        let _lowerDate = (options) ? getProperFormattedDate(options.lowerLimit, options) : "";
        const isDisabledFull = (options) ? (options.lowerLimit === options.upperLimit && dateIsInDisabledList(_lowerDate, options)) : false;
        isDisabled = (isDisabledFull === true) ? true : isDisabled;

        return (
            <div className={`${CONSTANTS.CLASSES.VS_APP}`}>
                <div id={`${_uuid}`}></div>
                <header className={`${CONSTANTS.CLASSES.VS_APP_HEADER}`}>
                    <div className={`${CONSTANTS.CLASSES.VS_DATEPICKER_CONTAINER}`}>
                        <div ref={(el) => this.el = el}>
                            <div className={`${CONSTANTS.CLASSES.VS_INPUT_BORDER} ${this.getInvalidClass()} ${(showClearIcon) ? `${CONSTANTS.CLASSES.VS_INPUT_ICON}` : ''} ${(isDisabled) ? `${CONSTANTS.CLASSES.VS_DISABLED}` : ''}`}>
                                <span className={this.getIconAlignClass()}><FaCalendar className={`${CONSTANTS.CLASSES.VS_SHAPE} ${CONSTANTS.CLASSES.VS_TEXT_DARK}`} /></span>
                                <input type="text"
                                    value={this.getSelectedValue()}
                                    className={`${CONSTANTS.CLASSES.VS_REG_UPPER_CASE} ${CONSTANTS.CLASSES.VS_CALENDAR_INPUT} ${this.getDateAlignClass()}`}
                                    placeholder={this.getPlaceholder()}
                                    onClick={this.onFocus}
                                    onKeyDown={(e) => this.onKeyDownHandler(e)}
                                    onKeyPress={this.onKeyPressHandler.bind(this)}
                                    onBlur={this.onBlur}
                                    onChange={this.onChangeHandler.bind(this, selectedDate)}
                                />
                                {
                                    (showClearIcon === true) ?
                                        <span className={`${CONSTANTS.CLASSES.VS_PULL_RIGHT} ${CONSTANTS.CLASSES.VS_MRG_T5}`}><FaClose className={`${CONSTANTS.CLASSES.VS_SHAPE} ${CONSTANTS.CLASSES.VS_TEXT_DARK} ${CONSTANTS.CLASSES.VS_CLOSE_ICON}`} onClick={() => this.onClearButtonClickHandler()} /></span> : ''
                                }
                                {
                                    ((isInvalidDate === true || isInvalidRangeDate === true) && showErrorMessage === true) ?
                                        <span className={`${CONSTANTS.CLASSES.VS_INVALID_TEXT}`}>{getInvalidDateMessage(options.validationMessages, isInvalidDate, isInvalidRangeDate)}</span> : ''
                                }
                            </div>
                        </div>
                        {
                            (shouldCalendarOpen && isDisabled === false && showMonthSelection === false && showYearSelection === false) ?
                                <CalendarPortal parent="#parent" position="right" arrow="center" uuid={_uuid}>
                                    {
                                        (isCalendar) ?
                                            <CalendarDate style={this.state.style} options={options} onKeyDown={this.onKeyDownHandler} selectedDate={selectedDate} shouldCalendarOpen={shouldCalendarOpen} onSelect={this.onSelectHandler} onSelectButtonClick={this.onSelectButtonClickHandler} onClearButtonClick={this.onClearButtonClickHandler} goToSelectMonthYear={this.goToSelectMonthYear}>
                                            </CalendarDate> : ''
                                    }

                                    {
                                        (isMonthYear) ? <Year style={this.state.style} options={options} onYearSelect={this.onYearSelectHandler} selectedValue={selectedYear}></Year> : ''
                                    }
                                </CalendarPortal>
                                : ''
                        }
                        {
                            (shouldCalendarOpen && isDisabled === false && showMonthSelection === true && showYearSelection === false) ? <MonthsView options={options} currentDateMMMQQ={currentDateMMMQQ} currentDateYear={currentDateYear} style={this.state.style} onSelectMonth={this.onSelectMonthHandler} showHeaderSelection={true} goToSelectYear={this.onGoToSelectYearHandler} goToPrevYear={this.goToPrevYearHandler} goToNextYear={this.goToNextYearHandler}></MonthsView> : ''

                        }
                        {
                            (shouldCalendarOpen && isDisabled === false && showMonthSelection === false && showYearSelection === true) ? <YearsView options={options} currentDateMMMQQ={currentDateMMMQQ} style={this.state.style} onSelectYear={this.onSelectYearHandler} showHeaderSelection={true} selectedValue={currentDateYear}></YearsView> : ''
                        }
                    </div>
                </header>
            </div>
        );
    }
    // Component render methods end
}

export default DatePicker;