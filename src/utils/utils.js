
// Calendar months names
export const CALENDAR_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const CALENDAR_WEEKS = ["S", "M", "T", "W", "T", "F", "S"];

export function getMonthNameByIndex(index) {
    return CALENDAR_MONTHS[index].toUpperCase();
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
