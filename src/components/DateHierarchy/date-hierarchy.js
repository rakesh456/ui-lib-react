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
        console.log( years[yindex],'yearindex');
        console.log(years[yindex]['children'][qindex],'childrenIndex');
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

    onCheckQuarter(qt, yindex,qindex) {
        let years = [...this.state.years];
        years[yindex]['children'][qindex]['isChecked']=true;
        console.log(years[yindex]['children'][qindex],'inside quarter');
        console.log(qindex,yindex,qt,'oncheckQuarter Called');
        this.setState({
            years: [...years]
        })
    }

    onUnCheckQuarter(qt, yindex,qindex) {
        let years = [...this.state.years];
        years[yindex]['children'][qindex]['isChecked']=false;
        console.log(qt,'onUncheckQuarter Called');
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

    getYearCheckBoxClass = () => {
        let flag = false;
        console.log();
        return (flag )? 'VS-Check-Checkmark VS-Check-Particial' : 'VS-Check-Checkmark';
    }

    onCheckYear(row, index) {
        let years = [...this.state.years];
        console.log(index,'isChecked called');
        years[index]['isChecked'] = true
        let children = years[index]['children'];
        console.log(years[index],"years",children,"children");
        children.forEach((element,index) => {
            children[index]['isChecked'] = true;
            console.log(index,"index inside loop");
        });
        years[index]['children'] = children;
        this.setState({
            years: [...years]
            })
    }

    onUnCheckYear(row, index) {
        let years = [...this.state.years]
        console.log('isUnChecked called');
        years[index]['isChecked'] = false
        let children = years[index]['children'];
        children.forEach((element,index) => {
            children[index]['isChecked'] = false;
        });
        years[index]['children'] = children;
        console.log(row, "row");
        this.setState({
            years: [...years]
            })
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
                {
                     (qt.isChecked) ? 
                    <input className="VS-Checkbox" type="checkbox" checked={qt.isChecked} onChange={ () =>       this.onUnCheckQuarter(qt,yindex, qindex)}></input>:
                    <input className="VS-Checkbox" type="checkbox" checked={qt.isChecked} onChange={ () => this.onCheckQuarter(qt,yindex, qindex)}></input>
                }
                <span class="VS-Check-Checkmark"></span>
                </label>
                {
                    (qt.isShowChild && qt.children) ?
                        qt.children.map((qt, qindex, mindex) => this.renderMonths(qt, row, yindex, qindex, mindex)) : ''
                }
               
            </div>
            
        )
    }



    renderYearRow = (row, index) => {
        return (
            
            <div className="VS-YearRow"  key={'year' + index} >
                {
                    (row.isShowChild) ?
                        <a className="VS-Plus-Minus" onClick={() => this.collapseYear(row, index)}>-</a> :
                        <a className="VS-Plus-Minus" onClick={() => this.expandYear(row, index)}>+</a>
                }
                <label class="VS-Checkbox-Container" key={'year' + index}>{row.year}
                {
                     (row.isChecked) ? 
                    <input className="VS-Checkbox" type="checkbox" checked={row.isChecked} onChange={ () =>       this.onUnCheckYear(row, index)}></input>:
                    <input className="VS-Checkbox" type="checkbox" checked={row.isChecked} onChange={ () => this.onCheckYear(row, index)}></input>

                } 
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