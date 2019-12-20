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
        console.log("show child",years[yindex]['children'][qindex]['children'][mindex]['children'][windex]['showChild'])
        this.setState({
            years: [...years]
        })
    }

    
    renderWeekDays = (weekDays, row, yindex, qindex, mindex, windex, wdindex) =>{
        return (
        <div className="VS-WeekDayRow" key={'weekDay' + yindex.toString() + qindex.toString() + mindex.toString() + windex.toString() + wdindex.toString()}>
           
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
    let {options} = this.props;
    yindex = this.props.yindex;
    qindex = this.props.qindex;
    mindex = this.props.mindex;
        return (
        <div className="VS-WeekRow" key={'week' + yindex.toString() + qindex.toString() + windex.toString()}>
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
                    weeks.children.map((weekDays, wdindex) => this.renderWeekDays(weekDays, row, yindex, qindex, mindex, windex)) : ''
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