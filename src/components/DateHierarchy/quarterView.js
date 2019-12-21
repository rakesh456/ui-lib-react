import React from "react";
import ReactDom from "react-dom";
import { getListOfYears } from "../../utils/datehierarchy";
import MonthView from "./monthView";

class QuarterView extends React.PureComponent {
    constructor(props) {
        super(props);
        let {options} = this.props;
       let yearList = getListOfYears(options.lowerLimit,options.upperLimit, options.showWeeks);
       // this.state = { years: yearList};
        this.state = {years: this.props.years}
    }

    expandQuarter(qt, yindex,qindex) {
        console.log('expand quarter called',  qt);
        let years = [...this.props.years];
        qt['showChild']=true;
        this.setState({
            years: [...years]
        })
    }

    collapseQuarter(qt, yindex,qindex) {
        let years = [...this.props.years];
        qt['showChild']=false;
        this.setState({
            years: [...years]
        })
    }

    onCheckQuarter(qt,row, yindex, qindex) {
        let years = [...this.props.years];
        let stateSum = 0;
        years[yindex]['children'][qindex]['state']=1;
        console.log("oncheckquarter called", years[yindex]['children'][qindex]);
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

    
    onUnCheckQuarter(qt,row, yindex, qindex) {
        let years = [...this.props.years];
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


    getQuarterCheckBoxClass = (row, qt , yindex, qindex) => {
        console.log('getquarter checkbox called');
        let flag = false;
        let years = [...this.props.years];
        flag = ((years[yindex]["children"][qindex]["state"] === -1)) ? true :false;
        return (flag)? 'VS-Check-Checkmark VS-Check-Partial' : 'VS-Check-Checkmark';

    }


    renderQuarter = (qt,row, yindex, qindex) => {
        let {options} = this.props;
        console.log('yindex', row)
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
                    <input className="VS-Checkbox" type="checkbox" checked={qt.state} onChange={ () => this.onUnCheckQuarter(qt, row, yindex, qindex)}></input>:
                    <input className="VS-Checkbox" type="checkbox" checked={qt.state} onChange={ () => this.onCheckQuarter(qt,row, yindex, qindex)}></input>
                }
                <span className={this.getQuarterCheckBoxClass(row, qt, yindex, qindex)}></span>
                </label>
                {
                    (qt.showChild && qt.children) ?
                    <MonthView options={options} years= {this.state.years} yindex={yindex} qindex={qindex}></MonthView>
                         : ''
                }
               
            </div>
            
        )
    }

    render() {
        console.log('render quarter called');
        const {options} = this.props;
        let row = this.props.years[this.props.yindex];
        let yindex = this.props.yindex;
        return (
            <div options = {options}>
            {
                 row.children.map((qt, qindex) =>  this.renderQuarter(qt, row, yindex, qindex))
            }
            </div>
        )
        
    }
}
export default QuarterView;