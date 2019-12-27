import React from "react";
import { getListOfYears, isQuaterVal, isMonthVal, isWeekVal, isDayVal } from "../../utils/datehierarchyutils";
import { isUndefinedOrNull, toCamelCase } from "../../utils/utils";
import QuarterView from "./quarterView";
import { FaSearch, FaClose, FaFilter } from 'react-icons/lib/fa';
import * as CONSTANTS from '../../utils/constants'

class YearView extends React.PureComponent {
    constructor(props) {
        super(props);
        let { options } = this.props;
        let yearList = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.disabledList);
        this.state = { years: yearList, isSearching: false, searchValue: '', filteredYears: [] };
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

    onUnCheckYear(year, index) {
        let years = [...this.state.years]
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
        let years = [...this.state.years];
        let { showWeeks } = this.props.options;
        let { yindex, qindex } = quarterObj;
        let stateSum = 0;


        if (quarterObj.isCheck === true) {
            years[yindex]['quarters'][qindex]['state'] = 1;
            for (var i = 0; i < years[yindex]["quarters"].length; i++) {
                stateSum += years[yindex]["quarters"][i]["state"];
            }
            years[yindex]["state"] = (stateSum < 4) ? -1 : 1;
            let quarters = years[yindex]['quarters'];
            quarters[qindex]["months"].forEach((element, qindex1) => {
                quarters[qindex]["months"][qindex1]['state'] = 1;
                if (showWeeks === true) {
                    quarters[qindex]["months"][qindex1]['weeks'].forEach((element, qindex2) => {
                        quarters[qindex]["months"][qindex1]['weeks'][qindex2]['state'] = 1;
                        if (quarters[qindex]["months"][qindex1]['weeks'][qindex2]['days']) {
                            quarters[qindex]["months"][qindex1]['weeks'][qindex2]['days'].forEach((element, qindex3) => {
                                quarters[qindex]["months"][qindex1]['weeks'][qindex2]['days'][qindex3]['state'] = 1;
                            })
                        }
                    })
                }
                else {
                    if (quarters[qindex]["months"][qindex1]['days']) {
                        quarters[qindex]["months"][qindex1]['days'].forEach((element, qindex2) => {
                            quarters[qindex]["months"][qindex1]['days'][qindex2]['state'] = 1;
                        })
                    }
                }
            })

            this.setState({
                years: [...years]
            })

        }
        else {
            years[yindex]['quarters'][qindex]['state'] = 0;
            for (i = 0; i < years[yindex]["quarters"].length; i++) {
                stateSum += years[yindex]["quarters"][i]["state"];
            }
            years[yindex]["state"] = (stateSum < 4) ? (stateSum === 0) ? 0 : -1 : 1;
            let quarters = years[yindex]['quarters'];
            quarters[qindex]["months"].forEach((element, qindex1) => {
                quarters[qindex]["months"][qindex1]['state'] = 0;
                if (showWeeks === true) {
                    quarters[qindex]["months"][qindex1]['weeks'].forEach((element, qindex2) => {
                        quarters[qindex]["months"][qindex1]['weeks'][qindex2]['state'] = 0;
                        if (quarters[qindex]["months"][qindex1]['weeks'][qindex2]['days']) {
                            quarters[qindex]["months"][qindex1]['weeks'][qindex2]['days'].forEach((element, qindex3) => {
                                quarters[qindex]["months"][qindex1]['weeks'][qindex2]['days'][qindex3]['state'] = 0;
                            })
                        }
                    })
                }
                else {
                    if (quarters[qindex]["months"][qindex1]['days']) {
                        quarters[qindex]["months"][qindex1]['days'].forEach((element, qindex2) => {
                            quarters[qindex]["months"][qindex1]['days'][qindex2]['state'] = 0;
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
        let years = [...this.state.years];
        let { showWeeks } = this.props.options;
        let { yindex, qindex, mindex } = monthObj;
        let mstateSum = 0;
        let qstateSum = 0;
        if (monthObj.isCheck === true) {

            years[yindex]['quarters'][qindex]["months"][mindex]['state'] = 1;
            for (var i = 0; i < years[yindex]["quarters"][qindex]["months"].length; i++) {
                mstateSum += years[yindex]["quarters"][qindex]["months"][i]["state"];
            }
            years[yindex]['quarters'][qindex]["state"] = (mstateSum < 3) ? -1 : 1;

            for (var j = 0; j < years[yindex]["quarters"].length; j++) {
                qstateSum += years[yindex]["quarters"][j]["state"];
            }
            years[yindex]["state"] = (qstateSum < 4) ? -1 : 1;

            if (showWeeks === true) {

                let weeks = years[yindex]['quarters'][qindex]["months"][mindex]['weeks'];

                weeks.forEach((element, mindex) => {
                    weeks[mindex]['state'] = 1;
                    if (weeks[mindex]['days']) {
                        weeks[mindex]['days'].forEach((element, mindex1) => {
                            weeks[mindex]['days'][mindex1]['state'] = 1;
                        })
                    }
                });
            } else {
                let days = years[yindex]['quarters'][qindex]["months"][mindex]['days'];

                days.forEach((element, mindex) => {
                    days[mindex]['state'] = 1;
                });
            }

            this.setState({
                years: [...years]
            })

        } else {
            let stateSum = 0;
            let qstateSum = 0;
            years[yindex]['quarters'][qindex]["months"][mindex]['state'] = 0;

            for (i = 0; i < years[yindex]["quarters"][qindex]["months"].length; i++) {
                stateSum += years[yindex]["quarters"][qindex]["months"][i]["state"];
            }

            years[yindex]['quarters'][qindex]["state"] = (stateSum < 3) ? (stateSum === 0) ? 0 : -1 : 1;
            for (j = 0; j < years[yindex]["quarters"].length; j++) {
                if (years[yindex]["quarters"][j]['state'] === -1) {
                    qstateSum = -1;
                    break;
                }
                qstateSum += years[yindex]["quarters"][j]["state"];
            }
            years[yindex]["state"] = (qstateSum !== 0) ? (qstateSum < 4) ? -1 : 1 : 0;

            if (showWeeks === true) {
                let weeks = years[yindex]['quarters'][qindex]["months"][mindex]['weeks'];
                weeks.forEach((element, mindex) => {
                    weeks[mindex]['state'] = 0;
                    if (weeks[mindex]['days']) {
                        weeks[mindex]['days'].forEach((element, mindex1) => {
                            weeks[mindex]['days'][mindex1]['state'] = 0;
                        })
                    }
                });
            } else {
                let days = years[yindex]['quarters'][qindex]["months"][mindex]['days'];

                days.forEach((element, mindex) => {
                    days[mindex]['state'] = 0;
                });
            }

            this.setState({
                years: [...years]
            })
        }
    }

    onChangeDays = (daysObj) => {
        let years = [...this.state.years];
        let days = daysObj.days;
        let { yindex, qindex, mindex, dindex, isCheck } = daysObj;

        if (isCheck === true) {
            let dstateSum = 0;
            let qstateSum = 0;
            let mstateSum = 0;
            days['state'] = 1;
            for (var j = 0; j < years[yindex]["quarters"][qindex]["months"][mindex]['days'].length; j++) {
                dstateSum += years[yindex]["quarters"][qindex]["months"][mindex]['days'][j]["state"];
            }
            years[yindex]['quarters'][qindex]["months"][mindex]['state'] = (dstateSum < years[yindex]["quarters"][qindex]["months"][mindex]['days'].length) ? -1 : 1;

            for (var k = 0; k < years[yindex]["quarters"][qindex]["months"].length; k++) {
                mstateSum += years[yindex]["quarters"][qindex]["months"][k]["state"];
            }
            years[yindex]['quarters'][qindex]["state"] = (mstateSum < 3) ? -1 : 1;

            for (var i = 0; i < years[yindex]["quarters"].length; i++) {
                qstateSum += years[yindex]["quarters"][i]["state"];
            }
            years[yindex]["state"] = (qstateSum < 4) ? -1 : 1;

            this.setState({
                years: [...years]
            })
        }
        else {
            let years = [...this.state.years];
            let dstateSum = 0;
            let qstateSum = 0;
            let mstateSum = 0;
            years[yindex]['quarters'][qindex]["months"][mindex]['days'][dindex]['state'] = 0;
            for (j = 0; j < years[yindex]["quarters"][qindex]["months"][mindex]['days'].length; j++) {
                dstateSum += years[yindex]["quarters"][qindex]["months"][mindex]['days'][j]["state"];
            }
            years[yindex]["quarters"][qindex]["months"][mindex]['state'] = (dstateSum < years[yindex]["quarters"][qindex]["months"][mindex]['days'].length) ? (dstateSum === 0) ? 0 : -1 : 1;



            for (k = 0; k < years[yindex]["quarters"][qindex]["months"].length; k++) {
                mstateSum += years[yindex]["quarters"][qindex]["months"][k]["state"];
            }
            years[yindex]["quarters"][qindex]["state"] = (mstateSum < years[yindex]["quarters"][qindex]["months"].length) ? (mstateSum === 0) ? 0 : -1 : 1;

            for (i = 0; i < years[yindex]["quarters"].length; i++) {
                if (years[yindex]["quarters"][i]['state'] === -1) {
                    qstateSum = -1;
                    break;
                }
                qstateSum += years[yindex]["quarters"][i]["state"];
            }
            years[yindex]["state"] = (qstateSum < 4) ? (qstateSum === 0) ? 0 : -1 : 1;

            this.setState({
                years: [...years]
            })
        }
    }

    onChangeWeeks = (weeksObj) => {
        let years = [...this.state.years];
        let { yindex, qindex, mindex, windex, isCheck } = weeksObj;
        if (isCheck === true) {
            let wstateSum = 0;
            let qstateSum = 0;
            let mstateSum = 0;
            years[yindex]['quarters'][qindex]["months"][mindex]['weeks'][windex]['state'] = 1;
            if (years[yindex]['quarters'][qindex]["months"][mindex]['weeks'][windex]['days']) {
                years[yindex]['quarters'][qindex]["months"][mindex]['weeks'][windex]['days'].forEach((element, windex1) => {
                    years[yindex]['quarters'][qindex]["months"][mindex]['weeks'][windex]['days'][windex1]['state'] = 1;
                });
            }
            for (var j = 0; j < years[yindex]["quarters"][qindex]["months"][mindex]['weeks'].length; j++) {
                wstateSum += years[yindex]["quarters"][qindex]["months"][mindex]['weeks'][j]["state"];
            }
            years[yindex]["quarters"][qindex]["months"][mindex]['state'] = (wstateSum < years[yindex]["quarters"][qindex]["months"][mindex]['weeks'].length) ? -1 : 1;
            for (var k = 0; k < years[yindex]["quarters"][qindex]["months"].length; k++) {
                mstateSum += years[yindex]["quarters"][qindex]["months"][k]["state"];
            }
            years[yindex]["quarters"][qindex]["state"] = (mstateSum < 3) ? -1 : 1;

            for (var i = 0; i < years[yindex]["quarters"].length; i++) {
                qstateSum += years[yindex]["quarters"][i]["state"];
            }
            years[yindex]["state"] = (qstateSum < 4) ? -1 : 1;

            this.setState({
                years: [...years]
            })
        }
        else {
            let wstateSum = 0;
            let qstateSum = 0;
            let mstateSum = 0;
            years[yindex]["quarters"][qindex]["months"][mindex]['weeks'][windex]['state'] = 0;
            if (years[yindex]["quarters"][qindex]["months"][mindex]['weeks'][windex]['days']) {
                years[yindex]["quarters"][qindex]["months"][mindex]['weeks'][windex]['days'].forEach((element, windex1) => {
                    years[yindex]["quarters"][qindex]["months"][mindex]['weeks'][windex]['days'][windex1]['state'] = 0;
                });
            }
            for (j = 0; j < years[yindex]["quarters"][qindex]["months"][mindex]['weeks'].length; j++) {
                wstateSum += years[yindex]["quarters"][qindex]["months"][mindex]['weeks'][j]["state"];
            }
            years[yindex]["quarters"][qindex]["months"][mindex]['state'] = (wstateSum < years[yindex]["quarters"][qindex]["months"][mindex]['weeks'].length) ? (wstateSum === 0) ? 0 : -1 : 1;


            for (k = 0; k < years[yindex]["quarters"][qindex]["months"].length; k++) {
                mstateSum += years[yindex]["quarters"][qindex]["months"][k]["state"];
            }
            years[yindex]["quarters"][qindex]["state"] = (mstateSum < years[yindex]["quarters"][qindex]["months"].length) ? (mstateSum === 0) ? 0 : -1 : 1;

            for (i = 0; i < years[yindex]["quarters"].length; i++) {
                if (years[yindex]["quarters"][i]['state'] === -1) {
                    qstateSum = -1;
                    break;
                }
                qstateSum += years[yindex]["quarters"][i]["state"];
            }
            years[yindex]["state"] = (qstateSum < 4) ? (qstateSum === 0) ? 0 : -1 : 1;

            this.setState({
                years: [...years]
            })
        }
    }

    onChangeWeekDays = (weekDaysObj) => {
        let years = [...this.state.years];
        let { yindex, qindex, mindex, windex, wdindex, isCheck } = weekDaysObj;

        if (isCheck === true) {
            let wstateSum = 0;
            let qstateSum = 0;
            let mstateSum = 0;
            let wdstateSum = 0;
            years[yindex]["quarters"][qindex]["months"][mindex]['weeks'][windex]['days'][wdindex]['state'] = 1;
            for (var n = 0; n < years[yindex]["quarters"][qindex]["months"][mindex]['weeks'][windex]['days'].length; n++) {
                wdstateSum += years[yindex]["quarters"][qindex]["months"][mindex]['weeks'][windex]['days'][n]["state"];
            }
            years[yindex]["quarters"][qindex]["months"][mindex]['weeks'][windex]['state'] = (wdstateSum < years[yindex]["quarters"][qindex]["months"][mindex]['weeks'][windex]['days'].length) ? -1 : 1;

            for (var j = 0; j < years[yindex]["quarters"][qindex]["months"][mindex]['weeks'].length; j++) {
                wstateSum += years[yindex]["quarters"][qindex]["months"][mindex]['weeks'][j]["state"];
            }
            years[yindex]["quarters"][qindex]["months"][mindex]['state'] = (wstateSum < years[yindex]["quarters"][qindex]["months"][mindex]['weeks'].length) ? -1 : 1;

            for (var k = 0; k < years[yindex]["quarters"][qindex]["months"].length; k++) {
                mstateSum += years[yindex]["quarters"][qindex]["months"][k]["state"];
            }
            years[yindex]["quarters"][qindex]["state"] = (mstateSum < 3) ? -1 : 1;

            for (var i = 0; i < years[yindex]["quarters"].length; i++) {
                qstateSum += years[yindex]["quarters"][i]["state"];
            }
            years[yindex]["state"] = (qstateSum < 4) ? -1 : 1;

            this.setState({
                years: [...years]
            })
        }
        else {
            let wstateSum = 0;
            let qstateSum = 0;
            let mstateSum = 0;
            let wdstateSum = 0;
            years[yindex]["quarters"][qindex]["months"][mindex]['weeks'][windex]['days'][wdindex]['state'] = 0;

            for (n = 0; n < years[yindex]["quarters"][qindex]["months"][mindex]['weeks'][windex]['days'].length; n++) {
                wdstateSum += years[yindex]["quarters"][qindex]["months"][mindex]['weeks'][windex]['days'][n]["state"];
            }
            years[yindex]["quarters"][qindex]["months"][mindex]['weeks'][windex]['state'] = (wdstateSum < years[yindex]["quarters"][qindex]["months"][mindex]['weeks'][windex]['days'].length) ? (wdstateSum === 0) ? 0 : -1 : 1;


            for (j = 0; j < years[yindex]["quarters"][qindex]["months"][mindex]['weeks'].length; j++) {
                wstateSum += years[yindex]["quarters"][qindex]["months"][mindex]['weeks'][j]["state"];
            }
            years[yindex]["quarters"][qindex]["months"][mindex]['state'] = (wstateSum < years[yindex]["quarters"][qindex]["months"][mindex]['weeks'].length) ? (wstateSum === 0) ? 0 : -1 : 1;



            for (k = 0; k < years[yindex]["quarters"][qindex]["months"].length; k++) {
                mstateSum += years[yindex]["quarters"][qindex]["months"][k]["state"];
            }
            years[yindex]["quarters"][qindex]["state"] = (mstateSum < years[yindex]["quarters"][qindex]["months"].length) ? (mstateSum === 0) ? 0 : -1 : 1;

            for (i = 0; i < years[yindex]["quarters"].length; i++) {
                if (years[yindex]["quarters"][i]['state'] === -1) {
                    qstateSum = -1;
                    break;
                }
                qstateSum += years[yindex]["quarters"][i]["state"];
            }
            years[yindex]["state"] = (qstateSum < 4) ? (qstateSum === 0) ? 0 : -1 : 1;

            this.setState({
                years: [...years]
            })
        }
    }
    getYearCheckBoxClass = (row, index) => {
        let flag = false;
        let years = [...this.state.years];
        flag = (years[index]["state"] === -1) ? true : false;
        return (flag) ? 'VS-Check-Checkmark VS-Check-Partial' : 'VS-Check-Checkmark';
    }


    renderYear = (year, index) => {
        let { options } = this.props;
        const { isSearching, years, filteredYears } = this.state;
        const _years = (isSearching === true)? [...filteredYears] : [...years];

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
                    (year.showChild && year.quarters) ?
                        <QuarterView options={options} years={_years} yindex={index} onChangeQuarter={this.onChangeQuarterHandler} onChangeMonth={this.onChangeMonth} onChangeDays={this.onChangeDays} onChangeWeeks={this.onChangeWeeks} onChangeWeekDays={this.onChangeWeekDays}></QuarterView> : ''
                }
            </div>
        )
    }

    getSeachIconAlignClass() {
        return 'VS-PullLeft VS-SeachIcon';
    }
    
    getInputClass() {
        const { isSearching } = this.state;
        return (isSearching === true)? 'VS-SearchBox VS-IsSearching' : 'VS-SearchBox';
    }

    filterQuaters = (val) => {
        let _years = [];
        let { years } = this.state;
        years.forEach((yr) => {
            let _quaters = [];
            let quaters = [...yr['quarters']];
            quaters.forEach((qt) => {
                var quarter = qt['quarter'].toString();
                var n = quarter.includes(val.toString());

                if(n === true){
                    _quaters.push({
                        "quarter": qt.quarter,
                        "showChild": qt.showChild,
                        "state": 1,
                        "months": qt.months
                    });
                }
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
   
    filterMonths = (val) => {
        let _years = [];
        let { years, showWeeks } = this.state;
        let existsInMonth = false;
        years.forEach((yr) => {
            let _quaters = [];
            let quaters = [...yr['quarters']];
            quaters.forEach((qt) => {
                let _months = [];
                var months = [...qt['months']];
                existsInMonth = false;
                months.forEach((mn) => {
                    var month = mn['month'].toString();
                    var _camel = toCamelCase(val.toString());
                    var n = month.includes(_camel);
                    if(n === true){
                        existsInMonth = true;
                        if(showWeeks === true){
                            _months.push({
                                "month": mn.month,
                                "showChild": true,
                                "state": 1,
                                "weeks": mn.weeks
                            });
                        } else {
                            _months.push({
                                "month": mn.month,
                                "showChild": true,
                                "state": 1,
                                "days": mn.days
                            });
                        }
                    }
                });
                if(existsInMonth === true){
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
                "state": 1,
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
            let _quaters = [];
            let quaters = [...yr['quarters']];
            quaters.forEach((qt) => {
                let _months = [];
                var months = [...qt['months']];
                months.forEach((mn) => {
                    let _weeks = [];
                    var weeks = [...mn['weeks']];
                    existsInWeek = false;
                    weeks.forEach((wk) => {
                        var week = wk['week'].toString();
                        week = week.replace(/ +(?= )/g,'');
                        week = toCamelCase(week.toString())
                        var _camel = toCamelCase(val.toString());
                        var n = week.includes(_camel.toString());
                        if(n === true){
                            existsInWeek = true;
                            _weeks.push({
                                "week": wk.week,
                                "showChild": true,
                                "state": 1,
                                "days": wk.days
                            });
                        }
                    });
                    if(existsInWeek === true){
                        _months.push({
                            "month": mn.month,
                            "showChild": true,
                            "state": 1,
                            "weeks": [..._weeks]
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
    
    filterDays = (val) => {
        let _years = [];
        let { years } = this.state;
        let existsInDay = false;
        years.forEach((yr) => {
            let _quaters = [];
            let quaters = [...yr['quarters']];
            quaters.forEach((qt) => {
                let _months = [];
                var months = [...qt['months']];
                months.forEach((mn) => {
                    let _days = [];
                    var days = [...mn['days']];
                    existsInDay = false;
                    days.forEach((dy) => {
                        var day = dy['day'].toString();
                        var n = day.includes(val.toString());
                        if(n === true){
                            existsInDay = true;
                            _days.push({
                                "day": dy.day,
                                "state": 1
                            });
                        }
                    });
                    if(existsInDay === true){
                        _months.push({
                            "month": mn.month,
                            "showChild": true,
                            "state": 1,
                            "days": [..._days]
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

    onChangeHandler = (name, e) => {
        this.setState({
            isSearching: !isUndefinedOrNull(e.target.value),
            searchValue: e.target.value
        });

        let val = e.target.value;
        let { years } = this.state;

        if(!isUndefinedOrNull(val)){
            if(!isNaN(val)){
                let existsInYear = false;
                let _years = [];
                years.forEach((ele) => {
                    var year = ele['year'].toString();
                    var n = year.includes(val.toString());
                    if(n === true){
                        existsInYear = true;
                        _years.push(ele);
                    }
                });

                if(existsInYear){
                    this.setState({
                        filteredYears: _years
                    });
                } else if(isQuaterVal(val)){
                    this.filterQuaters(val);
                } else if(isWeekVal(val)){
                    this.filterWeeks(val);
                } else if(isDayVal(val)){
                    this.filterDays(val);
                }
            } else {
                if(isQuaterVal(val)){
                    this.filterQuaters(val);
                } else if(isMonthVal(val)){
                    this.filterMonths(val);
                } else if(isWeekVal(val)){
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

    render() {
        const { options } = this.props;
        const { isSearching, searchValue, years, filteredYears } = this.state;
        return (
            <div id="VS-Scrollbar" className="VS-Hierarchy" options={options}>
                <div className="VS-Hierarchy-Searchbox">
                    <span className={this.getSeachIconAlignClass()}>
                        <FaSearch className={`${CONSTANTS.CLASSES.VS_SHAPE} ${CONSTANTS.CLASSES.VS_TEXT_DARK}`} />
                    </span>
                    <input className={this.getInputClass()} type="text" placeholder="Search.." onChange={this.onChangeHandler.bind(this, searchValue)}></input>
                    <span className={`${CONSTANTS.CLASSES.VS_PULL_RIGHT}`}>
                        <FaFilter className={`${CONSTANTS.CLASSES.VS_SHAPE} ${CONSTANTS.CLASSES.VS_TEXT_DARK} ${CONSTANTS.CLASSES.VS_FILTER_ICON} ${(isSearching === false)? CONSTANTS.CLASSES.VS_DISABLED_ICON : ''}`} />
                    </span>
                    {
                        (isSearching === true)?
                        <span className={`${CONSTANTS.CLASSES.VS_PULL_RIGHT}`}>
                            <FaClose className={`${CONSTANTS.CLASSES.VS_SHAPE} ${CONSTANTS.CLASSES.VS_TEXT_DARK} ${CONSTANTS.CLASSES.VS_CLOSE_ICON}`} />
                        </span> : ''
                    }
                </div>
                {
                    (isSearching === true)?
                    filteredYears.map((year, index) => this.renderYear(year, index)) :
                    years.map((year, index) => this.renderYear(year, index))
                }
            </div>
        )

    }

}
export default YearView;