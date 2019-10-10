import React from "react";
import { getMonthNameByIndex, getUpperLimitFromOptions, getProperFormattedDate, getLowerLimitFromOptions } from '../../../utils/calendar';
import { isUndefinedOrNull } from '../../../utils/utils';
import { FaCaretLeft, FaCaretRight } from 'react-icons/lib/fa';

class Month extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    componentDidUpdate(prevProps) {
    }

    isDisableNextMonth = () => {
        const { month, year, options } = this.props;
        const upperLimit = getUpperLimitFromOptions(options);
        if(isUndefinedOrNull(upperLimit)){
            return false;
        } else {
            const _month = (getProperFormattedDate(upperLimit, options).getMonth()) + 1;
            const _year = (getProperFormattedDate(upperLimit, options).getFullYear());
            return (month === _month && year === _year);
        }
    }
    
    isDisablePrevMonth = () => {
        const { month, year, options } = this.props;
        const lowerLimit = getLowerLimitFromOptions(options);
        if(isUndefinedOrNull(lowerLimit)){
            return false;
        } else {
            const _month = getProperFormattedDate(lowerLimit, options).getMonth() + 1;
            const _year = getProperFormattedDate(lowerLimit, options).getFullYear();
            return (month === _month && year === _year);
        }
    }


    render() {
        const { month, year } = this.props;

        return (
            <div className="VS-CalendarMonth VS-TextCenter">
                {
                    (this.isDisablePrevMonth())?
                    <FaCaretLeft className="VS-PullLeft VS-Icon Vs-DisabledIcon" />:
                    <FaCaretLeft className="VS-PullLeft VS-Icon" onClick={this.props.goToPrevMonth} />
                }
                    <span className="VS-Medium-UPPER-Case VS-MonthName">{getMonthNameByIndex(month - 1)} {year}</span>
                {
                    (this.isDisableNextMonth())?
                    <FaCaretRight className="VS-PullRight VS-Icon Vs-DisabledIcon" />:
                    <FaCaretRight className="VS-PullRight VS-Icon" onClick={this.props.goToNextMonth} />
                }                    
            </div>
        );
    }
}

export default Month;