import React from "react";
import MonthView from "./monthView";

class QuarterView extends React.PureComponent {

    expandQuarter(qt, yindex,qindex) {
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
        let quarterObj = {
            qt:qt,
            row:row,
            yindex:yindex,
            qindex:qindex,
            isCheck: true
        }
        this.props.onChangeQuarter(quarterObj);
    }

    
    onUnCheckQuarter(qt,row, yindex, qindex) {
        let quarterObj = {
            qt:qt,
            row:row,
            yindex:yindex,
            qindex:qindex,
            isCheck: false
        }
        this.props.onChangeQuarter(quarterObj);
    }
 
    getQuarterCheckBoxClass = (row, qt , yindex, qindex) => {
        let flag = false;
        let years = [...this.props.years];
        flag = ((years[yindex]["quarters"][qindex]["state"] === -1)) ? true :false;
        return (flag)? 'VS-Check-Checkmark VS-Check-Partial' : 'VS-Check-Checkmark';

    }

    onChangeMonth = (monthObj) =>{
        this.props.onChangeMonth(monthObj);
    }

    onChangeDays = (daysObj) =>{
        this.props.onChangeDays(daysObj);
    }

    onChangeWeeks = (weeksObj) =>{
        this.props.onChangeWeeks(weeksObj);
    }

    onChangeWeekDays = (weekDaysObj) => {
        this.props.onChangeWeekDays(weekDaysObj);
    }

    renderQuarter = (qt,row, yindex, qindex) => {
        let {options} = this.props;
        return (
            <div className="VS-QuarterRow"key={'quarter' + yindex.toString() + qindex.toString() }>
                 {
                    (qt.showChild) ?
                        <span className="VS-Quarter-Plus-Minus" onClick={() => this.collapseQuarter(qt, yindex, qindex)}>-</span> :
                        <span className="VS-Quarter-Plus-Minus" onClick={() => this.expandQuarter(qt,yindex, qindex)}>+</span>
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
                    (qt.showChild && qt.months) ?
                    <MonthView options={options} years= {this.props.years} yindex={yindex} qindex={qindex} onChange={this.onChangeHandler} onChangeMonth={this.onChangeMonth} onChangeDays={this.onChangeDays} onChangeWeeks={this.onChangeWeeks} onChangeWeekDays={this.onChangeWeekDays}></MonthView>
                         : ''
                }
               
            </div>
            
        )
    }

    render() {
        const {options} = this.props;
        let row = this.props.years[this.props.yindex];
        let yindex = this.props.yindex;
        return (
            <div options = {options} onChange={this.props.onChangeHandler}>
            {
                 row.quarters.map((qt, qindex) =>  this.renderQuarter(qt, row, yindex, qindex))
            }
            </div>
        )
        
    }
}
export default QuarterView;