import React, { Fragment } from "react";
import { FaCaretLeft, FaCaretRight } from 'react-icons/lib/fa';
import {
    QUARTERS_NAMES,
    isEqual,
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
import * as CONSTANTS from '../../../utils/constants'

class QuartersView extends React.PureComponent {
    constructor(props) {
        super(props);
        const { options, showHeaderSelection } = this.props;
        const { lowerYearLimit } = getYYYYForLowerLimit(options);
        const { upperYearLimit } = getYYYYForUpperLimit(options);
        const currentDateYear = (this.props.currentDateYear)? this.props.currentDateYear : CURRENT_YEAR;
        const year = parseInt(currentDateYear);
        this.state = { sDisabledNext: (year >= upperYearLimit) ? true : false, isDisabledPrev: (year <= lowerYearLimit) ? true : false, showHeaderSelection: (showHeaderSelection === true), year: year, currentDateYear: year};
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
        this.setState({ isDisabledNext: (year >= upperYearLimit) ? true : false, isDisabledPrev: (year <= lowerYearLimit) ? true : false, year: year });
    }
    
    onSelectQuarterHandler = (quarter) => {
        this.props.onSelectQuarter(quarter);
    }
    
    getQuarters = () => {
        return splitArray(QUARTERS_NAMES, 2);
    }

    getCalendarQuartersClass = () => {
        return `${CONSTANTS.CLASSES.VS_CALENDAR_CONTAINER} ${CONSTANTS.CLASSES.VS_MODAL} ${CONSTANTS.CLASSES.VS_SHAPE_ROUNDED_FILL_FOR_QUARTER}`;
    }
    
    checkQQIsEnabled = (qqmm, year) => {
        const {options} = this.props;
        const {disabledList, displayFormat} = options;
        const { lowerMonthLimit, lowerYearLimit } = getYYYYForLowerLimit(options);
        const { upperMonthLimit, upperYearLimit } = getYYYYForUpperLimit(options);
        const currentDateYear = (this.props.currentDateYear)? this.props.currentDateYear : CURRENT_YEAR;

        if(qqmm && year){
            qqmm = (isMMYYYYFormat(displayFormat))? getMonthIndex(qqmm.toString()) : qqmm;
            const _val = qqmm + '/' + year;

            let _q = parseInt(qqmm.charAt(1));
            let _lowerQ = (lowerMonthLimit)? parseInt(lowerMonthLimit.charAt(1)) : 0;
            let _upperQ = (upperMonthLimit)? parseInt(upperMonthLimit.charAt(1)) : 0;

            // Disabled lower limit and upper limit month
            if(((parseInt(currentDateYear) === lowerYearLimit && _q < parseInt(_lowerQ)) || (parseInt(currentDateYear) === upperYearLimit && _q > parseInt(_upperQ)))){
                return false;
            }

            return (disabledList && disabledList.length > 0 && _val)? ((disabledList.indexOf(_val.toString()) !== -1)? false : true) : true;
        } else {
            return true;
        }
    }

    renderQuarterValue = (quarter, index) => {
        const { lowerMonthLimit, upperMonthLimit, lowerYearLimit, upperYearLimit, year, currentDateYear } = this.state;
        const _l = (lowerMonthLimit)? parseInt(lowerMonthLimit.charAt(1)) : 1;
        const _u = (upperMonthLimit)? parseInt(upperMonthLimit.charAt(1)) : 4;
        const _q = parseInt(quarter.charAt(1));
        const isEnabled = this.checkQQIsEnabled(quarter, year);

        const activeClass = (isEqual(this.props.currentDateMMMQQ, quarter) && isEqual(year, currentDateYear) && isEnabled) ? 'VS-Active' : '';
        
        return (
            <Fragment key={guid()}>
                {
                    ((lowerMonthLimit && lowerYearLimit && lowerYearLimit === year && _q < _l) || (upperMonthLimit && upperYearLimit && upperYearLimit === year && _q > _u) || (!isEnabled)) ?
                        <span className={`${CONSTANTS.CLASSES.VS_MONTH_QUARTER} ${CONSTANTS.CLASSES.VS_DISABLED}`}>{quarter}</span>:
                        <span className={`${activeClass} ${CONSTANTS.CLASSES.VS_MONTH_QUARTER}`} onClick={() => this.onSelectQuarterHandler(quarter)}>{quarter}</span>
                }
            </Fragment>
        );
    }

    renderQuarterRow = (quarters, index) => {
        const rows = quarters.map((date, index1) => {
            return this.renderQuarterValue(date, index1)
        });

        return (
            <div className={`${CONSTANTS.CLASSES.VS_DATE_ROW_FLEX}`} key={guid()}>{rows}</div>
        )
    }

    render() {
        const { showHeaderSelection, isDisabledPrev, isDisabledNext } = this.state;
        const currentDateYear = (this.props.currentDateYear)? this.props.currentDateYear : CURRENT_YEAR;
        
        return (
            <div className={this.getCalendarQuartersClass()} style={this.props.style}>
                {
                    (showHeaderSelection)? 
                        <div className={`${CONSTANTS.CLASSES.VS_CALENDAR_MONTH} ${CONSTANTS.CLASSES.VS_TEXT_CENTER}`}>
                            {
                                (isDisabledPrev) ?
                                    <FaCaretLeft className={`${CONSTANTS.CLASSES.VS_PULL_LEFT} ${CONSTANTS.CLASSES.VS_ICON} ${CONSTANTS.CLASSES.VS_DISABLED_ICON}`} /> :
                                    <FaCaretLeft className={`${CONSTANTS.CLASSES.VS_PULL_LEFT} ${CONSTANTS.CLASSES.VS_ICON}`} onClick={this.props.goToPrevYear} />
                            }
                            <span className={`${CONSTANTS.CLASSES.VS_MED_UPPER_CASE} ${CONSTANTS.CLASSES.VS_MONTH_NAME}`} onClick={this.props.goToSelectYear}>{currentDateYear}</span>
                            {
                                (isDisabledNext) ?
                                    <FaCaretRight className={`${CONSTANTS.CLASSES.VS_PULL_RIGHT} ${CONSTANTS.CLASSES.VS_ICON} ${CONSTANTS.CLASSES.VS_DISABLED_ICON}`} /> :
                                    <FaCaretRight className={`${CONSTANTS.CLASSES.VS_PULL_RIGHT} ${CONSTANTS.CLASSES.VS_ICON}`} onClick={this.props.goToNextYear} />
                            }
                        </div> : ''
                }
                <Fragment>
                    {this.getQuarters().map((row, index) => this.renderQuarterRow(row, index))}
                </Fragment>
            </div>
        );
    }
}

export default QuartersView;