import React from "react";
import {
    getSelectedMonth,
    getSelectedYear,
    getYYYYForLowerLimit,
    getYYYYForUpperLimit,
    getMonthIndex
} from "../../../utils/calendar";
import {
    isUndefinedOrNull
} from "../../../utils/utils";
import MonthsView from "./months-view";
import QuartersView from "./quarter-view";
import YearsView from "./years-view";

class Year extends React.PureComponent {
    constructor(props) {
        super(props);
        const { options } = this.props;
        const { lowerMonthLimit, lowerYearLimit } = getYYYYForLowerLimit(options);
        const { upperMonthLimit, upperYearLimit } = getYYYYForUpperLimit(options);
        let year = new Date().getFullYear();
        year = parseInt(year);


        this.state = { year: year, isYearSelected: false, currentDateMMMQQ: "", selectedYear: "", isDisabledPrev: ((year - 11) < lowerYearLimit) ? true : false, isDisabledNext: ((year + 1) >= upperYearLimit) ? true : false, upperYearLimit: upperYearLimit, lowerYearLimit: lowerYearLimit, lowerMonthLimit: lowerMonthLimit, upperMonthLimit: upperMonthLimit };

    }

    componentDidMount() {
        const { selectedValue, options } = this.props;
        const selectedYear = getSelectedYear(selectedValue);
        if (selectedValue) {
            if (options.displayFormat === 'YYYY') {
                this.setState({
                    selectedYear: selectedValue,
                    year: selectedValue
                });
            } else {
                this.setState({
                    currentDateMMMQQ: getSelectedMonth(selectedValue),
                    selectedYear: selectedYear,
                    year: selectedYear,
                    isYearSelected: (!isUndefinedOrNull(selectedYear)) ? true : false
                })
            }
        }
        this.updateNextPrev();
    }

    componentDidUpdate(prevProps) {
        this.updateNextPrev();
    }

    updateNextPrev() {
        const { options } = this.props;
        const { lowerMonthLimit, lowerYearLimit } = getYYYYForLowerLimit(options);
        const { upperMonthLimit, upperYearLimit } = getYYYYForUpperLimit(options);
        let { year } = this.state;
        year = parseInt(year);

        this.setState({ isDisabledNext: ((year + 1) >= upperYearLimit) ? true : false, isDisabledPrev: ((year - 11) < lowerYearLimit) ? true : false, upperYearLimit: upperYearLimit, lowerYearLimit: lowerYearLimit, lowerMonthLimit: lowerMonthLimit, upperMonthLimit: upperMonthLimit });
    }

    onSelectYearHandler = (year) => {
        this.setState({
            isYearSelected: true,
            year: year
        });

        const options = this.props.options;
        if (options.displayFormat === 'YYYY') {
            this.props.onYearSelect(year.toString());
        }
    }

    onSelectMonthHandler = (month) => {
        this.setState({
            isYearSelected: true
        });

        this.props.onYearSelect(getMonthIndex(month) + '/' + this.state.year);
    }

    onSelectQuarterHandler = (quarter) => {
        this.setState({
            isYearSelected: true
        });

        this.props.onYearSelect(quarter + '/' + this.state.year);
    }

    onGoToSelectYearHandler = () => {
        this.setState({
            isYearSelected: false
        });
    }

    goToNextYearHandler = () => {
        const { year } = this.state;
        const currentDateYear = parseInt(year) + 1;

        this.setState({
            year: parseInt(currentDateYear)
        });
    }

    goToPrevYearHandler = () => {
        const { year } = this.state;
        const currentDateYear = year - 1;

        this.setState({
            year: parseInt(currentDateYear)
        });
    }

    render() {
        const { year, isYearSelected, currentDateMMMQQ } = this.state;
        const { selectedValue, options } = this.props;
        const isQuarter = (options.displayFormat === 'QQ/YYYY');
        return (
            <div>
                {
                    (year && !isYearSelected) ?
                        <YearsView options={options} style={this.props.style} onSelectYear={this.onSelectYearHandler} selectedValue={selectedValue}></YearsView>
                        :
                        (isQuarter) ?
                            <QuartersView options={options} currentDateMMMQQ={currentDateMMMQQ} currentDateYear={year} style={this.props.style} showHeaderSelection={true} goToSelectYear={this.onGoToSelectYearHandler} onSelectQuarter={this.onSelectQuarterHandler} goToPrevYear={this.goToPrevYearHandler} goToNextYear={this.goToNextYearHandler}></QuartersView>
                            :
                            <MonthsView options={options} currentDateMMMQQ={currentDateMMMQQ} currentDateYear={year} style={this.props.style} showHeaderSelection={true} goToSelectYear={this.onGoToSelectYearHandler} onSelectMonth={this.onSelectMonthHandler} goToPrevYear={this.goToPrevYearHandler} goToNextYear={this.goToNextYearHandler}></MonthsView>
                }
            </div>
        );
    }
}

export default Year;