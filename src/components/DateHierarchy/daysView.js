import React from "react";

class DaysView extends React.PureComponent {
    
    onCheckDay(days, mnth, qt, row, yindex, qindex, mindex, dindex){
        let daysObj = {
            days: days,
            yindex: yindex,
            qindex: qindex,
            mindex: mindex,
            dindex: dindex,
            isCheck: true
        }
        this.props.onChangeDays(daysObj);
    }

    onUnCheckDay(days, mnth, qt, row, yindex, qindex, mindex, dindex){
        let daysObj = {
            days: days,
            yindex: yindex,
            qindex: qindex,
            mindex: mindex,
            dindex: dindex,
            isCheck: false
        }
        this.props.onChangeDays(daysObj);
    }

    renderDays = (days, mnth, qt, row, yindex, qindex, mindex, dindex) =>{
        yindex = this.props.yindex;
        qindex = this.props.qindex;
        mindex = this.props.mindex;
            return (
            <div className="VS-DayRow" key={'day' + dindex.toString() + mindex.toString() + qindex.toString() + yindex.toString()}>
               
           <label className="VS-Checkbox-Container">{days.day}

                {
                     (days.state) ? 
                    <input className="VS-Checkbox" type="checkbox" checked={days.state} onChange={ () => this.onUnCheckDay(days, mnth, qt, row, yindex, qindex, mindex, dindex)}></input>:
                    <input className="VS-Checkbox" type="checkbox" checked={days.state} onChange={ () => this.onCheckDay(days, mnth, qt, row, yindex, qindex, mindex, dindex)}></input>
                }
                
                <span className="VS-Check-Checkmark"></span>
                </label>
            </div>
        )
    }
    
    render() {
        const {options} = this.props;
        let {yindex, qindex, mindex} = this.props;
        let row = this.props.years[this.props.yindex];
        let qt = this.props.years[this.props.yindex]['quarters'][this.props.qindex];
        let mnth = this.props.years[this.props.yindex]['quarters'][this.props.qindex]['months'][this.props.mindex];
        return (
            <div options = {options} >
               { mnth.days.map((days, dindex) => this.renderDays(days, mnth, qt, row, yindex, qindex, mindex, dindex))}
            </div>
        )
        
    }
}
export default DaysView;