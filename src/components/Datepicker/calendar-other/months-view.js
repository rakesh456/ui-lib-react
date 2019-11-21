import React, { Fragment } from "react";
import { FaCaretLeft, FaCaretRight } from 'react-icons/lib/fa';
import {
    isEqual,
    MONTH_SHORT_NAMES,
    CURRENT_YEAR,
    getMonthIndex,
    isMMYYYYFormat,
    getYYYYForLowerLimit,
    getYYYYForUpperLimit
} from "../../../utils/calendar";

import {
    guid,
    splitArray
} from "../../../utils/utils";

class MonthsView extends React.PureComponent {
    constructor(props) {
        super(props);
        const { options, showHeaderSelection } = this.props;
        
        const { lowerYearLimit } = getYYYYForLowerLimit(options);
        const { upperYearLimit } = getYYYYForUpperLimit(options);
        const currentDateYear = (this.props.currentDateYear)? this.props.currentDateYear : CURRENT_YEAR;
        const year = parseInt(currentDateYear);
        
        this.state = { sDisabledNext: (year >= upperYearLimit) ? true : false, isDisabledPrev: (year <= lowerYearLimit) ? true : false, showHeaderSelection: (showHeaderSelection === true)};
    }
    
    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
        this.updateNextPrev();
    }

    updateNextPrev() {
        const { options } = this.props;
        const { lowerYearLimit } = getYYYYForLowerLimit(options);
        const { upperYearLimit } = getYYYYForUpperLimit(options);
        const currentDateYear = (this.props.currentDateYear)? this.props.currentDateYear : CURRENT_YEAR;
        const year = parseInt(currentDateYear);
        this.setState({ isDisabledNext: (year >= upperYearLimit) ? true : false, isDisabledPrev: (year <= lowerYearLimit) ? true : false });
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
        const activeClass = (isEqual(this.props.currentDateMonth, month)) ? 'VS-Active' : '';
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
        const { showHeaderSelection, isDisabledPrev, isDisabledNext } = this.state;
        const currentDateYear = (this.props.currentDateYear)? this.props.currentDateYear : CURRENT_YEAR;
        return (
            <div className={this.getCalendarMonthClass()} style={this.props.style}>
                {
                    (showHeaderSelection)? 
                        <div className="VS-CalendarMonth VS-TextCenter">
                            {
                                (isDisabledPrev) ?
                                    <FaCaretLeft className="VS-PullLeft VS-Icon Vs-DisabledIcon" /> :
                                    <FaCaretLeft className="VS-PullLeft VS-Icon" onClick={this.props.goToPrevYear} />
                            }
                            <span className="VS-Medium-UPPER-Case VS-MonthName" onClick={this.props.goToSelectYear}>{currentDateYear}</span>
                            {
                                (isDisabledNext) ?
                                    <FaCaretRight className="VS-PullRight VS-Icon Vs-DisabledIcon" /> :
                                    <FaCaretRight className="VS-PullRight VS-Icon" onClick={this.props.goToNextYear} />
                            }
                        </div> : ''
                }
                <Fragment>
                    {this.getMonths().map((row, index) => this.renderMonthRow(row, index))}
                </Fragment>
            </div>
        );
    }
}

export default MonthsView;