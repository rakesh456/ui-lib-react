

import React from "react";
import Dateinput from "./date-input/index";
import Calendardisplay from "./calendar-display/index";
import './date-picker.css';

class Datepicker extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {date: new Date(), isCalendarOpen: true };
    }

    toggleCalendar = () => this.setState({ isCalendarOpen: !this.state.isCalendarOpen })

    componentDidMount() {}

    componentDidUpdate(prevProps) {}

    handleChange = evt => evt.preventDefault();

    onFocus = () =>  {
        this.setState({
            isCalendarOpen: !this.state.isCalendarOpen
        });
    }

    onBlur = () => {
        this.setState({
            isCalendarOpen: !this.state.isCalendarOpen
        });
    }

    render() {
        const {isCalendarOpen} = this.state;
        return (
            <div className="DatepickerContainer">
                <Dateinput onFocus={ this.onFocus } onBlur={ this.onBlur }  />
                {
                    isCalendarOpen && <Calendardisplay />
                }
            </div>
        );
    }
}

export default Datepicker;

