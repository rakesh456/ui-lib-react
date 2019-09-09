'user strict';

const e = React.createElement;

class DatePicker extends React.PureComponent {

    constructor(props) {
        super(props);
        this.style = {};
        this.el = document.createElement('div');
        
        this.state = { date: getDateByFormatDDMMYYYY(new Date(), getFormatfromOptions(this.props.options)), shouldCalendarOpen: false };
    }


    handleChildUnmount() {
        this.setState({ shouldCalendarOpen: false });
    }

    updateDimensions() {
        var w = window,
            d = document,
            documentElement = d.documentElement,
            body = d.getElementsByTagName('body')[0],
            width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
            height = w.innerHeight || documentElement.clientHeight || body.clientHeight;
    }

    componentDidMount() {

        document.addEventListener('click', this.closeCalendar);
        const dimensions = this.el.getBoundingClientRect();
        const style = {};
        style.left = dimensions.left;
        style.right = dimensions.right;
        style.top = (dimensions.top + 42);
        style.bottom = dimensions.bottom;
        this.setState({ style: style });

        window.addEventListener("resize", this.updateDimensions);

        // this.setState({
        //     date: getDateDDMMYYYY(this.props.value),
        // });
    }

    componentDidUpdate(prevProps) {
    }

    handleDateChange = date => {
        const newDate = getIsoDate(date);
        this.setState({ date: getDateByFormatDDMMYYYY(newDate, getFormatfromOptions(this.props.options)), shouldCalendarOpen: false });
    }

    onFocus = () => {
        this.setState({
            shouldCalendarOpen: true
        });
    }

    closeCalendar = (e) => {
        if (e.target && e.target.classList && !e.target.classList.contains("VS-Calendar-Input") && !e.target.classList.contains("VS-Day") && !e.target.classList.contains("VS-CalDay") && !e.target.classList.contains("VS-NextPrevDay") && !e.target.classList.contains("VS-Icon") && !e.target.classList.contains("VS-CalendarMonth") && this.state.shouldCalendarOpen === true) {
            this.setState({
                shouldCalendarOpen: false
            });
        }
    }

    /*--- Dateinput functions --*/
    handleChange(name, e) {
        var change = {};
        change[name] = e.target.value;
        this.setState(change);
    }

    getIconAlignClass() {
        const options = this.props.options;
        return (options && options.iconAlignment === 'Left') ? 'VS-PullLeft VS-MrgT5' : 'VS-PullRight VS-MrgT5';
    }

    getDateAlignClass() {
        const options = this.props.options;
        return (options && options.dateStringAlignment === 'Right') ? 'VS-PullRight VS-TextRight' : 'VS-PullLeft VS-TextLeft';
    }

    gotoDate = date => evt => {
        evt && evt.preventDefault();
        const { date } = this.state;
        const { onBlur } = this.props;

        (date) &&
            this.setState(this.state.date, () => {
                typeof onBlur === "function" && onBlur(date);
            });
    }

    render() {
        const { shouldCalendarOpen, date } = this.state;
        const disable = (this.props.options && this.props.options.disable === true) ? true : false;

        return (
            <div className="VS-App">
                <div id="modalroot"></div>
                <header className="VS-App-header">
                    <div className="VS-DatepickerContainer">
                        <div ref={(el) => this.el = el}>
                            <div className={`VS-Input-Border ${(disable) ? 'VS-Disabled' : ''}`}>
                                <span className={this.getIconAlignClass()}> 
                                    <i className="VS-Shape VS-TextDark VS-CalenderIcon fa fa-calendar" ></i>
                                </span>
                                <input type="text"
                                    value={this.state.date}
                                    className={`VS-Regular-UPPER-Case VS-Calendar-Input ${this.getDateAlignClass()}`}
                                    placeholder="DD/MM/YYYY"
                                    onFocus={this.onFocus}
                                    onChange={this.handleChange.bind(this, this.state.date)}
                                />
                            </div>
                        </div>

                        {
                            (shouldCalendarOpen) ?
                                <CalendarPortal parent="#parent" position="right" arrow="center">
                                    <CalendarDisplay style={this.state.style} options={this.props.options} selectedDate={this.state.date} shouldCalendarOpen={shouldCalendarOpen} changeSelectedDate={this.handleDateChange}>
                                    </CalendarDisplay>
                                </CalendarPortal>
                                : ''
                        }
                    </div>
                </header>
            </div>
        );
    }
}

document.querySelectorAll('#datepicker')
    .forEach(domContainer => {
        const options = JSON.parse(domContainer.dataset.options);
        if(options.lowerDateLimit){
            options['lowerDateLimit'] = new Date(options.lowerDateLimit);
        }
        if(options.lowerDateLimit){
            options['upperDateLimit'] = new Date(options.upperDateLimit);
        }

        ReactDOM.render(
            e(DatePicker, {'options': options}),
            domContainer
        );
    });


//CalendarPortal compoenent
let calendarModal1 = null;

class CalendarPortal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }
    
    componentDidMount() {
        calendarModal1 = document.getElementById('modalroot');
        calendarModal1.appendChild(this.el);
    }

    componentDidUpdate(prevProps) {
    }

    componentWillUnmount() {
    }


    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el,
        );
    }
}

//CalendarDisplay compoenent
let calendarModal2 = null;

class CalendarDisplay extends React.PureComponent {
    constructor(props) {
        super(props);
        const selectedDate = (this.props && this.props.selectedDate) ? new Date(convertYYYYMMDD(this.props.selectedDate, this.props.options)) : new Date();

        this.state = { month: selectedDate.getMonth() + 1, year: selectedDate.getFullYear() };
        this.el = document.createElement('div');
    }
    
    componentDidMount() {
        calendarModal2 = document.getElementById('modalroot');
        calendarModal2.appendChild(this.el);
    }

    componentDidUpdate(prevProps) {
    }

    componentWillUnmount() {
        calendarModal2 = document.getElementById('modalroot');
        calendarModal2.removeChild(this.el);
    }

    changeSelectedDate = (_date) => {
        this.props.changeSelectedDate(_date);
    }

    goToPrevMonth = () => {
        if (this.state.month === 1) {
            this.setState({
                month: 12,
                year: (this.state.year - 1)
            });
        } else {
            this.setState({
                month: (this.state.month - 1)
            });
        }
    }

    goToNextMonth = () => {
        if (this.state.month === 12) {
            this.setState({
                month: 1,
                year: (this.state.year + 1)
            });
        } else {
            this.setState({
                month: (this.state.month + 1)
            });
        }
    }

    render() {
        const { month, year } = this.state;
        const { selectedDate } = this.props;
        if (!this.props.shouldCalendarOpen) {
            return null;
        }
        
        return (
            <div className="VS-CalendarContainer VS-shape-rounded-fill VS-modal" style={this.props.style}>
                <CalendarMonth month={month} year={year} goToNextMonth={this.goToNextMonth} goToPrevMonth={this.goToPrevMonth} />
                <CalendarWeek />
                <CalendarDays options={this.props.options} selectedDate={selectedDate} month={month} year={year} changeSelectedDate={this.changeSelectedDate} />
            </div>
        );
    }
}

//CalendarMonth compoenent
class CalendarMonth extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    componentDidUpdate(prevProps) {}


    render() {
        const { month, year } = this.props;
        return (
            <div className="VS-CalendarMonth VS-TextCenter">
                <i className="VS-PullLeft VS-Icon fa fa-caret-left" onClick={this.props.goToPrevMonth}></i>
                    <span className="VS-Medium-UPPER-Case VS-MonthName">{getMonthNameByIndex(month - 1)} {year}</span>
                <i className="VS-PullRight VS-Icon fa fa-caret-right" onClick={this.props.goToNextMonth}></i>
            </div>
        );
    }
}

//CalendarWeek compoenent
class CalendarWeek extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {month: new Date().getMonth(), year: new Date().getFullYear() };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {}

    render() {
        const weekItems = WEEK_SHORT_NAMES.map((number, index) =>
            <span className="VS-Day VS-Medium-UPPER-Case" key={index}>{number}</span>
        );
    
        return (
            <div className="VS-CalendarWeek">
                {weekItems}
            </div>
        );
    }
}

//CalendarDays compoenent
class CalendarDays extends React.PureComponent {
    constructor(props) {
        super(props);
        const _date = convertYYYYMMDD(this.props.selectedDate, this.props.options);
        
        this.state = { current: getDateByFormatDDMMYYYY(new Date(_date), getFormatfromOptions(this.props.options)), lowerDateLimit: new Date()};
    }
    
    dismiss() {
        this.props.onBlur();
    }
    
    componentDidMount() {
        const options = this.props.options; 
        if(isDate(this.props.selectedDate)){
            this.setState({
                current: getDateByFormatDDMMYYYY(this.props.selectedDate, getFormatfromOptions(this.props.options))
            });
        }

        var _lowerdate = (!isUndefinedOrNull(options) && options.lowerDateLimit && isDate(options.lowerDateLimit))? options.lowerDateLimit : null;

        if(_lowerdate){
            _lowerdate = new Date(_lowerdate);
            _lowerdate.setDate(_lowerdate.getDate() - 1);
        }

        this.setState({
            lowerDateLimit: (!isUndefinedOrNull(_lowerdate))? _lowerdate : new Date()
        });

    }

    componentDidUpdate(prevProps) {
        // if (this.props.selectedDate === this.state.current) {
        //     this.setState({
        //         current: this.props.selectedDate
        //     });
        // }
    }

    getCalendarDates = () => {
        const { month, year } = this.props;
        const { current } = this.state;
        const _current = new Date((convertYYYYMMDD(current, this.props.options)));
        const calendarMonth = month || +_current.getMonth() + 1;
        const calendarYear = year || +_current.getFullYear();

        return splitArray(new calendar(calendarMonth, calendarYear), 7);
    };

    selectDate = (_date) => {
        this.props.changeSelectedDate(_date);
        this.setState({
            current: getDateByFormatDDMMYYYY(_date, getFormatfromOptions(this.props.options))
        });
    }

    renderCalendarDate = (date, index) => {
        const { month, year } = this.props;
        const { current, today } = this.state;
        const _date = new Date(date);
        const props = { index, title: _date.toDateString() };

        const inMonth = month && year && isSameMonth(_date, new Date([year, month, 1].join("-")));
        
        const isToday = isSameDay(_date, today);
        const isCurrent = current && isSameDay(_date, new Date(convertYYYYMMDD(current, this.props.options)));

        const options = this.props.options;

        const upperDateLimit = (!isUndefinedOrNull(options) && options.upperDateLimit)? (!isUndefinedOrNull(options) && (isDate(options.upperDateLimit))? options.upperDateLimit : null) : null;


        const isEnabled = (isToday || checkDateInBetween(_date, this.state.lowerDateLimit, upperDateLimit));

        const dayClassName = (isCurrent === true)? 'VS-DaySelected' : ((isToday)? 'VS-DayCurrent' : 'VS-NormalDay');

        const padClassName = (_date.getDate() <= 9)? 'VS-PadExtra' : '';

        return (  
            <div key={guid()} className={this.getClassName(props.index)}>   
                {
                    (isEnabled)?
                        <div {...props} onClick={() => this.selectDate(_date)}>
                            {
                                (inMonth) ?
                                    <span className={`VS-CalDay ${dayClassName} ${padClassName}`}>{_date.getDate()}</span>
                                    :
                                    <span className={`VS-NextPrevDay ${padClassName}`}>{_date.getDate()}</span>
                            }                
                        </div> 
                        :
                        <div {...props}>
                            <span className='VS-DisabledDay'>{_date.getDate()}</span>
                        </div>
                } 
            </div>
        );
    }

    renderCalendarRow = (dates, index) => {
        const rows = dates.map((date, index1) => {
            return this.renderCalendarDate(date, index1)
        });

        return (
            <div className="VS-DateRow" key={guid()}>{rows}</div>
        )
    }

    getDayClassName = (isCurrent, isToday) => {
        if(isCurrent === true) return 'VS-DaySelected';
        return (isToday)? 'VS-DayCurrent' : 'VS-NormalDay';
    }

    getClassName = (index) => {
        return (index % 6 === 0) ? 'VS-Day VS-Medium-UPPER-Case VS-DayStart' : 'VS-Day VS-Medium-UPPER-Case';
    }

    render() {
        return (
            <div className="VS-CalendarDay">
                <div>
                    {this.getCalendarDates().map((row, index) => this.renderCalendarRow(row, index))}
                </div>
            </div>
        );
    }
 
}
