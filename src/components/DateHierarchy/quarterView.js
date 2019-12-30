import React from "react";
import MonthView from "./monthView";

class QuarterView extends React.PureComponent {

    expandQuarter(qt) {
        let years = [...this.props.years];
        qt['showChild'] = true;
        this.setState({
            years: [...years]
        })
    }

    collapseQuarter(qt) {
        let years = [...this.props.years];
        qt['showChild'] = false;
        this.setState({
            years: [...years]
        })
    }

    onCheckQuarter(qt, row) {
        let quarterObj = {
            qt: qt,
            row: row,
            isCheck: true
        }
        this.props.onChangeQuarter(quarterObj);
    }


    onUnCheckQuarter(qt, row) {
        let quarterObj = {
            qt: qt,
            row: row,
            isCheck: false
        }
        this.props.onChangeQuarter(quarterObj);
    }

    getQuarterCheckBoxClass = (qt) => {
        let flag = false;
        flag = (qt.state === -1) ? true: false;
        return (flag) ? 'VS-Check-Checkmark VS-Check-Partial' : 'VS-Check-Checkmark';

    }

    onChangeMonthHandler = (monthObj) => {
        this.props.onChangeMonth(monthObj);
    }

    onChangeDayHandler = (daysObj) => {
        this.props.onChangeDay(daysObj);
    }

    onChangeWeeks = (weeksObj) => {
        this.props.onChangeWeeks(weeksObj);
    }

    onChangeWeekDays = (weekDaysObj) => {
        this.props.onChangeWeekDays(weekDaysObj);
    }

    renderQuarter = (qt, row, qindex) => {
        let { options } = this.props;
        return (
            <div className="VS-QuarterRow" key={'quarter' +qindex }>
                {
                    (qt.showChild) ?
                        <span className="VS-Quarter-Plus-Minus" onClick={() => this.collapseQuarter(qt)}>-</span> :
                        <span className="VS-Quarter-Plus-Minus" onClick={() => this.expandQuarter(qt)}>+</span>
                }
                <label className="VS-Checkbox-Container"><div className="VS-Tooltip">{qt.quarter}<span className="VS-Tooltiptext">{qt.quarter}-{row.year}</span></div>
                    {
                        (qt.state) ?
                            <input className="VS-Checkbox" type="checkbox" checked={qt.state} onChange={() => this.onUnCheckQuarter(qt, row)}></input> :
                            <input className="VS-Checkbox" type="checkbox" checked={qt.state} onChange={() => this.onCheckQuarter(qt, row)}></input>
                    }
                    <span className={this.getQuarterCheckBoxClass(qt)}></span>
                </label>
                {
                    (qt.showChild && qt.months) ?
                        <MonthView options={options} years={this.props.years} qt={qt} row={row}onChange={this.onChangeHandler} onChangeMonth={this.onChangeMonthHandler} onChangeDay={this.onChangeDayHandler} onChangeWeeks={this.onChangeWeeks} onChangeWeekDays={this.onChangeWeekDays}></MonthView>
                        : ''
                }

            </div>

        )
    }

    render() {
        const { options } = this.props;
        let row = this.props.row;
        return (
            <div options={options} onChange={this.props.onChangeHandler}>
                {
                    row.quarters.map((qt, qindex) => this.renderQuarter(qt, row, qindex ))
                }
            </div>
        )

    }
}
export default QuarterView;