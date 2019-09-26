

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
        const _primaryButton = (this.props.options && this.props.options.dateButtonPrimary)? this.props.options.dateButtonPrimary : "Select";
        const _secondaryButton = (this.props.options && this.props.options.dateButtonSecondary)? this.props.options.dateButtonSecondary : "Clear";
        
        return (
            <div className="VS-CalendarButtons">
                <Button className="VS-ClearButton VS-PullLeft" onClick={() => this.clearButtonClick()}>{_secondaryButton}</Button>
                <Button className="VS-SelectButton VS-PullRight" onClick={() => this.selectButtonClick()}>{_primaryButton}</Button>
            </div>
        );
    }
}

export default CalendarButtons;