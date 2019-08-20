

import React from "react";
import { Input } from 'reactstrap';
import '../date-picker.css';
import { FaCalendar } from 'react-icons/lib/fa';

class Dateinput extends React.PureComponent {
    componentDidMount() {}

    componentDidUpdate(prevProps) {}

    render() {
        return (
            <div className="DatepickerInput">
                <FaCalendar className="TextDark CalenderIcon" />
                <Input type="text"
                placeholder="YYYY / MM / DD"
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
              />
            </div>
        );
    }
}

export default Dateinput;

