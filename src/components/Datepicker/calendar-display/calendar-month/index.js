

import React from "react";
import { getMonthNameByIndex } from '../../../../utils/utils';
import { FaCaretLeft, FaCaretRight } from 'react-icons/lib/fa';

class Calendarmonth extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {month: new Date().getMonth(), year: new Date().getFullYear() };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps) {}

    render() {
        const { month, year } = this.state;
        return (
            <div className="CalendarMonth TextCenter">
                <FaCaretLeft className="PullLeft Icon" />
                {getMonthNameByIndex(month)} {year}
                <FaCaretRight className="PullRight Icon" />
            </div>
        );
    }
}

export default Calendarmonth;