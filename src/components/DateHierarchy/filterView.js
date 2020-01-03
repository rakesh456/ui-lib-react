import React from "react";
import { getSearchObj } from "../../utils/datehierarchyutils";
import { isUndefinedOrNull } from "../../utils/utils";
import YearDisplay from "./yearDisplay";

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
        let years = [...this.getYears()];
        this.setState({ years: [...years] });
    }

    componentDidUpdate(prevProps, next) {
        if (prevProps.searchValue !== this.props.searchValue || isUndefinedOrNull(this.state.searchValue)) {
            this.onSearchValueChangeHandler(this.props.searchValue);
        }
    }

    itemExists(arr, level, index) {
        return (arr.filter(item=> (item.level === level && item.index === index))).length >= 1;
    }
    
    searchStringExists(arr, level, searchKey) {
        return (arr.filter(item=> (item.level === level && item.searchKey === (searchKey).toString()))).length >= 1;
    }

    onSearchValueChangeHandler(searchValue) {
        searchValue = (searchValue) ? searchValue.toLowerCase() : '';
        let { searchObj } = this.state;
        let { listOfYears } = this.props;
        let { showWeeks, showQuarters } = this.props.options;
        let _years = listOfYears.map(a => Object.assign({}, a));

        if (!isUndefinedOrNull(searchValue)) {

            let searchResult = searchObj.filter(searchElement => (searchElement.searchKey.includes(searchValue)));
            searchResult.sort((a, b) => {
                if (a.level > b.level) return -1
                return a.level < b.level ? 1 : 0
            })

            _years.forEach((year, yearIndex) => {
                const foundYear = this.itemExists(searchResult, 1, yearIndex);
                _years[yearIndex]['state'] = (foundYear)? 1 : 0;
                _years[yearIndex]['showChild'] = true;

                if(showQuarters === true){
                    let quarters = year['quarters'];

                    quarters.forEach((quarter, quarterIndex) => {
                        let foundQuarter = false;
                        if(foundYear){
                            _years[yearIndex]['quarters'][quarterIndex]['state'] = 1;
                        } else {
                            foundQuarter = this.itemExists(searchResult, 2, quarterIndex);
                            _years[yearIndex]['quarters'][quarterIndex]['state'] = (foundQuarter)? 1 : 0;
                        }

                        let months = quarter['months'];
                        
                        months.forEach((month, monthIndex) => {
                            let foundMonth = false;
                            if(foundYear || foundQuarter){
                                _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state'] = 1;
                            } else {
                                foundMonth = this.searchStringExists(searchResult, 3, month.searchString);
                                _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state'] = (foundMonth)? 1 : 0;
                            }
                            
                            if(showWeeks === true){
                                let weeks = month['weeks'];
                                weeks.forEach((week, weekIndex) => {
                                    let foundWeek = false;
                                    if(foundYear || foundQuarter || foundMonth){
                                        _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] = 1;
                                    } else {
                                        foundWeek = this.itemExists(searchResult, 4, weekIndex);
                                        _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] = (foundWeek)? 1 : 0;
                                    }

                                    let days = week['days'];
                                    days.forEach((day, dayIndex) => {
                                        let foundDay = false;
                                        if(foundYear || foundQuarter || foundMonth || foundWeek){
                                            _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['days'][dayIndex]['state'] = 1;
                                        } else {
                                            foundDay = this.searchStringExists(searchResult, 5, day.date);
                                            _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['days'][dayIndex]['state'] = (foundDay)? 1 : 0;
                                        }

                                        if(dayIndex >= days.length - 1 && !foundYear && !foundQuarter && !foundMonth && !foundWeek){
                                            let sum = days.reduce((a, b) => +a + +b.state, 0);
                                            _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] = (sum === days.length)? 1 : (sum === 0)? _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] : -1;
                                        }
                                    });

                                    if(weekIndex >= weeks.length - 1 && !foundYear && !foundQuarter && !foundMonth){
                                        let sum = weeks.reduce((a, b) => +a + +b.state, 0);
                                        _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state'] = (sum === weeks.length)? 1 : (sum === 0)? _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state'] : -1;
                                    }
                                });
                            } else {
                                let days = month['days'];
                                days.forEach((day, dayIndex) => {
                                    let foundDay = false;
                                    if(foundYear || foundQuarter || foundMonth){
                                        _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['days'][dayIndex]['state']= 1;
                                    } else {
                                        foundDay = this.itemExists(searchResult, 4, dayIndex);
                                        _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['days'][dayIndex]['state'] = (foundDay)? 1 : 0;
                                    }

                                    if(dayIndex >= days.length - 1 && !foundYear && !foundQuarter && !foundMonth){
                                        let sum = days.reduce((a, b) => +a + +b.state, 0);
                                        _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state'] = (sum === days.length)? 1 : (sum === 0)? _years[yearIndex]['quarters'][quarterIndex]['months'][monthIndex]['state'] : -1;
                                    }
                                });
                            }

                            if(monthIndex >= months.length - 1 && !foundYear && !foundQuarter){
                                let sum = months.reduce((a, b) => +a + +b.state, 0);
                                _years[yearIndex]['quarters'][quarterIndex]['state'] = (sum === 3)? 1 : (sum === 0)? _years[yearIndex]['quarters'][quarterIndex]['state'] : -1;
                            }
                        });

                        if(quarterIndex >= quarters.length - 1 && !foundYear){
                            let sum = quarters.reduce((a, b) => +a + +b.state, 0);
                            _years[yearIndex]['state'] = (sum === 4)? 1 : (sum === 0)? _years[yearIndex]['state'] : -1;
                        }
                    });

                } else {
                    let months = year['months'];
                    months.forEach((month, monthIndex) => {
                        let foundMonth = false;

                        if(foundYear){
                            _years[yearIndex]['months'][monthIndex]['state'] = 1;
                        } else {
                            foundMonth = this.searchStringExists(searchResult, 2, month.searchString);
                            _years[yearIndex]['months'][monthIndex]['state'] = (foundMonth)? 1 : 0;
                        }
                        
                        if(showWeeks === true){
                            let weeks = month['weeks'];
                            weeks.forEach((week, weekIndex) => {
                                let foundWeek = false;
                                if(foundYear || foundMonth){
                                    _years[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] = 1;
                                } else {
                                    foundWeek = this.itemExists(searchResult, 3, weekIndex);
                                    _years[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] = (foundWeek)? 1 : 0;
                                }

                                let days = week['days'];
                                days.forEach((day, dayIndex) => {
                                    let foundDay = false;
                                    if(foundYear || foundMonth || foundWeek){
                                        _years[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['days'][dayIndex]['state'] = 1;
                                    } else {
                                        foundDay = this.searchStringExists(searchResult, 4, day.date);
                                        _years[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['days'][dayIndex]['state'] = (foundDay)? 1 : 0;
                                    }

                                    if(dayIndex >= days.length - 1 && !foundYear && !foundMonth && !foundWeek){
                                        let sum = days.reduce((a, b) => +a + +b.state, 0);
                                        _years[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] = (sum === days.length)? 1 : (sum === 0)? _years[yearIndex]['months'][monthIndex]['weeks'][weekIndex]['state'] : -1;
                                    }
                                });

                                if(weekIndex >= weeks.length - 1 && !foundYear && !foundMonth){
                                    let sum = weeks.reduce((a, b) => +a + +b.state, 0);
                                    _years[yearIndex]['months'][monthIndex]['state'] = (sum === weeks.length)? 1 : (sum === 0)? _years[yearIndex]['months'][monthIndex]['state'] : -1;
                                }

                            });
                        } else {
                            let days = month['days'];
                            days.forEach((day, dayIndex) => {
                                let foundDay = false;
                                if(foundYear || foundMonth){
                                    _years[yearIndex]['months'][monthIndex]['days'][dayIndex]['state']= 1;
                                } else {
                                    foundDay = this.itemExists(searchResult, 3, dayIndex);
                                    _years[yearIndex]['months'][monthIndex]['days'][dayIndex]['state'] = (foundDay)? 1 : 0;
                                }

                                if(dayIndex >= days.length - 1 && !foundYear && !foundMonth){
                                    let sum = days.reduce((a, b) => +a + +b.state, 0);
                                    _years[yearIndex]['months'][monthIndex]['state'] = (sum === days.length)? 1 : (sum === 0)? _years[yearIndex]['months'][monthIndex]['state'] : -1;
                                }
                            });
                        }

                        if(monthIndex >= months.length - 1 && !foundYear){
                            let sum = months.reduce((a, b) => +a + +b.state, 0);
                            _years[yearIndex]['state'] = (sum === 12)? 1 : (sum === 0)? _years[yearIndex]['state'] : -1;
                        }
                    });
                }
            });

            console.log(_years, '_years ');

            this.setState({
                filteredYears: _years,
                searchValue: searchValue
            });
        } else {
            this.setState({
                filteredYears: _years,
                searchValue: searchValue
            });
        }
    }

    onChangeQuarterHandler = (quarterObj) => {
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
                <YearDisplay options={options} isFilterView={true} years={filteredYears} onChangeQuarter={this.onChangeQuarterHandler} onChangeMonth={this.onChangeMonthHandler} onChangeDay={this.onChangeDayHandler} onChangeWeek={this.onChangeWeekHandler} onChangeWeekDay={this.onChangeWeekDayHandler}></YearDisplay>
            </div>
        )
    }
}
export default FilterView;