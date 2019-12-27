import React from "react";
import { getListOfYears, isQuaterVal, isMonthVal, isWeekVal, isDayVal } from "../../utils/datehierarchyutils";
import { isUndefinedOrNull, toCamelCase } from "../../utils/utils";
import QuarterView from "./quarterView";
import MonthView from "./monthView";
import { FaSearch, FaClose, FaFilter } from 'react-icons/lib/fa';
import * as CONSTANTS from '../../utils/constants'

class YearView extends React.PureComponent {
    constructor(props) {
        super(props);
        let { options } = this.props;

        let yearList = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.showQuarters, options.disabledList);
        this.state = { years: yearList, isSearching: false, searchValue: '', filteredYears: [], isSelectAllSearchResult: true, isAddCurrentSelection: false, lastFilterData: { 'value': '', 'list': [] } };
    }

    getYears() {
        const { isSearching, years, filteredYears } = this.state;
        return (isSearching === true) ? [...filteredYears] : [...years];
    }

    componentDidMount() {
        let years = [...this.getYears()];
        this.setState({ years: [...years] });
    }

    expandYear(year) {
        let years = [...this.getYears()];
        year['showChild'] = true;
        this.setState({
            years: [...years]
        })
    }

    collapseYear(year) {
        let years = [...this.getYears()];
        year['showChild'] = false;
        this.setState({
            years: [...years]
        })
    }

    onCheckYear(year) {
        let years = [...this.getYears()];
        let { showWeeks } = this.props.options;
        year["state"] = 1
        let quarters = year['quarters'];
        quarters.forEach((element, index) => {
            quarters[index]['state'] = 1;
            quarters[index]['months'].forEach((element, index1) => {
                quarters[index]['months'][index1]['state'] = 1;
                if (showWeeks === true) {
                    quarters[index]['months'][index1]['weeks'].forEach((element, index2) => {
                        quarters[index]['months'][index1]['weeks'][index2]['state'] = 1;
                        if (quarters[index]['months'][index1]['weeks'][index2]['days']) {
                            quarters[index]['months'][index1]['weeks'][index2]['days'].forEach((element, index3) => {
                                quarters[index]['months'][index1]['weeks'][index2]['days'][index3]['state'] = 1;
                            });
                        }
                    });
                } else {
                    quarters[index]['months'][index1]['days'].forEach((element, index2) => {
                        quarters[index]['months'][index1]['days'][index2]['state'] = 1;
                    });
                }
            });
        });
        this.setState({
            years: [...years]
        })
    }

    onUnCheckYear(year) {
        let years = [...this.getYears()];
        let { showWeeks } = this.props.options;
        year['state'] = 0
        let quarters = year['quarters'];
        quarters.forEach((element, index) => {
            quarters[index]['state'] = 0;
            quarters[index]['months'].forEach((element, index1) => {
                quarters[index]['months'][index1]['state'] = 0;
                if (showWeeks === true) {
                    quarters[index]['months'][index1]['weeks'].forEach((element, index2) => {
                        quarters[index]['months'][index1]['weeks'][index2]['state'] = 0;
                        if (quarters[index]['months'][index1]['weeks'][index2]['days']) {
                            quarters[index]['months'][index1]['weeks'][index2]['days'].forEach((element, index3) => {
                                quarters[index]['months'][index1]['weeks'][index2]['days'][index3]['state'] = 0;
                            });
                        }
                    });
                } else {
                    quarters[index]['months'][index1]['days'].forEach((element, index2) => {
                        quarters[index]['months'][index1]['days'][index2]['state'] = 0;
                    });
                }
            });
        });
        this.setState({
            years: [...years]
        })
    }

    onChangeQuarterHandler = (quarterObj) => {
        let years = [...this.getYears()];
        let { showWeeks } = this.props.options;
        let { qt, row } = quarterObj;
        let stateSum = 0;

        if (quarterObj.isCheck === true) {
            qt.state = 1;
            for (var i = 0; i < row.quarters.length; i++) {
                stateSum += row.quarters[i]["state"];
            }
           row.state = (stateSum < row.quarters.length) ? -1 : 1;
           qt.months.forEach((element, qindex1) => {
                qt.months[qindex1]['state'] = 1;
                if (showWeeks === true) {
                    qt.months[qindex1]['weeks'].forEach((element, qindex2) => {
                        qt.months[qindex1]['weeks'][qindex2]['state'] = 1;
                        if (qt.months[qindex1]['weeks'][qindex2]['days']) {
                            qt.months[qindex1]['weeks'][qindex2]['days'].forEach((element, qindex3) => {
                                qt.months[qindex1]['weeks'][qindex2]['days'][qindex3]['state'] = 1;
                            })
                        }
                    })
                }
                else {
                    if (qt.months[qindex1]['days']) {
                        qt.months[qindex1]['days'].forEach((element, qindex2) => {
                            qt.months[qindex1]['days'][qindex2]['state'] = 1;
                        })
                    }
                }
            })

            this.setState({
                years: [...years]
            })

        }
        else {
            qt.state = 0;
            for (i = 0; i < row.quarters.length; i++) {
                stateSum += row.quarters[i]["state"];
            }
            row.state = (stateSum < row.quarters.length) ? (stateSum === 0) ? 0 : -1 : 1;
            qt.months.forEach((element, qindex1) => {
                qt.months[qindex1]['state'] = 0;
                if (showWeeks === true) {
                    qt.months[qindex1]['weeks'].forEach((element, qindex2) => {
                        qt.months[qindex1]['weeks'][qindex2]['state'] = 0;
                        if (qt.months[qindex1]['weeks'][qindex2]['days']) {
                            qt.months[qindex1]['weeks'][qindex2]['days'].forEach((element, qindex3) => {
                                qt.months[qindex1]['weeks'][qindex2]['days'][qindex3]['state'] = 0;
                            })
                        }
                    })
                }
                else {
                    if (qt.months[qindex1]['days']) {
                        qt.months[qindex1]['days'].forEach((element, qindex2) => {
                            qt.months[qindex1]['days'][qindex2]['state'] = 0;
                        })
                    }
                }
            })

            this.setState({
                years: [...years]
            })

        }
    }

    onChangeMonth = (monthObj) => {
        let years = [...this.getYears()];
        let { showWeeks } = this.props.options;
        let { mnth, qt, row} = monthObj;
        let mstateSum = 0;
        let qstateSum = 0;
        if (monthObj.isCheck === true) {
            mnth.state = 1;
            for (var i = 0; i < qt.months.length; i++) {
                mstateSum += qt.months[i]["state"];
            }
            qt.state = (mstateSum < qt.months.length) ? -1 : 1;

            for (var j = 0; j < row.quarters.length; j++) {
                qstateSum += row.quarters[j]["state"];
            }
            row.state = (qstateSum <  row.quarters.length) ? -1 : 1;

            if (showWeeks === true) {
                let weeks = mnth.weeks;
                weeks.forEach((element, index) => {
                    weeks[index]['state'] = 1;
                    if (weeks[index]['days']) {
                        weeks[index]['days'].forEach((element, index1) => {
                            weeks[index]['days'][index1]['state'] = 1;
                        })
                    }
                });
            } else {
                let days = mnth.days;
                if(days){
                    days.forEach((element, index) => {
                        days[index]['state'] = 1;
                    });
                }
            }

            this.setState({
                years: [...years]
            })

        } else {
            let stateSum = 0;
            let qstateSum = 0;
           mnth.state = 0;
            for (i = 0; i < qt.months.length; i++) {
                stateSum += qt.months[i]["state"];
            }
           qt.state = (stateSum < qt.months.length) ? (stateSum === 0) ? 0 : -1 : 1;

            for (j = 0; j < row.quarters.length; j++) {
                if (row.quarters[j]['state'] === -1) {
                    qstateSum = -1;
                    break;
                }
                qstateSum += row.quarters[j]["state"];
            }
            row.state = (qstateSum !== 0) ? (qstateSum < row.quarters.length) ? -1 : 1 : 0;

            if (showWeeks === true) {
                let weeks = mnth.weeks;
                weeks.forEach((element, index) => {
                    weeks[index]['state'] = 0;
                    if (weeks[index]['days']) {
                        weeks[index]['days'].forEach((element, index1) => {
                            weeks[index]['days'][index1]['state'] = 0;
                        })
                    }
                });
            } else {
                let days = mnth.days;
                if(days){
                    days.forEach((element, index) => {
                        days[index]['state'] = 0;
                    });
                }
            }

            this.setState({
                years: [...years]
            })
        }
    }

    onChangeDays = (daysObj) => {
        let years = [...this.getYears()];
        let {days, mnth, qt, row ,isCheck} = daysObj;
        if (isCheck === true) {
            let dstateSum = 0;
            let qstateSum = 0;
            let mstateSum = 0;
            days['state'] = 1;
            for (var j = 0; j < mnth.days.length; j++) {
                dstateSum += mnth.days[j]["state"];
            }
            mnth.state = (dstateSum < mnth.days.length) ? -1 : 1;

            for (var k = 0; k < qt.months.length; k++) {
                mstateSum += qt.months[k]["state"];
            }
            qt.state = (mstateSum < qt.months.length) ? -1 : 1;

            for (var i = 0; i < row.quarters.length; i++) {
                qstateSum += row.quarters[i]["state"];
            }
            row.state = (qstateSum < 4) ? -1 : 1;

            this.setState({
                years: [...years]
            })
        }
        else {
            let dstateSum = 0;
            let qstateSum = 0;
            let mstateSum = 0;
           days.state = 0;
            for (j = 0; j < mnth.days.length; j++) {
                dstateSum +=mnth.days[j]["state"];
            }
           mnth.state = (dstateSum < mnth.days.length) ? (dstateSum === 0) ? 0 : -1 : 1;



            for (k = 0; k < qt.months.length; k++) {
                mstateSum += qt.months[k]["state"];
            }
            qt.state = (mstateSum < qt.months.length) ? (mstateSum === 0) ? 0 : -1 : 1;

            for (i = 0; i < row.quarters.length; i++) {
                if (row.quarters[i]['state'] === -1) {
                    qstateSum = -1;
                    break;
                }
                qstateSum += row.quarters[i]["state"];
            }
            row.state = (qstateSum < row.quarters.length) ? (qstateSum === 0) ? 0 : -1 : 1;

            this.setState({
                years: [...years]
            })
        }
    }

    onChangeWeeks = (weeksObj) => {
        let years = [...this.getYears()];
        let { weeks, mnth, qt, row, isCheck } = weeksObj;
        if (isCheck === true) {
            let wstateSum = 0;
            let qstateSum = 0;
            let mstateSum = 0;
           weeks.state = 1;
            if (weeks.days) {
                weeks.days.forEach((element, index) => {
                   weeks.days[index]['state'] = 1;
                });
            }
            for (var j = 0; j < mnth.weeks.length; j++) {
                wstateSum += mnth.weeks[j]["state"];
            }
            mnth.state = (wstateSum < mnth.weeks.length) ? -1 : 1;
            for (var k = 0; k < qt.months.length; k++) {
                mstateSum += qt.months[k]["state"];
            }
           qt.state = (mstateSum < qt.months.length) ? -1 : 1;

            for (var i = 0; i < row.quarters.length; i++) {
                qstateSum += row.quarters[i]["state"];
            }
            row.state = (qstateSum < row.quarters.length) ? -1 : 1;

            this.setState({
                years: [...years]
            })
        }
        else {
            let wstateSum = 0;
            let qstateSum = 0;
            let mstateSum = 0;
            weeks.state = 0;
            if (weeks.days) {
                weeks.days.forEach((element, index) => {
                    weeks.days[index]['state'] = 0;
                });
            }
            for (j = 0; j < mnth.weeks.length; j++) {
                wstateSum += mnth.weeks[j]["state"];
            }
           mnth.state = (wstateSum < mnth.weeks.length) ? (wstateSum === 0) ? 0 : -1 : 1;


            for (k = 0; k < qt.months.length; k++) {
                mstateSum += qt.months[k]["state"];
            }
            qt.state = (mstateSum < qt.months.length) ? (mstateSum === 0) ? 0 : -1 : 1;

            for (i = 0; i < row.quarters.length; i++) {
                if (row.quarters[i]['state'] === -1) {
                    qstateSum = -1;
                    break;
                }
                qstateSum += row.quarters[i]["state"];
            }
            row.state = (qstateSum < row.quarters.length) ? (qstateSum === 0) ? 0 : -1 : 1;

            this.setState({
                years: [...years]
            })
        }
    }

    onChangeWeekDays = (weekDaysObj) => {
        let years = [...this.getYears()];
        let { days, weeks, mnth, qt, row, isCheck } = weekDaysObj;

        if (isCheck === true) {
            let wstateSum = 0;
            let qstateSum = 0;
            let mstateSum = 0;
            let wdstateSum = 0;
            days.state = 1;
            for (var n = 0; n < weeks.days.length; n++) {
                wdstateSum += weeks.days[n]["state"];
            }
            weeks.state = (wdstateSum < weeks.days.length) ? -1 : 1;

            for (var j = 0; j <mnth.weeks.length; j++) {
                wstateSum += mnth.weeks[j]["state"];
            }
            mnth.state = (wstateSum < mnth.weeks.length) ? -1 : 1;

            for (var k = 0; k < qt.months.length; k++) {
                mstateSum += qt.months[k]["state"];
            }
            qt.state = (mstateSum < qt.months.length) ? -1 : 1;

            for (var i = 0; i < row.quarters.length; i++) {
                qstateSum += row.quarters[i]["state"];
            }
            row.state = (qstateSum < row.quarters.length) ? -1 : 1;

            this.setState({
                years: [...years]
            })
        }
        else {
            let wstateSum = 0;
            let qstateSum = 0;
            let mstateSum = 0;
            let wdstateSum = 0;
           days.state =0;

            for (n = 0; n < weeks.days.length; n++) {
                wdstateSum += weeks.days[n]["state"];
            }
           weeks.state = (wdstateSum < weeks.days.length) ? (wdstateSum === 0) ? 0 : -1 : 1;


            for (j = 0; j < mnth.weeks.length; j++) {
                wstateSum += mnth.weeks[j]["state"];
            }
            mnth.state = (wstateSum < mnth.weeks.length) ? (wstateSum === 0) ? 0 : -1 : 1;



            for (k = 0; k < qt.months.length; k++) {
                mstateSum += qt.months[k]["state"];
            }
            qt.state = (mstateSum < qt.months.length) ? (mstateSum === 0) ? 0 : -1 : 1;

            for (i = 0; i < row.quarters.length; i++) {
                if (row.quarters[i]['state'] === -1) {
                    qstateSum = -1;
                    break;
                }
                qstateSum += row.quarters[i]["state"];
            }
            row.state = (qstateSum < row.quarters.length) ? (qstateSum === 0) ? 0 : -1 : 1;

            this.setState({
                years: [...years]
            })
        }
    }
    getYearCheckBoxClass = (row, index) => {
        let flag = false;
        const _years = [...this.getYears()];
        flag = (_years[index]["state"] === -1) ? true : false;
        return (flag) ? 'VS-Check-Checkmark VS-Check-Partial' : 'VS-Check-Checkmark';
    }


    renderYear = (year, index) => {
        let { options } = this.props;
        const { isSearching, years, filteredYears } = this.state;
        const _years = (isSearching === true) ? [...filteredYears] : [...years];

        return (

            <div className="VS-YearRow" key={'year' + index} >
                {
                    (year.showChild) ?
                        <span className="VS-Plus-Minus" onClick={() => this.collapseYear(year, index)}><span className="VS-ExpandCollapseSign">-</span></span> :
                        <span className="VS-Plus-Minus" onClick={() => this.expandYear(year, index)}><span className="VS-ExpandCollapse">+</span></span>
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
                    (year.showChild && year.quarters ) ?
                        <QuarterView options={options} years={_years} row={year} onChangeQuarter={this.onChangeQuarterHandler} onChangeMonth={this.onChangeMonth} onChangeDays={this.onChangeDays} onChangeWeeks={this.onChangeWeeks} onChangeWeekDays={this.onChangeWeekDays}></QuarterView> : (year.showChild && year.months) ?   

                        <MonthView options={options} years={this.state.years} yindex={index} onChange={this.onChangeHandler} onChangeMonth={this.onChangeMonth} onChangeDays={this.onChangeDays} onChangeWeeks={this.onChangeWeeks} onChangeWeekDays={this.onChangeWeekDays}></MonthView> : ''
                }
            </div>
        )
    }

    getSeachIconAlignClass() {
        return 'VS-PullLeft VS-SeachIcon';
    }

    getInputClass() {
        const { isSearching } = this.state;
        return (isSearching === true) ? 'VS-SearchBox VS-IsSearching' : 'VS-SearchBox';
    }

    filterYears = (val, years) => {
        let _years = [];
        let { showWeeks } = this.props.options;
        years.forEach((yr) => {
            let _quaters = [];
            let quaters = [...yr['quarters']];
            quaters.forEach((qt) => {
                let _months = [];
                let months = [...qt['months']];
                months.forEach((mn) => {
                    let _weeks = [];
                    let weeks = [...mn['weeks']];
                    if(showWeeks === true){
                        weeks.forEach((wk) => {
                            let _days = [];
                            let days = [...wk['days']];
                            days.forEach((dy) => {
                                _days.push({
                                    "date": dy.date,
                                    "day": dy.day,
                                    "state": 1
                                });
                            });

                            _weeks.push({
                                "week": wk.week,
                                "showChild": false,
                                "state": 1,
                                "days": [..._days]
                            });
                        });

                        _months.push({
                            "month": mn.month,
                            "showChild": false,
                            "state": 1,
                            "weeks": [..._weeks]
                        });

                    } else {
                        _months.push({
                            "month": mn.month,
                            "showChild": false,
                            "state": 1,
                            "days": [...mn.days]
                        });
                    }
                });

                _quaters.push({
                    "quarter": qt.quarter,
                    "showChild": true,
                    "state": 1,
                    "months": [..._months]
                });
            });
            _years.push({
                "year": yr.year,
                "showChild": true,
                "state": 1,
                "quarters": [..._quaters]
            });
        });
        this.setState({
            filteredYears: _years
        });
    }
    
    filterQuaters = (val) => {
        let _years = [];
        let { years } = this.state;
        let { showWeeks } = this.props.options;
        years.forEach((yr) => {
            let yearState = 0;
            let _quaters = [];
            let quaters = [...yr['quarters']];
            quaters.forEach((qt) => {
                var quarter = qt['quarter'].toString();
                var _camel = toCamelCase(val.toString());
                var n = quarter.includes(_camel.toString());
                if (n === true) {
                    yearState++;
                    let _months = [];
                    var months = [...qt['months']];
                    months.forEach((mn) => {
                        if (showWeeks === true) {
                            let _weeks = [];
                            var weeks = [...mn['weeks']];
                            weeks.forEach((wk) => {
                                let _days = [];
                                var days = [...wk['days']];
                                days.forEach((dy) => {
                                    _days.push({
                                        "date": dy.date,
                                        "day": dy.day,
                                        "state": 1
                                    });
                                });
                                
                                _weeks.push({
                                    "week": wk.week,
                                    "showChild": false,
                                    "state": 1,
                                    "days": [..._days]
                                });
                            });

                            _months.push({
                                "month": mn.month,
                                "showChild": false,
                                "state": 1,
                                "weeks": [..._weeks]
                            });
                        } else {
                            let _days = [];
                            var days = [...mn['days']];
                            days.forEach((dy) => {
                                _days.push({
                                    "date": dy.date,
                                    "day": dy.day,
                                    "state": 1
                                });
                            });

                            _months.push({
                                "month": mn.month,
                                "showChild": false,
                                "state": 1,
                                "weeks": [..._days]
                            });
                        }
                    });

                    _quaters.push({
                        "quarter": qt.quarter,
                        "showChild": true,
                        "state": 1,
                        "months": [..._months]
                    });
                }
            });
            
            _years.push({
                "year": yr.year,
                "showChild": true,
                "state": (yearState === 4)? 1 : -1,
                "quarters": [..._quaters]
            });
        });
        this.setState({
            filteredYears: _years
        });
    }

    filterMonths = (val) => {
        let _years = [];
        let { years } = this.state;
        let { showWeeks } = this.props.options;
        let existsInMonth = false;
        years.forEach((yr) => {
            let yearState = 0;
            let _quaters = [];
            let quaters = [...yr['quarters']];
            quaters.forEach((qt) => {
                let quaterState = 0;
                let _months = [];
                var months = [...qt['months']];
                existsInMonth = false;
                months.forEach((mn) => {
                    var month = mn['month'].toString();
                    var _camel = toCamelCase(val.toString());
                    var n = month.includes(_camel);
                    if (n === true) {
                        quaterState++;
                        existsInMonth = true;
                        if (showWeeks === true) {
                            let _weeks = [];
                            var weeks = [...mn['weeks']];
                            weeks.forEach((wk) => {
                                let _days = [];
                                var days = [...wk['days']];
                                days.forEach((dy) => {
                                    _days.push({
                                        "date": dy.date,
                                        "day": dy.day,
                                        "state": 1
                                    });
                                });
                                
                                _weeks.push({
                                    "week": wk.week,
                                    "showChild": false,
                                    "state": 1,
                                    "days": [..._days]
                                });
                            });

                            _months.push({
                                "month": mn.month,
                                "showChild": false,
                                "state": 1,
                                "weeks": [..._weeks]
                            });
                        } else {
                            let _days = [];
                            var days = [...mn['days']];
                            days.forEach((dy) => {
                                _days.push({
                                    "date": dy.date,
                                    "day": dy.day,
                                    "state": 1
                                });
                            });

                            _months.push({
                                "month": mn.month,
                                "showChild": false,
                                "state": 1,
                                "weeks": [..._days]
                            });
                        }
                    }
                });
                if (existsInMonth === true) {
                    _quaters.push({
                        "quarter": qt.quarter,
                        "showChild": true,
                        "state": (quaterState === 4)? 1 : -1,
                        "months": [..._months]
                    });
                    yearState = (quaterState === 4)? yearState + 1 : yearState;
                }
            });
            _years.push({
                "year": yr.year,
                "showChild": true,
                "state": (yearState === 4)? 1 : -1,
                "quarters": [..._quaters]
            });
        });
        this.setState({
            filteredYears: _years
        });
    }

    filterWeeks = (val) => {
        let _years = [];
        let { years } = this.state;
        let existsInWeek = false;
        years.forEach((yr) => {
            let yearState = 0;
            let _quaters = [];
            let quaters = [...yr['quarters']];
            quaters.forEach((qt) => {
                let quaterState = 0;
                let _months = [];
                var months = [...qt['months']];
                months.forEach((mn) => {
                    let monthState = 0;
                    let _weeks = [];
                    var weeks = [...mn['weeks']];
                    existsInWeek = false;
                    weeks.forEach((wk) => {
                        var week = wk['week'].toString();
                        week = week.replace(/ +(?= )/g, '');
                        week = toCamelCase(week.toString())
                        var _camel = toCamelCase(val.toString());
                        var n = week.includes(_camel.toString());
                        if (n === true) {
                            monthState++;
                            existsInWeek = true;

                            let _days = [];
                            var days = [...wk['days']];
                            days.forEach((dy) => {
                                _days.push({
                                    "date": dy.date,
                                    "day": dy.day,
                                    "state": 1
                                });
                            });

                            _weeks.push({
                                "week": wk.week,
                                "showChild": false,
                                "state": 1,
                                "days": [..._days]
                            });
                        }
                    });
                    if (existsInWeek === true) {
                        _months.push({
                            "month": mn.month,
                            "showChild": true,
                            "state": (monthState === weeks.length)? 1 : -1,
                            "weeks": [..._weeks]
                        });
                        quaterState = (monthState === weeks.length)? quaterState + 1 : quaterState;
                    }
                });
                _quaters.push({
                    "quarter": qt.quarter,
                    "showChild": true,
                    "state": (quaterState === 4)? 1 : -1,
                    "months": [..._months]
                });
                yearState = (quaterState === 4)? yearState + 1 : yearState;
            });
            _years.push({
                "year": yr.year,
                "showChild": true,
                "state": (yearState === 4)? 1 : -1,
                "quarters": [..._quaters]
            });
        });
        this.setState({
            filteredYears: _years
        });
    }

    filterDays = (val) => {
        let _years = [];
        let { years } = this.state;
        let { showWeeks } = this.props.options;
        let existsInDay = false;
        years.forEach((yr) => {
            let _quaters = [];
            let quaters = [...yr['quarters']];
            quaters.forEach((qt) => {
                let _months = [];
                var months = [...qt['months']];
                months.forEach((mn) => {
                    
                    if(showWeeks === true){
                        let _weeks = [];
                        var weeks = [...mn['weeks']];
                        weeks.forEach((wk) => {
                            let _days = [];
                            var days = [...wk['days']];
                            existsInDay = false;
                            days.forEach((dy) => {
                                var date = dy['date'].toString();
                                var n = date.includes(val.toString());
                                if (n === true) {
                                    existsInDay = true;
                                    _days.push({
                                        "date": dy.date,
                                        "day": dy.day,
                                        "state": 1
                                    });
                                }
                            });
                            
                            if(existsInDay === true){
                                _weeks.push({
                                    "week": wk.week,
                                    "showChild": true,
                                    "state": 1,
                                    "days": [..._days]
                                });
                            }
                        });

                        _months.push({
                            "month": mn.month,
                            "showChild": true,
                            "state": 1,
                            "weeks": [..._weeks]
                        });
                    } else {
                        let _days = [];
                        var days = [...mn['days']];
                        existsInDay = false;
                        days.forEach((dy) => {
                            var day = dy['day'].toString();
                            var n = day.includes(val.toString());
                            if (n === true) {
                                existsInDay = true;
                                _days.push({
                                    "day": dy.day,
                                    "state": 1
                                });
                            }
                        });
                        if (existsInDay === true) {
                            _months.push({
                                "month": mn.month,
                                "showChild": true,
                                "state": 1,
                                "days": [..._days]
                            });
                        }
                    }
                });
                _quaters.push({
                    "quarter": qt.quarter,
                    "showChild": true,
                    "state": 1,
                    "months": [..._months]
                });
            });
            _years.push({
                "year": yr.year,
                "showChild": true,
                "state": 1,
                "quarters": [..._quaters]
            });
        });
        this.setState({
            filteredYears: _years
        });
    }

    onChangeHandler = (name, e) => {
        this.setState({
            isSearching: !isUndefinedOrNull(e.target.value),
            searchValue: e.target.value
        });

        let val = e.target.value;
        let { years } = this.state;

        if (!isUndefinedOrNull(val)) {
            if (!isNaN(val)) {
                let existsInYear = false;
                let _years = [];
                years.forEach((ele) => {
                    var year = ele['year'].toString();
                    var n = year.includes(val.toString());
                    if (n === true) {
                        existsInYear = true;
                        _years.push(ele);
                    }
                });

                if (existsInYear) {
                    this.filterYears(val, _years);
                } else if (isQuaterVal(val)) {
                    this.filterQuaters(val);
                } else if (isWeekVal(val)) {
                    this.filterWeeks(val);
                } else if (isDayVal(val)) {
                    this.filterDays(val);
                }
            } else {
                if (isQuaterVal(val)) {
                    this.filterQuaters(val);
                } else if (isMonthVal(val)) {
                    this.filterMonths(val);
                } else if (isWeekVal(val)) {
                    this.filterWeeks(val);
                } else {
                    this.setState({
                        filteredYears: []
                    });
                }
            }
        } else {
            this.setState({
                filteredYears: []
            });
        }
    }

    onSelectSearchResultChange = ({target}) => {
        this.setState({
            isSelectAllSearchResult: target.checked
        });
    }
    
    onAddCurrentSelectionChange = ({target}) => {
        this.setState({
            isAddCurrentSelection: target.checked
        });
    }

    clearFilter = () => {
        let { searchValue, filteredYears} = this.state;
        let _lastFilterData = {
            'value': searchValue,
            'list': filteredYears
        };
        this.setState({
            isSearching: false,
            searchValue: "",
            lastFilterData: _lastFilterData
        });
    }
    
    closeFilter = () => {
        let { searchValue, filteredYears} = this.state;
        let _lastFilterData = {
            'value': searchValue,
            'list': filteredYears
        };
        this.setState({
            isSearching: false,
            searchValue: "",
            lastFilterData: _lastFilterData
        });
    }

    getCheckBoxClass = () => {
        return 'VS-Check-Checkmark';
    }

    render() {
        const { options } = this.props;
        const { isSearching, searchValue, years, filteredYears, isSelectAllSearchResult, lastFilterData, isAddCurrentSelection } = this.state;
        return (
            <div className="VS-Hierarchy" options={options}>
                <div className="VS-Hierarchy-Searchbox">
                    <span className={this.getSeachIconAlignClass()}>
                        <FaSearch className={`${CONSTANTS.CLASSES.VS_SHAPE} ${CONSTANTS.CLASSES.VS_TEXT_DARK}`} />
                    </span>
                    <input className={this.getInputClass()} type="text" value={searchValue} placeholder="Search.." onChange={this.onChangeHandler.bind(this, searchValue)}></input>
                    <span className={`${CONSTANTS.CLASSES.VS_PULL_RIGHT}`}>
                        <FaFilter className={`${CONSTANTS.CLASSES.VS_SHAPE} ${CONSTANTS.CLASSES.VS_TEXT_DARK} ${CONSTANTS.CLASSES.VS_FILTER_ICON} ${(isSearching === false) ? CONSTANTS.CLASSES.VS_DISABLED_ICON : ''}`} onClick={() => this.clearFilter()} />
                    </span>
                    {
                        (isSearching === true) ?
                            <span className={`${CONSTANTS.CLASSES.VS_PULL_RIGHT}`}>
                                <FaClose className={`${CONSTANTS.CLASSES.VS_SHAPE} ${CONSTANTS.CLASSES.VS_TEXT_DARK} ${CONSTANTS.CLASSES.VS_CLOSE_ICON}`} onClick={() => this.closeFilter()} />
                            </span> : ''
                    }
                </div>
                <div className="VS-Hierarchy-Filter-List VS-YearRow">
                    <label className="VS-Checkbox-Container">Select All Search Results
                        <input className="VS-Checkbox" type="checkbox" checked={isSelectAllSearchResult} onChange={(e) => this.onSelectSearchResultChange(e)}></input>
                        <span className={this.getCheckBoxClass()}></span>
                    </label>
                    {
                        (isSearching === true && lastFilterData && lastFilterData.value && lastFilterData.list)?
                        <label className="VS-Checkbox-Container">Add Current Selection
                            <input className="VS-Checkbox" type="checkbox" checked={isAddCurrentSelection} onChange={(e) => this.onAddCurrentSelectionChange(e)}></input>
                            <span className={this.getCheckBoxClass()}></span>
                        </label> : ''
                    }
                    
                </div>
                <div id="VS-Scrollbar">
                    {
                        (isSearching === true) ?
                            filteredYears.map((year, index) => this.renderYear(year, index)) :
                            years.map((year, index) => this.renderYear(year, index))
                    }
                </div>
            </div>
        )

    }

}
export default YearView;