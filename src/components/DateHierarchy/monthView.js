import React from "react";
import ReactDom from "react-dom";
import { getListOfYears } from "../../utils/datehierarchy";
import DaysView from "./daysView";
import WeekDaysView from "./weekDaysview";


class MonthView extends React.PureComponent {
    constructor(props) {
        super(props);
        let {options} = this.props;
        let yearList = getListOfYears(options.lowerLimit,options.upperLimit, options.showWeeks);
        this.state = { years: yearList};
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
        let years = [...this.state.years];
        let mstateSum = 0;
        let qstateSum = 0;
        years[yindex]['children'][qindex]['children'][mindex]['state']=1;
        for (var i=0; i<years[yindex]["children"][qindex]['children'].length; i++) {
            mstateSum += years[yindex]["children"][qindex]['children'][i]["state"];
        }
        years[yindex]['children'][qindex]["state"] = (mstateSum < 3) ? -1: 1;
        
        for (var j=0; j < years[yindex]["children"].length; j++) {
            qstateSum += years[yindex]["children"][j]["state"];
        }
        years[yindex]["state"] = (qstateSum < 4) ? -1:1;
        let children = years[yindex]['children'][qindex]['children'][mindex]['children'];
        children.forEach((element,mindex) => {
            children[mindex]['state'] = 1;
        });
        this.setState({
            years: [...years]
        })
    }

    onUnCheckMonth(mnth,yindex, qindex, mindex){
        let years = [...this.state.years];
        let stateSum = 0;
        let qstateSum = 0;
        years[yindex]['children'][qindex]['children'][mindex]['state']=0;
        for (var i=0; i<years[yindex]["children"][qindex]['children'].length; i++) {
            stateSum += years[yindex]["children"][qindex]['children'][i]["state"];
        }
        years[yindex]['children'][qindex]["state"] = (stateSum < 3) ? (stateSum === 0)? 0: -1: 1;
        for (var j=0; j<years[yindex]["children"].length; j++){
            if(years[yindex]["children"][j]['state']=== -1){
                qstateSum = -1;
                break;
            }
            qstateSum += years[yindex]["children"][j]["state"];
        }
        years[yindex]["state"] = (qstateSum !== 0) ? (qstateSum < 4) ? -1 : 1: 0;
        let children = years[yindex]['children'][qindex]['children'][mindex]['children'];
        children.forEach((element,mindex) => {
            children[mindex]['state'] = 0;
        });
        this.setState({
            years: [...years]
        })
    }

    getMonthCheckBoxClass = (mnth,yindex,qindex,mindex) => {
        let flag = false;
        let years = [...this.state.years];
        flag = mnth['state'] === -1 ? true :false;
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
                     <WeekDaysView options={options} years={this.state.years} mindex={mindex} yindex={yindex} qindex={qindex} mindex={mindex}></WeekDaysView> :
                     <DaysView options={options} years={this.state.years} mindex={mindex} yindex={yindex} qindex={qindex} mindex={mindex}></DaysView> : ''
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