import React from "react";
import { Input } from "reactstrap";
import { getListOfYears, getSearchObj, opposite } from "../../utils/datehierarchyutils";
import { isUndefinedOrNull, isBlank } from "../../utils/utils";
import FilterView from "./filterView";
import YearDisplay from "./yearDisplay";
import QuarterView from "./quarterView";
import MonthView from "./monthView";
import { FaSearch, FaClose, FaFilter } from 'react-icons/lib/fa';
import * as CONSTANTS from '../../utils/constants'
const stateRegExOne = /\"state\":1/gi
const checkPartialState = obj => obj.state === -1;
class DatehierarchyView extends React.PureComponent {
    constructor(props) {
        super(props);
        let { options } = this.props;

        let yearList = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.showQuarters, options.disabledList);
        let searchObj = getSearchObj(options);
        const result = searchObj.filter(searchElement => (searchElement.searchKey.includes("q")));
        this.state = { listOfYears: [...yearList], years: [...yearList], isSearching: false, searchValue: '', filteredYears: [], filteredData: [], isSelectAllSearchResult: true, isAddCurrentSelection: false, isExcludeFromSelection: false, isSelectAll: false, selectAllState: 0, lastFilterData: [], selections: [], initialSelections: [], exclusions: [], isNoDataFound: false, filterSum: 0 };
    }

    getYears() {
        const { isSearching, years, filteredYears } = this.state;
        return (isSearching === true) ? [...filteredYears] : [...years];
    }

    componentDidMount() {
        let years = [...this.getYears()];
        this.setState({ years: [...years] });
    }

    onFocus = () => {
        this.props.onFocus();
    };

    onBlur = () => {
        this.props.onBlur();
    };

    onInput = () => {
        this.props.onInput();
    };

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

        this.updateSelectAllCheckboxHandler([...years]);
        this.updateCurrentSelection([...years]);
    }

    onChangeQuarterHandler = (quarterObj) => {
        let years = [...this.getYears()];
        let { showWeeks } = this.props.options;
        let { quarter, year } = quarterObj;
        let stateSum = 0;

        quarter.state = (quarterObj.isCheck === true) ? 1 : 0;

        for (var i = 0; i < year.quarters.length; i++) {
            if (year.quarters[i]['state'] === -1) {
                stateSum = -1;
                break;
            }
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

        this.updateSelectAllCheckboxHandler([...years]);
        this.updateCurrentSelection([...years]);
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
                    if (quarter.months[i]['state'] === -1) {
                        mstateSum = -1;
                        break;
                    }
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
            this.updateSelectAllCheckboxHandler([...years]);
            this.updateCurrentSelection([...years]);
        } else {
            let stateSum = 0;
            let qstateSum = 0;
            month.state = 0;
            if (showQuarters === true) {
                for (i = 0; i < quarter.months.length; i++) {
                    if (quarter.months[i]['state'] === -1) {
                        stateSum = -1;
                        break;
                    }
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
            this.updateSelectAllCheckboxHandler([...years]);
            this.updateCurrentSelection([...years]);
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
                    if (quarter.months[k]['state'] === -1) {
                        mstateSum = -1;
                        break;
                    }
                    mstateSum += quarter.months[k]["state"];
                }
                quarter.state = (mstateSum < quarter.months.length) ? -1 : 1;

                for (var i = 0; i < year.quarters.length; i++) {
                    if (year.quarters[i]['state'] === -1) {
                        qstateSum = -1;
                        break;
                    }
                    qstateSum += year.quarters[i]["state"];
                }
                year.state = (qstateSum < year.quarters.length) ? -1 : 1;
            }
            if (showQuarters === false) {
                for (k = 0; k < year.months.length; k++) {
                    if (year.months[k]['state'] === -1) {
                        mstateSum = -1;
                        break;
                    }
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
                    if (quarter.months[k]['state'] === -1) {
                        mstateSum = -1;
                        break;
                    }
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
                if (month.weeks[j]['state'] === -1) {
                    wstateSum = -1;
                    break;
                }
                wstateSum += month.weeks[j]["state"];
            }
            month.state = (wstateSum < month.weeks.length) ? -1 : 1;
            if (showQuarters === true) {
                for (var k = 0; k < quarter.months.length; k++) {
                    if (quarter.months[k]['state'] === -1) {
                        mstateSum = -1;
                        break;
                    }
                    mstateSum += quarter.months[k]["state"];
                }
                quarter.state = (mstateSum < quarter.months.length) ? -1 : 1;

                for (var i = 0; i < year.quarters.length; i++) {
                    if (year.quarters[i]['state'] === -1) {
                        qstateSum = -1;
                        break;
                    }
                    qstateSum += year.quarters[i]["state"];
                }
                year.state = (qstateSum < year.quarters.length) ? -1 : 1;
            }
            if (showQuarters === false) {
                for (k = 0; k < year.months.length; k++) {
                    if (year.months[k]['state'] === -1) {
                        mstateSum = -1;
                        break;
                    }
                    mstateSum += year.months[k]["state"];
                }
                year.state = (mstateSum < year.months.length) ? -1 : 1;
            }
            this.setState({
                years: [...years]
            });
            this.updateSelectAllCheckboxHandler([...years]);
            this.updateCurrentSelection([...years]);
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
                if (month.weeks[j]['state'] === -1) {
                    wstateSum = -1;
                    break;
                }
                wstateSum += month.weeks[j]["state"];
            }
            month.state = (wstateSum < month.weeks.length) ? (wstateSum === 0) ? 0 : -1 : 1;

            if (showQuarters === true) {
                for (k = 0; k < quarter.months.length; k++) {
                    if (quarter.months[k]['state'] === -1) {
                        mstateSum = -1;
                        break;
                    }
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
                    if (year.months[k]['state'] === -1) {
                        mstateSum = -1;
                        break;
                    }
                    mstateSum += year.months[k]["state"];
                }
                year.state = (mstateSum < year.months.length) ? (mstateSum === 0) ? 0 : -1 : 1;
            }
            this.setState({
                years: [...years]
            });
            this.updateSelectAllCheckboxHandler([...years]);
            this.updateCurrentSelection([...years]);
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
                if (month.weeks[j]['state'] === -1) {
                    wstateSum = -1;
                    break;
                }
                wstateSum += month.weeks[j]["state"];
            }
            month.state = (wstateSum < month.weeks.length) ? -1 : 1;
            if (showQuarters === true) {
                for (var k = 0; k < quarter.months.length; k++) {
                    if (quarter.months[k]['state'] === -1) {
                        mstateSum = -1;
                        break;
                    }
                    mstateSum += quarter.months[k]["state"];
                }
                quarter.state = (mstateSum < quarter.months.length) ? -1 : 1;
                for (var i = 0; i < year.quarters.length; i++) {
                    if (year.quarters[i]['state'] === -1) {
                        qstateSum = -1;
                        break;
                    }
                    qstateSum += year.quarters[i]["state"];
                }
                year.state = (qstateSum < year.quarters.length) ? -1 : 1;
            }
            if (showQuarters === false) {
                for (k = 0; k < year.months.length; k++) {
                    if (year.months[k]['state'] === -1) {
                        mstateSum = -1;
                        break;
                    }
                    mstateSum += year.months[k]["state"];
                }
                year.state = (mstateSum < year.months.length) ? -1 : 1;
            }
            this.setState({
                years: [...years]
            });
            this.updateSelectAllCheckboxHandler([...years]);
            this.updateCurrentSelection([...years]);
        }
        else {
            day.state = 0;

            for (n = 0; n < week.days.length; n++) {
                wdstateSum += week.days[n]["state"];
            }
            week.state = (wdstateSum < week.days.length) ? (wdstateSum === 0) ? 0 : -1 : 1;
            for (j = 0; j < month.weeks.length; j++) {
                if (month.weeks[j]['state'] === -1) {
                    wstateSum = -1;
                    break;
                }
                wstateSum += month.weeks[j]["state"];
            }
            month.state = (wstateSum < month.weeks.length) ? (wstateSum === 0) ? 0 : -1 : 1;
            if (showQuarters === true) {
                for (k = 0; k < quarter.months.length; k++) {
                    if (quarter.months[k]['state'] === -1) {
                        mstateSum = -1;
                        break;
                    }
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
            this.updateSelectAllCheckboxHandler([...years]);
            this.updateCurrentSelection([...years]);
        }
    }

    onFilteredDataChangeHandler = (data) => {
        let sum = data.reduce((a, b) => +a + +b.state, 0);
        this.setState({
            filteredData: [...data],
            isSelectAll: true,
            filterSum: sum,
            isNoDataFound: (sum === 0)
        });
    }

    getYearCheckBoxClass = (year, index) => {
        let flag = false;
        const _years = [...this.getYears()];
        flag = (_years[index]["state"] === -1) ? true : false;
        return (flag) ? 'VS-Check-Checkmark VS-Check-Partial' : 'VS-Check-Checkmark';
    }

    getSeachIconAlignClass() {
        return 'VS-PullLeft VS-SeachIcon';
    }

    getInputClass() {
        const { isSearching } = this.state;
        return (isSearching === true) ? 'VS-SearchBox VS-IsSearching' : 'VS-SearchBox';
    }


    setValues(values) {
        let years = [...this.state.years];
        let { showQuarters, showWeeks } = this.props.options;
        let resultYears = [];
        years.forEach((year, yearIndex) => {
            resultYears.push(year);
            if (showQuarters === true) {
                year.quarters.forEach((quarter, quarterIndex) => {
                    quarter.months.forEach((month, monthIndex) => {
                        if (showWeeks === true) {
                            month.weeks.forEach((week, weekIndex) => {
                                week.days.forEach((day, dayIndex) => {
                                    if (values.indexOf(day.fullDate) !== -1) {
                                        resultYears[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['days'][dayIndex]['state'] = 1;
                                    }
                                });
                                let days = resultYears[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['days'];
                                if (days.length > 0) {
                                    let daysum = days.reduce((a, b) => +a + +b.state, 0);
                                    let isPartial = days.some(checkPartialState);

                                    resultYears[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] = (isPartial || (daysum < week.days.length && daysum !== 0)) ? -1 : (daysum === week.days.length) ? 1 : week.state;
                                }
                            });
                            let weeks = resultYears[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'];
                            if (weeks.length > 0) {
                                let weeksum = weeks.reduce((a, b) => +a + +b.state, 0);
                                let isPartial = weeks.some(checkPartialState);

                                resultYears[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state'] = (isPartial || (weeksum < month.weeks.length && weeksum !== 0)) ? -1 : (weeksum === month.weeks.length) ? 1 : month.state;
                            }
                        }
                        if (showWeeks === false) {
                            month.days.forEach((day, dayIndex) => {
                                if (values.indexOf(day.fullDate) !== -1) {
                                    resultYears[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['days'][dayIndex]['state'] = 1;
                                }
                                let days = resultYears[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['days'];
                                if (days.length > 0) {
                                    let daysum = days.reduce((a, b) => +a + +b.state, 0);
                                    let isPartial = days.some(checkPartialState);

                                    resultYears[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state'] = (isPartial || (daysum < month.days.length && daysum !== 0)) ? -1 : (daysum === month.days.length) ? 1 : month.state;
                                }

                            })
                        }
                    })

                    let months = resultYears[yearIndex]['quarters'][quarterIndex]['months'];
                    let monthsum = months.reduce((a, b) => +a + +b.state, 0);
                    let isPartial = months.some(checkPartialState);
                    resultYears[yearIndex]['quarters'][quarterIndex]['state'] = (isPartial || (monthsum < quarter.months.length && monthsum !== 0)) ? -1 : (monthsum === quarter.months.length) ? 1 : quarter.state;
                })

                let quarters = resultYears[yearIndex]['quarters'];
                let quartersum = quarters.reduce((a, b) => +a + +b.state, 0);
                let isPartial = quarters.some(checkPartialState);
                resultYears[yearIndex]['state'] = (isPartial || (quartersum < year.quarters.length && quartersum !== 0)) ? -1 : (quartersum === year.quarters.length) ? 1 : year.state;
            }
            if (showQuarters === false) {
                year.months.forEach((month, monthIndex) => {
                    if (showWeeks === false) {
                        month.days.forEach((day, dayIndex) => {
                            if (values.indexOf(day.fullDate) !== -1) {
                                resultYears[yearIndex]['months'][monthIndex]['days'][dayIndex]['state'] = 1;
                            }
                            let days = resultYears[yearIndex]['months'][monthIndex]['days'];
                            if (days.length > 0) {
                                let daysum = days.reduce((a, b) => +a + +b.state, 0);
                                let isPartial = days.some(checkPartialState);

                                resultYears[yearIndex]['months'][monthIndex]['state'] = (isPartial || (daysum < month.days.length && daysum !== 0)) ? -1 : (daysum === month.days.length) ? 1 : month.state;
                            }
                        })
                    }
                    if (showWeeks === true) {
                        month.weeks.forEach((week, weekIndex) => {
                            week.days.forEach((day, dayIndex) => {
                                if (values.indexOf(day.fullDate) !== -1) {
                                    resultYears[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['days'][dayIndex]['state'] = 1;
                                }

                                let days = resultYears[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['days'];
                                if (days.length > 0) {
                                    let daysum = days.reduce((a, b) => +a + +b.state, 0);
                                    let isPartial = days.some(checkPartialState);

                                    resultYears[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] = (isPartial || (daysum < week.days.length && daysum !== 0)) ? -1 : (daysum === week.days.length) ? 1 : week.state;
                                }
                            })
                            let weeks = resultYears[yearIndex]['months'][monthIndex]['weeks'];
                            if (weeks.length > 0) {
                                let weeksum = weeks.reduce((a, b) => +a + +b.state, 0);
                                let isPartial = weeks.some(checkPartialState);

                                resultYears[yearIndex]['months'][monthIndex]['state'] = (isPartial || (weeksum < month.weeks.length && weeksum !== 0)) ? -1 : (weeksum === month.weeks.length) ? 1 : month.state;
                            }
                        })
                    }
                })
                let months = resultYears[yearIndex]['months'];
                let monthsum = months.reduce((a, b) => +a + +b.state, 0);
                let isPartial = months.some(checkPartialState);
                resultYears[yearIndex]['state'] = (isPartial || (monthsum < year.months.length && monthsum !== 0)) ? -1 : (monthsum === year.months.length) ? 1 : year.state;


            }
        });

        this.setState({
            years: [...resultYears]
        });
    }

    getValues() {
        var t1 = performance.now();
        let getValues = [];
        let years = [...this.state.years];
        let { showQuarters, showWeeks } = this.props.options;
        years.forEach((year) => {
            {
                if (year.state === 1 || year.state === -1) {
                    if (showQuarters === true) {
                        year.quarters.forEach((quarter) => {
                            if (quarter.state === true || quarter.state === -1 || quarter.state === 1) {
                                quarter.months.forEach((month) => {
                                    if (month.state === true || month.state === -1 || month.state === 1) {
                                        if (showWeeks === true) {
                                            month.weeks.forEach((week) => {
                                                if (week.state === 1 || week.state === -1 || week.state === true) {
                                                    week.days.forEach((day) => {
                                                        if (day.state === 1 || day.state === true) {
                                                            getValues.push(day.fullDate);
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                        if (showWeeks === false) {
                                            month.days.forEach((day) => {
                                                if (day.state === true || day.state === 1) {
                                                    getValues.push(day.fullDate);
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        })
                    }
                    if (showQuarters === false) {
                        year.months.forEach((month) => {
                            if (month.state === true || month.state === -1 || month.state === 1) {
                                if (showWeeks === false) {
                                    month.days.forEach((day) => {
                                        if (day.state === true || day.state === 1) {
                                            getValues.push(day.fullDate);
                                        }
                                    })
                                }
                            }
                            if (showWeeks === true) {
                                month.weeks.forEach((week) => {
                                    if (week.state === 1 || week.state === -1 || week.state === true) {
                                        week.days.forEach((day) => {
                                            if (day.state === 1 || day.state === true) {
                                                getValues.push(day.fullDate);
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                }
            }
        })
        var t2 = performance.now();
        console.log('time', t2 - t1);
        console.log('dates', getValues);
        return getValues;
    }


    onChangeHandler = (name, e) => {
        if (isUndefinedOrNull(e.target.value)) {
            let { years, lastFilterData } = this.state;
            let { options } = this.props;
            let yearList = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.showQuarters, options.disabledList);
            this.setState({
                isSearching: false,
                searchValue: e.target.value,
                isNoDataFound: false,
                years: (lastFilterData && lastFilterData.length > 0) ? [...years] : [...yearList]
            });
            this.updateSelectAllCheckboxHandler([...years]);
        } else {
            this.setState({
                isSearching: true,
                searchValue: e.target.value
            });
        }
        this.props.onChange();
    }

    updateSelectAllCheckboxHandler = (checkYears) => {
        let _isSelectAll = true;
        let selectAllState = 0;
        checkYears.forEach((yr) => {
            if (yr.state === 0) {
                _isSelectAll = false;
            } else {
                selectAllState = selectAllState + yr.state;
            }
        });

        this.setState({
            isSelectAll: _isSelectAll,
            selectAllState: selectAllState
        });
    }

    updateCurrentSelection = (checkYears) => {
        this.setState({
            selections: [...checkYears]
        });
    }

    onSelectSearchResultChange = ({ target }) => {
        this.setState({
            isSelectAllSearchResult: target.checked
        });
    }

    onAddCurrentSelectionChange = ({ target }) => {
        this.setState({
            isAddCurrentSelection: target.checked,
            isExcludeFromSelection: !target.checked
        });
    }

    onExcludeFromSelectionChange = ({ target }) => {
        this.setState({
            isExcludeFromSelection: target.checked,
            isAddCurrentSelection: !target.checked,
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

    addToCurrentSelection = (firstArray, secondArray, callback) => {
        let { showWeeks, showQuarters } = this.props.options;
        if (!firstArray || firstArray.length <= 0) {
            callback(secondArray);
        } else {
            let resultYears = firstArray.map(a => Object.assign({}, a));
            firstArray.forEach((year, yearIndex) => {

                if (showQuarters === true) {

                    year.quarters.forEach((quarter, quarterIndex) => {
                        quarter.months.forEach((month, monthIndex) => {
                            if (showWeeks === true) {

                                month.weeks.forEach((week, weekIndex) => {
                                    week.days.forEach((day, dayIndex) => {

                                        resultYears[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['days'][dayIndex]['state'] = (day.state === 0) ? secondArray[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['days'][dayIndex]['state'] : day.state;

                                    });

                                    let days = [...resultYears[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['days']];
                                    let daysum = days.reduce((a, b) => +a + +b.state, 0);
                                    let isPartial = days.some(checkPartialState);

                                    resultYears[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] = (isPartial) ? -1 : (daysum === week.days.length) ? 1 : ((week.state === 0) ? secondArray[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] : week.state);

                                });

                                let weeks = [...resultYears[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks']];
                                let weeksum = weeks.reduce((a, b) => +a + +b.state, 0);
                                let isPartial = weeks.some(checkPartialState);

                                resultYears[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state'] = (isPartial) ? -1 : (weeksum === month.weeks.length) ? 1 : ((month.state === 0) ? secondArray[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state'] : month.state);

                            } else {
                                month.days.forEach((day, dayIndex) => {
                                    resultYears[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['days'][dayIndex]['state'] = (day.state === 0) ? secondArray[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['days'][dayIndex]['state'] : day.state;
                                });

                                let days = [...resultYears[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['days']];
                                let daysum = days.reduce((a, b) => +a + +b.state, 0);
                                let isPartial = days.some(checkPartialState);

                                resultYears[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state'] = (isPartial) ? -1 : (daysum === month.days.length) ? 1 : ((month.state === 0) ? secondArray[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state'] : month.state);
                            }

                        });

                        let months = [...resultYears[yearIndex]['quarters'][quarterIndex]['months']];
                        let monthsum = months.reduce((a, b) => +a + +b.state, 0);
                        let isPartial = months.some(checkPartialState);
                        resultYears[yearIndex]['quarters'][quarterIndex]['state'] = (isPartial) ? -1 : (monthsum === quarter.months.length) ? 1 : ((quarter.state === 0) ? secondArray[yearIndex]['quarters'][quarterIndex]['state'] : quarter.state);

                    });

                    let quarters = [...resultYears[yearIndex]['quarters']];
                    let quartersum = quarters.reduce((a, b) => +a + +b.state, 0);
                    let isPartial = quarters.some(checkPartialState);

                    resultYears[yearIndex]['state'] = (isPartial) ? -1 : (quartersum === year.quarters.length) ? 1 : ((year.state === 0) ? secondArray[yearIndex]['state'] : year.state);

                } else {
                    year.months.forEach((month, monthIndex) => {
                        if (showWeeks === true) {
                            month.weeks.forEach((week, weekIndex) => {

                                week.days.forEach((day, dayIndex) => {
                                    resultYears[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['days'][dayIndex]['state'] = (day.state === 0) ? secondArray[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['days'][dayIndex]['state'] : day.state;
                                });

                                let days = [...resultYears[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['days']];
                                let daysum = days.reduce((a, b) => +a + +b.state, 0);
                                let isPartial = days.some(checkPartialState);

                                resultYears[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] = (isPartial) ? -1 : (daysum === week.days.length) ? 1 : ((week.state === 0) ? secondArray[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] : week.state);
                            });

                            let weeks = [...resultYears[yearIndex]['months'][monthIndex]['weeks']];
                            let weeksum = weeks.reduce((a, b) => +a + +b.state, 0);
                            let isPartial = weeks.some(checkPartialState);

                            resultYears[yearIndex]['months'][monthIndex]['state'] = (isPartial) ? -1 : (weeksum === month.weeks.length) ? 1 : ((month.state === 0) ? secondArray[yearIndex]['months'][monthIndex]['state'] : month.state);
                        } else {
                            month.days.forEach((day, dayIndex) => {
                                resultYears[yearIndex]['months'][monthIndex]['days'][dayIndex]['state'] = (day.state === 0) ? secondArray[yearIndex]['months'][monthIndex]['days'][dayIndex]['state'] : day.state;
                            });

                            let days = [...resultYears[yearIndex]['months'][monthIndex]['days']];
                            let daysum = days.reduce((a, b) => +a + +b.state, 0);
                            let isPartial = days.some(checkPartialState);
                            resultYears[yearIndex]['months'][monthIndex]['state'] = (isPartial) ? -1 : (daysum === month.days.length) ? 1 : ((month.state === 0) ? secondArray[yearIndex]['months'][monthIndex]['state'] : month.state);
                        }
                    });

                    let months = [...resultYears[yearIndex]['months']];
                    let monthsum = months.reduce((a, b) => +a + +b.state, 0);
                    let isPartial = months.some(checkPartialState);

                    resultYears[yearIndex]['state'] = (isPartial) ? -1 : (monthsum === year.months.length) ? 1 : ((year.state === 0) ? secondArray[yearIndex]['state'] : year.state);
                }
            });

            callback(resultYears);
        }
    }

    excludeFromSelection = (firstArray, secondArray, callback) => {
        let { showWeeks, showQuarters } = this.props.options;
        let { filterSum, listOfYears } = this.state;

        if (filterSum === listOfYears.length) {
            callback([...listOfYears]);
        } else {
            let resultYears = firstArray.map(a => Object.assign({}, a));
            firstArray.forEach((year, yearIndex) => {

                resultYears[yearIndex]['state'] = opposite(secondArray[yearIndex]['state']);
                if (showQuarters === true) {

                    year.quarters.forEach((quarter, quarterIndex) => {

                        resultYears[yearIndex]['quarters'][quarterIndex]['state'] = opposite(secondArray[yearIndex]['quarters'][quarterIndex]['state']);

                        quarter.months.forEach((month, monthIndex) => {
                            resultYears[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state'] = opposite(secondArray[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state']);

                            if (showWeeks === true) {
                                month.weeks.forEach((week, weekIndex) => {
                                    resultYears[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] = opposite(secondArray[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['state']);

                                    week.days.forEach((day, dayIndex) => {
                                        resultYears[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['days'][dayIndex]['state'] = opposite(secondArray[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['days'][dayIndex]['state']);
                                    });

                                    let days = [...resultYears[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['days']];
                                    let isPartial = days.some(checkPartialState);
                                    let daysum = days.reduce((a, b) => +a + +b.state, 0);

                                    resultYears[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] = (isPartial) ? -1 : (daysum === week.days.length) ? 1 : ((week.state === 0) ? resultYears[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] : week.state);
                                });

                                let weeks = [...resultYears[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks']];
                                let isPartial = weeks.some(checkPartialState);
                                let weeksum = weeks.reduce((a, b) => +a + +b.state, 0);
                                resultYears[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state'] = (isPartial) ? -1 : (weeksum === month.weeks.length) ? 1 : ((month.state === 0) ? resultYears[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state'] : month.state);

                            } else {
                                month.days.forEach((day, dayIndex) => {
                                    resultYears[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['days'][dayIndex]['state'] = opposite(secondArray[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['days'][dayIndex]['state']);
                                });

                                let days = [...resultYears[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['days']];
                                let daysum = days.reduce((a, b) => +a + +b.state, 0);
                                let isPartial = days.some(checkPartialState);

                                resultYears[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state'] = (isPartial) ? -1 : (daysum === month.days.length) ? 1 : ((month.state === 0) ? resultYears[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state'] : month.state);
                            }
                        });

                        let months = [...resultYears[yearIndex]['quarters'][quarterIndex]['months']];
                        let monthsum = months.reduce((a, b) => +a + +b.state, 0);
                        let isPartial = months.some(checkPartialState);
                        resultYears[yearIndex]['quarters'][quarterIndex]['state'] = (isPartial) ? -1 : (monthsum === quarter.months.length) ? 1 : ((quarter.state === 0) ? resultYears[yearIndex]['quarters'][quarterIndex]['state'] : quarter.state);
                    });

                    let quarters = [...resultYears[yearIndex]['quarters']];
                    let quartersum = quarters.reduce((a, b) => +a + +b.state, 0);
                    let isPartial = quarters.some(checkPartialState);

                    resultYears[yearIndex]['state'] = (isPartial) ? -1 : (quartersum === year.quarters.length) ? 1 : (resultYears[yearIndex]['state']);

                } else {
                    year.months.forEach((month, monthIndex) => {
                        resultYears[yearIndex]['months'][monthIndex]['state'] = opposite(secondArray[yearIndex]['months'][monthIndex]['state']);

                        if (showWeeks === true) {
                            month.weeks.forEach((week, weekIndex) => {
                                resultYears[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] = opposite(secondArray[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['state']);

                                week.days.forEach((day, dayIndex) => {
                                    resultYears[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['days'][dayIndex]['state'] = opposite(secondArray[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['days'][dayIndex]['state']);
                                });

                                let days = [...resultYears[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['days']];
                                let daysum = days.reduce((a, b) => +a + +b.state, 0);
                                let isPartial = days.some(checkPartialState);

                                resultYears[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] = (isPartial) ? -1 : (daysum === week.days.length) ? 1 : ((week.state === 0) ? resultYears[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] : week.state);
                            });

                            let weeks = [...resultYears[yearIndex]['months'][monthIndex]['weeks']];
                            let weeksum = weeks.reduce((a, b) => +a + +b.state, 0);
                            let isPartial = weeks.some(checkPartialState);

                            resultYears[yearIndex]['months'][monthIndex]['state'] = (isPartial) ? -1 : (weeksum === month.weeks.length) ? 1 : ((month.state === 0) ? resultYears[yearIndex]['months'][monthIndex]['state'] : month.state);

                        } else {
                            month.days.forEach((day, dayIndex) => {
                                resultYears[yearIndex]['months'][monthIndex]['days'][dayIndex]['state'] = opposite(secondArray[yearIndex]['months'][monthIndex]['days'][dayIndex]['state']);
                            });

                            let days = [...resultYears[yearIndex]['months'][monthIndex]['days']];
                            let daysum = days.reduce((a, b) => +a + +b.state, 0);
                            let isPartial = days.some(checkPartialState);

                            resultYears[yearIndex]['months'][monthIndex]['state'] = (isPartial) ? -1 : (daysum === month.days.length) ? 1 : ((month.state === 0) ? resultYears[yearIndex]['months'][monthIndex]['state'] : month.state);
                        }
                    });

                    let months = [...resultYears[yearIndex]['months']];
                    let monthsum = months.reduce((a, b) => +a + +b.state, 0);
                    let isPartial = months.some(checkPartialState);

                    resultYears[yearIndex]['state'] = (isPartial) ? -1 : (monthsum === year.months.length) ? 1 : (resultYears[yearIndex]['state']);
                }
            });

            callback(resultYears);
        }

    }

    clearFilter = () => {
        let { searchValue, filteredYears, lastFilterData, listOfYears } = this.state;

        if (lastFilterData && lastFilterData.length > 0) {
            let _lastFilterData = [...lastFilterData];
            let obj = {
                'value': searchValue,
                'list': filteredYears
            };

            _lastFilterData.push(obj);

            let { options } = this.props;
            let yearList = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.showQuarters, options.disabledList);
            this.setState({
                isSearching: false,
                searchValue: "",
                lastFilterData: [],
                searchValue: "",
                years: [...yearList],
                isAddCurrentSelection: false,
                isExcludeFromSelection: false,
                isNoDataFound: false,
                selections: [],
                exclusions: [],
                filterSum: 0,
                lastFilterData: []
            });
            this.updateSelectAllCheckboxHandler([...listOfYears]);
        }
    }

    closeFilter = () => {
        let { searchValue, filteredData, lastFilterData, selections, exclusions, isAddCurrentSelection, isExcludeFromSelection, years } = this.state;

        const { options } = this.props;
        let yearList = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.showQuarters, options.disabledList);

        let _selections = selections.map(a => Object.assign({}, a));

        let _exclusions = exclusions.map(a => Object.assign({}, a));

        let _lastFilterData = [...lastFilterData];
        let obj = {
            'value': searchValue,
            'list': [...filteredData]
        };

        _lastFilterData.push(obj);

        if (_selections.length >= 1) {

            if (isAddCurrentSelection === true || _lastFilterData.length === 1) {

                this.addToCurrentSelection(_selections, (filteredData), (resultYears) => {

                    let _selections = resultYears.map(a => Object.assign({}, a));
                    this.setState({
                        isSearching: false,
                        isAddCurrentSelection: false,
                        isExcludeFromSelection: false,
                        isNoDataFound: false,
                        searchValue: "",
                        lastFilterData: _lastFilterData,
                        listOfYears: [...yearList],
                        selections: [..._selections],
                        filterSum: 0,
                        years: [...resultYears]
                    });

                    this.updateSelectAllCheckboxHandler([...resultYears]);
                });

            } else if (isExcludeFromSelection === true || _lastFilterData.length === 1) {
                this.addToCurrentSelection(_exclusions, (filteredData), (resultExclusion) => {

                    this.excludeFromSelection(_selections, (resultExclusion), (resultYears) => {
                        // console.log(resultYears, ' resultYears ');
                        let _selections = resultYears.map(a => Object.assign({}, a));
                        _exclusions = resultExclusion.map(a => Object.assign({}, a));
                        this.setState({
                            isSearching: false,
                            isAddCurrentSelection: false,
                            isExcludeFromSelection: false,
                            isNoDataFound: false,
                            searchValue: "",
                            lastFilterData: _lastFilterData,
                            listOfYears: [...yearList],
                            exclusions: [..._exclusions],
                            selections: [..._selections],
                            filterSum: 0,
                            years: [...resultYears]
                        });

                        this.updateSelectAllCheckboxHandler([...resultYears]);
                    });
                });

            } else {
                this.setState({
                    isSearching: false,
                    isNoDataFound: false,
                    searchValue: ""
                });

                this.updateSelectAllCheckboxHandler([...years]);
            }
        } else if (_selections.length <= 0) {
            var _newselections = filteredData.map(a => Object.assign({}, a));
            this.setState({
                isSearching: false,
                isAddCurrentSelection: false,
                isExcludeFromSelection: false,
                isNoDataFound: false,
                searchValue: "",
                lastFilterData: _lastFilterData,
                listOfYears: [...yearList],
                selections: [..._newselections],
                years: [...filteredData]
            });

            this.updateSelectAllCheckboxHandler([...filteredData]);
        } else {
            this.setState({
                isSearching: false,
                isAddCurrentSelection: false,
                isExcludeFromSelection: false,
                isNoDataFound: false,
                searchValue: "",
                years: [...years]
            });
        }
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

    refresh() {
        console.log('in refresh')
        let {options} = this.props;
        let yearList = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.showQuarters, options.disabledList);
        let { searchValue, filteredYears, lastFilterData, listOfYears ,years} = this.state;

        if(lastFilterData && lastFilterData.length > 0){
            let _lastFilterData = [...lastFilterData];
            let obj = {
                'value': searchValue,
                'list': filteredYears
            };
    
            _lastFilterData.push(obj);
        this.setState({
            isSearching: false,
            searchValue: "",
            lastFilterData: [],
            searchValue: "",
            years: [...this.state.listOfYears],
            isAddCurrentSelection: false, 
            isExcludeFromSelection: false,
            isNoDataFound: false,
            selections: [],
            exclusions: [],
            filterSum: 0,
            lastFilterData: []
        });
        this.updateSelectAllCheckboxHandler([...listOfYears]);
        }else{
            this.setState({
            
                isSelectAll: false,    
                years: [...yearList]
            
            })
        }
    }

    render() {
        const { options } = this.props;
        const { isSearching, searchValue, years, listOfYears, isSelectAllSearchResult, isSelectAll, lastFilterData, isAddCurrentSelection, isExcludeFromSelection, exclusions, filteredData, isNoDataFound } = this.state;
        return (
            <div className="VS-Hierarchy" options={options}>
                <div className="VS-Hierarchy-Searchbox">
                    <span className={this.getSeachIconAlignClass()}>
                        <FaSearch className={`${CONSTANTS.CLASSES.VS_SHAPE} ${CONSTANTS.CLASSES.VS_TEXT_DARK}`} />
                    </span>
                    <Input className={this.getInputClass()} type="text" value={searchValue} placeholder="Search.." onChange={this.onChangeHandler.bind(this, searchValue)} onClick={this.onFocus}  onBlur={this.onBlur} onInput={this.onInput}/>

                    <span className={`${CONSTANTS.CLASSES.VS_PULL_RIGHT}`}>
                        
                            <FaFilter className={`${CONSTANTS.CLASSES.VS_SHAPE} ${CONSTANTS.CLASSES.VS_TEXT_DARK} ${CONSTANTS.CLASSES.VS_FILTER_ICON} ${((lastFilterData && lastFilterData.length > 0)) ? '' : CONSTANTS.CLASSES.VS_DISABLED_ICON}`} onClick={() => this.clearFilter()} />
                            {
                                (lastFilterData && lastFilterData.length > 0)? <div className='VS-refresh-tooltip'><span>Clear Filter</span></div> : ""
                            }
                        
                    </span>
                    {
                        (isSearching === true) ?
                            <span className={`${CONSTANTS.CLASSES.VS_PULL_RIGHT}`}>
                                <FaClose className={`${CONSTANTS.CLASSES.VS_SHAPE} ${CONSTANTS.CLASSES.VS_TEXT_DARK} ${CONSTANTS.CLASSES.VS_CLOSE_ICON}`} onClick={() => this.closeFilter()} />
                                <div className='VS_cross_tool_tip'>
                                    <span>Close Filter</span>
                                </div>
                           </span>  : ''
                    }
                </div>
                <div className="VS-Hierarchy-Filter-List VS-YearRow">
                    {
                        (isNoDataFound === true) ?
                            <label className="VS-Checkbox-Container">No Result Found!</label> : ''
                    }
                    {
                        (isSearching === true && isNoDataFound === false && lastFilterData && lastFilterData.length > 0) ?
                            <label className="VS-Checkbox-Container">Select All Search Results
                            <input className="VS-Checkbox" type="checkbox" checked={isSelectAllSearchResult} onChange={(e) => this.onSelectSearchResultChange(e)}></input>
                                <span className={this.getCheckBoxClass()}></span>
                            </label> : ''
                    }
                    {
                        (isSearching === true && isNoDataFound === false && lastFilterData && lastFilterData.length > 0) ?
                        <hr className="VS-HorizontalLine"></hr> : ''
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
                        (isSearching === true && isNoDataFound === false && lastFilterData && lastFilterData.length > 0) ?
                            <label className="VS-Checkbox-Container">Add To Current Selection
                            <input className="VS-Checkbox" type="checkbox" checked={isAddCurrentSelection} onChange={(e) => this.onAddCurrentSelectionChange(e)}></input>
                                <span className={this.getCheckBoxClass()}></span>
                            </label> : ''
                    }
                    {
                        (isSearching === true && isNoDataFound === false && lastFilterData && lastFilterData.length > 0) ?
                            <label className="VS-Checkbox-Container">{(exclusions && exclusions.length > 0) ? 'Add To Previous Exclusions' : 'Exclude From Selection'}
                                <input className="VS-Checkbox" type="checkbox" checked={isExcludeFromSelection} onChange={(e) => this.onExcludeFromSelectionChange(e)}></input>
                                <span className={this.getCheckBoxClass()}></span>
                            </label> : ''
                    }
                    {
                        (isSearching === true && isNoDataFound === false && lastFilterData && lastFilterData.length > 0) ?
                        <hr className="VS-HorizontalLine"></hr> : ''
                    }
                </div>
                <div id="VS-Scrollbar">
                    {
                        (isSearching === true) ?
                            <FilterView options={options} isFilterView={true} searchValue={searchValue} listOfYears={listOfYears} years={years} isSelectAllSearchResult={isSelectAllSearchResult} onChangeQuarter={this.onChangeQuarterHandler} onChangeMonth={this.onChangeMonthHandler} onChangeDay={this.onChangeDayHandler} onChangeWeek={this.onChangeWeekHandler} onChangeWeekDay={this.onChangeWeekDayHandler} onFilteredDataChange={this.onFilteredDataChangeHandler} onUpdateSelectAllCheckbox={this.updateSelectAllCheckboxHandler}></FilterView> :

                            <YearDisplay options={options} isFilterView={false} years={years} onChangeQuarter={this.onChangeQuarterHandler} isAddCurrentSelection={isAddCurrentSelection} isExcludeFromSelection={isExcludeFromSelection} onChangeMonth={this.onChangeMonthHandler} onChangeDay={this.onChangeDayHandler} onChangeWeek={this.onChangeWeekHandler} onChangeWeekDay={this.onChangeWeekDayHandler} onUpdateSelectAllCheckbox={this.updateSelectAllCheckboxHandler}></YearDisplay>
                    }
                </div>
               
            </div>
        )
    }
}
export default DatehierarchyView;