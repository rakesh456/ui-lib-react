import React, { Fragment } from "react";
import { FaCaretLeft, FaCaretRight } from 'react-icons/lib/fa';
import '../date-picker.scss';
import {
    getYearsList,
    MONTH_SHORT_NAMES,
    QUARTERS_NAMES,
    getMonthIndex,
    getSelectedMonth,
    getSelectedYear,
    isEqual
} from "../../../utils/calendar";

import {
    splitArray,
    guid
} from "../../../utils/utils";

class CalendarYear extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { year: new Date().getFullYear(), isYearSelected: false, selectedMonth: "", selectedYear: "" };
    }

    componentDidMount() {
        const { selectedValue, options } = this.props;
        if(selectedValue){
            if(options.displayFormat === 'YYYY'){
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

    onSelectYearHandler = (year) => {
        this.setState({
            isYearSelected: true,
            year: year
        });

        const options = this.props.options;
        if(options.displayFormat === 'YYYY'){
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
            year: parseInt(this.state.year) + 3
        });
    }
    
    goToPrevMonth = () => {
        this.setState({
            year: parseInt(this.state.year) - 3
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

    renderYearValue = (year, index) => {
        const activeClass = (isEqual(this.state.selectedYear, year))? 'VS-Active' : '';
        return (  
            <Fragment key={guid()}>   
                <span className={`${activeClass} VS-Year`} onClick={() => this.onSelectYearHandler(year)}>{year}</span> 
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
        const activeClass = (isEqual(this.state.selectedMonth, month))? 'VS-Active' : '';
        return (  
            <Fragment key={guid()}>   
                <span className={`${activeClass} VS-MonthQuater`} onClick={() => this.onSelectMonthHandler(month)}>{month}</span> 
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
    
    renderQuarterValue = (month, index) => {
        const activeClass = (isEqual(this.state.selectedMonth, month))? 'VS-Active' : '';
        return (  
            <Fragment key={guid()}>   
                <span className={`${activeClass} VS-MonthQuater`} onClick={() => this.onSelectQuarterHandler(month)}>{month}</span> 
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
        const { year, isYearSelected } = this.state;
        const { selectedDate, options } = this.props;
        const isQuarter = (options.displayFormat === 'QQ/YYYY');
        
        return (
            <div>
                {
                    (year && !isYearSelected)?
                    <div className={this.getCalendarYearClass()} style={this.props.style}>
                        <Fragment>
                            <div className="VS-NextPrevArrow">
                                <FaCaretLeft className="VS-PullLeft VS-Icon" onClick={this.goToPrevMonth} />
                                <FaCaretRight className="VS-PullRight VS-Icon" onClick={this.goToNextMonth} />
                            </div>
                            {this.getYears().map((row, index) => this.renderYearRow(row, index))}
                        </Fragment>
                    </div> : 
                    (isQuarter)? 
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

export default CalendarYear;