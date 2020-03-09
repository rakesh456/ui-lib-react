import { getListOfYears,DEFAULT_OPTIONS,getChildren,getMonths,getMonthWeeks, getMonthDays} from "../../src/utils/datehierarchyutils";
import { useCallback } from "react";
import { FaObjectUngroup } from "react-icons/lib/fa";

// 23. Get Default options using defaut Options(options) 
describe("Get Default options using defautOptions(options)",()=>{
    
    test("Checking Default option if data options are empty ",()=>{
        
        expect(DEFAULT_OPTIONS).toEqual({"disabledList": [], "lowerLimit": new Date().getFullYear(), "showQuarters": true, "showWeeks": false, "upperLimit": new Date().getFullYear() + 4})
        
    })
})


//24 getListOfYears should return the year Array
test("Checking yearArray", () => {
    let options = { "lowerLimit": "2020", "upperLimit": "2025", "showWeeks": false, "showQuarters": true, "disabledList": [] };
    let years = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.showQuarters, options.disabledList);
    var yearArray = [];
    years.forEach(year => {
        yearArray.push(year.year);
    });
    expect(yearArray).toEqual([2020, 2021, 2022, 2023, 2024, 2025]);
})


// 25 Get Quarter Array from getChildren function
describe('Get Quarter Array from getChildren function',()=>{

    test('Get Quarter Array from getChildren function',()=>{

        getChildren(2020,false,[],(obj)=>{ 
            fun(obj.quarter)
            // fun(obj)
        })

        function fun(obj){
            let quaterArray = []
            obj.forEach((eachQuater)=>{
                quaterArray.push(eachQuater.quarter)

            })
            expect([obj[0].quarter,obj[1].quarter,obj[2].quarter,obj[3].quarter]).toEqual(quaterArray)
        }
    })
})

// 26 Get Months Array from getMonth Function
describe('Get Months Array from getMonth Function',()=>{

    test('Get Months Array from getMonth Function when showWeeks is true',()=>{

        getMonths(2020,true,[],(obj)=>{
            fun(obj)
        })
        
        function fun(obj){
            let months = obj.months
            let monthsArray = []
            months.forEach((eachObj)=>{
                
                monthsArray.push(eachObj.month)
               
            })
            expect(monthsArray).toEqual(['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun','Jul', 'Aug', 'Sep','Oct', 'Nov', 'Dec'])
        }
    })

    test('Get Months Array from getMonth Function when showWeeks is false',()=>{

        getMonths(2020,false,[],(obj)=>{
            fun(obj)
        })
        
        function fun(obj){
            // console.log(obj)
            let months = obj.months
            let monthsArray = []
            months.forEach((eachObj)=>{
                
                monthsArray.push(eachObj.month)
               
            })
            expect(monthsArray).toEqual(['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun','Jul', 'Aug', 'Sep','Oct', 'Nov', 'Dec'])
        }
    })
})

// 27.Get Weeks Array from the getWeek Function
describe('Get Weeks Array from the getWeek Function',()=>{

    test('testing',()=>{

        getMonthWeeks(1,2020,[],(obj)=>{
            
            weekFunction(obj)
            // console.log(obj)
        
        })
        function weekFunction(obj){

            let weeks = obj.weeks
            let weeksArray = []
            weeks.forEach((eachObj)=>{

                weeksArray.push(eachObj.week)
            })

            expect(weeksArray).toEqual( [ 'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5' ]
            )
        }

    })
})

// 28.Get WeekDays Arrayfrom getWeekDays function.
describe('Get WeekDays Arrayfrom getWeekDays function.',()=>{

    test('testing',()=>{

        getMonthWeeks(1,2020,[],(obj)=>{
            
            weekFunction(obj)
            // console.log(obj)
        
        })
        function weekFunction(obj){

            let weeks = obj.weeks
            let daysArray = []
            weeks.forEach((eachObj)=>{

                eachObj.days.forEach((day)=>{

                    daysArray.push(day.day)
                })
            })
            // console.log(daysArray)
            expect(daysArray).toEqual(  ['Wed', 'Thu', 'Fri', 'Sat','Sun', 'Mon', 'Tue', 'Wed','Thu', 'Fri', 'Sat', 'Sun','Mon', 'Tue', 'Wed', 'Thu','Fri', 'Sat', 'Sun', 'Mon','Tue', 'Wed', 'Thu', 'Fri','Sat', 'Sun', 'Mon', 'Tue','Wed', 'Thu', 'Fri'])
        }

    })

    test('testing',()=>{

        getMonthWeeks(1,2020,[],(obj)=>{
            
            weekFunction(obj)
            // console.log(obj)
        
        })
        function weekFunction(obj){

            let weeks = obj.weeks
            let dateArray = []
            weeks.forEach((eachObj)=>{

                eachObj.days.forEach((day)=>{

                    dateArray.push(day.date)
                })
            })
            // console.log(dateArray)
            expect(dateArray).toEqual(  [1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31])
        }

    })
})

// 29.Get days Array from the getDays function
describe('Get days Array from the getDays function',()=>{

    test('testing',()=>{
        getMonthDays(2,2020,[],(obj)=>{
                fun(obj)
        })
        
        function fun(obj){
            let daysArray = []
            obj.days.forEach((eachObj)=>{
                daysArray.push(eachObj.day)
            })
            
            expect(daysArray).toEqual( [1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29])
        }
    })
})

