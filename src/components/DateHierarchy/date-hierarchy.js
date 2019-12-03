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
        years[index]['isShowChild'] = true;
        this.setState({
            years: [...years]
            })
    }

    collapseYear(row, index) {
        let years = [...this.state.years]
        years[index]['isShowChild'] = false;
        this.setState({
            years: [...years]
        })
    }

    
    expandQuarter(qt, yindex,qindex) {
        let years = [...this.state.years];
        years[yindex]['children'][qindex]['isShowChild']=true;
        this.setState({
            years: [...years]
        })
    }

    collapseQuarter(qt, yindex, qindex) {
        let years = [...this.state.years];
        years[yindex]['children'][qindex]['isShowChild']=false;
        this.setState({
            years: [...years]
        })
    }
    
    expandMonth(mnth, yindex,qindex, mindex) {
        let years = [...this.state.years];
        years[yindex]['children'][qindex]['children'][mindex]['isShowChild']=true;
        this.setState({
            years: [...years]
        })
    }

    collapseMonth(mnth, yindex, qindex, mindex) {
        let years = [...this.state.years];
        years[yindex]['children'][qindex]['children'][mindex]['isShowChild']=false;
        this.setState({
            years: [...years]
        })
    }
    renderMonths = (qt, row, yindex, qindex, mindex) =>{
        return (
            <div className="VS-MonthRow" key={'month' + mindex}>
                {
                    (qt.isShowChild) ?
                        <a className="VS-Month-Plus-Minus" onClick={() => this.collapseMonth(qt, yindex, qindex, mindex)}>-</a> :
                        <a className="VS-Month-Plus-Minus" >+</a>
                }
            <label class="VS-Checkbox-Container">{qt.month}-{row.year}
                <input className="VS-Checkbox" type="checkbox"></input>
                <span class="VS-Check-Checkmark"></span>
            </label>
            </div>
        )
    }

    renderQuarter = (qt,row, yindex, qindex) => {
        return (
            <div className="VS-QuarterRow"key={'quarter' + qindex}>
                 {
                    (qt.isShowChild) ?
                        <a className="VS-Quarter-Plus-Minus" onClick={() => this.collapseQuarter(qt, yindex, qindex)}>-</a> :
                        <a className="VS-Quarter-Plus-Minus" onClick={() => this.expandQuarter(qt,yindex, qindex)}>+</a>
                }
                <label class="VS-Checkbox-Container">{qt.quarter}-{row.year}
                    <input className="VS-Checkbox" type="checkbox"></input>
                    <span class="VS-Check-Checkmark"></span>
                </label>
                {
                    (qt.isShowChild && qt.children) ?
                        qt.children.map((qt, qindex, mindex) => this.renderMonths(qt,row, yindex, qindex, mindex)) : ''
                }
               
            </div>
            
        )
    }

    getYearCheckBoxClass = () => {
        let flag = false;
        console.log();
        return (flag )? 'VS-Check-Checkmark VS-Check-Particial' : 'VS-Check-Checkmark';
    }

    onChange = () => {
        console.log("onchange called");
    }

    renderYearRow = (row, index) => {
        return (
            
            <div className="VS-YearRow"  key={'year' + index} >
                {
                    (row.isShowChild) ?
                        <a className="VS-Plus-Minus" onClick={() => this.collapseYear(row, index)}>-</a> :
                        <a className="VS-Plus-Minus" onClick={() => this.expandYear(row, index)}>+</a>
                }
                <label class="VS-Checkbox-Container" >{row.year}
                    <input className="VS-Checkbox" type="checkbox" onChange={this.onChange}>
                    </input>
                    <span class={this.getYearCheckBoxClass()} >
                        
                    </span>
                </label>
                {
                    (row.isShowChild && row.children) ?
                        row.children.map((qrow, qindex) => this.renderQuarter(qrow, row, index, qindex)) : ''
                }
            </div>
           
        )
    }
    
    render() {
        return (
            <div className= "hierarcy">
                {this.state.years.map((row, index) => this.renderYearRow(row, index))}
            </div>
        )
    }
}
export default DateHierarchy;