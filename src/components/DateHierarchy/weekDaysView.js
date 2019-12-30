import React from "react";

class WeekDaysView extends React.PureComponent {

    expandWeek(week) {
        let years = [...this.props.years];
        week['showChild'] = true;
        this.setState({
            years: [...years]
        })
    }

    collapseWeek(week) {
        let years = [...this.props.years];
        week['showChild'] = false;
        this.setState({
            years: [...years]
        })
    }

    onCheckWeek(week, month, quarter, year) {
        let weekObj = {
            week: week,
            month: month,
            quarter: quarter,
            year: year,
            isCheck: true
        }
        this.props.onChangeWeeks(weekObj);
    }

    onUnCheckWeek(week, month, quarter, year) {
        let weekObj = {
            week: week,
            month: month,
            quarter: quarter,
            year: year,
            isCheck: false
        }
        this.props.onChangeWeek(weekObj);
    }

    onCheckWeekDay(day, week, month, quarter, year) {
        let weekDayObj = {
            day: day,
            week: week,
            month: month,
            quarter: quarter,
            year: year,
            isCheck: true
        }
        this.props.onChangeWeekDay(weekDayObj);
    }

    onUnCheckWeekDay(day, week, month, quarter, year) {
        let weekDayObj = {
            day: day,
            week: week,
            month: month,
            quarter: quarter,
            year: year,
            isCheck: false
        }
        this.props.onChangeWeekDay(weekDayObj);
    }

    getWeekCheckBoxClass = (week) => {
        let flag = false;
        flag = week['state'] === -1 ? true : false;
        return (flag) ? 'VS-Check-Checkmark VS-Check-Partial' : 'VS-Check-Checkmark';
    }

    renderWeekDays = (day, week, month, quarter, year, weekDayIndex) => {
        return (
            <div className="VS-WeekDayRow" key={'day' + weekDayIndex}>

                <label className="VS-Checkbox-Container"><div className="VS-Tooltip">{day.date + " " + day.day}<span className="VS-Tooltiptext">{day.date}-{month.month}-{year.year}</span></div>

                    {
                        (day.state) ?
                            <input className="VS-Checkbox" type="checkbox" checked={day.state} onChange={() => this.onUnCheckWeekDay(day, week, month, quarter, year)}></input> :
                            <input className="VS-Checkbox" type="checkbox" checked={day.state} onChange={() => this.onCheckWeekDay(day, week, month, quarter, year)}></input>
                    }

                    <span className="VS-Check-Checkmark"></span>
                </label>
            </div>
        )
    }

    renderWeeks = (week, month, quarter, year, windex) => {
        return (
            <div className="VS-WeekRow" key={'week' + windex}>
                {
                    (week.showChild) ?
                        <span className="VS-week-Plus-Minus" onClick={() => this.collapseWeek(week)}>-</span> :
                        <span className="VS-week-Plus-Minus" onClick={() => this.expandWeek(week)} >+</span>
                }

                <label className="VS-Checkbox-Container"><div className="VS-Tooltip">{week.week}<span className="VS-Tooltiptext">{week.week}-{month.month}-{year.year}</span></div>

                    {
                        (week.state) ?
                            <input className="VS-Checkbox" type="checkbox" checked={week.state} onChange={() => this.onUnCheckWeek(week, month, quarter, year)}></input> :
                            <input className="VS-Checkbox" type="checkbox" checked={week.state} onChange={() => this.onCheckWeek(week, month, quarter, year)}></input>
                    }

                    <span className={this.getWeekCheckBoxClass(week)}></span>
                </label>
                {
                    (week.showChild && week.days) ?
                        week.days.map((day, weekDayIndex) => this.renderWeekDays(day, week, month, quarter, year, weekDayIndex)) : ''
                }
            </div>
        )
    }

    render() {
        const { options } = this.props;
        let year = this.props.year;
        let quarter = this.props.quarter;
        let month = this.props.month;
        if (this.props.options && this.props.options.showQuarters === true) {
            return (
                <div options={options}>
                    {month.weeks.map((week, windex) => this.renderWeeks(week, month, quarter, year, windex))}
                </div>
            )
        } else {
            return (
                <div options={options}>
                    {month.week.map((week, windex) => this.renderWeeks(week, month, -1, year, windex))}
                </div>
            )
        }
    }
}
export default WeekDaysView;