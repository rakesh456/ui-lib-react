import React from "react";
import { getSearchObj } from "../../utils/datehierarchyutils";
import { isUndefinedOrNull } from "../../utils/utils";
import YearDisplay from "./yearDisplay";
const checkPartialState = obj => obj.state === -1;
class FilterView extends React.PureComponent {
    constructor(props) {
        super(props);
        let { options } = this.props;

        let searchObj = getSearchObj(options);
        this.state = { filteredYears: [], searchValue: "", searchObj: searchObj };
    }

    getYears() {
        return this.state.filteredYears;
    }

    componentDidMount() {
        // let years = [...this.getYears()];
        this.setState({ filteredYears: [...this.props.listOfYears] });
    }

    componentDidUpdate(prevProps, next) {
        if (prevProps.searchValue !== this.props.searchValue || isUndefinedOrNull(this.state.searchValue)) {
            this.onSearchValueChangeHandler(this.props.searchValue);
        }
    }

    getMaxLevel(arr) {
        const maxValueOfY = Math.max(...arr.map((item) => item.level), 0);
        return maxValueOfY;
    }

    itemExists(arr, level, index, val) {
        return (arr.filter(item => (item.level === level && item.searchKey === val.toString().toLowerCase()))).length >= 1;
    }

    searchStringExists(arr, level, searchKey) {
        return (arr.filter(item => (item.level === level && item.searchKey === (searchKey).toString()))).length >= 1;
    }

    onSearchValueChangeHandler(searchValue) {
        searchValue = (searchValue) ? searchValue.toLowerCase() : '';
        let { searchObj } = this.state;
        let { listOfYears } = this.props;
        let { showWeeks, showQuarters } = this.props.options;
        let _years = listOfYears.map(a => Object.assign({}, a));
        const stateRegEx = /\"state\":0/gi
        const stateRegExOne = /\"state\":1/gi

        if (!isUndefinedOrNull(searchValue)) {

            let searchResult = searchObj.filter(searchElement => (searchElement.searchKey.includes(searchValue)));
            searchResult.sort((a, b) => {
                if (a.level > b.level) return -1
                return a.level < b.level ? 1 : 0
            });

            let maxLevel = this.getMaxLevel(searchResult);
            _years.forEach((year, yearIndex) => {
                const foundYear = this.itemExists(searchResult, 1, yearIndex, year.year);
                _years[yearIndex]['state'] = (foundYear) ? 1 : 0;
                _years[yearIndex]['showChild'] = true;

                if (showQuarters === true) {
                    let quarters = year['quarters'];
                    if (foundYear || (maxLevel === 2 && searchResult.length === 4)) {
                        let newQuarters = JSON.stringify(quarters).replace(stateRegEx, '"state":1');
                        // newQuarters = JSON.stringify(newQuarters).replace(stateRegExMinus, '"state":1');

                        _years[yearIndex]['state'] = 1;
                        _years[yearIndex]['quarters'] = [...JSON.parse(newQuarters)];

                    } else {
                        if (maxLevel === 1) {
                            _years[yearIndex]['quarters'] = [...quarters];
                        } else {
                            quarters.forEach((quarter, quarterIndex) => {
                                let foundQuarter = false;
                                if (!foundYear) {
                                    foundQuarter = this.itemExists(searchResult, 2, quarterIndex, quarter.quarter);
                                    _years[yearIndex]['quarters'][quarterIndex]['state'] = (foundQuarter) ? 1 : 0;
                                }

                                let months = quarter['months'];
                                if (foundQuarter) {
                                    let newMonths = JSON.stringify(months).replace(stateRegEx, '"state":1');
                                    _years[yearIndex]['quarters'][quarterIndex]['months'] = [...JSON.parse(newMonths)];
                                } else {
                                    if (maxLevel === 2) {
                                        _years[yearIndex]['quarters'][quarterIndex]['months'] = [...months];
                                    } else {
                                        months.forEach((month, monthIndex) => {
                                            let foundMonth = false;
                                            if (!foundQuarter) {
                                                foundMonth = this.searchStringExists(searchResult, 3, month.searchString);
                                                _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state'] = (foundMonth) ? 1 : 0;
                                            }

                                            if (showWeeks === true) {
                                                let weeks = month['weeks'];

                                                if (foundMonth || (maxLevel === 4 && searchResult.length === weeks.length)) {
                                                    let newWeeks = JSON.stringify(weeks).replace(stateRegEx, '"state":1');
                                                    _years[yearIndex]['state'] = 1;
                                                    _years[yearIndex]['quarters'][quarterIndex]['state'] = 1;
                                                    _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state'] = 1;
                                                    _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'] = [...JSON.parse(newWeeks)];

                                                } else {
                                                    if (maxLevel === 3) {
                                                        // _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['showChild'] = true;

                                                        let newWeeks = JSON.stringify(weeks).replace(stateRegExOne, '"state":0');

                                                        _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'] = [...JSON.parse(newWeeks)];
                                                    } else {

                                                        weeks.forEach((week, weekIndex) => {
                                                            let foundWeek = false;
                                                            if (!foundMonth) {
                                                                foundWeek = this.itemExists(searchResult, 4, weekIndex, week.week);
                                                                _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] = (foundWeek) ? 1 : 0;
                                                            }

                                                            let days = week['days'];

                                                            if (foundWeek) {
                                                                let newDays = JSON.stringify(days).replace(stateRegEx, '"state":1');

                                                                _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['days'] = [...JSON.parse(newDays)];
                                                            } else {
                                                                if (maxLevel === 4) {
                                                                    _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['days'] = [...days];
                                                                } else {

                                                                    days.forEach((day, dayIndex) => {
                                                                        let foundDay = false;

                                                                        if (!foundWeek) {
                                                                            foundDay = this.searchStringExists(searchResult, 5, day.date);

                                                                            _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['days'][dayIndex]['state'] = (foundDay) ? 1 : 0;
                                                                        }

                                                                        if (dayIndex >= days.length - 1 && !foundYear && !foundQuarter && !foundMonth && !foundWeek) {
                                                                            let sum = days.reduce((a, b) => +a + +b.state, 0);
                                                                            _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] = (sum === days.length) ? 1 : (sum === 0) ? _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] : -1;
                                                                        }
                                                                    });
                                                                }
                                                            }

                                                            if (weekIndex >= weeks.length - 1 && !foundYear && !foundQuarter && !foundMonth) {
                                                                let sum = weeks.reduce((a, b) => +a + +b.state, 0);
                                                                let isPartial = weeks.some(checkPartialState);

                                                                _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state'] = (sum === weeks.length) ? 1 : (sum === 0 && !isPartial) ? _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state'] : -1;
                                                            }
                                                        });
                                                    }
                                                }
                                            } else {
                                                let days = month['days'];

                                                if (foundMonth || (maxLevel === 3 && searchResult.length === days.length)) {
                                                    let newDays = JSON.stringify(days).replace(stateRegEx, '"state":1');
                                                    _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['days'] = [...JSON.parse(newDays)];
                                                } else {
                                                    if (maxLevel === 3) {
                                                        let newDays = JSON.stringify(days).replace(stateRegExOne, '"state":0');
                                                        _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['days'] = [...JSON.parse(newDays)];
                                                    } else {
                                                        days.forEach((day, dayIndex) => {
                                                            let foundDay = false;
                                                            if (!foundMonth) {
                                                                foundDay = this.searchStringExists(searchResult, 4, day.date);
                                                                // foundDay = this.itemExists(searchResult, 4, dayIndex, day.day);
                                                                _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['days'][dayIndex]['state'] = (foundDay) ? 1 : 0;
                                                            }

                                                            if (dayIndex >= days.length - 1 && !foundYear && !foundQuarter && !foundMonth) {
                                                                let sum = days.reduce((a, b) => +a + +b.state, 0);
                                                                _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state'] = (sum === days.length) ? 1 : (sum === 0) ? _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state'] : -1;
                                                            }
                                                        });
                                                    }
                                                }
                                            }

                                            if (monthIndex >= months.length - 1 && !foundYear && !foundQuarter) {
                                                let sum = months.reduce((a, b) => +a + +b.state, 0);
                                                _years[yearIndex]['quarters'][quarterIndex]['state'] = (sum === 3) ? 1 : (sum === 0) ? _years[yearIndex]['quarters'][quarterIndex]['state'] : -1;
                                                _years[yearIndex]['quarters'][quarterIndex]['showChild'] = true;
                                            }
                                        });
                                    }
                                }

                                if (quarterIndex >= quarters.length - 1 && !foundYear) {
                                    let sum = quarters.reduce((a, b) => +a + +b.state, 0);
                                    _years[yearIndex]['state'] = (sum === 4) ? 1 : (sum === 0) ? _years[yearIndex]['state'] : -1;
                                }
                            });
                        }
                    }
                } else {
                    let months = year['months'];

                    if (foundYear) {
                        let newMonths = JSON.stringify(months).replace(stateRegEx, '"state":1');
                        _years[yearIndex]['months'] = [...JSON.parse(newMonths)];
                    } else {
                        if (maxLevel === 1) {
                            _years[yearIndex]['months'] = [...months];
                        } else {
                            months.forEach((month, monthIndex) => {
                                let foundMonth = false;

                                if (!foundYear) {
                                    foundMonth = this.searchStringExists(searchResult, 2, month.searchString);
                                    _years[yearIndex]['months'][monthIndex]['state'] = (foundMonth) ? 1 : 0;
                                }

                                if (showWeeks === true) {
                                    let weeks = month['weeks'];

                                    if (foundMonth || (maxLevel === 3 && searchResult.length === weeks.length)) {
                                        _years[yearIndex]['state'] = 1;
                                        _years[yearIndex]['months'][monthIndex]['state'] = 1;
                                        // _years[yearIndex]['months'][monthIndex]['showChild'] = true;
                                        let newWeeks = JSON.stringify(weeks).replace(stateRegEx, '"state":1');
                                        _years[yearIndex]['months'][monthIndex]['weeks'] = [...JSON.parse(newWeeks)];
                                    } else {

                                        if (maxLevel === 2) {
                                            let newWeeks = JSON.stringify(weeks).replace(stateRegExOne, '"state":0');
                                            _years[yearIndex]['months'][monthIndex]['weeks'] = [...JSON.parse(newWeeks)];
                                        } else {

                                            weeks.forEach((week, weekIndex) => {
                                                let foundWeek = false;
                                                if (!foundMonth) {
                                                    foundWeek = this.itemExists(searchResult, 3, weekIndex, week.week);
                                                    _years[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] = (foundWeek) ? 1 : 0;
                                                }

                                                let days = week['days'];

                                                if (foundWeek) {
                                                    _years[yearIndex]['state'] = 1;
                                                    _years[yearIndex]['months'][monthIndex]['state'] = 1;

                                                    let newDays = JSON.stringify(days).replace(stateRegEx, '"state":1');
                                                    _years[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['days'] = [...JSON.parse(newDays)];
                                                } else {
                                                    if (maxLevel === 3) {
                                                        _years[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['days'] = [...days];
                                                    } else {
                                                        days.forEach((day, dayIndex) => {
                                                            let foundDay = false;
                                                            if (!foundWeek) {
                                                                foundDay = this.searchStringExists(searchResult, 4, day.date);
                                                                _years[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['days'][dayIndex]['state'] = (foundDay) ? 1 : 0;
                                                            }

                                                            if (dayIndex >= days.length - 1 && !foundYear && !foundMonth && !foundWeek) {
                                                                let sum = days.reduce((a, b) => +a + +b.state, 0);
                                                                _years[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] = (sum === days.length) ? 1 : (sum === 0) ? _years[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] : -1;
                                                            }
                                                        });
                                                    }
                                                }

                                                if (weekIndex >= weeks.length - 1 && !foundYear && !foundMonth) {
                                                    let sum = weeks.reduce((a, b) => +a + +b.state, 0);
                                                    let isPartial = weeks.some(checkPartialState);

                                                    _years[yearIndex]['months'][monthIndex]['state'] = (sum === weeks.length) ? 1 : (sum === 0 && !isPartial) ? _years[yearIndex]['months'][monthIndex]['state'] : -1;
                                                }
                                            });
                                        }
                                    }
                                } else {
                                    let days = month['days'];

                                    if (foundMonth || (maxLevel === 3 && searchResult.length === days.length)) {
                                        let newDays = JSON.stringify(days).replace(stateRegEx, '"state":1');
                                        _years[yearIndex]['months'][monthIndex]['days'] = [...JSON.parse(newDays)];
                                    } else {
                                        if (maxLevel === 2) {
                                            let newDays = JSON.stringify(days).replace(stateRegExOne, '"state":0');
                                            _years[yearIndex]['months'][monthIndex]['days'] = [...JSON.parse(newDays)];
                                        } else {
                                            days.forEach((day, dayIndex) => {
                                                let foundDay = false;
                                                if (!foundMonth) {
                                                    foundDay = this.searchStringExists(searchResult, 3, day.date);
                                                    // foundDay = this.itemExists(searchResult, 3, dayIndex, day.day);
                                                    _years[yearIndex]['months'][monthIndex]['days'][dayIndex]['state'] = (foundDay) ? 1 : 0;
                                                }

                                                if (dayIndex >= days.length - 1 && !foundYear && !foundMonth) {
                                                    let sum = days.reduce((a, b) => +a + +b.state, 0);
                                                    _years[yearIndex]['months'][monthIndex]['state'] = (sum === days.length) ? 1 : (sum === 0) ? _years[yearIndex]['months'][monthIndex]['state'] : -1;
                                                }
                                            });
                                        }
                                    }
                                }

                                if (monthIndex >= months.length - 1 && !foundYear) {
                                    let sum = months.reduce((a, b) => +a + +b.state, 0);
                                    _years[yearIndex]['state'] = (sum === 12) ? 1 : (sum === 0) ? _years[yearIndex]['state'] : -1;
                                }
                            });
                        }
                    }
                }
            });

            this.setState({
                filteredYears: _years,
                searchValue: searchValue
            });

            this.props.onFilteredDataChange(_years);
        } else {
            this.setState({
                filteredYears: _years,
                searchValue: searchValue
            });
            this.props.onFilteredDataChange(_years);
        }
    }

    updateSelectAllCheckboxHandler = (years) => {
        this.props.onUpdateSelectAllCheckbox([...years])
    }

    onChangeQuarterHandler = (quarterObj) => {
        // let years = [...this.getYears()];
        // let { showWeeks } = this.props.options;
        // quarterChangeCallback(years, showWeeks, quarterObj, (quarterObj) => {
        //     this.setState({
        //         filteredYears: [...years]
        //     })
        // });

        this.props.onChangeQuarter(quarterObj);
    }

    onChangeMonthHandler = (monthObj) => {
        this.props.onChangeMonth(monthObj);
    }

    onChangeWeekHandler = (weekObj) => {
        this.props.onChangeWeek(weekObj);
    }

    onChangeDayHandler = (dayObj) => {
        this.props.onChangeDay(dayObj);
    }

    onChangeWeekDayHandler = (weekDaysObj) => {
        this.props.onChangeWeekDay(weekDaysObj);
    }

    render() {
        const { options } = this.props;
        const { filteredYears } = this.state;
        return (
            <div options={options}>
                <YearDisplay options={options} isFilterView={true} years={filteredYears} onChangeQuarter={this.onChangeQuarterHandler} onChangeMonth={this.onChangeMonthHandler} onChangeDay={this.onChangeDayHandler} onChangeWeek={this.onChangeWeekHandler} onChangeWeekDay={this.onChangeWeekDayHandler} onUpdateSelectAllCheckbox={this.updateSelectAllCheckboxHandler}></YearDisplay>
            </div>
        )
    }
}
export default FilterView;