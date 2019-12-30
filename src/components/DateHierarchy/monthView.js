import React from "react";
import WeekDaysView from "./weekDaysView";

class MonthView extends React.PureComponent {

    expandMonth(mnth) {
        let years = [...this.props.years];
        mnth['showChild'] = true;
        this.setState({
            years: [...years]
        })
    }

    collapseMonth(mnth) {
        let years = [...this.props.years];
        mnth['showChild'] = false;
        this.setState({
            years: [...years]
        })
    }

    onCheckMonth(mnth, qt, row) {
        let monthObj = {
            row: row,
            qt:qt,
            mnth: mnth,
            isCheck: true
        }
        this.props.onChangeMonth(monthObj);
    }

    onUnCheckMonth(mnth, qt, row) {
        let monthObj = {
            row: row,
            qt:qt,
            mnth: mnth,
            isCheck:false
        }
        this.props.onChangeMonth(monthObj);
    }

    onCheckDay(days, mnth, qt, row) {
        let daysObj = {
            days: days,
            mnth: mnth,
            qt: qt,
            row: row,
            isCheck: true
        }
        this.props.onChangeDay(daysObj);
    }

    onUnCheckDay(days, mnth, qt, row) {
        let daysObj = {
            days: days,
            mnth: mnth,
            qt: qt,
            row: row,
            isCheck: false
        }
        this.props.onChangeDay(daysObj);
    }

    onChangeWeeks = (weeksObj) => {
        this.props.onChangeWeeks(weeksObj);
    }

    onChangeWeekDays = (weekDaysObj) => {
        this.props.onChangeWeekDays(weekDaysObj);
    }

    getMonthCheckBoxClass = (mnth) => {
        let flag = false;
        flag = mnth['state'] === -1 ? true : false;
        return (flag) ? 'VS-Check-Checkmark VS-Check-Partial' : 'VS-Check-Checkmark';
    }

    renderDays = (days, mnth, qt, row, dindex) => {
        return (
            <div className="VS-DayRow" key={'day' + dindex}>

                <label className="VS-Checkbox-Container"><div className="VS-Tooltip">{days.day}<span className="VS-Tooltiptext">{days.day}-{mnth.month}-{row.year}</span></div>

                    {
                        (days.state) ?
                            <input className="VS-Checkbox" type="checkbox" checked={days.state} onChange={() => this.onUnCheckDay(days, mnth, qt, row)}></input> :
                            <input className="VS-Checkbox" type="checkbox" checked={days.state} onChange={() => this.onCheckDay(days, mnth, qt, row)}></input>
                    }

                    <span className="VS-Check-Checkmark"></span>
                </label>
            </div>
        )
    }

    renderMonths = (mnth, qt, row, mindex) => {
        let { options } = this.props;
            return (
                <div className="VS-MonthRow" key={'month' + mindex}>
                    {
                        (mnth.showChild) ?
                            <span className="VS-Month-Plus-Minus" onClick={() => this.collapseMonth(mnth)}>-</span> :
                            <span className="VS-Month-Plus-Minus" onClick={() => this.expandMonth(mnth)} >+</span>
                    }
                    <label className="VS-Checkbox-Container"><div className="VS-Tooltip">{mnth.month}<span className="VS-Tooltiptext">{mnth.month}-{row.year}</span></div>
                        {
                            (mnth.state) ?
                                <input className="VS-Checkbox" type="checkbox" checked={mnth.state} onChange={() => this.onUnCheckMonth(mnth, qt, row)}></input> :
                                <input className="VS-Checkbox" type="checkbox" checked={mnth.state} onChange={() => this.onCheckMonth(mnth, qt, row)}></input>
                        }
                        <span className={this.getMonthCheckBoxClass(mnth)}></span>
                    </label>
                    {(mnth.showChild && (mnth.weeks || mnth.days)) ?
                        options.showWeeks ?
                            <WeekDaysView options={options} years={this.props.years} row={row} qt={qt} mnth={mnth} onChangeWeeks={this.onChangeWeeks} onChangeWeekDays={this.onChangeWeekDays}></WeekDaysView> : 
                            <div options={options}>{mnth.days.map((days, dindex) => this.renderDays(days, mnth, qt, row, dindex))}</div> : ''
                    }

                </div>
            )
        }

    render() {
        const { options } = this.props;
        let row = this.props.row;
        if (options.showQuarters === true) {
            let qt = this.props.qt;
            return (
                <div options={options}>
                    {qt.months.map((mnth, mindex) => this.renderMonths(mnth, qt, row, mindex))}
                </div>
            )
        }
        else {
            return (
                <div>
                    {row.months.map((mnth, mindex) => this.renderMonths(mnth, -1, row, mindex))}
                </div>
            )
        }
    }
}
export default MonthView;