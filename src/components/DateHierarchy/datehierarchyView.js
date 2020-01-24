import React from "react";

import { getListOfYears, getSearchObj } from "../../utils/datehierarchyutils";
import { isUndefinedOrNull } from "../../utils/utils";
import FilterView from "./filterView";
import YearDisplay from "./yearDisplay";
import QuarterView from "./quarterView";
import MonthView from "./monthView";
import { FaSearch, FaClose, FaFilter } from 'react-icons/lib/fa';
import * as CONSTANTS from '../../utils/constants'

class DatehierarchyView extends React.PureComponent {
    constructor(props) {
        super(props);
        let { options } = this.props;

        let yearList = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.showQuarters, options.disabledList);
        let searchObj = getSearchObj(options);
        const result = searchObj.filter(searchElement => (searchElement.searchKey.includes("q")));
        // console.log(' result ', result);
        this.state = { listOfYears: yearList, years: yearList, isSearching: false, searchValue: '', filteredYears: [], filteredData: [], isSelectAllSearchResult: true, isAddCurrentSelection: false, isSelectAll: false, selectAllState: 0, lastFilterData: { 'value': '', 'list': [] } };
    }

    getYears() {
        const { isSearching, years, filteredYears } = this.state;
        return (isSearching === true) ? [...filteredYears] : [...years];
    }

    componentDidMount() {
        let years = [...this.getYears()];
        // console.log('years', years);
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

        this.updateSelectAllCheckboxHandler();
    }

    onChangeQuarterHandler = (quarterObj) => {
        let years = [...this.getYears()];
        let { showWeeks } = this.props.options;
        let { quarter, year } = quarterObj;
        let stateSum = 0;

        quarter.state = (quarterObj.isCheck === true) ? 1 : 0;

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

        this.updateSelectAllCheckboxHandler();
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
            this.updateSelectAllCheckboxHandler();
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
            this.updateSelectAllCheckboxHandler();
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

    onChangeWeekHandler = (weekObj) => {
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
            this.updateSelectAllCheckboxHandler();
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
            this.updateSelectAllCheckboxHandler();
        }
    }

    onChangeWeekDayHandler = (weekDaysObj) => {
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
            this.updateSelectAllCheckboxHandler();
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
            this.updateSelectAllCheckboxHandler();
        }
    }

    onFilteredDataChangeHandler = (data) => {
        this.setState({
            filteredData: data,
            isSelectAll: true
        });
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
                        <QuarterView options={options} isFilterView={false} years={_years} year={year} onChangeQuarter={this.onChangeQuarterHandler} onChangeMonth={this.onChangeMonthHandler} onChangeDay={this.onChangeDayHandler} onChangeWeek={this.onChangeWeekHandler} onChangeWeekDay={this.onChangeWeekDayHandler}></QuarterView> : (year.showChild && year.months) ?
                            <MonthView options={options} isFilterView={false} years={_years} year={year} onChange={this.onChangeHandler} onChangeMonth={this.onChangeMonthHandler} onChangeDay={this.onChangeDayHandler} onChangeWeek={this.onChangeWeekHandler} onChangeWeekDay={this.onChangeWeekDayHandler}></MonthView> : ''
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

    onChangeHandler = (name, e) => {
        this.setState({
            isSearching: !isUndefinedOrNull(e.target.value),
            searchValue: e.target.value
        });
    }

    updateSelectAllCheckboxHandler = () => {
        let _isSelectAll = true;
        let { years } = this.state;
        let selectAllState = 0;
        years.forEach((yr) => {
            if (yr.state === 0) {
                _isSelectAll = false;
            } else {
                selectAllState = selectAllState + yr.state;
            }
        });
        // console.log(selectAllState, ' _isSelectAll ', _isSelectAll);

        this.setState({
            isSelectAll: _isSelectAll,
            selectAllState: selectAllState
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
        this.setState({
            years: filteredData
        })
    }

    mergeFilterData1 = (filteredData, callback) => {
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

    checkSelectAllValues = () => {
        const { years, selectAllState, isSelectAll } = this.state;
        return (selectAllState === years.length);
    }

    render() {
        const { options } = this.props;
        const { isSearching, searchValue, years, listOfYears, isSelectAllSearchResult, isSelectAll, lastFilterData, isAddCurrentSelection } = this.state;
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
                        (isSearching === false) ?
                            (this.checkSelectAllValues()) ?
                                <label className="VS-Checkbox-Container">Select All
                                        <input className="VS-Checkbox" type="checkbox" checked={isSelectAll} onChange={(e) => this.onSelectAllChange(e)}></input>
                                    <span className="VS-Check-Checkmark"></span>
                                </label> :
                                <label className="VS-Checkbox-Container">Select All
                                        <input className="VS-Checkbox" type="checkbox" checked={isSelectAll} onChange={(e) => this.onSelectAllChange(e)}></input>
                                    <span className="VS-Check-Checkmark VS-Check-Partial"></span>
                                </label> :
                            ''
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
                            <FilterView options={options} isFilterView={true} searchValue={searchValue} listOfYears={listOfYears} years={years} onChangeQuarter={this.onChangeQuarterHandler} onChangeMonth={this.onChangeMonthHandler} onChangeDay={this.onChangeDayHandler} onChangeWeek={this.onChangeWeekHandler} onChangeWeekDay={this.onChangeWeekDayHandler} onFilteredDataChange={this.onFilteredDataChangeHandler} onUpdateSelectAllCheckbox={this.updateSelectAllCheckboxHandler}></FilterView> :

                            <YearDisplay options={options} isFilterView={false} years={years} onChangeQuarter={this.onChangeQuarterHandler} onChangeMonth={this.onChangeMonthHandler} onChangeDay={this.onChangeDayHandler} onChangeWeek={this.onChangeWeekHandler} onChangeWeekDay={this.onChangeWeekDayHandler} onUpdateSelectAllCheckbox={this.updateSelectAllCheckboxHandler}></YearDisplay>
                    }
                </div>
            </div>
        )
    }
}
export default DatehierarchyView;