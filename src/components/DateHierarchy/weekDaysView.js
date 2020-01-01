import React from "react";

class WeekDaysView extends React.PureComponent {

    expandWeek(weeks) {
        let years = [...this.props.years];
        weeks['showChild'] = true;
        this.setState({
            years: [...years]
        })
    }

    collapseWeek(weeks) {
        let years = [...this.props.years];
        weeks['showChild'] = false;
        this.setState({
            years: [...years]
        })
    }

    onCheckWeek(weeks, mnth, qt, row) {
        let weeksObj = {
            weeks: weeks,
            mnth: mnth,
            qt: qt,
            row: row,
            isCheck: true
        }
        this.props.onChangeWeeks(weeksObj);
    }

    onUnCheckWeek(weeks, mnth, qt, row) {
        let weeksObj = {
            weeks: weeks,
            mnth: mnth,
            qt: qt,
            row: row,
            isCheck: false
        }
        this.props.onChangeWeeks(weeksObj);
    }

    onCheckWeekDay(days, weeks, mnth, qt, row) {
        let weekDaysObj = {
            days: days,
            weeks: weeks,
            mnth: mnth,
            qt: qt,
            row: row,
            isCheck: true
        }
        this.props.onChangeWeekDays(weekDaysObj);
    }

    onUnCheckWeekDay(days, weeks, mnth, qt, row) {
        let weekDaysObj = {
            days: days,
            weeks: weeks,
            mnth: mnth,
            qt: qt,
            row: row,
            isCheck: false
        }
        this.props.onChangeWeekDays(weekDaysObj);
    }

    getWeekCheckBoxClass = (weeks) => {
        let flag = false;
        flag = weeks['state'] === -1 ? true : false;
        return (flag) ? 'VS-Check-Checkmark VS-Check-Partial' : 'VS-Check-Checkmark';
    }

    renderWeekDays = (days, weeks, mnth, qt, row, wdindex) => {
        return (
            <div className="VS-WeekDayRow" key={'day' + wdindex}>

                <label className="VS-Checkbox-Container"><div className="VS-Tooltip">{days.date + " " + days.day}<span className="VS-Tooltiptext">{days.date}-{mnth.month}-{row.year}</span></div>

                    {
                        (days.state) ?
                            <input className="VS-Checkbox" type="checkbox" checked={days.state} onChange={() => this.onUnCheckWeekDay(days, weeks, mnth, qt, row)}></input> :
                            <input className="VS-Checkbox" type="checkbox" checked={days.state} onChange={() => this.onCheckWeekDay(days, weeks, mnth, qt, row)}></input>
                    }

                    <span className="VS-Check-Checkmark"></span>
                </label>
            </div>
        )
    }

    renderWeeks = (weeks, mnth, qt, row, windex) => {
        return (
            <div className="VS-WeekRow" key={'week' + windex}>
                {
                    (weeks.showChild) ?
                        <span className="VS-week-Plus-Minus" onClick={() => this.collapseWeek(weeks)}>-</span> :
                        <span className="VS-week-Plus-Minus" onClick={() => this.expandWeek(weeks)} >+</span>
                }

                <label className="VS-Checkbox-Container"><div className="VS-Tooltip">{weeks.week}<span className="VS-Tooltiptext">{weeks.week}-{mnth.month}-{row.year}</span></div>

                    {
                        (weeks.state) ?
                            <input className="VS-Checkbox" type="checkbox" checked={weeks.state} onChange={() => this.onUnCheckWeek(weeks, mnth, qt, row)}></input> :
                            <input className="VS-Checkbox" type="checkbox" checked={weeks.state} onChange={() => this.onCheckWeek(weeks, mnth, qt, row)}></input>
                    }

                    <span className={this.getWeekCheckBoxClass(weeks)}></span>
                </label>
                {
                    (weeks.showChild && weeks.days) ?
                        weeks.days.map((days, wdindex) => this.renderWeekDays(days, weeks, mnth, qt, row, wdindex)) : ''
                }
            </div>
        )
    }

    render() {
        const { options } = this.props;
        let row = this.props.row;
        let qt = this.props.qt;
        let mnth = this.props.mnth;
        if (this.props.options && this.props.options.showQuarters === true) {
            return (
                <div options={options}>
                    {mnth.weeks.map((weeks, windex) => this.renderWeeks(weeks, mnth, qt, row, windex))}
                </div>
            )
        } else {
            return (
                <div options={options}>
                    {mnth.weeks.map((weeks, windex) => this.renderWeeks(weeks, mnth, -1, row, windex))}
                </div>
            )
        }
    }
}
export default WeekDaysView;