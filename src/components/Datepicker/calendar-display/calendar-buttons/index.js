

import React from "react";
import { Button } from 'reactstrap';

class CalendarButtons extends React.PureComponent {
    componentDidMount() {}

    componentDidUpdate(prevProps) {}

    render() {
        return (
            <div className="VS-CalendarButtons">
                <Button className="VS-ClearButton VS-PullLeft">Clear</Button>
                <Button className="VS-SelectButton VS-PullRight">Select</Button>
            </div>
        );
    }
}

export default CalendarButtons;