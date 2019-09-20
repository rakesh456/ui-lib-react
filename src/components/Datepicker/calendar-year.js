import React, { Fragment } from "react";
import './date-picker.scss';
import {
    getYearsList
} from "../../utils/calendar";

import {
    splitArray,
    guid
} from "../../utils/utils";

class CalendarYear extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { year: new Date().getFullYear() };
    }

    onSelectHandler = (year) => {
        this.props.onYearSelect(year);
    }
    
    getYears = () => {
        const { year } = this.state;
        const _array = getYearsList(year);
        return splitArray(_array, 3);
    }

    getCalendarContainerClass = () => {
        return "VS-CalendarContainer VS-modal VS-shape-rounded-fill-for-month";
    }

    renderYearValue = (year, index) => {
        return (  
            <Fragment key={guid()}>   
                <span className='VS-MonthDay' onClick={() => this.onSelectHandler(year)}>{year}</span> 
            </Fragment>
        );
    }

    renderYearRow = (dates, index) => {
        const rows = dates.map((date, index1) => {
            return this.renderYearValue(date, index1)
        });

        return (
            <div className="VS-DateRow" key={guid()}>{rows}</div>
        )
    }

    render() {
        const { year } = this.state;
        const { selectedDate } = this.props;
        
        return (
            <div className={this.getCalendarContainerClass()} style={this.props.style}>
                <Fragment>
                    {this.getYears().map((row, index) => this.renderYearRow(row, index))}
                </Fragment>
            </div>
        );
    }
}

export default CalendarYear;