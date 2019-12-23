import React from "react";
import ReactDom from "react-dom";
import { getListOfYears } from "../../utils/datehierarchy";
import QuarterView from "./quarterView";

class YearView extends React.PureComponent {
    constructor(props) {
        super(props);
        let {options} = this.props;
        let yearList = getListOfYears(options.lowerLimit,options.upperLimit);
        this.state = { years: yearList};
    }

    expandYear(year, index) {
        console.log('expand year called');
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
        children.forEach((element,index) => {
            children[index]['state'] = 1;
            children[index]['children'].forEach((element,index1) => {
                children[index]['children'][index1]['state'] = 1;
                   children[index]['children'][index1]['children'].forEach((element,index2) => {
                    children[index]['children'][index1]['children'][index2]['state'] = 1;

                });
            });
        });
        this.setState({
            years: [...years]
            })
    }

    onUnCheckYear(year, index) {
        let years = [...this.state.years]
        year['state'] = 0
        let children = year['children'];
        children.forEach((element,index) => {
            children[index]['state'] = 0;
            children[index]['children'].forEach((element,index1) => {
                children[index]['children'][index1]['state'] = 0;
                children[index]['children'][index1]['children'].forEach((element,index2) => {
                    children[index]['children'][index1]['children'][index2]['state'] = 0;

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
        return (flag )? 'VS-Check-Checkmark VS-Check-Partial' : 'VS-Check-Checkmark';
    }

    renderYear = (year, index) => {
        let {options} = this.props;
        return (
            
            <div className="VS-YearRow"  key={'year' + index} >
                {
                    (year.showChild) ?
                        <a className="VS-Plus-Minus" onClick={() => this.collapseYear(year, index)}><span className = "VS-ExpandCollapseSign">-</span></a> :
                        <a className="VS-Plus-Minus" onClick={() => this.expandYear(year, index)}><span className = "VS-ExpandCollapse">+</span></a>
                }
                <label className="VS-Checkbox-Container" key={'year' + index}>{year.year}
                {
                     (year.state) ? 
                    <input className="VS-Checkbox" type="checkbox" checked={year.state} onChange={ () => this.onUnCheckYear(year, index)}></input>:
                    <input className="VS-Checkbox" type="checkbox" checked={year.state} onChange={ () => this.onCheckYear(year, index)}></input>
                    
                } 
                <span className={this.getYearCheckBoxClass(year, index)} ></span>
                    
                </label>
                {
                (year.showChild && year.children) ?
                <QuarterView options={options} years={this.state.years} yindex={index} ></QuarterView> : ''
                }
            </div>
           
        )
    }

    render() {
        const {options} = this.props;
        return (
            <div className= "VS-Hierarchy" options = {options}>
                {this.state.years.map((year, index) => this.renderYear(year, index))}
            </div>
        )
        
    }
}
export default YearView;