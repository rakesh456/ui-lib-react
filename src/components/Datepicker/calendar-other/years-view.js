import React, { Fragment } from "react";
import { FaCaretLeft, FaCaretRight } from 'react-icons/lib/fa';
import {
    CURRENT_YEAR,
    isEqual,
    getYearsList,
    getSelectedYear,
    getYYYYForLowerLimit,
    getYYYYForUpperLimit,
} from "../../../utils/calendar";

import {
    guid,
    splitArray
} from "../../../utils/utils";

class YearsView extends React.PureComponent {
    constructor(props) {
        super(props);
        const { options, showHeaderSelection } = this.props;
        
        const { lowerYearLimit } = getYYYYForLowerLimit(options);
        const { upperYearLimit } = getYYYYForUpperLimit(options);
        var year = new Date().getFullYear();
        year = parseInt(year);
        
        this.state = { year: year, isDisabledPrev: ((year - 7) < lowerYearLimit) ? true : false, isDisabledNext: ((year + 5) >= upperYearLimit)? true : false, showHeaderSelection: (showHeaderSelection === true)};
    }
    
    componentDidMount() {
        const { selectedValue, options } = this.props;
        if (selectedValue) {
            if (options.displayFormat === 'YYYY' || options.displayFormat === 'DD/MM/YYYY' || options.displayFormat === 'MM/DD/YYYY') {
                this.setState({
                    selectedYear: selectedValue,
                    year: selectedValue
                });
            } else {
                const _selectedYear = getSelectedYear(selectedValue);
                this.setState({
                    selectedYear: _selectedYear,
                    year: _selectedYear
                })
            }
        }
    }

    componentDidUpdate(prevProps) {
        this.updateNextPrev();
    }

    updateNextPrev() {
        const { options } = this.props;
        const { lowerYearLimit } = getYYYYForLowerLimit(options);
        const { upperYearLimit } = getYYYYForUpperLimit(options);
        var { year } = this.state;
        year = parseInt(year);

        this.setState({ isDisabledNext: ((year + 5) >= upperYearLimit) ? true : false, isDisabledPrev: ((year - 7) < lowerYearLimit) ? true : false, upperYearLimit: upperYearLimit, lowerYearLimit: lowerYearLimit });
    }
    
    getYears = () => {
        const { year } = this.state;
        const _array = getYearsList(year);
        return splitArray(_array, 3);
    }
    
    onSelectYearHandler = (year) => {
        this.props.onSelectYear(year);
    }
    
    goToNextYear = () => {
        this.setState({
            year: parseInt(this.state.year) + 12
        });
    }

    goToPrevYear = () => {
        this.setState({
            year: parseInt(this.state.year) - 12
        });
    }

    getCalendarYearClass = () => {
        return "VS-CalendarContainer VS-modal VS-shape-rounded-fill-for-year";
    }
    
    checkYearIsEnabled = (year) => {
        const {disabledList} = this.props.options;

        return (disabledList && disabledList.length > 0 && year)? ((disabledList.indexOf(year.toString()) !== -1)? false : true) : true;
    }

    renderYearValue = (year, index) => {
        const activeClass = (isEqual(this.state.selectedYear, year)) ? 'VS-Active' : '';
        const { lowerYearLimit, upperYearLimit } = this.state;
        const isEnabled = this.checkYearIsEnabled(year);

        return (
            <Fragment key={guid()}>
                {
                    ((lowerYearLimit && lowerYearLimit > year) || (upperYearLimit && upperYearLimit < year) || (!isEnabled)) ?
                        <span className={`${activeClass} VS-Year VS-Disabled`} >{year}</span> :
                        <span className={`${activeClass} VS-Year`} onClick={() => this.onSelectYearHandler(year)}>{year}</span>
                }
            </Fragment>
        );
    }

    renderYearRow = (years, index) => {
        const rows = years.map((date, index1) => {
            return this.renderYearValue(date, index1)
        });

        return (
            <div className="VS-DateRow" key={guid()}>{rows}</div>
        )
    }

    render() {
        const { isDisabledPrev, isDisabledNext, showHeaderSelection } = this.state;
        const currentDateYear = (this.props.currentDateYear)? this.props.currentDateYear : CURRENT_YEAR;
        return (
            <div className={this.getCalendarYearClass()} style={this.props.style}>
                <Fragment>
                    <div className="VS-CalendarMonth VS-TextCenter">
                        {
                            (isDisabledPrev) ?
                                <FaCaretLeft className="VS-PullLeft VS-Icon Vs-DisabledIcon" /> :
                                <FaCaretLeft className="VS-PullLeft VS-Icon" onClick={this.goToPrevYear} />
                        }
                        {
                            (showHeaderSelection)? 
                            <span className="VS-Medium-UPPER-Case VS-MonthName">{currentDateYear}</span> : ''
                        }
                        {
                            (isDisabledNext) ?
                                <FaCaretRight className="VS-PullRight VS-Icon Vs-DisabledIcon" /> :
                                <FaCaretRight className="VS-PullRight VS-Icon" onClick={this.goToNextYear} />
                        }
                    </div>
                    {this.getYears().map((row, index) => this.renderYearRow(row, index))}
                </Fragment>
            </div>
        );
    }
}

export default YearsView;