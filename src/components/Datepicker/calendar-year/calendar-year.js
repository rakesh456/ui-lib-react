import React, { Fragment } from "react";
import '../date-picker.scss';
import {
    getYearsList,
    MONTH_SHORT_NAMES,
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
        console.log(' selectedValue ', selectedValue);
        if(options.displayFormat === 'YYYY'){
            this.setState({
                selectedYear: selectedValue
            });
        } else {
            this.setState({
                selectedMonth: getSelectedMonth(selectedValue),
                selectedYear: getSelectedYear(selectedValue)
            })
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
    
    getYears = () => {
        const { year } = this.state;
        const _array = getYearsList(year);
        return splitArray(_array, 3);
    }
    
    getMonths = () => {
        return splitArray(MONTH_SHORT_NAMES, 3);
    }

    getCalendarYearClass = () => {
        return "VS-CalendarContainer VS-modal VS-shape-rounded-fill-for-year";
    }
    
    getCalendarMonthClass = () => {
        return "VS-CalendarContainer VS-modal VS-shape-rounded-fill-for-month";
    }

    renderYearValue = (year, index) => {
        console.log(' this.state.year ', this.state.selectedYear, year);
        const activeClass = (isEqual(this.state.selectedYear, year))? 'VS-Active' : '';
        return (  
            <Fragment key={guid()}>   
                <span className={`${activeClass} VS-MonthYear`} onClick={() => this.onSelectYearHandler(year)}>{year}</span> 
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
                <span className={`${activeClass} VS-MonthYear`} onClick={() => this.onSelectMonthHandler(month)}>{month}</span> 
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

    render() {
        const { year, isYearSelected } = this.state;
        const { selectedDate } = this.props;
        
        return (
            <div>
                {
                    (year && !isYearSelected)?
                    <div className={this.getCalendarYearClass()} style={this.props.style}>
                        <Fragment>
                            {this.getYears().map((row, index) => this.renderYearRow(row, index))}
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