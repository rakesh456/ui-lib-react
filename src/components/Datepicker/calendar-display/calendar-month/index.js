

import React from "react";
import { getMonthNameByIndex } from '../../../../utils/utils';
import { FaCaretLeft, FaCaretRight } from 'react-icons/lib/fa';

class CalendarMonth extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    componentDidUpdate(prevProps) {}


    render() {
        const { month, year } = this.props;
        return (
            <div className="CalendarMonth TextCenter">
                <FaCaretLeft className="PullLeft Icon" onClick={this.props.goToPrevMonth} />
                    <span className="Medium-UPPER-Case MonthName">{getMonthNameByIndex(month - 1)} {year}</span>
                <FaCaretRight className="PullRight Icon" onClick={this.props.goToNextMonth} />
            </div>
        );
    }
}

export default CalendarMonth;