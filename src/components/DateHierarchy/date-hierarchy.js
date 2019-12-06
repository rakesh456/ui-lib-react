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

    onCheckMonth(mnth,yindex, qindex, mindex){
        console.log('onCheckMonth called');
        let years = [...this.state.years];
        years[yindex]['children'][qindex]['children'][mindex]['isChecked']=true;
        this.setState({
            years: [...years]
        })
    }

    onUnCheckMonth(mnth,yindex, qindex, mindex){
        console.log('onUnCheckMonth called');
        let years = [...this.state.years];
        years[yindex]['children'][qindex]['children'][mindex]['isChecked']=false;
        this.setState({
            years: [...years]
        })
    }
    

    onCheckQuarter(qt, yindex,qindex) {
        console.log('onCheckQuarter called');
        let years = [...this.state.years];
        years[yindex]['children'][qindex]['isChecked']=true;
        let children = years[yindex]['children'][qindex]['children'];
        children.forEach((element,qindex) => {
            children[qindex]['isChecked'] = true;
        });
        this.setState({
            years: [...years]
        })
    }

    onUnCheckQuarter(qt, yindex,qindex) {
        console.log('onUnCheckQuarter called');
        let years = [...this.state.years];
        years[yindex]['children'][qindex]['isChecked']=false;
        let children = years[yindex]['children'][qindex]['children'];
        children.forEach((element,qindex) => {
            
            children[qindex]['isChecked'] = false;
        });
        this.setState({
            years: [...years]
        })
    }



    getYearCheckBoxClass = () => {
        let flag = false;
        console.log();
        return (flag )? 'VS-Check-Checkmark VS-Check-Particial' : 'VS-Check-Checkmark';
    }

    onCheckYear(row, index) {
        let years = [...this.state.years];
        years[index]['isChecked'] = true
        let children = years[index]['children'];
        children.forEach((element,index) => {
            children[index]['isChecked'] = true;
            children[index]['children'].forEach((element,index1) => {
                children[index]['children'][index1]['isChecked'] = true;
            });
        });
        years[index]['children'] = children;
        this.setState({
            years: [...years]
            })
    }

    onUnCheckYear(row, index) {
        let years = [...this.state.years]
        years[index]['isChecked'] = false
        let children = years[index]['children'];
        children.forEach((element,index) => {
            children[index]['isChecked'] = false;
            children[index]['children'].forEach((element,index1) => {
                children[index]['children'][index1]['isChecked'] = false;
            });
        });
        years[index]['children'] = children;
        this.setState({
            years: [...years]
            })
    } 

    renderMonths = (mnth, row, yindex, qindex, mindex) =>{
        return (
            <div className="VS-MonthRow" key={'month' + mindex}>
                {
                    (mnth.isShowChild) ?
                        <a className="VS-Month-Plus-Minus" onClick={() => this.collapseMonth(mnth, yindex, qindex, mindex)}>-</a> :
                        <a className="VS-Month-Plus-Minus" >+</a>
                }
            <label className="VS-Checkbox-Container">{mnth.month}
                <input className="VS-Checkbox " type="checkbox"></input>
                {
                     (mnth.isChecked) ? 
                    <input className="VS-Checkbox" type="checkbox" checked={mnth.isChecked} onChange={ () => this.onUnCheckMonth(mnth,yindex, qindex, mindex)}></input>:
                    <input className="VS-Checkbox" type="checkbox" checked={mnth.isChecked} onChange={ () => this.onCheckMonth(mnth, yindex, qindex, mindex)}></input>
                }
                <span className="VS-Check-Checkmark"></span>
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
                <label className="VS-Checkbox-Container">{qt.quarter}
                {
                     (qt.isChecked) ? 
                    <input className="VS-Checkbox" type="checkbox" checked={qt.isChecked} onChange={ () => this.onUnCheckQuarter(qt,yindex, qindex)}></input>:
                    <input className="VS-Checkbox" type="checkbox" checked={qt.isChecked} onChange={ () => this.onCheckQuarter(qt,yindex, qindex)}></input>
                }
                <span className="VS-Check-Checkmark"></span>
                </label>
                {
                    (qt.isShowChild && qt.children) ?
                        qt.children.map((mnth, qindex, mindex) => this.renderMonths(mnth, row, yindex, qindex, mindex)) : ''
                }
               
            </div>
            
        )
    }

    renderYear = (row, index) => {
        return (
            
            <div className="VS-YearRow"  key={'year' + index} >
                {
                    (row.isShowChild) ?
                        <a className="VS-Plus-Minus" onClick={() => this.collapseYear(row, index)}>-</a> :
                        <a className="VS-Plus-Minus" onClick={() => this.expandYear(row, index)}>+</a>
                }
                <label className="VS-Checkbox-Container" key={'year' + index}>{row.year}
                {
                     (row.isChecked) ? 
                    <input className="VS-Checkbox" type="checkbox" checked={row.isChecked} onChange={ () =>       this.onUnCheckYear(row, index)}></input>:
                    <input className="VS-Checkbox" type="checkbox" checked={row.isChecked} onChange={ () => this.onCheckYear(row, index)}></input>
                    
                } 
                <span className={this.getYearCheckBoxClass()} ></span>
                    
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
                {this.state.years.map((row, index) => this.renderYear(row, index))}
            </div>
        )
    }
}
export default DateHierarchy;