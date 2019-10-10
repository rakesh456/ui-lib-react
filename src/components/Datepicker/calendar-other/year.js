import React, { Fragment } from "react";
import { FaCaretLeft, FaCaretRight } from 'react-icons/lib/fa';
import '../date-picker.scss';
import {
    getYearsList,
    MONTH_SHORT_NAMES,
    QUARTERS_NAMES,
    getSelectedMonth,
    getSelectedYear,
    isEqual,
    getYYYYForLowerLimit,
    getYYYYForUpperLimit,
    getMonthIndex,
    isMMYYYYFormat
} from "../../../utils/calendar";

import {
    splitArray,
    guid
} from "../../../utils/utils";

class Year extends React.PureComponent {
    constructor(props) {
        super(props);
        const { options } = this.props;
        const { lowerMonthLimit, lowerYearLimit } = getYYYYForLowerLimit(options);
        const { upperMonthLimit, upperYearLimit } = getYYYYForUpperLimit(options);
        var year = new Date().getFullYear();
        year = parseInt(year);

        this.state = { year: year, isYearSelected: false, selectedMonth: "", selectedYear: "", isDisabledPrev: ((year - 4) <= lowerYearLimit) ? true : false, isDisabledNext: ((year + 4) >= upperYearLimit)? true : false, upperYearLimit: upperYearLimit, lowerYearLimit: lowerYearLimit, lowerMonthLimit: lowerMonthLimit, upperMonthLimit: upperMonthLimit };

        this.updateNextPrev();
    }

    componentDidMount() {
        const { selectedValue, options } = this.props;
        if (selectedValue) {
            if (options.displayFormat === 'YYYY') {
                this.setState({
                    selectedYear: selectedValue,
                    year: selectedValue
                });
            } else {
                this.setState({
                    selectedMonth: getSelectedMonth(selectedValue),
                    selectedYear: getSelectedYear(selectedValue),
                    year: getSelectedYear(selectedValue)
                })
            }
        }

    }

    componentDidUpdate(prevProps) {
        this.updateNextPrev();
    }

    updateNextPrev() {
        const { options } = this.props;
        const { lowerMonthLimit, lowerYearLimit } = getYYYYForLowerLimit(options);
        const { upperMonthLimit, upperYearLimit } = getYYYYForUpperLimit(options);
        var { year } = this.state;
        year = parseInt(year);

        this.setState({ isDisabledNext: ((year + 4) >= upperYearLimit) ? true : false, isDisabledPrev: ((year - 4) <= lowerYearLimit) ? true : false, upperYearLimit: upperYearLimit, lowerYearLimit: lowerYearLimit, lowerMonthLimit: lowerMonthLimit, upperMonthLimit: upperMonthLimit });
    }

    onSelectYearHandler = (year) => {
        this.setState({
            isYearSelected: true,
            year: year
        });

        const options = this.props.options;
        if (options.displayFormat === 'YYYY') {
            this.props.onYearSelect(year.toString());
        }
    }

    onSelectMonthHandler = (month) => {
        this.setState({
            isYearSelected: true
        });

        this.props.onYearSelect(getMonthIndex(month) + '/' + this.state.year);
    }

    onSelectQuarterHandler = (quarter) => {
        this.setState({
            isYearSelected: true
        });

        this.props.onYearSelect(quarter + '/' + this.state.year);
    }

    goToNextMonth = () => {
        this.setState({
            year: parseInt(this.state.year) + 9
        });
    }

    goToPrevMonth = () => {
        this.setState({
            year: parseInt(this.state.year) - 9
        });
    }

    getYears = () => {
        const { year } = this.state;
        const _array = getYearsList(year);
        return splitArray(_array, 3);
    }

    getMonths = () => {
        return splitArray(MONTH_SHORT_NAMES, 3);
    }

    getQuarters = () => {
        return splitArray(QUARTERS_NAMES, 2);
    }

    getCalendarYearClass = () => {
        return "VS-CalendarContainer VS-modal VS-shape-rounded-fill-for-year";
    }

    getCalendarMonthClass = () => {
        return "VS-CalendarContainer VS-modal VS-shape-rounded-fill-for-month";
    }

    getCalendarQuartersClass = () => {
        return "VS-CalendarContainer VS-modal VS-shape-rounded-fill-for-quarter";
    }
    
    checkYearIsEnabled = (year) => {
        const {disabledList} = this.props.options;

        return (disabledList && disabledList.length > 0 && year)? ((disabledList.indexOf(year.toString()) !== -1)? false : true) : true;
    }
    
    checkQQMMIsEnabled = (qqmm, year) => {
        const {disabledList, displayFormat} = this.props.options;
        if(qqmm && year){
            qqmm = (isMMYYYYFormat(displayFormat))? getMonthIndex(qqmm.toString()) : qqmm;
            const _val = qqmm + '/' + year;
            return (disabledList && disabledList.length > 0 && _val)? ((disabledList.indexOf(_val.toString()) !== -1)? false : true) : true;
        } else {
            return true;
        }
    }

    renderYearValue = (year, index) => {
        const activeClass = (isEqual(this.state.selectedYear, year)) ? 'VS-Active' : '';
        const { lowerYearLimit, upperYearLimit } = this.state;
        const isEnabled = this.checkYearIsEnabled(year);

        return (
            <Fragment key={guid()}>
                {
                    ((lowerYearLimit && lowerYearLimit > year) || (upperYearLimit && upperYearLimit < year) || (!isEnabled)) ?
                        <span className={`${activeClass} VS-Year VS-Disabled`} >{year}</span> :
                        <span className={`${activeClass} VS-Year`} onClick={() => this.onSelectYearHandler(year)}>{year}</span>
                }
            </Fragment>
        );
    }

    renderYearRow = (years, index) => {
        const rows = years.map((date, index1) => {
            return this.renderYearValue(date, index1)
        });

        return (
            <div className="VS-DateRow" key={guid()}>{rows}</div>
        )
    }

    renderMonthValue = (month, index) => {
        const activeClass = (isEqual(this.state.selectedMonth, month)) ? 'VS-Active' : '';
        const { lowerMonthLimit, upperMonthLimit, lowerYearLimit, upperYearLimit, year } = this.state;
        const isEnabled = this.checkQQMMIsEnabled(month, year);

        return (
            <Fragment key={guid()}>
                {
                    ((lowerMonthLimit && lowerYearLimit && lowerYearLimit === year && lowerMonthLimit > getMonthIndex(month)) || (upperMonthLimit && upperYearLimit && upperYearLimit === year && upperMonthLimit < getMonthIndex(month)) || (!isEnabled)) ?
                        <span className={`${activeClass} VS-MonthQuater VS-Disabled`}>{month}</span>:
                        <span className={`${activeClass} VS-MonthQuater`} onClick={() => this.onSelectMonthHandler(month)}>{month}</span>
                }
            </Fragment>
        );
    }

    renderMonthRow = (months, index) => {
        const rows = months.map((date, index1) => {
            return this.renderMonthValue(date, index1)
        });

        return (
            <div className="VS-DateRowFlex" key={guid()}>{rows}</div>
        )
    }

    renderQuarterValue = (quater, index) => {
        const activeClass = (isEqual(this.state.selectedMonth, quater)) ? 'VS-Active' : '';
        const { lowerMonthLimit, upperMonthLimit, lowerYearLimit, upperYearLimit, year } = this.state;
        const _l = (lowerMonthLimit)? parseInt(lowerMonthLimit.charAt(1)) : 1;
        const _u = (upperMonthLimit)? parseInt(upperMonthLimit.charAt(1)) : 4;
        const _q = parseInt(quater.charAt(1));
        const isEnabled = this.checkQQMMIsEnabled(quater, year);
        
        return (
            <Fragment key={guid()}>
                {
                    ((lowerMonthLimit && lowerYearLimit && lowerYearLimit === year && _q < _l) || (upperMonthLimit && upperYearLimit && upperYearLimit === year && _q > _u) || (!isEnabled)) ?
                        <span className={`VS-MonthQuater VS-Disabled`}>{quater}</span>:
                        <span className={`${activeClass} VS-MonthQuater`} onClick={() => this.onSelectQuarterHandler(quater)}>{quater}</span>
                }
            </Fragment>
        );
    }

    renderQuarterRow = (quarters, index) => {
        const rows = quarters.map((date, index1) => {
            return this.renderQuarterValue(date, index1)
        });

        return (
            <div className="VS-DateRowFlex" key={guid()}>{rows}</div>
        )
    }

    render() {
        const { year, isYearSelected, isDisabledPrev, isDisabledNext } = this.state;
        const { options } = this.props;
        const isQuarter = (options.displayFormat === 'QQ/YYYY');

        return (
            <div>
                {
                    (year && !isYearSelected) ?
                        <div className={this.getCalendarYearClass()} style={this.props.style}>
                            <Fragment>
                                <div className="VS-NextPrevArrow">
                                    {
                                        (isDisabledPrev) ?
                                            <FaCaretLeft className="VS-PullLeft VS-Icon Vs-DisabledIcon" /> :
                                            <FaCaretLeft className="VS-PullLeft VS-Icon" onClick={this.goToPrevMonth} />
                                    }
                                    {
                                        (isDisabledNext) ?
                                            <FaCaretRight className="VS-PullRight VS-Icon Vs-DisabledIcon" /> :
                                            <FaCaretRight className="VS-PullRight VS-Icon" onClick={this.goToNextMonth} />
                                    }
                                </div>
                                {this.getYears().map((row, index) => this.renderYearRow(row, index))}
                            </Fragment>
                        </div> :
                        (isQuarter) ?
                            <div className={this.getCalendarQuartersClass()} style={this.props.style}>
                                <Fragment>
                                    {this.getQuarters().map((row, index) => this.renderQuarterRow(row, index))}
                                </Fragment>
                            </div> :
                            <div className={this.getCalendarMonthClass()} style={this.props.style}>
                                <Fragment>
                                    {this.getMonths().map((row, index) => this.renderMonthRow(row, index))}
                                </Fragment>
                            </div>
                }
            </div>
        );
    }
}

export default Year;