import React from "react";
import ReactDom from "react-dom";

class DaysView extends React.PureComponent {
    constructor(props) {
        super(props);
        let {options} = this.props;
    }

    componentDidMount () {
        let years = this.props.years;
        this.setState({years: [...years]});
    }


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
        let {options} = this.props;
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
        let row = this.props.years[this.props.yindex];
        let qt = this.props.years[this.props.yindex]['children'][this.props.qindex];
        let mnth = this.props.years[this.props.yindex]['children'][this.props.qindex]['children'][this.props.mindex];
        let {yindex} = this.props.yindex;
        let {qindex} = this.props.qindex;
        let {mindex} = this.props.mindex;        
        return (
            <div options = {options} >
               { mnth.children.map((days, dindex) => this.renderDays(days, mnth, qt, row, yindex, qindex, mindex, dindex))}
            </div>
        )
        
    }
}
export default DaysView;