

import React from "react";
import { Input } from 'reactstrap';
import '../date-picker.css';
import { FaCalendar } from 'react-icons/lib/fa';
import {
    getDateDDMMYYYY
} from "../../../utils/utils";

class DateInput extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { date: getDateDDMMYYYY(new Date()) };
    }

    componentDidMount() {
        this.setState({
            date: getDateDDMMYYYY(this.props.value)
        });

    }

    componentDidUpdate(prevProps) {
        this.setState({
            date: getDateDDMMYYYY(this.props.value)
        });
    }

    handleChange(name, e) {
        var change = {};
        change[name] = e.target.value;
        this.setState(change);
    }

    render() {
        return (
            <div className="Input-Border">
                <span className="Grey"><FaCalendar className="Shape TextDark CalenderIcon" /></span>
                <Input type="text"
                    value={this.state.date}
                    className="Regular-UPPER-Case"
                    placeholder="DD/MM/YYYY"
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
                    onChange={this.handleChange.bind(this, this.state.date)}
                />
            </div>
        );
    }
}

export default DateInput;

