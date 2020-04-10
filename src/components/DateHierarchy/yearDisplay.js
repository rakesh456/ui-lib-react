import React from "react";

import QuarterView from "./quarterView";
import MonthView from "./monthView";
const checkZeroState = obj => obj.state === 0;
const checkOneState = obj => obj.state === 1;

class YearDisplay extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getYears() {
        return this.props.years;
    }

    componentDidMount() {
        let years = [...this.getYears()];
        this.setState({ years: [...years] });
    }

    onInput = () => {
        if(this.props.onInput){
            this.props.onInput();
        }
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
        let flag = (isCheck)? 1 : 0;
        year["state"] = flag;

        let { isFilterView } = this.props;
        if(isFilterView === true){

            if (showQuarters === true) {
                let quarters = year['quarters'];
                quarters.forEach((quarter, index) => {
                    quarters[index]['months'].forEach((month, index1) => {
                        if (showWeeks === true) {
                            quarters[index]['months'][index1]['weeks'].forEach((week, index2) => {
                                let days = quarters[index]['months'][index1]['weeks'][index2]['days'];

                                if (days) {

                                    days.forEach((element, index3) => {
                                        quarters[index]['months'][index1]['weeks'][index2]['days'][index3]['state'] = (flag === 0)? 0 : (days[index3]['match'] === 1)? flag : 0;
                                    });

                                    days = quarters[index]['months'][index1]['weeks'][index2]['days'];

                                    let daysum = days.reduce((a, b) => +a + +b.state, 0);
                                    let isZero = days.some(checkZeroState);
                                    let isOne = days.some(checkOneState);

                                    quarters[index]['months'][index1]['weeks'][index2]['state'] = (flag === 0)? 0 : (isZero && isOne) ? -1 : (daysum === week.days.length) ? 1 : ((week.match === 1) ? flag : 0);
                                }
                            });

                            let weeks = quarters[index]['months'][index1]['weeks'];

                            let weeksum = weeks.reduce((a, b) => +a + +b.state, 0);
                            let isZero = weeks.some(checkZeroState);
                            let isOne = weeks.some(checkOneState);

                            
                            quarters[index]['months'][index1]['state'] = (flag === 0)? 0 : (isZero && isOne) ? -1 : (weeksum === month.weeks.length) ? 1 : ((month.match === 1) ? flag : 0);
                        } else {
                            quarters[index]['months'][index1]['days'].forEach((element, index2) => {
                                quarters[index]['months'][index1]['days'][index2]['state'] = (flag === 0)? 0 : (quarters[index]['months'][index1]['days'][index2]['match'] === 1)? flag : 0;
                            });

                            let days = quarters[index]['months'][index1]['days'];

                            let daysum = days.reduce((a, b) => +a + +b.state, 0);
                            let isZero = days.some(checkZeroState);
                            let isOne = days.some(checkOneState);

                            quarters[index]['months'][index1]['state'] = (flag === 0)? 0 : (isZero && isOne) ? -1 : (daysum === month.days.length) ? 1 : ((month.match === 1) ? flag : 0);
                        }
                    });

                    let months = quarters[index]['months'];

                    let monthsum = months.reduce((a, b) => +a + +b.state, 0);
                    let isZero = months.some(checkZeroState);
                    let isOne = months.some(checkOneState);

                    quarters[index]['state'] = (flag === 0)? 0 : (isZero && isOne) ? -1 : (monthsum === quarter.months.length) ? 1 : ((quarter.match === 1) ? flag : 0);
                });
            }
            else {
                let months = year['months'];
                months.forEach((month, index) => {
                    if (showWeeks === true) {
                        months[index]['weeks'].forEach((week, index1) => {
                            if (months[index]['weeks'][index1]['days']) {
                                let days = months[index]['weeks'][index1]['days'];

                                if (days) {
                                    months[index]['weeks'][index1]['days'].forEach((day, index2) => {
                                        months[index]['weeks'][index1]['days'][index2]['state'] = (flag === 0)? 0 : (months[index]['weeks'][index1]['days'][index2]['match']  === 1)? flag : 0;
                                    });

                                    days = months[index]['weeks'][index1]['days'];

                                    let daysum = days.reduce((a, b) => +a + +b.state, 0);
                                    let isZero = days.some(checkZeroState);
                                    let isOne = days.some(checkOneState);
                                    months[index]['weeks'][index1]['state'] = (flag === 0)? 0 : (isZero && isOne) ? -1 : (daysum === week.days.length) ? 1 : ((week.match === 1) ? flag : 0);
                                }
                            }
                        });

                        let weeks = months[index]['weeks'];

                        let weeksum = weeks.reduce((a, b) => +a + +b.state, 0);
                        let isZero = weeks.some(checkZeroState);
                        let isOne = weeks.some(checkOneState);

                        months[index]['state'] = (flag === 0)? 0 : (isZero && isOne) ? -1 : (weeksum === month.weeks.length) ? 1 : ((month.match === 1) ? flag : 0);
                    } else {
                        months[index]['days'].forEach((month, index1) => {
                            months[index]['days'][index1]['state'] = (flag === 0)? 0 : (months[index]['days'][index1]['mathc'] === 1)? flag : 0;
                        });

                        let days = months[index]['days'];

                        let daysum = days.reduce((a, b) => +a + +b.state, 0);
                        let isZero = days.some(checkZeroState);
                        let isOne = days.some(checkOneState);

                        months[index]['state'] = (flag === 0)? 0 : (isZero && isOne) ? -1 : (daysum === month.days.length) ? 1 : ((month.match === 1) ? flag : 0);
                    }
                });
            }
            this.setState({
                years: [...years]
            })
            this.props.onUpdateSelectAllCheckbox([...years], year);

        } else {

            if (showQuarters === true) {
                let quarters = year['quarters'];
                quarters.forEach((element, index) => {
                    quarters[index]['state'] = flag;
                    quarters[index]['months'].forEach((element, index1) => {
                        quarters[index]['months'][index1]['state'] = flag;
                        if (showWeeks === true) {
                            quarters[index]['months'][index1]['weeks'].forEach((element, index2) => {
                                quarters[index]['months'][index1]['weeks'][index2]['state'] = flag;
                                if (quarters[index]['months'][index1]['weeks'][index2]['days']) {
                                    quarters[index]['months'][index1]['weeks'][index2]['days'].forEach((element, index3) => {
                                        quarters[index]['months'][index1]['weeks'][index2]['days'][index3]['state'] = flag;
                                    });
                                }
                            });
                        } else {
                            quarters[index]['months'][index1]['days'].forEach((element, index2) => {
                                quarters[index]['months'][index1]['days'][index2]['state'] = flag;
                            });
                        }
                    });
                });
            }
            else {
                let months = year['months'];
                months.forEach((element, index) => {
                    months[index]['state'] = flag;
                    if (showWeeks === true) {
                        months[index]['weeks'].forEach((element, index1) => {
                            months[index]['weeks'][index1]['state'] = flag;
                            if (months[index]['weeks'][index1]['days']) {
                                months[index]['weeks'][index1]['days'].forEach((element, index2) => {
                                    months[index]['weeks'][index1]['days'][index2]['state'] = flag;
                                });
                            }
                        });
                    } else {
                        months[index]['days'].forEach((element, index1) => {
                            months[index]['days'][index1]['state'] = flag;
                        });
                    }
                });
            }
            this.setState({
                years: [...years]
            })
            this.props.onUpdateSelectAllCheckbox([...years], year);
            this.props.onChangeYear();
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

    getYearCheckBoxClass = (year, index) => {
        let flag = false;
        const _years = [...this.getYears()];
        flag = (_years[index]["state"] === -1) ? true : false;
        return (flag) ? 'VS-Check-Checkmark VS-Check-Partial' : 'VS-Check-Checkmark';
    }

    getLabelContainerClass = (year) => {
        return (year.showChild === true)? "VS-Checkbox-Container VS-ShowChild-Checkbox" : "VS-Checkbox-Container";
    }

    renderYear = (year, index) => {
        let { options, isSearching, years, filteredYears, isFilterView } = this.props;
        const _years = (isSearching === true) ? [...filteredYears] : [...years];

        if ((isFilterView === true && year.match === 0) || (options.showQuarters === true && year.quarters.length <= 0) || (options.showQuarters === false && year.months.length <= 0)) {
            return ("")
        } else {
            return (
                <div className="VS-YearRow" key={'year' + index} >
                    {
                        (year.showChild) ?
                            <span className="VS-Year-Plus-Minus" onClick={() => this.toggleYearChild(year, false)}><span className="VS-ExpandCollapseSign">-</span></span> :
                            <span className="VS-Year-Plus-Minus" onClick={() => this.toggleYearChild(year, true)}><span className="VS-ExpandCollapse">+</span></span>
                    }
                    <label className={this.getLabelContainerClass(year)} key={'year' + index}>{year.year}
                        {
                            (year.state) ?
                                <input onInput={this.onInput} className="VS-Checkbox" type="checkbox" checked={year.state} onChange={() => this.toggleYearCheck(year, false)}></input> :
                                <input onInput={this.onInput} className="VS-Checkbox" type="checkbox" checked={year.state} onChange={() => this.toggleYearCheck(year, true)}></input>
                        }
                        <span className={this.getYearCheckBoxClass(year, index)} ></span>
                        {
                            (year.hasDisabled) ? (year.quarters) ?
                                <div className="VS-Tooltip"><span className="VS-HasDisabledDot">
                                </span>
                                    <span className="VS-TooltiptextLarge">Few Quarters in this Year are disabled</span>
                                </div> :
                                <div className="VS-Tooltip"><span className="VS-HasDisabledDot">
                                </span>
                                    <span className="VS-TooltiptextLarge">Few Months in this Year are disabled</span>
                                </div> : ""
                        }

                    </label>
                    {
                        (year.showChild && year.quarters) ?
                            <QuarterView options={options} isFilterView={isFilterView} years={_years} year={year} onChangeQuarter={this.onChangeQuarterHandler} onChangeMonth={this.onChangeMonthHandler} onChangeDay={this.onChangeDayHandler} onChangeWeek={this.onChangeWeekHandler} onChangeWeekDay={this.onChangeWeekDayHandler}></QuarterView> : (year.showChild && year.months) ?
                                <MonthView isFilterView={isFilterView} options={options} years={_years} year={year} onChangeMonth={this.onChangeMonthHandler} onChangeDay={this.onChangeDayHandler} onChangeWeek={this.onChangeWeekHandler} onChangeWeekDay={this.onChangeWeekDayHandler}></MonthView> : ''
                    }
                </div>
            )
        }
    }

    getSeachIconAlignClass() {
        return 'VS-PullLeft VS-SeachIcon';
    }

    getInputClass() {
        const { isSearching } = this.state;
        return (isSearching === true) ? 'VS-SearchBox VS-IsSearching' : 'VS-SearchBox';
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

    renderAllYears = (years) => {
        let yearHtml = [];
        years.forEach((year, index) => {
            yearHtml.push(this.renderYear(year, index));
        });
        return yearHtml;
    }

    render() {
        const { options, years } = this.props;
        return (
            <div options={options}>
                <div>
                    {/* {this.renderAllYears(years)} */}
                    {(years)?years.map((year, index) => this.renderYear(year, index)):''}
                </div>
            </div>
        )
    }
}
export default YearDisplay;