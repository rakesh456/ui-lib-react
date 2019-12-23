import React from "react";
import ReactDom from "react-dom";
import { getListOfYears } from "../../utils/datehierarchy";
import QuarterView from "./quarterView";

class YearView extends React.PureComponent {
    constructor(props) {
        super(props);
        let { options } = this.props;
        let yearList = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks);
        this.state = { years: yearList };
    }

    componentDidMount() {
        let years = this.state.years;
        this.setState({ years: [...years] });
    }

    expandYear(year, index) {
        let years = [...this.state.years]
        year['showChild'] = true;
        this.setState({
            years: [...years]
        })
    }

    collapseYear(year, index) {
        let years = [...this.state.years]
        year['showChild'] = false;
        this.setState({
            years: [...years]
        })
    }

    onCheckYear(year, index) {
        let years = [...this.state.years];
        year["state"] = 1
        let children = year['children'];
        children.forEach((element, index) => {
            children[index]['state'] = 1;
            children[index]['children'].forEach((element, index1) => {
                children[index]['children'][index1]['state'] = 1;
                children[index]['children'][index1]['children'].forEach((element, index2) => {
                    children[index]['children'][index1]['children'][index2]['state'] = 1;
                    if (children[index]['children'][index1]['children'][index2]['children']) {
                        children[index]['children'][index1]['children'][index2]['children'].forEach((element, index3) => {
                            children[index]['children'][index1]['children'][index2]['children'][index3]['state'] = 1;
                        });
                    }
                });
            });
        });
        this.setState({
            years: [...years]
        })
        console.log(children);

    }

    onUnCheckYear(year, index) {
        let years = [...this.state.years]
        year['state'] = 0
        let children = year['children'];
        children.forEach((element, index) => {
            children[index]['state'] = 0;
            children[index]['children'].forEach((element, index1) => {
                children[index]['children'][index1]['state'] = 0;
                children[index]['children'][index1]['children'].forEach((element, index2) => {
                    children[index]['children'][index1]['children'][index2]['state'] = 0;
                    if (children[index]['children'][index1]['children'][index2]['children']) {
                        children[index]['children'][index1]['children'][index2]['children'].forEach((element, index3) => {
                            children[index]['children'][index1]['children'][index2]['children'][index3]['state'] = 0;
                        });
                    }
                });
            });
        });
        this.setState({
            years: [...years]
        })
    }



    getYearCheckBoxClass = (row, index) => {
        let flag = false;
        let years = [...this.state.years];
        flag = (years[index]["state"] === -1) ? true : false;
        return (flag) ? 'VS-Check-Checkmark VS-Check-Partial' : 'VS-Check-Checkmark';
    }
    onChangeQuarter = (quarterObj) => {
        let years = [...this.state.years];
        let yindex = quarterObj.yindex;
        let qindex = quarterObj.qindex;
        let row = quarterObj.row;
        let qt = quarterObj.qt;
        let stateSum = 0;
        if (quarterObj.isCheck === true) {
            years[yindex]['children'][qindex]['state'] = 1;
            console.log("oncheckquarter called", years[yindex]['children'][qindex]);
            for (var i = 0; i < years[yindex]["children"].length; i++) {
                stateSum += years[yindex]["children"][i]["state"];
            }
            years[yindex]["state"] = (stateSum < 4) ? -1 : 1;
            let children = years[yindex]['children'][qindex]['children'];
            children.forEach((element, qindex) => {
                children[qindex]['state'] = 1;
                children[qindex]['children'].forEach((element, qindex1) => {
                    children[qindex]['children'][qindex1]['state'] = 1;
                    if (children[qindex]['children'][qindex1]['children']) {
                        children[qindex]['children'][qindex1]['children'].forEach((element, qindex2) => {
                            children[qindex]['children'][qindex1]['children'][qindex2]['state'] = 1;
                        })
                    }
                })
            });
            this.setState({
                years: [...years]
            })
            console.log(qt);
        }
        else 
        {
            let stateSum = 0;
            years[yindex]['children'][qindex]['state'] = 0;
            for (var i = 0; i < years[yindex]["children"].length; i++) {
                stateSum += years[yindex]["children"][i]["state"];
            }
            years[yindex]["state"] = (stateSum < 4) ? (stateSum === 0) ? 0 : -1 : 1;
            let children = years[yindex]['children'][qindex]['children'];
            children.forEach((element, qindex) => {
                children[qindex]['state'] = 0;
                children[qindex]['children'].forEach((element, qindex1) => {
                    children[qindex]['children'][qindex1]['state'] = 0;
                    if (children[qindex]['children'][qindex1]['children']) {
                        children[qindex]['children'][qindex1]['children'].forEach((element, qindex2) => {
                            children[qindex]['children'][qindex1]['children'][qindex2]['state'] = 0;
                        })
                    }

                })
            });
            this.setState({
                years: [...years]
            })
        }
    }

    onChangeMonth = (monthObj) => {
        let years = [...this.state.years];
        let  mnth = monthObj.mnth;
        console.log("monthObj",monthObj);
        let yindex = monthObj.yindex;
        let qindex = monthObj.qindex;
        let mindex = monthObj.mindex;
        let mstateSum = 0;
        let qstateSum = 0;
        if(monthObj.isCheck ===true){
         
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
                if(children[mindex]['children']){
                    children[mindex]['children'].forEach((element, mindex1) =>{
                        children[mindex]['children'][mindex1]['state'] = 1;
                    })
                }
            });
            this.setState({
                years: [...years]
            })
        }
        else{
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
                if(children[mindex]['children']){
                    children[mindex]['children'].forEach((element, mindex1) =>{
                        children[mindex]['children'][mindex1]['state'] = 0;
                    })
                }
            });
            this.setState({
                years: [...years]
            })
        }
    }

    onChangeDays = (daysObj) => {
        let years = [...this.state.years];
        let  days = daysObj.days;
        let yindex = daysObj.yindex;
        let qindex = daysObj.qindex;
        let mindex = daysObj.mindex;
        let dindex = daysObj.dindex;
        if(daysObj.isCheck === true){
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
    else{
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
    }

    onChangeWeeks = (weeksObj) => {
        let years = [...this.state.years];
        let yindex = weeksObj.yindex;
        let qindex = weeksObj.qindex;
        let mindex = weeksObj.mindex;
        let windex = weeksObj.windex;

        if(weeksObj.isCheck === true){
        let wstateSum = 0;
        let qstateSum = 0;
        let mstateSum = 0;
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
    else{
        let wstateSum = 0;
        let qstateSum = 0;
        let mstateSum = 0;
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
    }

    onChangeWeekDays = (weekDaysObj) => {
        let years = [...this.state.years];
        let yindex = weekDaysObj.yindex;
        let qindex = weekDaysObj.qindex;
        let mindex = weekDaysObj.mindex;
        let windex = weekDaysObj.windex;
        let wdindex = weekDaysObj.wdindex;
        if(weekDaysObj.isCheck === true){
        let wstateSum = 0;
        let qstateSum = 0;
        let mstateSum = 0;
        let wdstateSum = 0;
        years[yindex]['children'][qindex]['children'][mindex]['children'][windex]['children'][wdindex]['state']=1;
        for (var n=0; n< years[yindex]["children"][qindex]['children'][mindex]['children'][windex]['children'].length; n++){
            wdstateSum +=  years[yindex]["children"][qindex]['children'][mindex]['children'][windex]['children'][n]["state"];
        }
        years[yindex]['children'][qindex]["children"][mindex]['children'][windex]['state'] = (wdstateSum < years[yindex]["children"][qindex]['children'][mindex]['children'][windex]['children'].length ) ? -1: 1;
        console.log("weeekchild length",wdstateSum);

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
    else{
        let wstateSum = 0;
        let qstateSum = 0;
        let mstateSum = 0;
        let wdstateSum = 0;
        years[yindex]['children'][qindex]['children'][mindex]['children'][windex]['children'][wdindex]['state']=0;

        for ( var n=0; n<years[yindex]["children"][qindex]['children'][mindex]['children'][windex]['children'].length; n++){
            wdstateSum += years[yindex]["children"][qindex]['children'][mindex]['children'][windex]['children'][n]["state"];
        }
        years[yindex]['children'][qindex]["children"][mindex]['children'][windex]['state'] = (wdstateSum < years[yindex]["children"][qindex]['children'][mindex]['children'][windex]['children'].length) ? (wdstateSum === 0)? 0: -1: 1;


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
    }

    renderYear = (year, index) => {
        let { options } = this.props;
        return (

            <div className="VS-YearRow" key={'year' + index} >
                {
                    (year.showChild) ?
                        <a className="VS-Plus-Minus" onClick={() => this.collapseYear(year, index)}><span className="VS-ExpandCollapseSign">-</span></a> :
                        <a className="VS-Plus-Minus" onClick={() => this.expandYear(year, index)}><span className="VS-ExpandCollapse">+</span></a>
                }
                <label className="VS-Checkbox-Container" key={'year' + index}>{year.year}
                    {
                        (year.state) ?
                            <input className="VS-Checkbox" type="checkbox" checked={year.state} onChange={() => this.onUnCheckYear(year, index)}></input> :
                            <input className="VS-Checkbox" type="checkbox" checked={year.state} onChange={() => this.onCheckYear(year, index)}></input>

                    }
                    <span className={this.getYearCheckBoxClass(year, index)} ></span>

                </label>
                {
                    (year.showChild && year.children) ?
                        <QuarterView options={options} years={this.state.years} yindex={index} onChangeQuarter={this.onChangeQuarter} onChangeMonth={this.onChangeMonth} onChangeDays={this.onChangeDays} onChangeWeeks={this.onChangeWeeks} onChangeWeekDays={this.onChangeWeekDays}></QuarterView> : ''
                }
            </div>

        )
    }

    render() {
        const { options } = this.props;
        return (
            <div className="VS-Hierarchy" options={options}>
                {this.state.years.map((year, index) => this.renderYear(year, index))}
            </div>
        )

    }
}
export default YearView;