

import React from "react";
import { Button } from 'reactstrap';

class CalendarButtons extends React.PureComponent {
    componentDidMount() {}

    componentDidUpdate(prevProps) {}

    selectButtonClick = () => {
        this.props.onSelectButtonClick();
    }
    
    clearButtonClick = () => {
        this.props.onClearButtonClick();
    }

    render() {
        return (
            <div className="VS-CalendarButtons">
                <Button className="VS-ClearButton VS-PullLeft" onClick={() => this.clearButtonClick()}>Clear</Button>
                <Button className="VS-SelectButton VS-PullRight" onClick={() => this.selectButtonClick()}>Select</Button>
            </div>
        );
    }
}

export default CalendarButtons;