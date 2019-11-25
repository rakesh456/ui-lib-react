import React from "react";
import { Input } from 'reactstrap';
import ReactDOM from 'react-dom';

class DateHierarchy extends React.PureComponent {
    constructor(props) {
        super(props);
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
        console.log(index ,' index' , row);
        let years = [...this.state.years]
        years[index]['isShowChild'] = true;
        console.log(this.state,"state");
        this.setState({
            years: [...years]
            })
            console.log(this.state,"state");
    }

    collapseYear(row, index) {
        console.log(index ,' index' , row);
        let years = [...this.state.years]
        years[index]['isShowChild'] = false;
        this.setState({
            years: [...years]
        })
    }

    expandQuarter(qt, index) {
        console.log(index ,' index' );
      console.log('qt' , qt);
        let quarter = [...qt.children]
        console.log(quarter,"quarter2");
        quarter[index]['isShowChild'] = true;
        this.setState({
            quarter: [...quarter]
        })
    }

    collapseQuarter(qt, index) {
        console.log(index ,' index' , qt);
        let quarter= [...this.state.years[index].children]
        quarter[index]['isShowChild'] = false;
        this.setState({
            quarter: [...quarter]
        })
    }
    renderMonths = (mnth, index) =>{
        return (
            <div className="VS-MonthRow" key={'month' + index}>
            <input className="VS-Checkbox" id="checkbox" type="checkbox" />{mnth.month}
            </div>
        )
    }

    renderQuarter = (qt, index) => {
        return (
            <div className="VS-QuarterRow"key={'quarter' + index}>
                 {
                    (qt.isShowChild) ?
                        <a className="VS-Quarter-Plus-Minus" onClick={() => this.collapseQuarter(qt, index)}>-</a> :
                        <a className="VS-Quarter-Plus-Minus" onClick={() => this.expandQuarter(qt, index)}>+</a>
                }
                <input className="VS-Checkbox" id="checkbox" type="checkbox" />{qt.quarter}
                
                {
                    (qt.isShowChild && qt.children) ?
                        qt.children.map((qt, index) => this.renderMonths(qt, index)) : ''
                }
            </div>
        )
    }

    renderYearRow = (row, index) => {
        return (
            <div className="VS-YearRow" key={'year' + index} >
                {
                    (row.isShowChild) ?
                        <a className="VS-Plus-Minus" onClick={() => this.collapseYear(row, index)}>-</a> :
                        <a className="VS-Plus-Minus" onClick={() => this.expandYear(row, index)}>+</a>
                }
                <input className="VS-Checkbox"id="checkbox" type="checkbox" />{row.year}
                {
                    (row.isShowChild && row.children) ?
                        row.children.map((row, index) => this.renderQuarter(row, index)) : ''
                }
            </div>
        )
    }
    
    render() {

        return (
            <div className="hierarcy">
                {this.state.years.map((row, index) => this.renderYearRow(row, index))}
            </div>
        )
    }
}

export default DateHierarchy;