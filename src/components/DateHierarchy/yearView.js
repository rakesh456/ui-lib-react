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
        this.state = { years: yearList, isSearching: false, searchValue: '', filteredYears: [], filteredData: [], isSelectAllSearchResult: true, isAddCurrentSelection: false, isSelectAll: false, lastFilterData: { 'value': '', 'list': [] } };
    }

    getYears() {
        const { isSearching, years, filteredYears } = this.state;
        return (isSearching === true) ? [...filteredYears] : [...years];
    }

    componentDidMount() {
        let years = [...this.getYears()];
        this.setState({ years: [...years] });
    }

    toggleYearChild(year, showChild) {
        let years = [...this.getYears()];
        year['showChild'] = showChild;
        this.setState({
            years: [...years]
        })
    }

    toggleYearCheck(year, isCheck) {
        let years = [...this.getYears()];
        let { showWeeks, showQuarters } = this.props.options;
        year["state"] = isCheck;
        if (showQuarters === true) {
            let quarters = year['quarters'];
            quarters.forEach((element, index) => {
                quarters[index]['state'] = isCheck;
                quarters[index]['months'].forEach((element, index1) => {
                    quarters[index]['months'][index1]['state'] = isCheck;
                    if (showWeeks === true) {
                        quarters[index]['months'][index1]['weeks'].forEach((element, index2) => {
                            quarters[index]['months'][index1]['weeks'][index2]['state'] = isCheck;
                            if (quarters[index]['months'][index1]['weeks'][index2]['days']) {
                                quarters[index]['months'][index1]['weeks'][index2]['days'].forEach((element, index3) => {
                                    quarters[index]['months'][index1]['weeks'][index2]['days'][index3]['state'] = isCheck;
                                });
                            }
                        });
                    } else {
                        quarters[index]['months'][index1]['days'].forEach((element, index2) => {
                            quarters[index]['months'][index1]['days'][index2]['state'] = isCheck;
                        });
                    }
                });
            });
        }
        else {
            let months = year['months'];
            months.forEach((element, index) => {
                months[index]['state'] = isCheck;
                if (showWeeks === true) {
                    months[index]['weeks'].forEach((element, index1) => {
                        months[index]['weeks'][index1]['state'] = isCheck;
                        if (months[index]['weeks'][index1]['days']) {
                            months[index]['weeks'][index1]['days'].forEach((element, index2) => {
                                months[index]['weeks'][index1]['days'][index2]['state'] = isCheck;
                            });
                        }
                    });
                } else {
                    months[index]['days'].forEach((element, index1) => {
                        months[index]['days'][index1]['state'] = isCheck;
                    });
                }
            });
        }
        this.setState({
            years: [...years]
        })
    
        this.updateSelectAllCheckbox();
    }

    onChangeQuarterHandler = (quarterObj) => {
        let years = [...this.getYears()];
        let { showWeeks } = this.props.options;
        let { quarter, year, isCheck } = quarterObj;
        let stateSum = 0;
        quarter.state = (isCheck === true)? 1 : 0;
        for (var i = 0; i < year.quarters.length; i++) {
            stateSum += year.quarters[i]["state"];
        }
        if (quarterObj.isCheck === true) {
            year.state = (stateSum < year.quarters.length) ? -1 : 1;
        } else {
            year.state = (stateSum < year.quarters.length) ? (stateSum === 0) ? 0 : -1 : 1;
        }
        quarter.months.forEach((element, qindex1) => {
            quarter.months[qindex1]['state'] = quarter.state;
            if (showWeeks === true) {
                quarter.months[qindex1]['weeks'].forEach((element, qindex2) => {
                    quarter.months[qindex1]['weeks'][qindex2]['state'] = quarter.state;
                    if (quarter.months[qindex1]['weeks'][qindex2]['days']) {
                        quarter.months[qindex1]['weeks'][qindex2]['days'].forEach((element, qindex3) => {
                            quarter.months[qindex1]['weeks'][qindex2]['days'][qindex3]['state'] = quarter.state;
                        })
                    }
                })
            }
            else {
                if (quarter.months[qindex1]['days']) {
                    quarter.months[qindex1]['days'].forEach((element, qindex2) => {
                        quarter.months[qindex1]['days'][qindex2]['state'] = quarter.state;
                    })
                }
            }
        })

        this.setState({
            years: [...years]
        })

        this.updateSelectAllCheckbox();
    }

    onChangeMonthHandler = (monthObj) => {
        let years = [...this.getYears()];
        let { showWeeks, showQuarters } = this.props.options;
        let { month, quarter, year } = monthObj;
        let mstateSum = 0;
        let qstateSum = 0;

        if (monthObj.isCheck === true) {
            month.state = 1;
            if (showQuarters === true) {
                for (var i = 0; i < quarter.months.length; i++) {
                    mstateSum += quarter.months[i]["state"];
                }
                quarter.state = (mstateSum < quarter.months.length) ? -1 : 1;

                for (var j = 0; j < year.quarters.length; j++) {
                    qstateSum += year.quarters[j]["state"];
                }
                year.state = (qstateSum < year.quarters.length) ? -1 : 1;
            }
            if (showWeeks === true) {
                let weeks = month.weeks;                
                weeks.forEach((element, index) => {
                    weeks[index]['state'] = 1;
                    if (weeks[index]['days']) {
                        weeks[index]['days'].forEach((element, index1) => {
                            weeks[index]['days'][index1]['state'] = 1;
                        })
                    }
                });
            } else {
                let days = month.days;
                if (days) {
                    days.forEach((element, index) => {
                        days[index]['state'] = 1;
                    });
                }
            }
            if (showQuarters === false) {
                for (j = 0; j < year.months.length; j++) {
                    qstateSum += year.months[j]["state"];
                }
                year.state = (qstateSum < year.months.length) ? -1 : 1;
            }
            this.setState({
                years: [...years]
            })
            this.updateSelectAllCheckbox();
        } else {
            let stateSum = 0;
            let qstateSum = 0;
            month.state = 0;
            if (showQuarters === true) {
                for (i = 0; i < quarter.months.length; i++) {
                    stateSum += quarter.months[i]["state"];
                }
                quarter.state = (stateSum < quarter.months.length) ? (stateSum === 0) ? 0 : -1 : 1;

                for (j = 0; j < year.quarters.length; j++) {
                    if (year.quarters[j]['state'] === -1) {
                        qstateSum = -1;
                        break;
                    }
                    qstateSum += year.quarters[j]["state"];
                }
                year.state = (qstateSum !== 0) ? (qstateSum < year.quarters.length) ? -1 : 1 : 0;
            }
            if (showWeeks === true) {
                let weeks = month.weeks;
                weeks.forEach((element, index) => {
                    weeks[index]['state'] = 0;
                    if (weeks[index]['days']) {
                        weeks[index]['days'].forEach((element, index1) => {
                            weeks[index]['days'][index1]['state'] = 0;
                        })
                    }
                });
            } else {
                let days = month.days;
                if (days) {
                    days.forEach((element, index) => {
                        days[index]['state'] = 0;
                    });
                }
            }
            if (showQuarters === false) {
                for (j = 0; j < year.months.length; j++) {
                    if (year.months[j]['state'] === -1) {
                        qstateSum = -1;
                        break;
                    }
                    qstateSum += year.months[j]["state"];
                }
                year.state = (qstateSum !== 0) ? (qstateSum < year.months.length) ? -1 : 1 : 0;
            }

            this.setState({
                years: [...years]
            });
            this.updateSelectAllCheckbox();
        }
    }

    onChangeDayHandler = (dayObj) => {
        let years = [...this.getYears()];
        
        let { day, month, quarter, year, isCheck } = dayObj;
        
        let { showQuarters } = this.props.options;
        let dstateSum = 0;
        let qstateSum = 0;
        let mstateSum = 0;
            
        if (isCheck === true) {
            day['state'] = 1;
            for (var j = 0; j < month.days.length; j++) {
                dstateSum += month.days[j]["state"];
            }
            month.state = (dstateSum < month.days.length) ? -1 : 1;
            if (showQuarters === true) {
                for (var k = 0; k < quarter.months.length; k++) {
                    mstateSum += quarter.months[k]["state"];
                }
                quarter.state = (mstateSum < quarter.months.length) ? -1 : 1;

                for (var i = 0; i < year.quarters.length; i++) {
                    qstateSum += year.quarters[i]["state"];
                }
                year.state = (qstateSum < 4) ? -1 : 1;
            }
            if (showQuarters === false) {
                for (k = 0; k < year.months.length; k++) {
                    mstateSum += year.months[k]["state"];
                }
                year.state = (mstateSum < year.months.length) ? -1 : 1;
            }
            this.setState({
                years: [...years]
            });

            this.forceUpdate();            
        }
        else {
            day.state = 0;
            for (j = 0; j < month.days.length; j++) {
                dstateSum += month.days[j]["state"];
            }
            month.state = (dstateSum < month.days.length) ? (dstateSum === 0) ? 0 : -1 : 1;
            if (showQuarters === true) {
                for (k = 0; k < quarter.months.length; k++) {
                    mstateSum += quarter.months[k]["state"];
                }
                quarter.state = (mstateSum < quarter.months.length) ? (mstateSum === 0) ? 0 : -1 : 1;

                for (i = 0; i < year.quarters.length; i++) {
                    if (year.quarters[i]['state'] === -1) {
                        qstateSum = -1;
                        break;
                    }
                    qstateSum += year.quarters[i]["state"];
                }
                year.state = (qstateSum < year.quarters.length) ? (qstateSum === 0) ? 0 : -1 : 1;
            }
            if (showQuarters === false) {
                for (i = 0; i < year.months.length; i++) {
                    if (year.months[i]['state'] === -1) {
                        qstateSum = -1;
                        break;
                    }
                    qstateSum += year.months[i]["state"];
                }
                year.state = (qstateSum < year.months.length) ? (qstateSum === 0) ? 0 : -1 : 1;
            }
            this.setState({
                years: [...years]
            });            
        }
    }

    onChangeWeek = (weekObj) => {
        let years = [...this.getYears()];
        let { showQuarters } = this.props.options;
        let { week, month, quarter, year, isCheck } = weekObj;
        if (isCheck === true) {
            let wstateSum = 0;
            let qstateSum = 0;
            let mstateSum = 0;
            week.state = 1;
            if (week.days) {
                week.days.forEach((element, index) => {
                    week.days[index]['state'] = 1;
                });
            }
            for (var j = 0; j < month.weeks.length; j++) {
                wstateSum += month.weeks[j]["state"];
            }
            month.state = (wstateSum < month.weeks.length) ? -1 : 1;
            if (showQuarters === true) {
                for (var k = 0; k < quarter.months.length; k++) {
                    mstateSum += quarter.months[k]["state"];
                }
                quarter.state = (mstateSum < quarter.months.length) ? -1 : 1;

                for (var i = 0; i < year.quarters.length; i++) {
                    qstateSum += year.quarters[i]["state"];
                }
                year.state = (qstateSum < year.quarters.length) ? -1 : 1;
            }
            if (showQuarters === false) {
                for (k = 0; k < year.months.length; k++) {
                    mstateSum += year.months[k]["state"];
                }
                year.state = (mstateSum < year.months.length) ? -1 : 1;
            }
            this.setState({
                years: [...years]
            });
            this.updateSelectAllCheckbox();
        }
        else {
            let wstateSum = 0;
            let qstateSum = 0;
            let mstateSum = 0;
            week.state = 0;
            if (week.days) {
                week.days.forEach((element, index) => {
                    week.days[index]['state'] = 0;
                });
            }
            for (j = 0; j < month.weeks.length; j++) {
                wstateSum += month.weeks[j]["state"];
            }
            month.state = (wstateSum < month.weeks.length) ? (wstateSum === 0) ? 0 : -1 : 1;

            if (showQuarters === true) {
                for (k = 0; k < quarter.months.length; k++) {
                    mstateSum += quarter.months[k]["state"];
                }
                quarter.state = (mstateSum < quarter.months.length) ? (mstateSum === 0) ? 0 : -1 : 1;

                for (i = 0; i < year.quarters.length; i++) {
                    if (year.quarters[i]['state'] === -1) {
                        qstateSum = -1;
                        break;
                    }
                    qstateSum += year.quarters[i]["state"];
                }
                year.state = (qstateSum < year.quarters.length) ? (qstateSum === 0) ? 0 : -1 : 1;
            }
            if (showQuarters === false) {
                for (k = 0; k < year.months.length; k++) {
                    mstateSum += year.months[k]["state"];
                }
                year.state = (mstateSum < year.months.length) ? (mstateSum === 0) ? 0 : -1 : 1;
            }
            this.setState({
                years: [...years]
            });
            this.updateSelectAllCheckbox();
        }
    }

    onChangeWeekDay = (weekDaysObj) => {
        let years = [...this.getYears()];
        let { showQuarters } = this.props.options;
        let { day, week, month, quarter, year, isCheck } = weekDaysObj;

        let wstateSum = 0;
        let qstateSum = 0;
        let mstateSum = 0;
        let wdstateSum = 0;
        if (isCheck === true) {
            day.state = 1;
            for (var n = 0; n < week.days.length; n++) {
                wdstateSum += week.days[n]["state"];
            }
            week.state = (wdstateSum < week.days.length) ? -1 : 1;

            for (var j = 0; j < month.weeks.length; j++) {
                wstateSum += month.weeks[j]["state"];
            }
            month.state = (wstateSum < month.weeks.length) ? -1 : 1;
            if (showQuarters === true) {
                for (var k = 0; k < quarter.months.length; k++) {
                    mstateSum += quarter.months[k]["state"];
                }
                quarter.state = (mstateSum < quarter.months.length) ? -1 : 1;

                for (var i = 0; i < year.quarters.length; i++) {
                    qstateSum += year.quarters[i]["state"];
                }
                year.state = (qstateSum < year.quarters.length) ? -1 : 1;
            }
            if (showQuarters === false) {
                for (k = 0; k < year.months.length; k++) {
                    mstateSum += year.months[k]["state"];
                }
                year.state = (mstateSum < year.months.length) ? -1 : 1;
            }
            this.setState({
                years: [...years]
            });
            this.updateSelectAllCheckbox();
        }
        else {
            day.state = 0;

            for (n = 0; n < week.days.length; n++) {
                wdstateSum += week.days[n]["state"];
            }
            week.state = (wdstateSum < week.days.length) ? (wdstateSum === 0) ? 0 : -1 : 1;
            for (j = 0; j < month.weeks.length; j++) {
                wstateSum += month.weeks[j]["state"];
            }
            month.state = (wstateSum < month.weeks.length) ? (wstateSum === 0) ? 0 : -1 : 1;
            if (showQuarters === true) {
                for (k = 0; k < quarter.months.length; k++) {
                    mstateSum += quarter.months[k]["state"];
                }
                quarter.state = (mstateSum < quarter.months.length) ? (mstateSum === 0) ? 0 : -1 : 1;

                for (i = 0; i < year.quarters.length; i++) {
                    if (year.quarters[i]['state'] === -1) {
                        qstateSum = -1;
                        break;
                    }
                    qstateSum += year.quarters[i]["state"];
                }
                year.state = (qstateSum < year.quarters.length) ? (qstateSum === 0) ? 0 : -1 : 1;
            }
            if (showQuarters === false) {
                for (i = 0; i < year.months.length; i++) {
                    if (year.months[i]['state'] === -1) {
                        qstateSum = -1;
                        break;
                    }
                    qstateSum += year.months[i]["state"];
                }
                year.state = (qstateSum < year.months.length) ? (qstateSum === 0) ? 0 : -1 : 1; 
            }
            this.setState({
                years: [...years]
            });
            this.updateSelectAllCheckbox();
        }
    }

    getYearCheckBoxClass = (year, index) => {
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
                        <span className="VS-Plus-Minus" onClick={() => this.toggleYearChild(year, false)}><span className="VS-ExpandCollapseSign">-</span></span> :
                        <span className="VS-Plus-Minus" onClick={() => this.toggleYearChild(year, true)}><span className="VS-ExpandCollapse">+</span></span>
                }
                <label className="VS-Checkbox-Container" key={'year' + index}>{year.year}
                    {
                        (year.state) ?
                            <input className="VS-Checkbox" type="checkbox" checked={year.state} onChange={() => this.toggleYearCheck(year, false)}></input> :
                            <input className="VS-Checkbox" type="checkbox" checked={year.state} onChange={() => this.toggleYearCheck(year, true)}></input>
                    }
                    <span className={this.getYearCheckBoxClass(year, index)} ></span>

                </label>
                {
                    (year.showChild && year.quarters) ?
                        <QuarterView options={options} years={_years} year={year} onChangeQuarter={this.onChangeQuarterHandler} onChangeMonth={this.onChangeMonthHandler} onChangeDay={this.onChangeDayHandler} onChangeWeek={this.onChangeWeek} onChangeWeekDay={this.onChangeWeekDay}></QuarterView> : (year.showChild && year.months) ?
                        <MonthView options={options} years={this.state.years} year={year} onChange={this.onChangeHandler} onChangeMonth={this.onChangeMonthHandler} onChangeDay={this.onChangeDayHandler} onChangeWeek={this.onChangeWeek} onChangeWeekDay={this.onChangeWeekDay}></MonthView> : ''
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

    subFilterQuaters = (val, yr, quaters, filteredData, callback) => {
        let { showWeeks, showQuarters } = this.props.options;
        let yearState = 0;
        let _quaters = [];
        quaters.forEach((quarter) => {
            var quarterName = quarter['quarter'].toString();
            var _camel = toCamelCase(val.toString());
            var isFound = quarterName.includes(_camel.toString());
            if (isFound === true) {
                yearState++;
                let _months = [];
                var months = [...quarter['months']];
                filteredData.push(quarter.quarter + yr.year);
                months.forEach((mn) => {
                    if (showWeeks === true) {
                        let _weeks = [];
                        var weeks = [...mn['weeks']];
                        weeks.forEach((wk) => {
                            let _days = [];
                            var days = [...wk['days']];
                            days.forEach((dy) => {
                                _days.push(this.getDayObject(dy.date, dy.day, 1));
                            });

                            _weeks.push(this.getWeekObject(wk.week, false, 1, [..._days]));
                        });

                        _months.push(this.getMonthObject(mn.month, false, 1, [..._weeks], true));
                    } else {
                        let _days = [];
                        var days = [...mn['days']];
                        days.forEach((dy) => {
                            _days.push(this.getDayObject(dy.date, dy.day, 1));
                        });
                        
                        _months.push(this.getMonthObject(mn.month, false, 1, [..._days], false));
                    }
                });

                _quaters.push(this.getQuaterObject(quarterName, true, 1, [..._months]));
            }
        });
        callback(yearState, _quaters, filteredData);
    }

    subFilterMonths = (months, callback) => {
        let _months = [];
        let { showWeeks, showQuarters } = this.props.options;
        months.forEach((mn) => {
            if (showWeeks === true) {
                let _weeks = [];
                let weeks = [...mn['weeks']];
                weeks.forEach((wk) => {
                    let _days = [];
                    let days = [...wk['days']];
                    days.forEach((dy) => {
                        _days.push(this.getDayObject(dy.date, dy.day, 1));
                    });

                    _weeks.push(this.getWeekObject(wk.week, false, 1, [..._days]));
                });
                _months.push(this.getMonthObject(mn.month, false, 1, [..._weeks], true));
            } else {
                let _days = [];
                var days = [...mn['days']];
                days.forEach((dy) => {
                    _days.push(this.getDayObject(dy.date, dy.day, 1));
                });
                
                _months.push(this.getMonthObject(mn.month, false, 1, [..._days], false));
            }
        });
        callback(_months);
    }

    filterYears = (val, searchedYears, years) => {
        let _years = [];
        let _filteredData = [];
        let { showQuarters } = this.props.options;
        years.forEach((yr) => {
            var year = yr['searchString'];
            var isFound = year.includes(val.toString());
            if (isFound === false) {
                if (showQuarters === true) {
                    let quaters = [...yr['quarters']];

                    this.subFilterQuaters(val, yr, quaters, _filteredData, (_yearState, _quaters, filteredData) => {
                        if (_yearState === 4) {
                            filteredData.push(yr.year);
                        }
                        _years.push(this.getYearObject(yr.year, true, (_yearState === 4) ? 1 : -1, [..._quaters], showQuarters));
        
                        this.setState({
                            filteredYears: _years,
                            filteredData: filteredData
                        });
                        
                        this.setState({
                            filteredYears: _years
                        });
                    });
                } else {
                    let months = [...yr['months']];
                    this.subFilterMonths(months, (_months) => {
                        _years.push(this.getYearObject(yr.year, true, 1, [..._months], showQuarters));
                    });
                }
            } else {
                if (showQuarters === true) {
                    let _quaters = [];
                    let quaters = [...yr['quarters']];
                    quaters.forEach((quarter) => {
                        let months = [...quarter['months']];
                        this.subFilterMonths(months, (_months) => {
                            _quaters.push(this.getQuaterObject(quarter.quarter, true, 1, [..._months]));
                        });
                    });
                    _years.push(this.getYearObject(yr.year, true, 1, [..._quaters], showQuarters));
                } else {
                    let months = [...yr['months']];
                    this.subFilterMonths(months, (_months) => {
                        _years.push(this.getYearObject(yr.year, true, 1, [..._months], showQuarters));
                    });
                }
                this.setState({
                    filteredYears: _years
                });
            }
        });


        // this.setState({
        //     filteredYears: _years
        // });
    }

    filterQuaters = (val) => {
        let _filteredData = [];
        let _years = [];
        let { years } = this.state;
        let { showWeeks, showQuarters } = this.props.options;
        years.forEach((yr) => {

            let quaters = [...yr['quarters']];
            // let yearState = 0;
            // let _quaters = [];
            // quaters.forEach((quarter) => {
            //     var quarterName = quarter['quarter'].toString();
            //     var _camel = toCamelCase(val.toString());
            //     var isFound = quarterName.includes(_camel.toString());
            //     if (isFound === true) {
            //         yearState++;
            //         let _months = [];
            //         var months = [...quarter['months']];
            //         _filteredData.push(quarter.quarter + yr.year);
            //         months.forEach((mn) => {
            //             if (showWeeks === true) {
            //                 let _weeks = [];
            //                 var weeks = [...mn['weeks']];
            //                 weeks.forEach((wk) => {
            //                     let _days = [];
            //                     var days = [...wk['days']];
            //                     days.forEach((dy) => {
            //                         _days.push(this.getDayObject(dy.date, dy.day, 1));
            //                     });

            //                     _weeks.push(this.getWeekObject(wk.week, false, 1, [..._days]));
            //                 });

            //                 _months.push(this.getMonthObject(mn.month, false, 1, [..._weeks], true));
            //             } else {
            //                 let _days = [];
            //                 var days = [...mn['days']];
            //                 days.forEach((dy) => {
            //                     _days.push(this.getDayObject(dy.date, dy.day, 1));
            //                 });
                            
            //                 _months.push(this.getMonthObject(mn.month, false, 1, [..._days], false));
            //             }
            //         });

            //         _quaters.push(this.getQuaterObject(quarterName, true, 1, [..._months]));
            //     }
            // });

            this.subFilterQuaters(val, yr, quaters, _filteredData, (_yearState, _quaters, filteredData) => {
                if (_yearState === 4) {
                    filteredData.push(yr.year);
                }
                _years.push(this.getYearObject(yr.year, true, (_yearState === 4) ? 1 : -1, [..._quaters], showQuarters));

                this.setState({
                    filteredYears: _years,
                    filteredData: filteredData
                });
            });
        });

    }

    filterMonths = (val) => {
        let _filteredData = [];
        let _years = [];
        let { years } = this.state;
        let { showWeeks, showQuarters } = this.props.options;
        let existsInMonth = false;
        years.forEach((yr) => {
            let yearState = 0;
            let _quaters = [];
            let quaters = [...yr['quarters']];
            quaters.forEach((quarter) => {
                let quaterState = 0;
                let _months = [];
                var months = [...quarter['months']];
                existsInMonth = false;
                months.forEach((mn) => {
                    var month = mn['month'].toString();
                    var _camel = toCamelCase(val.toString());
                    var isFound = month.includes(_camel);
                    if (isFound === true) {
                        quaterState++;
                        existsInMonth = true;
                        _filteredData.push(month + yr.year);
                        if (showWeeks === true) {
                            let _weeks = [];
                            var weeks = [...mn['weeks']];
                            weeks.forEach((wk) => {
                                let _days = [];
                                var days = [...wk['days']];
                                days.forEach((dy) => {
                                    _days.push(this.getDayObject(dy.date, dy.day, 1));
                                });

                                _weeks.push(this.getWeekObject(wk.week, false, 1, [..._days]));
                            });

                            _months.push(this.getMonthObject(mn.month, false, 1, [..._weeks], true));
                        } else {
                            let _days = [];
                            var days = [...mn['days']];
                            days.forEach((dy) => {
                                _days.push(this.getDayObject(dy.date, dy.day, 1));
                            });

                            _months.push(this.getMonthObject(mn.month, false, 1, [..._days], false));
                        }
                    }
                });
                if (existsInMonth === true) {
                    if (quaterState === 3) {
                        _filteredData.push(quarter.quarter + yr.year);
                    }
                    _quaters.push(this.getQuaterObject(quarter.quarter, true, (quaterState === 3) ? 1 : -1, [..._months]));
                    yearState = (quaterState === 3) ? yearState + 1 : yearState;
                }
            });
            _years.push(this.getYearObject(yr.year, true, (yearState === 4) ? 1 : -1, [..._quaters], showQuarters));
        });
        this.setState({
            filteredYears: _years,
            filteredData: _filteredData
        });
    }

    filterWeeks = (val) => {
        let _years = [];
        let { years } = this.state;
        let { showQuarters } = this.props.options;
        let existsInWeek = false;
        years.forEach((yr) => {
            let yearState = 0;
            let _quaters = [];
            let quaters = [...yr['quarters']];
            quaters.forEach((quarter) => {
                let quaterState = 0;
                let _months = [];
                var months = [...quarter['months']];
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
                        var isFound = week.includes(_camel.toString());
                        if (isFound === true) {
                            monthState++;
                            existsInWeek = true;

                            let _days = [];
                            var days = [...wk['days']];
                            days.forEach((dy) => {
                                _days.push(this.getDayObject(dy.date, dy.day, 1));
                            });

                            _weeks.push(this.getWeekObject(wk.week, false, 1, [..._days]));
                        }
                    });
                    if (existsInWeek === true) {
                        _months.push(this.getMonthObject(mn.month, true, (monthState === weeks.length) ? 1 : -1, [..._weeks], true));
                        quaterState = (monthState === weeks.length) ? quaterState + 1 : quaterState;
                    }
                });
                _quaters.push(this.getQuaterObject(quarter.quarter, true, (quaterState === 3) ? 1 : -1, [..._months]));
                yearState = (quaterState === 3) ? yearState + 1 : yearState;
            });
            _years.push(this.getYearObject(yr.year, true, (yearState === 4) ? 1 : -1, [..._quaters], showQuarters));
        });
        this.setState({
            filteredYears: _years
        });
    }

    filterDays = (val) => {
        let _years = [];
        let { years } = this.state;
        let { showWeeks, showQuarters } = this.props.options;
        let existsInDay = false;
        years.forEach((yr) => {
            let _quaters = [];
            let quaters = [...yr['quarters']];
            quaters.forEach((quarter) => {
                let _months = [];
                var months = [...quarter['months']];
                months.forEach((mn) => {

                    if (showWeeks === true) {
                        let _weeks = [];
                        var weeks = [...mn['weeks']];
                        weeks.forEach((wk) => {
                            let _days = [];
                            var days = [...wk['days']];
                            existsInDay = false;
                            days.forEach((dy) => {
                                var date = dy['date'].toString();
                                var isFound = date.includes(val.toString());
                                if (isFound === true) {
                                    existsInDay = true;
                                    _days.push(this.getDayObject(dy.date, dy.day, 1));
                                }
                            });

                            if (existsInDay === true) {
                                _weeks.push(this.getWeekObject(wk.week, true, 1, [..._days]));
                            }
                        });

                        _months.push(this.getMonthObject(mn.month, true, 1, [..._weeks], true));
                    } else {
                        let _days = [];
                        var days = [...mn['days']];
                        existsInDay = false;
                        days.forEach((dy) => {
                            var day = dy['day'].toString();
                            var isFound = day.includes(val.toString());
                            if (isFound === true) {
                                existsInDay = true;
                                _days.push(this.getDayObject(dy.date, dy.day, 1));
                            }
                        });
                        if (existsInDay === true) {
                            _months.push(this.getMonthObject(mn.month, true, 1, [..._days], false));
                        }
                    }
                });
                _quaters.push(this.getQuaterObject(quarter.quarter, true, 1, [..._months]));
            });
            _years.push(this.getYearObject(yr.year, true, 1, [..._quaters], showQuarters));
        });
        this.setState({
            filteredYears: _years
        });
    }

    getYearObject = (year, showChild, state, children, showQuarters) => {
        if (showQuarters === true) {
            return {
                "year": year,
                "showChild": showChild,
                "state": state,
                "quarters": [...children]
            };
        } else {
            return {
                "year": year,
                "showChild": showChild,
                "state": state,
                "months": [...children]
            };
        }
    }

    getQuaterObject = (quarter, showChild, state, months) => {
        return {
            "quarter": quarter,
            "showChild": showChild,
            "state": state,
            "months": [...months]
        };
    }

    getMonthObject = (month, showChild, state, daysWeeks, showWeeks) => {
        return (showWeeks === true) ? {
            "month": month,
            "showChild": showChild,
            "state": state,
            "weeks": [...daysWeeks]
        } : {
                "month": month,
                "showChild": showChild,
                "state": state,
                "days": [...daysWeeks]
            };
    }

    getWeekObject = (week, showChild, state, days) => {
        return {
            "week": week,
            "showChild": showChild,
            "state": state,
            "days": [...days]
        };
    }

    getDayObject = (date, day, state) => {
        return {
            "date": date,
            "day": day,
            "state": state
        };
    }

    onChangeHandler = (name, e) => {
        this.setState({
            isSearching: !isUndefinedOrNull(e.target.value),
            searchValue: e.target.value
        });

        let val = e.target.value;
        val = (val)? val.toLowerCase() : '';
        let { years } = this.state;
        let { showWeeks, showQuarters } = this.props.options;

        if (!isUndefinedOrNull(val)) {
            if (!isNaN(val)) {
                let existsInYear = false;
                let _years = [];
                years.forEach((ele) => {
                    var year = ele['searchString'];
                    var isFound = year.includes(val.toString());
                    if (isFound === true) {
                        existsInYear = true;
                        _years.push(ele);
                    }
                });

                if (existsInYear) {
                    this.filterYears(val, _years, years);
                } else if (isQuaterVal(val) && showQuarters === true) {
                    this.filterQuaters(val);
                } else if (isWeekVal(val) && showWeeks === true) {
                    this.filterWeeks(val);
                } else if (isDayVal(val)) {
                    this.filterDays(val);
                }
            } else {
                if (isQuaterVal(val)  && showQuarters === true) {
                    this.filterQuaters(val);
                } else if (isMonthVal(val)) {
                    this.filterMonths(val);
                } else if (isWeekVal(val) && showWeeks === true) {
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

    updateSelectAllCheckbox = () => {
        let _isSelectAll = true;
        let { years } = this.state;
        years.forEach((yr) => {
            if (yr.state === 0) {
                _isSelectAll = false;
            }
        });

        this.setState({
            isSelectAll: _isSelectAll
        });
    }

    onSelectSearchResultChange = ({ target }) => {
        this.setState({
            isSelectAllSearchResult: target.checked
        });
    }

    onAddCurrentSelectionChange = ({ target }) => {
        this.setState({
            isAddCurrentSelection: target.checked
        });
    }

    onSelectAllChange = ({ target }) => {
        let { years } = this.state;
        years.forEach((yr, index) => {
            this.toggleYearCheck(yr, target.checked);
        });
        this.setState({
            isSelectAll: target.checked
        });
    }

    mergeFilterData = (filteredData, callback) => {
        let { years } = this.state;
        setTimeout(() => {
            years.forEach((yr, yindex) => {
                let _val = '' + yr.year;
                if (filteredData.indexOf(_val) !== -1) {
                    this.toggleYearCheck(yr, true);
                } else {
                    yr.quarters.forEach((quarter, qindex) => {
                        let _val = '' + quarter.quarter + yr.year;
                        if (filteredData.indexOf(_val) !== -1) {
                            this.onChangeQuarterHandler({
                                quarter: quarter,
                                year: yr,
                                isCheck: true
                            });
                        } else {
                            quarter.months.forEach((mn, mindex) => {
                                let _val = '' + mn.month + yr.year;
                                if (filteredData.indexOf(_val) !== -1) {
                                    this.onChangeMonthHandler({
                                        month: mn,
                                        quarter: quarter,
                                        year: yr,
                                        isCheck: true
                                    });
                                }
                            });
                        }
                    });
                }
            });
            callback(years);
        }, 100);
    }

    clearFilter = () => {
        let { searchValue, filteredYears } = this.state;

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
        let { searchValue, filteredYears, filteredData } = this.state;

        let _lastFilterData = {
            'value': searchValue,
            'list': filteredYears
        };
        this.setState({
            isSearching: false,
            searchValue: "",
            lastFilterData: _lastFilterData
        });

        this.mergeFilterData(filteredData, (years) => { });
    }

    getCheckBoxClass = () => {
        return 'VS-Check-Checkmark';
    }

    getSelectAllCheckBoxClass = () => {
        let flag = false;
        const { years } = this.state;
        let state = 0;
        years.forEach((yr, index) => {
            if (yr.state === 1) {
                state++;
            }
        });
        flag = (state !== 0 && state < years.length) ? true : false;
        return (flag === true) ? 'VS-Check-Checkmark VS-Check-Partial' : 'VS-Check-Checkmark';
    }

    render() {
        const { options } = this.props;
        const { isSearching, searchValue, years, filteredYears, isSelectAllSearchResult, isSelectAll, lastFilterData, isAddCurrentSelection } = this.state;
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
                    {
                        (isSearching === true && (!lastFilterData || !lastFilterData.value)) ?
                            <label className="VS-Checkbox-Container">Select All Search Results
                            <input className="VS-Checkbox" type="checkbox" checked={isSelectAllSearchResult} onChange={(e) => this.onSelectSearchResultChange(e)}></input>
                                <span className={this.getCheckBoxClass()}></span>
                            </label> : ''
                    }
                    {
                        (isSearching === false && (!lastFilterData || !lastFilterData.value)) ?
                            <label className="VS-Checkbox-Container">Select All
                            <input className="VS-Checkbox" type="checkbox" checked={isSelectAll} onChange={(e) => this.onSelectAllChange(e)}></input>
                                <span className={this.getSelectAllCheckBoxClass()}></span>
                            </label> : ''
                    }
                    {
                        (isSearching === true && lastFilterData && lastFilterData.value && lastFilterData.list) ?
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