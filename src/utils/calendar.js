export const CURRENT_YEAR = +(new Date().getFullYear());

export const CURRENT_MONTH = +(new Date().getMonth()) + 1;

export const WEEK_COUNT = 6;

export const zeroPad = (value, length) => {
    return `${value}`.padStart(length, '0');
}

export const getMonthDays = (month = CURRENT_MONTH, year = CURRENT_YEAR) => {
    const months30 = [4, 6, 9, 11];
    const leapYear = year % 4 === 0;

    return month === 2
        ? leapYear
            ? 29
            : 28
        : months30.includes(month)
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

export default (month = CURRENT_MONTH, year = CURRENT_YEAR) => {
    const monthDays = getMonthDays(month, year);
    const monthFirstDay = getMonthFirstDay(month, year);

    const daysFromPrevMonth = monthFirstDay - 1;
    const daysFromNextMonth = (WEEK_COUNT * 7) - (daysFromPrevMonth + monthDays);

    const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(month, year);
    const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);

    const prevMonthDays = getMonthDays(prevMonth, prevMonthYear);

    const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => {
        const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
        return [prevMonthYear, zeroPad(prevMonth, 2), zeroPad(day, 2)];
    });

    const thisMonthDates = [...new Array(monthDays)].map((n, index) => {
        const day = index + 1;
        return [year, zeroPad(month, 2), zeroPad(day, 2)];
    });

    const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => {
        const day = index + 1;
        return [nextMonthYear, zeroPad(nextMonth, 2), zeroPad(day, 2)];
    });

    return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];

}

// (bool) Checks if a value is a date - this is just a simple check
export const isDate = date => {
    const isDate = Object.prototype.toString.call(date) === '[object Date]';
    const isValidDate = date && !Number.isNaN(date.valueOf());

    return isDate && isValidDate;
}

// (bool) Checks if two date values are of the same month and year
export const isSameMonth = (date, basedate = new Date()) => {

    if (!(isDate(date) && isDate(basedate))) return false;

    const basedateMonth = +(basedate.getMonth()) + 1;
    const basedateYear = basedate.getFullYear();

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

