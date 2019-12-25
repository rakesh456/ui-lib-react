import React from "react";

class WeekDaysView extends React.PureComponent {

    expandWeek(weeks, yindex, qindex, mindex, windex) {
        let years = [...this.props.years];
        years[yindex]['quarters'][qindex]['months'][mindex]['weeks'][windex]['showChild'] = true;
        this.setState({
            years: [...years]
        })
    }

    collapseWeek(weeks, yindex, qindex, mindex, windex) {
        let years = [...this.props.years];
        years[yindex]['quarters'][qindex]['months'][mindex]['weeks'][windex]['showChild'] = false;
        this.setState({
            years: [...years]
        })
    }

    onCheckWeek(weeks, yindex, qindex, mindex, windex) {
        let weeksObj = {
            weeks: weeks,
            yindex: yindex,
            qindex: qindex,
            mindex: mindex,
            windex: windex,
            isCheck: true
        }
        this.props.onChangeWeeks(weeksObj);
    }

    onUnCheckWeek(weeks, yindex, qindex, mindex, windex) {
        let weeksObj = {
            weeks: weeks,
            yindex: yindex,
            qindex: qindex,
            mindex: mindex,
            windex: windex,
            isCheck: false
        }
        this.props.onChangeWeeks(weeksObj);
    }

    onCheckWeekDay(weekDays, yindex, qindex, mindex, windex, wdindex) {
        let weekDaysObj = {
            weekDays: weekDays,
            yindex: yindex,
            qindex: qindex,
            mindex: mindex,
            windex: windex,
            wdindex: wdindex,
            isCheck: true
        }
        this.props.onChangeWeekDays(weekDaysObj);

    }

    onUnCheckWeekDay(weekDays, yindex, qindex, mindex, windex, wdindex) {
        let weekDaysObj = {
            weekDays: weekDays,
            yindex: yindex,
            qindex: qindex,
            mindex: mindex,
            windex: windex,
            wdindex: wdindex,
            isCheck: false
        }
        this.props.onChangeWeekDays(weekDaysObj);

    }

    getWeekCheckBoxClass = (weeks) => {
        let flag = false;
        flag = weeks['state'] === -1 ? true : false;
        return (flag) ? 'VS-Check-Checkmark VS-Check-Partial' : 'VS-Check-Checkmark';
    }

    renderWeekDays = (weekDays, mnth, qt, row, yindex, qindex, mindex, windex, wdindex) => {
        yindex = this.props.yindex;
        qindex = this.props.qindex;
        mindex = this.props.mindex;
        return (
            <div className="VS-WeekDayRow" key={'weekDay' + yindex.toString() + qindex.toString() + mindex.toString() + windex.toString() + wdindex.toString()}>

        <label className="VS-Checkbox-Container"><div className="tooltip">{weekDays.date + " " + weekDays.day}<span className="tooltiptext">{weekDays.date}-{mnth.month}-{row.year}</span></div>

                    {
                        (weekDays.state) ?
                            <input className="VS-Checkbox" type="checkbox" checked={weekDays.state} onChange={() => this.onUnCheckWeekDay(weekDays, yindex, qindex, mindex, windex, wdindex)}></input> :
                            <input className="VS-Checkbox" type="checkbox" checked={weekDays.state} onChange={() => this.onCheckWeekDay(weekDays, yindex, qindex, mindex, windex, wdindex)}></input>
                    }

                    <span className="VS-Check-Checkmark"></span>
                </label>
            </div>
        )
    }


    renderWeeks = (weeks, mnth, qt, row, yindex, qindex, mindex, windex) => {
        yindex = this.props.yindex;
        qindex = this.props.qindex;
        mindex = this.props.mindex;
        return (
            <div className="VS-WeekRow" key={'week' + yindex.toString() + qindex.toString() + mindex.toString() + windex.toString()}>
                {
                    (weeks.showChild) ?
                        <span className="VS-week-Plus-Minus" onClick={() => this.collapseWeek(weeks, yindex, qindex, mindex, windex)}>-</span> :
                        <span className="VS-week-Plus-Minus" onClick={() => this.expandWeek(weeks, yindex, qindex, mindex, windex)} >+</span>
                }

                <label className="VS-Checkbox-Container"><div className="tooltip">{weeks.week}<span className="tooltiptext">{weeks.week}-{mnth.month}-{row.year}</span></div>

                    {
                        (weeks.state) ?
                            <input className="VS-Checkbox" type="checkbox" checked={weeks.state} onChange={() => this.onUnCheckWeek(weeks, yindex, qindex, mindex, windex)}></input> :
                            <input className="VS-Checkbox" type="checkbox" checked={weeks.state} onChange={() => this.onCheckWeek(weeks, yindex, qindex, mindex, windex)}></input>
                    }

                    <span className={this.getWeekCheckBoxClass(weeks)}></span>
                </label>
                {
                    (weeks.showChild && weeks.days) ?
                        weeks.days.map((weekDays, wdindex) => this.renderWeekDays(weekDays, mnth, qt, row, yindex, qindex, mindex, windex, wdindex)) : ''
                }
            </div>
        )
    }

    render() {
        const { options } = this.props;
        let { yindex, qindex, mindex } = this.props;
        let row = this.props.years[this.props.yindex];
        let qt = this.props.years[this.props.yindex]['quarters'][qindex];
        let mnth = this.props.years[this.props.yindex]['quarters'][qindex]['months'][mindex];
        return (
            <div options={options}>
                {mnth.weeks.map((weeks, windex) => this.renderWeeks(weeks, mnth, qt, row, yindex, qindex, mindex, windex))}
            </div>
        )

    }
}
export default WeekDaysView;