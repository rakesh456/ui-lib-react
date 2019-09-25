import { isUndefinedOrNull, isBlank, isValidDate, convertYYYYMMDD, getDateByFormatDDMMYYYY, ARROWS } from "./utils";

export const DEFAULT_OPTIONS = {"displayFormat": "MM/DD/YYYY", "iconAlignment":"Left", "dateStringAlignment": "Left", "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": false};
export const CLENDAR_FORMATS = ["MM/DD/YYYY", "DD/MM/YYYY"];
export const YEAR_FORMATS = ["YYYY", "MM/YYYY", "QQ/YYYY"];
export const CURRENT_YEAR = +(new Date().getFullYear());
export const CURRENT_MONTH = +(new Date().getMonth()) + 1;
export const WEEK_COUNT = 6;
// Calendar months names
export const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const MONTH_SHORT_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const WEEK_SHORT_NAMES = ["S", "M", "T", "W", "T", "F", "S"];
export const QUARTERS_NAMES = ["Q1", "Q2", "Q3", "Q4"];

export function getMonthNameByIndex(index) {
    var _index = (index)? index : 0;
    return MONTH_NAMES[_index].toUpperCase();
}

export function getMonthIndex(month) {
    return zeroPad(MONTH_SHORT_NAMES.indexOf(month) + 1, 2);
}

export const zeroPad = (n, width, z)  =>{
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export const getMonthDays = (month = CURRENT_MONTH, year = CURRENT_YEAR) => {
    const months30 = [4, 6, 9, 11];
    const leapYear = year % 4 === 0;

    return month === 2
        ? leapYear
            ? 29
            : 28
        : (months30.indexOf(month) !== -1)
            ? 30
            : 31;
}


export const getPreviousMonth = (month, year) => {
    const prevMonth = (month > 1) ? month - 1 : 12;
    const prevMonthYear = (month > 1) ? year : year - 1;

    return { month: prevMonth, year: prevMonthYear };
}

export const getNextMonth = (month, year) => {
    const nextMonth = (month < 12) ? month + 1 : 1;
    const nextMonthYear = (month < 12) ? year : year + 1;

    return { month: nextMonth, year: nextMonthYear };
}

export const getMonthFirstDay = (month = CURRENT_MONTH, year = CURRENT_YEAR) => {
    return +(new Date(`${year}-${zeroPad(month, 2)}-01`).getDay()) + 1;
}

export const createBlankArray = (number) => {
    var _array = [];
    for (let index = 0; index < number; index++) {
        _array.push(null);
    }
    return _array;
}

export default (month = CURRENT_MONTH, year = CURRENT_YEAR) => {
    const monthDays = getMonthDays(month, year);
    const monthFirstDay = getMonthFirstDay(month, year);

    const daysFromPrevMonth = monthFirstDay - 1;
    const daysFromNextMonth = (WEEK_COUNT * 7) - (daysFromPrevMonth + monthDays);
    
    const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(month, year);
    const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);
    
    const prevMonthDays = getMonthDays(prevMonth, prevMonthYear);
    
    const _array0 = createBlankArray(daysFromPrevMonth);
    const prevMonthDates = _array0.map((n, index) => {
        const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
        return [prevMonthYear.toString(), zeroPad(prevMonth, 2), zeroPad(day, 2)];
    });
    
    const _array1 = createBlankArray(monthDays);
    const thisMonthDates = _array1.map((n, index) => {
        const day = index + 1;
        return [year.toString(), zeroPad(month, 2), zeroPad(day, 2)];
    });
    
    const _array2 = createBlankArray(daysFromNextMonth);
    const nextMonthDates = _array2.map((n, index) => {
        const day = index + 1;
        return [nextMonthYear.toString(), zeroPad(nextMonth, 2), zeroPad(day, 2)];
    });


    Array.prototype.push.apply(prevMonthDates, thisMonthDates);
    Array.prototype.push.apply(prevMonthDates, nextMonthDates);
    //  (JSON.stringify(prevMonthDates).concat(JSON.stringify(thisMonthDates))).concat(JSON.stringify(nextMonthDates));
    return prevMonthDates;
}

export const getYearsList = (year) => {
    year = (year)? year : new Date().getFullYear();
    var array = [];
    for (let index = -4; index < 5; index++) {
        array.push(year - index);
    }
    return array.reverse();
}

// (bool) Checks if a value is a date - this is just a simple check
export const isDate = date => {
    const isDate = Object.prototype.toString.call(date) === '[object Date]';
    const isValidDate = date && !isNaN(date.valueOf());

    return isDate && isValidDate;
}

// (bool) Checks if two date values are of the same month and year
export const isSameMonth = (date, basedateMonth, basedateYear) => {
    if (!(isDate(date))) return false;

    // const basedateMonth = +(basedate.getMonth()) + 1;
    // const basedateYear = basedate.getFullYear();

    const dateMonth = +(date.getMonth()) + 1;
    const dateYear = date.getFullYear();

    return (+basedateMonth === +dateMonth) && (+basedateYear === +dateYear);
}

// (bool) Checks if two date values are the same day
export const isSameDay = (date, basedate = new Date()) => {
    if (!(isDate(date) && isDate(basedate))) return false;
    const basedateDate = basedate.getDate();
    const basedateMonth = +(basedate.getMonth()) + 1;
    const basedateYear = basedate.getFullYear();

    const dateDate = date.getDate();
    const dateMonth = +(date.getMonth()) + 1;
    const dateYear = date.getFullYear();

    return (basedateDate === dateDate) && (basedateMonth === dateMonth) && (basedateYear === dateYear);
}

// (string) Formats the given date as YYYY-MM-DD
// Months and Days are zero padded
export const getIsoDate = (date = new Date()) => {
    if (!isDate(date)) return null;
    return [
        date.getFullYear(),
        zeroPad(+date.getMonth() + 1, 2),
        zeroPad(+date.getDate(), 2)
    ].join('-');
}

export const checkDateInBetween = (date, from, to) => {
    if(isDate(date)){
        var _to = (!isUndefinedOrNull(to))? new Date(to) : null;
        if(isUndefinedOrNull(_to) && isDate(from) && date.getTime() >= from.getTime()){
            return true;
        } else if(isDate(from) && isDate(_to) && (date.getTime() < from.getTime() || date.getTime() > _to.getTime())){
            return false;
        } else if(isDate(from) && isDate(_to)){
            var _from = new Date(from);
            if(date.getTime() > _from.getTime() && date.getTime() <= _to.getTime()){
                return true;
            } else {
                return false
            }
        } else {
            return false
        }
    } else {
        return false;
    }
}

export const isValidOutsideRangeDate = (date, options) => {
    const upperDateLimit = (options && options.upperDateLimit)? ((isValidDate(options.upperDateLimit))? options.upperDateLimit : null) : null;
    const lowerDateLimit = (!isUndefinedOrNull(options) && options.lowerDateLimit && isValidDate(options.lowerDateLimit))? options.lowerDateLimit : new Date();

    const _date = convertYYYYMMDD(getDateByFormatDDMMYYYY(date, options.displayFormat), options);
    const _lowerDateLimit = convertYYYYMMDD(getDateByFormatDDMMYYYY(lowerDateLimit, options.displayFormat), options);
    const _upperDateLimit = convertYYYYMMDD(getDateByFormatDDMMYYYY(upperDateLimit, options.displayFormat), options);

    return checkDateInBetween(new Date(_date), new Date(_lowerDateLimit), new Date(_upperDateLimit));
}

export const resetOptions = (options) => {
    return {...DEFAULT_OPTIONS, ...options};
}


export const isCalendarFormat = (displayFormat) => {
    return (CLENDAR_FORMATS.indexOf(displayFormat) != -1)
}

export const isYearFormat = (displayFormat) => {
    return (YEAR_FORMATS.indexOf(displayFormat) != -1)
}

export const isValidMonthYearValue = (value) => {
    return new RegExp(/[\d]{2}\/[\d]{4}/).test(value);
}

export const getSelectedYear = (value) => {
    return (value)? value.split("/")[1] : ''
}

export const getSelectedMonth = (value) => {
    return (value)? value.split("/")[0] : ''
}

export const isEqual = (val1, val2) => {
    return (val1 && val2 && val1.toString() === val2.toString())
}

export const getInvalidDateMessage = (validationMessages, isInvalidRangeDate) => {
    var _msg = (!isInvalidRangeDate)? 'Invalid Date' : 'Outside allowed range';

    if(!validationMessages || validationMessages.length <= 0){
       return _msg;
    }

    validationMessages.forEach((msg) => {
        if(!isBlank(msg['inValidFormat']) && !isInvalidRangeDate){
            _msg = msg['inValidFormat'];
        } else if(!isBlank(msg['outsideRange']) && isInvalidRangeDate){
            _msg = msg['outsideRange'];
        }
    });
    return _msg;
}

export const getNewUpdateDateByArrow = (selectedDate, options, charCode, isCtrl, isMonth) => {
    const _date = convertYYYYMMDD(getDateByFormatDDMMYYYY(selectedDate, options.displayFormat), options);
    var newdate = new Date(_date);
    
    var day = (charCode === ARROWS.left)? -1 : (charCode === ARROWS.right)? 1 : (charCode === ARROWS.down)? 7 : -7; 
    if(isCtrl){
        day = (charCode === ARROWS.left || charCode === ARROWS.up)? -365 : 365;
    }
    
    if(isMonth){
        var counter = (charCode === ARROWS.left || charCode === ARROWS.up)? -1 : 1;
        var month = (newdate.getMonth());
        newdate.setMonth(month + counter);
        newdate.setFullYear(newdate.getFullYear());
    } else {
        newdate.setDate(newdate.getDate() + day);
    }
    newdate = getDateByFormatDDMMYYYY(newdate, options.displayFormat);
    return newdate;
}