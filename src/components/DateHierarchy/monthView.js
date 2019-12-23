import React from "react";
import ReactDom from "react-dom";
import DaysView from "./daysView";
import WeekDaysView from "./weekDaysview";


class MonthView extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount () {
        let years = this.props.years;
        this.setState({years: [...years]});
    }


    expandMonth(mnth, mindex) {
        let years = [...this.state.years];
        mnth['showChild']=true;
        this.setState({
            years: [...years]
        })
    }

    collapseMonth(mnth, yindex, qindex, mindex) {
        let years = [...this.state.years];
        mnth['showChild']=false;
        this.setState({
            years: [...years]
        })
    }


    
    onCheckMonth(mnth,yindex, qindex, mindex){
        let monthObj = {
            mnth: mnth,
            yindex: yindex,
            qindex: qindex,
            mindex: mindex,
            isCheck: true
        }
        this.props.onChangeMonth(monthObj);
    }

    onUnCheckMonth(mnth,yindex, qindex, mindex){
        let monthObj = {
            mnth: mnth,
            yindex: yindex,
            qindex: qindex,
            mindex: mindex,
            isCheck: false
        }
        this.props.onChangeMonth(monthObj);
    }

    onChangeDays = (daysObj) =>{
        this.props.onChangeDays(daysObj);
    }

    onChangeWeeks = (weeksObj) =>{
        this.props.onChangeWeeks(weeksObj);
    }

    onChangeWeekDays = (weekDaysObj) =>{
        this.props.onChangeWeekDays(weekDaysObj);
    }


    getMonthCheckBoxClass = (mnth,yindex,qindex,mindex) => {
        let flag = false;
        let years = [...this.props.years];
        flag = years[yindex]["children"][qindex]["children"][mindex]['state'] === -1 ? true :false ;
        return (flag)? 'VS-Check-Checkmark VS-Check-Partial' : 'VS-Check-Checkmark'; 
    }

    renderMonths = (mnth, row, yindex, qindex, mindex) =>{
        let {options} = this.props;
        let qt = this.props.years[this.props.yindex]['children'][this.props.qindex];
        yindex = this.props.yindex;
        qindex = this.props.qindex;
        return (
            <div className="VS-MonthRow" key={'month' + yindex.toString() + mindex.toString() + qindex.toString() + mindex.toString()}>
                {
                    (mnth.showChild) ?
                        <a className="VS-Month-Plus-Minus" onClick={() => this.collapseMonth(mnth, mindex)}>-</a> :
                        <a className="VS-Month-Plus-Minus" onClick={() => this.expandMonth(mnth, mindex)} >+</a>
                }
           <label className="VS-Checkbox-Container">{mnth.month}
                {
                     (mnth.state) ? 
                    <input className="VS-Checkbox" type="checkbox" checked={mnth.state} onChange={ () => this.onUnCheckMonth(mnth,yindex, qindex, mindex)}></input>:
                    <input className="VS-Checkbox" type="checkbox" checked={mnth.state} onChange={ () => this.onCheckMonth(mnth,yindex, qindex, mindex)}></input>
                }
                <span className={this.getMonthCheckBoxClass(mnth,yindex,qindex,mindex)}></span>
                </label>
                {(mnth.showChild && mnth.children) ?
                  options.showWeeks ?
                     <WeekDaysView options={options} years={this.props.years} mindex={mindex} yindex={yindex} qindex={qindex} mindex={mindex} onChangeWeeks={this.onChangeWeeks} onChangeWeekDays={this.onChangeWeekDays}></WeekDaysView> :
                     <DaysView options={options} years={this.props.years} mindex={mindex} yindex={yindex} qindex={qindex} mindex={mindex} onChangeDays={this.onChangeDays}></DaysView> : ''
                }
            
            </div>
        )
}

    render() {
        const {options} = this.props;
        let qt = this.props.years[this.props.yindex]['children'][this.props.qindex];
        let row = this.props.years[this.props.yindex];
        let {yindex} = this.props.yindex;
        let {qindex} = this.props.qindex;
        return (
            <div options = {options}>
               { qt.children.map((mnth, mindex) => this.renderMonths(mnth, row, yindex, qindex, mindex))}
            </div>
        )
        
    }
}
export default MonthView;