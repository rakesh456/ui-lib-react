import { zeroPad } from "./calendar";

// Char code of keyboard arrow keys array
export const ARROW_KEYS = [37, 38, 39, 40];

// Char code of keyboard arrow keys object
export const ARROWS = {left: 37, up: 38, right: 39, down: 40 };

// Created fragment for object.
export const Fragment = (props, children) => children;

// Function to check obj is undefined or null
export function isUndefinedOrNull(obj){
    return (typeof obj === "undefined" || obj === null || !obj)? true : false;
}

// Funtion to check string is blank, undefined or null
export function isBlank(string){
    return (typeof string === "undefined" || string === null || string === '')? true : false;
}

// Split array with chunk size
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

// Funtion to return display format from options. Send MM/DD/YYYY if nout found
export function getFormatfromOptions(options){
    return (!isUndefinedOrNull(options) && options.displayFormat)? options.displayFormat : 'MM/DD/YYYY';
}

// Get date by display format
export function getDateByFormat(date, format){
    return (format && format === 'DD/MM/YYYY')? getDateDDMMYYYY(date) : getDateMMDDYYYY(date);
}

// Get date by display format new
export function getDateByFormatNew(date, format){
    return (format && format === 'DD/MM/YYYY')? getDateDDMMYYYYNew(date) : getDateMMDDYYYY(date);
}

// Check date is valid date or not
export const isValidDate = dateObject => { 
    return new Date(dateObject).toString() !== 'Invalid Date'; 
}

// Function to get DD/MM/YYYY format date
export function getDateDDMMYYYYNew(date, format) {
    let d = new Date(convertYYYYMMDDByFormat(date, 'DD/MM/YYYY'));
    
    let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
}

// Function to get DD/MM/YYYY format date
export function getDateDDMMYYYY(date, format) {
    // let d = (isDate(date))? new Date(date) : new Date(convertYYYYMMDD(date, {}));
    let d = (isValidDate(date))? new Date(date) : new Date(convertYYYYMMDDByFormat(date, 'DD/MM/YYYY'));
    
    let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
}

// Function to get MM/DD/YYYY format date
export function getDateMMDDYYYY(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [month, day, year].join('/');
}

// Function to convert date to YYYY-MM-DD format
export function convertYYYYMMDD(date, options) {
    let format = getFormatfromOptions(options);
    return convertYYYYMMDDByFormat(date, format);
}

// Function to convert date to YYYY-MM-DD format
export function convertYYYYMMDDByFormat(date, format){
    if(isUndefinedOrNull(date)){
        return "";
    }
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

// Function to convert date to YYYY-MM-DD format
export function getYYYYMMDD(date){
    let d = new Date(date);
    let month = '' + zeroPad((d.getMonth() + 1), 2),
        day = '' + zeroPad(d.getDate(), 2),
        year = d.getFullYear();

    return [year, month, day].join('-');
}

// Function to get current date fullyear
export function dateToYear(date) {
    let _date = (date && isValidDate(date))? new Date(date) : new Date();
    return _date.getFullYear();
}

// Function to get current date MM/YYYY value
export function dateToMMYYYY(date) {
    let _date = (date && isValidDate(date))? new Date(date) : new Date();
    return zeroPad(_date.getMonth() + 1, 2) + '/' + _date.getFullYear();
}

// Function to get current date QQ/YYYY value
export function dateToQQYYYY(date) {
    let _date = (date && isValidDate(date))? new Date(date) : new Date();
    let _month = _date.getMonth() + 1;
    let _qq = getQQFromMonth(_month);
    return _qq + '/' + _date.getFullYear();
}

// Function to get current date QQ/YYYY value
export function getQQFromMonth(_month) {
    let _val = (_month <= 12 && _month >= 10)? 4 : (_month <= 9 && _month >= 7)? 3 : (_month <= 6 && _month >= 4)? 2 : 1; 
    return 'Q' + _val;
}

// Function to get unique Id
export function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

// Function to get s4 value
export function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}