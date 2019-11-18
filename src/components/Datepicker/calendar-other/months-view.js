import React, { Fragment } from "react";
import {
    isEqual,
    MONTH_SHORT_NAMES,
    getMonthIndex,
    isMMYYYYFormat
} from "../../../utils/calendar";

import {
    guid,
    splitArray
} from "../../../utils/utils";

class MonthsView extends React.PureComponent {
    constructor(props) {
        super(props);
        const { options } = this.props;
        
        this.state = {  };
    }
    
    componentDidMount() {
        const { options } = this.props;
    }
    
    getMonths = () => {
        return splitArray(MONTH_SHORT_NAMES, 3);
    }
    
    onSelectMonthHandler = (month) => {
        this.props.onSelectMonth(month);
    }

    getCalendarMonthClass = () => {
        return "VS-CalendarContainer VS-modal VS-shape-rounded-fill-for-month";
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

    renderMonthValue = (month, index) => {
        const activeClass = (isEqual(this.props.selectedMonth, month)) ? 'VS-Active' : '';
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

    render() {
        return (
            <div className={this.getCalendarMonthClass()} style={this.props.style}>
                <Fragment>
                    {this.getMonths().map((row, index) => this.renderMonthRow(row, index))}
                </Fragment>
            </div>
        );
    }
}

export default MonthsView;