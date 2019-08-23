
// Calendar months names
export const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const WEEK_SHORT_NAMES = ["S", "M", "T", "W", "T", "F", "S"];

export function getMonthNameByIndex(index) {
    return MONTH_NAMES[index].toUpperCase();
}

export function splitArray(myArray, chunk_size){
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    
    for (index = 0; index < arrayLength; index += chunk_size) {
        const myChunk = myArray.slice(index, index+chunk_size);
        // Do something if you want with the group
        tempArray.push(myChunk);
    }

    return tempArray;
}

export function getStaticDays(){
    return [[2019,"07","28"],[2019,"07","29"],[2019,"07","30"],[2019,"07","31"],[2019,"08","01"],[2019,"08","02"],[2019,"08","03"],[2019,"08","04"],[2019,"08","05"],[2019,"08","06"],[2019,"08","07"],[2019,"08","08"],[2019,"08","09"],[2019,"08","10"],[2019,"08","11"],[2019,"08","12"],[2019,"08","13"],[2019,"08","14"],[2019,"08","15"],[2019,"08","16"],[2019,"08","17"],[2019,"08","18"],[2019,"08","19"],[2019,"08","20"],[2019,"08","21"],[2019,"08","22"],[2019,"08","23"],[2019,"08","24"],[2019,"08","25"],[2019,"08","26"],[2019,"08","27"],[2019,"08","28"],[2019,"08","29"],[2019,"08","30"],[2019,"08","31"],[2019,"09","01"],[2019,"09","02"],[2019,"09","03"],[2019,"09","04"],[2019,"09","05"],[2019,"09","06"],[2019,"09","07"]];
}

export function getDateDDMMYYYY(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
}
