import React from "react";
import { Input } from 'reactstrap';
import ReactDOM from 'react-dom';
import { getListOfYears } from "../../utils/datehierarchy";

class DateHierarchy extends React.PureComponent {
    constructor(props) {
        super(props);
        let {options} = this.props;
        let yearList = getListOfYears(options.lowerLimit,options.upperLimit);
        this.state = { years: yearList};
    }

    updateDimensions() { }

    componentDidMount() {
    }

    expandYear(row, index) {
        let years = [...this.state.years]
        console.log('expand year called');
        years[index]['ShowChild'] = true;
        this.setState({
            years: [...years]
            })
    }

    collapseYear(row, index) {
        let years = [...this.state.years]
        years[index]['ShowChild'] = false;
        this.setState({
            years: [...years]
        })
    }

    
    expandQuarter(qt, yindex,qindex) {
        let years = [...this.state.years];
        years[yindex]['children'][qindex]['ShowChild']=true;
        this.setState({
            years: [...years]
        })
    }

    collapseQuarter(qt, yindex, qindex) {
        let years = [...this.state.years];
        years[yindex]['children'][qindex]['ShowChild']=false;
      
        this.setState({
            years: [...years]
        })
    }
    
    expandMonth(mnth, yindex,qindex, mindex) {
        console.log(mnth,'expandMonthCalled')
        let years = [...this.state.years];

        this.setState({
            years: [...years]
        })
    }

    collapseMonth(mnth, yindex, qindex, mindex) {
        let years = [...this.state.years];
        years[yindex]['children'][qindex]['children'][mindex]['ShowChild']=false;
        this.setState({
            years: [...years]
        })
    }

    onCheckMonth(mnth,yindex, qindex, mindex){
        console.log('onCheckMonth called');
        let years = [...this.state.years];
        let stateSum = 0;
        let qstateSum = 0;
        years[yindex]['children'][qindex]['children'][mindex]['state']=1;
        for (var i=0; i<years[yindex]["children"][qindex]['children'].length; i++) {
            stateSum += years[yindex]["children"][qindex]['children'][i]["state"];
        }
        console.log('statesum',stateSum);
        years[yindex]['children'][qindex]["state"] = (stateSum < 3) ? -1: 1;
        for (var j=0; j<years[yindex]["children"].length; j++) {
            qstateSum += years[yindex]["children"][j]["state"];
        }
        years[yindex]["state"] = (qstateSum < 4) ? -1:1;
        console.log("qStatesum",qstateSum);
        this.setState({
            years: [...years]
        })
    }

    onUnCheckMonth(mnth,yindex, qindex, mindex){
        console.log('onUnCheckMonth called');
        let years = [...this.state.years];
        let stateSum = 0;
        let qstateSum = 0;
        years[yindex]['children'][qindex]['children'][mindex]['state']=0;
        for (var i=0; i<years[yindex]["children"][qindex]['children'].length; i++) {
            stateSum += years[yindex]["children"][qindex]['children'][i]["state"];
        }
        years[yindex]['children'][qindex]["state"] = (stateSum < 3) ? (stateSum === 0)? 0: -1: 1;
        for (var j=0; j<years[yindex]["children"].length; j++) {
            qstateSum += years[yindex]["children"][j]["state"];
        }
       // years[yindex]["state"] = (qstateSum < 4) ? -1:1;
       console.log('qstatesum',qstateSum);
        years[yindex]["state"] = (qstateSum < 4) ? (qstateSum === 0) ? 0 : -1: 1;
        this.setState({
            years: [...years]
        })
    }
    

    onCheckQuarter(qt, yindex,qindex) {
        console.log("onCheckQuarter Called");
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
        });
        this.setState({
            years: [...years]
        })
    }

    onUnCheckQuarter(qt, yindex,qindex) {
        console.log('onUnCheckQuarter called');
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
            });
        });
        years[index]['children'] = children;
        this.setState({
            years: [...years]
            })
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



    renderMonths = (mnth, row, yindex, qindex, mindex) =>{
        return (
            <div className="VS-MonthRow" key={'month' + yindex.toString() + qindex.toString() + mindex.toString()}>
                {
                    (mnth.ShowChild) ?
                        <a className="VS-Month-Plus-Minus" onClick={() => this.collapseMonth(mnth, yindex, qindex, mindex)}>-</a> :
                        <a className="VS-Month-Plus-Minus" onClick={() => this.expandMonth(mnth, yindex, qindex, mindex)} >+</a>
                }
           <label className="VS-Checkbox-Container">{mnth.month}
                {
                     (mnth.state) ? 
                    <input className="VS-Checkbox" type="checkbox" checked={mnth.state} onChange={ () => this.onUnCheckMonth(mnth,yindex, qindex, mindex)}></input>:
                    <input className="VS-Checkbox" type="checkbox" checked={mnth.state} onChange={ () => this.onCheckMonth(mnth,yindex, qindex, mindex)}></input>
                }
                <span className="VS-Check-Checkmark"></span>
                </label>
            </div>
        )
    }
        
    renderQuarter = (qt,row, yindex, qindex) => {
        return (
            <div className="VS-QuarterRow"key={'quarter' + yindex.toString() + qindex.toString() }>
                 {
                    (qt.ShowChild) ?
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
                    (qt.ShowChild && qt.children) ?
                        qt.children.map((mnth, mindex) => this.renderMonths(mnth, row, yindex, qindex, mindex)) : ''
                }
               
            </div>
            
        )
    }

    renderYear = (row, index) => {
        return (
            
            <div className="VS-YearRow"  key={'year' + index} >
                {
                    (row.ShowChild) ?
                        <a className="VS-Plus-Minus" onClick={() => this.collapseYear(row, index)}>-</a> :
                        <a className="VS-Plus-Minus" onClick={() => this.expandYear(row, index)}>+</a>
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
                    (row.ShowChild && row.children) ?
                        row.children.map((qrow, qindex) => this.renderQuarter(qrow, row, index, qindex)) : ''
                }
            </div>
           
        )
    }
    
    render() {
        return (
            <div className= "hierarcy">
                {this.state.years.map((row, index) => this.renderYear(row, index))}
            </div>
        )
    }
}
export default DateHierarchy;