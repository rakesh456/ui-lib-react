import React from "react";
import WeekDaysView from "./weekDaysView";

class MonthView extends React.PureComponent {

    expandMonth(month) {
        let years = [...this.props.years];
        month['showChild'] = true;
        this.setState({
            years: [...years]
        })
    }

    collapseMonth(month) {
        let years = [...this.props.years];
        month['showChild'] = false;
        this.setState({
            years: [...years]
        })
    }

    onCheckMonth(month, quarter, year) {
        let monthObj = {
            year: year,
            quarter:quarter,
            month: month,
            isCheck: true
        }
        this.props.onChangeMonth(monthObj);
    }

    onUnCheckMonth(month, quarter, year) {
        let monthObj = {
            year: year,
            quarter:quarter,
            month: month,
            isCheck:false
        }
        this.props.onChangeMonth(monthObj);
    }

    onToggleDay(day, month, quarter, year, isCheck) {
        let dayObj = {
            day: day,
            month: month,
            quarter: quarter,
            year: year,
            isCheck: true
        }
        this.props.onChangeDay(dayObj);
    }

    onChangeWeek = (weekObj) => {
        this.props.onChangeWeek(weekObj);
    }

    onChangeWeekDay = (weekDaysObj) => {
        this.props.onChangeWeekDay(weekDaysObj);
    }

    getMonthCheckBoxClass = (month) => {
        let flag = false;
        flag = month['state'] === -1 ? true : false;
        return (flag) ? 'VS-Check-Checkmark VS-Check-Partial' : 'VS-Check-Checkmark';
    }

    renderDays = (day, month, quarter, year, dayIndex) => {
        return (
            <div className="VS-Dayyear" key={'day' + dayIndex}>

                <label className="VS-Checkbox-Container"><div className="VS-Tooltip">{day.day}<span className="VS-Tooltiptext">{day.day}-{month.month}-{year.year}</span></div>

                    {
                        (day.state) ?
                            <input className="VS-Checkbox" type="checkbox" checked={day.state} onChange={() => this.onToggleDay(day, month, quarter, year, false)}></input> :
                            <input className="VS-Checkbox" type="checkbox" checked={day.state} onChange={() => this.onToggleDay(day, month, quarter, year, true)}></input>
                    }

                    <span className="VS-Check-Checkmark"></span>
                </label>
            </div>
        )
    }

    renderMonths = (month, quarter, year, mindex) => {
        let { options } = this.props;
            return (
                <div className="VS-Monthyear" key={'month' + mindex}>
                    {
                        (month.showChild) ?
                            <span className="VS-Month-Plus-Minus" onClick={() => this.collapseMonth(month)}>-</span> :
                            <span className="VS-Month-Plus-Minus" onClick={() => this.expandMonth(month)} >+</span>
                    }
                    <label className="VS-Checkbox-Container"><div className="VS-Tooltip">{month.month}<span className="VS-Tooltiptext">{month.month}-{year.year}</span></div>
                        {
                            (month.state) ?
                                <input className="VS-Checkbox" type="checkbox" checked={month.state} onChange={() => this.onUnCheckMonth(month, quarter, year)}></input> :
                                <input className="VS-Checkbox" type="checkbox" checked={month.state} onChange={() => this.onCheckMonth(month, quarter, year)}></input>
                        }
                        <span className={this.getMonthCheckBoxClass(month)}></span>
                    </label>
                    {(month.showChild && (month.weeks || month.days)) ?
                        options.showWeeks ?
                            <WeekDaysView options={options} years={this.props.years} year={year} quarter={quarter} month={month} onChangeWeek={this.onChangeWeek} onChangeWeekDay={this.onChangeWeekDay}></WeekDaysView> : 
                            <div options={options}>{month.days.map((days, dayIndex) => this.renderDays(days, month, quarter, year, dayIndex))}</div> : ''
                    }

                </div>
            )
        }

    render() {
        const { options } = this.props;
        let year = this.props.year;
        if (options.showQuarters === true) {
            let quarter = this.props.quarter;
            return (
                <div options={options}>
                    {quarter.months.map((month, mindex) => this.renderMonths(month, quarter, year, mindex))}
                </div>
            )
        }
        else {
            return (
                <div>
                    {year.months.map((month, mindex) => this.renderMonths(month, -1, year, mindex))}
                </div>
            )
        }
    }
}
export default MonthView;