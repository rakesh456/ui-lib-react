import React from "react";

class DaysView extends React.PureComponent {

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
                    <span className="VS-Check-Checkmark1">{days.state}</span>
                </label>
            </div>
        )
    }

    render() {
        const { options } = this.props;
        let row = this.props.row;
        let qt = this.props.qt;
        let mnth = this.props.mnth;
        return (
            <div options={options} >
                {mnth.days.map((days, dindex) => this.renderDays(days, mnth, qt, row, dindex))}
            </div>
        )
    }
}
export default DaysView;