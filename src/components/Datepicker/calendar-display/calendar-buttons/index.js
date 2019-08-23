

import React from "react";
import { Button } from 'reactstrap';

class CalendarButtons extends React.PureComponent {
    componentDidMount() {}

    componentDidUpdate(prevProps) {}

    render() {
        return (
            <div className="CalendarButtons">
                <Button className="ClearButton PullLeft">Clear</Button>
                <Button className="SelectButton PullRight">Select</Button>
            </div>
        );
    }
}

export default CalendarButtons;