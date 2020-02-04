import React from "react";
import { getSearchObj, quarterChangeCallback, monthChangeCallback, weekChangeCallback, dayChangeCallback, weekDayChangeCallback, getListOfYears } from "../../utils/datehierarchyutils";
import { isUndefinedOrNull } from "../../utils/utils";
import YearDisplay from "./yearDisplay";
const checkPartialState = obj => obj.state === -1;
const checkOneMatch = obj => obj.state === 1;
const stateRegEx = /\"state\":0/gi
const stateRegExOne = /\"state\":1/gi

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
        let years = [...this.props.years];
        this.setState({ filteredYears: [...this.props.listOfYears] });
    }

    componentDidUpdate(prevProps, next) {
        if (prevProps.searchValue !== this.props.searchValue || isUndefinedOrNull(this.state.searchValue)) {
            this.onSearchValueChangeHandler(this.props.searchValue);
        }
        if(prevProps.isSelectAllSearchResult !== this.props.isSelectAllSearchResult){
            let { filteredYears } = this.state;
            let newYears = "";
            if(this.props.isSelectAllSearchResult === true){
                newYears = JSON.stringify(filteredYears).replace(stateRegEx, '"state":1');
            } else {
                newYears = JSON.stringify(filteredYears).replace(stateRegExOne, '"state":0');
            }

            this.setState({
                filteredYears: [...JSON.parse(newYears)]
            });

            this.props.onFilteredDataChange([...JSON.parse(newYears)]);
        }
    }

    getMaxLevel(arr) {
        const maxValueOfY = Math.max(...arr.map((item) => item.level), 0);
        return maxValueOfY;
    }

    itemExists(arr, level, index, val) {
        return (arr.filter(item => (item.level === level && item.searchKey === val.toString().toLowerCase().replace(/ /g,'')))).length >= 1;
    }

    searchStringExists(arr, level, searchKey) {
        return (arr.filter(item => (item.level === level && item.searchKey === (searchKey).toString()))).length >= 1;
    }

    onSearchValueChangeHandler(searchValue) {
        searchValue = (searchValue) ? searchValue.toLowerCase() : '';
        searchValue = searchValue.replace(/ /g,'');

        let { searchObj } = this.state;
        // let { listOfYears } = this.props;
        const { options } = this.props;
        let listOfYears = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.showQuarters, options.disabledList);
        
        let { showWeeks, showQuarters } = this.props.options;
        let _years = listOfYears.map(a => Object.assign({}, a));
        const stateRegEx = /\"state\":0/gi
        const stateRegExOne = /\"state\":1/gi
        const matchRegEx = /\"match\":0/gi
        const matchRegExOne = /\"match\":1/gi

        if (!isUndefinedOrNull(searchValue)) {
            let searchResult = [];

            let isStartWithQ = searchValue.startsWith('q');
            let isStartWithWeek = (searchValue.startsWith('w') || searchValue.startsWith('we') || searchValue.startsWith('wee') || searchValue.startsWith('week'));
            if(showQuarters === true){
                
                if(showWeeks === true){
                    searchResult = searchObj.filter(searchElement => {
                        if(isStartWithQ === true && searchElement.level === 2 && searchElement.searchKey.includes(searchValue)){
                            return true;
                        } else if(isStartWithWeek === true && searchElement.level === 4 && searchElement.searchKey.includes(searchValue)){
                            return true;
                        } else if(isStartWithQ === false && searchValue <= 99 && searchElement.searchKey.includes(searchValue) && searchElement.level !== 1 && searchElement.level !== 2 && searchElement.level !== 4){
                            return true;
                        } else if((isStartWithQ === false && searchElement.searchKey.includes(searchValue) && (searchValue > 99 || (searchElement.level !== 1 && searchElement.level !== 2 && searchElement.level !== 4))) || (searchElement.searchKey === searchValue && searchElement.level === 1)){
                            return true;
                        } else {
                            return false;
                        }
                    });
                } else {
                    searchResult = searchObj.filter(searchElement => {
                        if(isStartWithQ === true && searchElement.level === 2 && searchElement.searchKey.includes(searchValue)){
                            return true;
                        } else if(isStartWithQ === false && searchValue <= 99 && searchElement.searchKey.includes(searchValue) && searchElement.level !== 1 && searchElement.level !== 2){
                            return true;
                        } else if((isStartWithQ === false && searchElement.searchKey.includes(searchValue) && (searchValue > 99 || (searchElement.level !== 1 && searchElement.level !== 2))) || (searchElement.searchKey === searchValue && searchElement.level === 1)){
                            return true;
                        } else {
                            return false;
                        }
                    });
                }
            } else {
                if(showWeeks === true){
                    searchResult = searchObj.filter(searchElement => {
                        if(isStartWithWeek === true && searchElement.level === 3 && searchElement.searchKey.includes(searchValue)){
                            return true;
                        } else if(isStartWithWeek === false && searchValue <= 99 && searchElement.searchKey.includes(searchValue) && searchElement.level !== 1 && searchElement.level !== 3){
                            return true;
                        } else if((isStartWithQ === false && searchElement.searchKey.includes(searchValue) && (searchValue > 99 || (searchElement.level !== 1 && searchElement.level !== 3))) || (searchElement.searchKey === searchValue && searchElement.level === 1)){
                            return true;
                        } else {
                            return false;
                        }
                    });
                } else {
                    searchResult = searchObj.filter(searchElement => {
                        if(isStartWithQ === true && searchElement.level === 2 && searchElement.searchKey.includes(searchValue)){
                            return true;
                        } else if(isStartWithQ === false && searchValue <= 99 && searchElement.searchKey.includes(searchValue) && searchElement.level !== 1){
                            return true;
                        } else if((isStartWithQ === false && searchElement.searchKey.includes(searchValue) && (searchValue > 99 || (searchElement.level !== 1))) || (searchElement.searchKey === searchValue && searchElement.level === 1)){
                            return true;
                        } else {
                            return false;
                        }
                    });
                }
            }

            console.log(' searchResult ', searchResult);

            searchResult.sort((a, b) => {
                if (a.level > b.level) return -1
                return a.level < b.level ? 1 : 0
            });

            let maxLevel = this.getMaxLevel(searchResult);
            _years.forEach((year, yearIndex) => {
                const foundYear = this.itemExists(searchResult, 1, yearIndex, year.year);
                _years[yearIndex]['match'] = _years[yearIndex]['state'] = (foundYear) ? 1 : 0;;
                _years[yearIndex]['showChild'] = true;

                if (showQuarters === true) {
                    let quarters = year['quarters'];
                    if (foundYear || (maxLevel === 2 && searchResult.length === 4)) {
                        let newQuarters = JSON.stringify(quarters).replace(stateRegEx, '"state":1').replace(matchRegEx, '"match":1');
                        
                        _years[yearIndex]['state'] = _years[yearIndex]['match'] = 1;
                        _years[yearIndex]['quarters'] = [...JSON.parse(newQuarters)];

                    } else {
                        if (maxLevel === 1) {
                            _years[yearIndex]['quarters'] = [...quarters];
                        } else {
                            quarters.forEach((quarter, quarterIndex) => {
                                let foundQuarter = false;
                                
                                if (!foundYear) {
                                    foundQuarter = this.itemExists(searchResult, 2, quarterIndex, quarter.quarter);
                                    _years[yearIndex]['quarters'][quarterIndex]['match'] = _years[yearIndex]['quarters'][quarterIndex]['state'] = (foundQuarter) ? 1 : 0;                                    
                                }

                                let months = quarter['months'];
                                if (foundQuarter) {
                                    let newMonths = JSON.stringify(months).replace(stateRegEx, '"state":1').replace(matchRegEx, '"match":1');
                                    _years[yearIndex]['quarters'][quarterIndex]['months'] = [...JSON.parse(newMonths)];
                                    _years[yearIndex]['match'] = 1;
                                } else {
                                    if (maxLevel === 2) {
                                        _years[yearIndex]['quarters'][quarterIndex]['months'] = [...months];
                                    } else {
                                        months.forEach((month, monthIndex) => {
                                            let foundMonth = false;
                                            if (!foundQuarter) {
                                                foundMonth = this.searchStringExists(searchResult, 3, month.searchString);
                                                _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['match'] = _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state'] = (foundMonth) ? 1 : 0;
                                            }

                                            if (showWeeks === true) {
                                                let weeks = month['weeks'];

                                                if (foundMonth || (maxLevel === 4 && searchResult.length === weeks.length)) {
                                                    let newWeeks = JSON.stringify(weeks).replace(stateRegEx, '"state":1').replace(matchRegEx, '"match":1');
                                                    _years[yearIndex]['state'] = 1;
                                                     _years[yearIndex]['quarters'][quarterIndex]['state'] = 1;
                                                    _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['match'] = _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state'] = 1;
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
                                                                _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['match'] = _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] = (foundWeek) ? 1 : 0;
                                                            }

                                                            let newDays = JSON.stringify(week['days']).replace(stateRegExOne, '"state":0');
                                                            let days = [...JSON.parse(newDays)];

                                                            if (foundWeek) {
                                                                let newDays = JSON.stringify(days).replace(stateRegEx, '"state":1').replace(matchRegEx, '"match":1');

                                                                _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['days'] = [...JSON.parse(newDays)];
                                                            } else {
                                                                if (maxLevel === 4) {
                                                                    _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['days'] = [...days];
                                                                } else {

                                                                    days.forEach((day, dayIndex) => {
                                                                        let foundDay = false;

                                                                        if (!foundWeek) {
                                                                            foundDay = this.searchStringExists(searchResult, 5, day.date);

                                                                            _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['days'][dayIndex]['match'] = _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['days'][dayIndex]['state'] = (foundDay) ? 1 : 0;
                                                                        }

                                                                        if (dayIndex >= days.length - 1 && !foundYear && !foundQuarter && !foundMonth && !foundWeek) {
                                                                            let updatedDays = _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['days'];

                                                                            let sum = updatedDays.reduce((a, b) => +a + +b.state, 0);
                                                                            _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] = (sum === updatedDays.length) ? 1 : (sum === 0) ? _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] : -1;
                                                                        }
                                                                    });

                                                                    let matchDays = _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['days'];

                                                                    let isMathcOne = JSON.stringify(matchDays).match(matchRegExOne);
                                                                    _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['match'] = (isMathcOne === null)? 0 : 1;
                                                                }
                                                            }

                                                            if (weekIndex >= weeks.length - 1 && !foundYear && !foundQuarter && !foundMonth) {
                                                                let sum = weeks.reduce((a, b) => +a + +b.state, 0);
                                                                let isPartial = weeks.some(checkPartialState);

                                                                _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state'] = (sum === weeks.length) ? 1 : (sum === 0 && !isPartial) ? _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state'] : -1;
                                                            }
                                                        });

                                                        let matchWeeks = _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'];
                                                        let isMathcOne = JSON.stringify(matchWeeks).match(matchRegExOne);
                                                        _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['match'] = (isMathcOne === null)? 0 : 1;

                                                    }
                                                }
                                            } else {
                                                let days = month['days'];

                                                if (foundMonth || (maxLevel === 3 && searchResult.length === days.length)) {
                                                    let newDays = JSON.stringify(days).replace(stateRegEx, '"state":1').replace(matchRegEx, '"match":1');
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
                                                                _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['days'][dayIndex]['match'] = _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['days'][dayIndex]['state'] = (foundDay) ? 1 : 0;
                                                            }

                                                            if (dayIndex >= days.length - 1 && !foundYear && !foundQuarter && !foundMonth) {
                                                                let updatedDays = _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['days'];

                                                                let sum = updatedDays.reduce((a, b) => +a + +b.state, 0);
                                                                _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state'] = (sum === updatedDays.length) ? 1 : (sum === 0) ? _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state'] : -1;
                                                            }
                                                        });

                                                        let matchDays = _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['days'];
                                                        let isMathcOne = JSON.stringify(matchDays).match(matchRegExOne);
                                                        _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['match'] = (isMathcOne === null)? 0 : 1;
                                                    }
                                                }
                                            }

                                            if (monthIndex >= months.length - 1 && !foundYear && !foundQuarter) {
                                                let sum = months.reduce((a, b) => +a + +b.state, 0);
                                                _years[yearIndex]['quarters'][quarterIndex]['state'] = (sum === 3) ? 1 : (sum === 0) ? _years[yearIndex]['quarters'][quarterIndex]['state'] : -1;
                                                _years[yearIndex]['quarters'][quarterIndex]['showChild'] = true;
                                                
                                            }
                                        });
                                        
                                        let matchMonths = _years[yearIndex]['quarters'][quarterIndex]['months'];
                                        let isMathcOne = JSON.stringify(matchMonths).match(matchRegExOne);
                                        _years[yearIndex]['quarters'][quarterIndex]['match'] = (isMathcOne === null)? 0 : 1;
                                        
                                    }
                                }

                                if (quarterIndex >= quarters.length - 1 && !foundYear) {
                                    let sum = quarters.reduce((a, b) => +a + +b.state, 0);
                                    _years[yearIndex]['state'] = (sum === 4) ? 1 : (sum === 0) ? _years[yearIndex]['state'] : -1;
                                    if(sum === 4){
                                        let newQuarters = JSON.stringify(quarters).replace(stateRegEx, '"state":1').replace(matchRegEx, '"match":1');
                        
                                        _years[yearIndex]['match'] = 1;
                                        _years[yearIndex]['quarters'] = [...JSON.parse(newQuarters)];
                                    }
                                }
                            });

                            let matchQuarters = _years[yearIndex]['quarters'];
                            let isMathcOne = JSON.stringify(matchQuarters).match(matchRegExOne);
                            _years[yearIndex]['match'] = (isMathcOne === null)? 0 : 1;
                        }
                    }
                } else {
                    let months = year['months'];

                    if (foundYear) {
                        let newMonths = JSON.stringify(months).replace(stateRegEx, '"state":1').replace(matchRegEx, '"match":1');
                        _years[yearIndex]['months'] = [...JSON.parse(newMonths)];
                    } else {
                        if (maxLevel === 1) {
                            _years[yearIndex]['months'] = [...months];
                        } else {
                            months.forEach((month, monthIndex) => {
                                let foundMonth = false;

                                if (!foundYear) {
                                    foundMonth = this.searchStringExists(searchResult, 2, month.searchString);
                                    _years[yearIndex]['months'][monthIndex]['match'] = _years[yearIndex]['months'][monthIndex]['state'] = (foundMonth) ? 1 : 0;
                                }
                                
                                if (showWeeks === true) {
                                    let weeks = month['weeks'];

                                    if (foundMonth || (maxLevel === 3 && searchResult.length === weeks.length)) {
                                        _years[yearIndex]['state'] = 1;
                                        _years[yearIndex]['months'][monthIndex]['state'] = 1;
                                        // _years[yearIndex]['months'][monthIndex]['showChild'] = true;
                                        let newWeeks = JSON.stringify(weeks).replace(stateRegEx, '"state":1').replace(matchRegEx, '"match":1');
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
                                                    _years[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['match'] = _years[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] = (foundWeek) ? 1 : 0;
                                                }

                                                let newDays = JSON.stringify(week['days']).replace(stateRegExOne, '"state":0');
                                                let days = [...JSON.parse(newDays)];

                                                if (foundWeek) {
                                                    _years[yearIndex]['state'] = 1;
                                                    _years[yearIndex]['months'][monthIndex]['state'] = 1;

                                                    let newDays = JSON.stringify(days).replace(stateRegEx, '"state":1').replace(matchRegEx, '"match":1');
                                                    _years[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['days'] = [...JSON.parse(newDays)];
                                                } else {
                                                    if (maxLevel === 3) {
                                                        _years[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['days'] = [...days];
                                                    } else {
                                                        days.forEach((day, dayIndex) => {
                                                            let foundDay = false;
                                                            if (!foundWeek) {
                                                                foundDay = this.searchStringExists(searchResult, 4, day.date);

                                                                
                                                                _years[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['days'][dayIndex]['match'] = _years[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['days'][dayIndex]['state'] = (foundDay) ? 1 : 0;

                                                            }

                                                            if (dayIndex >= days.length - 1 && !foundYear && !foundMonth && !foundWeek) {
                                                                let updatedDays = _years[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['days'];
                                                                let sum = updatedDays.reduce((a, b) => +a + +b.state, 0);
                                                                
                                                                _years[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] = (sum === updatedDays.length) ? 1 : (sum === 0) ? _years[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] : -1;
                                                            }
                                                        });

                                                        let matchDays = _years[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['days'];
                                                        let isMathcOne = JSON.stringify(matchDays).match(matchRegExOne);
                                                        _years[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['match'] = (isMathcOne === null)? 0 : 1;
                                                    }
                                                }

                                                if (weekIndex >= weeks.length - 1 && !foundYear && !foundMonth) {
                                                    let sum = weeks.reduce((a, b) => +a + +b.state, 0);
                                                    let isPartial = weeks.some(checkPartialState);

                                                    _years[yearIndex]['months'][monthIndex]['state'] = (sum === weeks.length) ? 1 : (sum === 0 && !isPartial) ? _years[yearIndex]['months'][monthIndex]['state'] : -1;
                                                }
                                            });

                                            let matchWeeks = _years[yearIndex]['months'][monthIndex]['weeks'];
                                            let isMathcOne = JSON.stringify(matchWeeks).match(matchRegExOne);
                                            
                                            _years[yearIndex]['months'][monthIndex]['match'] = (isMathcOne === null)? 0 : 1;
                                        }
                                    }
                                } else {
                                    let days = month['days'];

                                    if (foundMonth || (maxLevel === 3 && searchResult.length === days.length)) {
                                        let newDays = JSON.stringify(days).replace(stateRegEx, '"state":1').replace(matchRegEx, '"match":1');
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

                                                    _years[yearIndex]['months'][monthIndex]['days'][dayIndex]['match'] = _years[yearIndex]['months'][monthIndex]['days'][dayIndex]['state'] = (foundDay) ? 1 : 0;
                                                   
                                                }

                                                if (dayIndex >= days.length - 1 && !foundYear && !foundMonth) {
                                                    let updatedDays = _years[yearIndex]['months'][monthIndex]['days'];
                                                    let sum = updatedDays.reduce((a, b) => +a + +b.state, 0);
                                                    
                                                    _years[yearIndex]['months'][monthIndex]['state'] = (sum === updatedDays.length) ? 1 : (sum === 0) ? _years[yearIndex]['months'][monthIndex]['state'] : -1;
                                                }
                                            });
                                            let matchDays = _years[yearIndex]['months'][monthIndex]['days'];
                                            let isMathcOne = JSON.stringify(matchDays).match(matchRegExOne);
                                            
                                            _years[yearIndex]['months'][monthIndex]['match'] = (isMathcOne === null)? 0 : 1;
                                        }
                                    }
                                }

                                if (monthIndex >= months.length - 1 && !foundYear) {
                                    let sum = months.reduce((a, b) => +a + +b.state, 0);
                                    _years[yearIndex]['state'] = (sum === 12) ? 1 : (sum === 0) ? _years[yearIndex]['state'] : -1;
                                }
                                
                            });

                            let matchMonths = _years[yearIndex]['months'];
                            let isMathcOne = JSON.stringify(matchMonths).match(matchRegExOne);
                            
                            _years[yearIndex]['match'] = (isMathcOne === null)? 0 : 1;
                        }
                    }
                }
            });

            this.setState({
                filteredYears: [..._years],
                searchValue: searchValue
            });

            this.props.onFilteredDataChange(_years);
        } else {
            this.setState({
                filteredYears: [..._years],
                searchValue: searchValue
            });
            this.props.onFilteredDataChange(_years);
        }
    }

    updateSelectAllCheckboxHandler = (years) => {
        this.props.onUpdateSelectAllCheckbox([...years])
    }

    onChangeQuarterHandler = (quarterObj) => {
        let years = [...this.getYears()];
        let { showWeeks } = this.props.options;
        quarterChangeCallback(years, showWeeks, quarterObj, (years) => {
            this.setState({
                filteredYears: [...years]
            })
        });

        // this.props.onChangeQuarter(quarterObj);
    }

    onChangeMonthHandler = (monthObj) => {
        console.log('I am here: Line 508, filterView.js');
        let years = [...this.getYears()];
        let { showWeeks, showQuarters } = this.props.options;
        monthChangeCallback(years, showWeeks, showQuarters, monthObj, (years) => {
            this.setState({
                filteredYears: [...years]
            })
        });

        // this.props.onChangeMonth(monthObj);
    }

    onChangeWeekHandler = (weekObj) => {
        let years = [...this.getYears()];
        let { showQuarters } = this.props.options;
        weekChangeCallback(years, showQuarters, weekObj, (years) => {
            this.setState({
                filteredYears: [...years]
            })
        });

        // this.props.onChangeWeek(weekObj);
    }

    onChangeDayHandler = (dayObj) => {
        let years = [...this.getYears()];
        let { showQuarters } = this.props.options;
        dayChangeCallback(years, showQuarters, dayObj, (years) => {
            this.setState({
                filteredYears: [...years]
            })
        });

        // this.props.onChangeDay(dayObj);
    }

    onChangeWeekDayHandler = (weekDaysObj) => {
        let years = [...this.getYears()];
        let { showQuarters } = this.props.options;
        weekDayChangeCallback(years, showQuarters, weekDaysObj, (years) => {
            this.setState({
                filteredYears: [...years]
            })
        });

        // this.props.onChangeWeekDay(weekDaysObj);
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