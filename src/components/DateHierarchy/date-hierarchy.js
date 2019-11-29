import React from "react";
import { Input } from 'reactstrap';
import ReactDOM from 'react-dom';

class DateHierarchy extends React.PureComponent {
    constructor(props) {
        super(props);
        // let yearList = getYearListByOptions(options);
        let years = [
            {
                "year": "2015",
                "isShowChild": false,
                "children": [
                    {
                        "quarter": "Q1",
                        "isShowChild": false,
                        "children": [
                            {
                                "month": "Jan",
                                "isShowChild": false,
                                "children": []
                            },
                            {
                                "month": "Feb",
                                "isShowChild": false,
                                "children": []
                                
                            },
                            {
                                "month": "March",
                                "isShowChild": false,
                                "children": []
                            }
                        ]
                    },
                    {
                        "quarter": "Q2",
                        "isShowChild": false,
                        "children": [
                            {
                                "month": "April",
                                "isShowChild": false,
                                "children": []
                            },
                            {
                                "month": "May",
                                "isShowChild": false,
                                "children": []
                            },
                            {
                                "month": "June",
                                "isShowChild": false,
                                "children": []
                            }
                        ]
                    },
                    {
                        "quarter": "Q3",
                        "isShowChild": false,
                        "children": [
                            {
                                "month": "July",
                                "isShowChild": false,
                                "children": []
                            },
                            {
                                "month": "August",
                                "isShowChild": false,
                                "children": []
                            },
                            {
                                "month": "September",
                                "isShowChild": false,
                                "children": []
                            }
                        ]
                    },
                    {
                        "quarter": "Q4",
                        "isShowChild": false,
                        "children": [
                            {
                                "month": "October",
                                "isShowChild": false,
                                "children": []
                            },
                            {
                                "month": "November",
                                "isShowChild": false,
                                "children": []
                            },
                            {
                                "month": "December",
                                "isShowChild": false,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            
            {
                "year": "2016",
                "isShowChild": false
            },
            {
                "year": "2017",
                "isShowChild": false
            }
        ]
        this.state = { upperLimit: "2000", lowerLimit: "2020", years: years};
        
    }

    updateDimensions() { }

    componentDidMount() {
    }

    expandYear(row, index) {
        let years = [...this.state.years]
        years[index]['isShowChild'] = true;
        this.setState({
            years: [...years]
            })
    }

    collapseYear(row, index) {
        console.log(row, "row");
        let years = [...this.state.years]
        years[index]['isShowChild'] = false;
        this.setState({
            years: [...years]
        })
    }

    
    expandQuarter(qt, yindex,qindex) {
        let years = [...this.state.years];
        years[yindex]['children'][qindex]['isShowChild']=true;
        console.log(yindex,' yindex',this.state.years );
        console.log(years,"years");
        this.setState({
            years: [...years]
        })
    }

    collapseQuarter(qt, yindex, qindex) {
        let years = [...this.state.years];
        years[yindex]['children'][qindex]['isShowChild']=false;
        console.log(yindex,' yindex',this.state.years );
        console.log(years,"years");
        this.setState({
            years: [...years]
        })
    }
    
    expandMonth(mnth, yindex,qindex, mindex) {
        let years = [...this.state.years];
        years[yindex]['children'][qindex]['children'][mindex]['isShowChild']=true;
        // console.log(yindex,' yindex',this.state.years );
        // console.log(years,"years");
        this.setState({
            years: [...years]
        })
    }

    collapseMonth(mnth, yindex, qindex, mindex) {
        let years = [...this.state.years];
        years[yindex]['children'][qindex]['children'][mindex]['isShowChild']=false;
        console.log(yindex,' yindex',this.state.years );
        console.log(years,"years");
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
            {/* <input className="VS-Checkbox" id="checkbox" type="checkbox" />{qt.month}-{row.year} */}
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
                {/* <div className="VS-Quarter-Details"><input className="VS-Checkbox" id="checkbox" type="checkbox" /><span className="VS-Quarter-Name">{qt.quarter}-{row.year}</span></div> */}
                {
                    (qt.isShowChild && qt.children) ?
                        qt.children.map((qt, qindex, mindex) => this.renderMonths(qt,row, yindex, qindex, mindex)) : ''
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
                <label class="VS-Checkbox-Container">{row.year}
                    <input className="VS-Checkbox" type="checkbox"></input>
                    <span class="VS-Check-Checkmark"></span>
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
