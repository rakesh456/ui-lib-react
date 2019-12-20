import React from "react";
import ReactDom from "react-dom";
import { getListOfYears } from "../../utils/datehierarchy";


class DaysView extends React.PureComponent {
    constructor(props) {
        super(props);
        let {options} = this.props;
        let yearList = getListOfYears(options.lowerLimit,options.upperLimit);
        this.state = { years: yearList};
    }

    onCheckDay(days, mnth, qt, row, yindex, qindex, mindex, dindex){
        let years = [...this.state.years];
        let dstateSum = 0;
        let qstateSum = 0;
        let mstateSum = 0;
        days['state']=1;
        for (var j=0; j<years[yindex]["children"][qindex]['children'][mindex]['children'].length; j++) {
            dstateSum += years[yindex]["children"][qindex]['children'][mindex]['children'][j]["state"];
        }
        years[yindex]['children'][qindex]["children"][mindex]['state'] = (dstateSum < years[yindex]["children"][qindex]['children'][mindex]['children'].length ) ? -1: 1;

     
        
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

    onUnCheckDay(days, mnth, qt, row, yindex, qindex, mindex, dindex){
        let years = [...this.state.years];
        let dstateSum = 0;
        let qstateSum = 0;
        let mstateSum = 0;
        years[yindex]['children'][qindex]['children'][mindex]['children'][dindex]['state']=0;
        for (var j=0; j<years[yindex]["children"][qindex]['children'][mindex]['children'].length; j++) {
            dstateSum += years[yindex]["children"][qindex]['children'][mindex]['children'][j]["state"];
        }
        years[yindex]['children'][qindex]["children"][mindex]['state'] = (dstateSum < years[yindex]["children"][qindex]['children'][mindex]['children'].length) ? (dstateSum ===0)? 0: -1: 1;

       

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
            <div options = {options}>
               { mnth.children.map((days, dindex) => this.renderDays(days, mnth, qt, row, yindex, qindex, mindex, dindex))}
            </div>
        )
        
    }
}
export default DaysView;