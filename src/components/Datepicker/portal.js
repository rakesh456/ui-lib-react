import React from "react";
import ReactDOM from 'react-dom';

let calendarModal = null;

class CalendarPortal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }
    
    componentDidMount() {
        const uuid = this.props.uuid;
        calendarModal = document.getElementById(uuid);
        calendarModal.appendChild(this.el);
    }

    componentDidUpdate(prevProps) {
    }

    componentWillUnmount() {
        if(calendarModal){
            calendarModal.removeChild(this.el);
        }
    }


    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el,
        );
    }
}

export default CalendarPortal;