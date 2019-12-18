import React from "react";
import { Input } from 'reactstrap';
import ReactDOM from 'react-dom';
import { getListOfYearsForWeeks} from "../../utils/datehierarchy";

class WeekHierarchy extends React.PureComponent {
    constructor(props) {
        super(props);
        let {options} = this.props;
        let yearList = getListOfYearsForWeeks(options.lowerLimit,options.upperLimit);
        this.state = { years: yearList};
    }
    expandYear(row, index) {
        let years = [...this.state.years]
        years[index]['showChild'] = true;
        this.setState({
            years: [...years]
            })
    }

    collapseYear(row, index) {
        let years = [...this.state.years]
        years[index]['showChild'] = false;
        this.setState({
            years: [...years]
        })
    }

    
    expandQuarter(qt, yindex,qindex) {
        let years = [...this.state.years];
        years[yindex]['children'][qindex]['showChild']=true;
        this.setState({
            years: [...years]
        })
    }

    collapseQuarter(qt, yindex, qindex) {
        let years = [...this.state.years];
        years[yindex]['children'][qindex]['showChild']=false;
      
        this.setState({
            years: [...years]
        })
    }
    
    expandMonth(mnth, yindex,qindex, mindex) {
        let years = [...this.state.years];
        years[yindex]['children'][qindex]['children'][mindex]['showChild']=true;
        this.setState({
            years: [...years]
        })
    }

    collapseWeek(weeks, yindex, qindex, mindex, windex) {
        let years = [...this.state.years];
        years[yindex]['children'][qindex]['children'][mindex]['children'][windex]['showChild']=false;
        this.setState({
            years: [...years]
        })
    }

    expandWeek(weeks, yindex, qindex, mindex, windex) {
        let years = [...this.state.years];
        years[yindex]['children'][qindex]['children'][mindex]['children'][windex]['showChild']=true;
        this.setState({
            years: [...years]
        })
    }


    collapseMonth(mnth, yindex, qindex, mindex) {
        let years = [...this.state.years];
        years[yindex]['children'][qindex]['children'][mindex]['showChild']=false;
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
    

    onCheckQuarter(qt, yindex,qindex) {
        let years = [...this.state.years];
        let stateSum = 0;
        years[yindex]['children'][qindex]['state']=1;
        for (var i=0; i<years[yindex]["children"].length; i++) {
            stateSum += years[yindex]["children"][i]["state"];
        }
        years[yindex]["state"] = (stateSum < 4) ? -1:1;
        let children = years[yindex]['children'][qindex]['children'];
        children.forEach((element,qindex) => {
            children[qindex]['state'] = 1;
            children[qindex]['children'].forEach((element,qindex1) => {
                children[qindex]['children'][qindex1]['state']= 1 ;

            })
        });
        this.setState({
            years: [...years]
        })
    }

    onUnCheckQuarter(qt, yindex,qindex) {
        let years = [...this.state.years];
        let stateSum = 0;
        years[yindex]['children'][qindex]['state']=0;
        for (var i=0; i<years[yindex]["children"].length; i++) {
            stateSum += years[yindex]["children"][i]["state"];
        }
        years[yindex]["state"] = (stateSum < 4) ? (stateSum === 0) ? 0 : -1: 1;
        let children = years[yindex]['children'][qindex]['children'];
        children.forEach((element,qindex) => {
            children[qindex]['state'] = 0;
            children[qindex]['children'].forEach((element,qindex1) => {
                children[qindex]['children'][qindex1]['state'] = 0 ;

            })
        });
        this.setState({
            years: [...years]
        })
    }


    onCheckYear(row, index) {
        let years = [...this.state.years];
        years[index]['state'] = 1
        let children = years[index]['children'];
        children.forEach((element,index) => {
            children[index]['state'] = 1;
            children[index]['children'].forEach((element,index1) => {
                children[index]['children'][index1]['state'] = 1;
                   children[index]['children'][index1]['children'].forEach((element,index2) => {
                    children[index]['children'][index1]['children'][index2]['state'] = 1;

            });
        });
    });
        years[index]['children'] = children;
        this.setState({
            years: [...years]
            })
    }

    onUnCheckYear(row, index) {
        let years = [...this.state.years]
        years[index]['state'] = 0
        let children = years[index]['children'];
        children.forEach((element,index) => {
            children[index]['state'] = 0;
            children[index]['children'].forEach((element,index1) => {
                children[index]['children'][index1]['state'] = 0;
                children[index]['children'][index1]['children'].forEach((element,index2) => {
                    children[index]['children'][index1]['children'][index2]['state'] = 0;

            });
            });
        });
        years[index]['children'] = children;
        this.setState({
            years: [...years]
            })
    } 

    getMonthCheckBoxClass = (mnth,yindex,qindex,mindex) => {
        let flag = false;
        let years = [...this.state.years];
        flag = ((years[yindex]["children"][qindex]["children"][mindex]['state'] === -1)) ? true :false;
        return (flag)? 'VS-Check-Checkmark VS-Check-Partial' : 'VS-Check-Checkmark'; 
    }

    getQuarterCheckBoxClass = (qt, row, yindex, qindex) => {
        let flag = false;
        let years = [...this.state.years];
        flag = ((years[yindex]["children"][qindex]["state"] === -1)) ? true :false;
        return (flag)? 'VS-Check-Checkmark VS-Check-Partial' : 'VS-Check-Checkmark';

    }
    
    getYearCheckBoxClass = (row, index) => {
        let flag = false;        
        let years = [...this.state.years];
        flag = (years[index]["state"] === -1) ? true : false;
        return (flag )? 'VS-Check-Checkmark VS-Check-Partial' : 'VS-Check-Checkmark';
    }


    renderWeekDays = (weekDays, row, yindex, qindex, mindex, windex, wdindex) =>{
            return (
            <div className="VS-WeekDayRow" key={'weekDay' + yindex.toString() + qindex.toString() + mindex.toString() + windex.toString() + wdindex.toString()}>
               
           <label className="VS-Checkbox-Container">{weekDays.date + " "+weekDays.day}

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


    renderWeeks = (weeks, row, yindex, qindex, mindex, windex) =>{
        console.log("weeks", weeks);
            return (
            <div className="VS-WeekRow" key={'day' + yindex.toString() + qindex.toString() + mindex.toString() + windex.toString()}>
                {
                    (weeks.showChild) ?
                        <a className="VS-week-Plus-Minus" onClick={() => this.collapseWeek(weeks, yindex, qindex, mindex, windex)}>-</a> :
                        <a className="VS-week-Plus-Minus" onClick={() => this.expandWeek(weeks, yindex, qindex, mindex, windex)} >+</a>
                }
               
           <label className="VS-Checkbox-Container">{weeks.week}

                {
                     (weeks.state) ? 
                    <input className="VS-Checkbox" type="checkbox" checked={weeks.state} onChange={ () => this.onUnCheckDay(weeks, yindex, qindex, mindex, windex)}></input>:
                    <input className="VS-Checkbox" type="checkbox" checked={weeks.state} onChange={ () => this.onCheckDay(weeks, yindex, qindex, mindex, windex)}></input>
                }
                
                <span className="VS-Check-Checkmark"></span>
                </label>
                {
                    (weeks.showChild && weeks.children) ?
                        weeks.children.map((weekDays, wdindex) => this.renderWeekDays(weekDays, row, yindex, qindex, mindex, windex, wdindex)) : ''
                }
            
            </div>
        )
    }

    renderMonths = (mnth, row, yindex, qindex, mindex) =>{
        return (
            <div className="VS-MonthRow" key={'month' + yindex.toString() + qindex.toString() + mindex.toString()}>
                {
                    (mnth.showChild) ?
                        <a className="VS-Month-Plus-Minus" onClick={() => this.collapseMonth(mnth, yindex, qindex, mindex)}>-</a> :
                        <a className="VS-Month-Plus-Minus" onClick={() => this.expandMonth(mnth, yindex, qindex, mindex)} >+</a>
                }
           <label className="VS-Checkbox-Container">{mnth.month}
                {
                     (mnth.state) ? 
                    <input className="VS-Checkbox" type="checkbox" checked={mnth.state} onChange={ () => this.onUnCheckMonth(mnth,yindex, qindex, mindex)}></input>:
                    <input className="VS-Checkbox" type="checkbox" checked={mnth.state} onChange={ () => this.onCheckMonth(mnth,yindex, qindex, mindex)}></input>
                }
                <span className={this.getMonthCheckBoxClass(mnth,yindex,qindex,mindex)}></span>
                </label>
                {
                    (mnth.showChild && mnth.children) ?
                        mnth.children.map((weeks, windex) => this.renderWeeks(weeks, row, yindex, qindex, mindex, windex)) : ''
                }
            
            </div>
        )
    }
    

        
    renderQuarter = (qt,row, yindex, qindex) => {
        return (
            <div className="VS-QuarterRow"key={'quarter' + yindex.toString() + qindex.toString() }>
                 {
                    (qt.showChild) ?
                        <a className="VS-Quarter-Plus-Minus" onClick={() => this.collapseQuarter(qt, yindex, qindex)}>-</a> :
                        <a className="VS-Quarter-Plus-Minus" onClick={() => this.expandQuarter(qt,yindex, qindex)}>+</a>
                }
                <label className="VS-Checkbox-Container">{qt.quarter}
                {
                     (qt.state) ? 
                    <input className="VS-Checkbox" type="checkbox" checked={qt.state} onChange={ () => this.onUnCheckQuarter(qt,yindex, qindex)}></input>:
                    <input className="VS-Checkbox" type="checkbox" checked={qt.state} onChange={ () => this.onCheckQuarter(qt,yindex, qindex)}></input>
                }
                <span className={this.getQuarterCheckBoxClass(row, qt, yindex, qindex)}></span>
                </label>
                {
                    (qt.showChild && qt.children) ?
                        qt.children.map((mnth, mindex) => this.renderMonths(mnth, row, yindex, qindex, mindex)) : ''
                }
               
            </div>
            
        )
    }

    renderYear = (row, index) => {
        return (
            
            <div className="VS-YearRow"  key={'year' + index} >
                {
                    (row.showChild) ?
                        <a className="VS-Plus-Minus" onClick={() => this.collapseYear(row, index)}><span className = "VS-ExpandCollapseSign">-</span></a> :
                        <a className="VS-Plus-Minus" onClick={() => this.expandYear(row, index)}><span className = "VS-ExpandCollapse">+</span></a>
                }
                <label className="VS-Checkbox-Container" key={'year' + index}>{row.year}
                {
                     (row.state) ? 
                    <input className="VS-Checkbox" type="checkbox" checked={row.state} onChange={ () => this.onUnCheckYear(row, index)}></input>:
                    <input className="VS-Checkbox" type="checkbox" checked={row.state} onChange={ () => this.onCheckYear(row, index)}></input>
                    
                } 
                <span className={this.getYearCheckBoxClass(row, index)} ></span>
                    
                </label>
                {
                    (row.showChild && row.children) ?
                        row.children.map((qrow, qindex) => this.renderQuarter(qrow, row, index, qindex)) : ''
                }
            </div>
           
        )
    }
    
    render() {
        console.log("this.props", this.props);
        return (
            <div className= "VS-Hierarchy">
                <input className= "VS-SearchBox" type="text" placeholder="Search..">
                </input>
                {this.state.years.map((row, index) => this.renderYear(row, index))}
            </div>
        )
    }
}
export default WeekHierarchy;