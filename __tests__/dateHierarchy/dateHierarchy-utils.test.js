import { getListOfYears } from "../../src/utils/datehierarchyutils";
import { getMonths } from "../../src/utils/datehierarchyutils";
import { useCallback } from "react";


// getListOfYears should return the year Array
test("Checking yearArray", () => {
    let options = { "lowerLimit": "2020", "upperLimit": "2025", "showWeeks": false, "showQuarters": true, "disabledList": [] };
    let years = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.showQuarters, options.disabledList);
    var yearArray = [];
    years.forEach(year => {
        yearArray.push(year.year);
    });
    expect(yearArray).toEqual([2020, 2021, 2022, 2023, 2024, 2025]);
})

// getMonths should return the MonthArray
// test('Checking MonthArray', () =>{
//     let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": false, "showQuarters": true, "disabledList": [] };
//     getMonths(options.lowerLimit, options.showWeeks, options.disabledList, useCallback);
//     var monthArray = [];
//     months.forEach(month => {
//         monthArray.push(month.month);
//     });
//     expect(monthArray).toEqual(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
// })