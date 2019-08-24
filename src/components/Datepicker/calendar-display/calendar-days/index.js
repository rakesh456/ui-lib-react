import React, { Fragment } from "react";
import calendar, {
    getIsoDate,
    isSameDay,
    isSameMonth,
    checkDateInBetween
} from "../../../../utils/calendar";

import {
    getStaticDays,
    splitArray,
    getDateDDMMYYYY,
    convertYYYYMMDD
} from "../../../../utils/utils";
import { isDate } from "util";

class CalendarDays extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { current: getDateDDMMYYYY(new Date())};
    }
    
    componentDidMount() {
        this.setState({
            current: this.props.selectedDate
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedDate === this.state.current) {
            this.setState({
                current: this.props.selectedDate
            });
        }
    }

    getCalendarDates = () => {
        const { month, year } = this.props;
        const { current } = this.state;
        const calendarMonth = month || +current.getMonth() + 1;
        const calendarYear = year || current.getFullYear();
        
        return splitArray(calendar(calendarMonth, calendarYear), 7);
        // return splitArray(getStaticDays(), 7);
    };

    selectDate = (_date) => {
        this.setState({
            current: new Date(_date)
        });
        this.props.changeSelectedDate(_date);
    }

    renderCalendarDate = (date, index) => {
        const { month, year } = this.props;
        const { current, today } = this.state;
        const _date = new Date(date);
        const props = { index, title: _date.toDateString() };

        const inMonth = month && year && isSameMonth(_date, new Date([year, month, 1].join("-")));
        
        const isToday = isSameDay(_date, today);
        const isCurrent = current && isSameDay(_date, new Date(convertYYYYMMDD(current)));

        const options = this.props.options;
        let lowerDateLimit = (options && options.lowerDateLimit)? ((isDate(options.lowerDateLimit))? options.lowerDateLimit : null) : (options.lowerDateLimit !== null)? new Date() : null;
        let upperDateLimit = (options && options.upperDateLimit)? ((isDate(options.upperDateLimit))? options.upperDateLimit : null) : null;
        const isEnabled = (isToday || checkDateInBetween(_date, lowerDateLimit, upperDateLimit))

        return (  
            <Fragment>     
                {
                    (isEnabled)?
                        <div key={getIsoDate(_date)} {...props} className={this.getClassName(props.index)} onClick={() => this.selectDate(_date)}>
                            {
                                (inMonth) ?
                                    <span className={(isCurrent) ? 'DaySelected' : ((isToday) ? 'DayCurrent' : 'NormalDay')}>{_date.getDate()}</span>
                                    :
                                    <span className='NextPrevDay'>{_date.getDate()}</span>
                            }                
                        </div> 
                        :
                        <div key={getIsoDate(_date)} {...props} className={this.getClassName(props.index)}>
                            <span className='DisabledDay'>{_date.getDate()}</span>
                        </div>
                } 
            </Fragment>
        );
    }

    renderCalendarRow = (dates, index) => {
        const rows = dates.map((date, index1) => {
            return this.renderCalendarDate(date, index1)
        });

        return (
            <div className="DateRow" key={getIsoDate(new Date()) + index + 1}>{rows}</div>
        )
    }

    getClassName = (index) => {
        return (index % 6 === 0) ? 'Day Medium-UPPER-Case DayStart' : 'Day Medium-UPPER-Case';
    }

    render() {
        // const { selectedDate } = this.props;
        return (
            <div className="CalendarDay">
                <Fragment>
                    {this.getCalendarDates().map((row, index) => this.renderCalendarRow(row, index))}
                </Fragment>
            </div>
        );
    }
 
}

export default CalendarDays;