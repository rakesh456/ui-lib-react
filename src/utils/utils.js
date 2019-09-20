import { isDate } from "./calendar";

// import moment from 'moment';
export const Fragment = (props, children) => children;

// Calendar months names
export const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const WEEK_SHORT_NAMES = ["S", "M", "T", "W", "T", "F", "S"];

export function isUndefinedOrNull(obj){
    return (typeof obj === "undefined" || obj === null || !obj)? true : false;
}

export function getMonthNameByIndex(index) {
    var _index = (index)? index : 0;
    return MONTH_NAMES[_index].toUpperCase();
}

export function splitArray(array, chunk_size){
    var index = 0;
    var arrayLength = array.length;
    var tempArray = [];
    
    for (index = 0; index < arrayLength; index += chunk_size) {
        const myChunk = array.slice(index, index+chunk_size);
        tempArray.push(myChunk);
    }

    return tempArray;
}

export function getStaticDays(){
    return [[2019,"07","28"],[2019,"07","29"],[2019,"07","30"],[2019,"07","31"],[2019,"08","01"],[2019,"08","02"],[2019,"08","03"],[2019,"08","04"],[2019,"08","05"],[2019,"08","06"],[2019,"08","07"],[2019,"08","08"],[2019,"08","09"],[2019,"08","10"],[2019,"08","11"],[2019,"08","12"],[2019,"08","13"],[2019,"08","14"],[2019,"08","15"],[2019,"08","16"],[2019,"08","17"],[2019,"08","18"],[2019,"08","19"],[2019,"08","20"],[2019,"08","21"],[2019,"08","22"],[2019,"08","23"],[2019,"08","24"],[2019,"08","25"],[2019,"08","26"],[2019,"08","27"],[2019,"08","28"],[2019,"08","29"],[2019,"08","30"],[2019,"08","31"],[2019,"09","01"],[2019,"09","02"],[2019,"09","03"],[2019,"09","04"],[2019,"09","05"],[2019,"09","06"],[2019,"09","07"]];
}

export function getFormatfromOptions(options){
    return (!isUndefinedOrNull(options) && options.displayFormat)? options.displayFormat : 'MM/DD/YYYY';
}

export function getDateByFormatDDMMYYYY(date, format){
    return (format && format === 'DD/MM/YYYY')? getDateDDMMYYYY(date) : getDateMMDDYYYY(date);
}

export const isValidDate = dateObject => { 
    return new Date(dateObject).toString() !== 'Invalid Date'; 
}

export function getDateDDMMYYYY(date, format) {
    // return getDateMMDDYYYY(date);
    // let d = new Date(date);
    // let d = (isDate(date))? new Date(date) : new Date(convertYYYYMMDD(date, {}));
    let d = (isValidDate(date))? new Date(date) : new Date(convertYYYYMMDDByFormat(date, 'DD/MM/YYYY'));
    
    let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
}

export function getDateMMDDYYYY(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [month, day, year].join('/');
}

export function convertYYYYMMDD(date, options) {
    let format = getFormatfromOptions(options);
    return convertYYYYMMDDByFormat(date, format);
}

export function convertYYYYMMDDByFormat(date, format){
    let dayIndex = (format && format === 'MM/DD/YYYY')? 1 : 0;
    let monthIndex = (format && format === 'MM/DD/YYYY')? 0 : 1;
    let d = date.toString().split("/"),
        month = '' + d[monthIndex],
        day = '' + d[dayIndex],
        year = d[2];

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

export function getCurrentYear() {
    return new Date().getFullYear();
}

export function isValidFormattedDate(date, options) {
    let _date = convertYYYYMMDD(date, options);
    return (isDate(new Date(_date)));
}

export function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

export function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}