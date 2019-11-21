import React, { Fragment } from "react";
import {
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
import MonthsView from "./months-view";
import YearsView from "./years-view";

class Year extends React.PureComponent {
    constructor(props) {
        super(props);
        const { options } = this.props;
        const { lowerMonthLimit, lowerYearLimit } = getYYYYForLowerLimit(options);
        const { upperMonthLimit, upperYearLimit } = getYYYYForUpperLimit(options);
        var year = new Date().getFullYear();
        year = parseInt(year);

        this.state = { year: year, isYearSelected: false, currentDateMonth: "", selectedYear: "", isDisabledPrev: ((year - 11) < lowerYearLimit) ? true : false, isDisabledNext: ((year + 1) >= upperYearLimit)? true : false, upperYearLimit: upperYearLimit, lowerYearLimit: lowerYearLimit, lowerMonthLimit: lowerMonthLimit, upperMonthLimit: upperMonthLimit };

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
                    currentDateMonth: getSelectedMonth(selectedValue),
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

        this.setState({ isDisabledNext: ((year + 1) >= upperYearLimit) ? true : false, isDisabledPrev: ((year - 11) < lowerYearLimit) ? true : false, upperYearLimit: upperYearLimit, lowerYearLimit: lowerYearLimit, lowerMonthLimit: lowerMonthLimit, upperMonthLimit: upperMonthLimit });
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

    getQuarters = () => {
        return splitArray(QUARTERS_NAMES, 2);
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

    renderQuarterValue = (quater, index) => {
        const activeClass = (isEqual(this.state.currentDateMonth, quater)) ? 'VS-Active' : '';
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
        const { year, isYearSelected, currentDateMonth } = this.state;
        const { selectedValue, options } = this.props;
        const isQuarter = (options.displayFormat === 'QQ/YYYY');

        return (
            <div>
                {
                    (year && !isYearSelected) ?
                        <YearsView options={options} style={this.props.style} onSelectYear={this.onSelectYearHandler} selectedValue={selectedValue}></YearsView>
                        :
                        (isQuarter) ?
                            <div className={this.getCalendarQuartersClass()} style={this.props.style}>
                                <Fragment>
                                    {this.getQuarters().map((row, index) => this.renderQuarterRow(row, index))}
                                </Fragment>
                            </div> :
                            <MonthsView options={options} currentDateMonth={currentDateMonth} style={this.props.style} onSelectMonth={this.onSelectMonthHandler}></MonthsView>
                }
            </div>
        );
    }
}

export default Year;