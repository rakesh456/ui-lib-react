import React from "react";
import ReactDom from "react-dom";

class WeekDaysView extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount () {

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
       let weeksObj = {
            weeks: weeks,
            yindex: yindex,
            qindex: qindex,
            mindex: mindex,
            windex: windex,
            isCheck: true
        }
        this.props.onChangeWeeks(weeksObj);
    }

    onUnCheckWeek(weeks, yindex, qindex, mindex, windex){
        let weeksObj = {
            weeks: weeks,
            yindex: yindex,
            qindex: qindex,
            mindex: mindex,
            windex: windex,
            isCheck: false
        }
        this.props.onChangeWeeks(weeksObj);
    }

    onCheckWeekDay(weekDays, yindex, qindex, mindex, windex, wdindex){
        let weekDaysObj = {
            weekDays: weekDays,
            yindex: yindex,
            qindex: qindex,
            mindex: mindex,
            windex: windex,
            wdindex: wdindex,
            isCheck: true
        }
        this.props.onChangeWeekDays(weekDaysObj);
       
    }

    onUnCheckWeekDay(weekDays, yindex, qindex, mindex, windex, wdindex){
        let weekDaysObj = {
            weekDays: weekDays,
            yindex: yindex,
            qindex: qindex,
            mindex: mindex,
            windex: windex,
            wdindex: wdindex,
            isCheck: false
        }
        this.props.onChangeWeekDays(weekDaysObj);
        
    }

   getWeekCheckBoxClass = (weeks,yindex,qindex,mindex,windex) => {
        let flag = false;
        let years = [...this.props.years];
        console.log('week check box called',weeks['state'] );
        flag = weeks['state'] === -1 ? true :false ;
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