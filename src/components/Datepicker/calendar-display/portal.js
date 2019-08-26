import React from "react";
import ReactDOM from 'react-dom';

let modalRoot = null;

class CalendarPortal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }
    
    componentDidMount() {
        modalRoot = document.getElementById('modalroot');
        modalRoot.appendChild(this.el);
    }

    componentDidUpdate(prevProps) {
    }

    componentWillUnmount() {
       // modalRoot.removeChild(this.el);
    }


    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el,
        );
    }
}

export default CalendarPortal;