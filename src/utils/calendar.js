import { isUndefinedOrNull, isBlank, isValidDate, convertYYYYMMDD, getDateByFormatDDMMYYYY, getDateByFormatDDMMYYYYNew, ARROWS, convertYYYYMMDDByFormat, getYYYYMMDD } from "./utils";

export const DEFAULT_OPTIONS = {"displayFormat": "MM/DD/YYYY", "iconAlignment":"Left", "dateStringAlignment": "Left", "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": false, "showErrorMessage": false};
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

export const isCalendarFormat = (displayFormat) => {
    return (CLENDAR_FORMATS.indexOf(displayFormat) != -1)
}

export const isYearFormat = (displayFormat) => {
    return (YEAR_FORMATS.indexOf(displayFormat) != -1)
}

export const isValidQQYearValue = (value) => {
    if(value && new RegExp(/Q[\d]{1}\/[\d]{4}/).test(value)){
        let _number = parseInt(value.charAt(1));
        let d = value.toString().split("/"),
                year = d[1];
        
        return (_number <= 4 && _number >= 1 && year.length === 4 && parseInt(year) > 999);
    } else {
        return false;
    }
}

export const isValidMonthYearValue = (value) => {
    return new RegExp(/[\d]{2}\/[\d]{4}/).test(value);
}

export const isValidYearValue = (value) => {
    return new RegExp(/^[\d]{4}$/).test(value);
}

export const isQQYYYYFormat =(format) => {
    return (format === 'QQ/YYYY');
}

export const isMMYYYYFormat =(format) => {
    return (format === 'MM/YYYY');
}

export const isYYYFormat =(format) => {
    return (format === 'YYYY');
}

export const getConvertedDate = (date, displayFormat) => {
    var _date = convertYYYYMMDDByFormat(date, displayFormat);
    return (!isValidDate(_date))? null : getYYYYMMDD(_date);
}

export const getConvertedDateMMYYYY = (date) => {
    let d = date.toString().split("/"),
        month = '' + d[0],
        day = '01',
        year = d[1];

    if (month.length < 2) month = '0' + month;

    return [year, month, day].join('-');
}

export function getUpperLimitFromOptions(options){
    return (options && options.upperLimit)? ((isValidDate(options.upperLimit))? options.upperLimit : null) : null;
}

export function getLowerLimitFromOptions(options){
    return (options && options.lowerLimit)? ((isValidDate(options.lowerLimit))? options.lowerLimit : null) : null;
}

export const getProperFormattedDateNew = (date, options) => {
    return new Date(currentFormatToYYYYMMDDNew(date, options));
}

export const currentFormatToYYYYMMDDNew = (date, options) => {
    return convertYYYYMMDD(getDateByFormatDDMMYYYYNew(date, options.displayFormat), options);
}

export const getProperFormattedDate = (date, options) => {
    return new Date(currentFormatToYYYYMMDD(date, options));
}

export const currentFormatToYYYYMMDD = (date, options) => {
    return convertYYYYMMDD(getDateByFormatDDMMYYYY(date, options.displayFormat), options);
}

export const getValidYearsList = (options) => {
    const { displayFormat, disabledList } = options;

    if(disabledList && disabledList.length){
        let _array = [];
        disabledList.forEach((date) => {
            if((isQQYYYYFormat(displayFormat) && isValidQQYearValue(date)) || (isMMYYYYFormat(displayFormat) && isValidMonthYearValue(date))){
                let d = date.toString().split("/"),
                    year = d[1];
                _array.push(year);
            } 
        });
        return _array;
    } else {
        return [];
    }
}

export const formatOptions = (options) => {
    var newOptions = {...options}
    var displayFormat = options.displayFormat;

    if(options.lowerLimit){
        newOptions['lowerLimit'] = (isQQYYYYFormat(displayFormat) || isYYYFormat(displayFormat))? options.lowerLimit :((!isMMYYYYFormat(displayFormat))? getConvertedDate(options.lowerLimit, displayFormat) : getConvertedDateMMYYYY(options.lowerLimit));
    }
    
    if(options.upperLimit){
        newOptions['upperLimit'] = (isQQYYYYFormat(displayFormat) || isYYYFormat(displayFormat))? options.upperLimit : ((!isMMYYYYFormat(displayFormat))? getConvertedDate(options.upperLimit, displayFormat) : getConvertedDateMMYYYY(options.upperLimit));
    }

    if(options.disabledList && options.disabledList.length > 0){
        if(isYYYFormat(displayFormat)){
            newOptions['disabledList'] = [...options.disabledList] 
        } else {
            var _array = [];
            options.disabledList.forEach((ele) => {
                if(isQQYYYYFormat(displayFormat) && isValidQQYearValue(ele)){
                    _array.push(ele)
                } else if(isMMYYYYFormat(displayFormat) && isValidMonthYearValue(ele)){
                    _array.push(ele)
                } else if(isCalendarFormat(displayFormat)){
                    _array.push(getConvertedDate(ele, displayFormat));
                }
            });
            newOptions['disabledList'] = [..._array] 
        }
    }
    if(options.indicatorList && options.indicatorList.length > 0){
        var _array = [];
        options.indicatorList.forEach((ele) => {
            var _dates = [];
            if(ele && ele.dates && ele.dates.length > 0){
                ele.dates.forEach((date) => {
                    _dates.push(getConvertedDate(date, displayFormat));
                });
            }
            _array.push({'dates': _dates, 'color': ele.color});
        });
        newOptions['indicatorList'] = [..._array] 
    }

    return newOptions;
}

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
        var _from = (!isUndefinedOrNull(from))? new Date(from) : null; 
        
        if(isUndefinedOrNull(_from) && isUndefinedOrNull(_to)){
            return true;
        } else if(isUndefinedOrNull(_from) && isDate(_to) && date.getTime() <= _to.getTime()){
            return true;
        } else if(isUndefinedOrNull(_to) && isDate(from) && date.getTime() >= from.getTime()){
            return true;
        } else if(isDate(from) && isDate(_to) && (date.getTime() < from.getTime() || date.getTime() > _to.getTime())){
            return false;
        } else if(isDate(from) && isDate(_to)){
            var _fromDt = new Date(from);
            if(date.getTime() >= _fromDt.getTime() && date.getTime() <= _to.getTime()){
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

export const isValidOutsideRangeDateQQYear = (date, options) => {
    const { lowerMonthLimit, lowerYearLimit } = getYYYYForLowerLimit(options);
    const { upperMonthLimit, upperYearLimit } = getYYYYForUpperLimit(options); 
    
    let _validate = false;
    if(isUndefinedOrNull(lowerMonthLimit) && isUndefinedOrNull(upperMonthLimit) && isUndefinedOrNull(lowerYearLimit) && isUndefinedOrNull(upperYearLimit)){
        return true;
    } else {
        let d = date.toString().split("/"),
                qq = d[0],
                year = parseInt(d[1]);
        
        if(lowerYearLimit && upperYearLimit && (year >= lowerYearLimit && year <= upperYearLimit)){
            _validate = true;
        } else if(lowerYearLimit && !upperYearLimit && year >= lowerYearLimit){
            _validate = true;
        } else if(!lowerYearLimit && upperYearLimit && year <= upperYearLimit){
            _validate = true;
        } 
    
        if(_validate === true){
            let _l = (lowerMonthLimit)? parseInt(lowerMonthLimit.charAt(1)) : 1;
            let _u = (upperMonthLimit)? parseInt(upperMonthLimit.charAt(1)) : 4;
            let _q = parseInt(qq.charAt(1));
          
            if((year === lowerYearLimit && _q < _l) || (year === upperYearLimit && _q > _u)){
                _validate = false;
            }

            const {disabledList} = options;
            if(qq, year){
                const _val = qq + '/' + year;
                _validate = (disabledList && disabledList.length > 0 && _val)? ((disabledList.indexOf(_val.toString()) !== -1)? false : true) : true;
            } 
        }
        return _validate;
    }
}

export const isValidOutsideRangeDateYear = (year, options) => {
    const { lowerYearLimit } = getYYYYForLowerLimit(options);
    const { upperYearLimit } = getYYYYForUpperLimit(options);
    const { disabledList } = options;

    let _validate = true;
    if(lowerYearLimit && upperYearLimit && (year < lowerYearLimit || year > upperYearLimit)){
        _validate = false;
    } else if(lowerYearLimit && !upperYearLimit && year < lowerYearLimit){
        _validate = false;
    } else if(!lowerYearLimit && upperYearLimit && year > upperYearLimit){
        _validate = false;
    } else if(disabledList && disabledList.length > 0 && year){
        _validate = ((disabledList.indexOf(year.toString()) !== -1)? false : true);
    }
        
    return _validate;
}

export const isValidOutsideRangeDateMonthYear = (date, options) => {
    const { lowerMonthLimit, lowerYearLimit } = getYYYYForLowerLimit(options);
    const { upperMonthLimit, upperYearLimit } = getYYYYForUpperLimit(options);

    let d = date.toString().split("/"),
        month = parseInt(d[0]),
        year = parseInt(d[1]);

    let _date = new Date(year, (month - 1), 1);  
    let _lowerLimit = new Date(lowerYearLimit, (lowerMonthLimit - 1), 1);   
    _lowerLimit.setDate(1);
    _lowerLimit.setHours(-1);  
    let _upperLimit = new Date(upperYearLimit, upperMonthLimit, 1); 
    _upperLimit.setDate(1);
    _upperLimit.setHours(-1);  
    
    const _validate = checkDateInBetween(_date, isValidDate(_lowerLimit)? _lowerLimit : null, isValidDate(_upperLimit)? _upperLimit : null);
    if(_validate){
        const {disabledList} = options;
        if(month, year){
            const _month = zeroPad(month, 2);
            const _val = _month + '/' + year;
            return (disabledList && disabledList.length > 0 && _val)? ((disabledList.indexOf(_val.toString()) !== -1)? false : _validate) : _validate;
        } else {
            return _validate;
        }
    }

    return _validate;
}

export const isValidOutsideRangeDate = (date, options) => {
    const upperLimit = getUpperLimitFromOptions(options);
    const lowerLimit = getLowerLimitFromOptions(options);

    const _date = new Date(convertYYYYMMDD(getDateByFormatDDMMYYYY(getProperFormattedDateNew(date, options), options.displayFormat), options));
    const _lowerLimit = new Date(convertYYYYMMDD(getDateByFormatDDMMYYYY(lowerLimit, options.displayFormat), options));
    const _upperLimit = (upperLimit)? new Date(convertYYYYMMDD(getDateByFormatDDMMYYYY(upperLimit, options.displayFormat), options)) : upperLimit;
    
    return (checkDateInBetween(_date, _lowerLimit, _upperLimit) && !dateIsInDisabledList(_date, options));
}

export const resetOptions = (options) => {
    return {...DEFAULT_OPTIONS, ...options};
}

export const getYYYYForLowerLimit = (options) => {
    return (options && options.lowerLimit)? getYYYYFromOption(options.lowerLimit, options, true) : {};
}

export const getYYYYForUpperLimit = (options) => {
    return (options && options.upperLimit)? getYYYYFromOption(options.upperLimit, options, false) : {};
}

export const getYYYYFromOption = (limit, options, flag) => {
    if(limit){
        if(isQQYYYYFormat(options.displayFormat)){
            let d = limit.toString().split("/"),
                    qq = d[0],
                    year = parseInt(d[1]);

            return (flag)? {lowerMonthLimit: qq, lowerYearLimit: year} : {upperMonthLimit: qq, upperYearLimit: year}
        } else if(isMMYYYYFormat(options.displayFormat)){
            const _date = new Date(limit);
            if(isDate(_date)){
                const year= _date.getFullYear();
                const month = zeroPad(_date.getMonth() + 1, 2);
                return (flag)? {lowerMonthLimit: month, lowerYearLimit: year} : {upperMonthLimit: month, upperYearLimit: year}
            } else {
                return {};
            }
        } else if(isYYYFormat(options.displayFormat)){
            const _date = new Date(limit);
            if(isDate(_date)){
                const year= _date.getFullYear();
                return (flag)? {lowerYearLimit: (year && isValidYearValue(parseInt(year)))? year : ""} : {upperYearLimit: (year && isValidYearValue(parseInt(year)))? year : ""}
            } else {
                return {};
            }
            
        } else {
            return {};
        }
    } else {
        return {};
    }
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

export const getNewUpdateDateByArrowNew = (selectedDate, isRecursive, options, displayFormat, lowerLimit, upperLimit, charCode, isCtrl, isMonth) => {
    const _date = (isRecursive === true)? selectedDate : convertYYYYMMDD(getDateByFormatDDMMYYYYNew(selectedDate, displayFormat), options);
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

    var _lDate = new Date(lowerLimit);
    _lDate.setDate(_lDate.getDate() - 1);
    var _uDate = (upperLimit)? new Date(upperLimit) : upperLimit;
    
    var isValidDate = checkDateInBetween(newdate, _lDate, _uDate);
    
    if(dateIsInDisabledList(newdate, options)){
        return getNewUpdateDateByArrow(newdate, true, options, displayFormat, lowerLimit, upperLimit, charCode, isCtrl, isMonth);
    } else {
        return (isValidDate)? getDateByFormatDDMMYYYY(newdate, displayFormat) : getDateByFormatDDMMYYYYNew(selectedDate, displayFormat);
    }
}

export const getNewUpdateDateByArrow = (selectedDate, isRecursive, options, displayFormat, lowerLimit, upperLimit, charCode, isCtrl, isMonth) => {
    const _date = (isRecursive === true)? selectedDate : convertYYYYMMDD(getDateByFormatDDMMYYYYNew(selectedDate, displayFormat), options);
    var newdate = new Date(_date);
    
    var day = (charCode === ARROWS.left)? -1 : (charCode === ARROWS.right)? 1 : (charCode === ARROWS.down)? 7 : -7; 
    if(isCtrl){
        day = (charCode === ARROWS.left || charCode === ARROWS.up)? -365 : 365;
    }
    
    if(isMonth){
        var counter = (charCode === ARROWS.left || charCode === ARROWS.up)? -1 : 1;
        var month = (newdate.getMonth());
        if(dateIsInDisabledList(newdate, options)){
            newdate.setDate(newdate.getDate() + counter);
            newdate.setFullYear(newdate.getFullYear());
        } else {
            newdate.setMonth(month + counter);
            newdate.setFullYear(newdate.getFullYear());
        }
    } else if(isCtrl){
        var counter = (charCode === ARROWS.left || charCode === ARROWS.up)? -1 : 1;
        var year = (newdate.getFullYear());
        var month = (newdate.getMonth());

        if(dateIsInDisabledList(newdate, options)){
            newdate.setDate(newdate.getDate() + counter);
            newdate.setFullYear(year);
        } else {
            newdate.setMonth(month);
            newdate.setFullYear(year + counter);
        }
    } else {
        newdate.setDate(newdate.getDate() + day);
    }

    var _lDate = new Date(lowerLimit);
    _lDate.setDate(_lDate.getDate());
    var _uDate = (upperLimit)? new Date(upperLimit) : upperLimit;
    
    var isValidDate = checkDateInBetween(newdate, _lDate, _uDate);
    
    if(dateIsInDisabledList(newdate, options)){
        return getNewUpdateDateByArrow(newdate, true, options, displayFormat, lowerLimit, upperLimit, charCode, isCtrl, isMonth);
    } else {
        return (isValidDate)? getDateByFormatDDMMYYYY(newdate, displayFormat) : getDateByFormatDDMMYYYYNew(selectedDate, displayFormat);
    }
}

export const dateIsInDisabledList = (newdate, options) => {
    var _flag = false;

    if(options.disabledList && options.disabledList.length > 0){
        options.disabledList.forEach((ele) => {
            if((new Date(newdate).getTime() === new Date(ele).getTime())){
                _flag = true;
            };
        });
    } 
    return _flag;
}

export const isLeft = (value) => {
    return (value.toLowerCase()) === 'left';
}

export const isRight = (value) => {
    return (value.toLowerCase()) === 'right';
}