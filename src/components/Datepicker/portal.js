import React from "react";
import ReactDOM from 'react-dom';

let calendarModal = null;

class CalendarPortal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }
    
    componentDidMount() {
        calendarModal = document.getElementById('modalroot');
        calendarModal.appendChild(this.el);
    }

    componentDidUpdate(prevProps) {
    }

    componentWillUnmount() {
       // calendarModal.removeChild(this.el);
    }


    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el,
        );
    }
}

export default CalendarPortal;