import React from "react";
import ReactDom from "react-dom";
import { getListOfYears } from "../../utils/datehierarchy";

class WeekDaysView extends React.PureComponent {
    constructor(props) {
        super(props);
        let {options} = this.props;
        let yearList = getListOfYears(options.lowerLimit,options.upperLimit, options.showWeeks);
        this.state = { years: yearList};
    }

    expandWeek(weeks, yindex, qindex, mindex, windex) {
        let years = [...this.props.years];
        years[yindex]['children'][qindex]['children'][mindex]['children'][windex]['showChild']=true;
        this.setState({
            years: [...years]
        })
    }

    collapseWeek(weeks, yindex, qindex, mindex, windex) {
        let years = [...this.props.years];
        years[yindex]['children'][qindex]['children'][mindex]['children'][windex]['showChild']=false;
        this.setState({
            years: [...years]
        })
    }

    onCheckWeek(weeks, yindex, qindex, mindex, windex){
        let years = [...this.props.years];
        let wstateSum = 0;
        let qstateSum = 0;
        let mstateSum = 0;
        yindex = this.props.yindex;
        qindex = this.props.qindex;
        mindex = this.props.mindex;
        years[yindex]['children'][qindex]['children'][mindex]['children'][windex]['state']=1;
        if(years[yindex]['children'][qindex]['children'][mindex]['children'][windex]['children']){
        years[yindex]['children'][qindex]['children'][mindex]['children'][windex]['children'].forEach((element,windex1) => {
            years[yindex]['children'][qindex]['children'][mindex]['children'][windex]['children'][windex1]['state'] = 1;
        });
        }
        for (var j=0; j<years[yindex]["children"][qindex]['children'][mindex]['children'].length; j++) {
            wstateSum += years[yindex]["children"][qindex]['children'][mindex]['children'][j]["state"];
        }
        years[yindex]['children'][qindex]["children"][mindex]['state'] = (wstateSum < years[yindex]["children"][qindex]['children'][mindex]['children'].length ) ? -1: 1;
        for (var k=0; k<years[yindex]["children"][qindex]['children'].length; k++) {
            mstateSum += years[yindex]["children"][qindex]['children'][k]["state"];
        }
        years[yindex]['children'][qindex]["state"] = (mstateSum < 3) ? -1: 1;

        for (var i=0; i < years[yindex]["children"].length; i++) {
            qstateSum += years[yindex]["children"][i]["state"];
        }
        years[yindex]["state"] = (qstateSum < 4) ? -1:1;

        this.setState({
            years: [...years]
        })
    }

    onUnCheckWeek(weeks, yindex, qindex, mindex, windex){
        let years = [...this.props.years];
        let wstateSum = 0;
        let qstateSum = 0;
        let mstateSum = 0;
        yindex = this.props.yindex;
        qindex = this.props.qindex;
        mindex = this.props.mindex;
        years[yindex]['children'][qindex]['children'][mindex]['children'][windex]['state']=0;
        if(years[yindex]['children'][qindex]['children'][mindex]['children'][windex]['children']){
            years[yindex]['children'][qindex]['children'][mindex]['children'][windex]['children'].forEach((element,windex1) => {
                years[yindex]['children'][qindex]['children'][mindex]['children'][windex]['children'][windex1]['state'] = 0;
            });
            }
        for (var j=0; j<years[yindex]["children"][qindex]['children'][mindex]['children'].length; j++) {
            wstateSum += years[yindex]["children"][qindex]['children'][mindex]['children'][j]["state"];
        }
        years[yindex]['children'][qindex]["children"][mindex]['state'] = (wstateSum < years[yindex]["children"][qindex]['children'][mindex]['children'].length) ? (wstateSum ===0)? 0: -1: 1;


        for (var k=0; k < years[yindex]["children"][qindex]['children'].length; k++) {
            mstateSum += years[yindex]["children"][qindex]['children'][k]["state"];
        }
        years[yindex]['children'][qindex]["state"] = (mstateSum < years[yindex]["children"][qindex]['children'].length) ? (mstateSum === 0)? 0: -1: 1;

        for (var i=0; i<years[yindex]["children"].length; i++) {
            if(years[yindex]["children"][i]['state']=== -1){
                qstateSum = -1;
                break;
            }
            qstateSum += years[yindex]["children"][i]["state"];
        }
        years[yindex]["state"] = (qstateSum < 4) ? (qstateSum === 0) ? 0 : -1: 1;

        this.setState({
            years: [...years]
        })
    }

    onCheckWeekDay(weekDays, yindex, qindex, mindex, windex, wdindex){
        let years = [...this.props.years];
        let wstateSum = 0;
        let qstateSum = 0;
        let mstateSum = 0;
        let wdstateSum = 0;
        yindex = this.props.yindex;
        qindex = this.props.qindex;
        mindex = this.props.mindex;
        years[yindex]['children'][qindex]['children'][mindex]['children'][windex]['children'][wdindex]['state']=1;
        for (var n=0; n< years[yindex]["children"][qindex]['children'][mindex]['children'][windex]['children'].length; n++){
            wdstateSum +=  years[yindex]["children"][qindex]['children'][mindex]['children'][windex]['children'][n]["state"];
        }
        years[yindex]['children'][qindex]["children"][mindex]['state'] = (wstateSum < years[yindex]["children"][qindex]['children'][mindex]['children'][windex]['children'].length ) ? -1: 1;

        for (var j=0; j<years[yindex]["children"][qindex]['children'][mindex]['children'].length; j++) {
            wstateSum += years[yindex]["children"][qindex]['children'][mindex]['children'][j]["state"];
        }
        years[yindex]['children'][qindex]["children"][mindex]['state'] = (wstateSum < years[yindex]["children"][qindex]['children'][mindex]['children'].length ) ? -1: 1;

        for (var k=0; k<years[yindex]["children"][qindex]['children'].length; k++) {
            mstateSum += years[yindex]["children"][qindex]['children'][k]["state"];
        }
        years[yindex]['children'][qindex]["state"] = (mstateSum < 3) ? -1: 1;

        for (var i=0; i < years[yindex]["children"].length; i++) {
            qstateSum += years[yindex]["children"][i]["state"];
        }
        years[yindex]["state"] = (qstateSum < 4) ? -1:1;

        this.setState({
            years: [...years]
        })  

    }

    onUnCheckWeekDay(weekDays, yindex, qindex, mindex, windex, wdindex){
        let years = [...this.props.years];
        let wstateSum = 0;
        let qstateSum = 0;
        let mstateSum = 0;
        let wdstateSum = 0;
        yindex = this.props.yindex;
        qindex = this.props.qindex;
        mindex = this.props.mindex;
        years[yindex]['children'][qindex]['children'][mindex]['children'][windex]['children'][wdindex]['state']=0;

        for ( var n=0; n<years[yindex]["children"][qindex]['children'][mindex]['children'][windex]['children'].length; n++){
            wdstateSum += years[yindex]["children"][qindex]['children'][mindex]['children'][windex]['children'][n]["state"];
        }
        years[yindex]['children'][qindex]["children"][mindex]['state'] = (wstateSum < years[yindex]["children"][qindex]['children'][mindex]['children'][windex]['children'].length) ? (wdstateSum ===0)? 0: -1: 1;


        for (var j=0; j<years[yindex]["children"][qindex]['children'][mindex]['children'].length; j++) {
            wstateSum += years[yindex]["children"][qindex]['children'][mindex]['children'][j]["state"];
        }
        years[yindex]['children'][qindex]["children"][mindex]['state'] = (wstateSum < years[yindex]["children"][qindex]['children'][mindex]['children'].length) ? (wstateSum ===0)? 0: -1: 1;

       

        for (var k=0; k < years[yindex]["children"][qindex]['children'].length; k++) {
            mstateSum += years[yindex]["children"][qindex]['children'][k]["state"];
        }
        years[yindex]['children'][qindex]["state"] = (mstateSum < years[yindex]["children"][qindex]['children'].length) ? (mstateSum === 0)? 0: -1: 1;

        for (var i=0; i<years[yindex]["children"].length; i++) {
            if(years[yindex]["children"][i]['state']=== -1){
                qstateSum = -1;
                break;
            }
            qstateSum += years[yindex]["children"][i]["state"];
        }
        years[yindex]["state"] = (qstateSum < 4) ? (qstateSum === 0) ? 0 : -1: 1;

        this.setState({
            years: [...years]
        })
    }

   getWeekCheckBoxClass = (weeks,yindex,qindex,mindex,windex) => {
        let flag = false;
        console.log('week check box called');
        let years = [...this.props.years];
        flag = years[yindex]["children"][qindex]["children"][mindex]['children'][windex]['children']['state'] === -1 ? true :false ;
        return (flag)? 'VS-Check-Checkmark VS-Check-Partial' : 'VS-Check-Checkmark'; 
    }

    
    renderWeekDays = (weekDays, mnth, qt, row, yindex, qindex, mindex, windex, wdindex) =>{
        yindex = this.props.yindex;
        qindex = this.props.qindex;
        mindex = this.props.mindex;
        return (
        <div className="VS-WeekDayRow" key={'weekDay' +  yindex.toString() +qindex.toString() +mindex.toString()+ windex.toString() + wdindex.toString() }>
           
       <label className="VS-Checkbox-Container">{weekDays.date+ " "+weekDays.day}

            {
                 (weekDays.state) ? 
                <input className="VS-Checkbox" type="checkbox" checked={weekDays.state} onChange={ () => this.onUnCheckWeekDay(weekDays, yindex, qindex, mindex, windex, wdindex)}></input>:
                <input className="VS-Checkbox" type="checkbox" checked={weekDays.state} onChange={ () => this.onCheckWeekDay(weekDays, yindex, qindex, mindex, windex, wdindex)}></input>
            }
            
            <span className="VS-Check-Checkmark"></span>
            </label>
        </div>
    )
}


renderWeeks = (weeks, mnth, qt, row, yindex, qindex, mindex, windex) =>{
    yindex = this.props.yindex;
    qindex = this.props.qindex;
    mindex = this.props.mindex;
        return (
        <div className="VS-WeekRow" key={'week' + yindex.toString() + qindex.toString() + mindex.toString()+    windex.toString()}>
            {
                (weeks.showChild) ?
                    <a className="VS-week-Plus-Minus" onClick={() => this.collapseWeek(weeks, yindex, qindex, mindex, windex)}>-</a> :
                    <a className="VS-week-Plus-Minus" onClick={() => this.expandWeek(weeks, yindex, qindex, mindex, windex)} >+</a>
            }
           
       <label className="VS-Checkbox-Container">{weeks.week}

            {
                 (weeks.state) ? 
                <input className="VS-Checkbox" type="checkbox" checked={weeks.state} onChange={ () => this.onUnCheckWeek(weeks, yindex, qindex, mindex, windex)}></input>:
                <input className="VS-Checkbox" type="checkbox" checked={weeks.state} onChange={ () => this.onCheckWeek(weeks, yindex, qindex, mindex, windex)}></input>
            }
            
            <span className={this.getWeekCheckBoxClass(weeks,yindex,qindex,mindex,windex)}></span>
            </label>
            {
                (weeks.showChild && weeks.children) ?
                    weeks.children.map((weekDays, wdindex) => this.renderWeekDays(weekDays, mnth, qt, row, yindex, qindex, mindex, windex, wdindex)) : ''
            }
        
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
            <div options = {options}>
               { mnth.children.map((weeks, windex) => this.renderWeeks(weeks, mnth, qt, row, yindex, qindex, mindex, windex))}
            </div>
        )
        
    }
}
export default WeekDaysView;