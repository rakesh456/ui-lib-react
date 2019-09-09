

import React from "react";
import { Input } from 'reactstrap';
import '../date-picker.css';
import { FaCalendar } from 'react-icons/lib/fa';
import {
    getDateDDMMYYYY, getDateByFormatDDMMYYYY
} from "../../../utils/utils";

class DateInput extends React.PureComponent {
    constructor(props) {
        super(props);
        const options=this.props.options;
        this.state = { date: getDateByFormatDDMMYYYY(new Date(), options.displayFormat) };
    }

    componentDidMount() {
        const options=this.props.options;
        this.setState({
            date: getDateByFormatDDMMYYYY(this.props.value, options.displayFormat),
        });
    }

    componentDidUpdate(prevProps) {
        const options=this.props.options;
        this.setState({
            date: this.props.value
        });
    }

    handleChange(name, e) {
        var change = {};
        change[name] = e.target.value;
        this.setState(change);
    }

    getIconAlignClass() {
        const options = this.props.options;
        return (options && options.iconAlignment === 'Left') ? 'VS-PullLeft VS-MrgT5' : 'VS-PullRight VS-MrgT5';
    }

    getDateAlignClass() {
        const options = this.props.options;
        return (options && options.dateStringAlignment === 'Right') ? 'VS-PullRight VS-TextRight' : 'VS-PullLeft VS-TextLeft';
    }

    gotoDate = date => evt => {
        evt && evt.preventDefault();
        const { date } = this.state;
        const { onBlur } = this.props;

        (date) &&
            this.setState(this.state.date, () => {
                typeof onBlur === "function" && onBlur(date);
            });
    }

    render() {
        const disable = (this.props.options && this.props.options.disable === true);
        return (
            <div className={`VS-Input-Border ${(disable) ? 'VS-Disabled' : ''}`}>
                <span className={this.getIconAlignClass()}><FaCalendar className="VS-Shape VS-TextDark VS-CalenderIcon" /></span>
                <Input type="text"
                    disabled={disable}
                    value={this.state.date}
                    className={`VS-Regular-UPPER-Case VS-Calendar-Input ${this.getDateAlignClass()}`}
                    placeholder="MM/DD/YYYY"
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
                    onChange={this.handleChange.bind(this, this.state.date)}
                />
            </div>
        );
    }
}

export default DateInput;

