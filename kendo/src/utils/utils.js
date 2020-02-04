
// import moment from 'moment';
export function getDateMMDDYYYY(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [month, day, year].join('/');
}

export function getDateByFormatDDMMYYYY(date, format){
    return (format && format === 'MM/DD/YYYY')? getDateMMDDYYYY(date) : getDateMMDDYYYY(date);
}

export function  addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}