import React, { Fragment } from "react";
import calendar, {
    isSameDay,
    isSameMonth,
    isDate,
    checkDateInBetween
} from "../../../../utils/calendar";

import {
    splitArray,
    getDateDDMMYYYY,
    convertYYYYMMDD,
    guid,
    isValidDate,
    isUndefinedOrNull
} from "../../../../utils/utils";

class CalendarDays extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { current: getDateDDMMYYYY(new Date()), lowerDateLimit: new Date()};
        const options = this.props.options;
        var _lowerdate = (!isUndefinedOrNull(options) && options.lowerDateLimit && isValidDate(options.lowerDateLimit))? options.lowerDateLimit : new Date();
    
        if(_lowerdate){
            _lowerdate = new Date(_lowerdate);
            _lowerdate.setDate(_lowerdate.getDate() - 1);
        }
    
        this.state.lowerDateLimit = (!isUndefinedOrNull(_lowerdate))? _lowerdate : new Date();
    }

    dismiss() {
        this.props.onBlur();
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
        this.props.onSelect(_date);
        this.setState({
            current: new Date(_date)
        });
    }

    renderCalendarDate = (date, index) => {
        const { month, year } = this.props;
        const { current, today } = this.state;
        const options = this.props.options;
        const _date = new Date(date);
        const props = { index, title: _date.toDateString() };

        const inMonth = month && year && isSameMonth(_date, new Date([year, month, 1].join("-")));
        
        const isToday = isSameDay(_date, today);
        const isCurrent = current && isSameDay(_date, new Date(convertYYYYMMDD(current, options)));

        // const lowerDateLimit = (options && options.lowerDateLimit)? ((isValidDate(options.lowerDateLimit))? options.lowerDateLimit : null) : (options.lowerDateLimit !== null)? new Date() : null;

        const upperDateLimit = (options && options.upperDateLimit)? ((isValidDate(options.upperDateLimit))? options.upperDateLimit : null) : null;
        const isEnabled = (isToday || checkDateInBetween(_date, this.state.lowerDateLimit, upperDateLimit));

        const dayClassName = (isCurrent) ? 'VS-DaySelected' : ((isToday) ? 'VS-DayCurrent' : 'VS-NormalDay');
        const padClassName = (_date.getDate() <= 9)? 'VS-PadExtra' : '';

        return (  
            <Fragment key={guid()}>   
                {
                    (isEnabled)?
                        <div {...props} className={this.getClassName(props.index)} onClick={() => this.selectDate(_date)}>
                            {
                                (inMonth) ?
                                    <span className={`VS-CalDay ${dayClassName} ${padClassName}`}>{_date.getDate()}</span>
                                    :
                                    <span className={`VS-NextPrevDay ${padClassName}`}>{_date.getDate()}</span>
                            }                
                        </div> 
                        :
                        <div {...props} className={this.getClassName(props.index)}>
                            <span className='VS-DisabledDay'>{_date.getDate()}</span>
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
            <div className="VS-DateRow" key={guid()}>{rows}</div>
        )
    }

    getClassName = (index) => {
        return (index % 6 === 0) ? 'VS-Day VS-Medium-UPPER-Case VS-DayStart' : 'VS-Day VS-Medium-UPPER-Case';
    }

    render() {
        // const { selectedDate } = this.props;
        return (
            <div className="VS-CalendarDay">
                <Fragment>
                    {this.getCalendarDates().map((row, index) => this.renderCalendarRow(row, index))}
                </Fragment>
            </div>
        );
    }
 
}

export default CalendarDays;